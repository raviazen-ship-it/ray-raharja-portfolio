'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Monitor } from 'lucide-react';
import {
  WebProjectCaseStudy,
  pickLocale,
} from '@/lib/web-projects-data';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { StatusBadge } from '@/components/portfolio/StatusBadge';
import { ScreenshotImage } from '@/components/portfolio/ScreenshotImage';
import { LivePreviewModal } from '@/components/portfolio/LivePreviewModal';

interface WebProjectCardProps {
  project: WebProjectCaseStudy;
  priority?: boolean;
  variant?: 'featured' | 'compact';
}

export function WebProjectCard({
  project,
  priority = false,
  variant = 'featured',
}: WebProjectCardProps) {
  const { locale, t } = useLanguage();
  const [previewOpen, setPreviewOpen] = useState(false);

  const primaryShot =
    project.screenshots.find((s) => s.viewport === 'desktop') ||
    project.screenshots[0];

  if (variant === 'compact') {
    return (
      <>
        <article className="group grid grid-cols-1 md:grid-cols-12 border border-[var(--line)] bg-[#131316] transition-colors duration-300 hover:border-[var(--brass)]/80">
          <div className="md:col-span-5 relative block border-b md:border-b-0 md:border-r border-[var(--line)] bg-[#0A0A0B] overflow-hidden">
            <Link
              href={`/projects/${project.slug}`}
              data-cursor="project"
              aria-label={`${t.featuredWeb.caseStudyCta}: ${project.name}`}
              className="block h-full w-full focus-visible:outline-none"
            >
              <ScreenshotImage
                src={primaryShot?.url}
                alt={primaryShot ? pickLocale(primaryShot.alt, locale) : project.name}
                width={primaryShot?.width || 1440}
                height={primaryShot?.height || 900}
                priority={priority}
                sizes="(max-width: 768px) 100vw, 40vw"
                className="h-full w-full object-cover transition-transform duration-500 ease-editorial group-hover:scale-[1.025]"
              />
            </Link>

            <button
              type="button"
              onClick={() => setPreviewOpen(true)}
              aria-label={`${t.liveSandbox.quickPreviewBtn}: ${project.name}`}
              className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 border border-[var(--border-control)] bg-[#0A0A0B]/90 backdrop-blur-sm text-[11px] uppercase tracking-[0.14em] text-[var(--ivory)] hover:border-[var(--brass-light)] hover:text-[var(--brass-light)] transition-colors"
            >
              <Monitor className="h-3 w-3 text-[var(--brass-light)]" />
              <span>{t.liveSandbox.quickPreviewBtn}</span>
            </button>
          </div>

          <div className="md:col-span-7 flex flex-col justify-between">
            <div className="p-5 sm:p-6 space-y-3.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <StatusBadge status={project.status} />
                <button
                  type="button"
                  onClick={() => setPreviewOpen(true)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] border border-[var(--brass)]/50 bg-[#1F190F] text-[var(--brass-light)] hover:bg-[var(--brass)] hover:text-[#0A0A0B] transition-colors"
                >
                  <Monitor className="h-3 w-3" />
                  <span>{t.liveSandbox.quickPreviewBtn}</span>
                </button>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#D4AF6A] mb-1">
                  {pickLocale(project.categoryLabel, locale)} • {project.year}
                </p>
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#EDE8DF] leading-tight">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="hover:text-[#D4AF6A] transition-colors"
                  >
                    {project.name}
                  </Link>
                </h3>
              </div>

              <p className="text-sm text-[#EDE8DF]/85 leading-relaxed">
                {pickLocale(project.shortDescription, locale)}
              </p>

              <div className="pt-2 border-t border-[var(--line)] flex flex-wrap gap-1.5">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="border border-[var(--line)] bg-[#0A0A0B] px-2.5 py-1 text-[11px] text-[#EDE8DF]/85"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-[var(--line)] bg-[#0E0E11]">
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-4 py-3 text-xs uppercase tracking-[0.16em] font-medium bg-[#B5893B] text-[#0A0A0B] hover:bg-[#D4AF6A] transition-colors"
              >
                <span>{t.featuredWeb.caseStudyCta}</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0" />
              </Link>

              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t.featuredWeb.liveDemoCta}: ${project.name} (${project.liveUrlLabel})`}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] border-t sm:border-t-0 sm:border-l border-[var(--border-control)] px-4 py-3 text-xs uppercase tracking-[0.16em] text-[#EDE8DF] hover:border-[#D4AF6A] hover:text-[#D4AF6A] transition-colors"
              >
                <span>{t.featuredWeb.liveDemoCta}</span>
                <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[#D4AF6A]" />
              </a>
            </div>
          </div>
        </article>

        <LivePreviewModal
          slug={project.slug}
          isOpen={previewOpen}
          onClose={() => setPreviewOpen(false)}
        />
      </>
    );
  }

  return (
    <>
      <article className="group flex h-full flex-col justify-between border border-[var(--line)] bg-[#131316] transition-colors duration-300 hover:border-[var(--brass)]/80">
        <div>
          {/* Authentic Live Screenshot Header with Preview Trigger */}
          <div className="relative block border-b border-[var(--line)] bg-[#0A0A0B] overflow-hidden">
            <Link
              href={`/projects/${project.slug}`}
              data-cursor="project"
              aria-label={`${t.featuredWeb.caseStudyCta}: ${project.name}`}
              className="block focus-visible:outline-none"
            >
              <ScreenshotImage
                src={primaryShot?.url}
                alt={
                  primaryShot
                    ? pickLocale(primaryShot.alt, locale)
                    : project.name
                }
                width={primaryShot?.width || 1440}
                height={primaryShot?.height || 900}
                priority={priority}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="transition-transform duration-500 ease-editorial group-hover:scale-[1.025]"
              />
            </Link>

            <button
              type="button"
              onClick={() => setPreviewOpen(true)}
              aria-label={`${t.liveSandbox.quickPreviewBtn}: ${project.name}`}
              className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 border border-[var(--border-control)] bg-[#0A0A0B]/90 backdrop-blur-sm text-[11px] uppercase tracking-[0.14em] text-[var(--ivory)] hover:border-[var(--brass-light)] hover:text-[var(--brass-light)] transition-colors shadow-lg"
            >
              <Monitor className="h-3 w-3 text-[var(--brass-light)]" />
              <span>{t.liveSandbox.quickPreviewBtn}</span>
            </button>
          </div>

          {/* Metadata & Description */}
          <div className="p-5 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <StatusBadge status={project.status} />
              <button
                type="button"
                onClick={() => setPreviewOpen(true)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] border border-[var(--brass)]/50 bg-[#1F190F] text-[var(--brass-light)] hover:bg-[var(--brass)] hover:text-[#0A0A0B] transition-colors"
              >
                <Monitor className="h-3 w-3" />
                <span>{t.liveSandbox.quickPreviewBtn}</span>
              </button>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#D4AF6A] mb-1.5">
                {pickLocale(project.categoryLabel, locale)} • {project.year}
              </p>
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#EDE8DF] leading-tight">
                <Link
                  href={`/projects/${project.slug}`}
                  className="hover:text-[#D4AF6A] transition-colors"
                >
                  {project.name}
                </Link>
              </h3>
            </div>

            <p className="text-sm text-[#EDE8DF]/85 leading-relaxed">
              {pickLocale(project.shortDescription, locale)}
            </p>

            <div className="pt-2 border-t border-[var(--line)] space-y-2.5 text-xs">
              <div>
                <span className="uppercase tracking-[0.15em] text-[#8A857C] block mb-0.5 text-[10px]">
                  {t.featuredWeb.roleLabel}
                </span>
                <p className="text-[#EDE8DF]/90 leading-snug">
                  {pickLocale(project.role, locale)}
                </p>
              </div>

              <div>
                <span className="uppercase tracking-[0.15em] text-[#8A857C] block mb-1.5 text-[10px]">
                  {t.featuredWeb.stackLabel}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="border border-[var(--line)] bg-[#0A0A0B] px-2.5 py-1 text-[11px] text-[#EDE8DF]/85"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Distinct Internal Case Study vs External Live Demo CTAs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-[var(--line)] bg-[#0E0E11]">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-4 py-3 text-xs uppercase tracking-[0.16em] font-medium bg-[#B5893B] text-[#0A0A0B] hover:bg-[#D4AF6A] transition-colors"
          >
            <span>{t.featuredWeb.caseStudyCta}</span>
            <ArrowRight className="h-3.5 w-3.5 shrink-0" />
          </Link>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t.featuredWeb.liveDemoCta}: ${project.name} (${project.liveUrlLabel})`}
            className="inline-flex items-center justify-center gap-2 min-h-[48px] border-t sm:border-t-0 sm:border-l border-[var(--border-control)] px-4 py-3 text-xs uppercase tracking-[0.16em] text-[#EDE8DF] hover:border-[#D4AF6A] hover:text-[#D4AF6A] transition-colors"
          >
            <span>{t.featuredWeb.liveDemoCta}</span>
            <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[#D4AF6A]" />
          </a>
        </div>
      </article>

      <LivePreviewModal
        slug={project.slug}
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
      />
    </>
  );
}
