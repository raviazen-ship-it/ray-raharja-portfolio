import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import {
  ADMIN_COOKIE_NAME,
  getAllowedAdminEmail,
  verifyAdminSessionToken,
} from '@/lib/auth';
import { isSupabaseConfigured } from '@/lib/supabase/client';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPage = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/admin/login';
  const isAdminApi =
    pathname.startsWith('/api/admin') &&
    !pathname.startsWith('/api/admin/login');

  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next();
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // 1. Check signed session cookie
  const sessionToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const tokenCheck = await verifyAdminSessionToken(sessionToken);
  let isAuthenticatedAdmin = tokenCheck.valid;

  // 2. Also check Supabase Auth session if Supabase is configured
  if (!isAuthenticatedAdmin && isSupabaseConfigured()) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(
            cookiesToSet: Array<{ name: string; value: string; options?: any }>
          ) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (
      user?.email &&
      user.email.trim().toLowerCase() === getAllowedAdminEmail()
    ) {
      isAuthenticatedAdmin = true;
    }
  }

  // Handle API protection
  if (isAdminApi && !isAuthenticatedAdmin) {
    return NextResponse.json(
      { error: 'Unauthorized: Sesi admin tidak valid atau belum login.' },
      { status: 401 }
    );
  }

  // Handle /admin/login redirect if already logged in
  if (isLoginPage && isAuthenticatedAdmin) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // Handle /admin/* protection if not logged in
  if (isAdminPage && !isLoginPage && !isAuthenticatedAdmin) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
