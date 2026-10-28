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
  GitBranch,
  Workflow,
  Lightbulb,
  CheckCircle2,
  Sliders,
  Cpu,
  Play,
  Image as ImageIcon,
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
type SandboxMode = 'workflow' | 'examples' | 'interactive' | 'screenshot';

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
  const [mode, setMode] = useState<SandboxMode>('workflow');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeProject =
    WEB_PROJECTS.find((p) => p.slug === selectedSlug) || WEB_PROJECTS[0];

  // Reset loading state when project changes
  useEffect(() => {
    setIsLoading(true);
    setActiveStepIdx(0);
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

            {/* Viewport and Display Mode Controls */}
            <div className="flex flex-wrap items-center gap-2 order-2 sm:order-3">
              {/* 4-Segment Mode Switcher */}
              <div className="flex items-center border border-[var(--line)] bg-[#0A0A0B] p-0.5">
                <button
                  type="button"
                  onClick={() => setMode('workflow')}
                  className={cn(
                    'inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] transition-colors',
                    mode === 'workflow'
                      ? 'bg-[#1F190F] text-[var(--brass-light)] font-medium'
                      : 'text-[var(--muted)] hover:text-[var(--ivory)]'
                  )}
                >
                  <Workflow className="h-3 w-3" />
                  <span className="hidden sm:inline">Alur Sistem</span>
                  <span className="sm:hidden">Alur</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMode('examples')}
                  className={cn(
                    'inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] transition-colors',
                    mode === 'examples'
                      ? 'bg-[#1F190F] text-[var(--brass-light)] font-medium'
                      : 'text-[var(--muted)] hover:text-[var(--ivory)]'
                  )}
                >
                  <Lightbulb className="h-3 w-3" />
                  <span className="hidden sm:inline">Contoh Kasus</span>
                  <span className="sm:hidden">Contoh</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMode('interactive')}
                  className={cn(
                    'inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] transition-colors',
                    mode === 'interactive'
                      ? 'bg-[#1F190F] text-[var(--brass-light)] font-medium'
                      : 'text-[var(--muted)] hover:text-[var(--ivory)]'
                  )}
                >
                  <Play className="h-3 w-3" />
                  <span className="hidden sm:inline">Uji Live</span>
                  <span className="sm:hidden">Live</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMode('screenshot')}
                  className={cn(
                    'inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] transition-colors',
                    mode === 'screenshot'
                      ? 'bg-[#1F190F] text-[var(--brass-light)] font-medium'
                      : 'text-[var(--muted)] hover:text-[var(--ivory)]'
                  )}
                >
                  <ImageIcon className="h-3 w-3" />
                  <span className="hidden sm:inline">Foto HD</span>
                  <span className="sm:hidden">Foto</span>
                </button>
              </div>

              {/* Viewport Width Controls (Only active for interactive mode) */}
              {mode === 'interactive' && (
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
              )}

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
                viewport === 'tablet' && mode === 'interactive' && 'max-w-[768px] rounded-lg',
                viewport === 'mobile' && mode === 'interactive' && 'max-w-[390px] rounded-2xl'
              )}
              style={{ minHeight: '520px', height: isFullscreen ? 'calc(100vh - 160px)' : '620px' }}
            >
              {/* MODE 1: ALUR SISTEM KERJA (WORKFLOW) */}
              {mode === 'workflow' && (
                <div className="h-full w-full overflow-y-auto p-4 sm:p-6 bg-[#0E0E11] space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--line)]">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.16em] text-[var(--brass-light)] font-mono">
                        Arsitektur Sistem & Data Flow
                      </span>
                      <h3 className="font-editorial text-lg sm:text-xl text-[var(--ivory)]">
                        5 Tahap Alur Kerja: {activeProject.name}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setMode('interactive')}
                      className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2 bg-[var(--brass)] text-[#0A0A0B] text-xs uppercase tracking-[0.14em] font-medium hover:bg-[var(--brass-light)] transition-colors shadow-sm"
                    >
                      <Play className="h-3.5 w-3.5" />
                      <span>Uji di Web Langsung</span>
                    </button>
                  </div>

                  {/* Step Selector Pills */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {activeProject.workflowSteps?.map((st, idx) => (
                      <button
                        key={st.step}
                        type="button"
                        onClick={() => setActiveStepIdx(idx)}
                        className={cn(
                          'p-2.5 text-left border transition-all duration-200',
                          activeStepIdx === idx
                            ? 'border-[var(--brass)] bg-[#1F190F] shadow-sm'
                            : 'border-[var(--line)] bg-[#131316] hover:border-[var(--border-control)]'
                        )}
                      >
                        <span className="font-mono text-[11px] font-bold text-[var(--brass-light)] block">
                          Langkah {st.step}
                        </span>
                        <span className="text-[11px] text-[var(--ivory)] truncate block">
                          {pickLocale(st.title, locale)}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Active Step Highlight Card */}
                  {activeProject.workflowSteps && activeProject.workflowSteps[activeStepIdx] && (
                    <div className="border border-[var(--brass)]/70 bg-[#15120C] p-5 sm:p-6 space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
                        <div className="flex items-center gap-3">
                          <span className="flex h-7 w-7 items-center justify-center font-mono text-xs font-bold border border-[var(--brass)] bg-[#1F190F] text-[var(--brass-light)]">
                            {activeProject.workflowSteps[activeStepIdx].step}
                          </span>
                          <h4 className="font-editorial text-lg text-[var(--ivory)]">
                            {pickLocale(activeProject.workflowSteps[activeStepIdx].title, locale)}
                          </h4>
                        </div>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 border border-[var(--line)] bg-[#131316] text-[var(--muted)]">
                          {pickLocale(activeProject.workflowSteps[activeStepIdx].badge, locale)}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-[var(--ivory)]/90 leading-relaxed">
                        {pickLocale(activeProject.workflowSteps[activeStepIdx].summary, locale)}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                        <div className="border border-[var(--line)] bg-[#131316] p-3 space-y-1">
                          <span className="text-[10px] uppercase font-mono text-[var(--brass-light)] flex items-center gap-1.5">
                            <Sliders className="h-3 w-3" /> Input Data
                          </span>
                          <p className="text-xs text-[var(--muted)] leading-relaxed">
                            {pickLocale(activeProject.workflowSteps[activeStepIdx].input, locale)}
                          </p>
                        </div>
                        <div className="border border-[var(--line)] bg-[#131316] p-3 space-y-1">
                          <span className="text-[10px] uppercase font-mono text-[#93C5FD] flex items-center gap-1.5">
                            <Cpu className="h-3 w-3" /> Pemrosesan Logika
                          </span>
                          <p className="text-xs text-[var(--muted)] leading-relaxed">
                            {pickLocale(activeProject.workflowSteps[activeStepIdx].process, locale)}
                          </p>
                        </div>
                        <div className="border border-[var(--line)] bg-[#131316] p-3 space-y-1">
                          <span className="text-[10px] uppercase font-mono text-[#86EFAC] flex items-center gap-1.5">
                            <CheckCircle2 className="h-3 w-3" /> Output / Hasil
                          </span>
                          <p className="text-xs text-[var(--muted)] leading-relaxed">
                            {pickLocale(activeProject.workflowSteps[activeStepIdx].output, locale)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* MODE 2: CONTOH KASUS & SKENARIO (EXAMPLES) */}
              {mode === 'examples' && (
                <div className="h-full w-full overflow-y-auto p-4 sm:p-6 bg-[#0E0E11] space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--line)]">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.16em] text-[var(--brass-light)] font-mono">
                        Simulasi Skenario Nyata
                      </span>
                      <h3 className="font-editorial text-lg sm:text-xl text-[var(--ivory)]">
                        Contoh Penerapan Fitur {activeProject.name}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setMode('interactive')}
                      className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2 bg-[var(--brass)] text-[#0A0A0B] text-xs uppercase tracking-[0.14em] font-medium hover:bg-[var(--brass-light)] transition-colors shadow-sm"
                    >
                      <Play className="h-3.5 w-3.5" />
                      <span>Coba di Web Live</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {activeProject.scenarioExamples?.map((sc, idx) => (
                      <div
                        key={sc.id}
                        className="border border-[var(--line)] bg-[#131316] p-4 flex flex-col justify-between space-y-3"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[11px] text-[var(--brass-light)] font-bold">
                              Skenario 0{idx + 1}
                            </span>
                            <span className="text-[9px] uppercase font-mono text-[var(--muted)]">
                              {pickLocale(sc.category, locale)}
                            </span>
                          </div>
                          <h4 className="font-editorial text-base text-[var(--ivory)]">
                            {pickLocale(sc.title, locale)}
                          </h4>
                          <p className="text-xs text-[var(--muted)] leading-relaxed">
                            {pickLocale(sc.description, locale)}
                          </p>

                          <div className="border border-[var(--line)] bg-[#0A0A0B] p-2.5 space-y-1">
                            {sc.sampleData.map((d, dIdx) => (
                              <div key={dIdx} className="text-[11px] flex justify-between gap-2">
                                <span className="text-[var(--muted)]">{pickLocale(d.label, locale)}:</span>
                                <span className="text-[var(--ivory)] font-medium text-right truncate">{d.value}</span>
                              </div>
                            ))}
                          </div>

                          <div className="border border-[#2E7D52]/50 bg-[#0A2618]/50 p-2.5 text-xs text-[#86EFAC] flex items-start gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                            <span>{pickLocale(sc.expectedResult, locale)}</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setMode('interactive')}
                          className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 border border-[var(--border-control)] bg-[#1F190F] text-[11px] uppercase tracking-wider text-[var(--brass-light)] hover:bg-[var(--brass)] hover:text-[#0A0A0B] transition-colors"
                        >
                          <Play className="h-3 w-3" />
                          <span>Uji Skenario Ini</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MODE 3: LIVE INTERACTIVE RUNTIME */}
              {mode === 'interactive' && activeProject.canEmbedIframe && (
                <>
                  {isLoading && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0A0A0B]/90 backdrop-blur-sm">
                      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--brass)] border-t-transparent mb-3" />
                      <p className="text-xs uppercase tracking-[0.16em] text-[var(--ivory)]">
                        {t.liveSandbox.iframeLoading}
                      </p>
                      <p className="text-[11px] text-[var(--brass-light)] font-mono mt-1">
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
              )}

              {/* MODE 4: SCREENSHOT HD */}
              {mode === 'screenshot' && (
                <div className="relative h-full w-full flex flex-col justify-between overflow-y-auto bg-[#0E0E11] p-4 sm:p-6">
                  <ScreenshotImage
                    src={primaryShot?.url}
                    alt={pickLocale(primaryShot.alt, locale)}
                    width={primaryShot?.width || 1440}
                    height={primaryShot?.height || 900}
                    className="w-full h-auto object-cover border border-[var(--line)] shadow-lg"
                  />
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
                  <Workflow className="h-3.5 w-3.5 shrink-0 text-[var(--brass-light)]" />
                  <span>Buka Gateway & Alur Sistem</span>
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
