'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { MediaItem } from '@/types/portfolio';
import { createBlurDataURL, cn } from '@/lib/utils';

interface LightboxProps {
  items: MediaItem[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export function Lightbox({
  items,
  initialIndex,
  isOpen,
  onClose,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoomed, setZoomed] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setZoomed(false);
  }, [initialIndex, isOpen]);

  const goPrev = useCallback(() => {
    setZoomed(false);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const goNext = useCallback(() => {
    setZoomed(false);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, goPrev, goNext]);

  if (!isOpen || items.length === 0) return null;

  const current = items[currentIndex] || items[0];

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        goPrev();
      } else {
        goNext();
      }
    }
    setTouchStartX(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Penampil Media Layar Penuh"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="fixed inset-0 z-[90] flex flex-col justify-between bg-[#0A0A0B]/95 backdrop-blur-xl p-4 sm:p-8"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-4 z-20">
            <div className="flex items-center gap-4">
              <span className="font-editorial italic text-base text-[var(--brass-light)]">
                {String(currentIndex + 1).padStart(2, '0')} /{' '}
                {String(items.length).padStart(2, '0')}
              </span>
              <span className="hidden sm:inline text-xs text-[var(--muted)] truncate max-w-md">
                {current.alt}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {current.type === 'image' && (
                <button
                  type="button"
                  onClick={() => setZoomed((z) => !z)}
                  aria-label={zoomed ? 'Perkecil Gambar' : 'Perbesar Gambar'}
                  className="inline-flex h-11 w-11 items-center justify-center border border-[var(--line)] bg-[#131316] text-[var(--ivory)] hover:border-[var(--brass)] transition-colors"
                >
                  {zoomed ? (
                    <ZoomOut className="h-4 w-4 text-[var(--brass-light)]" />
                  ) : (
                    <ZoomIn className="h-4 w-4" />
                  )}
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup Layar Penuh (Esc)"
                className="inline-flex h-11 w-11 items-center justify-center border border-[var(--line)] bg-[#131316] text-[var(--ivory)] hover:border-[var(--brass)] hover:text-[var(--brass-light)] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Center Media Viewport */}
          <div className="relative flex-1 flex items-center justify-center overflow-hidden my-4">
            {items.length > 1 && (
              <button
                type="button"
                onClick={goPrev}
                aria-label="Media Sebelumnya"
                className="absolute left-2 sm:left-4 z-20 inline-flex h-12 w-12 items-center justify-center border border-[var(--line)] bg-[#0A0A0B]/85 text-[var(--ivory)] hover:border-[var(--brass)] hover:text-[var(--brass-light)] transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}

            <motion.div
              key={current.url + currentIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: zoomed ? 1.65 : 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'relative flex items-center justify-center max-h-[76vh] max-w-[90vw]',
                zoomed && 'cursor-zoom-out overflow-auto'
              )}
              onClick={() => {
                if (current.type === 'image') setZoomed((z) => !z);
              }}
            >
              {current.type === 'video' ? (
                <video
                  src={current.url}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[75vh] max-w-[88vw] border border-[var(--line)] bg-[#131316]"
                />
              ) : current.type === 'embed' && current.embed_url ? (
                <div className="w-[85vw] max-w-5xl aspect-video border border-[var(--line)] bg-[#131316]">
                  <iframe
                    src={current.embed_url}
                    title={current.alt}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
              ) : (
                <Image
                  src={current.url}
                  alt={current.alt}
                  width={current.width || 1600}
                  height={current.height || 1000}
                  placeholder="blur"
                  blurDataURL={createBlurDataURL(
                    current.width || 16,
                    current.height || 10
                  )}
                  className="max-h-[75vh] w-auto h-auto object-contain border border-[var(--line)]"
                  unoptimized={current.url.startsWith('data:') || current.url.startsWith('/uploads/')}
                />
              )}
            </motion.div>

            {items.length > 1 && (
              <button
                type="button"
                onClick={goNext}
                aria-label="Media Berikutnya"
                className="absolute right-2 sm:right-4 z-20 inline-flex h-12 w-12 items-center justify-center border border-[var(--line)] bg-[#0A0A0B]/85 text-[var(--ivory)] hover:border-[var(--brass)] hover:text-[var(--brass-light)] transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Bottom Caption & Keyboard Hint */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-[var(--line)] pt-4 text-xs text-[var(--muted)] z-20">
            <p className="text-center sm:text-left text-[var(--ivory)]/90">
              {current.alt}
            </p>
            <span className="label-editorial text-[10px]">
              Gunakan tombol panah ← → atau geser layar • Esc untuk tutup
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
