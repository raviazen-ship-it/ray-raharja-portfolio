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
  GitBranch,
  ArrowRight,
  Lock,
  Sparkles,
  Workflow,
  Lightbulb,
  Play,
  CheckCircle2,
  Cpu,
  Sliders,
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
type GatewayTab = 'workflow' | 'examples' | 'live';

interface UnifiedAppWorkspaceProps {
  initialSlug?: string;
}

export function UnifiedAppWorkspace({
  initialSlug = 'leadkit-bakery',
}: UnifiedAppWorkspaceProps) {
  const { locale, setLocale, t } = useLanguage();

  const [activeSlug, setActiveSlug] = useState<string>(initialSlug);
  const [activeTab, setActiveTab] = useState<GatewayTab>('workflow');
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);

  const activeProject: WebProjectCaseStudy =
    WEB_PROJECTS.find((p) => p.slug === activeSlug) || WEB_PROJECTS[0];

  const handleSelectProject = (slug: string) => {
    setActiveSlug(slug);
    setIsLoading(true);
    setActiveStepIdx(0);
    setIframeKey((prev) => prev + 1);
    // Update URL path without full page reload
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
    <div className="min-h-screen flex flex-col bg-[#070708] text-[#EDE8DF] select-none">
      {/* Top Persistent Header */}
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

        {/* Right: External Link, Fullscreen & Language Switcher */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={activeProject.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={t.liveSandbox.openExternal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[var(--border-control)] bg-[#131316] text-xs uppercase tracking-[0.14em] text-[var(--brass-light)] hover:border-[var(--brass-light)] transition-colors"
          >
            <span className="hidden lg:inline">{t.liveSandbox.openExternal}</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

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
        </div>
      </header>

      {/* Gateway Control & Navigation Strip */}
      <section className="border-b border-[var(--line)] bg-[#0E0E11] px-4 sm:px-8 py-5">
        <div className="mx-auto max-w-[1440px] flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Project Title & Status */}
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={activeProject.status} />
              <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--brass-light)] font-mono">
                {activeProject.liveUrlLabel}
              </span>
              <span className="text-[11px] text-[var(--muted)]">
                • {pickLocale(activeProject.categoryLabel, locale)}
              </span>
              <span className="text-[11px] text-[var(--muted)]">
                • Tahun {activeProject.year}
              </span>
            </div>
            <h1 className="font-editorial text-xl sm:text-2xl text-[var(--ivory)]">
              {activeProject.name}
            </h1>
            <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
              {pickLocale(activeProject.shortDescription, locale)}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <div
              role="tablist"
              aria-label="Pilih mode pratinjau"
              className="inline-flex p-1 border border-[var(--line)] bg-[#131316] rounded-sm"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'workflow'}
                onClick={() => setActiveTab('workflow')}
                className={cn(
                  'inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-xs uppercase tracking-[0.12em] font-medium transition-all duration-200',
                  activeTab === 'workflow'
                    ? 'bg-[var(--brass)] text-[#0A0A0B] shadow-sm'
                    : 'text-[var(--muted)] hover:text-[var(--ivory)]'
                )}
              >
                <Workflow className="h-3.5 w-3.5" />
                <span>{t.liveSandbox.tabWorkflow}</span>
                <span className="ml-1 px-1.5 py-0.2 text-[10px] rounded bg-black/20 font-mono">
                  {activeProject.workflowSteps?.length || 5}
                </span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'examples'}
                onClick={() => setActiveTab('examples')}
                className={cn(
                  'inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-xs uppercase tracking-[0.12em] font-medium transition-all duration-200',
                  activeTab === 'examples'
                    ? 'bg-[var(--brass)] text-[#0A0A0B] shadow-sm'
                    : 'text-[var(--muted)] hover:text-[var(--ivory)]'
                )}
              >
                <Lightbulb className="h-3.5 w-3.5" />
                <span>{t.liveSandbox.tabExamples}</span>
                <span className="ml-1 px-1.5 py-0.2 text-[10px] rounded bg-black/20 font-mono">
                  {activeProject.scenarioExamples?.length || 3}
                </span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'live'}
                onClick={() => setActiveTab('live')}
                className={cn(
                  'inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-xs uppercase tracking-[0.12em] font-medium transition-all duration-200',
                  activeTab === 'live'
                    ? 'bg-[var(--brass)] text-[#0A0A0B] shadow-sm'
                    : 'text-[var(--muted)] hover:text-[var(--ivory)]'
                )}
              >
                <Play className="h-3.5 w-3.5" />
                <span>{t.liveSandbox.tabLive}</span>
              </button>
            </div>

            {/* Quick Links */}
            <div className="flex items-center gap-1.5">
              {activeProject.repoPublicUrl && (
                <a
                  href={activeProject.repoPublicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Lihat Source Code di GitHub"
                  className="p-2 border border-[var(--border-control)] bg-[#131316] text-[var(--muted)] hover:text-[var(--brass-light)] hover:border-[var(--brass-light)] transition-colors"
                >
                  <GitBranch className="h-4 w-4" />
                </a>
              )}
              <Link
                href={`/projects/${activeProject.slug}`}
                title="Baca Studi Kasus Teknis"
                className="inline-flex items-center gap-1.5 px-3 py-2 border border-[var(--border-control)] bg-[#131316] text-xs uppercase tracking-[0.12em] text-[var(--ivory)] hover:border-[var(--brass-light)] hover:text-[var(--brass-light)] transition-colors"
              >
                <span>Studi Kasus</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {/* ========================================================= */}
        {/* TAB 1: ALUR SISTEM KERJA (WORKFLOW STEPS) */}
        {/* ========================================================= */}
        {activeTab === 'workflow' && (
          <section className="py-8 sm:py-12 px-4 sm:px-8">
            <div className="mx-auto max-w-[1440px] space-y-8">
              {/* Workflow Intro */}
              <div className="border border-[var(--line)] bg-[#0E0E11] p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-2">
                  <Workflow className="h-5 w-5 text-[var(--brass-light)]" />
                  <h2 className="font-editorial text-lg sm:text-xl text-[var(--ivory)]">
                    {t.liveSandbox.workflowHeading}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed max-w-3xl">
                  {t.liveSandbox.workflowSubheading}
                </p>

                {/* Step Quick Navigation Bar */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-2 border-t border-[var(--line)] pt-6">
                  {activeProject.workflowSteps?.map((step, idx) => {
                    const isSelected = activeStepIdx === idx;
                    return (
                      <button
                        key={step.step}
                        type="button"
                        onClick={() => setActiveStepIdx(idx)}
                        className={cn(
                          'p-3 text-left border transition-all duration-200',
                          isSelected
                            ? 'border-[var(--brass)] bg-[#1F190F] shadow-sm'
                            : 'border-[var(--line)] bg-[#131316] hover:border-[var(--border-control)]'
                        )}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className={cn(
                              'font-mono text-xs font-bold',
                              isSelected ? 'text-[var(--brass-light)]' : 'text-[var(--muted)]'
                            )}
                          >
                            Langkah {step.step}
                          </span>
                          <span className="text-[10px] text-[var(--muted)] uppercase font-mono">
                            {pickLocale(step.badge, locale)}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--ivory)] font-medium line-clamp-1">
                          {pickLocale(step.title, locale)}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step Details Stack */}
              <div className="space-y-6">
                {activeProject.workflowSteps?.map((step, idx) => {
                  const isHighlighted = activeStepIdx === idx;
                  return (
                    <article
                      key={step.step}
                      id={`step-${step.step}`}
                      className={cn(
                        'border transition-all duration-300 p-6 sm:p-8 bg-[#0E0E11]',
                        isHighlighted
                          ? 'border-[var(--brass)] bg-[#15120C]/90 shadow-xl ring-1 ring-[var(--brass)]/30'
                          : 'border-[var(--line)] hover:border-[var(--border-control)]'
                      )}
                    >
                      {/* Step Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[var(--line)]">
                        <div className="flex items-start sm:items-center gap-3">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center font-mono text-sm font-bold border border-[var(--brass)]/60 bg-[#1F190F] text-[var(--brass-light)]">
                            {step.step}
                          </span>
                          <div>
                            <span className="text-[10px] uppercase tracking-[0.16em] text-[var(--brass-light)] font-mono">
                              {pickLocale(step.badge, locale)}
                            </span>
                            <h3 className="font-editorial text-lg sm:text-xl text-[var(--ivory)]">
                              {pickLocale(step.title, locale)}
                            </h3>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setActiveTab('live')}
                          className="inline-flex items-center gap-1.5 self-start sm:self-auto px-3 py-1.5 border border-[var(--border-control)] bg-[#131316] text-xs uppercase tracking-[0.12em] text-[var(--brass-light)] hover:bg-[var(--brass)] hover:text-[#0A0A0B] transition-colors"
                        >
                          <span>{t.liveSandbox.tryStepInApp}</span>
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Summary Narrative */}
                      <p className="text-xs sm:text-sm text-[var(--ivory)]/90 leading-relaxed py-4">
                        {pickLocale(step.summary, locale)}
                      </p>

                      {/* 3-Column Architecture Matrix */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[var(--line)]">
                        {/* Input Block */}
                        <div className="border border-[var(--line)] bg-[#131316] p-4 space-y-2">
                          <div className="flex items-center gap-2 text-[var(--brass-light)]">
                            <Sliders className="h-4 w-4" />
                            <span className="label-editorial text-[10px]">
                              {t.liveSandbox.stepInputLabel}
                            </span>
                          </div>
                          <p className="text-xs text-[var(--muted)] leading-relaxed">
                            {pickLocale(step.input, locale)}
                          </p>
                        </div>

                        {/* Process Block */}
                        <div className="border border-[var(--line)] bg-[#131316] p-4 space-y-2">
                          <div className="flex items-center gap-2 text-[#93C5FD]">
                            <Cpu className="h-4 w-4" />
                            <span className="label-editorial text-[10px] text-[#93C5FD]">
                              {t.liveSandbox.stepProcessLabel}
                            </span>
                          </div>
                          <p className="text-xs text-[var(--muted)] leading-relaxed">
                            {pickLocale(step.process, locale)}
                          </p>
                        </div>

                        {/* Output Block */}
                        <div className="border border-[var(--line)] bg-[#131316] p-4 space-y-2">
                          <div className="flex items-center gap-2 text-[#86EFAC]">
                            <CheckCircle2 className="h-4 w-4" />
                            <span className="label-editorial text-[10px] text-[#86EFAC]">
                              {t.liveSandbox.stepOutputLabel}
                            </span>
                          </div>
                          <p className="text-xs text-[var(--muted)] leading-relaxed">
                            {pickLocale(step.output, locale)}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Bottom Action Card */}
              <div className="border border-[var(--brass)]/60 bg-[#15120C] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center sm:text-left">
                  <h3 className="font-editorial text-lg sm:text-xl text-[var(--ivory)]">
                    Siap Mencoba Website {activeProject.name}?
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--muted)]">
                    Uji seluruh alur sistem di atas secara interaktif langsung di dalam portofolio ini atau buka di tab terpisah.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveTab('live')}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-[var(--brass)] text-[#0A0A0B] text-xs uppercase tracking-[0.14em] font-medium hover:bg-[var(--brass-light)] transition-colors shadow-sm"
                  >
                    <Play className="h-4 w-4" />
                    <span>Buka Aplikasi di Sini</span>
                  </button>
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 border border-[var(--border-control)] bg-[#131316] text-[var(--ivory)] text-xs uppercase tracking-[0.14em] hover:border-[var(--brass-light)] hover:text-[var(--brass-light)] transition-colors"
                  >
                    <span>Kunjungi Website Asli</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* TAB 2: CONTOH KASUS & SKENARIO (SCENARIOS) */}
        {/* ========================================================= */}
        {activeTab === 'examples' && (
          <section className="py-8 sm:py-12 px-4 sm:px-8">
            <div className="mx-auto max-w-[1440px] space-y-8">
              {/* Header */}
              <div className="border border-[var(--line)] bg-[#0E0E11] p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-2">
                  <Lightbulb className="h-5 w-5 text-[var(--brass-light)]" />
                  <h2 className="font-editorial text-lg sm:text-xl text-[var(--ivory)]">
                    {t.liveSandbox.examplesHeading}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed max-w-3xl">
                  {t.liveSandbox.examplesSubheading}
                </p>
              </div>

              {/* Scenarios Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {activeProject.scenarioExamples?.map((sc, idx) => (
                  <article
                    key={sc.id}
                    className="border border-[var(--line)] bg-[#0E0E11] p-6 flex flex-col justify-between space-y-5 hover:border-[var(--brass)] transition-colors"
                  >
                    <div className="space-y-4">
                      {/* Scenario Tag & Index */}
                      <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
                        <span className="font-mono text-xs text-[var(--brass-light)] font-bold">
                          Skenario 0{idx + 1}
                        </span>
                        <span className="text-[10px] uppercase font-mono text-[var(--muted)] border border-[var(--line)] px-2 py-0.5 bg-[#131316]">
                          {pickLocale(sc.category, locale)}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-editorial text-lg text-[var(--ivory)]">
                        {pickLocale(sc.title, locale)}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-[var(--muted)] leading-relaxed">
                        {pickLocale(sc.description, locale)}
                      </p>

                      {/* Sample Data Table */}
                      <div className="border border-[var(--line)] bg-[#131316] p-3.5 space-y-2">
                        <span className="label-editorial text-[9px] text-[var(--brass-light)] block">
                          Parameter Input Simulasi:
                        </span>
                        <dl className="space-y-1.5 text-xs">
                          {sc.sampleData.map((d, dIdx) => (
                            <div key={dIdx} className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                              <dt className="text-[var(--muted)] shrink-0 font-mono text-[11px]">
                                {pickLocale(d.label, locale)}:
                              </dt>
                              <dd className="text-[var(--ivory)] font-medium text-right font-mono text-[11px] truncate">
                                {d.value}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>

                      {/* Expected Result */}
                      <div className="border border-[#2E7D52]/60 bg-[#0A2618]/60 p-3.5 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-[#86EFAC]">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                          <span className="text-[10px] uppercase tracking-wider font-mono font-medium">
                            {t.liveSandbox.scenarioExpected}
                          </span>
                        </div>
                        <p className="text-xs text-[#86EFAC]/90 leading-relaxed">
                          {pickLocale(sc.expectedResult, locale)}
                        </p>
                      </div>
                    </div>

                    {/* Action Hint & Button */}
                    <div className="pt-4 border-t border-[var(--line)] space-y-3">
                      <p className="text-[11px] text-[var(--muted)] italic">
                        Tip: {pickLocale(sc.actionHint, locale)}
                      </p>
                      <button
                        type="button"
                        onClick={() => setActiveTab('live')}
                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 border border-[var(--border-control)] bg-[#131316] text-xs uppercase tracking-[0.12em] font-medium text-[var(--brass-light)] hover:bg-[var(--brass)] hover:text-[#0A0A0B] transition-colors"
                      >
                        <Play className="h-3 w-3" />
                        <span>{t.liveSandbox.tryScenarioInApp}</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* TAB 3: LIVE RUNTIME VIEWPORT */}
        {/* ========================================================= */}
        {activeTab === 'live' && (
          <section className="h-full flex flex-col p-2 sm:p-4">
            <div className="mx-auto w-full max-w-[1440px] flex-1 flex flex-col border border-[var(--line)] bg-[#0E0E11] shadow-2xl overflow-hidden min-h-[620px] lg:min-h-[720px]">
              {/* Browser Chrome Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-[var(--line)] bg-[#16161A] px-4 py-2.5">
                {/* Traffic Lights & Project Name */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]/80 inline-block" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]/80 inline-block" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]/80 inline-block" />
                  </div>
                  <span className="h-4 w-[1px] bg-[var(--line)] hidden sm:inline-block" />
                  <span className="font-editorial text-xs text-[var(--ivory)] truncate hidden sm:inline">
                    {activeProject.name}
                  </span>
                </div>

                {/* Address Bar */}
                <div className="flex-1 max-w-xl mx-auto order-3 sm:order-2 w-full sm:w-auto">
                  <div className="flex items-center justify-between gap-2 border border-[var(--line)] bg-[#0A0A0B] px-3 py-1 text-xs text-[var(--muted)]">
                    <div className="flex items-center gap-2 overflow-hidden truncate">
                      <Lock className="h-3 w-3 shrink-0 text-[#86EFAC]" />
                      <span className="truncate text-[#EDE8DF]/90 font-mono text-[11px]">
                        {activeProject.liveUrl}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
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

                {/* Viewport Width Controls & Fullscreen */}
                <div className="flex items-center gap-2 order-2 sm:order-3">
                  <div className="flex items-center border border-[var(--line)] bg-[#0A0A0B] p-0.5">
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

                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    title={isFullscreen ? 'Keluar Layar Penuh' : t.liveSandbox.fullscreen}
                    className="p-1.5 border border-[var(--line)] bg-[#0A0A0B] text-[var(--muted)] hover:text-[var(--brass-light)] transition-colors hidden sm:inline-flex"
                  >
                    {isFullscreen ? (
                      <Minimize2 className="h-3.5 w-3.5" />
                    ) : (
                      <Maximize2 className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Viewport Canvas Frame */}
              <div className="relative flex-1 flex justify-center items-center bg-[#070708] overflow-hidden p-2 sm:p-4 min-h-[500px]">
                <div
                  className={cn(
                    'relative w-full h-full transition-all duration-300 bg-[#0A0A0B] shadow-2xl border border-[var(--line)] overflow-hidden',
                    viewport === 'desktop' && 'max-w-full',
                    viewport === 'tablet' && 'max-w-[768px] rounded-lg',
                    viewport === 'mobile' && 'max-w-[390px] rounded-2xl'
                  )}
                  style={{ minHeight: '500px', height: '620px' }}
                >
                  {/* Loading Spinner */}
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

                  {/* Embedded Iframe */}
                  <iframe
                    key={iframeKey}
                    src={activeProject.embedUrl || activeProject.liveUrl}
                    title={`Aplikasi Web ${activeProject.name}`}
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    loading="eager"
                    onLoad={() => setIsLoading(false)}
                    className="w-full h-full border-0 bg-white"
                  />
                </div>
              </div>

              {/* Viewport Testing Guidance Footer */}
              <div className="border-t border-[var(--line)] bg-[#131316] px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--muted)]">
                <div className="flex items-center gap-2 truncate">
                  <Sparkles className="h-3.5 w-3.5 text-[var(--brass-light)] shrink-0" />
                  <span className="truncate">
                    Coba jalankan fitur sesuai <strong>Alur Sistem Kerja</strong>: Telusuri katalog/parameter, lakukan simulasi kalkulator, atau inspeksi 3D.
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveTab('workflow')}
                    className="text-[11px] uppercase tracking-wider text-[var(--brass-light)] hover:underline"
                  >
                    ← Lihat Ulang Alur Sistem
                  </button>
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--brass)] text-[#0A0A0B] text-[11px] uppercase tracking-wider font-medium hover:bg-[var(--brass-light)] transition-colors"
                  >
                    <span>Tab Baru</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
