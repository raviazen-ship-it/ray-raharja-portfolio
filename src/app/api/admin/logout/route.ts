import { NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME } from '@/lib/auth';
import { verifySameOrigin } from '@/lib/rate-limit';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  if (!verifySameOrigin(request)) {
    return NextResponse.json(
      { error: 'Permintaan lintas domain ditolak.' },
      { status: 403 }
    );
  }

  if (isSupabaseConfigured()) {
    try {
      const supabase = createSupabaseServerClient();
      if (supabase) {
        await supabase.auth.signOut();
      }
    } catch {
      // Ignore signout errors
    }
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });
  return response;
}
