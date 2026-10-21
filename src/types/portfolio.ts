export type ProjectCategory =
  | 'Branding'
  | 'Graphic Design'
  | 'Motion'
  | 'Video Editing';

export type CardSize = 'normal' | 'wide' | 'tall' | 'full';

export type MediaType = 'image' | 'video' | 'embed';

export interface MediaItem {
  id?: string;
  url: string;
  thumbnail_url?: string;
  embed_url?: string;
  type: MediaType;
  width: number;
  height: number;
  alt: string;
  blurhash: string;
  is_cover?: boolean;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: ProjectCategory;
  year: string;
  client: string;
  role: string;
  tools: string[];
  cover_url: string;
  media: MediaItem[];
  card_size: CardSize;
  featured: boolean;
  order_index: number;
  published: boolean;
  created_at: string;
}

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  summary: string;
}

export interface SiteSettings {
  id?: number;
  hero_title: string;
  hero_subtitle: string;
  available_for_work: boolean;
  about_text: string;
  profile_photo_url: string;
  cv_url: string;
  services: ServiceItem[];
  email: string;
  whatsapp: string;
  instagram: string;
  linkedin: string;
  behance: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}
