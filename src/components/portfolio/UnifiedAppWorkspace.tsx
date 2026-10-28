'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ExternalLink,
  RotateCw,
  Monitor,
  Tablet,
  Smartphone,
  Maximize2,
  Minimize2,
  Info,
  X,
  Check,
  GitBranch,
  ArrowRight,
  Lock,
} from 'lucide-react';
import {
  WEB_PROJECTS,
  WebProjectCaseStudy,
  pickLocale,
} from '@/lib/web-projects-data';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { StatusBadge } from '@/components/portfolio/StatusBadge';
import { cn } from '@/lib/utils';

type ViewportMode = 'desktop' | 'tablet' | 'mobile';

interface UnifiedAppWorkspaceProps {
  initialSlug?: string;
}

export function UnifiedAppWorkspace({
  initialSlug = 'leadkit-bakery',
}: UnifiedAppWorkspaceProps) {
  const { locale, setLocale, t } = useLanguage();

  const [activeSlug, setActiveSlug] = useState<string>(initialSlug);
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [infoOpen, setInfoOpen] = useState<boolean>(false);
  const [iframeKey, setIframeKey] = useState<number>(0);

  const activeProject: WebProjectCaseStudy =
    WEB_PROJECTS.find((p) => p.slug === activeSlug) || WEB_PROJECTS[0];

  const handleSelectProject = (slug: string) => {
    setActiveSlug(slug);
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
    // Update URL path without full reload
    window.history.pushState({}, '', `/apps/${slug}`);
  };

  const handleReload = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  return (
    <div className="min-h-screen h-screen flex flex-col bg-[#070708] text-[#EDE8DF] overflow-hidden select-none">
      {/* Top Persistent Unified Header */}
      <header className="h-16 shrink-0 z-40 border-b border-[var(--line)] bg-[#0E0E11]/95 backdrop-blur-md px-3 sm:px-6 flex items-center justify-between gap-3">
        {/* Left: Back to Portfolio & Hub Brand */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3 py-1.5 border border-[var(--border-control)] bg-[#131316] text-xs uppercase tracking-[0.14em] text-[var(--ivory)] hover:border-[var(--brass-light)] hover:text-[var(--brass-light)] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-[var(--brass-light)]" />
            <span className="hidden sm:inline">{t.liveSandbox.backToPortfolio}</span>
          </Link>

          <div className="hidden md:flex items-center gap-2.5 pl-2 border-l border-[var(--line)]">
            <span className="flex h-7 w-7 items-center justify-center border border-[var(--border-control)] bg-[#131316] font-editorial text-sm font-medium text-[var(--brass-light)]">
              R
            </span>
            <div className="flex flex-col">
              <span className="font-editorial text-sm tracking-wide text-[var(--ivory)] leading-none">
                {t.liveSandbox.appsHubTitle}
              </span>
              <span className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)] mt-0.5">
                Ray Raharja Santoso
              </span>
            </div>
          </div>
        </div>

        {/* Center: App Switcher Tabs */}
        <div className="flex-1 max-w-2xl mx-auto overflow-x-auto scrollbar-none py-1">
          <div
            role="tablist"
            aria-label="Pilih website terintegrasi"
            className="flex items-center justify-center gap-1.5 min-w-max px-2"
          >
            {WEB_PROJECTS.map((proj) => {
              const isActive = proj.slug === activeProject.slug;
              return (
                <button
                  key={proj.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleSelectProject(proj.slug)}
                  className={cn(
                    'group relative inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 text-xs uppercase tracking-[0.12em] border transition-all duration-200',
                    isActive
                      ? 'border-[var(--brass)] bg-[#1F190F] text-[var(--brass-light)] font-medium shadow-sm'
                      : 'border-transparent bg-[#131316]/70 text-[var(--muted)] hover:border-[var(--line)] hover:text-[var(--ivory)]'
                  )}
                >
                  <span
                    className={cn(
                      'h-2 w-2 rounded-full transition-colors',
                      isActive ? 'bg-[#86EFAC] ring-2 ring-[#86EFAC]/30' : 'bg-[#8A857C]'
                    )}
                  />
                  <span className="whitespace-nowrap">{proj.name.split('(')[0].trim()}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Viewport Toggles, External Launch & Drawer Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Viewport Toggles (Desktop / Tablet / Mobile) */}
          <div className="hidden lg:flex items-center border border-[var(--line)] bg-[#131316] p-0.5">
            <button
              type="button"
              onClick={() => setViewport('desktop')}
              title={t.liveSandbox.desktopView}
              className={cn(
                'p-1.5 transition-colors',
                viewport === 'desktop'
                  ? 'bg-[#1F190F] text-[var(--brass-light)]'
                  : 'text-[var(--muted)] hover:text-[var(--ivory)]'
              )}
            >
              <Monitor className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewport('tablet')}
              title={t.liveSandbox.tabletView}
              className={cn(
                'p-1.5 transition-colors',
                viewport === 'tablet'
                  ? 'bg-[#1F190F] text-[var(--brass-light)]'
                  : 'text-[var(--muted)] hover:text-[var(--ivory)]'
              )}
            >
              <Tablet className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewport('mobile')}
              title={t.liveSandbox.mobileView}
              className={cn(
                'p-1.5 transition-colors',
                viewport === 'mobile'
                  ? 'bg-[#1F190F] text-[var(--brass-light)]'
                  : 'text-[var(--muted)] hover:text-[var(--ivory)]'
              )}
            >
              <Smartphone className="h-4 w-4" />
            </button>
          </div>

          {/* Reload Button */}
          <button
            type="button"
            onClick={handleReload}
            title={t.liveSandbox.reload}
            className="p-2 border border-[var(--line)] bg-[#131316] text-[var(--muted)] hover:text-[var(--brass-light)] transition-colors"
          >
            <RotateCw className="h-3.5 w-3.5" />
          </button>

          {/* External Link */}
          <a
            href={activeProject.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={t.liveSandbox.openExternal}
            className="hidden sm:inline-flex p-2 border border-[var(--line)] bg-[#131316] text-[var(--brass-light)] hover:border-[var(--brass-light)] transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Keluar Layar Penuh' : t.liveSandbox.fullscreen}
            className="hidden sm:inline-flex p-2 border border-[var(--line)] bg-[#131316] text-[var(--muted)] hover:text-[var(--brass-light)] transition-colors"
          >
            {isFullscreen ? (
              <Minimize2 className="h-3.5 w-3.5" />
            ) : (
              <Maximize2 className="h-3.5 w-3.5" />
            )}
          </button>

          {/* Language Switcher */}
          <div
            role="group"
            aria-label="Pilih bahasa"
            className="flex items-center border border-[var(--line)] bg-[#131316] p-0.5"
          >
            <button
              type="button"
              onClick={() => setLocale('id')}
              className={cn(
                'px-2 py-1 text-[11px] font-medium transition-colors',
                locale === 'id'
                  ? 'bg-[#1F190F] text-[var(--brass-light)]'
                  : 'text-[var(--muted)] hover:text-[var(--ivory)]'
              )}
            >
              ID
            </button>
            <button
              type="button"
              onClick={() => setLocale('en')}
              className={cn(
                'px-2 py-1 text-[11px] font-medium transition-colors',
                locale === 'en'
                  ? 'bg-[#1F190F] text-[var(--brass-light)]'
                  : 'text-[var(--muted)] hover:text-[var(--ivory)]'
              )}
            >
              EN
            </button>
          </div>

          {/* Info Drawer Toggle Button */}
          <button
            type="button"
            onClick={() => setInfoOpen(!infoOpen)}
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1.5 border text-xs uppercase tracking-[0.14em] transition-colors',
              infoOpen
                ? 'border-[var(--brass)] bg-[#1F190F] text-[var(--brass-light)]'
                : 'border-[var(--line)] bg-[#131316] text-[var(--ivory)] hover:border-[var(--border-control)]'
            )}
          >
            <Info className="h-3.5 w-3.5 text-[var(--brass-light)]" />
            <span className="hidden xl:inline">Detail Proyek</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Canvas Area */}
      <main className="relative flex-1 flex justify-center items-center bg-[#070708] overflow-hidden p-0 sm:p-2">
        <div
          className={cn(
            'relative w-full h-full transition-all duration-300 bg-[#0A0A0B] overflow-hidden',
            viewport === 'desktop' && 'max-w-full',
            viewport === 'tablet' && 'max-w-[768px] my-auto h-[95%] border border-[var(--line)] rounded-lg shadow-2xl',
            viewport === 'mobile' && 'max-w-[390px] my-auto h-[95%] border border-[var(--line)] rounded-2xl shadow-2xl'
          )}
        >
          {/* Real-time Subdomain / URL Indicator Bar inside canvas */}
          <div className="h-8 border-b border-[var(--line)] bg-[#131316] px-3 flex items-center justify-between text-[11px] text-[var(--muted)]">
            <div className="flex items-center gap-2 truncate">
              <Lock className="h-3 w-3 text-[#86EFAC] shrink-0" />
              <span className="font-mono text-[#EDE8DF]/90 truncate">
                {activeProject.liveUrl}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] uppercase tracking-wider text-[var(--brass-light)]">
                {t.liveSandbox.runningNotice}
              </span>
            </div>
          </div>

          {/* Loading Spinner */}
          {isLoading && (
            <div className="absolute inset-x-0 top-8 bottom-0 z-20 flex flex-col items-center justify-center bg-[#0A0A0B]/90 backdrop-blur-sm">
              <div className="h-9 w-9 animate-spin rounded-full border-2 border-[var(--brass)] border-t-transparent mb-3" />
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--ivory)]">
                {t.liveSandbox.iframeLoading}
              </p>
              <p className="text-[11px] text-[var(--brass-light)] font-mono mt-1">
                {activeProject.name}
              </p>
            </div>
          )}

          {/* Live Application Iframe */}
          <iframe
            key={iframeKey}
            src={activeProject.embedUrl || activeProject.liveUrl}
            title={`Aplikasi Web ${activeProject.name}`}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            loading="eager"
            onLoad={() => setIsLoading(false)}
            className="w-full border-0 bg-white"
            style={{ height: 'calc(100% - 32px)' }}
          />
        </div>

        {/* Side Info & Case Study Drawer */}
        {infoOpen && (
          <aside
            role="complementary"
            aria-label="Detail aplikasi web"
            className="absolute top-0 right-0 bottom-0 z-30 w-full sm:w-[420px] bg-[#0E0E11]/98 border-l border-[var(--line)] p-6 overflow-y-auto shadow-2xl animate-fade-in flex flex-col justify-between"
          >
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[var(--line)]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#86EFAC]" />
                  <span className="text-xs uppercase tracking-[0.16em] text-[var(--brass-light)]">
                    Informasi &amp; Panduan Uji
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setInfoOpen(false)}
                  aria-label="Tutup panel informasi"
                  className="p-1 hover:text-[var(--brass-light)] transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Project Title & Category */}
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--brass-light)] mb-1">
                  {pickLocale(activeProject.categoryLabel, locale)} • {activeProject.year}
                </p>
                <h2 className="font-editorial text-2xl text-[var(--ivory)] leading-tight mb-2">
                  {activeProject.name}
                </h2>
                <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                  {pickLocale(activeProject.shortDescription, locale)}
                </p>
              </div>

              {/* Status & Verification */}
              <div className="p-3.5 border border-[var(--line)] bg-[#131316] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
                    Status Uji
                  </span>
                  <StatusBadge status={activeProject.status} />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
                    Tanggal Periksa
                  </span>
                  <span className="text-[var(--ivory)] font-mono text-[11px]">
                    {activeProject.verifiedAt}
                  </span>
                </div>
              </div>

              {/* Interactive Features to Test */}
              {activeProject.interactiveHighlights && (
                <div className="space-y-2.5">
                  <span className="label-editorial block text-[10px] text-[var(--brass-light)]">
                    {t.liveSandbox.featuresHeading}
                  </span>
                  <ul className="space-y-2 text-xs text-[var(--ivory)]/90">
                    {activeProject.interactiveHighlights.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-3.5 w-3.5 shrink-0 text-[#86EFAC] mt-0.5" />
                        <span>{pickLocale(feat, locale)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack */}
              <div className="space-y-2 pt-2 border-t border-[var(--line)]">
                <span className="label-editorial block text-[10px] text-[var(--muted)]">
                  Teknologi Terverifikasi
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="border border-[var(--line)] bg-[#131316] px-2.5 py-1 text-[11px] text-[var(--ivory)]/85"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[var(--line)] space-y-2.5">
              <a
                href={activeProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 min-h-[46px] bg-[var(--brass)] px-4 py-2.5 text-xs uppercase tracking-[0.16em] font-medium text-[#0A0A0B] hover:bg-[var(--brass-light)] transition-colors"
              >
                <span>{t.liveSandbox.openDirectlyBtn}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <Link
                href={`/projects/${activeProject.slug}`}
                className="w-full inline-flex items-center justify-center gap-2 min-h-[44px] border border-[var(--border-control)] bg-[#131316] px-4 py-2.5 text-xs uppercase tracking-[0.16em] text-[var(--ivory)] hover:border-[var(--brass-light)] hover:text-[var(--brass-light)] transition-colors"
              >
                <span>{t.liveSandbox.viewCaseStudy}</span>
                <ArrowRight className="h-3.5 w-3.5 text-[var(--brass-light)]" />
              </Link>

              {activeProject.repoPublicUrl && (
                <a
                  href={activeProject.repoPublicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 min-h-[40px] border border-[var(--line)] bg-transparent px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-[var(--muted)] hover:text-[var(--ivory)] transition-colors"
                >
                  <GitBranch className="h-3.5 w-3.5" />
                  <span>{t.liveSandbox.sourceCodeBtn}</span>
                </a>
              )}
            </div>
          </aside>
        )}
      </main>
    </div>
  );
}
