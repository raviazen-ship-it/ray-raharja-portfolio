'use client';

import React, { useState, useRef } from 'react';
import {
  Upload,
  Trash2,
  Star,
  ArrowUp,
  ArrowDown,
  Link2,
  AlertCircle,
  CheckCircle2,
  Film,
  Image as ImageIcon,
} from 'lucide-react';
import { MediaItem } from '@/types/portfolio';
import { parseVideoEmbedUrl, cn } from '@/lib/utils';

interface MediaUploaderProps {
  media: MediaItem[];
  coverUrl: string;
  onChange: (nextMedia: MediaItem[], nextCoverUrl: string) => void;
}

interface UploadProgressItem {
  id: string;
  name: string;
  progress: number;
  status: 'compressing' | 'uploading' | 'done' | 'error';
  error?: string;
}

const ALLOWED_IMAGE_MIMES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/avif',
];
const ALLOWED_VIDEO_MIMES = ['video/mp4', 'video/webm'];
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50 MB

/**
 * Client-side image compression + dimension & compact blurhash extraction.
 */
async function processImageClientSide(file: File): Promise<{
  blob: Blob;
  fileName: string;
  width: number;
  height: number;
  blurhash: string;
}> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const origW = img.naturalWidth || 1600;
      const origH = img.naturalHeight || 1000;

      const maxDim = 2200;
      let targetW = origW;
      let targetH = origH;

      if (origW > maxDim || origH > maxDim) {
        if (origW >= origH) {
          targetW = maxDim;
          targetH = Math.round((origH / origW) * maxDim);
        } else {
          targetH = maxDim;
          targetW = Math.round((origW / origH) * maxDim);
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        resolve({
          blob: file,
          fileName: file.name,
          width: origW,
          height: origH,
          blurhash: 'L10A0B241E14',
        });
        return;
      }

      ctx.drawImage(img, 0, 0, targetW, targetH);

      // Sample average color for compact blur token
      const tinyCanvas = document.createElement('canvas');
      tinyCanvas.width = 4;
      tinyCanvas.height = 4;
      const tinyCtx = tinyCanvas.getContext('2d');
      let blurToken = 'L10A0B241E14';
      if (tinyCtx) {
        tinyCtx.drawImage(img, 0, 0, 4, 4);
        const data = tinyCtx.getImageData(0, 0, 4, 4).data;
        const r = data[0].toString(16).padStart(2, '0');
        const g = data[1].toString(16).padStart(2, '0');
        const b = data[2].toString(16).padStart(2, '0');
        blurToken = `#${r}${g}${b}`;
      }

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve({
              blob: file,
              fileName: file.name,
              width: origW,
              height: origH,
              blurhash: blurToken,
            });
            return;
          }
          const baseName = file.name.replace(/\.[^/.]+$/, '');
          resolve({
            blob,
            fileName: `${baseName}.webp`,
            width: targetW,
            height: targetH,
            blurhash: blurToken,
          });
        },
        'image/webp',
        0.86
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Gagal membaca dimensi gambar.'));
    };

    img.src = objectUrl;
  });
}

/**
 * Extracts intrinsic width & height of a video file on client.
 */
async function getVideoDimensionsClientSide(
  file: File
): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    const objectUrl = URL.createObjectURL(file);

    video.onloadedmetadata = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({
        width: video.videoWidth || 1920,
        height: video.videoHeight || 1080,
      });
    };

    video.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({ width: 1920, height: 1080 });
    };

    video.src = objectUrl;
  });
}

export function MediaUploader({
  media,
  coverUrl,
  onChange,
}: MediaUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploads, setUploads] = useState<UploadProgressItem[]>([]);
  const [errorBanner, setErrorBanner] = useState('');

  // Embed YouTube / Vimeo state
  const [embedInput, setEmbedInput] = useState('');
  const [embedRatio, setEmbedRatio] = useState<'16:9' | '9:16'>('16:9');
  const [embedAlt, setEmbedAlt] = useState('');

  const updateProgress = (
    id: string,
    patch: Partial<UploadProgressItem>
  ) => {
    setUploads((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...patch } : u))
    );
  };

  const handleFiles = async (fileList: FileList | File[]) => {
    setErrorBanner('');
    const files = Array.from(fileList);
    if (files.length === 0) return;

    const newMediaItems: MediaItem[] = [...media];
    let currentCover = coverUrl;

    for (const file of files) {
      const uploadId = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      const mime = file.type.toLowerCase();
      const isImage = ALLOWED_IMAGE_MIMES.includes(mime);
      const isVideo = ALLOWED_VIDEO_MIMES.includes(mime);

      // Validate file type
      if (!isImage && !isVideo) {
        const msg = `File "${file.name}" ditolak: Tipe file tidak didukung. Gunakan JPG, PNG, WebP, AVIF (maks 10MB) atau MP4, WebM (maks 50MB).`;
        setErrorBanner(msg);
        setUploads((prev) => [
          ...prev,
          {
            id: uploadId,
            name: file.name,
            progress: 100,
            status: 'error',
            error: msg,
          },
        ]);
        continue;
      }

      // Validate file size
      if (isImage && file.size > MAX_IMAGE_SIZE) {
        const msg = `Gambar "${file.name}" (${(
          file.size /
          (1024 * 1024)
        ).toFixed(1)}MB) melebihi batas maksimal 10MB.`;
        setErrorBanner(msg);
        setUploads((prev) => [
          ...prev,
          {
            id: uploadId,
            name: file.name,
            progress: 100,
            status: 'error',
            error: msg,
          },
        ]);
        continue;
      }

      if (isVideo && file.size > MAX_VIDEO_SIZE) {
        const msg = `Video "${file.name}" (${(
          file.size /
          (1024 * 1024)
        ).toFixed(
          1
        )}MB) melebihi batas maksimal 50MB. Silakan gunakan opsi tautan YouTube/Vimeo di bawah.`;
        setErrorBanner(msg);
        setUploads((prev) => [
          ...prev,
          {
            id: uploadId,
            name: file.name,
            progress: 100,
            status: 'error',
            error: msg,
          },
        ]);
        continue;
      }

      setUploads((prev) => [
        ...prev,
        {
          id: uploadId,
          name: file.name,
          progress: 20,
          status: isImage ? 'compressing' : 'uploading',
        },
      ]);

      try {
        let uploadFile: File | Blob = file;
        let uploadFileName = file.name;
        let width = 1600;
        let height = 1000;
        let blurhash = 'L10A0B241E14';

        if (isImage) {
          const processed = await processImageClientSide(file);
          uploadFile = processed.blob;
          uploadFileName = processed.fileName;
          width = processed.width;
          height = processed.height;
          blurhash = processed.blurhash;
        } else {
          const dims = await getVideoDimensionsClientSide(file);
          width = dims.width;
          height = dims.height;
        }

        updateProgress(uploadId, { progress: 60, status: 'uploading' });

        const formData = new FormData();
        formData.append('file', uploadFile, uploadFileName);
        formData.append('kind', 'media');

        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Gagal mengunggah file.');
        }

        updateProgress(uploadId, { progress: 100, status: 'done' });

        const defaultAlt = file.name
          .replace(/\.[^/.]+$/, '')
          .replace(/[-_]+/g, ' ');

        const createdItem: MediaItem = {
          id: `media-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          url: data.url,
          thumbnail_url: data.url,
          type: isVideo ? 'video' : 'image',
          width,
          height,
          alt: defaultAlt || 'Dokumentasi Karya Ray Raharja Santoso',
          blurhash,
          is_cover: newMediaItems.length === 0,
        };

        newMediaItems.push(createdItem);
        if (!currentCover || newMediaItems.length === 1) {
          currentCover = createdItem.url;
        }
      } catch (err: any) {
        const msg = err?.message || 'Gagal memproses file.';
        setErrorBanner(msg);
        updateProgress(uploadId, {
          progress: 100,
          status: 'error',
          error: msg,
        });
      }
    }

    onChange(newMediaItems, currentCover);
  };

  const handleAddEmbed = () => {
    setErrorBanner('');
    const parsedEmbed = parseVideoEmbedUrl(embedInput);
    if (!parsedEmbed) {
      setErrorBanner(
        'Tautan video tidak valid. Masukkan URL YouTube (youtube.com / youtu.be) atau Vimeo (vimeo.com).'
      );
      return;
    }

    const isVertical = embedRatio === '9:16';
    const newItem: MediaItem = {
      id: `embed-${Date.now()}`,
      url: embedInput.trim(),
      embed_url: parsedEmbed,
      type: 'embed',
      width: isVertical ? 1080 : 1920,
      height: isVertical ? 1920 : 1080,
      alt: embedAlt.trim() || 'Video Showreel Proyek',
      blurhash: 'L10A0B241E14',
      is_cover: media.length === 0,
    };

    const nextMedia = [...media, newItem];
    onChange(nextMedia, coverUrl || newItem.url);
    setEmbedInput('');
    setEmbedAlt('');
  };

  const handleSetCover = (idx: number) => {
    const selected = media[idx];
    if (!selected) return;
    const nextMedia = media.map((m, i) => ({
      ...m,
      is_cover: i === idx,
    }));
    onChange(nextMedia, selected.url);
  };

  const handleRemoveMedia = (idx: number) => {
    const nextMedia = media.filter((_, i) => i !== idx);
    let nextCover = coverUrl;
    if (media[idx]?.url === coverUrl) {
      nextCover = nextMedia[0]?.url || '';
      if (nextMedia[0]) {
        nextMedia[0].is_cover = true;
      }
    }
    onChange(nextMedia, nextCover);
  };

  const handleMoveMedia = (idx: number, direction: -1 | 1) => {
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= media.length) return;
    const nextMedia = [...media];
    const [moved] = nextMedia.splice(idx, 1);
    nextMedia.splice(targetIdx, 0, moved);
    onChange(nextMedia, coverUrl);
  };

  const handleAltChange = (idx: number, alt: string) => {
    const nextMedia = media.map((m, i) => (i === idx ? { ...m, alt } : m));
    onChange(nextMedia, coverUrl);
  };

  return (
    <div className="space-y-6">
      {/* Drag & Drop Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (e.dataTransfer.files) {
            handleFiles(e.dataTransfer.files);
          }
        }}
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
        className={cn(
          'cursor-pointer border-2 border-dashed p-6 sm:p-8 text-center transition-colors',
          isDragging
            ? 'border-[var(--brass)] bg-[var(--brass)]/10'
            : 'border-[var(--line)] bg-[#0A0A0B] hover:border-[var(--brass)]/70'
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/avif,video/mp4,video/webm"
          onChange={(e) => {
            if (e.target.files) handleFiles(e.target.files);
            e.target.value = '';
          }}
          className="hidden"
        />
        <Upload className="h-7 w-7 text-[var(--brass)] mx-auto mb-3" />
        <p className="font-editorial text-xl text-[var(--ivory)] mb-1">
          Seret &amp; Lepas Gambar atau Video di Sini
        </p>
        <p className="text-xs text-[var(--muted)]">
          Gambar: JPG, PNG, WebP, AVIF (Maks. 10MB, otomatis dikompresi ke WebP)
          • Video: MP4, WebM (Maks. 50MB)
        </p>
      </div>

      {/* Error Alert */}
      {errorBanner && (
        <div
          role="alert"
          className="flex items-start gap-2.5 border border-red-500/40 bg-red-950/30 p-3.5 text-xs text-red-200"
        >
          <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
          <span>{errorBanner}</span>
        </div>
      )}

      {/* Active Upload Progress List */}
      {uploads.length > 0 && (
        <div className="space-y-2 border border-[var(--line)] bg-[#0A0A0B] p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="label-editorial text-[10px]">
              Status Unggahan File
            </span>
            <button
              type="button"
              onClick={() => setUploads([])}
              className="text-[11px] text-[var(--muted)] hover:text-[var(--ivory)]"
            >
              Bersihkan Log
            </button>
          </div>
          {uploads.map((u) => (
            <div key={u.id} className="space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="truncate max-w-xs text-[var(--ivory)]">
                  {u.name}
                </span>
                <span className="text-[11px] uppercase tracking-wider text-[var(--brass-light)]">
                  {u.status === 'compressing' && 'Mengompresi...'}
                  {u.status === 'uploading' && `${u.progress}%`}
                  {u.status === 'done' && (
                    <span className="inline-flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Selesai
                    </span>
                  )}
                  {u.status === 'error' && (
                    <span className="text-red-400">Ditolak</span>
                  )}
                </span>
              </div>
              <div className="h-1 w-full bg-[#131316] overflow-hidden">
                <div
                  className={cn(
                    'h-full transition-all duration-300',
                    u.status === 'error'
                      ? 'bg-red-500'
                      : u.status === 'done'
                        ? 'bg-emerald-400'
                        : 'bg-[var(--brass)]'
                  )}
                  style={{ width: `${u.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* YouTube / Vimeo Embed Option for Videos > 50MB */}
      <div className="border border-[var(--line)] bg-[#0A0A0B] p-4 sm:p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Link2 className="h-4 w-4 text-[var(--brass)]" />
          <span className="label-editorial text-[var(--ivory)]">
            Sematkan Video Besar (YouTube / Vimeo &gt; 50MB)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <input
            type="url"
            value={embedInput}
            onChange={(e) => setEmbedInput(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=... atau https://vimeo.com/..."
            className="sm:col-span-5 min-h-[42px] border border-[var(--line)] bg-[#131316] px-3 py-2 text-xs text-[var(--ivory)] focus:border-[var(--brass)] focus:outline-none"
          />
          <input
            type="text"
            value={embedAlt}
            onChange={(e) => setEmbedAlt(e.target.value)}
            placeholder="Deskripsi / Alt text video..."
            className="sm:col-span-4 min-h-[42px] border border-[var(--line)] bg-[#131316] px-3 py-2 text-xs text-[var(--ivory)] focus:border-[var(--brass)] focus:outline-none"
          />
          <select
            value={embedRatio}
            onChange={(e) =>
              setEmbedRatio(e.target.value as '16:9' | '9:16')
            }
            aria-label="Rasio Video Embed"
            className="sm:col-span-1 min-h-[42px] border border-[var(--line)] bg-[#131316] px-2 py-2 text-xs text-[var(--ivory)]"
          >
            <option value="16:9">16:9</option>
            <option value="9:16">9:16</option>
          </select>
          <button
            type="button"
            onClick={handleAddEmbed}
            className="sm:col-span-2 min-h-[42px] border border-[var(--brass)] bg-[var(--brass)]/15 px-3 py-2 text-xs uppercase tracking-[0.15em] text-[var(--brass-light)] hover:bg-[var(--brass)] hover:text-[#0A0A0B] transition-colors"
          >
            + Tambah
          </button>
        </div>
      </div>

      {/* Media Items List with Preview, Aspect Ratio, Reorder, Cover Selection & Alt Text */}
      {media.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="label-editorial text-[var(--ivory)]">
              Daftar Media Proyek ({media.length} item)
            </span>
            <span className="text-[11px] text-[var(--muted)]">
              Pilih 1 media sebagai Cover &amp; isi Alt Text untuk SEO
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {media.map((item, idx) => {
              const isCover =
                item.url === coverUrl || (idx === 0 && !coverUrl);

              return (
                <div
                  key={item.id || idx}
                  className={cn(
                    'grid grid-cols-1 sm:grid-cols-12 gap-4 items-center border p-3.5 bg-[#0A0A0B]',
                    isCover
                      ? 'border-[var(--brass)]'
                      : 'border-[var(--line)]'
                  )}
                >
                  {/* Thumbnail Preview preserving aspect ratio */}
                  <div className="sm:col-span-3 flex items-center justify-center bg-[#131316] border border-[var(--line)] p-2 h-28 overflow-hidden">
                    {item.type === 'video' ? (
                      <video
                        src={item.url}
                        muted
                        playsInline
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : item.type === 'embed' ? (
                      <div className="flex flex-col items-center justify-center text-[var(--brass-light)] text-xs gap-1">
                        <Film className="h-5 w-5" />
                        <span>Embed ({item.width}×{item.height})</span>
                      </div>
                    ) : (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={item.url}
                        alt={item.alt}
                        className="max-h-full max-w-full object-contain"
                      />
                    )}
                  </div>

                  {/* Metadata & Alt Text Input */}
                  <div className="sm:col-span-6 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 border border-[var(--line)] bg-[#131316] px-2 py-0.5 text-[10px] uppercase tracking-wider text-[var(--brass-light)]">
                        {item.type === 'image' ? (
                          <ImageIcon className="h-3 w-3" />
                        ) : (
                          <Film className="h-3 w-3" />
                        )}
                        {item.type}
                      </span>
                      <span className="border border-[var(--line)] bg-[#131316] px-2 py-0.5 text-[10px] text-[var(--muted)]">
                        {item.width} × {item.height}px
                      </span>
                      {isCover && (
                        <span className="bg-[var(--brass)] px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium text-[#0A0A0B]">
                          Cover Utama
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[var(--muted)] mb-1">
                        Alt Text (Aksesibilitas &amp; SEO)
                      </label>
                      <input
                        type="text"
                        value={item.alt}
                        onChange={(e) => handleAltChange(idx, e.target.value)}
                        placeholder="Deskripsikan gambar/video ini..."
                        className="w-full min-h-[38px] border border-[var(--line)] bg-[#131316] px-3 py-1.5 text-xs text-[var(--ivory)] focus:border-[var(--brass)] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Actions: Cover, Move Up/Down, Delete */}
                  <div className="sm:col-span-3 flex sm:flex-col items-stretch justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleSetCover(idx)}
                      className={cn(
                        'inline-flex items-center justify-center gap-1.5 min-h-[36px] px-3 py-1.5 text-[11px] uppercase tracking-wider border transition-colors',
                        isCover
                          ? 'border-[var(--brass)] bg-[var(--brass)] text-[#0A0A0B] font-medium'
                          : 'border-[var(--line)] bg-[#131316] text-[var(--ivory)] hover:border-[var(--brass)]'
                      )}
                    >
                      <Star className="h-3 w-3" />
                      <span>{isCover ? 'Cover Aktif' : 'Jadikan Cover'}</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleMoveMedia(idx, -1)}
                        disabled={idx === 0}
                        aria-label="Geser media ke atas"
                        className="flex-1 inline-flex items-center justify-center min-h-[36px] border border-[var(--line)] bg-[#131316] text-[var(--ivory)] hover:border-[var(--brass)] disabled:opacity-30"
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveMedia(idx, 1)}
                        disabled={idx === media.length - 1}
                        aria-label="Geser media ke bawah"
                        className="flex-1 inline-flex items-center justify-center min-h-[36px] border border-[var(--line)] bg-[#131316] text-[var(--ivory)] hover:border-[var(--brass)] disabled:opacity-30"
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveMedia(idx)}
                        aria-label="Hapus media ini"
                        className="flex-1 inline-flex items-center justify-center min-h-[36px] border border-red-500/40 bg-red-950/20 text-red-300 hover:bg-red-900/40"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
