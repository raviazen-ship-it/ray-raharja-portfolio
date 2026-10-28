import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  WEB_PROJECTS,
  getWebProjectBySlug,
  getAdjacentWebProject,
} from '@/lib/web-projects-data';
import { getSiteSettings } from '@/lib/repository';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WebCaseStudyClient } from '@/components/portfolio/WebCaseStudyClient';

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return WEB_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const project = getWebProjectBySlug(params.slug);
  if (!project) {
    return {
      title: 'Studi Kasus Proyek Tidak Ditemukan',
    };
  }

  const primaryShot = project.screenshots[0];

  return {
    title: `${project.name} - Studi Kasus & Bukti Kerja`,
    description: project.shortDescription.id,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.name} | Studi Kasus Web oleh Ray Raharja Santoso`,
      description: project.shortDescription.id,
      url: `/projects/${project.slug}`,
      type: 'article',
      images: primaryShot
        ? [
            {
              url: primaryShot.url,
              width: primaryShot.width,
              height: primaryShot.height,
              alt: primaryShot.alt.id,
            },
          ]
        : undefined,
    },
  };
}

export default async function WebProjectCaseStudyPage({ params }: PageProps) {
  const project = getWebProjectBySlug(params.slug);
  if (!project) {
    notFound();
  }

  const nextProject = getAdjacentWebProject(params.slug);
  const settings = await getSiteSettings();

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0B] text-[#EDE8DF]">
      <Navbar availableForWork={settings.available_for_work} />
      <main id="main-content" className="flex-1">
        <WebCaseStudyClient project={project} nextProject={nextProject} />
      </main>
      <Footer />
    </div>
  );
}
