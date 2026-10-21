'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  FileDown,
  Award,
  Briefcase,
  Wrench,
  GraduationCap,
  MapPin,
  Instagram,
} from 'lucide-react';
import { SiteSettings } from '@/types/portfolio';
import {
  SEED_EXPERIENCES,
  SEED_SKILLS,
  SEED_TOOLS,
  SEED_CREDENTIALS,
} from '@/lib/seed-data';
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

  const photoSrc =
    settings.profile_photo_url &&
    !settings.profile_photo_url.includes('unsplash.com')
      ? settings.profile_photo_url
      : '/profile-ray-raharja.png';

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
              <span className="label-editorial">
                GRAPHIC &amp; BRAND DESIGNER • JAKARTA UTARA
              </span>
            </div>

            <h2
              id="heading-tentang"
              className="section-heading font-normal text-[var(--ivory)]"
            >
              {t.about.heading}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
            {settings.instagram && (
              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 min-h-[48px] border border-[var(--line)] bg-[#131316] px-5 py-3 text-xs uppercase tracking-[0.18em] text-[var(--ivory)] hover:border-[var(--brass)] hover:text-[var(--brass-light)] transition-colors"
              >
                <Instagram className="h-4 w-4 text-[var(--brass)]" />
                <span>@Reyp.u</span>
              </a>
            )}

            {settings.cv_url && (
              <a
                href={settings.cv_url}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-3 min-h-[48px] border border-[var(--brass)] bg-[var(--brass)] px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium text-[#0A0A0B] hover:bg-[var(--brass-light)] transition-colors duration-300"
              >
                <FileDown className="h-4 w-4" />
                <span>{t.about.downloadCv}</span>
              </a>
            )}
          </div>
        </div>

        {/* Main 12-Col Editorial Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-12 items-start">
          {/* Portrait Column (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.65 }}
            className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28"
          >
            <div className="relative p-3.5 border border-[var(--line)] bg-[#131316]">
              {/* Subtle Corner Brass Accents */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-[1px] -left-[1px] h-4 w-4 border-t-2 border-l-2 border-[var(--brass)]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-[1px] -right-[1px] h-4 w-4 border-b-2 border-r-2 border-[var(--brass)]"
              />

              <div
                style={{ aspectRatio: '433 / 577' }}
                className="relative w-full overflow-hidden bg-[#0A0A0B] border border-[var(--line)]/60"
              >
                <Image
                  src={photoSrc}
                  alt="Potret Ray Raharja Santoso — Graphic & Brand Designer"
                  width={433}
                  height={577}
                  priority
                  placeholder="blur"
                  blurDataURL={createBlurDataURL(4, 5)}
                  unoptimized={
                    photoSrc.startsWith('data:') ||
                    photoSrc.startsWith('/uploads/') ||
                    photoSrc.startsWith('/profile-')
                  }
                  className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>

              <div className="mt-3.5 pt-3.5 border-t border-[var(--line)] flex items-center justify-between text-xs">
                <div>
                  <span className="font-editorial text-lg text-[var(--ivory)] block leading-none">
                    Ray Raharja Santoso
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--brass-light)] mt-1 block">
                    Graphic &amp; Brand Designer
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 label-editorial text-[10px]">
                  <MapPin className="h-3 w-3 text-[var(--brass)]" />
                  Jakarta Utara
                </span>
              </div>
            </div>

            {/* Key Credentials Strip from CV */}
            <div className="grid grid-cols-3 border-l border-r border-b border-[var(--line)] bg-[#131316]/60 divide-x divide-[var(--line)]">
              <div className="p-4 text-center">
                <span className="block font-editorial text-2xl sm:text-3xl text-[var(--brass-light)]">
                  800
                </span>
                <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--muted)]">
                  Skor TOEIC (ETS)
                </span>
              </div>
              <div className="p-4 text-center">
                <span className="block font-editorial text-2xl sm:text-3xl text-[var(--brass-light)]">
                  Madya
                </span>
                <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--muted)]">
                  Sertifikasi UKBI
                </span>
              </div>
              <div className="p-4 text-center">
                <span className="block font-editorial text-2xl sm:text-3xl text-[var(--brass-light)]">
                  360°
                </span>
                <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--muted)]">
                  Konsep — Cetak
                </span>
              </div>
            </div>
          </motion.div>

          {/* Bio, Experience, Credentials & Skills Column (8 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="lg:col-span-7 xl:col-span-8 space-y-12"
          >
            {/* Keen Editorial Highlight Quote */}
            <blockquote className="border-l-2 border-[var(--brass)] bg-[#131316]/40 p-6 sm:p-8">
              <span className="label-editorial block mb-2 text-[var(--brass-light)]">
                {t.about.philosophyLabel} • DARI KONSEP KE PRODUKSI AKHIR
              </span>
              <p className="font-editorial italic text-2xl sm:text-3xl lg:text-4xl text-[var(--ivory)] leading-snug">
                “Desain yang berdampak tidak berhenti di layar monitor—ia
                dirancang dengan ketelitian teknis sejak sketsa pertama hingga
                presisi tinta pada hasil cetak akhir.”
              </p>
            </blockquote>

            {/* Bio Paragraphs */}
            <div className="space-y-4 text-base sm:text-lg text-[var(--ivory)]/90 leading-relaxed">
              {paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Career & Organization Experience List */}
            <div className="pt-6 border-t border-[var(--line)]">
              <div className="flex items-center gap-2 mb-6">
                <Briefcase className="h-4 w-4 text-[var(--brass)]" />
                <h3 className="label-editorial text-[var(--ivory)]">
                  Pengalaman Kerja &amp; Kepemimpinan Organisasi
                </h3>
              </div>

              <div className="divide-y divide-[var(--line)] border-t border-b border-[var(--line)]">
                {SEED_EXPERIENCES.map((exp, idx) => (
                  <div
                    key={idx}
                    className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-baseline"
                  >
                    <div className="sm:col-span-3">
                      <span className="font-editorial italic text-base text-[var(--brass-light)]">
                        {exp.period}
                      </span>
                      <span className="block text-[11px] uppercase tracking-[0.16em] text-[var(--muted)] mt-1">
                        {exp.location}
                      </span>
                    </div>

                    <div className="sm:col-span-9">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4 className="font-editorial text-xl sm:text-2xl text-[var(--ivory)]">
                          {exp.role}
                        </h4>
                        <span className="border border-[var(--line)] bg-[#131316] px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-[var(--brass-light)]">
                          {exp.company}
                        </span>
                      </div>
                      <p className="mt-2.5 text-sm text-[var(--muted)] leading-relaxed">
                        {exp.summary}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Official Certifications (SMKS Barunawati, TOEIC 800, UKBI Madya) */}
            <div className="pt-4">
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap className="h-4 w-4 text-[var(--brass)]" />
                <h3 className="label-editorial text-[var(--ivory)]">
                  Pendidikan &amp; Sertifikasi Resmi
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SEED_CREDENTIALS.map((cred, idx) => (
                  <div
                    key={idx}
                    className="border border-[var(--line)] bg-[#131316] p-5 flex flex-col justify-between hover:border-[var(--brass)]/70 transition-colors"
                  >
                    <div>
                      <span className="font-editorial italic text-xs text-[var(--brass-light)] block mb-2">
                        {cred.period}
                      </span>
                      <h4 className="font-editorial text-xl text-[var(--ivory)] leading-snug mb-1.5">
                        {cred.title}
                      </h4>
                      <p className="text-[11px] uppercase tracking-[0.15em] text-[var(--brass)] mb-3">
                        {cred.issuer}
                      </p>
                    </div>
                    <p className="text-xs text-[var(--muted)] border-t border-[var(--line)] pt-3">
                      {cred.highlight}
                    </p>
                  </div>
                ))}
              </div>
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
