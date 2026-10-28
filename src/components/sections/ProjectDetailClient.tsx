'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Maximize2 } from 'lucide-react';
import { Project } from '@/types/portfolio';
import { localizeVisualProject } from '@/lib/seed-data';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Lightbox } from '@/components/ui/Lightbox';
import { createBlurDataURL } from '@/lib/utils';

interface ProjectDetailClientProps {
  project: Project;
  nextProject: Project | null;
}

export function ProjectDetailClient({
  project: rawProject,
  nextProject: rawNextProject,
}: ProjectDetailClientProps) {
  const { locale, t } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const project = useMemo(
    () => localizeVisualProject(rawProject, locale),
    [rawProject, locale]
  );

  const nextProject = useMemo(
    () => (rawNextProject ? localizeVisualProject(rawNextProject, locale) : null),
    [rawNextProject, locale]
  );

  const mediaList = useMemo(() => {
    const base =
      Array.isArray(project.media) && project.media.length > 0
        ? project.media
        : [
            {
              id: 'cover-fallback',
              url: project.cover_url,
              type: 'image' as const,
              width: 1600,
              height: 1000,
              alt: project.title,
              blurhash: 'L10A0B241E14',
            },
          ];

    return base.map((item) => ({
      ...item,
      alt: (item.alt || project.title).replace(/\u2014/g, '-'),
    }));
  }, [project]);

  const primaryMedia = mediaList.find((m) => m.is_cover) || mediaList[0];

  const paragraphs = (project.description || '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const openMediaAt = (idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  return (
    <>
      <article className="pt-28 sm:pt-36 pb-20">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          {/* Top Breadcrumb & Cross-Track Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line)] pb-5 mb-10 sm:mb-14">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <Link
                href="/#visual-design"
                className="inline-flex items-center gap-2.5 min-h-[44px] text-xs uppercase tracking-[0.18em] text-[var(--muted)] hover:text-[var(--brass-light)] transition-colors"
              >
                <ArrowLeft className="h-4 w-4 text-[var(--brass-light)]" />
                <span>{t.projectDetail.backToWorks}</span>
              </Link>

              <Link
                href="/projects?track=web"
                className="inline-flex items-center gap-1.5 min-h-[44px] text-xs uppercase tracking-[0.16em] text-[var(--brass-light)] hover:underline"
              >
                <span>{t.projectDetail.allProjectsLink}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="flex items-center gap-2.5">
              {project.featured && (
                <span className="inline-flex items-center border border-[var(--brass)] bg-[#131316] px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[var(--brass-light)]">
                  {t.works.featuredBadge}
                </span>
              )}
              <span className="border border-[var(--line)] bg-[#131316] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[var(--ivory)]">
                {project.category}
              </span>
            </div>
          </div>

          {/* Case Study Editorial Title */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl mb-12 sm:mb-16"
          >
            <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal text-[var(--ivory)] leading-[1.04] tracking-tight">
              {project.title}
            </h1>
          </motion.div>

          {/* 4-Column Case Study Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 border-t border-b border-[var(--line)] divide-y sm:divide-y-0 sm:divide-x divide-[var(--line)] bg-[#131316] mb-12 sm:mb-16">
            <div className="lg:col-span-3 p-5 sm:p-6">
              <span className="label-editorial block mb-1.5 text-[10px]">
                {t.projectDetail.client}
              </span>
              <p className="font-editorial text-xl text-[var(--ivory)]">
                {(project.client || 'Studio Work').replace(/\u2014/g, '-')}
              </p>
            </div>

            <div className="lg:col-span-2 p-5 sm:p-6">
              <span className="label-editorial block mb-1.5 text-[10px]">
                {t.projectDetail.year}
              </span>
              <p className="font-editorial text-xl text-[var(--brass-light)]">
                {project.year}
              </p>
            </div>

            <div className="lg:col-span-3 p-5 sm:p-6">
              <span className="label-editorial block mb-1.5 text-[10px]">
                {t.projectDetail.role}
              </span>
              <p className="font-editorial text-xl text-[var(--ivory)]">
                {project.role.replace(/\u2014/g, '-')}
              </p>
            </div>

            <div className="lg:col-span-4 p-5 sm:p-6">
              <span className="label-editorial block mb-2 text-[10px]">
                {t.projectDetail.tools}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(project.tools || []).map((tool, idx) => (
                  <span
                    key={idx}
                    className="rounded-[2px] border border-[var(--line)] bg-[#0A0A0B] px-2.5 py-1 text-[11px] text-[var(--ivory)]/85"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Primary Cover Media Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mb-16 sm:mb-24"
          >
            <div
              className="group relative border border-[var(--line)] bg-[#131316] overflow-hidden cursor-pointer"
              onClick={() => openMediaAt(0)}
            >
              {primaryMedia.type === 'video' ? (
                <div
                  style={{
                    aspectRatio: `${primaryMedia.width || 1600} / ${primaryMedia.height || 900}`,
                  }}
                  className="relative w-full max-h-[82vh] bg-[#0A0A0B] flex items-center justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <video
                    src={primaryMedia.url}
                    controls
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-contain"
                  />
                </div>
              ) : primaryMedia.type === 'embed' && primaryMedia.embed_url ? (
                <div
                  className="relative w-full aspect-video bg-[#0A0A0B]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <iframe
                    src={primaryMedia.embed_url}
                    title={primaryMedia.alt}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
              ) : (
                <div
                  style={{
                    aspectRatio: `${primaryMedia.width || 1600} / ${primaryMedia.height || 1000}`,
                  }}
                  className="relative w-full max-h-[82vh] overflow-hidden bg-[#0A0A0B]"
                >
                  <Image
                    src={primaryMedia.url}
                    alt={primaryMedia.alt || project.title}
                    width={primaryMedia.width || 1600}
                    height={primaryMedia.height || 1000}
                    priority
                    placeholder="blur"
                    blurDataURL={createBlurDataURL(
                      primaryMedia.width || 16,
                      primaryMedia.height || 10
                    )}
                    unoptimized={
                      primaryMedia.url.startsWith('data:') ||
                      primaryMedia.url.startsWith('/uploads/')
                    }
                    className="h-full w-full object-contain transition-transform duration-500 ease-editorial group-hover:scale-[1.015]"
                  />

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openMediaAt(0);
                    }}
                    aria-label={t.projectDetail.clickToEnlarge}
                    className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 min-h-[44px] border border-[var(--border-control)] bg-[#0A0A0B]/92 px-3.5 py-2 text-[11px] uppercase tracking-[0.16em] text-[var(--ivory)] hover:border-[var(--brass-light)] hover:text-[var(--brass-light)] transition-colors"
                  >
                    <Maximize2 className="h-3.5 w-3.5 text-[var(--brass-light)]" />
                    <span className="hidden sm:inline">
                      {t.projectDetail.clickToEnlarge}
                    </span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Narrative Overview Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-16 sm:pb-24 border-b border-[var(--line)]">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3">
                <span className="font-editorial italic text-sm text-[var(--brass-light)]">
                  01
                </span>
                <span className="h-[1px] w-8 bg-[var(--line)]" />
                <h2 className="label-editorial text-[var(--ivory)]">
                  {t.projectDetail.overview}
                </h2>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6 text-base sm:text-xl text-[var(--ivory)]/90 leading-relaxed">
              {paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>

          {/* Full-Width Adaptive Media Plates Gallery */}
          <div className="pt-16 sm:pt-20">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <span className="font-editorial italic text-sm text-[var(--brass-light)]">
                  02
                </span>
                <span className="h-[1px] w-8 bg-[var(--line)]" />
                <h2 className="label-editorial text-[var(--ivory)]">
                  {t.projectDetail.galleryLabel} ({mediaList.length})
                </h2>
              </div>
              <span className="text-xs text-[var(--muted)] hidden sm:inline">
                {t.projectDetail.clickToEnlarge}
              </span>
            </div>

            <div className="space-y-10 sm:space-y-14">
              {mediaList.map((item, idx) => {
                const isVertical =
                  (item.height || 1000) / (item.width || 1600) >= 1.3;

                return (
                  <motion.figure
                    key={item.id || idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5 }}
                    className={
                      isVertical
                        ? 'mx-auto max-w-md sm:max-w-lg border border-[var(--line)] bg-[#131316]'
                        : 'w-full border border-[var(--line)] bg-[#131316]'
                    }
                  >
                    {item.type === 'video' ? (
                      <div
                        style={{
                          aspectRatio: `${item.width || 1600} / ${item.height || 900}`,
                        }}
                        className="relative w-full bg-[#0A0A0B]"
                      >
                        <video
                          src={item.url}
                          controls
                          playsInline
                          preload="metadata"
                          aria-label={item.alt}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    ) : item.type === 'embed' && item.embed_url ? (
                      <div className="relative w-full aspect-video bg-[#0A0A0B]">
                        <iframe
                          src={item.embed_url}
                          title={item.alt}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="h-full w-full"
                        />
                      </div>
                    ) : (
                      <div
                        onClick={() => openMediaAt(idx)}
                        style={{
                          aspectRatio: `${item.width || 1600} / ${item.height || 1000}`,
                        }}
                        className="group relative w-full overflow-hidden bg-[#0A0A0B] cursor-pointer"
                      >
                        <Image
                          src={item.url}
                          alt={
                            item.alt ||
                            `${project.title} - Plate ${String(idx + 1).padStart(2, '0')}`
                          }
                          width={item.width || 1600}
                          height={item.height || 1000}
                          placeholder="blur"
                          blurDataURL={createBlurDataURL(
                            item.width || 16,
                            item.height || 10
                          )}
                          unoptimized={
                            item.url.startsWith('data:') ||
                            item.url.startsWith('/uploads/')
                          }
                          className="h-full w-full object-contain transition-transform duration-500 ease-editorial group-hover:scale-[1.015]"
                        />

                        <div className="pointer-events-none absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="inline-flex h-10 w-10 items-center justify-center border border-[var(--brass)] bg-[#0A0A0B]/92 text-[var(--brass-light)]">
                            <Maximize2 className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    )}

                    <figcaption className="flex items-center justify-between gap-4 border-t border-[var(--line)] px-4 sm:px-6 py-3.5 text-xs text-[var(--muted)]">
                      <span>{item.alt || project.title}</span>
                      <span className="font-editorial italic text-[var(--brass-light)] shrink-0">
                        Plate {String(idx + 1).padStart(2, '0')} •{' '}
                        {item.width}×{item.height}
                      </span>
                    </figcaption>
                  </motion.figure>
                );
              })}
            </div>
          </div>

          {/* Next Project Navigation Banner */}
          {nextProject && (
            <div className="mt-24 pt-16 border-t border-[var(--line)]">
              <Link
                href={`/karya/${nextProject.slug}`}
                data-cursor="project"
                className="group block border border-[var(--line)] bg-[#131316] p-8 sm:p-12 lg:p-16 hover:border-[var(--brass-light)] transition-colors duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="label-editorial text-[var(--brass-light)]">
                        {t.projectDetail.nextProjectLabel}
                      </span>
                      <span className="h-[1px] w-10 bg-[var(--line)]" />
                      <span className="label-editorial">
                        {nextProject.category} • {nextProject.year}
                      </span>
                    </div>

                    <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-[var(--ivory)] group-hover:text-[var(--brass-light)] transition-colors">
                      {nextProject.title}
                    </h2>
                  </div>

                  <div className="inline-flex items-center gap-3 self-start md:self-auto min-h-[48px] border border-[var(--border-control)] px-6 py-3.5 text-xs uppercase tracking-[0.18em] text-[var(--ivory)] group-hover:border-[var(--brass)] group-hover:bg-[var(--brass)] group-hover:text-[#0A0A0B] transition-colors">
                    <span>{t.projectDetail.exploreNext}</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </article>

      <Lightbox
        items={mediaList}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
