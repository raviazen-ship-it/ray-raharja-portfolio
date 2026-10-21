'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUp, Lock } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

export function Footer() {
  const pathname = usePathname();
  const { t } = useLanguage();

  if (pathname?.startsWith('/admin')) return null;

  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[var(--line)] bg-[#0A0A0B] text-[var(--muted)]">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left: Copyright & Name */}
          <div className="md:col-span-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center border border-[var(--line)] bg-[#131316] font-editorial text-sm text-[var(--brass-light)]">
                R
              </span>
              <span className="font-editorial text-lg text-[var(--ivory)]">
                Ray Raharja Santoso
              </span>
            </div>
            <span className="hidden sm:inline text-[var(--line)]">|</span>
            <p className="text-xs tracking-wide text-[var(--muted)]">
              &copy; {currentYear} Ray Raharja Santoso. {t.footer.rights}
            </p>
          </div>

          {/* Right: Back to top & subtle Admin link */}
          <div className="md:col-span-6 flex flex-wrap items-center justify-between md:justify-end gap-6">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 min-h-[44px] text-[11px] uppercase tracking-[0.2em] text-[var(--muted)] hover:text-[var(--brass-light)] transition-colors"
            >
              <Lock className="h-3 w-3 text-[var(--brass)]" />
              <span>{t.nav.admin}</span>
            </Link>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 min-h-[44px] border border-[var(--line)] bg-[#131316] px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-[var(--ivory)] hover:border-[var(--brass)] hover:text-[var(--brass-light)] transition-colors"
            >
              <span>{t.footer.backToTop}</span>
              <ArrowUp className="h-3.5 w-3.5 text-[var(--brass)]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
