'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ImageOff } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { createBlurDataURL, cn } from '@/lib/utils';

interface ScreenshotImageProps {
  src?: string | null;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  containerClassName?: string;
}

export function ScreenshotImage({
  src,
  alt,
  width,
  height,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false,
  className,
  containerClassName,
}: ScreenshotImageProps) {
  const { t } = useLanguage();
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        role="img"
        aria-label={t.projectsPage.screenshotUnavailable}
        style={{ aspectRatio: `${width} / ${height}` }}
        className={cn(
          'flex flex-col items-center justify-center gap-2.5 bg-[#0E0E11] px-6 text-center',
          containerClassName
        )}
      >
        <ImageOff className="h-6 w-6 text-[#8A857C]" aria-hidden="true" />
        <span className="text-xs uppercase tracking-[0.16em] text-[#8A857C]">
          {t.projectsPage.screenshotUnavailable}
        </span>
      </div>
    );
  }

  return (
    <div
      style={{ aspectRatio: `${width} / ${height}` }}
      className={cn('relative w-full overflow-hidden bg-[#0A0A0B]', containerClassName)}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        placeholder="blur"
        blurDataURL={createBlurDataURL(width, height)}
        unoptimized={src.startsWith('data:') || src.startsWith('/uploads/')}
        onError={() => setHasError(true)}
        className={cn('h-full w-full object-cover object-top', className)}
      />
    </div>
  );
}
