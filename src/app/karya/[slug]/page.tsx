import React from 'react';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import {
  getProjectBySlug,
  getNextProject,
  getSiteSettings,
} from '@/lib/repository';
import { getWebProjectBySlug } from '@/lib/web-projects-data';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProjectDetailClient } from '@/components/sections/ProjectDetailClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    const webProj = getWebProjectBySlug(params.slug);
    if (webProj) {
      return {
        title: `${webProj.name} - Studi Kasus & Bukti Kerja`,
        description: webProj.shortDescription.id,
      };
    }
    return {
      title: 'Karya Tidak Ditemukan',
    };
  }

  const cleanTitle = project.title.replace(/\u2014/g, '-');
  const cleanDesc = (
    project.description.slice(0, 160) ||
    `Dokumentasi karya ${cleanTitle} untuk ${project.client} oleh Ray Raharja Santoso.`
  ).replace(/\u2014/g, '-');

  return {
    title: `${cleanTitle} (${project.category})`,
    description: cleanDesc,
    alternates: {
      canonical: `/karya/${project.slug}`,
    },
    openGraph: {
      title: `${cleanTitle} | Ray Raharja Santoso`,
      description: cleanDesc,
      url: `/karya/${project.slug}`,
      images: project.cover_url ? [{ url: project.cover_url }] : undefined,
      type: 'article',
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const [project, nextProject, settings] = await Promise.all([
    getProjectBySlug(params.slug),
    getNextProject(params.slug),
    getSiteSettings(),
  ]);

  if (!project) {
    const webProj = getWebProjectBySlug(params.slug);
    if (webProj) {
      redirect(`/projects/${params.slug}`);
    }
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0B] text-[#EDE8DF]">
      <Navbar availableForWork={settings.available_for_work} />
      <main id="main-content" className="flex-1">
        <ProjectDetailClient project={project} nextProject={nextProject} />
      </main>
      <Footer />
    </div>
  );
}
