import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  WEB_PROJECTS,
  getWebProjectBySlug,
} from '@/lib/web-projects-data';
import { UnifiedAppWorkspace } from '@/components/portfolio/UnifiedAppWorkspace';

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
      title: 'Aplikasi Tidak Ditemukan',
    };
  }

  return {
    title: `${project.name} - Hub Aplikasi Terintegrasi | Ray Raharja Santoso`,
    description: project.shortDescription.id,
    alternates: {
      canonical: `/apps/${project.slug}`,
    },
    openGraph: {
      title: `${project.name} | Ray Raharja Unified Hub`,
      description: project.shortDescription.id,
      url: `/apps/${project.slug}`,
      type: 'website',
    },
  };
}

export default function AppSlugPage({ params }: PageProps) {
  const project = getWebProjectBySlug(params.slug);
  if (!project) {
    notFound();
  }

  return <UnifiedAppWorkspace initialSlug={project.slug} />;
}
