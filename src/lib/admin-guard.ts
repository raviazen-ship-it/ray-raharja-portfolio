import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import {
  ADMIN_COOKIE_NAME,
  isAuthorizedAdminEmail,
  verifyAdminSessionToken,
} from '@/lib/auth';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { verifySameOrigin } from '@/lib/rate-limit';

export async function getAuthenticatedAdmin(): Promise<{
  authenticated: boolean;
  email: string | null;
}> {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const verified = await verifyAdminSessionToken(sessionToken);

  if (verified.valid && verified.email) {
    return { authenticated: true, email: verified.email };
  }

  if (isSupabaseConfigured()) {
    try {
      const supabase = createSupabaseServerClient();
      if (supabase) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user?.email && isAuthorizedAdminEmail(user.email)) {
          return { authenticated: true, email: user.email.toLowerCase() };
        }
      }
    } catch {
      // Fall through cleanly if Supabase session lookup fails
    }
  }

  return { authenticated: false, email: null };
}

export async function requireAdminApi(
  request: Request,
  options: { checkOrigin?: boolean } = {}
): Promise<
  | { authorized: true; email: string }
  | { authorized: false; response: NextResponse }
> {
  if (options.checkOrigin && !verifySameOrigin(request)) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: 'Permintaan lintas domain (Origin) ditolak.' },
        { status: 403 }
      ),
    };
  }

  const session = await getAuthenticatedAdmin();
  if (!session.authenticated || !session.email) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: 'Tidak diizinkan: sesi administrator diperlukan.' },
        { status: 401 }
      ),
    };
  }

  return { authorized: true, email: session.email };
}
