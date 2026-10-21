import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { getSiteSettings, updateSiteSettingsAdmin } from '@/lib/repository';

export async function GET() {
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
  try {
    const body = await request.json();
    const updated = await updateSiteSettingsAdmin(body || {});

    revalidatePath('/');
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
