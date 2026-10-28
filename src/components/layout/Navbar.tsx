'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
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

  // Prevent background scroll when mobile menu is open
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
    { href: '/', label: t.nav.home, index: '01', active: pathname === '/' },
    {
      href: '/projects',
      label: t.nav.projects,
      index: '02',
      active: pathname?.startsWith('/projects') ?? false,
    },
    {
      href: '/#visual-design',
      label: t.nav.visualWorks,
      index: '03',
      active: pathname?.startsWith('/karya') ?? false,
    },
    {
      href: '/about',
      label: t.nav.about,
      index: '04',
      active: pathname === '/about',
    },
    {
      href: '/contact',
      label: t.nav.contact,
      index: '05',
      active: pathname === '/contact',
    },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-editorial',
          scrolled
            ? 'bg-[#0A0A0B]/92 backdrop-blur-md border-b border-[var(--line)] py-3'
            : 'bg-[#0A0A0B]/70 border-b border-transparent py-4'
        )}
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 flex items-center justify-between gap-3">
          {/* Brand Monogram & Name */}
          <Link
            href="/"
            className="group flex items-center gap-3 min-h-[44px] min-w-0 focus-visible:outline-none"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-[var(--border-control)] bg-[#131316] font-editorial text-lg font-medium text-[var(--brass-light)] transition-colors duration-300 group-hover:border-[var(--brass-light)]">
              R
            </span>
            <div className="flex flex-col min-w-0">
              <span className="font-editorial text-base sm:text-xl tracking-tight text-[var(--ivory)] leading-none truncate">
                Ray Raharja Santoso
              </span>
              <span className="hidden xs:block sm:block text-[10px] uppercase tracking-[0.18em] text-[var(--muted)] mt-1 truncate">
                Web &amp; Visual Design
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label={locale === 'en' ? 'Primary Navigation' : 'Navigasi Utama'}
            className="hidden lg:flex items-center gap-7 xl:gap-9"
          >
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={item.active ? 'page' : undefined}
                className={cn(
                  'group relative flex items-center gap-1.5 min-h-[44px] text-xs uppercase tracking-[0.18em] transition-colors',
                  item.active
                    ? 'text-[var(--brass-light)] font-medium'
                    : 'text-[var(--ivory)]/85 hover:text-[var(--brass-light)]'
                )}
              >
                <span className="font-editorial text-[11px] italic text-[var(--brass-light)]">
                  {item.index}
                </span>
                <span>{item.label}</span>
                <span
                  className={cn(
                    'absolute bottom-2 left-0 h-[1px] bg-[var(--brass-light)] transition-all duration-300',
                    item.active ? 'w-full' : 'w-0 group-hover:w-full'
                  )}
                />
              </Link>
            ))}
          </nav>

          {/* Right Controls: Language Switcher & CTA / Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Bilingual Toggle (ID / EN) - 44x44px touch targets */}
            <div
              role="group"
              aria-label={locale === 'en' ? 'Select Language' : 'Pilih Bahasa'}
              className="flex items-center border border-[var(--border-control)] bg-[#131316]"
            >
              <button
                type="button"
                onClick={() => setLocale('id')}
                className={cn(
                  'min-h-[44px] min-w-[44px] px-2.5 text-[11px] uppercase tracking-[0.16em] transition-colors',
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
                  'min-h-[44px] min-w-[44px] border-l border-[var(--border-control)] px-2.5 text-[11px] uppercase tracking-[0.16em] transition-colors',
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
              href="/contact"
              className="hidden xl:inline-flex items-center gap-2 min-h-[44px] border border-[var(--brass)] bg-[var(--brass)] px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] font-medium text-[#0A0A0B] hover:bg-[var(--brass-light)] transition-colors duration-300"
            >
              <span>{t.hero.ctaContact}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            {/* Mobile/Tablet Hamburger Button (44x44px touch target) */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-fullscreen-menu"
              aria-label={mobileOpen ? t.nav.menuClose : t.nav.menuOpen}
              className="lg:hidden inline-flex h-11 w-11 items-center justify-center border border-[var(--border-control)] bg-[#131316] text-[var(--ivory)] hover:border-[var(--brass-light)] transition-colors"
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

      {/* Single-Hand Accessible Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-fullscreen-menu"
            role="dialog"
            aria-modal="true"
            aria-label={locale === 'en' ? 'Mobile Navigation' : 'Menu Navigasi Mobile'}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-[#0A0A0B] px-5 sm:px-8 pt-24 pb-8 lg:hidden overflow-y-auto"
          >
            <div className="border-t border-[var(--line)] pt-6">
              <div className="mb-5 flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className={cn(
                    'h-2 w-2 rounded-full shrink-0',
                    availableForWork ? 'bg-emerald-400' : 'bg-amber-400'
                  )}
                />
                <span className="label-editorial">
                  {availableForWork ? t.hero.available : t.hero.unavailable}
                </span>
              </div>

              <nav
                aria-label={locale === 'en' ? 'Mobile Links' : 'Tautan Mobile'}
                className="flex flex-col divide-y divide-[var(--line)] border-b border-[var(--line)]"
              >
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-baseline justify-between py-4 min-h-[52px] group"
                  >
                    <div className="flex items-baseline gap-3.5">
                      <span className="font-editorial text-base italic text-[var(--brass-light)]">
                        {item.index}
                      </span>
                      <span
                        className={cn(
                          'font-editorial text-3xl sm:text-4xl transition-colors',
                          item.active
                            ? 'text-[var(--brass-light)]'
                            : 'text-[var(--ivory)] group-hover:text-[var(--brass-light)]'
                        )}
                      >
                        {item.label}
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-[var(--brass-light)]" />
                  </Link>
                ))}
              </nav>
            </div>

            <div className="pt-6 space-y-4">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 min-h-[48px] bg-[var(--brass)] px-6 py-3 text-xs uppercase tracking-[0.18em] font-medium text-[#0A0A0B] hover:bg-[var(--brass-light)] transition-colors"
              >
                <span>{t.hero.ctaContact}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="flex items-center justify-between text-xs text-[var(--muted)]">
                <span>Jakarta Utara, Indonesia</span>
                <span>Web &amp; Visual Design</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
