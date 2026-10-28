import crypto from 'crypto';
import { NextResponse } from 'next/server';
import {
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  createAdminSessionToken,
  isAdminAuthConfigured,
  isAuthorizedAdminEmail,
} from '@/lib/auth';
import {
  checkRateLimit,
  getClientIdentifier,
  resetRateLimit,
  verifySameOrigin,
} from '@/lib/rate-limit';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { createSupabaseServerClient } from '@/lib/supabase/server';

const GENERIC_AUTH_ERROR = 'Email atau kata sandi tidak valid.';
const LOGIN_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const LOGIN_MAX_ATTEMPTS = 5;

function timingSafeCompareStrings(a: string, b: string): boolean {
  const hashA = crypto.createHash('sha256').update(a, 'utf8').digest();
  const hashB = crypto.createHash('sha256').update(b, 'utf8').digest();
  return crypto.timingSafeEqual(hashA, hashB) && a.length === b.length;
}

export async function POST(request: Request) {
  if (!verifySameOrigin(request)) {
    return NextResponse.json(
      { error: 'Permintaan lintas domain ditolak.' },
      { status: 403 }
    );
  }

  const clientIp = getClientIdentifier(request);
  const rateKey = `admin-login:${clientIp}`;
  const rateStatus = checkRateLimit({
    key: rateKey,
    limit: LOGIN_MAX_ATTEMPTS,
    windowMs: LOGIN_WINDOW_MS,
  });

  if (!rateStatus.allowed) {
    return NextResponse.json(
      {
        error:
          'Terlalu banyak percobaan masuk. Silakan coba kembali beberapa menit lagi.',
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(rateStatus.retryAfterSeconds),
        },
      }
    );
  }

  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      {
        error:
          'Autentikasi administrator belum dikonfigurasi pada environment server.',
      },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const email =
      typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body?.password === 'string' ? body.password : '';

    if (!email || !password || email.length > 180 || password.length > 256) {
      return NextResponse.json({ error: GENERIC_AUTH_ERROR }, { status: 401 });
    }

    const emailAuthorized = isAuthorizedAdminEmail(email);
    const configuredPassword = process.env.ADMIN_PASSWORD || '';
    const passwordMatchesEnv =
      configuredPassword.length >= 10 &&
      timingSafeCompareStrings(password, configuredPassword);

    let authenticated = emailAuthorized && passwordMatchesEnv;

    if (!authenticated && emailAuthorized && isSupabaseConfigured()) {
      try {
        const supabase = createSupabaseServerClient();
        if (supabase) {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (!error && data.user?.email && isAuthorizedAdminEmail(data.user.email)) {
            authenticated = true;
          }
        }
      } catch {
        // Keep generic 401 response on auth backend failure
      }
    }

    if (!authenticated) {
      return NextResponse.json({ error: GENERIC_AUTH_ERROR }, { status: 401 });
    }

    resetRateLimit(rateKey);
    const sessionToken = await createAdminSessionToken(email);

    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: 'Permintaan masuk tidak dapat diproses.' },
      { status: 400 }
    );
  }
}
