import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createContactMessage } from '@/lib/repository';
import {
  checkRateLimit,
  getClientIdentifier,
  verifySameOrigin,
} from '@/lib/rate-limit';

const CONTACT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const CONTACT_MAX_REQUESTS = 5;

export async function POST(request: Request) {
  if (!verifySameOrigin(request)) {
    return NextResponse.json(
      { error: 'Permintaan lintas domain ditolak.' },
      { status: 403 }
    );
  }

  const clientIp = getClientIdentifier(request);
  const rate = checkRateLimit({
    key: `contact:${clientIp}`,
    limit: CONTACT_MAX_REQUESTS,
    windowMs: CONTACT_WINDOW_MS,
  });

  if (!rate.allowed) {
    return NextResponse.json(
      {
        error:
          'Terlalu banyak pengiriman pesan dalam waktu singkat. Silakan tunggu beberapa menit atau hubungi langsung melalui Email/WhatsApp.',
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(rate.retryAfterSeconds),
        },
      }
    );
  }

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

    const result = await createContactMessage({
      name: cleanName,
      email: cleanEmail,
      message: cleanMessage,
    });

    if (!result.persisted) {
      return NextResponse.json(
        {
          ok: false,
          code: 'STORAGE_UNAVAILABLE',
          error:
            'Basis data pesan belum diaktifkan pada server ini. Silakan lanjutkan pengiriman melalui tombol Email atau WhatsApp yang telah disiapkan.',
        },
        { status: 503 }
      );
    }

    revalidatePath('/admin');

    return NextResponse.json({
      ok: true,
      storage: result.storage,
      message: result.message,
    });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server saat memproses pesan.' },
      { status: 500 }
    );
  }
}
