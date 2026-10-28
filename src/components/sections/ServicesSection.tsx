'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Palette, Layers, Film } from 'lucide-react';
import { SiteSettings } from '@/types/portfolio';
import { DEFAULT_SITE_SETTINGS, SERVICES_EN } from '@/lib/seed-data';
import { useLanguage } from '@/components/providers/LanguageProvider';

interface ServicesSectionProps {
  settings: SiteSettings;
}

const SERVICE_ICONS = [Code2, Palette, Layers, Film];

export function ServicesSection({ settings }: ServicesSectionProps) {
  const { locale, t } = useLanguage();

  const rawServices =
    locale === 'en'
      ? SERVICES_EN
      : Array.isArray(settings.services) && settings.services.length > 0
        ? settings.services
        : DEFAULT_SITE_SETTINGS.services;

  return (
    <section
      id="layanan"
      aria-labelledby="heading-layanan"
      className="py-20 sm:py-28 border-b border-[var(--line)]"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-[var(--line)]">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-editorial italic text-sm text-[var(--brass-light)]">
                {t.services.index}
              </span>
              <span className="h-[1px] w-10 bg-[var(--line)]" />
              <span className="label-editorial">{t.services.label}</span>
            </div>

            <h2
              id="heading-layanan"
              className="section-heading font-normal text-[var(--ivory)]"
            >
              {t.services.heading}
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
              {t.services.subtitle}
            </p>
          </div>
        </div>

        {/* 4 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 pt-12">
          {rawServices.map((service, idx) => {
            const IconComponent = SERVICE_ICONS[idx % SERVICE_ICONS.length];
            return (
              <motion.article
                key={service.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative flex flex-col justify-between border border-[var(--line)] bg-[#131316] p-7 sm:p-9 hover:border-[var(--brass-light)]/70 transition-colors duration-300"
              >
                <div>
                  <div className="flex items-center justify-between pb-6 mb-6 border-b border-[var(--line)]">
                    <span className="font-editorial italic text-2xl text-[var(--brass-light)]">
                      {service.index || String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center border border-[var(--border-control)] bg-[#0A0A0B] text-[var(--brass-light)] group-hover:border-[var(--brass-light)] transition-colors">
                      <IconComponent className="h-4 w-4" />
                    </span>
                  </div>

                  <h3 className="font-editorial text-3xl sm:text-4xl text-[var(--ivory)] mb-1.5">
                    {service.title.replace(/\u2014/g, '-')}
                  </h3>
                  <p className="label-editorial text-[var(--brass-light)] mb-5">
                    {service.subtitle.replace(/\u2014/g, '-')}
                  </p>

                  <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed mb-8">
                    {service.description.replace(/\u2014/g, '-')}
                  </p>
                </div>

                {/* Deliverables */}
                <div className="pt-5 border-t border-[var(--line)]">
                  <span className="label-editorial block mb-3 text-[10px]">
                    {t.services.deliverablesLabel}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {(service.deliverables || []).map((item, dIdx) => (
                      <span
                        key={dIdx}
                        className="rounded-[2px] border border-[var(--line)] bg-[#0A0A0B] px-3 py-1.5 text-xs text-[var(--ivory)]/85"
                      >
                        {item.replace(/\u2014/g, '-')}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
