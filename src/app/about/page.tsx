import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getSiteSettings } from '@/lib/repository';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AboutSection } from '@/components/sections/AboutSection';
import { HowIWorkSection } from '@/components/portfolio/HowIWorkSection';
import { ServicesSection } from '@/components/sections/ServicesSection';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Tentang, Pengalaman & Keahlian',
  description:
    'Profil Ray Raharja Santoso: lulusan Rekayasa Perangkat Lunak SMKS Barunawati serta Graphic & Brand Designer di PT Lightboxglobal dan pengalaman di PT Astra Daihatsu Motor (TOEIC 800, UKBI Madya).',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'Tentang Ray Raharja Santoso | Web & Visual Designer',
    description:
      'Latar belakang Rekayasa Perangkat Lunak, pengalaman desain e-commerce & produksi cetak UV, serta metode kerja dari discovery hingga validasi.',
    url: '/about',
    type: 'profile',
  },
};

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0B] text-[#EDE8DF]">
      <Navbar availableForWork={settings.available_for_work} />
      <main id="main-content" className="flex-1">
        <AboutSection settings={settings} isStandalonePage />
        <HowIWorkSection />
        <ServicesSection settings={settings} />

        {/* Cross-Navigation CTA Band */}
        <section className="py-16 sm:py-20 bg-[#0E0E11] border-b border-[var(--line)]">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[var(--ivory)] mb-2">
                Periksa Bukti Proyek atau Diskusikan Kolaborasi
              </h2>
              <p className="text-sm sm:text-base text-[var(--muted)]">
                Telusuri 5 studi kasus aplikasi web dan 12 arsip karya visual, atau hubungi Ray langsung.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 min-h-[48px] bg-[var(--brass)] px-6 py-3 text-xs uppercase tracking-[0.18em] font-medium text-[#0A0A0B] hover:bg-[var(--brass-light)] transition-colors"
              >
                <span>Lihat Semua Proyek</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 min-h-[48px] border border-[var(--border-control)] bg-[#131316] px-6 py-3 text-xs uppercase tracking-[0.18em] text-[var(--ivory)] hover:border-[var(--brass-light)] hover:text-[var(--brass-light)] transition-colors"
              >
                <span>Hubungi Saya</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
