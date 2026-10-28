import { MetadataRoute } from 'next';
import { getPublishedProjects } from '@/lib/repository';
import { WEB_PROJECTS } from '@/lib/web-projects-data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    'https://ray-raharja-portfolio.vercel.app';
  const visualProjects = await getPublishedProjects();

  const webCaseStudyEntries: MetadataRoute.Sitemap = WEB_PROJECTS.map(
    (project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(project.verifiedAt),
      changeFrequency: 'monthly',
      priority: 0.9,
    })
  );

  const visualWorkEntries: MetadataRoute.Sitemap = visualProjects.map(
    (project) => ({
      url: `${baseUrl}/karya/${project.slug}`,
      lastModified: new Date(project.created_at || Date.now()),
      changeFrequency: 'monthly',
      priority: 0.75,
    })
  );

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    ...webCaseStudyEntries,
    ...visualWorkEntries,
  ];
}
