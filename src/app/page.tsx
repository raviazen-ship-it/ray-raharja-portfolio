import React from 'react';
import { Metadata } from 'next';
import { getPublishedProjects, getSiteSettings } from '@/lib/repository';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { WorksSection } from '@/components/sections/WorksSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ContactSection } from '@/components/sections/ContactSection';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: `${settings.hero_title} — Graphic, Brand & Motion Designer`,
    description: settings.hero_subtitle,
    openGraph: {
      title: `${settings.hero_title} — Studio Portofolio`,
      description: settings.hero_subtitle,
      type: 'website',
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

      <main className="flex-1">
        <HeroSection settings={settings} />
        <WorksSection projects={projects} />
        <AboutSection settings={settings} />
        <ServicesSection settings={settings} />
        <ContactSection settings={settings} />
      </main>

      <Footer />
    </div>
  );
}
