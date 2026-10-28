import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  Project,
  SiteSettings,
  ContactMessage,
  MediaItem,
} from '@/types/portfolio';
import {
  SEED_PROJECTS,
  DEFAULT_SITE_SETTINGS,
  SEED_MESSAGES,
} from '@/lib/seed-data';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import {
  createSupabaseServerClient,
  createSupabaseServiceClient,
} from '@/lib/supabase/server';
import { slugify } from '@/lib/utils';

interface LocalStore {
  version?: string;
  projects: Project[];
  site_settings: SiteSettings;
  messages: ContactMessage[];
}

const STORE_VERSION = '2026-10-28-integrated-portfolio-v2';
const DATA_DIR = path.join(process.cwd(), '.data');
const DB_FILE = path.join(DATA_DIR, 'local-db.json');

function readLocalStore(): LocalStore {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      const initial: LocalStore = {
        version: STORE_VERSION,
        projects: SEED_PROJECTS,
        site_settings: DEFAULT_SITE_SETTINGS,
        messages: SEED_MESSAGES,
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw) as Partial<LocalStore>;
    if (parsed.version !== STORE_VERSION) {
      const preservedMessages = Array.isArray(parsed.messages)
        ? parsed.messages.filter(
            (m) => m && m.id !== '22222222-2222-4222-8222-222222222201'
          )
        : SEED_MESSAGES;
      const upgraded: LocalStore = {
        version: STORE_VERSION,
        projects: SEED_PROJECTS,
        site_settings: DEFAULT_SITE_SETTINGS,
        messages: preservedMessages,
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(upgraded, null, 2), 'utf-8');
      return upgraded;
    }
    return {
      version: STORE_VERSION,
      projects: Array.isArray(parsed.projects) ? parsed.projects : SEED_PROJECTS,
      site_settings: parsed.site_settings || DEFAULT_SITE_SETTINGS,
      messages: Array.isArray(parsed.messages) ? parsed.messages : SEED_MESSAGES,
    };
  } catch {
    return {
      version: STORE_VERSION,
      projects: SEED_PROJECTS,
      site_settings: DEFAULT_SITE_SETTINGS,
      messages: SEED_MESSAGES,
    };
  }
}

function writeLocalStore(store: LocalStore): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(
      DB_FILE,
      JSON.stringify({ ...store, version: STORE_VERSION }, null, 2),
      'utf-8'
    );
    return true;
  } catch (err) {
    console.error('Failed to write local store:', err);
    return false;
  }
}

function normalizeMediaArray(rawMedia: unknown, fallbackCover: string): MediaItem[] {
  if (!Array.isArray(rawMedia) || rawMedia.length === 0) {
    return [
      {
        id: 'cover-default',
        url: fallbackCover,
        type: 'image',
        width: 1600,
        height: 1000,
        alt: 'Visual Karya Ray Raharja Santoso',
        blurhash: 'L10A0B241E14',
        is_cover: true,
      },
    ];
  }

  return rawMedia.map((item, idx) => {
    const obj = typeof item === 'string' ? JSON.parse(item) : item || {};
    return {
      id: obj.id || `media-${idx}`,
      url: obj.url || fallbackCover,
      thumbnail_url: obj.thumbnail_url || obj.url || fallbackCover,
      embed_url: obj.embed_url || undefined,
      type: obj.type === 'video' || obj.type === 'embed' ? obj.type : 'image',
      width: Number(obj.width) > 0 ? Number(obj.width) : 1600,
      height: Number(obj.height) > 0 ? Number(obj.height) : 1000,
      alt:
        typeof obj.alt === 'string' && obj.alt.trim().length > 0
          ? obj.alt.replace(/\s*\u2014\s*/g, ' - ')
          : 'Dokumentasi Karya Ray Raharja Santoso',
      blurhash: obj.blurhash || 'L10A0B241E14',
      is_cover: Boolean(obj.is_cover),
    };
  });
}

function normalizeProject(row: any): Project {
  const coverUrl =
    row.cover_url ||
    '/works/heyxi-key-visual.jpg';

  return {
    id: String(row.id),
    title: String(row.title || 'Proyek Tanpa Judul').replace(/\s*\u2014\s*/g, ' - '),
    slug: String(row.slug || slugify(row.title || 'proyek')),
    description: String(row.description || '').replace(/\u2014/g, '-'),
    category:
      row.category === 'Branding' ||
      row.category === 'Graphic Design' ||
      row.category === 'Motion' ||
      row.category === 'Video Editing'
        ? row.category
        : 'Branding',
    year: String(row.year || '2026'),
    client: String(row.client || 'Klien Studio').replace(/\s*\u2014\s*/g, ' - '),
    role: String(row.role || 'Art Director & Designer').replace(/\s*\u2014\s*/g, ' - '),
    tools: Array.isArray(row.tools)
      ? row.tools.map(String)
      : typeof row.tools === 'string'
        ? row.tools
            .split(',')
            .map((s: string) => s.trim())
            .filter(Boolean)
        : [],
    cover_url: coverUrl,
    media: normalizeMediaArray(row.media, coverUrl),
    card_size:
      row.card_size === 'wide' ||
      row.card_size === 'tall' ||
      row.card_size === 'full'
        ? row.card_size
        : 'normal',
    featured: Boolean(row.featured),
    order_index: Number.isFinite(Number(row.order_index))
      ? Number(row.order_index)
      : 0,
    published: row.published !== undefined ? Boolean(row.published) : true,
    created_at: row.created_at || new Date().toISOString(),
  };
}

// ============================================================================
// PROJECTS REPOSITORY
// ============================================================================

export async function getPublishedProjects(): Promise<Project[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createSupabaseServerClient();
      if (supabase) {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('published', true)
          .order('order_index', { ascending: true })
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          return data.map(normalizeProject);
        }
      }
    } catch (e) {
      console.error('Supabase getPublishedProjects fallback:', e);
    }
  }

  const store = readLocalStore();
  return store.projects
    .filter((p) => p.published)
    .sort((a, b) => a.order_index - b.order_index)
    .map(normalizeProject);
}

export async function getAllProjectsAdmin(): Promise<Project[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createSupabaseServiceClient();
      if (supabase) {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('order_index', { ascending: true })
          .order('created_at', { ascending: false });

        if (!error && data) {
          return data.map(normalizeProject);
        }
      }
    } catch (e) {
      console.error('Supabase getAllProjectsAdmin fallback:', e);
    }
  }

  const store = readLocalStore();
  return [...store.projects]
    .sort((a, b) => a.order_index - b.order_index)
    .map(normalizeProject);
}

export async function getProjectBySlug(
  slug: string,
  includeDraft = false
): Promise<Project | null> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = includeDraft
        ? createSupabaseServiceClient()
        : createSupabaseServerClient();
      if (supabase) {
        let query = supabase.from('projects').select('*').eq('slug', slug);
        if (!includeDraft) {
          query = query.eq('published', true);
        }
        const { data, error } = await query.maybeSingle();
        if (!error && data) {
          return normalizeProject(data);
        }
      }
    } catch (e) {
      console.error('Supabase getProjectBySlug fallback:', e);
    }
  }

  const store = readLocalStore();
  const found = store.projects.find(
    (p) => p.slug === slug && (includeDraft || p.published)
  );
  return found ? normalizeProject(found) : null;
}

export async function getNextProject(
  currentSlug: string
): Promise<Project | null> {
  const published = await getPublishedProjects();
  if (published.length <= 1) return null;
  const idx = published.findIndex((p) => p.slug === currentSlug);
  if (idx === -1) return published[0];
  return published[(idx + 1) % published.length];
}

export async function saveProjectAdmin(
  payload: Partial<Project> & { title: string }
): Promise<Project> {
  const store = readLocalStore();
  const isUpdate = Boolean(payload.id);
  const existing = isUpdate
    ? store.projects.find((p) => p.id === payload.id)
    : undefined;

  const baseSlug = slugify(payload.slug || payload.title || 'karya-baru');
  // Ensure slug uniqueness
  let uniqueSlug = baseSlug || `karya-${Date.now()}`;
  const slugConflict = store.projects.some(
    (p) => p.slug === uniqueSlug && p.id !== payload.id
  );
  if (slugConflict) {
    uniqueSlug = `${uniqueSlug}-${Math.floor(100 + Math.random() * 900)}`;
  }

  const mediaList = normalizeMediaArray(
    payload.media ?? existing?.media ?? [],
    payload.cover_url ||
      existing?.cover_url ||
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1600&q=85'
  );

  const chosenCover =
    payload.cover_url ||
    mediaList.find((m) => m.is_cover)?.url ||
    mediaList[0]?.url ||
    existing?.cover_url ||
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1600&q=85';

  const nextOrderIndex =
    payload.order_index !== undefined
      ? Number(payload.order_index)
      : existing?.order_index !== undefined
        ? existing.order_index
        : store.projects.length + 1;

  const projectRecord: Project = normalizeProject({
    id: payload.id || existing?.id || crypto.randomUUID(),
    title: payload.title.trim(),
    slug: uniqueSlug,
    description: payload.description ?? existing?.description ?? '',
    category: payload.category ?? existing?.category ?? 'Branding',
    year: payload.year ?? existing?.year ?? String(new Date().getFullYear()),
    client: payload.client ?? existing?.client ?? '',
    role: payload.role ?? existing?.role ?? 'Brand & Graphic Designer',
    tools: payload.tools ?? existing?.tools ?? [],
    cover_url: chosenCover,
    media: mediaList,
    card_size: payload.card_size ?? existing?.card_size ?? 'normal',
    featured:
      payload.featured !== undefined
        ? Boolean(payload.featured)
        : existing?.featured ?? false,
    order_index: nextOrderIndex,
    published:
      payload.published !== undefined
        ? Boolean(payload.published)
        : existing?.published ?? true,
    created_at: existing?.created_at || new Date().toISOString(),
  });

  if (isSupabaseConfigured()) {
    try {
      const supabase = createSupabaseServiceClient();
      if (supabase) {
        const dbRow = {
          id: projectRecord.id,
          title: projectRecord.title,
          slug: projectRecord.slug,
          description: projectRecord.description,
          category: projectRecord.category,
          year: projectRecord.year,
          client: projectRecord.client,
          role: projectRecord.role,
          tools: projectRecord.tools,
          cover_url: projectRecord.cover_url,
          media: projectRecord.media,
          card_size: projectRecord.card_size,
          featured: projectRecord.featured,
          order_index: projectRecord.order_index,
          published: projectRecord.published,
        };

        const { data, error } = await supabase
          .from('projects')
          .upsert(dbRow, { onConflict: 'id' })
          .select('*')
          .single();

        if (!error && data) {
          // Sync local store as well
          const idx = store.projects.findIndex((p) => p.id === projectRecord.id);
          if (idx >= 0) {
            store.projects[idx] = normalizeProject(data);
          } else {
            store.projects.push(normalizeProject(data));
          }
          writeLocalStore(store);
          return normalizeProject(data);
        }
      }
    } catch (e) {
      console.error('Supabase saveProjectAdmin fallback:', e);
    }
  }

  const idx = store.projects.findIndex((p) => p.id === projectRecord.id);
  if (idx >= 0) {
    store.projects[idx] = projectRecord;
  } else {
    store.projects.push(projectRecord);
  }
  writeLocalStore(store);
  return projectRecord;
}

export async function deleteProjectAdmin(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createSupabaseServiceClient();
      if (supabase) {
        await supabase.from('projects').delete().eq('id', id);
      }
    } catch (e) {
      console.error('Supabase deleteProjectAdmin fallback:', e);
    }
  }

  const store = readLocalStore();
  const before = store.projects.length;
  store.projects = store.projects.filter((p) => p.id !== id);
  writeLocalStore(store);
  return store.projects.length < before;
}

export async function reorderProjectsAdmin(
  orderedIds: string[]
): Promise<Project[]> {
  const store = readLocalStore();
  const idToOrder = new Map<string, number>();
  orderedIds.forEach((id, idx) => idToOrder.set(id, idx + 1));

  store.projects = store.projects.map((proj) => ({
    ...proj,
    order_index: idToOrder.get(proj.id) ?? proj.order_index,
  }));
  store.projects.sort((a, b) => a.order_index - b.order_index);
  writeLocalStore(store);

  if (isSupabaseConfigured()) {
    try {
      const supabase = createSupabaseServiceClient();
      if (supabase) {
        await Promise.all(
          orderedIds.map((id, idx) =>
            supabase
              .from('projects')
              .update({ order_index: idx + 1 })
              .eq('id', id)
          )
        );
      }
    } catch (e) {
      console.error('Supabase reorderProjectsAdmin fallback:', e);
    }
  }

  return store.projects;
}

// ============================================================================
// SITE SETTINGS REPOSITORY
// ============================================================================

export async function getSiteSettings(): Promise<SiteSettings> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createSupabaseServerClient();
      if (supabase) {
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .eq('id', 1)
          .maybeSingle();

        if (!error && data) {
          const hasIntegratedServices =
            Array.isArray(data.services) &&
            data.services.some((s: any) => s?.id === 'svc-web');
          const hasIntegratedAbout =
            typeof data.about_text === 'string' &&
            data.about_text.includes('Web & Digital Products');
          const hasIntegratedHero =
            typeof data.hero_subtitle === 'string' &&
            data.hero_subtitle.toLowerCase().includes('web');

          return {
            ...DEFAULT_SITE_SETTINGS,
            ...data,
            hero_title: String(
              data.hero_title || DEFAULT_SITE_SETTINGS.hero_title
            ).replace(/\u2014/g, '-'),
            hero_subtitle: hasIntegratedHero
              ? String(data.hero_subtitle).replace(/\u2014/g, '-')
              : DEFAULT_SITE_SETTINGS.hero_subtitle,
            about_text: hasIntegratedAbout
              ? String(data.about_text).replace(/\u2014/g, '-')
              : DEFAULT_SITE_SETTINGS.about_text,
            services: hasIntegratedServices
              ? data.services
              : DEFAULT_SITE_SETTINGS.services,
          };
        }
      }
    } catch (e) {
      console.error('Supabase getSiteSettings fallback:', e);
    }
  }

  const store = readLocalStore();
  return {
    ...DEFAULT_SITE_SETTINGS,
    ...store.site_settings,
    services: Array.isArray(store.site_settings?.services)
      ? store.site_settings.services
      : DEFAULT_SITE_SETTINGS.services,
  };
}

export async function updateSiteSettingsAdmin(
  patch: Partial<SiteSettings>
): Promise<SiteSettings> {
  const store = readLocalStore();
  const updated: SiteSettings = {
    ...DEFAULT_SITE_SETTINGS,
    ...store.site_settings,
    ...patch,
    id: 1,
    services: Array.isArray(patch.services)
      ? patch.services
      : store.site_settings.services || DEFAULT_SITE_SETTINGS.services,
  };

  store.site_settings = updated;
  writeLocalStore(store);

  if (isSupabaseConfigured()) {
    try {
      const supabase = createSupabaseServiceClient();
      if (supabase) {
        await supabase.from('site_settings').upsert(
          {
            id: 1,
            hero_title: updated.hero_title,
            hero_subtitle: updated.hero_subtitle,
            available_for_work: updated.available_for_work,
            about_text: updated.about_text,
            profile_photo_url: updated.profile_photo_url,
            cv_url: updated.cv_url,
            services: updated.services,
            email: updated.email,
            whatsapp: updated.whatsapp,
            instagram: updated.instagram,
            linkedin: updated.linkedin,
            behance: updated.behance,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'id' }
        );
      }
    } catch (e) {
      console.error('Supabase updateSiteSettingsAdmin fallback:', e);
    }
  }

  return updated;
}

// ============================================================================
// CONTACT MESSAGES REPOSITORY
// ============================================================================

export async function getMessagesAdmin(): Promise<ContactMessage[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createSupabaseServiceClient();
      if (supabase) {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data) {
          return data as ContactMessage[];
        }
      }
    } catch (e) {
      console.error('Supabase getMessagesAdmin fallback:', e);
    }
  }

  const store = readLocalStore();
  return [...store.messages].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export interface CreateContactMessageResult {
  persisted: boolean;
  storage: 'supabase' | 'local' | 'none';
  message: ContactMessage;
}

export async function createContactMessage(input: {
  name: string;
  email: string;
  message: string;
}): Promise<CreateContactMessageResult> {
  const newMsg: ContactMessage = {
    id: crypto.randomUUID(),
    name: input.name.trim(),
    email: input.email.trim(),
    message: input.message.trim(),
    is_read: false,
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured()) {
    try {
      const supabase = createSupabaseServerClient();
      if (supabase) {
        const { data, error } = await supabase
          .from('messages')
          .insert({
            name: newMsg.name,
            email: newMsg.email,
            message: newMsg.message,
          })
          .select('*')
          .single();

        if (!error && data) {
          const store = readLocalStore();
          store.messages.unshift(data as ContactMessage);
          writeLocalStore(store);
          return {
            persisted: true,
            storage: 'supabase',
            message: data as ContactMessage,
          };
        }
      }
    } catch (e) {
      console.error('Supabase createContactMessage fallback:', e);
    }
  }

  // On Vercel serverless without Supabase, local disk is ephemeral/read-only.
  if (process.env.VERCEL === '1' && !isSupabaseConfigured()) {
    return {
      persisted: false,
      storage: 'none',
      message: newMsg,
    };
  }

  const store = readLocalStore();
  store.messages.unshift(newMsg);
  const wrote = writeLocalStore(store);
  return {
    persisted: wrote,
    storage: wrote ? 'local' : 'none',
    message: newMsg,
  };
}

export async function updateMessageReadAdmin(
  id: string,
  is_read: boolean
): Promise<ContactMessage | null> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createSupabaseServiceClient();
      if (supabase) {
        await supabase.from('messages').update({ is_read }).eq('id', id);
      }
    } catch (e) {
      console.error('Supabase updateMessageReadAdmin fallback:', e);
    }
  }

  const store = readLocalStore();
  const idx = store.messages.findIndex((m) => m.id === id);
  if (idx === -1) return null;
  store.messages[idx].is_read = is_read;
  writeLocalStore(store);
  return store.messages[idx];
}

export async function deleteMessageAdmin(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createSupabaseServiceClient();
      if (supabase) {
        await supabase.from('messages').delete().eq('id', id);
      }
    } catch (e) {
      console.error('Supabase deleteMessageAdmin fallback:', e);
    }
  }

  const store = readLocalStore();
  const before = store.messages.length;
  store.messages = store.messages.filter((m) => m.id !== id);
  writeLocalStore(store);
  return store.messages.length < before;
}
