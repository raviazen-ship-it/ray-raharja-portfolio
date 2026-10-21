import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createContactMessage } from '@/lib/repository';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, website_url } = body || {};

    // Honeypot check: bots fill hidden website_url field
    if (typeof website_url === 'string' && website_url.trim().length > 0) {
      return NextResponse.json({
        ok: true,
        spamFiltered: true,
      });
    }

    const cleanName = typeof name === 'string' ? name.trim() : '';
    const cleanEmail = typeof email === 'string' ? email.trim() : '';
    const cleanMessage = typeof message === 'string' ? message.trim() : '';

    if (cleanName.length < 2 || cleanName.length > 120) {
      return NextResponse.json(
        { error: 'Nama harus diisi antara 2 hingga 120 karakter.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail) || cleanEmail.length > 180) {
      return NextResponse.json(
        { error: 'Alamat email tidak valid.' },
        { status: 400 }
      );
    }

    if (cleanMessage.length < 10 || cleanMessage.length > 5000) {
      return NextResponse.json(
        { error: 'Pesan harus berisi antara 10 hingga 5000 karakter.' },
        { status: 400 }
      );
    }

    const saved = await createContactMessage({
      name: cleanName,
      email: cleanEmail,
      message: cleanMessage,
    });

    revalidatePath('/admin');

    return NextResponse.json({
      ok: true,
      message: saved,
    });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server saat menyimpan pesan.' },
      { status: 500 }
    );
  }
}
