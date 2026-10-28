'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/providers/LanguageProvider';

export function HowIWorkSection() {
  const { t } = useLanguage();

  return (
    <section
      id="metode-kerja"
      aria-labelledby="heading-how-i-work"
      className="py-20 sm:py-28 border-b border-[var(--line)] bg-[#0E0E11]"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-[var(--line)]">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-editorial italic text-sm text-[var(--brass-light)]">
                {t.howIWork.index}
              </span>
              <span className="h-[1px] w-10 bg-[var(--line)]" />
              <span className="label-editorial">{t.howIWork.label}</span>
            </div>

            <h2
              id="heading-how-i-work"
              className="section-heading font-normal text-[var(--ivory)]"
            >
              {t.howIWork.heading}
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
              {t.howIWork.subtitle}
            </p>
          </div>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 pt-12">
          {t.howIWork.steps.map((step, idx) => (
            <motion.li
              key={step.number}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.45,
                delay: idx * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="border border-[var(--line)] bg-[#131316] p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--line)]">
                  <span className="font-editorial italic text-2xl text-[var(--brass-light)]">
                    {step.number}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
                    {step.phase}
                  </span>
                </div>

                <h3 className="font-editorial text-2xl text-[var(--ivory)] leading-snug mb-3">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
