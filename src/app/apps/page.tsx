import React from 'react';
import { Metadata } from 'next';
import { UnifiedAppWorkspace } from '@/components/portfolio/UnifiedAppWorkspace';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Hub Semua Website & Aplikasi Terintegrasi | Ray Raharja Santoso',
  description:
    'Akses dan uji langsung 5 website bisnis & aplikasi interaktif buatan Ray Raharja Santoso (Leadkit Bakery, ArsiViz Pro, SymbioFlow Enterprise, Sekolah Nusantara, Seumur Gerak) secara terpadu dalam satu workspace.',
  alternates: {
    canonical: '/apps',
  },
  openGraph: {
    title: 'Hub Semua Website Terintegrasi | Ray Raharja Santoso',
    description:
      'Workspace interaktif terpadu untuk menjelajahi dan mencoba seluruh produk web karya Ray Raharja Santoso.',
    url: '/apps',
    type: 'website',
  },
};

export default function AppsHubPage() {
  return <UnifiedAppWorkspace initialSlug="leadkit-bakery" />;
}
