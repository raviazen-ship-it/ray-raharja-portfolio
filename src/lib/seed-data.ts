import {
  Project,
  SiteSettings,
  ContactMessage,
  ExperienceItem,
} from '@/types/portfolio';

export interface CredentialItem {
  title: string;
  issuer: string;
  period: string;
  highlight: string;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  id: 1,
  hero_title: 'Ray Raharja Santoso',
  hero_subtitle:
    'Graphic & Brand Designer yang menjembatani ketajaman konsep visual e-commerce, kampanye merek, dan motion graphics dengan presisi eksekusi produksi cetak akhir.',
  available_for_work: true,
  about_text:
    'Saya adalah Graphic & Brand Designer berbasis di Jakarta Utara dengan keahlian menyeluruh dari perumusan konsep kreatif digital hingga eksekusi cetak produksi akhir (end-to-end design-to-print workflow). Saat ini saya aktif menangani ekosistem visual e-commerce di PT Lightboxglobal—mulai dari pengarahan fotografi produk, perancangan banner promosi, hingga campaign visual strategis serta pengoperasian langsung mesin printing untuk lini custom case.\n\nBerbekal fondasi teknis Rekayasa Perangkat Lunak dari SMKS Barunawati dan pengalaman kolaborasi korporat di PT Astra Daihatsu Motor (merancang apparel resmi perusahaan, menyusun dek presentasi onboarding karyawan baru, hingga menerjemahkan modul teknis Jepang–Indonesia), saya menggabungkan disiplin kerja korporasi dengan ketajaman estetika studio.\n\nKemahiran pada Adobe Illustrator, Adobe Photoshop, dan Adobe After Effects saya perkuat dengan kecakapan komunikasi lintas tim dan presentasi publik yang tervalidasi melalui sertifikasi TOEIC Skor 800 (Upper Intermediate — ETS) serta UKBI Peringkat Madya (Badan Pengembangan dan Pembinaan Bahasa).',
  profile_photo_url: '/profile-ray-raharja.png',
  cv_url: '/cv-ray-raharja-santoso.pdf',
  services: [
    {
      id: 'svc-branding',
      index: '01',
      title: 'Brand Identity & Apparel',
      subtitle: 'Identitas Visual, Merchandise & Kemasan',
      description:
        'Perancangan identitas merek yang kuat dan aplikatif—mulai dari logo, pedoman visual, desain merchandise korporat (jaket, totebag, custom case), hingga kesiapan file produksi cetak.',
      deliverables: [
        'Brand Visual Identity',
        'Corporate Apparel & Merchandise',
        'Custom Case & Print Packaging',
        'Brand Presentation Deck',
        'Pre-Press & Print Quality Control',
      ],
    },
    {
      id: 'svc-graphic',
      index: '02',
      title: 'Graphic & E-Commerce Design',
      subtitle: 'Key Visual Kampanye, Katalog & Fotografi Produk',
      description:
        'Pengembangan aset visual e-commerce berkonversi tinggi: penataan foto produk, banner promosi multi-kanal, materi kampanye peluncuran, dan tata letak presentasi perusahaan.',
      deliverables: [
        'E-Commerce Campaign Visuals',
        'Promotional Banner Systems',
        'Product Photography & Retouching',
        'Executive PowerPoint Decks',
        'Social Media Visual Grid',
      ],
    },
    {
      id: 'svc-motion',
      index: '03',
      title: 'Motion Graphics',
      subtitle: 'Animasi Kampanye & Visual Bergerak',
      description:
        'Menghidupkan aset promosi dan identitas merek melalui animasi After Effects yang dinamis untuk kebutuhan iklan digital, reels, dan presentasi interaktif.',
      deliverables: [
        'Animated Promotional Banners',
        'Kinetic Typography & Bumper',
        'Product Showcase Loops',
        'Reels & Vertical Motion (9:16)',
        'Visual Motion Storytelling',
      ],
    },
    {
      id: 'svc-video',
      index: '04',
      title: 'Video Editing & Production',
      subtitle: 'Penyuntingan Visual Produk & Konten Digital',
      description:
        'Penyuntingan video promosi produk, dokumentasi acara, dan konten kampanye digital dengan penataan ritme visual yang bersih, tajam, dan tepat sasaran.',
      deliverables: [
        'Commercial Product Cuts',
        'Social & E-Commerce Video Ads',
        'Event & Campaign Documentation',
        'Color & Visual Balancing',
        'Multi-Platform Export Formatting',
      ],
    },
  ],
  email: 'rayraharja09@gmail.com',
  whatsapp: '+62 813-8145-7516',
  instagram: 'https://instagram.com/Reyp.u',
  linkedin: 'https://linkedin.com/in/ray-raharja-santoso',
  behance: 'https://instagram.com/Reyp.u',
};

export const SEED_EXPERIENCES: ExperienceItem[] = [
  {
    period: 'Okt 2025 — Sekarang',
    role: 'Desainer Grafis & Brand (Graphic & Brand Designer)',
    company: 'PT Lightboxglobal',
    location: 'Jakarta, ID',
    summary:
      'Merancang ekosistem kebutuhan visual e-commerce terpadu (fotografi produk, banner promosi, dan campaign visual) untuk mengakselerasi penjualan serta branding. Mengoperasikan langsung mesin printing produksi untuk layanan custom case dan mengawal alur kerja desain secara menyeluruh dari konsep hingga hasil cetak akhir.',
  },
  {
    period: 'Agu 2023 — Jan 2024',
    role: 'Staf Pendukung Kreatif & Administrasi',
    company: 'PT Astra Daihatsu Motor',
    location: 'Jakarta Utara, ID',
    summary:
      'Merancang desain lini jaket dan totebag resmi perusahaan, menyusun materi presentasi visual (PowerPoint) untuk program onboarding karyawan baru, menerjemahkan modul teknis berbahasa Jepang ke Bahasa Indonesia, serta mengelola administrasi data invoice melalui Microsoft Excel.',
  },
  {
    period: 'Okt 2022 — Okt 2024',
    role: 'Anggota Aktif & Ketua Pelaksana Event (OSIS)',
    company: 'SMKS Barunawati',
    location: 'Jakarta Utara, ID',
    summary:
      'Aktif mengelola berbagai kegiatan dan acara kreatif sekolah selama dua periode penuh, serta dipercaya memimpin tim lintas divisi sebagai Ketua Pelaksana kegiatan Classmeet.',
  },
];

export const SEED_CREDENTIALS: CredentialItem[] = [
  {
    title: 'Rekayasa Perangkat Lunak (Software Engineering)',
    issuer: 'SMKS Barunawati — Jakarta Utara',
    period: 'Jul 2022 — Jul 2025',
    highlight: 'Pendidikan Vokasi Teknologi & Aktif Pengurus OSIS (2 Tahun)',
  },
  {
    title: 'TOEIC — Skor 800 (Upper Intermediate)',
    issuer: 'ETS (Educational Testing Service)',
    period: 'Jul 2024 — Jul 2026',
    highlight: 'Sertifikasi Kemahiran Komunikasi Bahasa Inggris Internasional',
  },
  {
    title: 'UKBI — Peringkat Madya',
    issuer: 'Badan Pengembangan dan Pembinaan Bahasa',
    period: 'Sep 2024 — Sep 2026',
    highlight: 'Sertifikasi Resmi Uji Kemahiran Berbahasa Indonesia',
  },
];

export const SEED_SKILLS: string[] = [
  'E-Commerce Campaign & Banner Visuals',
  'Brand Identity & Corporate Merchandise',
  'Product Photography & Retouching',
  'End-to-End Print & Custom Case Production',
  'Motion Graphics & Visual Presentation',
  'Public Speaking & Presentation Skills',
  'Translasi Materi Jepang–Indonesia & Inggris (TOEIC 800)',
  'Teamwork, Critical Thinking & Analytical Skills',
];

export const SEED_TOOLS: string[] = [
  'Adobe Illustrator',
  'Adobe Photoshop',
  'Adobe After Effects',
  'Mesin Produksi Digital Printing',
  'Microsoft PowerPoint (Onboarding & Pitch Deck)',
  'Microsoft Excel & Word',
  'Rekayasa Perangkat Lunak (RPL Fundamentals)',
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
    tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Digital Printing'],
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
      'Kampanye film vertikal (9:16) dan sistem identitas gerak untuk peluncuran koleksi jam tangan mekanis edisi terbatas Sovereign Watch Co.\n\nFokus utama proyek ini adalah menerjemahkan presisi roda gigi mikroskopis dan pantulan logam mulia ke dalam sekuens animasi dan tipografi kinetik yang menghipnotis di layar mobile tanpa kehilangan wibawa merek mewah.',
    category: 'Motion',
    year: '2026',
    client: 'Sovereign Horology Jakarta',
    role: 'Motion Designer',
    tools: ['Adobe After Effects', 'Adobe Illustrator', 'Adobe Photoshop'],
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
    title: 'Lightboxglobal — E-Commerce Custom Case & Campaign Series',
    slug: 'arsip-nusantara-monograph',
    description:
      'Perancangan rangkaian kampanye visual e-commerce, fotografi produk, banner promosi musiman, serta produksi cetak langsung lini custom case eksklusif di PT Lightboxglobal.\n\nMemastikan setiap desain memiliki ketajaman warna dan presisi posisi cetak dari layar Adobe Illustrator & Photoshop hingga keluar dari mesin printing.',
    category: 'Graphic Design',
    year: '2026',
    client: 'PT Lightboxglobal',
    role: 'Graphic & Brand Designer',
    tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Digital Printing Machine'],
    cover_url:
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=85',
    media: [
      {
        id: 'm-301',
        url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=85',
        type: 'image',
        width: 1200,
        height: 1500,
        alt: 'Katalog produk dan cetakan edisi khusus PT Lightboxglobal',
        blurhash: 'L10A0B241E14',
        is_cover: true,
      },
      {
        id: 'm-302',
        url: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1600&q=85',
        type: 'image',
        width: 1600,
        height: 1067,
        alt: 'Detail tata letak kampanye visual dan kontrol kualitas cetak',
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
      'Perancangan identitas merek untuk restoran kontemporer yang menyajikan menu degustasi berbasis bahan lokal pilihan.\n\nMencakup desain monogram kustom, buku menu cetak, kemasan bawa pulang, hingga materi promosi digital.',
    category: 'Branding',
    year: '2025',
    client: 'Senja Hospitality Group',
    role: 'Brand Identity Designer',
    tools: ['Adobe Illustrator', 'Adobe Photoshop'],
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
    title: 'Aether Botanical Parfum — Commercial Campaign Cut',
    slug: 'aether-parfum-campaign-film',
    description:
      'Penyuntingan video kampanye komersial dan fotografi produk untuk peluncuran parfum uniseks Aether Botanical.\n\nMenonjolkan kontras bayangan pekat dengan kilau kaca amber untuk memperkuat kesan mewah di kanal e-commerce.',
    category: 'Video Editing',
    year: '2026',
    client: 'Aether Botanical',
    role: 'Video Editor & Visual Designer',
    tools: ['Adobe After Effects', 'Adobe Photoshop', 'Adobe Illustrator'],
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
        alt: 'Eksplorasi visual produk dengan tone hangat keemasan',
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
    title: 'Corporate Apparel & Onboarding System — Automotive Showcase',
    slug: 'monolith-architecture-biennial-2026',
    description:
      'Pengembangan desain merchandise korporat (jaket dan totebag resmi) serta sistem dek presentasi onboarding karyawan baru yang terstruktur dan komunikatif.',
    category: 'Graphic Design',
    year: '2024',
    client: 'Korporasi Otomotif Nasional',
    role: 'Creative & Visual Support Designer',
    tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Microsoft PowerPoint'],
    cover_url:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1800&q=85',
    media: [
      {
        id: 'm-601',
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1800&q=85',
        type: 'image',
        width: 1890,
        height: 810,
        alt: 'Sistem komunikasi visual dan desain merchandise korporat',
        blurhash: 'L10A0B241E14',
        is_cover: true,
      },
      {
        id: 'm-602',
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
        type: 'image',
        width: 1600,
        height: 1066,
        alt: 'Aplikasi identitas visual pada elemen korporasi',
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
    name: 'Nadia Pramesti — Brand Manager',
    email: 'nadia.pramesti@kemangsovereign.id',
    message:
      'Halo Ray, kami tertarik dengan pengalaman Anda menangani campaign visual e-commerce dan produksi cetak custom di PT Lightboxglobal. Kami ingin mendiskusikan kolaborasi desain untuk lini produk baru kami bulan depan.',
    is_read: false,
    created_at: '2026-03-01T09:30:00.000Z',
  },
];
