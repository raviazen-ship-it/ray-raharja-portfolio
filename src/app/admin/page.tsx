import React from 'react';
import { Metadata } from 'next';
import {
  getAllProjectsAdmin,
  getSiteSettings,
  getMessagesAdmin,
} from '@/lib/repository';
import { getAllowedAdminEmail } from '@/lib/auth';
import { AdminDashboardClient } from '@/components/admin/AdminDashboardClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Studio Admin — Ray Raharja Santoso',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
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
      adminEmail={getAllowedAdminEmail()}
    />
  );
}
