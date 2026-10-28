'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { getMoreWebProjects } from '@/lib/web-projects-data';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { WebProjectCard } from '@/components/portfolio/WebProjectCard';

export function MoreWebSection() {
  const { t } = useLanguage();
  const moreProjects = getMoreWebProjects();

  return (
    <section
      id="more-projects"
      aria-labelledby="heading-more-web"
      className="py-20 sm:py-28 border-b border-[var(--line)]"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-[var(--line)]">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-editorial italic text-sm text-[var(--brass-light)]">
                {t.moreWeb.index}
              </span>
              <span className="h-[1px] w-10 bg-[var(--line)]" />
              <span className="label-editorial">{t.moreWeb.label}</span>
            </div>

            <h2
              id="heading-more-web"
              className="section-heading font-normal text-[var(--ivory)]"
            >
              {t.moreWeb.heading}
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
              {t.moreWeb.subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-12">
          {moreProjects.map((project, idx) => (
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
              <WebProjectCard project={project} variant="compact" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
