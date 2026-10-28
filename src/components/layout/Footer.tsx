'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUp, ExternalLink, Mail, MessageSquare } from 'lucide-react';
import { WEB_PROJECTS, pickLocale } from '@/lib/web-projects-data';
import { DEFAULT_SITE_SETTINGS } from '@/lib/seed-data';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { formatWhatsAppLink } from '@/lib/utils';

export function Footer() {
  const pathname = usePathname();
  const { locale, t } = useLanguage();

  if (pathname?.startsWith('/admin')) return null;

  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  const whatsappHref = formatWhatsAppLink(
    DEFAULT_SITE_SETTINGS.whatsapp,
    t.contact.whatsappPrefill
  );

  return (
    <footer className="border-t border-[var(--line)] bg-[#0A0A0B] text-[var(--muted)]">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-14 sm:py-16">
        {/* Top Asymmetric Editorial Colophon Grid (5 / 3 / 4) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[var(--line)]">
          {/* Colophon Statement & Privacy Note */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center border border-[var(--border-control)] bg-[#131316] font-editorial text-base text-[var(--brass-light)]">
                R
              </span>
              <span className="font-editorial text-2xl text-[var(--ivory)]">
                Ray Raharja Santoso
              </span>
            </div>

            <p className="text-sm text-[var(--ivory)]/85 leading-relaxed max-w-md">
              {t.footer.tagline}
            </p>

            <div className="space-y-2 pt-1">
              <a
                href={`mailto:${DEFAULT_SITE_SETTINGS.email}`}
                className="inline-flex items-center gap-2 min-h-[44px] text-xs text-[var(--brass-light)] hover:underline"
              >
                <Mail className="h-3.5 w-3.5 shrink-0" />
                <span>{DEFAULT_SITE_SETTINGS.email}</span>
              </a>
              <span className="mx-3 text-[var(--line)] hidden sm:inline">•</span>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-[44px] text-xs text-[var(--ivory)]/85 hover:text-[var(--brass-light)] transition-colors"
              >
                <MessageSquare className="h-3.5 w-3.5 shrink-0 text-[var(--brass-light)]" />
                <span>{DEFAULT_SITE_SETTINGS.whatsapp}</span>
                <ExternalLink className="h-3 w-3 shrink-0 text-[var(--muted)]" />
              </a>
            </div>

            <p className="text-xs text-[var(--muted)] leading-relaxed max-w-md">
              {t.footer.privacyNote}
            </p>
          </div>

          {/* Internal Portfolio Routes */}
          <div className="md:col-span-3">
            <h2 className="label-editorial text-[var(--brass-light)] mb-4">
              {t.footer.navHeading}
            </h2>
            <ul className="space-y-1">
              {[
                { href: '/', label: t.nav.home },
                { href: '/apps', label: `${t.nav.apps} (5 LIVE)` },
                { href: '/projects', label: t.nav.projects },
                { href: '/#visual-design', label: t.nav.visualWorks },
                { href: '/about', label: t.nav.about },
                { href: '/contact', label: t.nav.contact },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center min-h-[44px] text-sm text-[var(--ivory)]/85 hover:text-[var(--brass-light)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* External Live Web Demos (Explicit External Indicator) */}
          <div className="md:col-span-4">
            <h2 className="label-editorial text-[var(--brass-light)] mb-4">
              {t.footer.demosHeading}
            </h2>
            <ul className="space-y-1">
              {WEB_PROJECTS.map((proj) => (
                <li key={proj.slug}>
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-between gap-3 w-full min-h-[44px] text-sm text-[var(--ivory)]/85 hover:text-[var(--brass-light)] transition-colors"
                  >
                    <span className="truncate">
                      {proj.name}{' '}
                      <span className="text-xs text-[var(--muted)]">
                        ({pickLocale(proj.categoryLabel, locale).split('&')[0].trim()})
                      </span>
                    </span>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[var(--brass-light)]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Colophon Strip */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[var(--muted)]">
            <p>
              &copy; {currentYear} Ray Raharja Santoso. {t.footer.rights}
            </p>
            <a
              href={DEFAULT_SITE_SETTINGS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 min-h-[44px] text-[var(--ivory)]/80 hover:text-[var(--brass-light)] transition-colors"
            >
              <span>LinkedIn</span>
              <ExternalLink className="h-3 w-3 text-[var(--brass-light)]" />
            </a>
            <a
              href={DEFAULT_SITE_SETTINGS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 min-h-[44px] text-[var(--ivory)]/80 hover:text-[var(--brass-light)] transition-colors"
            >
              <span>Instagram (@Reyp.u)</span>
              <ExternalLink className="h-3 w-3 text-[var(--brass-light)]" />
            </a>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center justify-center gap-2 self-start sm:self-auto min-h-[44px] border border-[var(--border-control)] bg-[#131316] px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-[var(--ivory)] hover:border-[var(--brass-light)] hover:text-[var(--brass-light)] transition-colors"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="h-3.5 w-3.5 text-[var(--brass-light)]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
