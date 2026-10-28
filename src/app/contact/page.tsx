import React from 'react';
import { Metadata } from 'next';
import { getSiteSettings } from '@/lib/repository';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ContactSection } from '@/components/sections/ContactSection';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Kontak & Diskusi Kolaborasi',
  description:
    'Hubungi Ray Raharja Santoso untuk peluang kerja penuh waktu (Frontend / UI-UX / Graphic & Brand Designer) maupun pengerjaan website bisnis dan desain visual freelance.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Hubungi Ray Raharja Santoso | Web & Visual Design',
    description:
      'Kanal kontak langsung melalui email, WhatsApp, LinkedIn, serta formulir tervalidasi untuk diskusi kerja dan proyek freelance.',
    url: '/contact',
    type: 'website',
  },
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0B] text-[#EDE8DF]">
      <Navbar availableForWork={settings.available_for_work} />
      <main id="main-content" className="flex-1">
        <ContactSection settings={settings} isStandalonePage />
      </main>
      <Footer />
    </div>
  );
}
