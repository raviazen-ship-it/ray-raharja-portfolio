-- ============================================================================
-- MIGRATION 001: RAY RAHARJA SANTOSO PORTFOLIO ("ONYX & BRASS")
-- Database Schema, Row Level Security (RLS), Storage Bucket & Realtime
-- ============================================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- 1. HELPER FUNCTION: CHECK ADMIN EMAIL
-- Ganti 'ray.raharja@studio-onyx.id' dengan ADMIN_EMAIL Anda jika berbeda,
-- atau set melalui: ALTER DATABASE postgres SET app.admin_email = 'email@anda.com';
-- ----------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
as $$
  select
    auth.role() = 'authenticated'
    and lower(coalesce(auth.jwt() ->> 'email', '')) = lower(
      coalesce(
        nullif(current_setting('app.admin_email', true), ''),
        'rayraharja09@gmail.com'
      )
    );
$$;

-- ----------------------------------------------------------------------------
-- 2. TABLE: projects
-- ----------------------------------------------------------------------------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null default '',
  category text not null check (category in ('Branding', 'Graphic Design', 'Motion', 'Video Editing')),
  year text not null default '2026',
  client text not null default '',
  role text not null default '',
  tools text[] not null default '{}',
  cover_url text not null,
  media jsonb[] not null default '{}',
  card_size text not null default 'normal' check (card_size in ('normal', 'wide', 'tall', 'full')),
  featured boolean not null default false,
  order_index integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists idx_projects_published_order
  on public.projects (published, order_index asc, created_at desc);

create index if not exists idx_projects_category
  on public.projects (category);

-- ----------------------------------------------------------------------------
-- 3. TABLE: site_settings (Satu Baris / Singleton Row id = 1)
-- ----------------------------------------------------------------------------
create table if not exists public.site_settings (
  id integer primary key default 1 check (id = 1),
  hero_title text not null,
  hero_subtitle text not null,
  available_for_work boolean not null default true,
  about_text text not null,
  profile_photo_url text not null,
  cv_url text not null default '',
  services jsonb not null default '[]'::jsonb,
  email text not null,
  whatsapp text not null,
  instagram text not null,
  linkedin text not null,
  behance text not null,
  updated_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 4. TABLE: messages (Kotak Masuk dari Form Kontak)
-- ----------------------------------------------------------------------------
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 2 and 120),
  email text not null check (char_length(trim(email)) between 5 and 180),
  message text not null check (char_length(trim(message)) between 10 and 5000),
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_messages_created_at
  on public.messages (is_read asc, created_at desc);

-- ----------------------------------------------------------------------------
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ----------------------------------------------------------------------------
alter table public.projects enable row level security;
alter table public.site_settings enable row level security;
alter table public.messages enable row level security;

-- Policies for projects:
-- Publik hanya boleh SELECT karya yang berstatus published = true
drop policy if exists "Public can view published projects" on public.projects;
create policy "Public can view published projects"
  on public.projects
  for select
  to anon, authenticated
  using (published = true or public.is_admin());

drop policy if exists "Admin can insert projects" on public.projects;
create policy "Admin can insert projects"
  on public.projects
  for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "Admin can update projects" on public.projects;
create policy "Admin can update projects"
  on public.projects
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admin can delete projects" on public.projects;
create policy "Admin can delete projects"
  on public.projects
  for delete
  to authenticated
  using (public.is_admin());

-- Policies for site_settings:
-- Publik boleh SELECT, hanya Admin yang boleh INSERT/UPDATE/DELETE
drop policy if exists "Public can view site_settings" on public.site_settings;
create policy "Public can view site_settings"
  on public.site_settings
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Admin can insert site_settings" on public.site_settings;
create policy "Admin can insert site_settings"
  on public.site_settings
  for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "Admin can update site_settings" on public.site_settings;
create policy "Admin can update site_settings"
  on public.site_settings
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admin can delete site_settings" on public.site_settings;
create policy "Admin can delete site_settings"
  on public.site_settings
  for delete
  to authenticated
  using (public.is_admin());

-- Policies for messages:
-- Publik boleh mengirim pesan (INSERT), hanya Admin yang boleh SELECT/UPDATE/DELETE
drop policy if exists "Public can submit contact messages" on public.messages;
create policy "Public can submit contact messages"
  on public.messages
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Admin can read messages" on public.messages;
create policy "Admin can read messages"
  on public.messages
  for select
  to authenticated
  using (public.is_admin());

drop policy if exists "Admin can update messages" on public.messages;
create policy "Admin can update messages"
  on public.messages
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admin can delete messages" on public.messages;
create policy "Admin can delete messages"
  on public.messages
  for delete
  to authenticated
  using (public.is_admin());

-- ----------------------------------------------------------------------------
-- 6. STORAGE BUCKET & STORAGE RLS POLICIES ('portfolio-media')
-- ----------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'portfolio-media',
  'portfolio-media',
  true,
  52428800, -- 50 MB max
  array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/avif',
    'video/mp4',
    'video/webm',
    'application/pdf'
  ]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can read portfolio-media" on storage.objects;
create policy "Public can read portfolio-media"
  on storage.objects
  for select
  to public
  using (bucket_id = 'portfolio-media');

drop policy if exists "Admin can upload portfolio-media" on storage.objects;
create policy "Admin can upload portfolio-media"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'portfolio-media' and public.is_admin());

drop policy if exists "Admin can update portfolio-media" on storage.objects;
create policy "Admin can update portfolio-media"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'portfolio-media' and public.is_admin())
  with check (bucket_id = 'portfolio-media' and public.is_admin());

drop policy if exists "Admin can delete portfolio-media" on storage.objects;
create policy "Admin can delete portfolio-media"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'portfolio-media' and public.is_admin());

-- ----------------------------------------------------------------------------
-- 7. SUPABASE REALTIME PUBLICATION
-- ----------------------------------------------------------------------------
alter publication supabase_realtime add table public.projects;
alter publication supabase_realtime add table public.site_settings;
alter publication supabase_realtime add table public.messages;
