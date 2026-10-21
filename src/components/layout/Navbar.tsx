'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { cn } from '@/lib/utils';

interface NavbarProps {
  availableForWork?: boolean;
}

export function Navbar({ availableForWork = true }: NavbarProps) {
  const pathname = usePathname();
  const { locale, setLocale, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  if (pathname?.startsWith('/admin')) return null;

  const navLinks = [
    { href: '/#karya', label: t.nav.works, index: '01' },
    { href: '/#tentang', label: t.nav.about, index: '02' },
    { href: '/#layanan', label: t.nav.services, index: '03' },
    { href: '/#kontak', label: t.nav.contact, index: '04' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-editorial',
          scrolled
            ? 'bg-[#0A0A0B]/90 backdrop-blur-md border-b border-[var(--line)] py-3.5'
            : 'bg-transparent border-b border-transparent py-5'
        )}
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Monogram & Name */}
          <Link
            href="/"
            className="group flex items-center gap-3.5 min-h-[44px] focus-visible:outline-none"
          >
            <span className="flex h-9 w-9 items-center justify-center border border-[var(--line)] bg-[#131316] font-editorial text-lg font-medium text-[var(--brass-light)] transition-colors duration-300 group-hover:border-[var(--brass)]">
              R
            </span>
            <div className="flex flex-col">
              <span className="font-editorial text-lg sm:text-xl tracking-tight text-[var(--ivory)] leading-none">
                Ray Raharja Santoso
              </span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] mt-1">
                Brand, Graphic &amp; Motion Studio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Navigasi Utama"
            className="hidden md:flex items-center gap-8 lg:gap-10"
          >
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative flex items-center gap-1.5 min-h-[44px] text-xs uppercase tracking-[0.2em] text-[var(--ivory)]/85 hover:text-[var(--brass-light)] transition-colors"
              >
                <span className="font-editorial text-[11px] italic text-[var(--brass)]">
                  {item.index}
                </span>
                <span>{item.label}</span>
                <span className="absolute bottom-2 left-0 h-[1px] w-0 bg-[var(--brass)] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right Controls: Language Switcher & CTA / Mobile Hamburger */}
          <div className="flex items-center gap-3">
            {/* Bilingual Toggle (ID / EN) */}
            <div
              role="group"
              aria-label="Pilih Bahasa"
              className="flex items-center border border-[var(--line)] bg-[#131316]/80 p-0.5"
            >
              <button
                type="button"
                onClick={() => setLocale('id')}
                className={cn(
                  'min-h-[36px] min-w-[36px] px-2 text-[11px] uppercase tracking-[0.18em] transition-colors',
                  locale === 'id'
                    ? 'bg-[var(--brass)] text-[#0A0A0B] font-medium'
                    : 'text-[var(--muted)] hover:text-[var(--ivory)]'
                )}
                aria-pressed={locale === 'id'}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => setLocale('en')}
                className={cn(
                  'min-h-[36px] min-w-[36px] px-2 text-[11px] uppercase tracking-[0.18em] transition-colors',
                  locale === 'en'
                    ? 'bg-[var(--brass)] text-[#0A0A0B] font-medium'
                    : 'text-[var(--muted)] hover:text-[var(--ivory)]'
                )}
                aria-pressed={locale === 'en'}
              >
                EN
              </button>
            </div>

            <Link
              href="/#kontak"
              className="hidden lg:inline-flex items-center gap-2 min-h-[44px] border border-[var(--brass)] px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-[var(--ivory)] hover:bg-[var(--brass)] hover:text-[#0A0A0B] transition-colors duration-300"
            >
              <span>{t.hero.ctaContact}</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>

            {/* Mobile Hamburger Button (min 44x44px touch target) */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-fullscreen-menu"
              aria-label={mobileOpen ? t.nav.menuClose : t.nav.menuOpen}
              className="md:hidden inline-flex h-11 w-11 items-center justify-center border border-[var(--line)] bg-[#131316] text-[var(--ivory)] hover:border-[var(--brass)] transition-colors"
            >
              {mobileOpen ? (
                <X className="h-5 w-5 text-[var(--brass-light)]" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Animated Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-fullscreen-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu Navigasi Mobile"
            initial={{ opacity: 0, y: '-4%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-4%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-[#0A0A0B] px-6 pt-28 pb-10 md:hidden"
          >
            <div className="border-t border-[var(--line)] pt-8">
              <div className="mb-6 flex items-center gap-2.5">
                <span
                  className={cn(
                    'h-2 w-2 rounded-full',
                    availableForWork
                      ? 'bg-emerald-400 animate-pulse'
                      : 'bg-amber-500'
                  )}
                />
                <span className="label-editorial">
                  {availableForWork ? t.hero.available : t.hero.unavailable}
                </span>
              </div>

              <nav className="flex flex-col divide-y divide-[var(--line)]">
                {navLinks.map((item, idx) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.35 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-baseline justify-between py-5 min-h-[56px] group"
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="font-editorial text-base italic text-[var(--brass)]">
                          {item.index}
                        </span>
                        <span className="font-editorial text-4xl text-[var(--ivory)] group-hover:text-[var(--brass-light)] transition-colors">
                          {item.label}
                        </span>
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-[var(--brass)]" />
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            <div className="border-t border-[var(--line)] pt-6 flex items-center justify-between text-xs text-[var(--muted)]">
              <span>Jakarta, Indonesia</span>
              <Link
                href="/admin"
                onClick={() => setMobileOpen(false)}
                className="uppercase tracking-[0.2em] text-[var(--brass-light)] min-h-[44px] inline-flex items-center"
              >
                {t.nav.admin}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
