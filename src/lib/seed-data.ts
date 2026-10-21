import {
  Project,
  SiteSettings,
  ContactMessage,
  ExperienceItem,
} from '@/types/portfolio';

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  id: 1,
  hero_title: 'Ray Raharja Santoso',
  hero_subtitle:
    'Merancang identitas merek berkarakter, sistem komunikasi visual editorial, motion graphics, dan penyuntingan film komersial dengan ketenangan serta presisi kelas studio.',
  available_for_work: true,
  about_text:
    'Saya adalah Graphic & Brand Designer sekaligus Motion Designer dan Video Editor yang berbasis di Jakarta dengan pengalaman lebih dari 7 tahun menangani klien korporasi, perhotelan mewah, gaya hidup, hingga institusi budaya.\n\nPendekatan kerja saya memadukan ketajaman tipografi editorial dengan dinamika gambar bergerak. Bagi saya, sebuah merek tidak hanya hidup dalam logo statis di atas kertas—melainkan juga dalam bagaimana ia bergerak, terdengar, dan bercerita di layar digital.',
  profile_photo_url:
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85',
  cv_url: '/cv-ray-raharja-santoso.pdf',
  services: [
    {
      id: 'svc-branding',
      index: '01',
      title: 'Brand Identity',
      subtitle: 'Arsitektur & Sistem Identitas Merek',
      description:
        'Perancangan sistem identitas menyeluruh mulai dari riset posisi merek, arahan seni, sistem tipografi, palet warna, desain kemasan, hingga buku panduan merek (brand guidelines).',
      deliverables: [
        'Strategi & Arahan Visual',
        'Logo & Sistem Monogram',
        'Tipografi & Warna',
        'Desain Kemasan',
        'Brand Guidelines',
      ],
    },
    {
      id: 'svc-graphic',
      index: '02',
      title: 'Graphic Design',
      subtitle: 'Editorial, Publikasi & Komunikasi Visual',
      description:
        'Desain publikasi cetak maupun digital dengan kepekaan tata letak majalah seni, laporan tahunan, materi kampanye terpadu, hingga sistem penunjuk arah (environmental graphics).',
      deliverables: [
        'Desain Editorial & Buku',
        'Key Visual Kampanye',
        'Sistem Grid & Layout',
        'Desain Pameran & Cetak',
        'Aset Digital Sosial',
      ],
    },
    {
      id: 'svc-motion',
      index: '03',
      title: 'Motion Graphics',
      subtitle: 'Identitas Gerak & Eksplorasi 2D/3D',
      description:
        'Menghidupkan sistem identitas melalui animasi logo, tipografi kinetik, bumper acara, dan visual 2D/3D berirama presisi untuk berbagai format layar.',
      deliverables: [
        'Motion Identity System',
        'Kinetic Typography',
        'Title Sequence & Bumper',
        '3D Product Loop',
        'Reels & Vertical Motion',
      ],
    },
    {
      id: 'svc-video',
      index: '04',
      title: 'Video Editing',
      subtitle: 'Penyuntingan Narasi, Komersial & Color Grading',
      description:
        'Penyuntingan film merek, iklan komersial, dokumenter pendek, dan fashion reel dengan penataan ritme cerita, tata suara imersif, dan color grading sinematik.',
      deliverables: [
        'Offline & Online Editing',
        'Commercial & Brand Film',
        'Color Grading Sinematik',
        'Sound Design & Mixing',
        'Format Multi-Platform',
      ],
    },
  ],
  email: 'ray.raharja@studio-onyx.id',
  whatsapp: '+6281298765432',
  instagram: 'https://instagram.com/rayraharja.studio',
  linkedin: 'https://linkedin.com/in/ray-raharja-santoso',
  behance: 'https://behance.net/rayraharjasantoso',
};

export const SEED_EXPERIENCES: ExperienceItem[] = [
  {
    period: '2023 — Sekarang',
    role: 'Independent Art Director, Brand & Motion Designer',
    company: 'Studio Ray Raharja',
    location: 'Jakarta, ID',
    summary:
      'Memimpin proyek identitas merek, sistem publikasi editorial, dan kampanye film komersial untuk klien perhotelan, F&B premium, dan gaya hidup di Asia Tenggara.',
  },
  {
    period: '2021 — 2023',
    role: 'Senior Brand & Motion Designer',
    company: 'Atelier Kinetik Collective',
    location: 'Jakarta & Singapura',
    summary:
      'Merancang sistem identitas gerak (motion identity), kemasan ritel, dan arahan visual kampanye peluncuran produk lintas platform.',
  },
  {
    period: '2019 — 2021',
    role: 'Graphic Designer & Video Editor',
    company: 'Monogram Design Bureau',
    location: 'Bandung & Jakarta',
    summary:
      'Menangani desain buku monografi, materi pameran seni, serta penyuntingan video dokumenter dan profil merek.',
  },
];

export const SEED_SKILLS: string[] = [
  'Brand Identity Architecture',
  'Editorial & Book Design',
  'Packaging & Print Craft',
  'Art Direction',
  '2D/3D Motion Graphics',
  'Kinetic Typography',
  'Commercial Video Editing',
  'Color Grading & Look Dev',
];

export const SEED_TOOLS: string[] = [
  'Adobe Illustrator',
  'Adobe InDesign',
  'Adobe Photoshop',
  'After Effects',
  'Premiere Pro',
  'DaVinci Resolve Studio',
  'Cinema 4D / Redshift',
  'Figma',
];

export const SEED_PROJECTS: Project[] = [
  {
    id: '11111111-1111-4111-8111-111111111101',
    title: 'KALA Roastery & Reserve — Identitas & Kemasan',
    slug: 'kala-roastery-reserve',
    description:
      'Peremajaan total identitas visual dan arsitektur kemasan untuk KALA Roastery & Reserve, rumah sangrai kopi spesialti yang mengangkat hasil panen mikro dari dataran tinggi Nusantara.\n\nSistem desain menggabungkan tekstur kertas berpori gelap dengan sentuhan foil kuningan hangat, tipografi serif klasik yang dipadukan dengan label teknis ala laboratorium botani untuk menonjolkan catatan rasa, ketinggian tanam, dan metode pascapanen.',
    category: 'Branding',
    year: '2026',
    client: 'PT Kala Kopi Nusantara',
    role: 'Lead Brand & Packaging Designer',
    tools: ['Adobe Illustrator', 'Adobe InDesign', 'Blender 3D', 'Figma'],
    cover_url:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1600&q=85',
    media: [
      {
        id: 'm-101',
        url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1600&q=85',
        type: 'image',
        width: 1600,
        height: 1000,
        alt: 'Kemasan utama KALA Roastery dengan aksen foil kuningan di atas meja batu hitam',
        blurhash: 'L10A0B241E14',
        is_cover: true,
      },
      {
        id: 'm-102',
        url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=85',
        type: 'image',
        width: 1400,
        height: 1050,
        alt: 'Eksplorasi sistem tipografi dan label varian biji kopi tunggal',
        blurhash: 'L10A0B241E14',
      },
      {
        id: 'm-103',
        url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=85',
        type: 'image',
        width: 1600,
        height: 900,
        alt: 'Suasana interior flagship bar KALA Reserve di Senopati',
        blurhash: 'L10A0B241E14',
      },
    ],
    card_size: 'wide',
    featured: true,
    order_index: 1,
    published: true,
    created_at: '2026-02-15T10:00:00.000Z',
  },
  {
    id: '11111111-1111-4111-8111-111111111102',
    title: 'Sovereign Watch Co. — Horology Vertical Anthology',
    slug: 'sovereign-watch-horology-motion',
    description:
      'Kampanye film vertikal (9:16) dan sistem identitas gerak untuk peluncuran koleksi jam tangan mekanis edisi terbatas Sovereign Watch Co.\n\nFokus utama proyek ini adalah menerjemahkan presisi roda gigi mikroskopis dan pantulan logam mulia ke dalam sekuens animasi 3D dan tipografi kinetik yang menghipnotis di layar mobile tanpa kehilangan wibawa merek mewah.',
    category: 'Motion',
    year: '2026',
    client: 'Sovereign Horology Geneva / Jakarta',
    role: 'Motion Director & 3D Generalist',
    tools: ['Cinema 4D', 'Redshift', 'After Effects', 'DaVinci Resolve'],
    cover_url:
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1080&q=85',
    media: [
      {
        id: 'm-201',
        url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1080&q=85',
        type: 'image',
        width: 1080,
        height: 1920,
        alt: 'Frame vertikal 9:16 untuk kampanye Sovereign Watch Co.',
        blurhash: 'L10A0B241E14',
        is_cover: true,
      },
      {
        id: 'm-202',
        url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=85',
        type: 'image',
        width: 1400,
        height: 1000,
        alt: 'Studi pencahayaan makro pada dial dan bezel jam tangan',
        blurhash: 'L10A0B241E14',
      },
    ],
    card_size: 'tall',
    featured: true,
    order_index: 2,
    published: true,
    created_at: '2026-02-10T10:00:00.000Z',
  },
  {
    id: '11111111-1111-4111-8111-111111111103',
    title: 'Arsip Nusantara — Monografi Desain & Kriya',
    slug: 'arsip-nusantara-monograph',
    description:
      'Perancangan editorial buku meja (coffee table monograph) setebal 320 halaman yang mendokumentasikan 50 karya tekstil, logam, dan arsitektur vernakular Indonesia.\n\nMenggunakan sistem grid 12 kolom Swiss yang ketat dengan perpaduan serif layar klasik dan indeks marginalia bernomor presisi.',
    category: 'Graphic Design',
    year: '2025',
    client: 'Yayasan Warisan Visual Indonesia',
    role: 'Editorial Art Director',
    tools: ['Adobe InDesign', 'Adobe Photoshop', 'Figma'],
    cover_url:
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=85',
    media: [
      {
        id: 'm-301',
        url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=85',
        type: 'image',
        width: 1200,
        height: 1500,
        alt: 'Sampul linen hitam berembos foil emas Arsip Nusantara',
        blurhash: 'L10A0B241E14',
        is_cover: true,
      },
      {
        id: 'm-302',
        url: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1600&q=85',
        type: 'image',
        width: 1600,
        height: 1067,
        alt: 'Halaman bentang dalam dengan tata letak tipografi dua bahasa',
        blurhash: 'L10A0B241E14',
      },
    ],
    card_size: 'normal',
    featured: true,
    order_index: 3,
    published: true,
    created_at: '2025-11-20T10:00:00.000Z',
  },
  {
    id: '11111111-1111-4111-8111-111111111104',
    title: 'SENJA Gastronomy — Sistem Identitas Kuliner',
    slug: 'senja-gastronomy-identity',
    description:
      'Perancangan identitas merek untuk restoran fine-dining kontemporer di Bali yang menyajikan menu degustasi berbasis bahan bakar kayu bakar dan fermentasi lokal.\n\nMencakup desain monogram kustom, buku menu kulit, kartu anggur bernomor seri, hingga perlengkapan meja berukir.',
    category: 'Branding',
    year: '2025',
    client: 'Senja Hospitality Group',
    role: 'Brand Identity Designer',
    tools: ['Adobe Illustrator', 'Adobe InDesign', 'Adobe Dimension'],
    cover_url:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85',
    media: [
      {
        id: 'm-401',
        url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85',
        type: 'image',
        width: 1200,
        height: 1200,
        alt: 'Suasana ruang makan malam SENJA Gastronomy dengan pencahayaan temaram hangat',
        blurhash: 'L10A0B241E14',
        is_cover: true,
      },
      {
        id: 'm-402',
        url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=85',
        type: 'image',
        width: 1400,
        height: 1050,
        alt: 'Detail cetakan menu degustasi di atas kertas katun 350gsm',
        blurhash: 'L10A0B241E14',
      },
    ],
    card_size: 'normal',
    featured: true,
    order_index: 4,
    published: true,
    created_at: '2025-09-12T10:00:00.000Z',
  },
  {
    id: '11111111-1111-4111-8111-111111111105',
    title: 'Aether Botanical Parfum — Director’s Cut Campaign',
    slug: 'aether-parfum-campaign-film',
    description:
      'Penyuntingan film komersial berdurasi 90 detik dan penataan warna (color grading) untuk peluncuran parfum uniseks Aether Botanical.\n\nMenonjolkan kontras bayangan pekat dengan kilau kaca amber, dipadukan dengan pemotongan ritmis mengikuti komposisi cello analog.',
    category: 'Video Editing',
    year: '2026',
    client: 'Aether Lab Paris / Singapura',
    role: 'Lead Offline/Online Editor & Colorist',
    tools: ['DaVinci Resolve Studio', 'Premiere Pro', 'After Effects', 'Audition'],
    cover_url:
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1600&q=85',
    media: [
      {
        id: 'm-501',
        url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1600&q=85',
        type: 'image',
        width: 1600,
        height: 900,
        alt: 'Stills sinematik botol parfum Aether di atas permukaan air gelap',
        blurhash: 'L10A0B241E14',
        is_cover: true,
      },
      {
        id: 'm-502',
        url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1400&q=85',
        type: 'image',
        width: 1400,
        height: 933,
        alt: 'Proses color grading dengan tone hangat keemasan',
        blurhash: 'L10A0B241E14',
      },
    ],
    card_size: 'wide',
    featured: true,
    order_index: 5,
    published: true,
    created_at: '2026-01-18T10:00:00.000Z',
  },
  {
    id: '11111111-1111-4111-8111-111111111106',
    title: 'Monolith Architecture Biennial 2026 — Sistem Visual Pameran',
    slug: 'monolith-architecture-biennial-2026',
    description:
      'Identitas pameran berskala penuh, desain katalog, motion wall instalasi, dan sistem penunjuk arah (wayfinding) untuk pameran arsitektur brutalism dan tropis modern di Asia Tenggara.',
    category: 'Graphic Design',
    year: '2026',
    client: 'Monolith Architectural Forum',
    role: 'Visual System & Exhibition Designer',
    tools: ['Adobe InDesign', 'Illustrator', 'After Effects', 'Figma'],
    cover_url:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1800&q=85',
    media: [
      {
        id: 'm-601',
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1800&q=85',
        type: 'image',
        width: 1890,
        height: 810,
        alt: 'Instalasi spanduk arsitektural Monolith Biennial',
        blurhash: 'L10A0B241E14',
        is_cover: true,
      },
      {
        id: 'm-602',
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
        type: 'image',
        width: 1600,
        height: 1066,
        alt: 'Perspektif fasad gedung pameran dan elemen grafis',
        blurhash: 'L10A0B241E14',
      },
    ],
    card_size: 'full',
    featured: true,
    order_index: 6,
    published: true,
    created_at: '2026-02-01T10:00:00.000Z',
  },
];

export const SEED_MESSAGES: ContactMessage[] = [
  {
    id: '22222222-2222-4222-8222-222222222201',
    name: 'Nadia Pramesti — Creative Lead, Kemang Sovereign Hotel',
    email: 'nadia.pramesti@kemangsovereign.id',
    message:
      'Halo Ray, kami sangat tertarik dengan pendekatan editorial pada proyek KALA Roastery dan SENJA. Kami sedang merencanakan rebranding untuk boutique hotel kami di Jakarta Selatan pada kuartal depan dan ingin menjadwalkan diskusi awal.',
    is_read: false,
    created_at: '2026-03-01T09:30:00.000Z',
  },
];
