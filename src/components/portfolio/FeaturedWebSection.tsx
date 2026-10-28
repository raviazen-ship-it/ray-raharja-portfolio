'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getFeaturedWebProjects } from '@/lib/web-projects-data';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { WebProjectCard } from '@/components/portfolio/WebProjectCard';

export function FeaturedWebSection() {
  const { t } = useLanguage();
  const featuredProjects = getFeaturedWebProjects();

  return (
    <section
      id="featured-projects"
      aria-labelledby="heading-featured-web"
      className="py-20 sm:py-28 border-b border-[var(--line)]"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-[var(--line)]">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-editorial italic text-sm text-[var(--brass-light)]">
                {t.featuredWeb.index}
              </span>
              <span className="h-[1px] w-10 bg-[var(--line)]" />
              <span className="label-editorial">{t.featuredWeb.label}</span>
            </div>

            <h2
              id="heading-featured-web"
              className="section-heading font-normal text-[var(--ivory)]"
            >
              {t.featuredWeb.heading}
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row sm:items-end justify-between gap-4">
            <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
              {t.featuredWeb.subtitle}
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 shrink-0 min-h-[44px] border border-[var(--border-control)] bg-[#131316] px-5 py-2.5 text-xs uppercase tracking-[0.16em] text-[var(--ivory)] hover:border-[var(--brass-light)] hover:text-[var(--brass-light)] transition-colors"
            >
              <span>{t.featuredWeb.viewAllCta}</span>
              <ArrowRight className="h-3.5 w-3.5 text-[var(--brass-light)]" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 lg:gap-8 pt-12">
          {featuredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.5,
                delay: idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <WebProjectCard project={project} priority={idx < 2} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
