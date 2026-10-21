import React from 'react';

export default function Loading() {
  return (
    <div
      aria-busy="true"
      aria-label="Memuat halaman studio..."
      className="min-h-screen bg-[#0A0A0B] text-[#EDE8DF] pt-28 pb-20"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 space-y-12">
        {/* Top Index Skeleton */}
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-5">
          <div className="h-4 w-48 bg-[#131316] animate-pulse" />
          <div className="h-7 w-56 border border-[var(--line)] bg-[#131316] animate-pulse" />
        </div>

        {/* Hero Title Skeleton */}
        <div className="space-y-4 py-10">
          <div className="h-4 w-64 bg-[#131316] animate-pulse" />
          <div className="h-20 sm:h-28 w-4/5 bg-[#131316] animate-pulse" />
          <div className="h-20 sm:h-28 w-3/5 bg-[#131316] animate-pulse" />
        </div>

        {/* Masonry Gallery Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-8 border-t border-[var(--line)]">
          <div className="aspect-[16/10] border border-[var(--line)] bg-[#131316] animate-pulse" />
          <div className="aspect-[9/16] border border-[var(--line)] bg-[#131316] animate-pulse" />
          <div className="aspect-[4/5] border border-[var(--line)] bg-[#131316] animate-pulse" />
        </div>
      </div>
    </div>
  );
}
