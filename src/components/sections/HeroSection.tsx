'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDownRight, Code2, Palette, Monitor } from 'lucide-react';
import { SiteSettings } from '@/types/portfolio';
import { DEFAULT_SITE_SETTINGS } from '@/lib/seed-data';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  settings: SiteSettings;
}

export function HeroSection({ settings }: HeroSectionProps) {
  const { locale, t } = useLanguage();

  const rawTitle = (settings.hero_title || 'Ray Raharja Santoso').replace(/\u2014/g, '-');
  const words = rawTitle.trim().split(/\s+/);
  const firstLine = words.slice(0, Math.ceil(words.length / 2)).join(' ');
  const secondLine = words.slice(Math.ceil(words.length / 2)).join(' ');

  const subtitleText =
    locale === 'en'
      ? t.hero.subtitle
      : settings.hero_subtitle &&
          settings.hero_subtitle !== DEFAULT_SITE_SETTINGS.hero_subtitle
        ? settings.hero_subtitle.replace(/\u2014/g, '-')
        : t.hero.subtitle;

  return (
    <section
      id="hero"
      aria-label={locale === 'en' ? 'Introduction' : 'Perkenalan Utama'}
      className="relative flex flex-col justify-between pt-28 sm:pt-32 border-b border-[var(--line)] overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Top Meta Bar (12-column editorial grid) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center border-b border-[var(--line)] pb-5">
          <div className="md:col-span-5 flex items-center gap-3">
            <span className="font-editorial italic text-sm text-[var(--brass-light)]">
              00 / Index
            </span>
            <span className="h-[1px] w-8 bg-[var(--line)]" />
            <span className="label-editorial">{t.hero.indexLabel}</span>
          </div>

          <div className="md:col-span-4 hidden lg:block">
            <span className="label-editorial">{t.hero.locationLabel}</span>
          </div>

          {/* Static Availability Status Indicator (No decorative ping/pulse) */}
          <div className="md:col-span-7 lg:col-span-3 flex md:justify-end">
            <div className="inline-flex items-center gap-2.5 border border-[var(--line)] bg-[#131316] px-3.5 py-1.5">
              <span
                aria-hidden="true"
                className={cn(
                  'inline-flex rounded-full h-2 w-2 shrink-0',
                  settings.available_for_work ? 'bg-emerald-400' : 'bg-amber-400'
                )}
              />
              <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--ivory)]">
                {settings.available_for_work
                  ? t.hero.available
                  : t.hero.unavailable}
              </span>
            </div>
          </div>
        </div>

        {/* Center Asymmetric Editorial Masthead (7 / 5) */}
        <div className="py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
            <div className="lg:col-span-7 space-y-5">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--brass-light)]">
                {t.hero.eyebrow}
              </p>

              <h1 className="hero-display font-normal text-[var(--ivory)]">
                <span className="block overflow-hidden pb-1">
                  <motion.span
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="block"
                  >
                    {firstLine}
                  </motion.span>
                </span>

                {secondLine && (
                  <span className="block overflow-hidden pb-1">
                    <motion.span
                      initial={{ y: '100%', opacity: 0 }}
                      animate={{ y: '0%', opacity: 1 }}
                      transition={{
                        duration: 0.55,
                        delay: 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="block italic font-normal text-[var(--ivory)]/95"
                    >
                      {secondLine}
                      <span className="text-[var(--brass-light)] not-italic">
                        .
                      </span>
                    </motion.span>
                  </span>
                )}
              </h1>

              <p className="font-editorial italic text-2xl sm:text-3xl lg:text-4xl text-[var(--brass-light)] leading-snug max-w-2xl pt-1">
                {t.hero.tagline}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.16,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="lg:col-span-5 flex flex-col justify-between border-l-2 border-[var(--brass)] pl-5 sm:pl-7 space-y-6"
            >
              <p className="text-base sm:text-lg text-[var(--ivory)]/90 leading-relaxed">
                {subtitleText}
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                <Link
                  href="/apps"
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-[var(--brass)] px-5 py-3 text-xs uppercase tracking-[0.18em] font-medium text-[#0A0A0B] hover:bg-[var(--brass-light)] transition-colors duration-300"
                >
                  <Monitor className="h-4 w-4 shrink-0" />
                  <span>{t.liveSandbox.appsHubTitle}</span>
                </Link>

                <a
                  href="#live-showcase"
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] border border-[var(--border-control)] bg-[#131316] px-5 py-3 text-xs uppercase tracking-[0.18em] text-[var(--ivory)] hover:border-[var(--brass-light)] hover:text-[var(--brass-light)] transition-colors duration-300"
                >
                  <span>{t.liveSandbox.heading}</span>
                </a>

                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] border border-[var(--border-control)] bg-[#131316] px-5 py-3 text-xs uppercase tracking-[0.18em] text-[var(--muted)] hover:border-[var(--brass-light)] hover:text-[var(--ivory)] transition-colors duration-300"
                >
                  <span>{t.hero.ctaExplore}</span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[var(--brass-light)]" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Two-Track Integrated Portfolio Entry Ledger */}
      <div className="w-full border-t border-[var(--line)] bg-[#0E0E11]">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--line)]">
            {/* Track 01: Web & Digital Products */}
            <Link
              href="/projects?track=web"
              className="group flex flex-col justify-between py-7 sm:py-8 md:pr-8 lg:pr-12 hover:bg-[#131316]/60 transition-colors"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="font-editorial italic text-lg text-[var(--brass-light)]">
                      Track 01
                    </span>
                    <span className="h-[1px] w-6 bg-[var(--line)]" />
                    <Code2 className="h-4 w-4 text-[var(--brass-light)]" />
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--brass-light)] inline-flex items-center gap-1.5">
                    <span>{t.hero.trackWebAction}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>

                <h2 className="font-editorial text-2xl sm:text-3xl text-[var(--ivory)] group-hover:text-[var(--brass-light)] transition-colors">
                  {t.hero.trackWebTitle}
                </h2>
                <p className="text-sm text-[var(--muted)] leading-relaxed max-w-xl">
                  {t.hero.trackWebDesc}
                </p>
              </div>
            </Link>

            {/* Track 02: Visual Design & Production */}
            <Link
              href="#visual-design"
              className="group flex flex-col justify-between py-7 sm:py-8 md:pl-8 lg:pl-12 hover:bg-[#131316]/60 transition-colors"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="font-editorial italic text-lg text-[var(--brass-light)]">
                      Track 02
                    </span>
                    <span className="h-[1px] w-6 bg-[var(--line)]" />
                    <Palette className="h-4 w-4 text-[var(--brass-light)]" />
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--brass-light)] inline-flex items-center gap-1.5">
                    <span>{t.hero.trackVisualAction}</span>
                    <ArrowDownRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
                  </span>
                </div>

                <h2 className="font-editorial text-2xl sm:text-3xl text-[var(--ivory)] group-hover:text-[var(--brass-light)] transition-colors">
                  {t.hero.trackVisualTitle}
                </h2>
                <p className="text-sm text-[var(--muted)] leading-relaxed max-w-xl">
                  {t.hero.trackVisualDesc}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
