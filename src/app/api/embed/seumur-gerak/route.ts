import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const res = await fetch('https://seumur-gerak.vercel.app/', {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      return new NextResponse('Gagal memuat konten proksi aplikasi', { status: 502 });
    }

    let html = await res.text();
    // Inject base href so all relative chunks, styles, and assets resolve against canonical origin
    html = html.replace('<head>', '<head><base href="https://seumur-gerak.vercel.app/">');

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Security-Policy':
          "frame-ancestors 'self' https://ray-raharja-portfolio.vercel.app http://localhost:* https://*.vercel.app;",
      },
    });
  } catch {
    return new NextResponse('Kesalahan proksi penyematan aplikasi', { status: 500 });
  }
}
