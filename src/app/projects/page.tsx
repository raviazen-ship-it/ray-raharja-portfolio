import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { getPublishedProjects, getSiteSettings } from '@/lib/repository';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProjectsDirectoryClient } from '@/components/portfolio/ProjectsDirectoryClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Semua Proyek Web & Karya Desain',
  description:
    'Direktori lengkap 5 proyek aplikasi/website dengan live demo dan studi kasus terverifikasi bersama 12 arsip karya desain komunikasi visual, cetak UV, motion, dan video oleh Ray Raharja Santoso.',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Semua Proyek Web & Karya Desain | Ray Raharja Santoso',
    description:
      'Filter berdasarkan jalur Web & Digital Products atau Visual Design & Production, lengkap dengan tautan live demo dan bukti pemeriksaan.',
    url: '/projects',
    type: 'website',
  },
};

export default async function ProjectsPage() {
  const [visualProjects, settings] = await Promise.all([
    getPublishedProjects(),
    getSiteSettings(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0B] text-[#EDE8DF]">
      <Navbar availableForWork={settings.available_for_work} />
      <main id="main-content" className="flex-1">
        <Suspense
          fallback={
            <div className="pt-36 pb-24 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
              <div className="h-10 w-64 bg-[#131316] border border-[var(--line)] mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                {[0, 1, 2].map((idx) => (
                  <div
                    key={idx}
                    className="h-96 border border-[var(--line)] bg-[#131316]"
                  />
                ))}
              </div>
            </div>
          }
        >
          <ProjectsDirectoryClient visualProjects={visualProjects} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
