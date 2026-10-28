'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  Maximize2,
  Info,
  ShieldAlert,
  Mail,
  Monitor,
  Workflow,
  Lightbulb,
  Sliders,
  Cpu,
} from 'lucide-react';
import { MediaItem } from '@/types/portfolio';
import {
  WebProjectCaseStudy,
  pickLocale,
} from '@/lib/web-projects-data';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { StatusBadge } from '@/components/portfolio/StatusBadge';
import { ScreenshotImage } from '@/components/portfolio/ScreenshotImage';
import { Lightbox } from '@/components/ui/Lightbox';
import { LiveProjectSandbox } from '@/components/portfolio/LiveProjectSandbox';
import { cn } from '@/lib/utils';

interface WebCaseStudyClientProps {
  project: WebProjectCaseStudy;
  nextProject: WebProjectCaseStudy;
}

export function WebCaseStudyClient({
  project,
  nextProject,
}: WebCaseStudyClientProps) {
  const { locale, t } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const lightboxItems: MediaItem[] = useMemo(
    () =>
      project.screenshots.map((shot) => ({
        id: shot.id,
        url: shot.url,
        type: 'image' as const,
        width: shot.width,
        height: shot.height,
        alt: pickLocale(shot.alt, locale),
        blurhash: 'L10A0B241E14',
      })),
    [project.screenshots, locale]
  );

  const openShotAt = (idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  const desktopShots = project.screenshots.filter(
    (s) => s.viewport === 'desktop'
  );
  const mobileShots = project.screenshots.filter(
    (s) => s.viewport === 'mobile'
  );

  return (
    <>
      <article className="pt-28 sm:pt-36 pb-20 sm:pb-28">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          {/* Top Navigation & Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line)] pb-5 mb-10">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2.5 min-h-[44px] text-xs uppercase tracking-[0.18em] text-[var(--muted)] hover:text-[var(--brass-light)] transition-colors"
            >
              <ArrowLeft className="h-4 w-4 text-[var(--brass-light)]" />
              <span>{t.caseStudy.backToProjects}</span>
            </Link>

            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={project.status} />
              <span className="border border-[var(--line)] bg-[#131316] px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">
                {t.caseStudy.verifiedOn}: {project.verifiedAt}
              </span>
            </div>
          </div>

          {/* Hero Title, Subtitle & Live Demo CTA */}
          <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10">
            <div className="lg:col-span-8">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--brass-light)] mb-3">
                {pickLocale(project.categoryLabel, locale)} • Tahun {project.year}
              </p>
              <h1 className="font-editorial text-4xl sm:text-6xl font-normal text-[var(--ivory)] leading-[1.04] mb-4">
                {project.name}
              </h1>
              <p className="text-base sm:text-xl text-[var(--muted)] leading-relaxed">
                {pickLocale(project.subtitle, locale)}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-2.5">
              {/* Primary Live Demo CTA */}
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 min-h-[50px] bg-[var(--brass)] px-6 py-3.5 text-xs uppercase tracking-[0.18em] font-medium text-[#0A0A0B] hover:bg-[var(--brass-light)] transition-colors shadow-sm"
              >
                <span>
                  {project.slug === 'seumur-gerak'
                    ? 'Coba Kalkulator (#kalkulator)'
                    : t.caseStudy.liveDemoButton}
                </span>
                <ExternalLink className="h-4 w-4 shrink-0" />
              </a>

              {/* Special Second Button for Seumur Gerak */}
              {project.slug === 'seumur-gerak' && (
                <a
                  href="https://seumur-gerak.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] border border-[var(--border-control)] bg-[#131316] px-5 py-2.5 text-xs uppercase tracking-[0.16em] text-[var(--ivory)] hover:border-[var(--brass-light)] hover:text-[var(--brass-light)] transition-colors"
                >
                  <span>Buka Beranda Demo</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}

              {/* Dedicated In-Portfolio Gateway Hub Link */}
              <Link
                href={`/apps/${project.slug}`}
                className="inline-flex items-center justify-center gap-2 min-h-[44px] border border-[var(--brass)]/60 bg-[#1F190F] px-5 py-2.5 text-xs uppercase tracking-[0.16em] text-[var(--brass-light)] hover:bg-[var(--brass)] hover:text-[#0A0A0B] transition-colors"
              >
                <Monitor className="h-3.5 w-3.5 shrink-0" />
                <span>Buka di Hub Portofolio</span>
              </Link>

              <span className="text-[11px] text-center text-[var(--muted)] mt-0.5">
                {t.caseStudy.externalHint} ({project.liveUrlLabel})
              </span>
            </div>
          </header>

          {/* Prominent Simulation / Prototype Honesty Notice */}
          <div
            role="note"
            className="mb-12 border border-[var(--brass)]/60 bg-[#1B160C] p-5 sm:p-6 flex items-start gap-3.5"
          >
            <Info className="h-5 w-5 shrink-0 text-[var(--brass-light)] mt-0.5" />
            <p className="text-xs sm:text-sm text-[var(--ivory)]/95 leading-relaxed">
              {pickLocale(project.simulationNotice, locale)}
            </p>
          </div>

          {/* Key Metadata Ledger */}
          <div className="grid grid-cols-1 md:grid-cols-12 border border-[var(--line)] divide-y md:divide-y-0 md:divide-x divide-[var(--line)] bg-[#131316] mb-16">
            <div className="md:col-span-4 p-5 sm:p-6">
              <span className="label-editorial block mb-1.5 text-[10px]">
                {t.caseStudy.roleHeading}
              </span>
              <p className="text-sm sm:text-base text-[var(--ivory)] leading-snug">
                {pickLocale(project.role, locale)}
              </p>
            </div>

            <div className="md:col-span-5 p-5 sm:p-6">
              <span className="label-editorial block mb-2 text-[10px]">
                {t.caseStudy.stackHeading}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="border border-[var(--line)] bg-[#0A0A0B] px-2.5 py-1 text-[11px] text-[var(--ivory)]/90"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="md:col-span-3 p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <span className="label-editorial block mb-2 text-[10px]">
                  {t.caseStudy.statusHeading}
                </span>
                <StatusBadge status={project.status} />
              </div>
              <p className="text-xs text-[var(--muted)] mt-3">
                {t.caseStudy.verifiedOn}: {project.verifiedAt}
              </p>
            </div>
          </div>

          {/* Interactive Live Website Sandbox (with 4 Modes) */}
          <div className="mb-16 sm:mb-20">
            <LiveProjectSandbox initialSlug={project.slug} compactHeading />
          </div>

          {/* Primary Desktop Screenshot Showcase */}
          {project.screenshots[0] && (
            <div className="mb-16 sm:mb-20">
              <div
                onClick={() => openShotAt(0)}
                className="group relative border border-[var(--line)] bg-[#131316] cursor-pointer overflow-hidden"
              >
                <ScreenshotImage
                  src={project.screenshots[0].url}
                  alt={pickLocale(project.screenshots[0].alt, locale)}
                  width={project.screenshots[0].width}
                  height={project.screenshots[0].height}
                  priority
                  sizes="100vw"
                  className="transition-transform duration-500 group-hover:scale-[1.015]"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openShotAt(0);
                  }}
                  aria-label={t.caseStudy.enlargeHint}
                  className="absolute bottom-4 right-4 inline-flex items-center gap-2 min-h-[40px] border border-[var(--border-control)] bg-[#0A0A0B]/90 px-3.5 py-2 text-[11px] uppercase tracking-[0.15em] text-[var(--ivory)] hover:border-[var(--brass-light)] hover:text-[var(--brass-light)] transition-colors"
                >
                  <Maximize2 className="h-3.5 w-3.5 text-[var(--brass-light)]" />
                  <span>{t.caseStudy.enlargeHint}</span>
                </button>
              </div>
              <p className="mt-2.5 text-xs text-[var(--muted)]">
                {pickLocale(project.screenshots[0].caption, locale)}
              </p>
            </div>
          )}

          {/* 01 / Overview & Goals */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-14 border-t border-[var(--line)]">
            <div className="lg:col-span-4">
              <h2 className="font-editorial text-2xl sm:text-3xl text-[var(--ivory)]">
                {t.caseStudy.sec01Overview}
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-4 text-base sm:text-lg text-[var(--ivory)]/90 leading-relaxed">
                {project.overview.map((para, idx) => (
                  <p key={idx}>{pickLocale(para, locale)}</p>
                ))}
              </div>

              <div className="border border-[var(--line)] bg-[#131316] p-6">
                <h3 className="label-editorial text-[var(--brass-light)] mb-3">
                  {t.caseStudy.goalsSubheading}
                </h3>
                <ul className="space-y-2.5 text-sm sm:text-base text-[var(--ivory)]/90">
                  {project.goals.map((goal, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--brass-light)] mt-1" />
                      <span>{pickLocale(goal, locale)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 02 / Problem & Target Users */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-14 border-t border-[var(--line)]">
            <div className="lg:col-span-4">
              <h2 className="font-editorial text-2xl sm:text-3xl text-[var(--ivory)]">
                {t.caseStudy.sec02ProblemUsers}
              </h2>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-[var(--line)] bg-[#131316] p-6 space-y-3">
                <h3 className="label-editorial text-[var(--brass-light)]">
                  {t.caseStudy.problemSubheading}
                </h3>
                {project.problem.map((item, idx) => (
                  <p
                    key={idx}
                    className="text-sm text-[var(--ivory)]/90 leading-relaxed"
                  >
                    {pickLocale(item, locale)}
                  </p>
                ))}
              </div>

              <div className="border border-[var(--line)] bg-[#131316] p-6 space-y-3">
                <h3 className="label-editorial text-[var(--brass-light)]">
                  {t.caseStudy.usersSubheading}
                </h3>
                <ul className="space-y-2.5 text-sm text-[var(--ivory)]/90 leading-relaxed">
                  {project.targetUsers.map((user, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-[var(--brass-light)] font-bold">
                        •
                      </span>
                      <span>{pickLocale(user, locale)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 03 / Role, Team & Contribution Boundaries */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-14 border-t border-[var(--line)]">
            <div className="lg:col-span-4">
              <h2 className="font-editorial text-2xl sm:text-3xl text-[var(--ivory)]">
                {t.caseStudy.sec03RoleTeam}
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-6">
              <div className="border border-[var(--line)] bg-[#131316] p-6 space-y-4">
                <div>
                  <h3 className="label-editorial text-[var(--brass-light)] mb-1.5">
                    {t.caseStudy.teamSetupSubheading}
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--ivory)]/90 leading-relaxed">
                    {pickLocale(project.teamSetup, locale)}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--line)]">
                  <h3 className="label-editorial text-[var(--brass-light)] mb-2.5">
                    {t.caseStudy.boundariesSubheading}
                  </h3>
                  <ul className="space-y-2.5 text-sm text-[var(--ivory)]/90 leading-relaxed">
                    {project.contributionBoundaries.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-[var(--brass-light)]">•</span>
                        <span>{pickLocale(b, locale)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {project.confirmationNote && (
                <div className="border border-amber-500/50 bg-[#241B09] p-5 flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-amber-300 mt-0.5" />
                  <div>
                    <span className="block text-[11px] uppercase tracking-[0.15em] text-amber-300 font-medium mb-1">
                      {t.caseStudy.confirmationBadge}
                    </span>
                    <p className="text-xs sm:text-sm text-[var(--ivory)]/90 leading-relaxed">
                      {pickLocale(project.confirmationNote, locale)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* 04 / Verified Features Ledger */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-14 border-t border-[var(--line)]">
            <div className="lg:col-span-4">
              <h2 className="font-editorial text-2xl sm:text-3xl text-[var(--ivory)]">
                {t.caseStudy.sec04VerifiedFeatures}
              </h2>
            </div>
            <div className="lg:col-span-8">
              <div className="divide-y divide-[var(--line)] border border-[var(--line)] bg-[#131316]">
                {project.verifiedFeatures.map((feat, idx) => (
                  <div key={idx} className="p-5 sm:p-6 space-y-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="font-medium text-base text-[var(--ivory)]">
                        {pickLocale(feat.name, locale)}
                      </h3>
                      <StatusBadge status={feat.status} />
                    </div>
                    <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                      {pickLocale(feat.evidence, locale)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 05 / Tech Stack & Operational System Workflow (5 Steps) */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-14 border-t border-[var(--line)]">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-2 mb-2 text-[var(--brass-light)]">
                <Workflow className="h-5 w-5" />
                <span className="label-editorial text-[10px]">Alur Sistem & Arsitektur</span>
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl text-[var(--ivory)]">
                05 / Alur Sistem Kerja Operasional
              </h2>
              <p className="text-xs sm:text-sm text-[var(--muted)] mt-2 leading-relaxed">
                Pemetaan alur data, input pengguna, pemrosesan logika, dan hasil akhir dari hulu ke hilir.
              </p>
            </div>
            <div className="lg:col-span-8 space-y-6">
              {/* Stack Verification Source */}
              <div className="border border-[var(--line)] bg-[#131316] p-6">
                <span className="label-editorial text-[var(--brass-light)] block mb-2">
                  {t.caseStudy.techSourceLabel}
                </span>
                <p className="text-sm text-[var(--muted)] mb-4">
                  {pickLocale(project.techVerificationSource, locale)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((item) => (
                    <span
                      key={item}
                      className="border border-[var(--border-control)] bg-[#0A0A0B] px-3 py-1.5 text-xs text-[var(--ivory)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* 5-Step Operational Workflow Matrix */}
              {project.workflowSteps && (
                <div className="space-y-4">
                  <div className="border border-[var(--line)] bg-[#131316] p-4">
                    <h3 className="label-editorial text-[var(--brass-light)] mb-1">
                      5 Tahap Alur Sistem Operasional
                    </h3>
                    <p className="text-xs text-[var(--muted)]">
                      Langkah-langkah di bawah menggambarkan proses yang dialami pengguna dan eksekusi komputasi di latar belakang.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {project.workflowSteps.map((st) => (
                      <div
                        key={st.step}
                        className="border border-[var(--line)] bg-[#0E0E11] p-5 sm:p-6 space-y-3.5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--line)]">
                          <div className="flex items-center gap-3">
                            <span className="flex h-7 w-7 items-center justify-center font-mono text-xs font-bold border border-[var(--brass)] bg-[#1F190F] text-[var(--brass-light)]">
                              {st.step}
                            </span>
                            <h4 className="font-editorial text-lg text-[var(--ivory)]">
                              {pickLocale(st.title, locale)}
                            </h4>
                          </div>
                          <span className="text-[10px] uppercase font-mono px-2 py-0.5 border border-[var(--line)] bg-[#131316] text-[var(--muted)]">
                            {pickLocale(st.badge, locale)}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-[var(--ivory)]/90 leading-relaxed">
                          {pickLocale(st.summary, locale)}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                          <div className="border border-[var(--line)] bg-[#131316] p-3 space-y-1">
                            <span className="text-[10px] uppercase font-mono text-[var(--brass-light)] flex items-center gap-1.5">
                              <Sliders className="h-3 w-3" /> Input Data
                            </span>
                            <p className="text-xs text-[var(--muted)] leading-relaxed">
                              {pickLocale(st.input, locale)}
                            </p>
                          </div>
                          <div className="border border-[var(--line)] bg-[#131316] p-3 space-y-1">
                            <span className="text-[10px] uppercase font-mono text-[#93C5FD] flex items-center gap-1.5">
                              <Cpu className="h-3 w-3" /> Logika Pemrosesan
                            </span>
                            <p className="text-xs text-[var(--muted)] leading-relaxed">
                              {pickLocale(st.process, locale)}
                            </p>
                          </div>
                          <div className="border border-[var(--line)] bg-[#131316] p-3 space-y-1">
                            <span className="text-[10px] uppercase font-mono text-[#86EFAC] flex items-center gap-1.5">
                              <CheckCircle2 className="h-3 w-3" /> Output / Hasil
                            </span>
                            <p className="text-xs text-[var(--muted)] leading-relaxed">
                              {pickLocale(st.output, locale)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* 06 / Real-World Case Scenarios (3 Scenarios) */}
          {project.scenarioExamples && (
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-14 border-t border-[var(--line)]">
              <div className="lg:col-span-4">
                <div className="flex items-center gap-2 mb-2 text-[var(--brass-light)]">
                  <Lightbulb className="h-5 w-5" />
                  <span className="label-editorial text-[10px]">Contoh Penggunaan Nyata</span>
                </div>
                <h2 className="font-editorial text-2xl sm:text-3xl text-[var(--ivory)]">
                  06 / Skenario Kasus & Contoh Simulasi
                </h2>
                <p className="text-xs sm:text-sm text-[var(--muted)] mt-2 leading-relaxed">
                  Tiga skenario nyata bagaimana fitur website ini diuji dengan data input simulasi dan hasil yang dapat diverifikasi.
                </p>
              </div>
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-5">
                {project.scenarioExamples.map((sc, idx) => (
                  <div
                    key={sc.id}
                    className="border border-[var(--line)] bg-[#131316] p-5 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[var(--brass-light)]">
                          Skenario 0{idx + 1}
                        </span>
                        <span className="text-[9px] uppercase font-mono text-[var(--muted)] border border-[var(--line)] px-2 py-0.5">
                          {pickLocale(sc.category, locale)}
                        </span>
                      </div>
                      <h4 className="font-editorial text-lg text-[var(--ivory)]">
                        {pickLocale(sc.title, locale)}
                      </h4>
                      <p className="text-xs text-[var(--muted)] leading-relaxed">
                        {pickLocale(sc.description, locale)}
                      </p>

                      <div className="border border-[var(--line)] bg-[#0A0A0B] p-3 space-y-1.5">
                        <span className="label-editorial text-[9px] text-[var(--brass-light)] block">
                          Parameter Input:
                        </span>
                        {sc.sampleData.map((d, dIdx) => (
                          <div key={dIdx} className="text-[11px] flex justify-between gap-1">
                            <span className="text-[var(--muted)]">{pickLocale(d.label, locale)}:</span>
                            <span className="text-[var(--ivory)] font-medium text-right truncate">{d.value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="border border-[#2E7D52]/50 bg-[#0A2618]/50 p-3 text-xs text-[#86EFAC] flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>{pickLocale(sc.expectedResult, locale)}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[var(--line)] text-[11px] text-[var(--muted)] italic">
                      Petunjuk: {pickLocale(sc.actionHint, locale)}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 07 / Authentic Desktop & Mobile Screenshots */}
          <section className="py-14 border-t border-[var(--line)]">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <h2 className="font-editorial text-2xl sm:text-3xl text-[var(--ivory)]">
                07 / Bukti Screenshot Asli (Desktop & Mobile)
              </h2>
              <span className="text-xs text-[var(--muted)]">
                {t.caseStudy.enlargeHint}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Desktop Screenshots Column */}
              <div className="lg:col-span-8 space-y-8">
                {desktopShots.map((shot) => {
                  const fullIndex = project.screenshots.findIndex(
                    (s) => s.id === shot.id
                  );
                  return (
                    <figure
                      key={shot.id}
                      className="border border-[var(--line)] bg-[#131316]"
                    >
                      <div
                        onClick={() => openShotAt(Math.max(0, fullIndex))}
                        className="cursor-pointer overflow-hidden"
                      >
                        <ScreenshotImage
                          src={shot.url}
                          alt={pickLocale(shot.alt, locale)}
                          width={shot.width}
                          height={shot.height}
                          sizes="(max-width: 1024px) 100vw, 66vw"
                        />
                      </div>
                      <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--line)] px-4 py-3 text-xs text-[var(--muted)]">
                        <span>{pickLocale(shot.caption, locale)}</span>
                        <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--brass-light)]">
                          {t.caseStudy.desktopBadge}
                        </span>
                      </figcaption>
                    </figure>
                  );
                })}
              </div>

              {/* Mobile Screenshot Column */}
              <div className="lg:col-span-4 space-y-8">
                {mobileShots.map((shot) => {
                  const fullIndex = project.screenshots.findIndex(
                    (s) => s.id === shot.id
                  );
                  return (
                    <figure
                      key={shot.id}
                      className="mx-auto max-w-xs lg:max-w-none border border-[var(--line)] bg-[#131316]"
                    >
                      <div
                        onClick={() => openShotAt(Math.max(0, fullIndex))}
                        className="cursor-pointer overflow-hidden"
                      >
                        <ScreenshotImage
                          src={shot.url}
                          alt={pickLocale(shot.alt, locale)}
                          width={shot.width}
                          height={shot.height}
                          sizes="(max-width: 1024px) 75vw, 33vw"
                        />
                      </div>
                      <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--line)] px-4 py-3 text-xs text-[var(--muted)]">
                        <span>{pickLocale(shot.caption, locale)}</span>
                        <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--brass-light)]">
                          {t.caseStudy.mobileBadge}
                        </span>
                      </figcaption>
                    </figure>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 08 / Design & Engineering Decisions */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-14 border-t border-[var(--line)]">
            <div className="lg:col-span-4">
              <h2 className="font-editorial text-2xl sm:text-3xl text-[var(--ivory)]">
                08 / Keputusan Desain, Implementasi & Tantangan
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-5">
              {project.decisionsAndChallenges.map((item, idx) => (
                <div
                  key={idx}
                  className="border border-[var(--line)] bg-[#131316] p-6"
                >
                  <h3 className="font-editorial text-2xl text-[var(--ivory)] mb-2">
                    {pickLocale(item.title, locale)}
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
                    {pickLocale(item.detail, locale)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 09 / Honest Status & Known Limitations */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-14 border-t border-[var(--line)]">
            <div className="lg:col-span-4">
              <h2 className="font-editorial text-2xl sm:text-3xl text-[var(--ivory)]">
                09 / Status Kejujuran, Simulasi & Batasan Saat Ini
              </h2>
            </div>
            <div className="lg:col-span-8">
              <div className="border border-[var(--line)] bg-[#131316] p-6 space-y-4">
                <div className="flex items-center gap-2.5 text-[var(--brass-light)]">
                  <ShieldAlert className="h-4 w-4 shrink-0" />
                  <h3 className="label-editorial text-[var(--brass-light)]">
                    {t.caseStudy.limitationsSubheading}
                  </h3>
                </div>
                <ul className="space-y-3 text-sm text-[var(--ivory)]/90 leading-relaxed">
                  {project.limitations.map((lim, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-[var(--brass-light)] font-bold">
                        •
                      </span>
                      <span>{pickLocale(lim, locale)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 10 / Proof of Work & QA Verification Log */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-14 border-t border-[var(--line)]">
            <div className="lg:col-span-4">
              <h2 className="font-editorial text-2xl sm:text-3xl text-[var(--ivory)]">
                10 / Proof of Work & Catatan Pengujian QA
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-[var(--line)] bg-[#131316] p-5">
                  <span className="label-editorial block mb-1.5 text-[10px]">
                    {t.caseStudy.liveLinkLabel}
                  </span>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-[var(--brass-light)] hover:underline break-all"
                  >
                    <span>{project.liveUrl}</span>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                  </a>
                </div>

                <div className="border border-[var(--line)] bg-[#131316] p-5">
                  <span className="label-editorial block mb-1.5 text-[10px]">
                    {t.caseStudy.repoStatusLabel}
                  </span>
                  <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                    {pickLocale(project.repoVisibilityNote, locale)}
                  </p>
                </div>
              </div>

              <div className="border border-[var(--line)] bg-[#131316]">
                <div className="border-b border-[var(--line)] px-5 py-3.5">
                  <h3 className="label-editorial text-[var(--ivory)]">
                    {t.caseStudy.qaTableHeading} ({project.verifiedAt})
                  </h3>
                </div>
                <div className="divide-y divide-[var(--line)]">
                  {project.qaChecks.map((qa, idx) => (
                    <div
                      key={idx}
                      className="p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-[var(--ivory)]">
                          {pickLocale(qa.check, locale)}
                        </p>
                        <p className="text-xs text-[var(--muted)] leading-relaxed">
                          {pickLocale(qa.note, locale)}
                        </p>
                      </div>
                      <span
                        className={cn(
                          'inline-flex shrink-0 self-start border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em]',
                          qa.result === 'PASS' &&
                            'border-[#2E7D52] bg-[#0A2618] text-[#86EFAC]',
                          qa.result === 'FAIL' &&
                            'border-red-500/60 bg-red-950/40 text-red-200',
                          qa.result === 'BLOCKED' &&
                            'border-amber-500/60 bg-amber-950/40 text-amber-200',
                          qa.result === 'NOT RUN' &&
                            'border-[var(--border-control)] bg-[#0A0A0B] text-[var(--muted)]'
                        )}
                      >
                        {qa.result}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Contact CTA Block */}
          <section className="mt-10 border border-[var(--brass)]/60 bg-[#131316] p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <h2 className="font-editorial text-3xl sm:text-4xl text-[var(--ivory)] mb-3">
                  {t.caseStudy.ctaHeading}
                </h2>
                <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
                  {t.caseStudy.ctaDesc}
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-[var(--brass)] px-6 py-3 text-xs uppercase tracking-[0.16em] font-medium text-[#0A0A0B] hover:bg-[var(--brass-light)] transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>{t.caseStudy.ctaPrimary}</span>
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center min-h-[48px] border border-[var(--border-control)] bg-[#0A0A0B] px-5 py-3 text-xs uppercase tracking-[0.16em] text-[var(--ivory)] hover:border-[var(--brass-light)] hover:text-[var(--brass-light)] transition-colors"
                >
                  {t.caseStudy.ctaSecondary}
                </Link>
              </div>
            </div>
          </section>

          {/* Next Web Case Study Link */}
          <div className="mt-12 pt-10 border-t border-[var(--line)]">
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[var(--line)] bg-[#131316] p-6 sm:p-8 hover:border-[var(--brass-light)] transition-colors"
            >
              <div>
                <span className="label-editorial text-[var(--brass-light)] block mb-1.5">
                  {t.caseStudy.nextCaseStudy}
                </span>
                <span className="font-editorial text-2xl sm:text-4xl text-[var(--ivory)] group-hover:text-[var(--brass-light)] transition-colors">
                  {nextProject.name}
                </span>
              </div>
              <span className="inline-flex items-center gap-2 min-h-[44px] self-start sm:self-auto border border-[var(--border-control)] px-5 py-2.5 text-xs uppercase tracking-[0.16em] text-[var(--ivory)] group-hover:border-[var(--brass)] group-hover:bg-[var(--brass)] group-hover:text-[#0A0A0B] transition-colors">
                <span>{t.featuredWeb.caseStudyCta}</span>
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </article>

      <Lightbox
        items={lightboxItems}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
