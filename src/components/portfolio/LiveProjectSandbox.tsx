'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  RotateCw,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  Lock,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  GitBranch,
} from 'lucide-react';
import {
  WEB_PROJECTS,
  pickLocale,
} from '@/lib/web-projects-data';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { StatusBadge } from '@/components/portfolio/StatusBadge';
import { ScreenshotImage } from '@/components/portfolio/ScreenshotImage';
import { cn } from '@/lib/utils';

type ViewportMode = 'desktop' | 'tablet' | 'mobile';

interface LiveProjectSandboxProps {
  initialSlug?: string;
  className?: string;
  compactHeading?: boolean;
}

export function LiveProjectSandbox({
  initialSlug = 'leadkit-bakery',
  className,
  compactHeading = false,
}: LiveProjectSandboxProps) {
  const { locale, t } = useLanguage();
  const [selectedSlug, setSelectedSlug] = useState<string>(initialSlug);
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [mode, setMode] = useState<'interactive' | 'screenshot'>('interactive');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [iframeKey, setIframeKey] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeProject =
    WEB_PROJECTS.find((p) => p.slug === selectedSlug) || WEB_PROJECTS[0];

  // Reset loading state when project changes
  useEffect(() => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  }, [selectedSlug, mode]);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(activeProject.liveUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleReload = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen().catch(() => {});
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

  const primaryShot =
    activeProject.screenshots.find((s) => s.viewport === 'desktop') ||
    activeProject.screenshots[0];

  return (
    <section
      id="live-showcase"
      aria-labelledby="heading-live-sandbox"
      className={cn('py-16 sm:py-24 border-b border-[var(--line)]', className)}
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        {!compactHeading && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-[var(--line)]">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-editorial italic text-sm text-[var(--brass-light)]">
                  {t.liveSandbox.index}
                </span>
                <span className="h-[1px] w-10 bg-[var(--line)]" />
                <span className="label-editorial">{t.liveSandbox.label}</span>
              </div>

              <h2
                id="heading-live-sandbox"
                className="section-heading font-normal text-[var(--ivory)]"
              >
                {t.liveSandbox.heading}
              </h2>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-end">
              <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
                {t.liveSandbox.subtitle}
              </p>
            </div>
          </div>
        )}

        {/* Project Selector Tabs */}
        <div className="pt-8 pb-6">
          <div
            role="tablist"
            aria-label="Pilih website untuk diuji langsung"
            className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-[var(--line)] scrollbar-track-transparent"
          >
            {WEB_PROJECTS.map((proj) => {
              const isSelected = proj.slug === activeProject.slug;
              return (
                <button
                  key={proj.id}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedSlug(proj.slug)}
                  className={cn(
                    'group shrink-0 inline-flex items-center gap-2.5 min-h-[46px] px-4 py-2.5 text-xs uppercase tracking-[0.14em] border transition-all duration-200',
                    isSelected
                      ? 'border-[var(--brass)] bg-[#1F190F] text-[var(--brass-light)] font-medium shadow-sm'
                      : 'border-[var(--line)] bg-[#131316] text-[var(--muted)] hover:border-[var(--border-control)] hover:text-[var(--ivory)]'
                  )}
                >
                  <span
                    className={cn(
                      'h-2 w-2 rounded-full transition-colors',
                      isSelected ? 'bg-[#86EFAC] ring-2 ring-[#86EFAC]/30' : 'bg-[#8A857C]'
                    )}
                  />
                  <span>{proj.name.split('(')[0].trim()}</span>
                  <span className="hidden sm:inline text-[10px] text-[var(--muted)] group-hover:text-[var(--ivory)]">
                    {proj.year}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Browser Simulator Workspace */}
        <div
          ref={containerRef}
          className={cn(
            'border border-[var(--line)] bg-[#0E0E11] shadow-2xl transition-all duration-300',
            isFullscreen && 'fixed inset-0 z-50 p-4 sm:p-6 bg-[#0A0A0B] overflow-auto'
          )}
        >
          {/* Browser Chrome Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] bg-[#16161A] px-4 py-3">
            {/* Window Controls & Title */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="h-3 w-3 rounded-full bg-[#FF5F56]/80 inline-block" />
                <span className="h-3 w-3 rounded-full bg-[#FFBD2E]/80 inline-block" />
                <span className="h-3 w-3 rounded-full bg-[#27C93F]/80 inline-block" />
              </div>
              <span className="h-4 w-[1px] bg-[var(--line)] hidden sm:inline-block" />
              <div className="hidden sm:flex items-center gap-2 text-xs text-[var(--ivory)]/80">
                <Sparkles className="h-3.5 w-3.5 text-[var(--brass-light)]" />
                <span className="font-editorial text-sm font-medium tracking-wide">
                  {activeProject.name}
                </span>
              </div>
            </div>

            {/* Address Bar */}
            <div className="flex-1 max-w-xl mx-auto order-3 sm:order-2 w-full sm:w-auto">
              <div className="flex items-center justify-between gap-2 border border-[var(--line)] bg-[#0A0A0B] px-3 py-1.5 text-xs text-[var(--muted)]">
                <div className="flex items-center gap-2 overflow-hidden truncate">
                  <Lock className="h-3 w-3 shrink-0 text-[#86EFAC]" />
                  <span className="truncate text-[#EDE8DF]/90 font-mono text-[11px]">
                    {activeProject.liveUrl}
                  </span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyUrl}
                    title="Salin tautan web"
                    className="p-1 hover:text-[var(--brass-light)] transition-colors"
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5 text-[#86EFAC]" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleReload}
                    title={t.liveSandbox.reload}
                    className="p-1 hover:text-[var(--brass-light)] transition-colors"
                  >
                    <RotateCw className="h-3.5 w-3.5" />
                  </button>
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={t.liveSandbox.openExternal}
                    className="p-1 hover:text-[var(--brass-light)] transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5 text-[var(--brass-light)]" />
                  </a>
                </div>
              </div>
            </div>

            {/* Viewport and Display Controls */}
            <div className="flex items-center gap-2 order-2 sm:order-3">
              {/* Mode Toggle: Interactive vs Screenshot */}
              <div className="flex items-center border border-[var(--line)] bg-[#0A0A0B] p-0.5">
                <button
                  type="button"
                  onClick={() => setMode('interactive')}
                  className={cn(
                    'px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] transition-colors',
                    mode === 'interactive'
                      ? 'bg-[#1F190F] text-[var(--brass-light)] font-medium'
                      : 'text-[var(--muted)] hover:text-[var(--ivory)]'
                  )}
                >
                  {t.liveSandbox.modeInteractive}
                </button>
                <button
                  type="button"
                  onClick={() => setMode('screenshot')}
                  className={cn(
                    'px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] transition-colors',
                    mode === 'screenshot'
                      ? 'bg-[#1F190F] text-[var(--brass-light)] font-medium'
                      : 'text-[var(--muted)] hover:text-[var(--ivory)]'
                  )}
                >
                  {t.liveSandbox.modeScreenshot}
                </button>
              </div>

              {/* Viewport Width Controls */}
              <div className="hidden md:flex items-center border border-[var(--line)] bg-[#0A0A0B] p-0.5">
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
                  <Monitor className="h-3.5 w-3.5" />
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
                  <Tablet className="h-3.5 w-3.5" />
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
                  <Smartphone className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Fullscreen Button */}
              <button
                type="button"
                onClick={toggleFullscreen}
                title={isFullscreen ? 'Keluar Layar Penuh' : t.liveSandbox.fullscreen}
                className="hidden sm:inline-flex p-1.5 border border-[var(--line)] bg-[#0A0A0B] text-[var(--muted)] hover:text-[var(--brass-light)] hover:border-[var(--brass-light)] transition-colors"
              >
                {isFullscreen ? (
                  <Minimize2 className="h-3.5 w-3.5" />
                ) : (
                  <Maximize2 className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Canvas Area */}
          <div className="relative flex justify-center bg-[#070708] overflow-hidden p-2 sm:p-4 min-h-[520px] lg:min-h-[640px]">
            <div
              className={cn(
                'relative w-full transition-all duration-300 shadow-xl overflow-hidden border border-[var(--line)] bg-[#0A0A0B]',
                viewport === 'desktop' && 'max-w-full',
                viewport === 'tablet' && 'max-w-[768px]',
                viewport === 'mobile' && 'max-w-[390px]'
              )}
              style={{ minHeight: '520px', height: isFullscreen ? 'calc(100vh - 160px)' : '620px' }}
            >
              {mode === 'interactive' && activeProject.canEmbedIframe ? (
                <>
                  {isLoading && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0A0A0B]/90 backdrop-blur-sm">
                      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--brass)] border-t-transparent mb-3" />
                      <p className="text-xs uppercase tracking-[0.16em] text-[var(--ivory)]">
                        {t.liveSandbox.iframeLoading}
                      </p>
                      <p className="text-[11px] text-[var(--muted)] mt-1">
                        {activeProject.liveUrlLabel}
                      </p>
                    </div>
                  )}
                  <iframe
                    key={iframeKey}
                    src={activeProject.embedUrl || activeProject.liveUrl}
                    title={`Pratinjau Langsung ${activeProject.name}`}
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    loading="lazy"
                    onLoad={() => setIsLoading(false)}
                    className="h-full w-full border-0 bg-white"
                  />
                </>
              ) : (
                /* Fallback for frame-protected sites (Seumur Gerak) or Screenshot mode */
                <div className="relative h-full w-full flex flex-col justify-between overflow-y-auto bg-[#0E0E11]">
                  {!activeProject.canEmbedIframe && mode === 'interactive' && (
                    <div
                      role="alert"
                      className="m-4 p-4 border border-[var(--brass)]/70 bg-[#1F190F] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-3">
                        <ShieldAlert className="h-5 w-5 shrink-0 text-[var(--brass-light)] mt-0.5" />
                        <div>
                          <p className="text-xs sm:text-sm text-[var(--ivory)] font-medium">
                            {t.liveSandbox.iframeBlockedNotice}
                          </p>
                          <p className="text-[11px] text-[var(--muted)] mt-0.5">
                            Domain resmi: {activeProject.liveUrlLabel}
                          </p>
                        </div>
                      </div>
                      <a
                        href={activeProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 shrink-0 min-h-[40px] px-4 py-2 text-xs uppercase tracking-[0.14em] font-medium bg-[var(--brass)] text-[#0A0A0B] hover:bg-[var(--brass-light)] transition-colors"
                      >
                        <span>{t.liveSandbox.openDirectlyBtn}</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  )}

                  {/* Screenshot display */}
                  <div className="p-4 sm:p-6">
                    <ScreenshotImage
                      src={primaryShot?.url}
                      alt={pickLocale(primaryShot.alt, locale)}
                      width={primaryShot?.width || 1440}
                      height={primaryShot?.height || 900}
                      className="w-full h-auto object-cover border border-[var(--line)] shadow-lg"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Information & Action Drawer */}
          <div className="border-t border-[var(--line)] bg-[#131316] p-5 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Column: Interactive Highlights & Role */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <StatusBadge status={activeProject.status} />
                  <span className="text-[11px] uppercase tracking-[0.15em] text-[var(--brass-light)] font-mono">
                    {activeProject.liveUrlLabel}
                  </span>
                  <span className="text-[11px] text-[var(--muted)]">
                    • {pickLocale(activeProject.categoryLabel, locale)}
                  </span>
                </div>

                <div>
                  <h3 className="font-editorial text-xl sm:text-2xl text-[var(--ivory)] mb-1">
                    {activeProject.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                    {pickLocale(activeProject.shortDescription, locale)}
                  </p>
                </div>

                {/* Interactive Feature Checklist */}
                {activeProject.interactiveHighlights && (
                  <div className="space-y-2 pt-2 border-t border-[var(--line)]">
                    <span className="label-editorial block text-[10px] text-[var(--brass-light)]">
                      {t.liveSandbox.featuresHeading}
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[var(--ivory)]/90">
                      {activeProject.interactiveHighlights.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="h-3.5 w-3.5 shrink-0 text-[#86EFAC] mt-0.5" />
                          <span>{pickLocale(feat, locale)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right Column: Direct CTAs */}
              <div className="lg:col-span-4 flex flex-col gap-3">
                <Link
                  href={`/apps/${activeProject.slug}`}
                  className="inline-flex items-center justify-center gap-2 min-h-[46px] border border-[var(--brass)]/70 bg-[#1F190F] px-5 py-3 text-xs uppercase tracking-[0.16em] font-medium text-[var(--brass-light)] hover:bg-[var(--brass)] hover:text-[#0A0A0B] transition-colors"
                >
                  <Monitor className="h-3.5 w-3.5 shrink-0" />
                  <span>{t.liveSandbox.openFullScreenSuite}</span>
                </Link>

                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 min-h-[46px] bg-[var(--brass)] px-5 py-3 text-xs uppercase tracking-[0.16em] font-medium text-[#0A0A0B] hover:bg-[var(--brass-light)] transition-colors shadow-sm"
                >
                  <span>{t.liveSandbox.openDirectlyBtn}</span>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                </a>

                <Link
                  href={`/projects/${activeProject.slug}`}
                  className="inline-flex items-center justify-center gap-2.5 min-h-[46px] border border-[var(--border-control)] bg-[#0A0A0B] px-5 py-3 text-xs uppercase tracking-[0.16em] text-[var(--ivory)] hover:border-[var(--brass-light)] hover:text-[var(--brass-light)] transition-colors"
                >
                  <span>{t.liveSandbox.viewCaseStudy}</span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[var(--brass-light)]" />
                </Link>

                {activeProject.repoPublicUrl && (
                  <a
                    href={activeProject.repoPublicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 min-h-[40px] border border-[var(--line)] bg-transparent px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-[var(--muted)] hover:text-[var(--ivory)] hover:border-[var(--line)] transition-colors"
                  >
                    <GitBranch className="h-3.5 w-3.5" />
                    <span>{t.liveSandbox.sourceCodeBtn}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
