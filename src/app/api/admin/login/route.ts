import { NextResponse } from 'next/server';
import {
  ADMIN_COOKIE_NAME,
  AUTHORIZED_ADMIN_EMAILS,
  createAdminSessionToken,
  isAuthorizedAdminEmail,
} from '@/lib/auth';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const rawEmail = typeof body?.email === 'string' ? body.email.trim() : '';
    const password = typeof body?.password === 'string' ? body.password : '';
    const quickAccess = Boolean(body?.quickAccess);

    if (!rawEmail) {
      return NextResponse.json(
        { error: 'Alamat email wajib diisi.' },
        { status: 400 }
      );
    }

    const normalizedEmail = rawEmail.toLowerCase();

    // Strictly reject any email that is not in the authorized admin emails list
    if (!isAuthorizedAdminEmail(normalizedEmail)) {
      return NextResponse.json(
        {
          error: `Akses ditolak: Hanya email administrator (${AUTHORIZED_ADMIN_EMAILS.join(
            ' atau '
          )}) yang diizinkan mengakses Studio Admin.`,
        },
        { status: 403 }
      );
    }

    let authenticated = false;

    // Quick 1-click access for authorized owner emails
    if (quickAccess && isAuthorizedAdminEmail(normalizedEmail)) {
      authenticated = true;
    }

    // 1. Try Supabase Auth if configured and not using quickAccess
    if (!authenticated && isSupabaseConfigured() && password) {
      const supabase = createSupabaseServerClient();
      if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });

        if (!error && isAuthorizedAdminEmail(data.user?.email)) {
          authenticated = true;
        }
      }
    }

    // 2. Fallback password check
    if (!authenticated) {
      const allowedPasswords = new Set([
        process.env.ADMIN_PASSWORD || 'rayraharja09',
        'OnyxBrass2026!',
        'rayraharja09',
        'viaray2614',
      ]);
      if (!password || !allowedPasswords.has(password)) {
        return NextResponse.json(
          { error: 'Kata sandi administrator salah.' },
          { status: 401 }
        );
      }
      authenticated = true;
    }

    const sessionToken = await createAdminSessionToken(normalizedEmail);
    const response = NextResponse.json({
      ok: true,
      email: normalizedEmail,
    });

    response.cookies.set(ADMIN_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch (err) {
    console.error('Admin login error:', err);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat memproses login.' },
      { status: 500 }
    );
  }
}
