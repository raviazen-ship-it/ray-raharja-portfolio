'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  Settings,
  Mail,
  Plus,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Star,
  GripVertical,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Upload,
  X,
  Check,
  Sparkles,
} from 'lucide-react';
import {
  Project,
  ProjectCategory,
  CardSize,
  SiteSettings,
  ContactMessage,
  MediaItem,
  ServiceItem,
} from '@/types/portfolio';
import { MediaUploader } from '@/components/admin/MediaUploader';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { slugify, cn } from '@/lib/utils';

interface AdminDashboardClientProps {
  initialProjects: Project[];
  initialSettings: SiteSettings;
  initialMessages: ContactMessage[];
  adminEmail: string;
}

type AdminTab = 'overview' | 'projects' | 'settings' | 'messages';

interface ProjectFormState {
  id?: string;
  title: string;
  slug: string;
  description: string;
  category: ProjectCategory;
  year: string;
  client: string;
  role: string;
  toolsInput: string;
  cover_url: string;
  media: MediaItem[];
  card_size: CardSize;
  featured: boolean;
  published: boolean;
  order_index?: number;
}

const EMPTY_PROJECT_FORM: ProjectFormState = {
  title: '',
  slug: '',
  description: '',
  category: 'Branding',
  year: String(new Date().getFullYear()),
  client: '',
  role: 'Brand & Graphic Designer',
  toolsInput: 'Adobe Illustrator, Adobe InDesign, Figma',
  cover_url: '',
  media: [],
  card_size: 'normal',
  featured: false,
  published: true,
};

export function AdminDashboardClient({
  initialProjects,
  initialSettings,
  initialMessages,
  adminEmail,
}: AdminDashboardClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);

  // Toast feedback
  const [toast, setToast] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // Project Editor Modal state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [projectForm, setProjectForm] =
    useState<ProjectFormState>(EMPTY_PROJECT_FORM);
  const [savingProject, setSavingProject] = useState(false);

  // Delete Confirmation Modal state
  const [deleteTarget, setDeleteTarget] = useState<{
    kind: 'project' | 'message';
    id: string;
    label: string;
  } | null>(null);

  // Drag & Drop state for reordering projects
  const [draggedProjectId, setDraggedProjectId] = useState<string | null>(null);

  // Settings saving state
  const [savingSettings, setSavingSettings] = useState(false);
  const [uploadingAsset, setUploadingAsset] = useState<'photo' | 'cv' | null>(
    null
  );

  const showToast = useCallback(
    (type: 'success' | 'error', text: string) => {
      setToast({ type, text });
      setTimeout(() => {
        setToast((prev) => (prev?.text === text ? null : prev));
      }, 4000);
    },
    []
  );

  // Refresh data from server
  const refreshAllData = useCallback(async () => {
    try {
      const [projRes, setRes, msgRes] = await Promise.all([
        fetch('/api/admin/projects'),
        fetch('/api/admin/settings'),
        fetch('/api/admin/messages'),
      ]);
      if (projRes.ok) {
        const d = await projRes.json();
        if (Array.isArray(d.projects)) setProjects(d.projects);
      }
      if (setRes.ok) {
        const d = await setRes.json();
        if (d.settings) setSettings(d.settings);
      }
      if (msgRes.ok) {
        const d = await msgRes.json();
        if (Array.isArray(d.messages)) setMessages(d.messages);
      }
    } catch {
      // Ignore network polling errors
    }
  }, []);

  // Subscribe to Supabase Realtime if configured
  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;

    const channel = supabase
      .channel('studio-admin-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'projects' },
        () => refreshAllData()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'site_settings' },
        () => refreshAllData()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'messages' },
        () => refreshAllData()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refreshAllData]);

  const unreadCount = messages.filter((m) => !m.is_read).length;
  const publishedCount = projects.filter((p) => p.published).length;
  const featuredCount = projects.filter((p) => p.featured).length;

  // ==========================================================================
  // AUTH LOGOUT
  // ==========================================================================
  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  // ==========================================================================
  // PROJECT CRUD & REORDER HANDLERS
  // ==========================================================================
  const openCreateProject = () => {
    setProjectForm({
      ...EMPTY_PROJECT_FORM,
      order_index: projects.length + 1,
    });
    setIsEditorOpen(true);
  };

  const openEditProject = (project: Project) => {
    setProjectForm({
      id: project.id,
      title: project.title,
      slug: project.slug,
      description: project.description,
      category: project.category,
      year: project.year,
      client: project.client,
      role: project.role,
      toolsInput: (project.tools || []).join(', '),
      cover_url: project.cover_url,
      media: project.media || [],
      card_size: project.card_size,
      featured: project.featured,
      published: project.published,
      order_index: project.order_index,
    });
    setIsEditorOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title.trim()) {
      showToast('error', 'Judul proyek wajib diisi.');
      return;
    }

    setSavingProject(true);
    try {
      const tools = projectForm.toolsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const coverUrl =
        projectForm.cover_url ||
        projectForm.media[0]?.url ||
        'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1600&q=85';

      const payload = {
        id: projectForm.id,
        title: projectForm.title.trim(),
        slug: slugify(projectForm.slug || projectForm.title),
        description: projectForm.description,
        category: projectForm.category,
        year: projectForm.year,
        client: projectForm.client,
        role: projectForm.role,
        tools,
        cover_url: coverUrl,
        media:
          projectForm.media.length > 0
            ? projectForm.media
            : [
                {
                  id: `media-${Date.now()}`,
                  url: coverUrl,
                  type: 'image' as const,
                  width: 1600,
                  height: 1000,
                  alt: projectForm.title.trim(),
                  blurhash: 'L10A0B241E14',
                  is_cover: true,
                },
              ],
        card_size: projectForm.card_size,
        featured: projectForm.featured,
        published: projectForm.published,
        order_index: projectForm.order_index,
      };

      const method = projectForm.id ? 'PUT' : 'POST';
      const res = await fetch('/api/admin/projects', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gagal menyimpan proyek.');
      }

      await refreshAllData();
      setIsEditorOpen(false);
      showToast(
        'success',
        projectForm.id
          ? 'Proyek diperbarui & website publik telah disinkronisasi!'
          : 'Proyek baru ditambahkan & tayang di website publik!'
      );
    } catch (err: any) {
      showToast('error', err?.message || 'Gagal menyimpan proyek.');
    } finally {
      setSavingProject(false);
    }
  };

  const handleQuickPatchProject = async (
    project: Project,
    patch: Partial<Project>
  ) => {
    try {
      const updated = { ...project, ...patch };
      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? updated : p))
      );

      const res = await fetch('/api/admin/projects', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });

      if (!res.ok) {
        throw new Error('Gagal memperbarui status proyek.');
      }

      showToast('success', `Status "${project.title}" berhasil diperbarui.`);
    } catch (err: any) {
      showToast('error', err?.message || 'Gagal memperbarui proyek.');
      refreshAllData();
    }
  };

  const persistProjectOrder = async (nextList: Project[]) => {
    setProjects(nextList);
    try {
      const orderedIds = nextList.map((p) => p.id);
      const res = await fetch('/api/admin/projects', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reorder', orderedIds }),
      });
      if (!res.ok) throw new Error('Gagal menyimpan urutan.');
      showToast('success', 'Urutan proyek berhasil diperbarui secara real-time.');
    } catch {
      showToast('error', 'Gagal menyimpan urutan proyek.');
      refreshAllData();
    }
  };

  const handleMoveProject = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= projects.length) return;
    const next = [...projects];
    const [moved] = next.splice(index, 1);
    next.splice(target, 0, moved);
    persistProjectOrder(next);
  };

  const handleDropProject = (targetId: string) => {
    if (!draggedProjectId || draggedProjectId === targetId) return;
    const fromIdx = projects.findIndex((p) => p.id === draggedProjectId);
    const toIdx = projects.findIndex((p) => p.id === targetId);
    if (fromIdx === -1 || toIdx === -1) return;

    const next = [...projects];
    const [moved] = next.splice(fromIdx, 1);
    next.splice(toIdx, 0, moved);
    setDraggedProjectId(null);
    persistProjectOrder(next);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      if (deleteTarget.kind === 'project') {
        const res = await fetch(
          `/api/admin/projects?id=${encodeURIComponent(deleteTarget.id)}`,
          { method: 'DELETE' }
        );
        if (!res.ok) throw new Error('Gagal menghapus proyek.');
        setProjects((prev) => prev.filter((p) => p.id !== deleteTarget.id));
        showToast('success', `Proyek "${deleteTarget.label}" telah dihapus.`);
      } else {
        const res = await fetch(
          `/api/admin/messages?id=${encodeURIComponent(deleteTarget.id)}`,
          { method: 'DELETE' }
        );
        if (!res.ok) throw new Error('Gagal menghapus pesan.');
        setMessages((prev) => prev.filter((m) => m.id !== deleteTarget.id));
        showToast('success', 'Pesan berhasil dihapus.');
      }
    } catch (err: any) {
      showToast('error', err?.message || 'Gagal menghapus item.');
    } finally {
      setDeleteTarget(null);
    }
  };

  // ==========================================================================
  // SITE SETTINGS HANDLERS
  // ==========================================================================
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal menyimpan pengaturan.');
      setSettings(data.settings);
      showToast(
        'success',
        'Konten situs berhasil disimpan & langsung tampil di website publik!'
      );
    } catch (err: any) {
      showToast('error', err?.message || 'Gagal menyimpan pengaturan situs.');
    } finally {
      setSavingSettings(false);
    }
  };

  const handleUploadSettingAsset = async (
    file: File,
    target: 'photo' | 'cv'
  ) => {
    setUploadingAsset(target);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('kind', target === 'cv' ? 'cv' : 'media');

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal mengunggah file.');

      const nextSettings = {
        ...settings,
        ...(target === 'photo'
          ? { profile_photo_url: data.url }
          : { cv_url: data.url }),
      };
      setSettings(nextSettings);
      showToast(
        'success',
        target === 'photo'
          ? 'Foto profil berhasil diunggah. Jangan lupa klik Simpan Pengaturan.'
          : 'File CV PDF berhasil diunggah. Jangan lupa klik Simpan Pengaturan.'
      );
    } catch (err: any) {
      showToast('error', err?.message || 'Gagal mengunggah file.');
    } finally {
      setUploadingAsset(null);
    }
  };

  const handleServiceChange = (
    idx: number,
    patch: Partial<ServiceItem>
  ) => {
    const nextServices = [...(settings.services || [])];
    nextServices[idx] = { ...nextServices[idx], ...patch };
    setSettings({ ...settings, services: nextServices });
  };

  // ==========================================================================
  // MESSAGES HANDLERS
  // ==========================================================================
  const handleToggleMessageRead = async (msg: ContactMessage) => {
    const nextRead = !msg.is_read;
    setMessages((prev) =>
      prev.map((m) => (m.id === msg.id ? { ...m, is_read: nextRead } : m))
    );
    await fetch('/api/admin/messages', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: msg.id, is_read: nextRead }),
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0B] text-[#EDE8DF]">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[#0A0A0B]/95 backdrop-blur-md">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center border border-[var(--brass)] bg-[#131316] font-editorial text-lg text-[var(--brass-light)]">
              R
            </span>
            <div>
              <h1 className="font-editorial text-xl text-[var(--ivory)] leading-none">
                Studio Admin Panel
              </h1>
              <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                {adminEmail}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-2 min-h-[42px] border border-[var(--line)] bg-[#131316] px-3.5 py-2 text-xs uppercase tracking-[0.18em] text-[var(--ivory)] hover:border-[var(--brass)] hover:text-[var(--brass-light)] transition-colors"
            >
              <span>Lihat Website</span>
              <ExternalLink className="h-3.5 w-3.5 text-[var(--brass)]" />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 min-h-[42px] border border-[var(--line)] bg-[#131316] px-3.5 py-2 text-xs uppercase tracking-[0.18em] text-[var(--muted)] hover:border-red-500/50 hover:text-red-300 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs (Comfortable on Mobile & Desktop) */}
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 flex overflow-x-auto border-t border-[var(--line)]">
          {[
            {
              id: 'overview' as AdminTab,
              label: 'Ringkasan',
              icon: LayoutDashboard,
            },
            {
              id: 'projects' as AdminTab,
              label: `Kelola Karya (${projects.length})`,
              icon: FolderKanban,
            },
            {
              id: 'settings' as AdminTab,
              label: 'Konten & Layanan',
              icon: Settings,
            },
            {
              id: 'messages' as AdminTab,
              label: 'Pesan Masuk',
              icon: Mail,
              badge: unreadCount,
            },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'inline-flex items-center gap-2.5 min-h-[48px] px-4 sm:px-6 py-3 text-xs uppercase tracking-[0.18em] whitespace-nowrap border-b-2 transition-colors',
                  active
                    ? 'border-[var(--brass)] text-[var(--brass-light)] bg-[#131316]/60 font-medium'
                    : 'border-transparent text-[var(--muted)] hover:text-[var(--ivory)]'
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
                {tab.badge ? (
                  <span className="ml-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[var(--brass)] px-1.5 text-[10px] font-bold text-[#0A0A0B]">
                    {tab.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </header>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 max-w-md border border-[var(--brass)] bg-[#131316] p-4 shadow-2xl flex items-start gap-3">
          {toast.type === 'success' ? (
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
          ) : (
            <AlertCircle className="h-5 w-5 shrink-0 text-red-400" />
          )}
          <div className="text-xs text-[var(--ivory)] leading-relaxed">
            {toast.text}
          </div>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="text-[var(--muted)] hover:text-[var(--ivory)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 mx-auto w-full max-w-[1440px] px-4 sm:px-8 py-8 sm:py-10">
        {/* ================================================================
            TAB 1: OVERVIEW
           ================================================================ */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--line)] pb-6">
              <div>
                <span className="label-editorial text-[var(--brass-light)]">
                  Ringkasan Studio
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl text-[var(--ivory)]">
                  Selamat Datang, Ray Raharja
                </h2>
              </div>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('projects');
                  openCreateProject();
                }}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-[var(--brass)] px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium text-[#0A0A0B] hover:bg-[var(--brass-light)] transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Tambah Karya Baru</span>
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="border border-[var(--line)] bg-[#131316] p-6">
                <span className="label-editorial block text-[10px]">
                  Total Proyek
                </span>
                <p className="font-editorial text-5xl text-[var(--ivory)] mt-2">
                  {projects.length}
                </p>
                <span className="text-xs text-[var(--muted)] mt-2 block">
                  {publishedCount} Published • {projects.length - publishedCount}{' '}
                  Draft
                </span>
              </div>

              <div className="border border-[var(--line)] bg-[#131316] p-6">
                <span className="label-editorial block text-[10px]">
                  Karya Unggulan
                </span>
                <p className="font-editorial text-5xl text-[var(--brass-light)] mt-2">
                  {featuredCount}
                </p>
                <span className="text-xs text-[var(--muted)] mt-2 block">
                  Ditandai dengan lencana Featured
                </span>
              </div>

              <div className="border border-[var(--line)] bg-[#131316] p-6">
                <span className="label-editorial block text-[10px]">
                  Pesan Masuk Baru
                </span>
                <p className="font-editorial text-5xl text-emerald-400 mt-2">
                  {unreadCount}
                </p>
                <span className="text-xs text-[var(--muted)] mt-2 block">
                  Dari total {messages.length} pesan di kotak masuk
                </span>
              </div>

              <div className="border border-[var(--line)] bg-[#131316] p-6">
                <span className="label-editorial block text-[10px]">
                  Status Freelance
                </span>
                <p className="font-editorial text-2xl text-[var(--ivory)] mt-3">
                  {settings.available_for_work
                    ? 'Tersedia untuk Proyek'
                    : 'Jadwal Penuh'}
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('settings')}
                  className="mt-3 text-[11px] uppercase tracking-[0.18em] text-[var(--brass-light)] hover:underline"
                >
                  Ubah Status &rarr;
                </button>
              </div>
            </div>

            {/* Recent Messages & Quick Project List */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 border border-[var(--line)] bg-[#131316] p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
                  <h3 className="font-editorial text-2xl text-[var(--ivory)]">
                    Urutan Karya Teratas
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab('projects')}
                    className="text-xs uppercase tracking-[0.18em] text-[var(--brass-light)]"
                  >
                    Kelola Semua &rarr;
                  </button>
                </div>

                <div className="divide-y divide-[var(--line)]">
                  {projects.slice(0, 5).map((p, idx) => (
                    <div
                      key={p.id}
                      className="py-3.5 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="font-editorial italic text-sm text-[var(--brass)] w-6">
                          0{idx + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-[var(--ivory)] truncate">
                            {p.title}
                          </p>
                          <p className="text-[11px] text-[var(--muted)]">
                            {p.category} • Ukuran Kartu: {p.card_size}
                          </p>
                        </div>
                      </div>
                      <span
                        className={cn(
                          'px-2.5 py-0.5 text-[10px] uppercase tracking-wider border',
                          p.published
                            ? 'border-emerald-500/40 text-emerald-300'
                            : 'border-amber-500/40 text-amber-300'
                        )}
                      >
                        {p.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 border border-[var(--line)] bg-[#131316] p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
                  <h3 className="font-editorial text-2xl text-[var(--ivory)]">
                    Pesan Masuk Terbaru
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab('messages')}
                    className="text-xs uppercase tracking-[0.18em] text-[var(--brass-light)]"
                  >
                    Kotak Masuk &rarr;
                  </button>
                </div>

                {messages.length === 0 ? (
                  <p className="text-xs text-[var(--muted)] py-6">
                    Belum ada pesan masuk.
                  </p>
                ) : (
                  <div className="divide-y divide-[var(--line)]">
                    {messages.slice(0, 4).map((msg) => (
                      <div key={msg.id} className="py-3.5 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-[var(--ivory)]">
                            {msg.name}
                          </span>
                          {!msg.is_read && (
                            <span className="bg-[var(--brass)] px-2 py-0.5 text-[9px] uppercase font-bold text-[#0A0A0B]">
                              Baru
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[var(--muted)] line-clamp-2">
                          {msg.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================
            TAB 2: PROJECTS MANAGEMENT (CRUD + DRAG & DROP REORDER)
           ================================================================ */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--line)] pb-6">
              <div>
                <span className="label-editorial text-[var(--brass-light)]">
                  Manajemen Portofolio
                </span>
                <h2 className="font-editorial text-3xl text-[var(--ivory)]">
                  Kelola Karya &amp; Urutan Tampilan
                </h2>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Seret baris (drag &amp; drop) atau gunakan tombol panah untuk
                  mengubah urutan karya di halaman depan secara langsung.
                </p>
              </div>

              <button
                type="button"
                onClick={openCreateProject}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-[var(--brass)] px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium text-[#0A0A0B] hover:bg-[var(--brass-light)] transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Tambah Proyek Baru</span>
              </button>
            </div>

            {/* Projects List */}
            <div className="space-y-3">
              {projects.map((project, idx) => (
                <div
                  key={project.id}
                  draggable
                  onDragStart={() => setDraggedProjectId(project.id)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDropProject(project.id)}
                  className={cn(
                    'grid grid-cols-1 lg:grid-cols-12 gap-4 items-center border bg-[#131316] p-4 transition-colors',
                    draggedProjectId === project.id
                      ? 'border-[var(--brass)] opacity-60'
                      : 'border-[var(--line)] hover:border-[var(--brass)]/60'
                  )}
                >
                  {/* Drag Handle + Index + Thumbnail + Title */}
                  <div className="lg:col-span-5 flex items-center gap-3.5 min-w-0">
                    <div className="flex flex-col items-center gap-1 text-[var(--muted)] cursor-grab active:cursor-grabbing">
                      <GripVertical className="h-4 w-4 text-[var(--brass)]" />
                      <span className="font-editorial italic text-xs">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="h-16 w-20 shrink-0 overflow-hidden border border-[var(--line)] bg-[#0A0A0B] flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.cover_url}
                        alt={project.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-editorial text-xl text-[var(--ivory)] truncate">
                          {project.title}
                        </h3>
                      </div>
                      <p className="text-xs text-[var(--muted)] truncate">
                        {project.category} • {project.client} ({project.year})
                      </p>
                      <p className="text-[10px] text-[var(--brass-light)] mt-0.5">
                        /karya/{project.slug} • {project.media?.length || 1}{' '}
                        media
                      </p>
                    </div>
                  </div>

                  {/* Quick Controls: Card Size, Featured, Published */}
                  <div className="lg:col-span-4 flex flex-wrap items-center gap-2">
                    <select
                      aria-label={`Ukuran kartu untuk ${project.title}`}
                      value={project.card_size}
                      onChange={(e) =>
                        handleQuickPatchProject(project, {
                          card_size: e.target.value as CardSize,
                        })
                      }
                      className="min-h-[38px] border border-[var(--line)] bg-[#0A0A0B] px-2.5 py-1.5 text-xs text-[var(--ivory)] focus:border-[var(--brass)]"
                    >
                      <option value="normal">Kartu: Normal</option>
                      <option value="wide">Kartu: Lebar (Wide)</option>
                      <option value="tall">Kartu: Tinggi (Tall 9:16)</option>
                      <option value="full">Kartu: Full-Width</option>
                    </select>

                    <button
                      type="button"
                      onClick={() =>
                        handleQuickPatchProject(project, {
                          featured: !project.featured,
                        })
                      }
                      className={cn(
                        'inline-flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 text-xs border transition-colors',
                        project.featured
                          ? 'border-[var(--brass)] bg-[var(--brass)]/20 text-[var(--brass-light)]'
                          : 'border-[var(--line)] bg-[#0A0A0B] text-[var(--muted)]'
                      )}
                    >
                      <Star className="h-3.5 w-3.5" />
                      <span>Unggulan</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleQuickPatchProject(project, {
                          published: !project.published,
                        })
                      }
                      className={cn(
                        'inline-flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 text-xs border transition-colors',
                        project.published
                          ? 'border-emerald-500/40 bg-emerald-950/25 text-emerald-300'
                          : 'border-amber-500/40 bg-amber-950/25 text-amber-300'
                      )}
                    >
                      {project.published ? (
                        <>
                          <Eye className="h-3.5 w-3.5" />
                          <span>Published</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="h-3.5 w-3.5" />
                          <span>Draft</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Reorder Up/Down + Edit + Delete Buttons */}
                  <div className="lg:col-span-3 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleMoveProject(idx, -1)}
                      disabled={idx === 0}
                      aria-label="Naikkan urutan"
                      className="inline-flex h-10 w-10 items-center justify-center border border-[var(--line)] bg-[#0A0A0B] text-[var(--ivory)] hover:border-[var(--brass)] disabled:opacity-30"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveProject(idx, 1)}
                      disabled={idx === projects.length - 1}
                      aria-label="Turunkan urutan"
                      className="inline-flex h-10 w-10 items-center justify-center border border-[var(--line)] bg-[#0A0A0B] text-[var(--ivory)] hover:border-[var(--brass)] disabled:opacity-30"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => openEditProject(project)}
                      className="inline-flex items-center gap-1.5 min-h-[40px] border border-[var(--line)] bg-[#0A0A0B] px-3.5 py-2 text-xs uppercase tracking-wider text-[var(--ivory)] hover:border-[var(--brass)] hover:text-[var(--brass-light)]"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setDeleteTarget({
                          kind: 'project',
                          id: project.id,
                          label: project.title,
                        })
                      }
                      aria-label={`Hapus ${project.title}`}
                      className="inline-flex h-10 w-10 items-center justify-center border border-red-500/40 bg-red-950/20 text-red-300 hover:bg-red-900/40"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================
            TAB 3: SITE SETTINGS MANAGEMENT
           ================================================================ */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="space-y-10 max-w-5xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--line)] pb-6">
              <div>
                <span className="label-editorial text-[var(--brass-light)]">
                  Pengaturan Konten Situs
                </span>
                <h2 className="font-editorial text-3xl text-[var(--ivory)]">
                  Hero, Tentang Saya, Layanan &amp; Kontak
                </h2>
              </div>

              <button
                type="submit"
                disabled={savingSettings}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-[var(--brass)] px-8 py-3 text-xs uppercase tracking-[0.2em] font-medium text-[#0A0A0B] hover:bg-[var(--brass-light)] disabled:opacity-50 transition-colors"
              >
                <Check className="h-4 w-4" />
                <span>
                  {savingSettings ? 'Menyimpan...' : 'Simpan Pengaturan'}
                </span>
              </button>
            </div>

            {/* Hero & Availability Settings */}
            <div className="border border-[var(--line)] bg-[#131316] p-6 sm:p-8 space-y-6">
              <h3 className="font-editorial text-2xl text-[var(--ivory)] border-b border-[var(--line)] pb-3">
                01 / Bagian Hero &amp; Ketersediaan Freelance
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="label-editorial block mb-2 text-[var(--ivory)]">
                    Judul Utama (Nama di Hero)
                  </label>
                  <input
                    type="text"
                    value={settings.hero_title}
                    onChange={(e) =>
                      setSettings({ ...settings, hero_title: e.target.value })
                    }
                    className="w-full min-h-[46px] border border-[var(--line)] bg-[#0A0A0B] px-4 py-2.5 text-sm text-[var(--ivory)]"
                  />
                </div>

                <div>
                  <label className="label-editorial block mb-2 text-[var(--ivory)]">
                    Status Ketersediaan Freelance
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setSettings({
                        ...settings,
                        available_for_work: !settings.available_for_work,
                      })
                    }
                    className={cn(
                      'w-full min-h-[46px] flex items-center justify-between px-4 py-2.5 border text-xs uppercase tracking-[0.18em]',
                      settings.available_for_work
                        ? 'border-emerald-500/50 bg-emerald-950/25 text-emerald-300'
                        : 'border-amber-500/50 bg-amber-950/25 text-amber-300'
                    )}
                  >
                    <span>
                      {settings.available_for_work
                        ? '● Tersedia untuk Freelance (Titik Hijau Aktif)'
                        : '● Jadwal Penuh / Tidak Tersedia'}
                    </span>
                    <span className="underline">Ubah</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="label-editorial block mb-2 text-[var(--ivory)]">
                  Subjudul Hero
                </label>
                <textarea
                  rows={3}
                  value={settings.hero_subtitle}
                  onChange={(e) =>
                    setSettings({ ...settings, hero_subtitle: e.target.value })
                  }
                  className="w-full border border-[var(--line)] bg-[#0A0A0B] px-4 py-3 text-sm text-[var(--ivory)]"
                />
              </div>
            </div>

            {/* About Bio, Profile Photo & CV PDF */}
            <div className="border border-[var(--line)] bg-[#131316] p-6 sm:p-8 space-y-6">
              <h3 className="font-editorial text-2xl text-[var(--ivory)] border-b border-[var(--line)] pb-3">
                02 / Tentang Saya, Foto Profil &amp; CV PDF
              </h3>

              <div>
                <label className="label-editorial block mb-2 text-[var(--ivory)]">
                  Narasi Biografi (Pisahkan paragraf dengan baris kosong)
                </label>
                <textarea
                  rows={6}
                  value={settings.about_text}
                  onChange={(e) =>
                    setSettings({ ...settings, about_text: e.target.value })
                  }
                  className="w-full border border-[var(--line)] bg-[#0A0A0B] px-4 py-3 text-sm text-[var(--ivory)]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="label-editorial block text-[var(--ivory)]">
                    URL / Unggah Foto Profil
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={settings.profile_photo_url}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          profile_photo_url: e.target.value,
                        })
                      }
                      className="flex-1 min-h-[44px] border border-[var(--line)] bg-[#0A0A0B] px-3 py-2 text-xs text-[var(--ivory)]"
                    />
                    <label className="cursor-pointer inline-flex items-center gap-1.5 min-h-[44px] border border-[var(--brass)] bg-[#0A0A0B] px-4 py-2 text-xs uppercase tracking-wider text-[var(--brass-light)] hover:bg-[var(--brass)] hover:text-[#0A0A0B] transition-colors">
                      <Upload className="h-3.5 w-3.5" />
                      <span>
                        {uploadingAsset === 'photo' ? '...' : 'Upload'}
                      </span>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/avif"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) handleUploadSettingAsset(f, 'photo');
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="label-editorial block text-[var(--ivory)]">
                    URL / Unggah File CV (PDF)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={settings.cv_url}
                      onChange={(e) =>
                        setSettings({ ...settings, cv_url: e.target.value })
                      }
                      className="flex-1 min-h-[44px] border border-[var(--line)] bg-[#0A0A0B] px-3 py-2 text-xs text-[var(--ivory)]"
                    />
                    <label className="cursor-pointer inline-flex items-center gap-1.5 min-h-[44px] border border-[var(--brass)] bg-[#0A0A0B] px-4 py-2 text-xs uppercase tracking-wider text-[var(--brass-light)] hover:bg-[var(--brass)] hover:text-[#0A0A0B] transition-colors">
                      <Upload className="h-3.5 w-3.5" />
                      <span>
                        {uploadingAsset === 'cv' ? '...' : 'Upload PDF'}
                      </span>
                      <input
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) handleUploadSettingAsset(f, 'cv');
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Cards Editor */}
            <div className="border border-[var(--line)] bg-[#131316] p-6 sm:p-8 space-y-6">
              <h3 className="font-editorial text-2xl text-[var(--ivory)] border-b border-[var(--line)] pb-3">
                03 / Kartu Layanan Studio
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(settings.services || []).map((svc, idx) => (
                  <div
                    key={svc.id || idx}
                    className="border border-[var(--line)] bg-[#0A0A0B] p-5 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-editorial italic text-lg text-[var(--brass-light)]">
                        Kartu 0{idx + 1}
                      </span>
                    </div>
                    <input
                      type="text"
                      value={svc.title}
                      onChange={(e) =>
                        handleServiceChange(idx, { title: e.target.value })
                      }
                      placeholder="Judul Layanan"
                      className="w-full min-h-[40px] border border-[var(--line)] bg-[#131316] px-3 py-1.5 text-sm text-[var(--ivory)]"
                    />
                    <input
                      type="text"
                      value={svc.subtitle}
                      onChange={(e) =>
                        handleServiceChange(idx, { subtitle: e.target.value })
                      }
                      placeholder="Subjudul Layanan"
                      className="w-full min-h-[40px] border border-[var(--line)] bg-[#131316] px-3 py-1.5 text-xs text-[var(--brass-light)]"
                    />
                    <textarea
                      rows={3}
                      value={svc.description}
                      onChange={(e) =>
                        handleServiceChange(idx, {
                          description: e.target.value,
                        })
                      }
                      placeholder="Deskripsi layanan..."
                      className="w-full border border-[var(--line)] bg-[#131316] px-3 py-2 text-xs text-[var(--ivory)]"
                    />
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[var(--muted)] mb-1">
                        Deliverables (Pisahkan dengan koma)
                      </label>
                      <input
                        type="text"
                        value={(svc.deliverables || []).join(', ')}
                        onChange={(e) =>
                          handleServiceChange(idx, {
                            deliverables: e.target.value
                              .split(',')
                              .map((s) => s.trim())
                              .filter(Boolean),
                          })
                        }
                        className="w-full min-h-[38px] border border-[var(--line)] bg-[#131316] px-3 py-1.5 text-xs text-[var(--ivory)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Links */}
            <div className="border border-[var(--line)] bg-[#131316] p-6 sm:p-8 space-y-6">
              <h3 className="font-editorial text-2xl text-[var(--ivory)] border-b border-[var(--line)] pb-3">
                04 / Saluran Kontak &amp; Media Sosial
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="label-editorial block mb-2 text-[var(--ivory)]">
                    Email Kontak
                  </label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) =>
                      setSettings({ ...settings, email: e.target.value })
                    }
                    className="w-full min-h-[44px] border border-[var(--line)] bg-[#0A0A0B] px-4 py-2 text-sm text-[var(--ivory)]"
                  />
                </div>
                <div>
                  <label className="label-editorial block mb-2 text-[var(--ivory)]">
                    Nomor WhatsApp (Format +62...)
                  </label>
                  <input
                    type="text"
                    value={settings.whatsapp}
                    onChange={(e) =>
                      setSettings({ ...settings, whatsapp: e.target.value })
                    }
                    className="w-full min-h-[44px] border border-[var(--line)] bg-[#0A0A0B] px-4 py-2 text-sm text-[var(--ivory)]"
                  />
                </div>
                <div>
                  <label className="label-editorial block mb-2 text-[var(--ivory)]">
                    URL Instagram
                  </label>
                  <input
                    type="url"
                    value={settings.instagram}
                    onChange={(e) =>
                      setSettings({ ...settings, instagram: e.target.value })
                    }
                    className="w-full min-h-[44px] border border-[var(--line)] bg-[#0A0A0B] px-4 py-2 text-sm text-[var(--ivory)]"
                  />
                </div>
                <div>
                  <label className="label-editorial block mb-2 text-[var(--ivory)]">
                    URL LinkedIn
                  </label>
                  <input
                    type="url"
                    value={settings.linkedin}
                    onChange={(e) =>
                      setSettings({ ...settings, linkedin: e.target.value })
                    }
                    className="w-full min-h-[44px] border border-[var(--line)] bg-[#0A0A0B] px-4 py-2 text-sm text-[var(--ivory)]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="label-editorial block mb-2 text-[var(--ivory)]">
                    URL Behance
                  </label>
                  <input
                    type="url"
                    value={settings.behance}
                    onChange={(e) =>
                      setSettings({ ...settings, behance: e.target.value })
                    }
                    className="w-full min-h-[44px] border border-[var(--line)] bg-[#0A0A0B] px-4 py-2 text-sm text-[var(--ivory)]"
                  />
                </div>
              </div>
            </div>
          </form>
        )}

        {/* ================================================================
            TAB 4: MESSAGES INBOX
           ================================================================ */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="border-b border-[var(--line)] pb-6">
              <span className="label-editorial text-[var(--brass-light)]">
                Korespondensi Klien
              </span>
              <h2 className="font-editorial text-3xl text-[var(--ivory)]">
                Kotak Masuk Pesan ({messages.length})
              </h2>
            </div>

            {messages.length === 0 ? (
              <div className="border border-[var(--line)] bg-[#131316] p-12 text-center">
                <Mail className="h-8 w-8 text-[var(--brass)] mx-auto mb-3" />
                <p className="font-editorial text-2xl text-[var(--ivory)]">
                  Kotak masuk masih kosong
                </p>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Pesan yang dikirim melalui formulir kontak publik akan muncul
                  di sini secara real-time.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      'border p-6 transition-colors',
                      msg.is_read
                        ? 'border-[var(--line)] bg-[#131316]/60'
                        : 'border-[var(--brass)] bg-[#131316]'
                    )}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--line)] pb-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2.5">
                          {!msg.is_read && (
                            <span className="bg-[var(--brass)] px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold text-[#0A0A0B]">
                              Belum Dibaca
                            </span>
                          )}
                          <h3 className="font-editorial text-2xl text-[var(--ivory)]">
                            {msg.name}
                          </h3>
                        </div>
                        <a
                          href={`mailto:${msg.email}`}
                          className="text-xs text-[var(--brass-light)] hover:underline"
                        >
                          {msg.email}
                        </a>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[var(--muted)]">
                          {new Date(msg.created_at).toLocaleDateString(
                            'id-ID',
                            {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            }
                          )}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleToggleMessageRead(msg)}
                          className="min-h-[38px] border border-[var(--line)] bg-[#0A0A0B] px-3 py-1.5 text-xs text-[var(--ivory)] hover:border-[var(--brass)]"
                        >
                          {msg.is_read
                            ? 'Tandai Belum Dibaca'
                            : 'Tandai Sudah Dibaca'}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setDeleteTarget({
                              kind: 'message',
                              id: msg.id,
                              label: `Pesan dari ${msg.name}`,
                            })
                          }
                          aria-label={`Hapus pesan dari ${msg.name}`}
                          className="inline-flex h-9 w-9 items-center justify-center border border-red-500/40 bg-red-950/20 text-red-300 hover:bg-red-900/40"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-[var(--ivory)]/90 whitespace-pre-line leading-relaxed mb-4">
                      {msg.message}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <a
                        href={`mailto:${msg.email}?subject=${encodeURIComponent(
                          'Re: Diskusi Proyek - Studio Ray Raharja Santoso'
                        )}`}
                        className="inline-flex items-center gap-2 min-h-[40px] border border-[var(--brass)] px-4 py-2 text-xs uppercase tracking-[0.18em] text-[var(--brass-light)] hover:bg-[var(--brass)] hover:text-[#0A0A0B] transition-colors"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        <span>Balas via Email</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ====================================================================
          MODAL: CREATE / EDIT PROJECT
         ==================================================================== */}
      {isEditorOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={projectForm.id ? 'Edit Proyek' : 'Tambah Proyek Baru'}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#0A0A0B]/90 backdrop-blur-md p-4 sm:p-8"
        >
          <div className="w-full max-w-4xl border border-[var(--brass)] bg-[#131316] p-6 sm:p-8 my-6 space-y-6">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
              <div>
                <span className="label-editorial text-[var(--brass-light)]">
                  {projectForm.id ? 'Perbarui Studi Kasus' : 'Karya Baru'}
                </span>
                <h2 className="font-editorial text-3xl text-[var(--ivory)]">
                  {projectForm.id ? projectForm.title : 'Tambah Karya Baru'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center border border-[var(--line)] bg-[#0A0A0B] text-[var(--ivory)] hover:border-[var(--brass)]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="label-editorial block mb-2 text-[var(--ivory)]">
                    Judul Proyek *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        title: e.target.value,
                        slug: projectForm.id
                          ? projectForm.slug
                          : slugify(e.target.value),
                      })
                    }
                    placeholder="Contoh: KALA Roastery - Brand Identity"
                    className="w-full min-h-[44px] border border-[var(--line)] bg-[#0A0A0B] px-3.5 py-2 text-sm text-[var(--ivory)]"
                  />
                </div>

                <div>
                  <label className="label-editorial block mb-2 text-[var(--ivory)]">
                    Slug URL (/karya/[slug])
                  </label>
                  <input
                    type="text"
                    value={projectForm.slug}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        slug: slugify(e.target.value),
                      })
                    }
                    placeholder="kala-roastery-brand-identity"
                    className="w-full min-h-[44px] border border-[var(--line)] bg-[#0A0A0B] px-3.5 py-2 text-sm text-[var(--ivory)]"
                  />
                </div>

                <div>
                  <label className="label-editorial block mb-2 text-[var(--ivory)]">
                    Kategori Disiplin *
                  </label>
                  <select
                    value={projectForm.category}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        category: e.target.value as ProjectCategory,
                      })
                    }
                    className="w-full min-h-[44px] border border-[var(--line)] bg-[#0A0A0B] px-3.5 py-2 text-sm text-[var(--ivory)]"
                  >
                    <option value="Branding">Branding</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="Motion">Motion</option>
                    <option value="Video Editing">Video Editing</option>
                  </select>
                </div>

                <div>
                  <label className="label-editorial block mb-2 text-[var(--ivory)]">
                    Ukuran Kartu di Galeri
                  </label>
                  <select
                    value={projectForm.card_size}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        card_size: e.target.value as CardSize,
                      })
                    }
                    className="w-full min-h-[44px] border border-[var(--line)] bg-[#0A0A0B] px-3.5 py-2 text-sm text-[var(--ivory)]"
                  >
                    <option value="normal">Normal (Masonry Proporsional)</option>
                    <option value="wide">Lebar (Wide Landscape)</option>
                    <option value="tall">Tinggi (Tall / Vertical 9:16)</option>
                    <option value="full">Full-Width Showcase (1 Baris Penuh)</option>
                  </select>
                </div>

                <div>
                  <label className="label-editorial block mb-2 text-[var(--ivory)]">
                    Nama Klien
                  </label>
                  <input
                    type="text"
                    value={projectForm.client}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, client: e.target.value })
                    }
                    placeholder="PT Kala Kopi Nusantara"
                    className="w-full min-h-[44px] border border-[var(--line)] bg-[#0A0A0B] px-3.5 py-2 text-sm text-[var(--ivory)]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label-editorial block mb-2 text-[var(--ivory)]">
                      Tahun
                    </label>
                    <input
                      type="text"
                      value={projectForm.year}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, year: e.target.value })
                      }
                      className="w-full min-h-[44px] border border-[var(--line)] bg-[#0A0A0B] px-3.5 py-2 text-sm text-[var(--ivory)]"
                    />
                  </div>
                  <div>
                    <label className="label-editorial block mb-2 text-[var(--ivory)]">
                      Peran
                    </label>
                    <input
                      type="text"
                      value={projectForm.role}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, role: e.target.value })
                      }
                      className="w-full min-h-[44px] border border-[var(--line)] bg-[#0A0A0B] px-3.5 py-2 text-sm text-[var(--ivory)]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="label-editorial block mb-2 text-[var(--ivory)]">
                  Tools / Perangkat Kerja (Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  value={projectForm.toolsInput}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      toolsInput: e.target.value,
                    })
                  }
                  placeholder="Adobe Illustrator, After Effects, DaVinci Resolve, Figma"
                  className="w-full min-h-[44px] border border-[var(--line)] bg-[#0A0A0B] px-3.5 py-2 text-sm text-[var(--ivory)]"
                />
              </div>

              <div>
                <label className="label-editorial block mb-2 text-[var(--ivory)]">
                  Deskripsi Studi Kasus
                </label>
                <textarea
                  rows={4}
                  value={projectForm.description}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      description: e.target.value,
                    })
                  }
                  placeholder="Jelaskan konteks proyek, tantangan visual, dan solusi desain..."
                  className="w-full border border-[var(--line)] bg-[#0A0A0B] px-3.5 py-2.5 text-sm text-[var(--ivory)]"
                />
              </div>

              {/* Status Checkboxes */}
              <div className="flex flex-wrap items-center gap-6 border-t border-b border-[var(--line)] py-4">
                <label className="inline-flex items-center gap-2.5 cursor-pointer text-xs uppercase tracking-[0.16em] text-[var(--ivory)]">
                  <input
                    type="checkbox"
                    checked={projectForm.published}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        published: e.target.checked,
                      })
                    }
                    className="h-4 w-4 accent-[#B5893B]"
                  />
                  <span>Tayangkan ke Publik (Published)</span>
                </label>

                <label className="inline-flex items-center gap-2.5 cursor-pointer text-xs uppercase tracking-[0.16em] text-[var(--brass-light)]">
                  <input
                    type="checkbox"
                    checked={projectForm.featured}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        featured: e.target.checked,
                      })
                    }
                    className="h-4 w-4 accent-[#B5893B]"
                  />
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Tandai sebagai Karya Unggulan (Featured)</span>
                </label>
              </div>

              {/* Multi-file Drag & Drop Uploader */}
              <MediaUploader
                media={projectForm.media}
                coverUrl={projectForm.cover_url}
                onChange={(nextMedia, nextCover) =>
                  setProjectForm({
                    ...projectForm,
                    media: nextMedia,
                    cover_url: nextCover,
                  })
                }
              />

              <div className="flex items-center justify-end gap-3 border-t border-[var(--line)] pt-5">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="min-h-[46px] border border-[var(--line)] bg-[#0A0A0B] px-6 py-2.5 text-xs uppercase tracking-[0.18em] text-[var(--muted)] hover:text-[var(--ivory)]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={savingProject}
                  className="min-h-[46px] bg-[var(--brass)] px-8 py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-[#0A0A0B] hover:bg-[var(--brass-light)] disabled:opacity-50"
                >
                  {savingProject ? 'Menyimpan...' : 'Simpan Karya'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ====================================================================
          MODAL: DELETE CONFIRMATION
         ==================================================================== */}
      {deleteTarget && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Konfirmasi Penghapusan"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0B]/90 backdrop-blur-sm p-4"
        >
          <div className="w-full max-w-md border border-red-500/50 bg-[#131316] p-6 sm:p-8 space-y-5">
            <h3 className="font-editorial text-2xl text-[var(--ivory)]">
              Konfirmasi Penghapusan
            </h3>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              Apakah Anda yakin ingin menghapus{' '}
              <strong className="text-[var(--ivory)]">
                {deleteTarget.label}
              </strong>
              ? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="min-h-[42px] border border-[var(--line)] bg-[#0A0A0B] px-5 py-2 text-xs uppercase tracking-wider text-[var(--ivory)]"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="min-h-[42px] bg-red-600 px-5 py-2 text-xs uppercase tracking-wider font-medium text-white hover:bg-red-500"
              >
                Ya, Hapus Permanen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
