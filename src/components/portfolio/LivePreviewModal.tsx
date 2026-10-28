'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { LiveProjectSandbox } from '@/components/portfolio/LiveProjectSandbox';
import { useLanguage } from '@/components/providers/LanguageProvider';

interface LivePreviewModalProps {
  slug: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function LivePreviewModal({
  slug,
  isOpen,
  onClose,
}: LivePreviewModalProps) {
  const { t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !slug) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.liveSandbox.previewModalTitle}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in"
    >
      <div className="relative w-full max-w-6xl my-auto">
        {/* Close Button Header */}
        <div className="flex items-center justify-between pb-3 px-1 text-[var(--ivory)]">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#86EFAC] animate-pulse" />
            <span className="text-xs uppercase tracking-[0.16em] text-[var(--brass-light)]">
              {t.liveSandbox.previewModalTitle}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={t.liveSandbox.closeModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[var(--border-control)] bg-[#131316] text-xs uppercase tracking-[0.14em] text-[var(--ivory)] hover:border-[var(--brass-light)] hover:text-[var(--brass-light)] transition-colors"
          >
            <span>{t.liveSandbox.closeModal}</span>
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Embedded Sandbox with Compact Heading */}
        <div className="bg-[#0A0A0B] border border-[var(--line)] shadow-2xl">
          <LiveProjectSandbox initialSlug={slug} compactHeading />
        </div>
      </div>
    </div>
  );
}
