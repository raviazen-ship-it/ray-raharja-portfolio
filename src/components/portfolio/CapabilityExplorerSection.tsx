'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Code2,
  LayoutTemplate,
  Box,
  Store,
  Palette,
  ArrowUpRight,
} from 'lucide-react';
import {
  CAPABILITIES,
  CapabilityId,
  pickLocale,
} from '@/lib/web-projects-data';
import { useLanguage } from '@/components/providers/LanguageProvider';

const CAPABILITY_ICONS: Record<CapabilityId, React.ComponentType<{ className?: string }>> = {
  'web-development': Code2,
  'ui-ux': LayoutTemplate,
  'interactive-3d': Box,
  'business-websites': Store,
  'graphic-design': Palette,
};

export function CapabilityExplorerSection() {
  const { locale, t } = useLanguage();

  return (
    <section
      id="capabilities"
      aria-labelledby="heading-capabilities"
      className="py-20 sm:py-24 border-b border-[var(--line)] bg-[#0E0E11]"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Sticky Editorial Intro (Asymmetric 4/8 split for RHYTHM 3) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-editorial italic text-sm text-[var(--brass-light)]">
                {t.capabilities.index}
              </span>
              <span className="h-[1px] w-10 bg-[var(--line)]" />
              <span className="label-editorial">{t.capabilities.label}</span>
            </div>

            <h2
              id="heading-capabilities"
              className="section-heading font-normal text-[var(--ivory)]"
            >
              {t.capabilities.heading}
            </h2>

            <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
              {t.capabilities.subtitle}
            </p>
          </div>

          {/* Right Capability Index Ledger */}
          <div className="lg:col-span-8 divide-y divide-[var(--line)] border border-[var(--line)] bg-[#131316]">
            {CAPABILITIES.map((cap, idx) => {
              const Icon = CAPABILITY_ICONS[cap.id];
              const targetHref =
                cap.id === 'graphic-design'
                  ? '/projects?track=visual&capability=graphic-design'
                  : `/projects?track=web&capability=${cap.id}`;

              return (
                <motion.div
                  key={cap.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={targetHref}
                    className="group grid grid-cols-1 sm:grid-cols-12 gap-4 items-center p-5 sm:p-6 hover:bg-[#18181C] transition-colors"
                  >
                    <div className="sm:col-span-4 flex items-center gap-3.5">
                      <span className="font-editorial italic text-xl text-[var(--brass-light)] w-7 shrink-0">
                        {cap.index}
                      </span>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[var(--border-control)] bg-[#0A0A0B] text-[var(--brass-light)] group-hover:border-[var(--brass-light)] transition-colors">
                        <Icon className="h-4 w-4" />
                      </span>
                      <h3 className="font-editorial text-2xl text-[var(--ivory)] group-hover:text-[var(--brass-light)] transition-colors leading-snug">
                        {pickLocale(cap.title, locale)}
                      </h3>
                    </div>

                    <p className="sm:col-span-5 text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                      {pickLocale(cap.summary, locale)}
                    </p>

                    <div className="sm:col-span-3 flex items-center sm:justify-end gap-2 text-[11px] uppercase tracking-[0.15em] text-[var(--brass-light)]">
                      <span>{pickLocale(cap.proofCountLabel, locale)}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
