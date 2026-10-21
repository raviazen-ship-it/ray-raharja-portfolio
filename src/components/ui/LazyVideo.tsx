'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LazyVideoProps {
  src: string;
  poster?: string;
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
  showSoundToggle?: boolean;
  controls?: boolean;
}

export function LazyVideo({
  src,
  poster,
  width = 1600,
  height = 900,
  alt = 'Video Karya Ray Raharja Santoso',
  className,
  showSoundToggle = false,
  controls = false,
}: LazyVideoProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = videoRef.current;
          if (entry.isIntersecting) {
            setHasLoaded(true);
            if (video && !controls) {
              video.play().catch(() => {
                // Ignore autoplay restrictions
              });
            }
          } else {
            if (video && ! video.paused && !controls) {
              video.pause();
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: '120px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [controls]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div
      ref={containerRef}
      style={{ aspectRatio: `${width} / ${height}` }}
      className={cn(
        'relative w-full overflow-hidden bg-[#131316]',
        className
      )}
    >
      <video
        ref={videoRef}
        src={hasLoaded ? src : undefined}
        poster={poster}
        muted={isMuted}
        loop
        playsInline
        controls={controls}
        preload="metadata"
        aria-label={alt}
        className="h-full w-full object-contain bg-[#0A0A0B]"
      />

      {showSoundToggle && !controls && (
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? 'Aktifkan Suara Video' : 'Bisukan Suara Video'}
          className="absolute bottom-4 right-4 z-20 inline-flex h-11 w-11 items-center justify-center border border-[var(--line)] bg-[#0A0A0B]/85 text-[var(--ivory)] backdrop-blur-sm hover:border-[var(--brass)] hover:text-[var(--brass-light)] transition-colors"
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4 text-[var(--brass-light)]" />
          )}
        </button>
      )}
    </div>
  );
}
