import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import {
  getMessagesAdmin,
  updateMessageReadAdmin,
  deleteMessageAdmin,
} from '@/lib/repository';
import { requireAdminApi } from '@/lib/admin-guard';

export async function GET(request: Request) {
  const guard = await requireAdminApi(request);
  if (!guard.authorized) return guard.response;

  try {
    const messages = await getMessagesAdmin();
    return NextResponse.json({ messages });
  } catch (err) {
    console.error('GET /api/admin/messages error:', err);
    return NextResponse.json(
      { error: 'Gagal memuat pesan masuk.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const guard = await requireAdminApi(request, { checkOrigin: true });
  if (!guard.authorized) return guard.response;

  try {
    const body = await request.json();
    const { id, is_read } = body || {};
    if (!id) {
      return NextResponse.json(
        { error: 'ID pesan wajib disertakan.' },
        { status: 400 }
      );
    }

    const updated = await updateMessageReadAdmin(id, Boolean(is_read));
    revalidatePath('/admin');

    return NextResponse.json({ ok: true, message: updated });
  } catch (err) {
    console.error('PATCH /api/admin/messages error:', err);
    return NextResponse.json(
      { error: 'Gagal memperbarui status pesan.' },
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
        { error: 'ID pesan wajib disertakan.' },
        { status: 400 }
      );
    }

    const deleted = await deleteMessageAdmin(id);
    revalidatePath('/admin');

    return NextResponse.json({ ok: true, deleted });
  } catch (err) {
    console.error('DELETE /api/admin/messages error:', err);
    return NextResponse.json(
      { error: 'Gagal menghapus pesan.' },
      { status: 500 }
    );
  }
}
