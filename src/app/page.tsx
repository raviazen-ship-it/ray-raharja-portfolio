import React from 'react';
import { Metadata } from 'next';
import { getPublishedProjects, getSiteSettings } from '@/lib/repository';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturedWebSection } from '@/components/portfolio/FeaturedWebSection';
import { CapabilityExplorerSection } from '@/components/portfolio/CapabilityExplorerSection';
import { MoreWebSection } from '@/components/portfolio/MoreWebSection';
import { WorksSection } from '@/components/sections/WorksSection';
import { HowIWorkSection } from '@/components/portfolio/HowIWorkSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const cleanTitle = (settings.hero_title || 'Ray Raharja Santoso').replace(
    /\u2014/g,
    '-'
  );
  const cleanDesc = (
    settings.hero_subtitle ||
    'Saya merancang dan membangun website bisnis serta pengalaman web interaktif, dengan perhatian pada kebutuhan pengguna, kualitas visual, dan implementasi fitur.'
  ).replace(/\u2014/g, '-');

  return {
    title: `${cleanTitle} | Web & Digital Products, Visual Design`,
    description: cleanDesc,
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: `${cleanTitle} | Integrated Portfolio Hub`,
      description: cleanDesc,
      type: 'website',
      url: '/',
    },
  };
}

export default async function HomePage() {
  const [projects, settings] = await Promise.all([
    getPublishedProjects(),
    getSiteSettings(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0B] text-[#EDE8DF]">
      <Navbar availableForWork={settings.available_for_work} />

      <main id="main-content" className="flex-1">
        <HeroSection settings={settings} />
        <FeaturedWebSection />
        <CapabilityExplorerSection />
        <MoreWebSection />
        <WorksSection projects={projects} />
        <HowIWorkSection />
        <AboutSection settings={settings} />
        <ContactSection settings={settings} />
      </main>

      <Footer />
    </div>
  );
}
