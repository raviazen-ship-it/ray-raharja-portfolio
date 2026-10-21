export const ADMIN_COOKIE_NAME = 'ray_studio_admin_session';
export const PRIMARY_ADMIN_EMAIL = 'rayraharja09@gmail.com';

export function getAllowedAdminEmail(): string {
  return (process.env.ADMIN_EMAIL || PRIMARY_ADMIN_EMAIL)
    .trim()
    .toLowerCase();
}

export function isAuthorizedAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  const envEmail = getAllowedAdminEmail();
  return (
    normalized === PRIMARY_ADMIN_EMAIL ||
    normalized === envEmail
  );
}

function getSessionSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    'onyx-brass-studio-ray-raharja-secret-2026'
  );
}

async function hmacSign(payload: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(payload)
  );
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function createAdminSessionToken(email: string): Promise<string> {
  const normalized = email.trim().toLowerCase();
  const exp = Date.now() + 1000 * 60 * 60 * 24 * 30; // 30 days
  const payload = JSON.stringify({ email: normalized, exp });
  const encodedPayload = btoa(payload);
  const sig = await hmacSign(encodedPayload, getSessionSecret());
  return `${encodedPayload}.${sig}`;
}

export async function verifyAdminSessionToken(
  token?: string | null
): Promise<{ valid: boolean; email?: string }> {
  if (!token || !token.includes('.')) {
    return { valid: false };
  }
  try {
    const [encodedPayload, sig] = token.split('.');
    const expectedSig = await hmacSign(encodedPayload, getSessionSecret());
    if (sig !== expectedSig) {
      return { valid: false };
    }
    const decoded = JSON.parse(atob(encodedPayload)) as {
      email: string;
      exp: number;
    };
    if (!decoded.email || Date.now() > decoded.exp) {
      return { valid: false };
    }
    if (!isAuthorizedAdminEmail(decoded.email)) {
      return { valid: false };
    }
    return { valid: true, email: decoded.email.toLowerCase() };
  } catch {
    return { valid: false };
  }
}
