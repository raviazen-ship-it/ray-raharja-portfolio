'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { SiteSettings } from '@/types/portfolio';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  settings: SiteSettings;
}

export function HeroSection({ settings }: HeroSectionProps) {
  const { t } = useLanguage();

  // Split hero title into words/lines for editorial mask-reveal animation
  const rawTitle = settings.hero_title || 'Ray Raharja Santoso';
  const words = rawTitle.trim().split(/\s+/);
  const firstLine = words.slice(0, Math.ceil(words.length / 2)).join(' ');
  const secondLine = words.slice(Math.ceil(words.length / 2)).join(' ');

  const marqueeItems = [
    ...t.hero.disciplines,
    ...t.hero.disciplines,
    ...t.hero.disciplines,
  ];

  return (
    <section
      id="hero"
      aria-label="Perkenalan Utama"
      className="relative min-h-[92vh] flex flex-col justify-between pt-28 sm:pt-36 pb-0 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 flex-1 flex flex-col justify-between">
        {/* Top Meta Bar (12-column editorial grid) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b border-[var(--line)] pb-5">
          <div className="md:col-span-5 flex items-center gap-3">
            <span className="font-editorial italic text-sm text-[var(--brass)]">
              00 / Index
            </span>
            <span className="h-[1px] w-8 bg-[var(--line)]" />
            <span className="label-editorial">{t.hero.indexLabel}</span>
          </div>

          <div className="md:col-span-4 hidden lg:block">
            <span className="label-editorial">{t.hero.locationLabel}</span>
          </div>

          {/* Availability Pill (Editable from Admin) */}
          <div className="md:col-span-7 lg:col-span-3 flex md:justify-end">
            <div className="inline-flex items-center gap-2.5 border border-[var(--line)] bg-[#131316]/90 px-3.5 py-1.5">
              <span className="relative flex h-2 w-2">
                {settings.available_for_work && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                )}
                <span
                  className={cn(
                    'relative inline-flex rounded-full h-2 w-2',
                    settings.available_for_work
                      ? 'bg-emerald-400'
                      : 'bg-amber-500'
                  )}
                />
              </span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--ivory)]">
                {settings.available_for_work
                  ? t.hero.available
                  : t.hero.unavailable}
              </span>
            </div>
          </div>
        </div>

        {/* Center Editorial Title with Line Mask Reveal */}
        <div className="my-auto py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-9">
              <p className="label-editorial mb-4 text-[var(--brass-light)]">
                Graphic &amp; Brand Designer • Motion Designer • Video Editor
              </p>

              <h1 className="hero-display font-normal text-[var(--ivory)]">
                <span className="block overflow-hidden pb-1">
                  <motion.span
                    initial={{ y: '105%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{
                      duration: 0.85,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="block"
                  >
                    {firstLine}
                  </motion.span>
                </span>

                {secondLine && (
                  <span className="block overflow-hidden pb-2">
                    <motion.span
                      initial={{ y: '105%', opacity: 0 }}
                      animate={{ y: '0%', opacity: 1 }}
                      transition={{
                        duration: 0.85,
                        delay: 0.12,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="block italic font-normal text-[var(--ivory)]/95"
                    >
                      {secondLine}
                      <span className="text-[var(--brass)] not-italic">.</span>
                    </motion.span>
                  </span>
                )}
              </h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.75,
                delay: 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="lg:col-span-3 flex flex-col justify-between border-l border-[var(--line)] pl-5 lg:pl-6 space-y-6"
            >
              <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
                {settings.hero_subtitle}
              </p>

              <div className="flex flex-wrap sm:flex-nowrap lg:flex-col xl:flex-row gap-3 pt-2">
                <Link
                  href="#karya"
                  className="inline-flex items-center justify-center gap-2.5 min-h-[48px] bg-[var(--brass)] px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium text-[#0A0A0B] hover:bg-[var(--brass-light)] transition-colors duration-300"
                >
                  <span>{t.hero.ctaWorks}</span>
                  <ArrowDownRight className="h-4 w-4" />
                </Link>

                <Link
                  href="#kontak"
                  className="inline-flex items-center justify-center gap-2.5 min-h-[48px] border border-[var(--line)] bg-[#131316] px-6 py-3 text-xs uppercase tracking-[0.2em] text-[var(--ivory)] hover:border-[var(--brass)] hover:text-[var(--brass-light)] transition-colors duration-300"
                >
                  <span>{t.hero.ctaContact}</span>
                  <ArrowUpRight className="h-4 w-4 text-[var(--brass)]" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Subtle Editorial Discipline Marquee */}
      <div
        aria-label="Disiplin Keahlian"
        className="w-full border-t border-b border-[var(--line)] bg-[#131316]/60 py-3.5 overflow-hidden"
      >
        <div className="animate-marquee-slow flex items-center whitespace-nowrap">
          {marqueeItems.map((discipline, idx) => (
            <div key={idx} className="flex items-center">
              <span className="px-6 sm:px-8 text-[11px] uppercase tracking-[0.24em] text-[var(--ivory)]/80">
                {discipline}
              </span>
              <span
                aria-hidden="true"
                className="inline-block h-1 w-1 rounded-full bg-[var(--brass)]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
