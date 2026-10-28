export const ADMIN_COOKIE_NAME = 'ray_studio_admin_session';
export const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

interface AdminSessionPayload {
  email: string;
  iat: number;
  exp: number;
}

function getSessionSecret(): string | null {
  const secret = (process.env.ADMIN_SESSION_SECRET || '').trim();
  if (secret.length < 32) {
    return null;
  }
  return secret;
}

export function getAllowedAdminEmails(): string[] {
  const raw = [
    process.env.ADMIN_EMAIL || '',
    process.env.ADMIN_EMAILS || '',
  ]
    .join(',')
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter((item) => item.includes('@') && item.length >= 5);

  return Array.from(new Set(raw));
}

export function getAllowedAdminEmail(): string {
  return getAllowedAdminEmails()[0] || '';
}

export function isAdminAuthConfigured(): boolean {
  return (
    Boolean(getSessionSecret()) &&
    getAllowedAdminEmails().length > 0 &&
    (process.env.ADMIN_PASSWORD || '').length >= 10
  );
}

export function isAuthorizedAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  const allowed = getAllowedAdminEmails();
  if (allowed.length === 0) return false;
  return allowed.includes(normalized);
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlToBytes(base64Url: string): Uint8Array | null {
  try {
    const padded = base64Url
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      .padEnd(Math.ceil(base64Url.length / 4) * 4, '=');
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  } catch {
    return null;
  }
}

async function importHmacKey(secret: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  return globalThis.crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

export async function createAdminSessionToken(email: string): Promise<string> {
  const secret = getSessionSecret();
  if (!secret) {
    throw new Error('ADMIN_SESSION_SECRET belum dikonfigurasi dengan benar.');
  }

  const now = Math.floor(Date.now() / 1000);
  const payload: AdminSessionPayload = {
    email: email.trim().toLowerCase(),
    iat: now,
    exp: now + ADMIN_SESSION_MAX_AGE_SECONDS,
  };

  const encoder = new TextEncoder();
  const payloadBase64 = bytesToBase64Url(encoder.encode(JSON.stringify(payload)));
  const key = await importHmacKey(secret);
  const signatureBuffer = await globalThis.crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(payloadBase64)
  );
  const signatureBase64 = bytesToBase64Url(new Uint8Array(signatureBuffer));

  return `${payloadBase64}.${signatureBase64}`;
}

export async function verifyAdminSessionToken(
  token?: string | null
): Promise<{ valid: boolean; email?: string }> {
  if (!token || typeof token !== 'string') {
    return { valid: false };
  }

  const secret = getSessionSecret();
  if (!secret) {
    return { valid: false };
  }

  const parts = token.split('.');
  if (parts.length !== 2) {
    return { valid: false };
  }

  const [payloadBase64, signatureBase64] = parts;
  const sigBytes = base64UrlToBytes(signatureBase64);
  const payloadBytes = base64UrlToBytes(payloadBase64);
  if (!sigBytes || !payloadBytes) {
    return { valid: false };
  }

  try {
    const key = await importHmacKey(secret);
    const encoder = new TextEncoder();
    const isValidSig = await globalThis.crypto.subtle.verify(
      'HMAC',
      key,
      sigBytes.buffer.slice(
        sigBytes.byteOffset,
        sigBytes.byteOffset + sigBytes.byteLength
      ) as ArrayBuffer,
      encoder.encode(payloadBase64)
    );

    if (!isValidSig) {
      return { valid: false };
    }

    const decodedJson = new TextDecoder().decode(payloadBytes);
    const payload = JSON.parse(decodedJson) as Partial<AdminSessionPayload>;
    const now = Math.floor(Date.now() / 1000);

    if (
      !payload ||
      typeof payload.email !== 'string' ||
      typeof payload.exp !== 'number' ||
      payload.exp <= now ||
      !isAuthorizedAdminEmail(payload.email)
    ) {
      return { valid: false };
    }

    return { valid: true, email: payload.email };
  } catch {
    return { valid: false };
  }
}
