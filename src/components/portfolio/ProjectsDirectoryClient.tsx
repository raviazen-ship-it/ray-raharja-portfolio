'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, X, Layers, ArrowRight } from 'lucide-react';
import { Project } from '@/types/portfolio';
import { localizeVisualProject } from '@/lib/seed-data';
import {
  WEB_PROJECTS,
  CAPABILITIES,
  CapabilityId,
  pickLocale,
} from '@/lib/web-projects-data';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { WebProjectCard } from '@/components/portfolio/WebProjectCard';
import { ScreenshotImage } from '@/components/portfolio/ScreenshotImage';
import { LazyVideo } from '@/components/ui/LazyVideo';
import { StatusBadge } from '@/components/portfolio/StatusBadge';
import { cn } from '@/lib/utils';

type TrackFilter = 'all' | 'web' | 'visual';
type CapabilityFilter = 'all' | CapabilityId;

interface ProjectsDirectoryClientProps {
  visualProjects: Project[];
}

export function ProjectsDirectoryClient({
  visualProjects,
}: ProjectsDirectoryClientProps) {
  const { locale, t } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialTrack = ((): TrackFilter => {
    const raw = searchParams.get('track');
    if (raw === 'web' || raw === 'visual') return raw;
    return 'all';
  })();

  const initialCapability = ((): CapabilityFilter => {
    const raw = searchParams.get('capability') as CapabilityId | null;
    if (raw && CAPABILITIES.some((c) => c.id === raw)) return raw;
    return 'all';
  })();

  const [trackFilter, setTrackFilter] = useState<TrackFilter>(initialTrack);
  const [capabilityFilter, setCapabilityFilter] =
    useState<CapabilityFilter>(initialCapability);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const rawTrack = searchParams.get('track');
    if (rawTrack === 'web' || rawTrack === 'visual') {
      setTrackFilter(rawTrack);
    } else if (!rawTrack) {
      setTrackFilter('all');
    }

    const rawCap = searchParams.get('capability') as CapabilityId | null;
    if (rawCap && CAPABILITIES.some((c) => c.id === rawCap)) {
      setCapabilityFilter(rawCap);
    } else if (!rawCap) {
      setCapabilityFilter('all');
    }
  }, [searchParams]);

  const syncUrlParams = (nextTrack: TrackFilter, nextCap: CapabilityFilter) => {
    const params = new URLSearchParams();
    if (nextTrack !== 'all') params.set('track', nextTrack);
    if (nextCap !== 'all') params.set('capability', nextCap);
    const qs = params.toString();
    router.replace(qs ? `/projects?${qs}` : '/projects', { scroll: false });
  };

  const handleTrackChange = (nextTrack: TrackFilter) => {
    setTrackFilter(nextTrack);
    syncUrlParams(nextTrack, capabilityFilter);
  };

  const handleCapabilityChange = (nextCap: CapabilityFilter) => {
    setCapabilityFilter(nextCap);
    syncUrlParams(trackFilter, nextCap);
  };

  const resetAllFilters = () => {
    setTrackFilter('all');
    setCapabilityFilter('all');
    setSearchQuery('');
    router.replace('/projects', { scroll: false });
  };

  const localizedVisuals = useMemo(
    () => visualProjects.map((p) => localizeVisualProject(p, locale)),
    [visualProjects, locale]
  );

  const normalizedSearch = searchQuery.trim().toLowerCase();

  const filteredWebProjects = useMemo(() => {
    if (trackFilter === 'visual') return [];
    return WEB_PROJECTS.filter((proj) => {
      if (
        capabilityFilter !== 'all' &&
        !proj.capabilities.includes(capabilityFilter)
      ) {
        return false;
      }

      if (!normalizedSearch) return true;

      const haystack = [
        proj.name,
        pickLocale(proj.subtitle, locale),
        pickLocale(proj.shortDescription, locale),
        pickLocale(proj.categoryLabel, locale),
        pickLocale(proj.role, locale),
        ...proj.techStack,
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(normalizedSearch);
    });
  }, [trackFilter, capabilityFilter, normalizedSearch, locale]);

  const filteredVisualProjects = useMemo(() => {
    if (trackFilter === 'web') return [];
    return localizedVisuals.filter((proj) => {
      if (
        capabilityFilter !== 'all' &&
        capabilityFilter !== 'graphic-design'
      ) {
        return false;
      }

      if (!normalizedSearch) return true;

      const haystack = [
        proj.title,
        proj.description,
        proj.category,
        proj.client,
        proj.role,
        ...(proj.tools || []),
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(normalizedSearch);
    });
  }, [trackFilter, capabilityFilter, normalizedSearch, localizedVisuals]);

  const totalCount = WEB_PROJECTS.length + localizedVisuals.length;
  const shownCount = filteredWebProjects.length + filteredVisualProjects.length;

  return (
    <div className="pt-28 sm:pt-36 pb-20 sm:pb-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Page Header */}
        <header className="pb-10 sm:pb-12 border-b border-[var(--line)]">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-editorial italic text-sm text-[var(--brass-light)]">
              /projects
            </span>
            <span className="h-[1px] w-10 bg-[var(--line)]" />
            <span className="label-editorial">{t.projectsPage.eyebrow}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-7">
              <h1 className="font-editorial text-4xl sm:text-6xl font-normal text-[var(--ivory)] leading-[1.04]">
                {t.projectsPage.heading}
              </h1>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
                {t.projectsPage.subtitle}
              </p>
            </div>
          </div>
        </header>

        {/* Accessible Filter & Search Controls */}
        <section
          aria-label={t.projectsPage.trackFilterLabel}
          className="py-8 border-b border-[var(--line)] space-y-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            {/* Track Tabs */}
            <div className="lg:col-span-7">
              <span className="label-editorial block mb-2.5 text-[10px]">
                {t.projectsPage.trackFilterLabel}
              </span>
              <div
                role="group"
                aria-label={t.projectsPage.trackFilterLabel}
                className="flex flex-wrap gap-2"
              >
                {(
                  [
                    {
                      id: 'all' as const,
                      label: t.projectsPage.tracks.all,
                      count: totalCount,
                    },
                    {
                      id: 'web' as const,
                      label: t.projectsPage.tracks.web,
                      count: WEB_PROJECTS.length,
                    },
                    {
                      id: 'visual' as const,
                      label: t.projectsPage.tracks.visual,
                      count: localizedVisuals.length,
                    },
                  ] as const
                ).map((item) => {
                  const active = trackFilter === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => handleTrackChange(item.id)}
                      className={cn(
                        'inline-flex items-center gap-2 min-h-[44px] px-4 py-2 text-xs uppercase tracking-[0.15em] border transition-colors',
                        active
                          ? 'border-[var(--brass)] bg-[var(--brass)] text-[#0A0A0B] font-medium'
                          : 'border-[var(--border-control)] bg-[#131316] text-[var(--ivory)]/85 hover:border-[var(--brass-light)] hover:text-[var(--brass-light)]'
                      )}
                    >
                      <span>{item.label}</span>
                      <span
                        className={cn(
                          'font-editorial italic text-xs',
                          active ? 'text-[#0A0A0B]' : 'text-[var(--brass-light)]'
                        )}
                      >
                        ({item.count})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search Input */}
            <div className="lg:col-span-5">
              <label
                htmlFor="projects-search-input"
                className="label-editorial block mb-2.5 text-[10px]"
              >
                {t.projectsPage.searchLabel}
              </label>
              <div className="relative">
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted)]"
                />
                <input
                  id="projects-search-input"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.projectsPage.searchPlaceholder}
                  className="w-full min-h-[44px] border border-[var(--border-control)] bg-[#131316] pl-10 pr-11 py-2.5 text-sm text-[var(--ivory)] placeholder:text-[var(--muted)] focus:border-[var(--brass-light)] focus:outline-none transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label={t.projectsPage.clearSearch}
                    className="absolute right-1 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center text-[var(--muted)] hover:text-[var(--ivory)]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Capability Pills */}
          <div>
            <span className="label-editorial block mb-2.5 text-[10px]">
              {t.projectsPage.capabilityFilterLabel}
            </span>
            <div
              role="group"
              aria-label={t.projectsPage.capabilityFilterLabel}
              className="flex flex-wrap gap-2"
            >
              <button
                type="button"
                aria-pressed={capabilityFilter === 'all'}
                onClick={() => handleCapabilityChange('all')}
                className={cn(
                  'min-h-[44px] px-4 py-2 text-xs uppercase tracking-[0.15em] border transition-colors',
                  capabilityFilter === 'all'
                    ? 'border-[var(--brass-light)] bg-[#221B0E] text-[var(--brass-light)] font-medium'
                    : 'border-[var(--border-control)] bg-[#131316] text-[var(--muted)] hover:border-[var(--brass-light)] hover:text-[var(--ivory)]'
                )}
              >
                {t.projectsPage.allCapabilities}
              </button>

              {CAPABILITIES.map((cap) => {
                const active = capabilityFilter === cap.id;
                return (
                  <button
                    key={cap.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => handleCapabilityChange(cap.id)}
                    className={cn(
                      'min-h-[44px] px-4 py-2 text-xs uppercase tracking-[0.15em] border transition-colors',
                      active
                        ? 'border-[var(--brass-light)] bg-[#221B0E] text-[var(--brass-light)] font-medium'
                        : 'border-[var(--border-control)] bg-[#131316] text-[var(--muted)] hover:border-[var(--brass-light)] hover:text-[var(--ivory)]'
                    )}
                  >
                    {pickLocale(cap.title, locale)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Result Summary Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-[var(--muted)]">
            <p aria-live="polite">
              {t.projectsPage.resultsCount}{' '}
              <strong className="text-[var(--ivory)] font-medium">
                {shownCount}
              </strong>{' '}
              {t.projectsPage.ofCount} {totalCount} {t.projectsPage.itemsUnit}
            </p>
            {(trackFilter !== 'all' ||
              capabilityFilter !== 'all' ||
              searchQuery.trim() !== '') && (
              <button
                type="button"
                onClick={resetAllFilters}
                className="inline-flex items-center gap-1.5 min-h-[44px] px-3 text-xs uppercase tracking-[0.15em] text-[var(--brass-light)] hover:underline"
              >
                <X className="h-3.5 w-3.5" />
                <span>{t.projectsPage.resetAll}</span>
              </button>
            )}
          </div>
        </section>

        {/* Empty State */}
        {shownCount === 0 ? (
          <div className="border border-[var(--line)] bg-[#131316] p-12 sm:p-16 text-center max-w-xl mx-auto my-14">
            <Layers className="h-8 w-8 text-[var(--brass-light)] mx-auto mb-4" />
            <h2 className="font-editorial text-2xl sm:text-3xl text-[var(--ivory)] mb-2">
              {t.projectsPage.emptyTitle}
            </h2>
            <p className="text-sm text-[var(--muted)] mb-6">
              {t.projectsPage.emptyDesc}
            </p>
            <button
              type="button"
              onClick={resetAllFilters}
              className="inline-flex items-center justify-center min-h-[44px] border border-[var(--brass)] bg-[var(--brass)] px-6 py-2.5 text-xs uppercase tracking-[0.16em] font-medium text-[#0A0A0B] hover:bg-[var(--brass-light)] transition-colors"
            >
              {t.projectsPage.resetAll}
            </button>
          </div>
        ) : (
          <div className="space-y-20 pt-12">
            {/* Web & Digital Products Section */}
            {filteredWebProjects.length > 0 && (
              <section aria-labelledby="dir-web-heading">
                <div className="flex items-center justify-between gap-4 pb-6 mb-8 border-b border-[var(--line)]">
                  <h2
                    id="dir-web-heading"
                    className="font-editorial text-3xl sm:text-4xl text-[var(--ivory)]"
                  >
                    {t.projectsPage.webSectionHeading}
                  </h2>
                  <span className="font-editorial italic text-lg text-[var(--brass-light)]">
                    ({filteredWebProjects.length})
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
                  {filteredWebProjects.map((project, idx) => (
                    <WebProjectCard
                      key={project.id}
                      project={project}
                      priority={idx < 3}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Visual Design & Production Section */}
            {filteredVisualProjects.length > 0 && (
              <section aria-labelledby="dir-visual-heading">
                <div className="flex items-center justify-between gap-4 pb-6 mb-8 border-b border-[var(--line)]">
                  <h2
                    id="dir-visual-heading"
                    className="font-editorial text-3xl sm:text-4xl text-[var(--ivory)]"
                  >
                    {t.projectsPage.visualSectionHeading}
                  </h2>
                  <span className="font-editorial italic text-lg text-[var(--brass-light)]">
                    ({filteredVisualProjects.length})
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
                  {filteredVisualProjects.map((project) => {
                    const coverMedia =
                      project.media?.find((m) => m.is_cover) ||
                      project.media?.[0];
                    const mediaUrl = project.cover_url || coverMedia?.url || '';
                    const isVideo =
                      coverMedia?.type === 'video' ||
                      mediaUrl.endsWith('.mp4') ||
                      mediaUrl.endsWith('.webm');

                    return (
                      <article
                        key={project.id}
                        className="group flex flex-col justify-between border border-[var(--line)] bg-[#131316] hover:border-[var(--brass)]/80 transition-colors"
                      >
                        <div>
                          <Link
                            href={`/karya/${project.slug}`}
                            data-cursor="project"
                            className="block border-b border-[var(--line)] bg-[#0A0A0B] overflow-hidden"
                          >
                            {isVideo ? (
                              <LazyVideo
                                src={mediaUrl}
                                poster={coverMedia?.thumbnail_url}
                                width={16}
                                height={10}
                                alt={coverMedia?.alt || project.title}
                                className="aspect-[16/10] w-full object-cover"
                              />
                            ) : (
                              <ScreenshotImage
                                src={mediaUrl}
                                alt={coverMedia?.alt || project.title}
                                width={1600}
                                height={1000}
                                className="transition-transform duration-500 group-hover:scale-[1.03]"
                              />
                            )}
                          </Link>

                          <div className="p-5 sm:p-6 space-y-3.5">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <StatusBadge status="Verified Feature" />
                              <span className="text-[11px] uppercase tracking-[0.15em] text-[#8A857C]">
                                {project.category} • {project.year}
                              </span>
                            </div>

                            <h3 className="font-editorial text-2xl text-[#EDE8DF] leading-snug">
                              <Link
                                href={`/karya/${project.slug}`}
                                className="hover:text-[#D4AF6A] transition-colors"
                              >
                                {project.title}
                              </Link>
                            </h3>

                            <p className="text-sm text-[#EDE8DF]/80 line-clamp-3 leading-relaxed">
                              {project.description.split(/\n\s*\n/)[0]}
                            </p>

                            <div className="pt-2 border-t border-[var(--line)] text-xs text-[#8A857C]">
                              <span className="text-[#EDE8DF]/90">
                                {project.role}
                              </span>{' '}
                              • {project.client}
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-[var(--line)] bg-[#0E0E11]">
                          <Link
                            href={`/karya/${project.slug}`}
                            className="w-full inline-flex items-center justify-between min-h-[48px] px-5 py-3 text-xs uppercase tracking-[0.16em] text-[#EDE8DF] hover:text-[#D4AF6A] transition-colors"
                          >
                            <span>{t.projectsPage.viewVisualCase}</span>
                            <ArrowRight className="h-4 w-4 text-[#D4AF6A]" />
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
