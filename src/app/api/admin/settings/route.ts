import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { getSiteSettings, updateSiteSettingsAdmin } from '@/lib/repository';
import { requireAdminApi } from '@/lib/admin-guard';

export async function GET(request: Request) {
  const guard = await requireAdminApi(request);
  if (!guard.authorized) return guard.response;

  try {
    const settings = await getSiteSettings();
    return NextResponse.json({ settings });
  } catch (err) {
    console.error('GET /api/admin/settings error:', err);
    return NextResponse.json(
      { error: 'Gagal memuat pengaturan situs.' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const guard = await requireAdminApi(request, { checkOrigin: true });
  if (!guard.authorized) return guard.response;

  try {
    const body = await request.json();
    const updated = await updateSiteSettingsAdmin(body || {});

    revalidatePath('/');
    revalidatePath('/about');
    revalidatePath('/contact');
    revalidateTag('portfolio-data');

    return NextResponse.json({ ok: true, settings: updated });
  } catch (err) {
    console.error('PUT /api/admin/settings error:', err);
    return NextResponse.json(
      { error: 'Gagal menyimpan pengaturan situs.' },
      { status: 500 }
    );
  }
}
