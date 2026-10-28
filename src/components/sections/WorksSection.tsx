'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Film, Layers } from 'lucide-react';
import { Project, ProjectCategory } from '@/types/portfolio';
import { localizeVisualProject } from '@/lib/seed-data';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { LazyVideo } from '@/components/ui/LazyVideo';
import { createBlurDataURL, cn } from '@/lib/utils';

interface WorksSectionProps {
  projects: Project[];
}

const CATEGORIES: Array<'Semua' | ProjectCategory> = [
  'Semua',
  'Branding',
  'Graphic Design',
  'Motion',
  'Video Editing',
];

interface RenderSegment {
  type: 'full' | 'masonry';
  projects: Project[];
}

function buildLayoutSegments(projects: Project[]): RenderSegment[] {
  const segments: RenderSegment[] = [];
  let currentMasonry: Project[] = [];

  for (const project of projects) {
    if (project.card_size === 'full') {
      if (currentMasonry.length > 0) {
        segments.push({ type: 'masonry', projects: currentMasonry });
        currentMasonry = [];
      }
      segments.push({ type: 'full', projects: [project] });
    } else {
      currentMasonry.push(project);
    }
  }

  if (currentMasonry.length > 0) {
    segments.push({ type: 'masonry', projects: currentMasonry });
  }

  return segments;
}

function distributeIntoColumns(projects: Project[], colCount: number): Project[][] {
  const cols: Project[][] = Array.from({ length: colCount }, () => []);
  const colHeights: number[] = Array.from({ length: colCount }, () => 0);

  for (const project of projects) {
    const primaryMedia = project.media?.[0];
    const w = primaryMedia?.width || 1600;
    const h = primaryMedia?.height || 1000;
    const aspectRatioWeight = h / w;

    let shortestCol = 0;
    for (let i = 1; i < colCount; i++) {
      if (colHeights[i] < colHeights[shortestCol]) {
        shortestCol = i;
      }
    }

    cols[shortestCol].push(project);
    colHeights[shortestCol] += aspectRatioWeight + 0.18;
  }

  return cols;
}

function ProjectCard({
  project,
  index,
  priority = false,
}: {
  project: Project;
  index: number;
  priority?: boolean;
}) {
  const { locale, t } = useLanguage();
  const coverMedia =
    project.media?.find((m) => m.is_cover) || project.media?.[0];

  const width = coverMedia?.width || 1600;
  const height = coverMedia?.height || 1000;
  const mediaUrl = project.cover_url || coverMedia?.url || '';
  const isVideo =
    coverMedia?.type === 'video' ||
    mediaUrl.endsWith('.mp4') ||
    mediaUrl.endsWith('.webm');
  const rawAlt =
    coverMedia?.alt || `${project.title} (${project.category}, ${project.year})`;
  const altText = rawAlt.replace(/\u2014/g, '-');

  const isVerticalReel = height / width >= 1.45;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.05, 0.2),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex flex-col border border-[var(--line)] bg-[#131316] hover:border-[var(--brass)]/80 transition-colors"
    >
      <Link
        href={`/karya/${project.slug}`}
        data-cursor="project"
        aria-label={
          locale === 'en'
            ? `Read visual work details: ${project.title}`
            : `Lihat detail karya visual: ${project.title}`
        }
        className="relative block w-full overflow-hidden bg-[#0A0A0B] focus-visible:outline-none"
      >
        {/* Aspect-Ratio Preserving Media Container */}
        <div
          style={{ aspectRatio: `${width} / ${height}` }}
          className="relative w-full overflow-hidden bg-[#131316]"
        >
          {isVideo ? (
            <div className="h-full w-full transition-transform duration-500 ease-editorial group-hover:scale-[1.03]">
              <LazyVideo
                src={mediaUrl}
                poster={coverMedia?.thumbnail_url}
                width={width}
                height={height}
                alt={altText}
                className="h-full w-full"
              />
            </div>
          ) : (
            <Image
              src={mediaUrl}
              alt={altText}
              width={width}
              height={height}
              priority={priority}
              sizes={
                project.card_size === 'full'
                  ? '100vw'
                  : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
              }
              placeholder="blur"
              blurDataURL={createBlurDataURL(width, height)}
              unoptimized={
                mediaUrl.startsWith('data:') || mediaUrl.startsWith('/uploads/')
              }
              className="h-full w-full object-cover transition-transform duration-500 ease-editorial group-hover:scale-[1.03]"
            />
          )}

          {/* Top Floating Metadata Plates (Solid high-contrast ground, zero glass blur) */}
          <div className="pointer-events-none absolute top-3.5 left-3.5 right-3.5 z-10 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {project.featured && (
                <span className="inline-flex items-center border border-[var(--brass)] bg-[#0A0A0B]/92 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-[var(--brass-light)]">
                  {t.works.featuredBadge}
                </span>
              )}
              {isVerticalReel && (
                <span className="inline-flex items-center gap-1.5 border border-[var(--border-control)] bg-[#0A0A0B]/92 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-[var(--ivory)]">
                  <Film className="h-3 w-3 text-[var(--brass-light)]" />
                  <span>9:16 Reel</span>
                </span>
              )}
            </div>

            <span className="border border-[var(--line)] bg-[#0A0A0B]/92 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-[var(--ivory)]/85">
              {project.year}
            </span>
          </div>

          {/* Subtle Dark Hover Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/92 via-[#0A0A0B]/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-5 sm:p-6">
            <div className="translate-y-3 transition-transform duration-300 ease-editorial group-hover:translate-y-0">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--brass-light)] block mb-1">
                {project.category} • {project.client}
              </span>
              <div className="flex items-end justify-between gap-3">
                <h3 className="font-editorial text-2xl sm:text-3xl text-[var(--ivory)] leading-tight">
                  {project.title}
                </h3>
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-[var(--brass)] bg-[var(--brass)] text-[#0A0A0B]">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Always-Visible Editorial Caption Bar */}
        <div className="flex items-center justify-between gap-4 border-t border-[var(--line)] bg-[#131316] px-4 sm:px-5 py-3.5">
          <div className="min-w-0">
            <h3 className="font-editorial text-lg sm:text-xl text-[var(--ivory)] truncate group-hover:text-[var(--brass-light)] transition-colors">
              {project.title}
            </h3>
            <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--muted)] truncate mt-0.5">
              {project.category} • {project.client}
            </p>
          </div>

          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-[var(--border-control)] text-[var(--ivory)]/80 group-hover:border-[var(--brass-light)] group-hover:text-[var(--brass-light)] transition-colors">
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export function WorksSection({ projects }: WorksSectionProps) {
  const { locale, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'Semua' | ProjectCategory>(
    'Semua'
  );

  const localizedProjects = useMemo(
    () => projects.map((p) => localizeVisualProject(p, locale)),
    [projects, locale]
  );

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'Semua') return localizedProjects;
    return localizedProjects.filter((p) => p.category === activeCategory);
  }, [localizedProjects, activeCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { Semua: localizedProjects.length };
    for (const cat of CATEGORIES) {
      if (cat !== 'Semua') {
        counts[cat] = localizedProjects.filter((p) => p.category === cat).length;
      }
    }
    return counts;
  }, [localizedProjects]);

  const segments = useMemo(
    () => buildLayoutSegments(filteredProjects),
    [filteredProjects]
  );

  return (
    <section
      id="visual-design"
      aria-labelledby="heading-karya"
      className="relative py-20 sm:py-28 border-b border-[var(--line)] scroll-mt-20"
    >
      {/* Legacy anchor alias so #karya continues working cleanly */}
      <div id="karya" className="absolute -top-20" aria-hidden="true" />

      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-[var(--line)]">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-editorial italic text-sm text-[var(--brass-light)]">
                {t.works.index}
              </span>
              <span className="h-[1px] w-10 bg-[var(--line)]" />
              <span className="label-editorial">{t.works.label}</span>
            </div>

            <h2
              id="heading-karya"
              className="section-heading font-normal text-[var(--ivory)]"
            >
              {t.works.heading}
            </h2>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
              {t.works.subtitle}
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 min-h-[44px] text-xs uppercase tracking-[0.16em] text-[var(--brass-light)] hover:underline"
            >
              <span>{t.works.viewAllProjectsLink}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label={
            locale === 'en' ? 'Filter Design Category' : 'Filter Kategori Karya'
          }
          className="flex flex-wrap items-center gap-2 sm:gap-3 py-8 border-b border-[var(--line)]"
        >
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            const label =
              t.works.categories[category as keyof typeof t.works.categories] ||
              category;
            const count = categoryCounts[category] ?? 0;

            return (
              <button
                key={category}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  'relative inline-flex items-center gap-2 min-h-[44px] px-4 sm:px-5 py-2 text-xs uppercase tracking-[0.16em] transition-colors border',
                  isActive
                    ? 'border-[var(--brass)] text-[#0A0A0B] font-medium'
                    : 'border-[var(--border-control)] bg-[#131316] text-[var(--ivory)]/85 hover:border-[var(--brass-light)] hover:text-[var(--brass-light)]'
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeCategoryPill"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                    }}
                    className="absolute inset-0 bg-[var(--brass)] -z-0"
                  />
                )}
                <span className="relative z-10">{label}</span>
                <span
                  className={cn(
                    'relative z-10 font-editorial italic text-xs',
                    isActive ? 'text-[#0A0A0B]' : 'text-[var(--brass-light)]'
                  )}
                >
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Adaptive Masonry & Showcase Gallery */}
        <div className="mt-10 sm:mt-12">
          <AnimatePresence mode="wait">
            {filteredProjects.length === 0 ? (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="border border-[var(--line)] bg-[#131316] p-12 sm:p-16 text-center max-w-xl mx-auto my-8"
              >
                <Layers className="h-8 w-8 text-[var(--brass-light)] mx-auto mb-4 stroke-[1.25]" />
                <h3 className="font-editorial text-2xl text-[var(--ivory)] mb-2">
                  {t.works.emptyTitle}
                </h3>
                <p className="text-sm text-[var(--muted)] mb-6">
                  {t.works.emptyDesc}
                </p>
                <button
                  type="button"
                  onClick={() => setActiveCategory('Semua')}
                  className="inline-flex items-center justify-center min-h-[44px] border border-[var(--brass)] bg-[var(--brass)] px-5 py-2.5 text-xs uppercase tracking-[0.18em] font-medium text-[#0A0A0B] hover:bg-[var(--brass-light)] transition-colors"
                >
                  {t.works.resetFilter}
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-8 lg:space-y-10"
              >
                {segments.map((segment, segIdx) => {
                  if (segment.type === 'full') {
                    const fullProject = segment.projects[0];
                    return (
                      <div key={`full-${fullProject.id}`} className="w-full">
                        <ProjectCard
                          project={fullProject}
                          index={segIdx}
                          priority={false}
                        />
                      </div>
                    );
                  }

                  const twoCols = distributeIntoColumns(segment.projects, 2);
                  const threeCols = distributeIntoColumns(segment.projects, 3);

                  return (
                    <div key={`masonry-${segIdx}`}>
                      {/* Mobile: 1 Column (<640px) */}
                      <div className="flex flex-col gap-6 sm:hidden">
                        {segment.projects.map((project, idx) => (
                          <ProjectCard
                            key={project.id}
                            project={project}
                            index={idx}
                          />
                        ))}
                      </div>

                      {/* Tablet: 2 Balanced Masonry Columns (640px - 1023px) */}
                      <div className="hidden sm:grid lg:hidden grid-cols-2 gap-6 items-start">
                        {twoCols.map((colProjects, colIdx) => (
                          <div key={colIdx} className="flex flex-col gap-6">
                            {colProjects.map((project, idx) => (
                              <ProjectCard
                                key={project.id}
                                project={project}
                                index={idx}
                              />
                            ))}
                          </div>
                        ))}
                      </div>

                      {/* Desktop: 3 Balanced Masonry Columns (1024px+) */}
                      <div className="hidden lg:grid grid-cols-3 gap-8 items-start">
                        {threeCols.map((colProjects, colIdx) => (
                          <div key={colIdx} className="flex flex-col gap-8">
                            {colProjects.map((project, idx) => (
                              <ProjectCard
                                key={project.id}
                                project={project}
                                index={idx}
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
