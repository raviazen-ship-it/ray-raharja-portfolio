import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getProjectBySlug,
  getNextProject,
  getSiteSettings,
} from '@/lib/repository';
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
    return {
      title: 'Karya Tidak Ditemukan',
    };
  }

  return {
    title: `${project.title} (${project.category})`,
    description:
      project.description.slice(0, 160) ||
      `Studi kasus ${project.title} untuk ${project.client} oleh Ray Raharja Santoso.`,
    openGraph: {
      title: `${project.title} — Ray Raharja Santoso`,
      description: project.description.slice(0, 160),
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
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0B] text-[#EDE8DF]">
      <Navbar availableForWork={settings.available_for_work} />
      <main className="flex-1">
        <ProjectDetailClient project={project} nextProject={nextProject} />
      </main>
      <Footer />
    </div>
  );
}
