'use client';

import React from 'react';
import {
  EvidenceStatus,
  STATUS_METADATA,
  pickLocale,
} from '@/lib/web-projects-data';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: EvidenceStatus;
  className?: string;
  showTitleTooltip?: boolean;
}

export function StatusBadge({
  status,
  className,
  showTitleTooltip = true,
}: StatusBadgeProps) {
  const { locale } = useLanguage();
  const meta = STATUS_METADATA[status];

  return (
    <span
      title={showTitleTooltip ? pickLocale(meta.description, locale) : undefined}
      className={cn(
        'inline-flex items-center gap-2 border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em]',
        meta.badgeClass,
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn('h-1.5 w-1.5 shrink-0 rounded-full', meta.dotClass)}
      />
      <span>{pickLocale(meta.label, locale)}</span>
    </span>
  );
}
