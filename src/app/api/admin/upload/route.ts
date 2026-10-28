import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { createSupabaseServiceClient } from '@/lib/supabase/server';
import { requireAdminApi } from '@/lib/admin-guard';

const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10 MB
const MAX_VIDEO_BYTES = 50 * 1024 * 1024; // 50 MB
const MAX_PDF_BYTES = 15 * 1024 * 1024; // 15 MB

interface VerifiedFileSignature {
  mimeType: string;
  extension: string;
  category: 'image' | 'video' | 'pdf';
}

function detectFileSignature(buffer: Buffer): VerifiedFileSignature | null {
  if (buffer.length < 12) return null;

  // PDF: %PDF-
  if (
    buffer[0] === 0x25 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x44 &&
    buffer[3] === 0x46 &&
    buffer[4] === 0x2d
  ) {
    return { mimeType: 'application/pdf', extension: '.pdf', category: 'pdf' };
  }

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return { mimeType: 'image/png', extension: '.png', category: 'image' };
  }

  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return { mimeType: 'image/jpeg', extension: '.jpg', category: 'image' };
  }

  // WebP: RIFF....WEBP
  if (
    buffer.subarray(0, 4).toString('ascii') === 'RIFF' &&
    buffer.subarray(8, 12).toString('ascii') === 'WEBP'
  ) {
    return { mimeType: 'image/webp', extension: '.webp', category: 'image' };
  }

  // ISO BMFF (AVIF / MP4): ....ftyp
  if (buffer.subarray(4, 8).toString('ascii') === 'ftyp') {
    const brand = buffer.subarray(8, 12).toString('ascii');
    if (brand === 'avif' || brand === 'avis') {
      return { mimeType: 'image/avif', extension: '.avif', category: 'image' };
    }
    return { mimeType: 'video/mp4', extension: '.mp4', category: 'video' };
  }

  // WebM / Matroska: 1A 45 DF A3
  if (
    buffer[0] === 0x1a &&
    buffer[1] === 0x45 &&
    buffer[2] === 0xdf &&
    buffer[3] === 0xa3
  ) {
    return { mimeType: 'video/webm', extension: '.webm', category: 'video' };
  }

  return null;
}

export async function POST(request: Request) {
  const guard = await requireAdminApi(request, { checkOrigin: true });
  if (!guard.authorized) return guard.response;

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const kind = (formData.get('kind') as string | null) || 'media';

    if (!file) {
      return NextResponse.json(
        { error: 'Tidak ada file yang dikirim.' },
        { status: 400 }
      );
    }

    const fileSize = file.size;
    if (fileSize <= 0 || fileSize > MAX_VIDEO_BYTES) {
      return NextResponse.json(
        { error: 'Ukuran file tidak valid atau melebihi batas maksimal 50MB.' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const signature = detectFileSignature(buffer);

    if (!signature) {
      return NextResponse.json(
        {
          error:
            'Format biner file tidak dikenali atau ditolak. Hanya menerima JPG, PNG, WebP, AVIF, MP4, WebM, atau PDF asli.',
        },
        { status: 400 }
      );
    }

    if (kind === 'cv') {
      if (signature.category !== 'pdf') {
        return NextResponse.json(
          { error: 'File CV wajib berupa dokumen PDF asli (.pdf).' },
          { status: 400 }
        );
      }
      if (fileSize > MAX_PDF_BYTES) {
        return NextResponse.json(
          { error: 'Ukuran file PDF maksimal 15MB.' },
          { status: 400 }
        );
      }
    } else if (signature.category === 'image') {
      if (fileSize > MAX_IMAGE_BYTES) {
        return NextResponse.json(
          {
            error: `Ukuran gambar (${(fileSize / (1024 * 1024)).toFixed(
              1
            )}MB) melebihi batas maksimal 10MB.`,
          },
          { status: 400 }
        );
      }
    } else if (signature.category === 'video') {
      if (fileSize > MAX_VIDEO_BYTES) {
        return NextResponse.json(
          {
            error: `Ukuran video (${(fileSize / (1024 * 1024)).toFixed(
              1
            )}MB) melebihi batas maksimal 50MB.`,
          },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { error: 'Tipe file tidak sesuai dengan tujuan unggahan.' },
        { status: 400 }
      );
    }

    const rawBase = path.basename(file.name, path.extname(file.name));
    const safeBaseName = rawBase
      .toLowerCase()
      .replace(/[^a-z0-9-_]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 48);

    const safeKind = kind === 'cv' ? 'cv' : 'media';
    const uniqueFileName = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 7)}-${safeBaseName || 'asset'}${signature.extension}`;

    // 1. Upload to Supabase Storage bucket 'portfolio-media' if configured
    if (isSupabaseConfigured()) {
      try {
        const supabase = createSupabaseServiceClient();
        if (supabase) {
          const storagePath = `${safeKind}/${uniqueFileName}`;
          const { error: uploadError } = await supabase.storage
            .from('portfolio-media')
            .upload(storagePath, buffer, {
              contentType: signature.mimeType,
              upsert: true,
            });

          if (!uploadError) {
            const { data: publicUrlData } = supabase.storage
              .from('portfolio-media')
              .getPublicUrl(storagePath);

            return NextResponse.json({
              ok: true,
              url: publicUrlData.publicUrl,
              mimeType: signature.mimeType,
              size: fileSize,
              type: signature.category === 'video' ? 'video' : 'image',
            });
          }
        }
      } catch (e) {
        console.error('Supabase storage upload fallback:', e);
      }
    }

    // 2. Local persistent upload inside public/uploads/ (fails gracefully on read-only serverless fs)
    try {
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      const filePath = path.join(uploadsDir, uniqueFileName);
      fs.writeFileSync(filePath, buffer);

      return NextResponse.json({
        ok: true,
        url: `/uploads/${uniqueFileName}`,
        mimeType: signature.mimeType,
        size: fileSize,
        type: signature.category === 'video' ? 'video' : 'image',
      });
    } catch {
      return NextResponse.json(
        {
          error:
            'Lingkungan server bersifat read-only dan Supabase Storage belum dikonfigurasi.',
        },
        { status: 503 }
      );
    }
  } catch (err) {
    console.error('Upload route error:', err);
    return NextResponse.json(
      { error: 'Gagal mengunggah file ke server.' },
      { status: 500 }
    );
  }
}
