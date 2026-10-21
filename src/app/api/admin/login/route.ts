import { NextResponse } from 'next/server';
import {
  ADMIN_COOKIE_NAME,
  createAdminSessionToken,
  getAllowedAdminEmail,
} from '@/lib/auth';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const rawEmail = typeof body?.email === 'string' ? body.email.trim() : '';
    const password = typeof body?.password === 'string' ? body.password : '';

    if (!rawEmail || !password) {
      return NextResponse.json(
        { error: 'Email dan kata sandi wajib diisi.' },
        { status: 400 }
      );
    }

    const allowedAdminEmail = getAllowedAdminEmail();
    const normalizedEmail = rawEmail.toLowerCase();

    // Strictly reject any email that does not match ADMIN_EMAIL
    if (normalizedEmail !== allowedAdminEmail) {
      return NextResponse.json(
        {
          error:
            'Akses ditolak: Hanya email administrator utama yang diizinkan mengakses Studio Admin.',
        },
        { status: 403 }
      );
    }

    let authenticated = false;

    // 1. Try Supabase Auth if configured
    if (isSupabaseConfigured()) {
      const supabase = createSupabaseServerClient();
      if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });

        if (!error && data.user?.email?.toLowerCase() === allowedAdminEmail) {
          authenticated = true;
        } else if (error) {
          return NextResponse.json(
            { error: 'Kredensial login tidak valid di Supabase Auth.' },
            { status: 401 }
          );
        }
      }
    }

    // 2. Local / Fallback Admin Password verification when Supabase is not yet connected
    if (!authenticated) {
      const expectedPassword =
        process.env.ADMIN_PASSWORD || 'OnyxBrass2026!';
      if (password !== expectedPassword) {
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
      maxAge: 60 * 60 * 24 * 7, // 7 days
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
