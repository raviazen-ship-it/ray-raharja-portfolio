import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Generates an ultralight SVG blur placeholder data URI with Onyx & Brass tones
 * so next/image renders zero CLS and smooth blur-up transitions.
 */
export function createBlurDataURL(
  width = 16,
  height = 12,
  accentHex = '#241e14'
): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0A0A0B"/>
        <stop offset="55%" stop-color="${accentHex}"/>
        <stop offset="100%" stop-color="#131316"/>
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#g)"/>
  </svg>`;
  const base64 =
    typeof Buffer !== 'undefined'
      ? Buffer.from(svg).toString('base64')
      : typeof btoa !== 'undefined'
        ? btoa(svg)
        : '';
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Parses YouTube or Vimeo links into embeddable URLs.
 */
export function parseVideoEmbedUrl(rawUrl: string): string | null {
  try {
    const url = new URL(rawUrl.trim());
    // YouTube
    if (
      url.hostname.includes('youtube.com') ||
      url.hostname.includes('youtu.be')
    ) {
      let videoId = '';
      if (url.hostname.includes('youtu.be')) {
        videoId = url.pathname.slice(1);
      } else if (url.pathname.startsWith('/embed/')) {
        videoId = url.pathname.split('/embed/')[1];
      } else if (url.pathname.startsWith('/shorts/')) {
        videoId = url.pathname.split('/shorts/')[1];
      } else {
        videoId = url.searchParams.get('v') || '';
      }
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
      }
    }
    // Vimeo
    if (url.hostname.includes('vimeo.com')) {
      const segments = url.pathname.split('/').filter(Boolean);
      const id = segments[segments.length - 1];
      if (id && /^\d+$/.test(id)) {
        return `https://player.vimeo.com/video/${id}`;
      }
    }
    return null;
  } catch {
    return null;
  }
}

export function formatWhatsAppLink(phone: string, text?: string): string {
  const digits = phone.replace(/[^0-9]/g, '');
  const normalized = digits.startsWith('0')
    ? `62${digits.slice(1)}`
    : digits;
  const query = text ? `?text=${encodeURIComponent(text)}` : '';
  return `https://wa.me/${normalized}${query}`;
}
