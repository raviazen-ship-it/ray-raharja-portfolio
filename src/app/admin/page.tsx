import React from 'react';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import {
  getAllProjectsAdmin,
  getSiteSettings,
  getMessagesAdmin,
} from '@/lib/repository';
import { getAuthenticatedAdmin } from '@/lib/admin-guard';
import { AdminDashboardClient } from '@/components/admin/AdminDashboardClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Studio Admin - Ray Raharja Santoso',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const session = await getAuthenticatedAdmin();
  if (!session.authenticated || !session.email) {
    redirect('/admin/login?next=/admin');
  }

  const [projects, settings, messages] = await Promise.all([
    getAllProjectsAdmin(),
    getSiteSettings(),
    getMessagesAdmin(),
  ]);

  return (
    <AdminDashboardClient
      initialProjects={projects}
      initialSettings={settings}
      initialMessages={messages}
      adminEmail={session.email}
    />
  );
}
