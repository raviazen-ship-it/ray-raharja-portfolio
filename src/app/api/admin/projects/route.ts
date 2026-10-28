import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import {
  getAllProjectsAdmin,
  saveProjectAdmin,
  deleteProjectAdmin,
  reorderProjectsAdmin,
} from '@/lib/repository';
import { requireAdminApi } from '@/lib/admin-guard';

function revalidatePublicSite(slug?: string) {
  revalidatePath('/');
  revalidatePath('/projects');
  revalidatePath('/sitemap.xml');
  revalidateTag('portfolio-data');
  if (slug) {
    revalidatePath(`/karya/${slug}`);
  }
}

export async function GET(request: Request) {
  const guard = await requireAdminApi(request);
  if (!guard.authorized) return guard.response;

  try {
    const projects = await getAllProjectsAdmin();
    return NextResponse.json({ projects });
  } catch (err) {
    console.error('GET /api/admin/projects error:', err);
    return NextResponse.json(
      { error: 'Gagal memuat daftar proyek.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const guard = await requireAdminApi(request, { checkOrigin: true });
  if (!guard.authorized) return guard.response;

  try {
    const body = await request.json();
    if (!body?.title || typeof body.title !== 'string') {
      return NextResponse.json(
        { error: 'Judul proyek wajib diisi.' },
        { status: 400 }
      );
    }

    const saved = await saveProjectAdmin(body);
    revalidatePublicSite(saved.slug);

    return NextResponse.json({ ok: true, project: saved });
  } catch (err) {
    console.error('POST /api/admin/projects error:', err);
    return NextResponse.json(
      { error: 'Gagal menyimpan proyek baru.' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const guard = await requireAdminApi(request, { checkOrigin: true });
  if (!guard.authorized) return guard.response;

  try {
    const body = await request.json();
    if (!body?.id || !body?.title) {
      return NextResponse.json(
        { error: 'ID dan judul proyek wajib diisi.' },
        { status: 400 }
      );
    }

    const saved = await saveProjectAdmin(body);
    revalidatePublicSite(saved.slug);

    return NextResponse.json({ ok: true, project: saved });
  } catch (err) {
    console.error('PUT /api/admin/projects error:', err);
    return NextResponse.json(
      { error: 'Gagal memperbarui proyek.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const guard = await requireAdminApi(request, { checkOrigin: true });
  if (!guard.authorized) return guard.response;

  try {
    const body = await request.json();

    if (body?.action === 'reorder' && Array.isArray(body.orderedIds)) {
      const updated = await reorderProjectsAdmin(body.orderedIds);
      revalidatePublicSite();
      return NextResponse.json({ ok: true, projects: updated });
    }

    if (body?.id && body?.title) {
      const saved = await saveProjectAdmin(body);
      revalidatePublicSite(saved.slug);
      return NextResponse.json({ ok: true, project: saved });
    }

    return NextResponse.json(
      { error: 'Parameter PATCH tidak valid.' },
      { status: 400 }
    );
  } catch (err) {
    console.error('PATCH /api/admin/projects error:', err);
    return NextResponse.json(
      { error: 'Gagal memperbarui urutan atau status proyek.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const guard = await requireAdminApi(request, { checkOrigin: true });
  if (!guard.authorized) return guard.response;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json(
        { error: 'ID proyek wajib disertakan.' },
        { status: 400 }
      );
    }

    const deleted = await deleteProjectAdmin(id);
    revalidatePublicSite();

    return NextResponse.json({ ok: true, deleted });
  } catch (err) {
    console.error('DELETE /api/admin/projects error:', err);
    return NextResponse.json(
      { error: 'Gagal menghapus proyek.' },
      { status: 500 }
    );
  }
}
