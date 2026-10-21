'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FileDown, Award, Briefcase, Wrench } from 'lucide-react';
import { SiteSettings } from '@/types/portfolio';
import { SEED_EXPERIENCES, SEED_SKILLS, SEED_TOOLS } from '@/lib/seed-data';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { createBlurDataURL } from '@/lib/utils';

interface AboutSectionProps {
  settings: SiteSettings;
}

export function AboutSection({ settings }: AboutSectionProps) {
  const { t } = useLanguage();

  const paragraphs = (settings.about_text || '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section
      id="tentang"
      aria-labelledby="heading-tentang"
      className="py-20 sm:py-28 lg:py-32 border-b border-[var(--line)]"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[var(--line)]">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-editorial italic text-sm text-[var(--brass)]">
                {t.about.index}
              </span>
              <span className="h-[1px] w-10 bg-[var(--line)]" />
              <span className="label-editorial">{t.about.label}</span>
            </div>

            <h2
              id="heading-tentang"
              className="section-heading font-normal text-[var(--ivory)]"
            >
              {t.about.heading}
            </h2>
          </div>

          {settings.cv_url && (
            <a
              href={settings.cv_url}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center gap-3 min-h-[48px] border border-[var(--brass)] bg-[#131316] px-6 py-3 text-xs uppercase tracking-[0.2em] text-[var(--ivory)] hover:bg-[var(--brass)] hover:text-[#0A0A0B] transition-colors duration-300 self-start md:self-auto"
            >
              <FileDown className="h-4 w-4 text-[var(--brass-light)] group-hover:text-[#0A0A0B]" />
              <span>{t.about.downloadCv}</span>
            </a>
          )}
        </div>

        {/* Main 12-Col Editorial Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-12 items-start">
          {/* Portrait Column (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.65 }}
            className="lg:col-span-5 xl:col-span-4"
          >
            <div className="relative p-3 border border-[var(--line)] bg-[#131316]">
              <div
                style={{ aspectRatio: '4 / 5' }}
                className="relative w-full overflow-hidden bg-[#0A0A0B]"
              >
                <Image
                  src={
                    settings.profile_photo_url ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85'
                  }
                  alt="Potret Ray Raharja Santoso — Graphic, Brand & Motion Designer"
                  width={800}
                  height={1000}
                  placeholder="blur"
                  blurDataURL={createBlurDataURL(4, 5)}
                  unoptimized={
                    settings.profile_photo_url?.startsWith('data:') ||
                    settings.profile_photo_url?.startsWith('/uploads/')
                  }
                  className="h-full w-full object-cover grayscale-[20%] contrast-[1.04]"
                />
              </div>

              <div className="mt-3 pt-3 border-t border-[var(--line)] flex items-center justify-between text-xs">
                <span className="font-editorial italic text-base text-[var(--ivory)]">
                  Ray Raharja Santoso
                </span>
                <span className="label-editorial text-[10px]">
                  JAKARTA, ID
                </span>
              </div>
            </div>

            {/* Key Metrics Strip */}
            <div className="grid grid-cols-3 border-l border-r border-b border-[var(--line)] bg-[#131316]/50 divide-x divide-[var(--line)]">
              <div className="p-4 text-center">
                <span className="block font-editorial text-3xl text-[var(--brass-light)]">
                  7+
                </span>
                <span className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
                  {t.about.yearsExp}
                </span>
              </div>
              <div className="p-4 text-center">
                <span className="block font-editorial text-3xl text-[var(--brass-light)]">
                  45+
                </span>
                <span className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
                  {t.about.projectsDelivered}
                </span>
              </div>
              <div className="p-4 text-center">
                <span className="block font-editorial text-3xl text-[var(--brass-light)]">
                  4
                </span>
                <span className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
                  Disiplin Inti
                </span>
              </div>
            </div>
          </motion.div>

          {/* Bio, Skills, Tools & Experience Column (8 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="lg:col-span-7 xl:col-span-8 space-y-12"
          >
            {/* Editorial Pull Quote */}
            <blockquote className="border-l-2 border-[var(--brass)] pl-6 py-1">
              <span className="label-editorial block mb-2 text-[var(--brass-light)]">
                {t.about.philosophyLabel}
              </span>
              <p className="font-editorial italic text-2xl sm:text-3xl lg:text-4xl text-[var(--ivory)] leading-snug">
                {t.about.philosophyQuote}
              </p>
            </blockquote>

            {/* Bio Paragraphs */}
            <div className="space-y-4 text-base sm:text-lg text-[var(--ivory)]/85 leading-relaxed">
              {paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Skills & Tools Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-[var(--line)]">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Award className="h-4 w-4 text-[var(--brass)]" />
                  <h3 className="label-editorial text-[var(--ivory)]">
                    {t.about.skillsLabel}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {SEED_SKILLS.map((skill) => (
                    <span
                      key={skill}
                      className="border border-[var(--line)] bg-[#131316] px-3.5 py-2 text-xs text-[var(--ivory)]/90"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Wrench className="h-4 w-4 text-[var(--brass)]" />
                  <h3 className="label-editorial text-[var(--ivory)]">
                    {t.about.toolsLabel}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {SEED_TOOLS.map((tool) => (
                    <span
                      key={tool}
                      className="border border-[var(--line)] bg-[#0A0A0B] px-3.5 py-2 text-xs text-[var(--muted)] hover:border-[var(--brass)] hover:text-[var(--brass-light)] transition-colors"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Career Experience List */}
            <div className="pt-6 border-t border-[var(--line)]">
              <div className="flex items-center gap-2 mb-6">
                <Briefcase className="h-4 w-4 text-[var(--brass)]" />
                <h3 className="label-editorial text-[var(--ivory)]">
                  {t.about.experienceLabel}
                </h3>
              </div>

              <div className="divide-y divide-[var(--line)] border-t border-b border-[var(--line)]">
                {SEED_EXPERIENCES.map((exp, idx) => (
                  <div
                    key={idx}
                    className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-baseline"
                  >
                    <div className="sm:col-span-3">
                      <span className="font-editorial italic text-base text-[var(--brass-light)]">
                        {exp.period}
                      </span>
                      <span className="block text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] mt-0.5">
                        {exp.location}
                      </span>
                    </div>

                    <div className="sm:col-span-9">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4 className="font-editorial text-xl sm:text-2xl text-[var(--ivory)]">
                          {exp.role}
                        </h4>
                        <span className="text-xs uppercase tracking-[0.18em] text-[var(--brass)]">
                          {exp.company}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
                        {exp.summary}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
