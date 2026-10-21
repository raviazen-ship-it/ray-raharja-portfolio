import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { createSupabaseServiceClient } from '@/lib/supabase/server';

const ALLOWED_IMAGE_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/avif',
]);

const ALLOWED_VIDEO_TYPES = new Set(['video/mp4', 'video/webm']);
const ALLOWED_PDF_TYPES = new Set(['application/pdf']);

const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10 MB
const MAX_VIDEO_BYTES = 50 * 1024 * 1024; // 50 MB
const MAX_PDF_BYTES = 15 * 1024 * 1024; // 15 MB

export async function POST(request: Request) {
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

    const mimeType = file.type.toLowerCase();
    const fileSize = file.size;

    // Validate based on file type & limits
    if (kind === 'cv') {
      if (!ALLOWED_PDF_TYPES.has(mimeType)) {
        return NextResponse.json(
          { error: 'File CV wajib berformat PDF (.pdf).' },
          { status: 400 }
        );
      }
      if (fileSize > MAX_PDF_BYTES) {
        return NextResponse.json(
          { error: 'Ukuran file PDF maksimal 15MB.' },
          { status: 400 }
        );
      }
    } else if (ALLOWED_IMAGE_TYPES.has(mimeType)) {
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
    } else if (ALLOWED_VIDEO_TYPES.has(mimeType)) {
      if (fileSize > MAX_VIDEO_BYTES) {
        return NextResponse.json(
          {
            error: `Ukuran video (${(fileSize / (1024 * 1024)).toFixed(
              1
            )}MB) melebihi batas maksimal 50MB. Gunakan fitur Embed YouTube/Vimeo untuk video besar.`,
          },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        {
          error: `Tipe file "${file.type || file.name}" ditolak. Hanya menerima gambar (JPG, PNG, WebP, AVIF maks 10MB) atau video (MP4, WebM maks 50MB).`,
        },
        { status: 400 }
      );
    }

    const ext =
      path.extname(file.name).toLowerCase() ||
      (ALLOWED_VIDEO_TYPES.has(mimeType)
        ? '.mp4'
        : ALLOWED_PDF_TYPES.has(mimeType)
          ? '.pdf'
          : '.webp');

    const safeBaseName = path
      .basename(file.name, path.extname(file.name))
      .toLowerCase()
      .replace(/[^a-z0-9-_]/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 48);

    const uniqueFileName = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 7)}-${safeBaseName || 'asset'}${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 1. Upload to Supabase Storage bucket 'portfolio-media' if configured
    if (isSupabaseConfigured()) {
      try {
        const supabase = createSupabaseServiceClient();
        if (supabase) {
          const storagePath = `${kind}/${uniqueFileName}`;
          const { error: uploadError } = await supabase.storage
            .from('portfolio-media')
            .upload(storagePath, buffer, {
              contentType: mimeType,
              upsert: true,
            });

          if (!uploadError) {
            const { data: publicUrlData } = supabase.storage
              .from('portfolio-media')
              .getPublicUrl(storagePath);

            return NextResponse.json({
              ok: true,
              url: publicUrlData.publicUrl,
              mimeType,
              size: fileSize,
              type: ALLOWED_VIDEO_TYPES.has(mimeType) ? 'video' : 'image',
            });
          }
        }
      } catch (e) {
        console.error('Supabase storage upload fallback:', e);
      }
    }

    // 2. Local persistent upload inside public/uploads/
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    const filePath = path.join(uploadsDir, uniqueFileName);
    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      ok: true,
      url: `/uploads/${uniqueFileName}`,
      mimeType,
      size: fileSize,
      type: ALLOWED_VIDEO_TYPES.has(mimeType) ? 'video' : 'image',
    });
  } catch (err) {
    console.error('Upload route error:', err);
    return NextResponse.json(
      { error: 'Gagal mengunggah file ke server.' },
      { status: 500 }
    );
  }
}
