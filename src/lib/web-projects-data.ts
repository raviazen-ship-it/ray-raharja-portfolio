import type { Locale } from '@/lib/i18n/dictionaries';

/**
 * Allowed evidence-based project & feature statuses (Master Prompt Section 8).
 * Managed exclusively from this single source of truth.
 */
export type EvidenceStatus =
  | 'Verified Feature'
  | 'Interactive Demo'
  | 'Prototype'
  | 'In Development'
  | 'Live Product';

export type CapabilityId =
  | 'web-development'
  | 'ui-ux'
  | 'interactive-3d'
  | 'business-websites'
  | 'graphic-design';

export type PortfolioTrack = 'web' | 'visual';

export interface LocalizedText {
  id: string;
  en: string;
}

export interface VerifiedFeatureItem {
  name: LocalizedText;
  status: EvidenceStatus;
  evidence: LocalizedText;
}

export interface DecisionChallengeItem {
  title: LocalizedText;
  detail: LocalizedText;
}

export interface ProjectScreenshot {
  id: string;
  url: string;
  width: number;
  height: number;
  viewport: 'desktop' | 'mobile';
  alt: LocalizedText;
  caption: LocalizedText;
}

export interface QaCheckSummary {
  check: LocalizedText;
  result: 'PASS' | 'FAIL' | 'NOT RUN' | 'BLOCKED';
  note: LocalizedText;
}

export interface WebProjectCaseStudy {
  id: string;
  slug: string;
  name: string;
  subtitle: LocalizedText;
  track: 'web';
  featuredTier: 'featured' | 'more';
  order: number;
  year: string;
  status: EvidenceStatus;
  verifiedAt: string;
  liveUrl: string;
  liveUrlLabel: string;
  repoPublicUrl: string | null;
  repoVisibilityNote: LocalizedText;
  canEmbedIframe: boolean;
  embedUrl: string;
  interactiveHighlights: LocalizedText[];
  capabilities: CapabilityId[];
  categoryLabel: LocalizedText;
  shortDescription: LocalizedText;
  overview: LocalizedText[];
  goals: LocalizedText[];
  problem: LocalizedText[];
  targetUsers: LocalizedText[];
  role: LocalizedText;
  teamSetup: LocalizedText;
  contributionBoundaries: LocalizedText[];
  confirmationNote: LocalizedText | null;
  simulationNotice: LocalizedText;
  techStack: string[];
  techVerificationSource: LocalizedText;
  architectureFlow: LocalizedText[];
  verifiedFeatures: VerifiedFeatureItem[];
  decisionsAndChallenges: DecisionChallengeItem[];
  limitations: LocalizedText[];
  qaChecks: QaCheckSummary[];
  screenshots: ProjectScreenshot[];
}

export const STATUS_METADATA: Record<
  EvidenceStatus,
  {
    label: LocalizedText;
    description: LocalizedText;
    badgeClass: string;
    dotClass: string;
  }
> = {
  'Verified Feature': {
    label: {
      id: 'Verified Feature',
      en: 'Verified Feature',
    },
    description: {
      id: 'Fitur berhasil diperiksa langsung pada aplikasi atau lulus pengujian tercatat.',
      en: 'Feature directly inspected in the running app or passed recorded checks.',
    },
    badgeClass:
      'border-[#2E7D52] bg-[#0A2618] text-[#86EFAC]',
    dotClass: 'bg-[#86EFAC]',
  },
  'Interactive Demo': {
    label: {
      id: 'Interactive Demo',
      en: 'Interactive Demo',
    },
    description: {
      id: 'Alur utama dapat dicoba langsung di browser, dengan data atau transaksi simulasi.',
      en: 'Core flows can be tried directly in the browser using simulated data or transactions.',
    },
    badgeClass:
      'border-[#B5893B] bg-[#221B0E] text-[#D4AF6A]',
    dotClass: 'bg-[#D4AF6A]',
  },
  Prototype: {
    label: {
      id: 'Prototype',
      en: 'Prototype',
    },
    description: {
      id: 'Eksplorasi antarmuka dan alur konsep; backend otorisasi atau integrasi belum diimplementasikan penuh.',
      en: 'Interface and concept flow exploration; backend authorization or integrations are not yet implemented.',
    },
    badgeClass:
      'border-[#B47B18] bg-[#261C08] text-[#FCD34D]',
    dotClass: 'bg-[#FCD34D]',
  },
  'In Development': {
    label: {
      id: 'In Development',
      en: 'In Development',
    },
    description: {
      id: 'Masih dalam tahap pengerjaan aktif dengan ruang lingkup fitur bertahap.',
      en: 'Under active development with staged feature scope.',
    },
    badgeClass:
      'border-[#3B82F6] bg-[#0D1F38] text-[#93C5FD]',
    dotClass: 'bg-[#93C5FD]',
  },
  'Live Product': {
    label: {
      id: 'Live Product',
      en: 'Live Product',
    },
    description: {
      id: 'Deployment, penyimpanan produksi, dan operasional utama telah terverifikasi.',
      en: 'Deployment, production persistence, and primary operations are verified.',
    },
    badgeClass:
      'border-[#10B981] bg-[#08281E] text-[#6EE7B7]',
    dotClass: 'bg-[#6EE7B7]',
  },
};

export interface CapabilityDefinition {
  id: CapabilityId;
  index: string;
  title: LocalizedText;
  summary: LocalizedText;
  proofCountLabel: LocalizedText;
}

export const CAPABILITIES: CapabilityDefinition[] = [
  {
    id: 'web-development',
    index: '01',
    title: {
      id: 'Web Development',
      en: 'Web Development',
    },
    summary: {
      id: 'Pengembangan aplikasi web menggunakan Next.js, React, TypeScript, Vite, dan JavaScript modular dengan pemisahan komponen serta validasi skema.',
      en: 'Web application development with Next.js, React, TypeScript, Vite, and modular JavaScript using structured components and schema validation.',
    },
    proofCountLabel: {
      id: '5 Proyek Web Terhubung',
      en: '5 Connected Web Projects',
    },
  },
  {
    id: 'ui-ux',
    index: '02',
    title: {
      id: 'UI/UX',
      en: 'UI/UX',
    },
    summary: {
      id: 'Perancangan struktur informasi, alur pemesanan, kalkulator interaktif, workspace bertahap, serta tata letak responsif desktop dan mobile.',
      en: 'Information architecture, ordering flows, interactive calculators, staged workspaces, and responsive desktop/mobile layouts.',
    },
    proofCountLabel: {
      id: '5 Studi Kasus Alur Produk',
      en: '5 Product Flow Case Studies',
    },
  },
  {
    id: 'interactive-3d',
    index: '03',
    title: {
      id: 'Interactive 3D',
      en: 'Interactive 3D',
    },
    summary: {
      id: 'Visualisasi 3D berbasis WebGL di browser dengan Three.js dan React Three Fiber, dilengkapi kontrol kamera, mode potong (cutaway), dan fallback 2D SVG.',
      en: 'Browser-based WebGL 3D visualization with Three.js and React Three Fiber, featuring camera presets, cutaway views, and 2D SVG fallbacks.',
    },
    proofCountLabel: {
      id: '3 Proyek WebGL / Three.js',
      en: '3 WebGL / Three.js Projects',
    },
  },
  {
    id: 'business-websites',
    index: '04',
    title: {
      id: 'Business Websites',
      en: 'Business Websites',
    },
    summary: {
      id: 'Website bisnis kuliner, portal informasi institusi, dan simulasi alur B2B yang membantu pengunjung memahami layanan dan menguji skenario pemesanan.',
      en: 'Culinary business sites, institutional portals, and B2B workflow demos designed to communicate offerings and test ordering scenarios.',
    },
    proofCountLabel: {
      id: '3 Proyek Konteks Bisnis & Institusi',
      en: '3 Business & Institutional Demos',
    },
  },
  {
    id: 'graphic-design',
    index: '05',
    title: {
      id: 'Graphic Design',
      en: 'Graphic Design',
    },
    summary: {
      id: 'Kampanye visual e-commerce marketplace, infografis teknis produk, carousel editorial 4-slide, produksi cetak UV, motion 2.5D, dan video pendek.',
      en: 'Marketplace e-commerce campaigns, technical product infographics, 4-slide editorial carousels, UV print production, 2.5D motion, and short-form video.',
    },
    proofCountLabel: {
      id: '12 Arsip Karya Desain & Motion',
      en: '12 Visual & Motion Works',
    },
  },
];

export const WEB_PROJECTS: WebProjectCaseStudy[] = [
  {
    id: 'web-leadkit-bakery',
    slug: 'leadkit-bakery',
    name: 'Leadkit Bakery (Aura Artisan Bakery & Catering)',
    subtitle: {
      id: 'Website Bisnis Bakery, Katalog Pre-Order & Simulasi Alur Pemesanan',
      en: 'Artisan Bakery Business Website, Pre-Order Catalog & Ordering Flow Demo',
    },
    track: 'web',
    featuredTier: 'featured',
    order: 1,
    year: '2026',
    status: 'Interactive Demo',
    verifiedAt: '2026-10-28',
    liveUrl: 'https://leadkit-bakery.vercel.app/',
    liveUrlLabel: 'leadkit-bakery.vercel.app',
    repoPublicUrl: 'https://github.com/raviazen-ship-it/leadkit-bakery',
    repoVisibilityNote: {
      id: 'Repository publik GitHub terverifikasi di akun raviazen-ship-it.',
      en: 'Verified public GitHub repository under raviazen-ship-it.',
    },
    canEmbedIframe: true,
    embedUrl: 'https://leadkit-bakery.vercel.app/',
    interactiveHighlights: [
      {
        id: 'Jelajahi etalase sourdough & filter berdasarkan kategori',
        en: 'Browse artisan sourdough catalog & filter by category',
      },
      {
        id: 'Tambahkan produk ke keranjang belanja & buka drawer cart',
        en: 'Add items to shopping cart & inspect cart drawer',
      },
      {
        id: 'Uji alur checkout simulasi dengan pilihan QRIS atau Transfer',
        en: 'Test simulated checkout flow with QRIS or Bank Transfer',
      },
      {
        id: 'Cek pelacakan status pesanan publik via token unik',
        en: 'Verify public order status tracking via unique token',
      },
    ],
    capabilities: ['business-websites', 'web-development', 'ui-ux'],
    categoryLabel: {
      id: 'Business Website & E-Commerce Demo',
      en: 'Business Website & E-Commerce Demo',
    },
    shortDescription: {
      id: 'Demo website bisnis bakery & catering dengan katalog produk, filter alergen, pemilihan varian dan jumlah minimum order, keranjang belanja, validasi kode promo, serta panel batch produksi dapur.',
      en: 'Bakery and catering business website demo featuring product catalog, allergen filtering, variant and minimum-order selection, cart drawer, promo code validation, and kitchen batch view.',
    },
    overview: [
      {
        id: 'Leadkit Bakery (ditampilkan dengan identitas merek demo Aura Artisan Bakery & Catering) adalah eksplorasi website pemesanan langsung untuk bisnis roti sourdough, kue perayaan pre-order, dan paket katering.',
        en: 'Leadkit Bakery (presented under the demo brand Aura Artisan Bakery & Catering) is a direct-ordering website exploration for an artisan sourdough, celebration cake pre-order, and catering business.',
      },
      {
        id: 'Proyek ini memetakan alur pelanggan dari penelusuran menu (/produk), penyaringan alergen, konfigurasi ukuran/varian, pengelolaan keranjang, simulasi checkout terjadwal, hingga halaman rekap produksi dapur (/admin/produksi).',
        en: 'The project maps the customer journey from menu browsing (/produk), allergen filtering, and variant configuration through cart management, scheduled checkout simulation, and a kitchen batch summary (/admin/produksi).',
      },
    ],
    goals: [
      {
        id: 'Menyajikan katalog produk kuliner dengan informasi porsi, ketersediaan pre-order harian, dan filter alergen yang mudah dipindai.',
        en: 'Present a culinary catalog with clear portion sizing, daily pre-order lead times, and scannable allergen filters.',
      },
      {
        id: 'Menguji alur pemilihan varian, kuantitas minimum order katering, perhitungan voucher diskon, dan pencatatan pesanan ke basis data SQLite.',
        en: 'Test variant selection, catering minimum-order rules, promo code discounts, and order recording into an SQLite database.',
      },
    ],
    problem: [
      {
        id: 'Usaha bakery pre-order sering menerima pesanan tidak terstruktur lewat chat sehingga jadwal panggang, batas kuota harian, varian rasa, dan catatan alergen mudah terlewat.',
        en: 'Pre-order bakeries often receive unstructured chat orders, making bake schedules, daily oven quotas, flavor variants, and allergen notes easy to miss.',
      },
      {
        id: 'Dibutuhkan antarmuka pemesanan mandiri yang menuntun pembeli memilih jadwal kirim/ambil sekaligus memberi tim dapur ringkasan jumlah batch yang harus diproduksi.',
        en: 'A self-serve ordering interface is needed to guide buyers through delivery/pickup scheduling while giving the kitchen a clear batch production tally.',
      },
    ],
    targetUsers: [
      {
        id: 'Pelanggan individu yang memesan kue perayaan atau roti sourdough pre-order.',
        en: 'Individual customers ordering celebration cakes or pre-order sourdough loaves.',
      },
      {
        id: 'Koordinator acara kantor yang memesan paket snack box / catering dalam jumlah minimum tertentu.',
        en: 'Office event coordinators ordering snack boxes and catering packages with minimum quantity rules.',
      },
      {
        id: 'Tim operasional dapur yang memantau antrean pesanan dan rekapitulasi produksi harian.',
        en: 'Kitchen operations staff reviewing order queues and daily batch production totals.',
      },
    ],
    role: {
      id: 'Product Designer & Full-Stack Web Developer (Proyek Portofolio Mandiri - perlu dikonfirmasi oleh Ray bila ada kontributor aset tambahan)',
      en: 'Product Designer & Full-Stack Web Developer (Independent Portfolio Project - to be confirmed by Ray if additional asset contributors were involved)',
    },
    teamSetup: {
      id: 'Proyek individu pada akun deployment Vercel yang sama dengan portofolio utama.',
      en: 'Individual project under the same Vercel deployment organization as the main portfolio.',
    },
    contributionBoundaries: [
      {
        id: 'Perancangan UI/UX halaman beranda, katalog /produk, detail produk, drawer keranjang, checkout, pelacakan pesanan, dan panel dapur.',
        en: 'UI/UX design across the landing page, /produk catalog, product detail, cart drawer, checkout, order tracking, and kitchen panel.',
      },
      {
        id: 'Implementasi skema SQLite (node:sqlite DatabaseSync), endpoint API produk/promo/pesanan/admin dengan validasi Zod, serta state keranjang.',
        en: 'Implementation of the SQLite schema (node:sqlite DatabaseSync), Zod-validated product/promo/order/admin API routes, and cart state.',
      },
    ],
    confirmationNote: {
      id: 'Perlu dikonfirmasi oleh Ray: sumber fotografi produk pada katalog demo (aset ilustrasi/stok kurasi vs foto produksi sendiri).',
      en: 'To be confirmed by Ray: origin of demo catalog product photography (curated stock/illustration assets vs self-shot photos).',
    },
    simulationNotice: {
      id: 'Demo - data, ulasan pelanggan, nomor rekening, kode QRIS, dan proses pembayaran pada aplikasi ini sepenuhnya bersifat simulasi.',
      en: 'Demo - customer reviews, bank account numbers, QRIS codes, and payment processing in this application are entirely simulated.',
    },
    techStack: [
      'Next.js 15.1.7 (App Router)',
      'React 19.0.0',
      'TypeScript 5',
      'Tailwind CSS 3.4',
      'Node.js Built-in SQLite (node:sqlite DatabaseSync)',
      'Zod 3.24',
      'Lucide React',
    ],
    techVerificationSource: {
      id: 'Diverifikasi langsung dari package.json, next.config.ts, dan lib/db/sqlite.ts pada repository lokal.',
      en: 'Verified directly from package.json, next.config.ts, and lib/db/sqlite.ts in the local repository.',
    },
    architectureFlow: [
      {
        id: 'Katalog Server & Filter Client: Halaman /produk memuat daftar produk dari SQLite lalu menjalankan pencarian kata kunci, filter kategori, filter alergen, dan pengurutan secara instan.',
        en: 'Server Catalog & Client Filtering: /produk loads catalog items from SQLite and runs keyword search, category tabs, allergen filtering, and sorting.',
      },
      {
        id: 'Keranjang & Validasi Promo: Pilihan varian dan kuantitas disimpan di state keranjang, lalu diverifikasi terhadap aturan kuota dan kode voucher melalui /api/promo/validate.',
        en: 'Cart & Promo Validation: Selected variants and quantities persist in cart state and validate against voucher rules via /api/promo/validate.',
      },
      {
        id: 'Simulasi Checkout & Rekap Dapur: Pengiriman formulir membuat entri pesanan di SQLite (/tmp/data/bakery.db pada serverless) yang dapat ditinjau pada tabel batch produksi dapur.',
        en: 'Simulated Checkout & Kitchen Tally: Submitting checkout writes an order record to SQLite (/tmp/data/bakery.db on serverless) visible in the kitchen batch view.',
      },
    ],
    verifiedFeatures: [
      {
        name: {
          id: 'Pencarian katalog, filter kategori, dan filter alergen (/produk)',
          en: 'Catalog search, category tabs, and allergen filter (/produk)',
        },
        status: 'Verified Feature',
        evidence: {
          id: 'Diuji dengan Playwright pada URL publik: pencarian "Sourdough" menampilkan 3 kartu relevan dan navigasi detail produk mengembalikan HTTP 200.',
          en: 'Tested via Playwright on the live URL: searching "Sourdough" returned 3 matching cards and product detail navigation returned HTTP 200.',
        },
      },
      {
        name: {
          id: 'Pemilihan varian produk, jumlah minimum order, dan kalkulasi keranjang',
          en: 'Product variant selection, minimum-order quantity, and cart calculation',
        },
        status: 'Verified Feature',
        evidence: {
          id: 'Diverifikasi pada komponen detail produk dan state keranjang beserta perhitungan subtotal Rupiah (IDR).',
          en: 'Verified in the product detail component and cart state including IDR subtotal calculations.',
        },
      },
      {
        name: {
          id: 'Validasi kode promo & panel rekap produksi dapur (/admin/produksi)',
          en: 'Promo code validation & kitchen batch production view (/admin/produksi)',
        },
        status: 'Interactive Demo',
        evidence: {
          id: 'Berjalan di atas SQLite lokal/ephemeral (/tmp pada Vercel) sehingga pesanan baru tidak bersifat permanen lintas cold-start serverless.',
          en: 'Runs on local/ephemeral SQLite (/tmp on Vercel), so new orders do not persist permanently across serverless cold starts.',
        },
      },
      {
        name: {
          id: 'Modal gerbang pembayaran (QRIS, Virtual Account, E-Wallet)',
          en: 'Payment gateway modal (QRIS, Virtual Account, E-Wallet)',
        },
        status: 'Prototype',
        evidence: {
          id: 'PaymentGatewayModal.tsx menggunakan timer simulasi client-side (setTimeout 1,8 detik) dan SVG QRIS ilustratif, bukan integrasi payment gateway nyata.',
          en: 'PaymentGatewayModal.tsx uses a 1.8s client-side setTimeout simulation and an illustrative QRIS SVG rather than a live payment gateway.',
        },
      },
    ],
    decisionsAndChallenges: [
      {
        title: {
          id: 'Pemisahan informasi pre-order harian vs ready stock pada kartu katalog',
          en: 'Separating pre-order lead time vs ready-stock badges on catalog cards',
        },
        detail: {
          id: 'Setiap kartu produk menampilkan estimasi waktu persiapan (misalnya Pre-order 1 Hari atau Ready Stock Hari Ini) dan porsi saji agar ekspektasi pelanggan terbentuk sebelum masuk ke checkout.',
          en: 'Each product card surfaces lead time badges (such as 1-Day Pre-order or Ready Today) and serving counts so buyer expectations are set before checkout.',
        },
      },
      {
        title: {
          id: 'Adaptasi penyimpanan SQLite di lingkungan serverless Vercel',
          en: 'Adapting SQLite storage inside Vercel serverless runtime',
        },
        detail: {
          id: 'Karena filesystem bundel aplikasi di Vercel bersifat read-only saat runtime, basis data awal disalin ke /tmp/data/bakery.db. Solusi ini menjaga demo tetap interaktif tanpa biaya database eksternal, namun datanya bersifat sementara.',
          en: 'Because the deployed bundle filesystem on Vercel is read-only at runtime, the seed database copies to /tmp/data/bakery.db. This keeps the demo interactive without external DB hosting, at the cost of ephemeral persistence.',
        },
      },
    ],
    limitations: [
      {
        id: 'Pembayaran sepenuhnya simulasi (tanpa Midtrans/Xendit); status pembayaran pada deployment publik belum terhubung ke webhook penyedia pembayaran.',
        en: 'Payments are strictly simulated (no Midtrans/Xendit integration); payment status on the live deployment is not backed by payment webhooks.',
      },
      {
        id: 'Penyimpanan pesanan pada deployment Vercel memakai direktori sementara /tmp sehingga data akan kembali ke seed awal saat instance di-recycle.',
        en: 'Order storage on the Vercel deployment uses ephemeral /tmp storage and resets to initial seed data when serverless instances recycle.',
      },
      {
        id: 'Pada audit deployment publik (28 Okt 2026), ditemukan isu tumpang-tindih teks subjudul logo dengan bar pengumuman pada viewport 390px serta celah pencocokan token pelacakan pesanan yang telah diperbaiki pada source lokal dan menunggu redeploy.',
        en: 'During the Oct 28, 2026 live audit, mobile header subtitle overlap at 390px and an order-lookup token check issue were identified; fixes were prepared in local source and await redeployment.',
      },
    ],
    qaChecks: [
      {
        check: {
          id: 'Akses HTTP beranda & katalog /produk pada live demo',
          en: 'Live demo home & /produk catalog HTTP availability',
        },
        result: 'PASS',
        note: {
          id: 'HTTP 200 OK pada desktop (1440x900) dan mobile (390x844), pencarian kata kunci & filter alergen merespons.',
          en: 'HTTP 200 OK on desktop (1440x900) and mobile (390x844); keyword search and allergen filter respond accurately.',
        },
      },
      {
        check: {
          id: 'Integrasi pembayaran produksi nyata',
          en: 'Real production payment gateway integration',
        },
        result: 'BLOCKED',
        note: {
          id: 'Sengaja berupa simulasi UI untuk keperluan demo portofolio; jangan memasukkan data pembayaran asli.',
          en: 'Intentionally built as a UI simulation for portfolio demonstration; do not enter real payment credentials.',
        },
      },
    ],
    screenshots: [
      {
        id: 'leadkit-desktop',
        url: '/images/projects/leadkit-bakery-desktop.png',
        width: 1440,
        height: 900,
        viewport: 'desktop',
        alt: {
          id: 'Tampilan desktop beranda Leadkit Bakery (Aura Artisan Bakery & Catering) pada viewport 1440x900',
          en: 'Desktop view of Leadkit Bakery (Aura Artisan Bakery & Catering) homepage at 1440x900',
        },
        caption: {
          id: 'Beranda Desktop (1440x900) - Hero, proposisi pre-order harian, dan navigasi utama.',
          en: 'Desktop Homepage (1440x900) - Hero section, daily pre-order proposition, and main navigation.',
        },
      },
      {
        id: 'leadkit-catalog',
        url: '/images/projects/leadkit-bakery-catalog.png',
        width: 1440,
        height: 900,
        viewport: 'desktop',
        alt: {
          id: 'Halaman katalog /produk Leadkit Bakery dengan bilah pencarian, filter alergen, dan kartu produk',
          en: 'Leadkit Bakery /produk catalog page showing search bar, allergen filter, and product cards',
        },
        caption: {
          id: 'Katalog Produk (/produk) - Pencarian langsung, filter alergen, dan indikator status pre-order.',
          en: 'Product Catalog (/produk) - Instant search, allergen selector, and pre-order status badges.',
        },
      },
      {
        id: 'leadkit-mobile',
        url: '/images/projects/leadkit-bakery-mobile.png',
        width: 780,
        height: 1688,
        viewport: 'mobile',
        alt: {
          id: 'Tampilan mobile Leadkit Bakery pada viewport 390x844',
          en: 'Mobile view of Leadkit Bakery captured at 390x844 viewport',
        },
        caption: {
          id: 'Tampilan Mobile (390x844) - Tata letak kolom tunggal dan akses cepat ke menu produk.',
          en: 'Mobile View (390x844) - Single-column layout and quick access to the menu.',
        },
      },
    ],
  },
  {
    id: 'web-arsiviz-pro',
    slug: 'arsiviz-pro',
    name: 'ArsiViz Pro v2.0',
    subtitle: {
      id: 'Studio Visualisasi Konstruksi Rumah 3D Parametrik, Estimasi RAB & Simulasi KPR',
      en: 'Parametric 3D House Construction Visualizer, RAB Cost Estimator & Mortgage Simulator',
    },
    track: 'web',
    featuredTier: 'featured',
    order: 2,
    year: '2026',
    status: 'Interactive Demo',
    verifiedAt: '2026-10-28',
    liveUrl: 'https://arsiviz-pro.vercel.app/',
    liveUrlLabel: 'arsiviz-pro.vercel.app',
    repoPublicUrl: 'https://github.com/raviazen-ship-it/arsiviz-pro',
    repoVisibilityNote: {
      id: 'Repository publik GitHub terverifikasi di akun raviazen-ship-it.',
      en: 'Verified public GitHub repository under raviazen-ship-it.',
    },
    canEmbedIframe: true,
    embedUrl: 'https://arsiviz-pro.vercel.app/',
    interactiveHighlights: [
      {
        id: 'Navigasi 3D interaktif (rotasi 360°, orbit, pan, dan zoom model)',
        en: 'Interactive 3D navigation (360° orbit, pan, and zoom model)',
      },
      {
        id: 'Uji mode analisis potongan struktural (Section Cutaway)',
        en: 'Test structural section cutaway analysis mode',
      },
      {
        id: 'Simulasikan bayangan dan pencahayaan matahari (Daylight & Sun Study)',
        en: 'Simulate daylight and sun positioning (Daylight & Sun Study)',
      },
      {
        id: 'Buka panel parameter material & inspeksi metadata BIM',
        en: 'Open material parameters panel & inspect BIM metadata',
      },
    ],
    capabilities: ['interactive-3d', 'web-development', 'ui-ux'],
    categoryLabel: {
      id: 'Interactive 3D & Architectural Tool',
      en: 'Interactive 3D & Architectural Tool',
    },
    shortDescription: {
      id: 'Aplikasi web interaktif berbasis React Three Fiber untuk mengeksplorasi 6 tahap konstruksi rumah secara 3D, mengatur ukuran lahan & bangunan dengan validasi GSB, memotong tampak dalam (cutaway), serta menghitung estimasi RAB dan cicilan KPR.',
      en: 'React Three Fiber web application for exploring 6 house construction stages in 3D, adjusting plot and building dimensions with setback validation, toggling cutaway views, and calculating indicative RAB budgets and mortgage payments.',
    },
    overview: [
      {
        id: 'ArsiViz Pro adalah studio perencanaan dan edukasi konstruksi rumah berbasis browser yang menggabungkan pemodelan 3D prosedural dengan perhitungan estimasi anggaran bangunan (RAB) serta simulasi KPR.',
        en: 'ArsiViz Pro is a browser-based home construction planning and education studio combining procedural 3D modeling with indicative Bill of Quantities (RAB) estimation and mortgage (KPR) simulation.',
      },
      {
        id: 'Pengguna dapat berpindah di antara 6 tahap pembangunan (0. Pra-Konstruksi hingga 5. Interior & Lanskap), mengganti 4 langgam arsitektur, menguji arah cahaya matahari (06:00-21:00), dan memeriksa daftar hal penting yang wajib dicek di lapangan.',
        en: 'Users can step through 6 construction phases (0. Pre-Construction to 5. Interior & Landscape), switch among 4 architectural styles, scrub a 06:00-21:00 sun study, and read field inspection checklists.',
      },
    ],
    goals: [
      {
        id: 'Membantu calon pemilik rumah memahami urutan struktur konstruksi secara visual sebelum berdiskusi dengan arsitek atau kontraktor.',
        en: 'Help prospective homeowners visually understand structural construction stages before consulting an architect or contractor.',
      },
      {
        id: 'Menghubungkan perubahan dimensi lahan, jumlah lantai, langgam, dan spesifikasi material langsung ke perhitungan RAB indikatif secara deterministik.',
        en: 'Connect plot dimensions, floor count, architectural style, and material tiers directly to a deterministic indicative RAB budget breakdown.',
      },
    ],
    problem: [
      {
        id: 'Pemilik rumah pertama kali kerap kesulitan membayangkan hubungan antara ukuran kavling, aturan Garis Sempadan Bangunan (GSB), tahapan struktur, dan dampaknya terhadap pembengkakan biaya.',
        en: 'First-time homeowners often struggle to visualize how plot dimensions, setback regulations (GSB), and structural phases impact total construction cost.',
      },
      {
        id: 'Alat CAD profesional terlalu rumit bagi pengguna awam, sementara kalkulator harga per meter persegi biasa tidak memperlihatkan bentuk ruang maupun urutan pekerjaan.',
        en: 'Professional CAD suites are too complex for laypeople, whereas plain per-square-meter calculators show neither spatial form nor construction sequence.',
      },
    ],
    targetUsers: [
      {
        id: 'Calon pemilik rumah yang sedang merencanakan pembangunan mandiri atau renovasi di atas lahan kavling.',
        en: 'Homeowners planning a custom build or major renovation on a residential plot.',
      },
      {
        id: 'Arsitek junior atau konsultan rancang-bangun yang membutuhkan alat bantu presentasi tahapan konstruksi awal kepada klien.',
        en: 'Junior architects or design-build consultants needing an early-stage visual briefing aid for clients.',
      },
    ],
    role: {
      id: 'Product Designer & Frontend / 3D Web Engineer (Proyek Portofolio Mandiri)',
      en: 'Product Designer & Frontend / 3D Web Engineer (Independent Portfolio Project)',
    },
    teamSetup: {
      id: 'Proyek individu pada akun Vercel pemilik.',
      en: 'Individual project under the owner Vercel organization.',
    },
    contributionBoundaries: [
      {
        id: 'Perancangan tata letak tiga panel studio, drawer mobile, mode terang/gelap, serta sistem bilingual ID/EN internal aplikasi.',
        en: 'Design of the three-pane studio workspace, mobile bottom drawers, light/dark themes, and in-app ID/EN localization.',
      },
      {
        id: 'Implementasi geometri rumah parametrik 3D dengan React Three Fiber / Three.js, kamera preset, cutaway mode, fallback 2D SVG saat WebGL gagal, state undo/redo Zustand, serta mesin kalkulasi RAB 12 kategori & anuitas KPR.',
        en: 'Implementation of parametric 3D house geometry in React Three Fiber / Three.js, camera presets, cutaway mode, 2D SVG WebGL fallback, Zustand undo/redo history, and 12-category RAB + KPR annuity formulas.',
      },
    ],
    confirmationNote: null,
    simulationNotice: {
      id: 'Demo Mode (Lokal) - Proyek disimpan di localStorage browser pengguna dan angka RAB/KPR merupakan estimasi indikatif simulasi, bukan penawaran kontraktor mengikat.',
      en: 'Demo Mode (Local) - Projects save to browser localStorage and RAB/KPR figures are indicative simulation estimates rather than binding contractor quotes.',
    },
    techStack: [
      'Next.js 16.2.3 (App Router)',
      'React 19.2.4',
      'TypeScript 5',
      'Three.js 0.173',
      '@react-three/fiber 9.0',
      '@react-three/drei 10.0',
      'Zustand 5.0 (35-step Undo/Redo)',
      'Zod 3.24',
      'Tailwind CSS 3.4',
    ],
    techVerificationSource: {
      id: 'Diverifikasi langsung dari package.json, components/three/SceneCanvas.tsx, lib/rab-calculator.ts, dan store/useProjectStore.ts.',
      en: 'Verified directly from package.json, components/three/SceneCanvas.tsx, lib/rab-calculator.ts, and store/useProjectStore.ts.',
    },
    architectureFlow: [
      {
        id: 'Store Parametrik Terpusat (Zustand): Menyimpan dimensi kavling/bangunan, tahap konstruksi (0-5), gaya arsitektur, tingkat material, dan riwayat 35 langkah undo/redo di localStorage.',
        en: 'Centralized Parametric Store (Zustand): Holds plot/building dimensions, active stage (0-5), style preset, material tier, and a 35-step undo/redo stack synced to localStorage.',
      },
      {
        id: 'Pipeline Render 3D + Fallback 2D: SceneCanvas mendeteksi dukungan WebGL; bila aktif merender mesh pondasi, kolom, dinding, atap, dan pencahayaan jam matahari, atau otomatis beralih ke diagram 2D SVG dinamis bila konteks WebGL tidak tersedia.',
        en: '3D Render Pipeline + 2D Fallback: SceneCanvas probes WebGL support; when available it renders procedural foundation, column, wall, roof, and sun-angle lighting meshes, or falls back to a dynamic 2D SVG plan.',
      },
      {
        id: 'Kalkulator RAB & Validasi GSB: Setiap perubahan parameter langsung menghitung ulang 12 komponen biaya konstruksi, jadwal termin pembayaran, dan status kepatuhan sempadan lahan.',
        en: 'RAB Cost Engine & Setback Validator: Parameter updates deterministically recompute 12 construction cost categories, payment milestones, and plot setback compliance.',
      },
    ],
    verifiedFeatures: [
      {
        name: {
          id: 'Visualisasi 3D WebGL real-time lintas 6 tahap konstruksi (Tahap 0-5)',
          en: 'Real-time WebGL 3D visualization across 6 construction stages (Stages 0-5)',
        },
        status: 'Verified Feature',
        evidence: {
          id: 'Diuji langsung dengan Playwright headless Chrome: canvas WebGL aktif (960x761), perpindahan tahap 0 ke 2 mengubah geometri dan panel lingkup pekerjaan.',
          en: 'Tested in headless Chrome via Playwright: active WebGL canvas (960x761) verified, and stepping from Stage 0 to Stage 2 updates both 3D geometry and scope notes.',
        },
      },
      {
        name: {
          id: 'Mode potong (Cutaway), 4 kamera preset, dan slider Studi Matahari (06:00-21:00)',
          en: 'Cutaway mode, 4 camera presets, and Sun Study slider (06:00-21:00)',
        },
        status: 'Verified Feature',
        evidence: {
          id: 'Tombol Cutaway berhasil memotong atap/dinding bagian atas untuk memperlihatkan tata ruang dalam (terekam pada arsiviz-pro-cutaway.png).',
          en: 'Toggling Cutaway slices upper roof/wall elements to expose interior partitions (captured in arsiviz-pro-cutaway.png).',
        },
      },
      {
        name: {
          id: 'Kalkulator estimasi RAB 12 kategori, validasi GSB Auto-Fit, & simulasi KPR',
          en: '12-category RAB budget calculator, GSB Auto-Fit validation, & KPR simulator',
        },
        status: 'Verified Feature',
        evidence: {
          id: 'Rumus deterministik pada lib/rab-calculator.ts dan lib/gsb-validator.ts terverifikasi tanpa error konsol.',
          en: 'Deterministic formulas in lib/rab-calculator.ts and lib/gsb-validator.ts verified with zero console errors.',
        },
      },
      {
        name: {
          id: 'Penyimpanan proyek & formulir permintaan konsultasi arsitek',
          en: 'Project persistence & architect consultation request modal',
        },
        status: 'Interactive Demo',
        evidence: {
          id: 'Berjalan murni di sisi client (localStorage + ekspor/impor file JSON) dengan label eksplisit "Demo Mode (Lokal)".',
          en: 'Runs purely client-side (localStorage + JSON file export/import) and is explicitly badged "Demo Mode (Lokal)".',
        },
      },
    ],
    decisionsAndChallenges: [
      {
        title: {
          id: 'Menjaga keterbacaan kontrol 3D pada layar mobile',
          en: 'Keeping 3D controls usable on mobile screens',
        },
        detail: {
          id: 'Pada layar sempit (390x844), panel kiri dan kanan diubah menjadi bottom sheet/drawer yang dapat dibuka-tutup sehingga kanvas 3D tetap mendapat ruang sentuh utama tanpa overflow horizontal.',
          en: 'On narrow viewports (390x844), left and right inspector rails collapse into toggleable drawers so the 3D viewport retains primary touch space with zero horizontal overflow.',
        },
      },
      {
        title: {
          id: 'Menyediakan degradasi anggun (WebGL fallback) & mode performa adaptif',
          en: 'Graceful WebGL fallback and adaptive quality toggle',
        },
        detail: {
          id: 'Tidak semua perangkat memiliki akselerasi GPU stabil. Komponen Fallback2DView memastikan denah ukuran kavling dan bangunan tetap tergambar memakai SVG terukur apabila WebGL gagal dimuat.',
          en: 'Not every device offers stable GPU acceleration. Fallback2DView renders a scaled SVG plot-and-footprint diagram whenever WebGL context creation fails.',
        },
      },
    ],
    limitations: [
      {
        id: 'Belum memiliki sinkronisasi akun cloud atau kolaborasi multi-pengguna; penyimpanan masih menggunakan localStorage browser dan ekspor JSON.',
        en: 'No cloud account sync or multi-user sharing yet; persistence uses browser localStorage and JSON export/import.',
      },
      {
        id: 'Daftar pemeriksaan lapangan per tahap masih berupa poin panduan bacaan statis, belum berupa daftar centang interaktif yang tersimpan per proyek.',
        en: 'Per-stage field inspection items are static guidance bullets rather than stateful per-project checkboxes.',
      },
      {
        id: 'Pada deployment publik saat audit, halaman ruang kerja belum menyertakan elemen heading semantik <h1> (telah ditambahkan pada source lokal).',
        en: 'On the audited live deployment, the studio workspace lacked a semantic <h1> heading (added in local source).',
      },
    ],
    qaChecks: [
      {
        check: {
          id: 'Render WebGL 3D, Cutaway, tahap konstruksi, dan konsol error',
          en: 'WebGL 3D render, Cutaway toggle, stage stepping, and console cleanliness',
        },
        result: 'PASS',
        note: {
          id: '0 console error, 0 page error, 0 horizontal overflow pada desktop (1440x900) dan mobile (390x844).',
          en: '0 console errors, 0 page errors, and 0 horizontal overflow on both desktop (1440x900) and mobile (390x844).',
        },
      },
    ],
    screenshots: [
      {
        id: 'arsiviz-desktop',
        url: '/images/projects/arsiviz-pro-desktop.png',
        width: 1440,
        height: 900,
        viewport: 'desktop',
        alt: {
          id: 'Ruang kerja desktop ArsiViz Pro v2.0 menampilkan model rumah 3D Tropical Contemporary Villa Tahap 5 beserta panel tahapan dan RAB Rp 1,03 M',
          en: 'ArsiViz Pro v2.0 desktop workspace showing Stage 5 3D Tropical Contemporary Villa model alongside stage controls and Rp 1.03B RAB summary',
        },
        caption: {
          id: 'Studio 3D Desktop (1440x900) - Tahap 5/5, Studi Matahari 09:30, dan pemilih tipe rumah.',
          en: 'Desktop 3D Studio (1440x900) - Stage 5/5, 09:30 Sun Study, and house style selector.',
        },
      },
      {
        id: 'arsiviz-cutaway',
        url: '/images/projects/arsiviz-pro-cutaway.png',
        width: 1440,
        height: 900,
        viewport: 'desktop',
        alt: {
          id: 'Mode Cutaway aktif pada ArsiViz Pro v2.0 memperlihatkan struktur kolom dan dinding dalam pada Tahap 2',
          en: 'Active Cutaway mode in ArsiViz Pro v2.0 exposing interior columns and structural walls at Stage 2',
        },
        caption: {
          id: 'Mode Cutaway & Tahap Struktur (Tahap 2/5) - Memperlihatkan susunan kolom, balok, dan denah ruang.',
          en: 'Cutaway Mode & Structural Phase (Stage 2/5) - Revealing column grid, beams, and room layout.',
        },
      },
      {
        id: 'arsiviz-mobile',
        url: '/images/projects/arsiviz-pro-mobile.png',
        width: 780,
        height: 1688,
        viewport: 'mobile',
        alt: {
          id: 'Tampilan mobile ArsiViz Pro v2.0 pada viewport 390x844 tanpa overflow horizontal',
          en: 'Mobile view of ArsiViz Pro v2.0 at 390x844 viewport with zero horizontal overflow',
        },
        caption: {
          id: 'Tampilan Mobile (390x844) - Kanvas 3D responsif dengan navigasi tahap ringkas di bagian bawah.',
          en: 'Mobile View (390x844) - Responsive 3D viewport with compact bottom stage controls.',
        },
      },
    ],
  },
  {
    id: 'web-seumur-gerak',
    slug: 'seumur-gerak',
    name: 'Seumur Gerak',
    subtitle: {
      id: 'Panduan Aktivitas Fisik Lintas Usia, Manekin 3D Prosedural & Kalkulator Target WHO',
      en: 'Lifespan Physical Activity Guide, Procedural 3D Mannequin & WHO Target Calculator',
    },
    track: 'web',
    featuredTier: 'featured',
    order: 3,
    year: '2026',
    status: 'Interactive Demo',
    verifiedAt: '2026-10-28',
    liveUrl: 'https://seumur-gerak.vercel.app/#kalkulator',
    liveUrlLabel: 'seumur-gerak.vercel.app/#kalkulator',
    repoPublicUrl: null,
    repoVisibilityNote: {
      id: 'Proyek kolaborasi tim akademik pada organisasi Vercel terpisah; repositori tim dijaga privat untuk keamanan bersama.',
      en: 'Collaborative academic team project hosted on a separate Vercel organization; team repository kept private for security.',
    },
    canEmbedIframe: true,
    embedUrl: '/api/embed/seumur-gerak',
    interactiveHighlights: [
      {
        id: 'Geser kalkulator aktivitas fisik harian (aerobik, kekuatan, mobilitas)',
        en: 'Adjust daily physical activity sliders (aerobic, strength, mobility)',
      },
      {
        id: 'Hitung estimasi dampak pada rentang hidup sehat (Healthspan vs Lifespan)',
        en: 'Calculate estimated impact on healthy lifespan (Healthspan vs Lifespan)',
      },
      {
        id: 'Dapatkan rekomendasi intensitas aktivitas personal berbasis pedoman WHO',
        en: 'Receive personalized activity recommendations based on WHO guidelines',
      },
      {
        id: 'Akses kalkulator penuh 1-klik via tombol "Buka Website Langsung"',
        en: 'Direct 1-click full calculator access via "Open Live Website"',
      },
    ],
    capabilities: ['ui-ux', 'interactive-3d', 'web-development'],
    categoryLabel: {
      id: 'Health Education & Interactive Calculator',
      en: 'Health Education & Interactive Calculator',
    },
    shortDescription: {
      id: 'Platform edukasi sains olahraga untuk keluarga Indonesia dengan kalkulator menit aktif mingguan berbasis pedoman WHO 2020, manekin 3D prosedural lintas usia (2-85 tahun), kartu mitos vs fakta, dan artikel rujukan.',
      en: 'Sport-science education web app for Indonesian families featuring a WHO 2020 weekly active-minutes calculator, age-morphing procedural 3D mannequin (ages 2-85), myth-vs-fact flip cards, and reference articles.',
    },
    overview: [
      {
        id: 'Seumur Gerak menyajikan panduan aktivitas fisik berbasis rekomendasi WHO 2020 dan Kementerian Kesehatan RI yang diterjemahkan ke dalam bahasa yang mudah dipahami keluarga Indonesia dari usia balita hingga lansia.',
        en: 'Seumur Gerak translates WHO 2020 and Indonesian Ministry of Health physical activity guidelines into approachable interactive guidance across life stages from toddlers to older adults.',
      },
      {
        id: 'Pengunjung dapat menghitung capaian menit setara-sedang mingguan pada bagian #kalkulator, mengamati perubahan proporsi gerak pada manekin 3D prosedural, membalik kartu Mitos vs Fakta, serta membaca artikel populer.',
        en: 'Visitors can compute their weekly moderate-equivalent active minutes in #kalkulator, inspect posture and movement changes on a procedural 3D mannequin, flip Myth-vs-Fact cards, and read educational articles.',
      },
    ],
    goals: [
      {
        id: 'Memudahkan masyarakat mengecek apakah kombinasi aktivitas sedang, aktivitas berat, dan latihan penguatan otot mingguan mereka sudah memenuhi anjuran usia masing-masing.',
        en: 'Make it simple for users to check whether their weekly mix of moderate cardio, vigorous activity, and muscle strengthening meets age-specific guidelines.',
      },
      {
        id: 'Menjaga ukuran aplikasi tetap ringan tanpa langkah build bundler berat melalui arsitektur ES6 Modules murni dan Three.js CDN importmap.',
        en: 'Keep the application lightweight without a heavy bundler build step by using native ES6 modules and Three.js via importmap.',
      },
    ],
    problem: [
      {
        id: 'Pedoman kesehatan resmi umumnya tersebar dalam dokumen tabel PDF yang jarang dibaca tuntas oleh masyarakat umum dan sulit dikaitkan langsung dengan rutinitas harian.',
        en: 'Official activity guidelines are typically buried in dense PDF tables that general readers rarely finish or map onto their weekly routines.',
      },
    ],
    targetUsers: [
      {
        id: 'Keluarga Indonesia (orang tua, dewasa pekerja, remaja, dan pendamping lansia) yang mencari acuan durasi gerak mingguan.',
        en: 'Indonesian households (parents, working adults, teens, and elder caregivers) looking for practical weekly activity targets.',
      },
      {
        id: 'Mahasiswa dan pendidik sains olahraga yang membutuhkan media edukasi visual interaktif.',
        en: 'Sport-science students and educators needing interactive visual teaching material.',
      },
    ],
    role: {
      id: 'Prompt Engineer & Lead Frontend Developer (Proyek Kolaborasi Tim 5 Orang - batas detail kontribusi antaranggota perlu dikonfirmasi oleh Ray)',
      en: 'Prompt Engineer & Lead Frontend Developer (5-Person Team Project - exact cross-member boundaries to be confirmed by Ray)',
    },
    teamSetup: {
      id: 'Kolaborasi kelompok akademik 5 anggota. Berdasarkan dokumentasi internal proyek (data/team.js), Anggota 1 (Yogi) berperan sebagai Project Lead & Editor Konten, Ray Raharja sebagai Anggota 2 (Prompt Engineer & Developer), serta 3 anggota riset/konten lainnya.',
      en: '5-member academic group collaboration. Per internal project metadata (data/team.js), Member 1 (Yogi) served as Project Lead & Content Editor, Ray Raharja as Member 2 (Prompt Engineer & Developer), alongside 3 research/editorial members.',
    },
    contributionBoundaries: [
      {
        id: 'Tercatat pada data tim proyek: arsitektur HTML/CSS/ES6 modular, pipeline visualisasi manekin 3D prosedural (Three.js + fallback 2D SVG), logika kalkulator aktivitas WHO, serta optimasi aksesibilitas keyboard.',
        en: 'Recorded in project team metadata: modular HTML/CSS/ES6 architecture, procedural 3D mannequin pipeline (Three.js + 2D SVG fallback), WHO activity calculator logic, and keyboard accessibility.',
      },
      {
        id: 'Riset literatur ilmiah, kurasi pedoman klinis, dan penyuntingan naskah artikel dilakukan bersama anggota tim lainnya (tidak diklaim sebagai karya tunggal Ray).',
        en: 'Scientific literature review, clinical guideline curation, and article editing were conducted collaboratively with teammates (not claimed as solo work by Ray).',
      },
    ],
    confirmationNote: {
      id: 'Perlu dikonfirmasi oleh Ray: nama lengkap tiga rekan tim lainnya (masih tertulis placeholder pada data/team.js) serta rincian final pembagian tugas.',
      en: 'To be confirmed by Ray: full names of the other three teammates (currently placeholders in data/team.js) and final task sign-off.',
    },
    simulationNotice: {
      id: 'Catatan Penting - Kalkulator bersifat edukasi umum (bukan diagnosis medis), dan fitur "Ruang Kerja Admin" hanya berupa prototipe browser berbasis localStorage/sessionStorage tanpa server autentikasi.',
      en: 'Important Notice - The calculator provides general educational guidance (not medical advice), and the "Admin Workspace" is a browser-only localStorage/sessionStorage prototype with no server authentication.',
    },
    techStack: [
      'Semantic HTML5',
      'Modular CSS3 (Custom Properties & Fluid Clamp)',
      'Vanilla JavaScript (ES6 Modules)',
      'Three.js 0.160.0 (via ES Importmap)',
      'SVG Data Visualization',
    ],
    techVerificationSource: {
      id: 'Diverifikasi langsung dari index.html, js/main.js, js/scene3d.js, js/calculator.js, dan js/admin.js (tanpa bundler/package.json aplikasi).',
      en: 'Verified directly from index.html, js/main.js, js/scene3d.js, js/calculator.js, and js/admin.js (zero-bundler native ES module setup).',
    },
    architectureFlow: [
      {
        id: 'Data Statis Terstruktur (data/*.js): Pedoman tahapan usia, daftar mitos-fakta, artikel, dan referensi dimuat sebagai modul ES6 dan dapat di-override secara lokal di browser untuk simulasi penyuntingan.',
        en: 'Structured Static Modules (data/*.js): Age-group guidelines, myth-fact pairs, articles, and citations load as ES6 modules with optional local browser overrides for editing previews.',
      },
      {
        id: 'Kalkulator Setara-Sedang WHO (js/calculator.js): Menghitung total menit ekuivalen (menit sedang + 2x menit berat) untuk kelompok usia dewasa/lansia atau rata-rata menit harian untuk anak & remaja.',
        en: 'WHO Moderate-Equivalent Calculator (js/calculator.js): Computes equivalent weekly minutes (moderate + 2x vigorous) for adults/seniors or daily averages for children and teens.',
      },
      {
        id: 'Manekin 3D Prosedural (js/scene3d.js): Menginterpolasi tinggi badan, proporsi anggota gerak, postur bungkuk, dan kecepatan ayunan langkah sesuai slider usia 2-85 tahun.',
        en: 'Procedural 3D Mannequin (js/scene3d.js): Interpolates height, limb proportions, spinal posture, and gait cadence across the 2-85 age range.',
      },
    ],
    verifiedFeatures: [
      {
        name: {
          id: 'Kalkulator Menit Aktif Mingguan (#kalkulator) dengan rumus ekuivalensi WHO',
          en: 'Weekly Active Minutes Calculator (#kalkulator) with WHO equivalence math',
        },
        status: 'Verified Feature',
        evidence: {
          id: 'Diuji dengan Playwright: input 120 menit sedang + 45 menit berat menghasilkan tepat "210 Menit" setara-sedang (120 + 2x45) dan memperbarui cincin progres SVG.',
          en: 'Tested via Playwright: entering 120 moderate + 45 vigorous minutes accurately outputs "210 Menit" moderate-equivalent (120 + 2x45) and updates the SVG progress ring.',
        },
      },
      {
        name: {
          id: 'Manekin 3D prosedural lintas usia + kartu interaktif Mitos vs Fakta & modal artikel',
          en: 'Age-adaptive procedural 3D mannequin + Myth-vs-Fact flip cards & article dialog',
        },
        status: 'Verified Feature',
        evidence: {
          id: 'Kanvas Three.js tampil dan merespons tombol Jeda Gerakan / Reset; kartu Mitos vs Fakta mendukung klik serta atribut aria-pressed.',
          en: 'Three.js canvas renders and responds to Pause/Reset controls; Myth-vs-Fact cards toggle cleanly with aria-pressed support.',
        },
      },
      {
        name: {
          id: 'Panel "Ruang Kerja Admin" & penyuntingan konten lokal',
          en: 'Client-side "Admin Workspace" & local content editor',
        },
        status: 'Prototype',
        evidence: {
          id: 'js/admin.js hanya menyimpan sesi di localStorage/sessionStorage browser dan mengaktifkan sesi admin contoh secara otomatis saat halaman dibuka; bukan sistem autentikasi aman.',
          en: 'js/admin.js stores session state solely in browser localStorage/sessionStorage and auto-seeds a demo admin session on load; it is not real authentication.',
        },
      },
    ],
    decisionsAndChallenges: [
      {
        title: {
          id: 'Membangun karakter 3D edukatif tanpa ketergantungan file model .glb eksternal besar',
          en: 'Building an educational 3D figure without heavy external .glb downloads',
        },
        detail: {
          id: 'Manekin disusun secara prosedural dari primitif geometri Three.js sehingga bobot unduhan awal tetap kecil dan proporsi tubuh dari balita hingga lansia dapat dimorfing secara matematis.',
          en: 'The mannequin is assembled procedurally from Three.js primitives, keeping initial payload small while enabling continuous mathematical morphing across life stages.',
        },
      },
      {
        title: {
          id: 'Batas kewenangan pada repository tim bersama',
          en: 'Authority boundaries on a shared team repository',
        },
        detail: {
          id: 'Karena deployment publik berada di bawah organisasi Vercel ketua tim, perubahan langsung pada repository Seumur Gerak ditandai BLOCKED dan didokumentasikan sebagai rekomendasi remediasi terperinci.',
          en: 'Because the live deployment belongs to the team lead’s Vercel organization, direct repository edits on Seumur Gerak were marked BLOCKED and documented as concrete remediation steps.',
        },
      },
    ],
    limitations: [
      {
        id: 'Mode Admin hanya berupa prototipe browser (localStorage/sessionStorage) tanpa backend; saat halaman publik dibuka pertama kali, bar sesi admin demo muncul otomatis.',
        en: 'Admin Mode is a browser-only prototype (localStorage/sessionStorage) with no backend; on initial load of the live demo, a demo admin session bar activates automatically.',
      },
      {
        id: 'Pada audit live URL (28 Okt 2026), tercatat 4 runtime TypeError (reading "replace" on null), overflow horizontal pada layar mobile 390px (lebar dokumen 523px), serta beberapa label artikel "DRAF-AI" dan placeholder sitasi "[CARI SUMBER]" yang belum difinalisasi tim.',
        en: 'Live URL audit (Oct 28, 2026) recorded 4 runtime TypeErrors (reading "replace" on null), mobile horizontal overflow at 390px (523px scrollWidth), and unfinalized "DRAF-AI" / "[CARI SUMBER]" editorial placeholders.',
      },
      {
        id: 'Kalkulator belum membatasi total menit di atas jumlah menit dalam satu minggu (10.080 menit) dan cincin persentase hanya menghitung komponen kardio.',
        en: 'The calculator does not yet cap combined inputs at total minutes in a week (10,080) and its percentage ring reflects cardio minutes independently of strength days.',
      },
    ],
    qaChecks: [
      {
        check: {
          id: 'Uji perhitungan kalkulator #kalkulator (valid & batas input)',
          en: 'Calculator #kalkulator formula verification (valid & edge inputs)',
        },
        result: 'PASS',
        note: {
          id: 'Perhitungan 120 sedang + 45 berat = 210 menit terverifikasi akurat sesuai pedoman WHO.',
          en: '120 moderate + 45 vigorous = 210 moderate-equivalent minutes verified against WHO formula.',
        },
      },
      {
        check: {
          id: 'Responsivitas viewport mobile 390x844 & kebersihan console error pada live URL',
          en: 'Mobile 390x844 overflow & runtime console cleanliness on live URL',
        },
        result: 'FAIL',
        note: {
          id: 'Ditemukan overflow horizontal (523px pada viewport 390px) dan 4 pageError di situs live; perbaikan langsung ditandai BLOCKED karena repository tim bersama.',
          en: 'Horizontal overflow (523px on 390px viewport) and 4 pageErrors observed on live site; direct repo modification is BLOCKED due to shared team ownership.',
        },
      },
    ],
    screenshots: [
      {
        id: 'seumur-calc-desktop',
        url: '/images/projects/seumur-gerak-desktop.png',
        width: 1440,
        height: 900,
        viewport: 'desktop',
        alt: {
          id: 'Bagian #kalkulator Seumur Gerak pada desktop 1440x900 menampilkan input aktivitas sedang/berat dan capaian 150 Menit target WHO',
          en: 'Seumur Gerak #kalkulator section on 1440x900 desktop showing moderate/vigorous inputs and 150-minute WHO target ring',
        },
        caption: {
          id: 'Kalkulator Aktivitas Mingguan (#kalkulator, 1440x900) - Perhitungan menit setara-sedang WHO.',
          en: 'Weekly Activity Calculator (#kalkulator, 1440x900) - WHO moderate-equivalent minute calculation.',
        },
      },
      {
        id: 'seumur-hero-desktop',
        url: '/images/projects/seumur-gerak-hero.png',
        width: 1440,
        height: 900,
        viewport: 'desktop',
        alt: {
          id: 'Beranda Seumur Gerak menampilkan manekin 3D prosedural interaktif beserta resep gerak usia dewasa',
          en: 'Seumur Gerak hero section showing interactive procedural 3D mannequin and adult movement prescription',
        },
        caption: {
          id: 'Hero & Manekin 3D Prosedural (1440x900) - Visualisasi gerak lintas kelompok usia.',
          en: 'Hero & Procedural 3D Mannequin (1440x900) - Lifespan movement visualization.',
        },
      },
      {
        id: 'seumur-mobile',
        url: '/images/projects/seumur-gerak-mobile.png',
        width: 780,
        height: 1688,
        viewport: 'mobile',
        alt: {
          id: 'Tampilan mobile kalkulator Seumur Gerak pada layar 390x844',
          en: 'Mobile view of Seumur Gerak calculator captured at 390x844',
        },
        caption: {
          id: 'Tampilan Mobile #kalkulator (390x844) - Formulir input dan indikator capaian mingguan.',
          en: 'Mobile #kalkulator View (390x844) - Input controls and weekly target indicator.',
        },
      },
    ],
  },
  {
    id: 'web-sekolah-nusantara',
    slug: 'sekolah-nusantara',
    name: 'Sekolah Nusantara (SMA Negeri 1 Nusantara Raya)',
    subtitle: {
      id: 'Prototipe Portal Informasi Sekolah, Simulasi Alur PPDB & Multi-Role Dashboard',
      en: 'School Information Portal Prototype, PPDB Admission Flow & Multi-Role Dashboard',
    },
    track: 'web',
    featuredTier: 'more',
    order: 4,
    year: '2026',
    status: 'Prototype',
    verifiedAt: '2026-10-28',
    liveUrl: 'https://sekolah-nusantara-teal.vercel.app/',
    liveUrlLabel: 'sekolah-nusantara-teal.vercel.app',
    repoPublicUrl: 'https://github.com/raviazen-ship-it/sekolah-nusantara',
    repoVisibilityNote: {
      id: 'Repository publik GitHub terverifikasi di akun raviazen-ship-it.',
      en: 'Verified public GitHub repository under raviazen-ship-it.',
    },
    canEmbedIframe: true,
    embedUrl: 'https://sekolah-nusantara-teal.vercel.app/',
    interactiveHighlights: [
      {
        id: 'Jelajahi profil sekolah, berita akademik, dan kalender kegiatan',
        en: 'Browse school profile, academic news, and event calendar',
      },
      {
        id: 'Uji formulir pendaftaran siswa baru (PPDB Online) interaktif',
        en: 'Test interactive online admissions registration form (PPDB)',
      },
      {
        id: 'Akses simulasi portal multi-peran (Siswa, Guru, dan Wali Murid)',
        en: 'Access simulated multi-role portals (Student, Teacher, Parent)',
      },
      {
        id: 'Jelajahi dashboard manajemen CMS administrasi sekolah',
        en: 'Explore school administrative CMS management dashboard',
      },
    ],
    capabilities: ['business-websites', 'ui-ux', 'web-development'],
    categoryLabel: {
      id: 'Institutional Portal & Admission Prototype',
      en: 'Institutional Portal & Admission Prototype',
    },
    shortDescription: {
      id: 'Prototipe antarmuka sistem informasi sekolah menengah atas yang mencakup profil akademik, berita & pengumuman, simulasi pendaftaran PPDB 4 jalur, serta tampilan portal siswa, guru, orang tua, dan admin.',
      en: 'High school information system interface prototype covering academic profiles, news and announcements, a 4-track PPDB admission simulation, and student, teacher, parent, and admin portal views.',
    },
    overview: [
      {
        id: 'Sekolah Nusantara merancang konsep satu pintu informasi digital untuk SMA Negeri 1 Nusantara Raya (institusi fiktif untuk demonstrasi desain sistem akademik).',
        en: 'Sekolah Nusantara explores a unified digital portal concept for SMA Negeri 1 Nusantara Raya (a fictional school entity created for academic system UI demonstration).',
      },
      {
        id: 'Fokus utama pengerjaan saat ini adalah perancangan arsitektur halaman publik, simulasi formulir pendaftaran PPDB multi-jalur (Zonasi, Prestasi, Afirmasi, Perpindahan Tugas), serta eksplorasi antarmuka berpindah peran (role-switcher) di sisi client.',
        en: 'Its current scope focuses on public portal information architecture, a multi-track PPDB registration form simulation, and a client-side role-switcher UX exploration.',
      },
    ],
    goals: [
      {
        id: 'Menyatukan informasi publik sekolah (kurikulum, direktori guru, berita, agenda, dan alur PPDB) dalam tata letak yang rapi dan mudah dinavigasi di perangkat mobile maupun desktop.',
        en: 'Unify public school information (curriculum, teacher directory, news, events, and PPDB steps) in a structured layout across mobile and desktop.',
      },
      {
        id: 'Memvalidasi kebutuhan tampilan antarmuka berbeda untuk empat peran pengguna (Admin, Guru, Siswa, dan Wali Murid) melalui prototipe interaktif.',
        en: 'Validate distinct dashboard views for four user roles (Admin, Teacher, Student, and Parent) through an interactive UI prototype.',
      },
    ],
    problem: [
      {
        id: 'Banyak situs sekolah memisahkan halaman profil, papan pengumuman, dan informasi pendaftaran siswa baru tanpa hierarki yang jelas sehingga calon wali murid kesulitan memeriksa jadwal serta kuota jalur masuk.',
        en: 'Many school websites scatter profile pages, announcements, and new-student registration details without clear hierarchy, making it hard for parents to check tracks and quotas.',
      },
    ],
    targetUsers: [
      {
        id: 'Calon siswa dan orang tua/wali yang mencari informasi kurikulum serta alur pendaftaran PPDB.',
        en: 'Prospective students and parents researching curriculum details and admission steps.',
      },
      {
        id: 'Pengelola sekolah yang mengevaluasi rancangan antarmuka portal akademik terpadu.',
        en: 'School administrators evaluating an integrated academic portal interface concept.',
      },
    ],
    role: {
      id: 'UI/UX Designer & Frontend Developer (Proyek Prototipe Portofolio)',
      en: 'UI/UX Designer & Frontend Developer (Portfolio UI Prototype)',
    },
    teamSetup: {
      id: 'Proyek individu pada akun Vercel pemilik.',
      en: 'Individual project under the owner Vercel organization.',
    },
    contributionBoundaries: [
      {
        id: 'Perancangan sistem visual biru-emas institusional, struktur 9 rute halaman publik, formulir simulasi PPDB, dan tampilan dashboard multi-peran.',
        en: 'Design of the navy-and-gold institutional visual system, 9 public routes, PPDB form simulation, and multi-role dashboard views.',
      },
      {
        id: 'Implementasi state simulasi client-side menggunakan React Context + localStorage (belum mencakup backend database maupun autentikasi server).',
        en: 'Implementation of client-side simulation state with React Context + localStorage (does not yet include a database backend or server authentication).',
      },
    ],
    confirmationNote: null,
    simulationNotice: {
      id: 'Prototipe Simulasi - Seluruh nama siswa, guru, nilai, nomor identitas, kuota, dan jadwal PPDB (Mei-Juli 2026) adalah data fiktif untuk simulasi antarmuka, tanpa autentikasi server.',
      en: 'Simulation Prototype - All student/teacher names, grades, ID numbers, quotas, and May-July 2026 PPDB dates are fictional UI simulation data with no server authentication.',
    },
    techStack: [
      'Next.js 16.2.3 (App Router)',
      'React 19.2.4',
      'TypeScript 5',
      'Tailwind CSS 4',
      'Lucide React',
      'Client React Context + localStorage',
    ],
    techVerificationSource: {
      id: 'Diverifikasi langsung dari package.json dan lib/store.tsx (0 route /api/* pada repository; seluruh state berjalan di browser).',
      en: 'Verified directly from package.json and lib/store.tsx (zero /api/* routes in the repository; all state runs in the browser).',
    },
    architectureFlow: [
      {
        id: 'Halaman Publik Statis & Dinamis Client: Beranda, Profil, Akademik, Berita, Pengumuman, PPDB, dan Kontak merender data contoh dari store React Context.',
        en: 'Public Portal Pages: Home, Profile, Academics, News, Announcements, PPDB, and Contact render structured demo records from React Context.',
      },
      {
        id: 'Simulasi Role Switcher (lib/store.tsx): Bar "Simulasi Akses" di bagian atas memungkinkan pengunjung mengganti tampilan antara peran Admin, Guru, Siswa, dan Wali Murid di memori browser.',
        en: 'Role Switcher Simulation (lib/store.tsx): The top "Simulasi Akses" bar lets visitors preview Admin, Teacher, Student, and Parent views in browser memory.',
      },
    ],
    verifiedFeatures: [
      {
        name: {
          id: 'Navigasi halaman profil, kurikulum, berita, pengumuman, dan pencarian informasi',
          en: 'School profile, curriculum, news, announcements, and search navigation',
        },
        status: 'Verified Feature',
        evidence: {
          id: 'Seluruh halaman publik merender HTTP 200 tanpa console error maupun overflow horizontal pada desktop (1440x900) dan mobile (390x844).',
          en: 'All public pages render HTTP 200 with zero console errors and zero horizontal overflow on desktop (1440x900) and mobile (390x844).',
        },
      },
      {
        name: {
          id: 'Formulir simulasi pendaftaran PPDB & pelacakan nomor pendaftaran lokal',
          en: 'PPDB registration form simulation & local registration number lookup',
        },
        status: 'Interactive Demo',
        evidence: {
          id: 'Diuji pada /ppdb: pengajuan berkas baru tersimpan di localStorage browser pengunjung untuk keperluan pratinjau alur.',
          en: 'Tested on /ppdb: submitting a simulated application stores the record in the visitor’s browser localStorage for flow preview.',
        },
      },
      {
        name: {
          id: 'Portal Siswa, Guru, Wali, dan Administrator (/portal/* & /admin)',
          en: 'Student, Teacher, Parent, and Administrator portals (/portal/* & /admin)',
        },
        status: 'Prototype',
        evidence: {
          id: 'Tidak memiliki autentikasi atau otorisasi server; seluruh rute dapat dibuka langsung untuk demonstrasi UI.',
          en: 'Has no server authentication or role enforcement; routes open directly for UI demonstration.',
        },
      },
    ],
    decisionsAndChallenges: [
      {
        title: {
          id: 'Transparansi status prototipe dan audit data demo',
          en: 'Prototype status transparency and demo data hygiene',
        },
        detail: {
          id: 'Audit tanggal 28 Oktober 2026 mencatat bahwa jadwal PPDB Mei-Juli 2026 pada deployment publik masih berlabel "BUKA" dan memakai format NIK 16 digit yang tampak realistis. Pada source lokal, data tersebut telah disanitasi menjadi penanda fiktif eksplisit serta diberi banner simulasi (menunggu redeploy).',
          en: 'Our Oct 28, 2026 audit noted that May-July 2026 PPDB dates on the live deployment still showed as "OPEN" and used realistic-looking 16-digit ID formats. Local source has been sanitized with explicit fictional markers and a simulation banner (awaiting redeployment).',
        },
      },
    ],
    limitations: [
      {
        id: 'Belum memiliki backend API, database, maupun autentikasi/otorisasi berbasis sesi server; tidak boleh digunakan untuk menyimpan data siswa sungguhan sebelum backend dibangun.',
        en: 'No backend API, database, or server-side authentication/authorization; must not be used for real student records until a backend is built.',
      },
      {
        id: 'Pada deployment publik saat ini, pengunjung otomatis masuk ke simulasi peran Administrator saat halaman dimuat dan jadwal PPDB Mei-Juli 2026 sudah melewati tanggal kalender berjalan.',
        en: 'On the current live deployment, visitors auto-enter the simulated Administrator view on load, and the May-July 2026 PPDB schedule is past the current calendar date.',
      },
    ],
    qaChecks: [
      {
        check: {
          id: 'Responsivitas halaman publik & simulasi formulir /ppdb',
          en: 'Public page responsiveness & /ppdb form simulation',
        },
        result: 'PASS',
        note: {
          id: '0 console error dan tata letak bersih pada viewport 390x844 serta 1440x900.',
          en: '0 console errors and clean layout at both 390x844 and 1440x900 viewports.',
        },
      },
      {
        check: {
          id: 'Pembatasan akses rute /admin dan /portal/* di sisi server pada live URL',
          en: 'Server-side route protection for /admin and /portal/* on live URL',
        },
        result: 'FAIL',
        note: {
          id: 'Aplikasi memang belum memiliki backend autentikasi (diklasifikasikan secara jujur sebagai Prototype; sanitasi data demo & non-auto-admin disiapkan di source lokal).',
          en: 'Application has no auth backend yet (honestly classified as Prototype; demo data sanitization and default guest state prepared in local source).',
        },
      },
    ],
    screenshots: [
      {
        id: 'sekolah-desktop',
        url: '/images/projects/sekolah-nusantara-desktop.png',
        width: 1440,
        height: 900,
        viewport: 'desktop',
        alt: {
          id: 'Beranda desktop Sekolah Nusantara (SMA Negeri 1 Nusantara Raya) pada 1440x900',
          en: 'Desktop homepage of Sekolah Nusantara (SMA Negeri 1 Nusantara Raya) at 1440x900',
        },
        caption: {
          id: 'Beranda Portal Sekolah (1440x900) - Ringkasan akademik, navigasi publik, dan indikator kuota simulasi.',
          en: 'School Portal Homepage (1440x900) - Academic overview, public navigation, and simulated quota card.',
        },
      },
      {
        id: 'sekolah-ppdb',
        url: '/images/projects/sekolah-nusantara-ppdb.png',
        width: 1440,
        height: 900,
        viewport: 'desktop',
        alt: {
          id: 'Halaman informasi dan simulasi pendaftaran PPDB Sekolah Nusantara pada 1440x900',
          en: 'PPDB admission simulation page of Sekolah Nusantara at 1440x900',
        },
        caption: {
          id: 'Halaman Simulasi PPDB (/ppdb) - Pemilihan jalur pendaftaran dan pemeriksaan status berkas demo.',
          en: 'PPDB Simulation Page (/ppdb) - Admission track overview and demo application lookup.',
        },
      },
      {
        id: 'sekolah-mobile',
        url: '/images/projects/sekolah-nusantara-mobile.png',
        width: 780,
        height: 1688,
        viewport: 'mobile',
        alt: {
          id: 'Tampilan mobile Sekolah Nusantara pada viewport 390x844',
          en: 'Mobile view of Sekolah Nusantara captured at 390x844',
        },
        caption: {
          id: 'Tampilan Mobile (390x844) - Navigasi responsif satu tangan tanpa overflow horizontal.',
          en: 'Mobile View (390x844) - Single-hand responsive navigation with zero horizontal overflow.',
        },
      },
    ],
  },
  {
    id: 'web-symbioflow-enterprise',
    slug: 'symbioflow-enterprise',
    name: 'SymbioFlow Enterprise v4.0',
    subtitle: {
      id: 'Eksplorasi UI B2B Circular Marketplace, 3D Digital Twin Inspector & Kalkulator Trade Finance',
      en: 'B2B Circular Marketplace UI Exploration, 3D Digital Twin Inspector & Trade Finance Calculators',
    },
    track: 'web',
    featuredTier: 'more',
    order: 5,
    year: '2026',
    status: 'Interactive Demo',
    verifiedAt: '2026-10-28',
    liveUrl: 'https://symbioflow-enterprise.vercel.app/',
    liveUrlLabel: 'symbioflow-enterprise.vercel.app',
    repoPublicUrl: 'https://github.com/raviazen-ship-it/symbioflow-enterprise',
    repoVisibilityNote: {
      id: 'Repository publik GitHub terverifikasi di akun raviazen-ship-it.',
      en: 'Verified public GitHub repository under raviazen-ship-it.',
    },
    canEmbedIframe: true,
    embedUrl: 'https://symbioflow-enterprise.vercel.app/',
    interactiveHighlights: [
      {
        id: 'Inspeksi jejak audit ESG dengan verifikasi checksum FNV-1a',
        en: 'Inspect ESG audit trail with deterministic FNV-1a checksums',
      },
      {
        id: 'Simulasikan perdagangan kredit karbon pada terminal bursa real-time',
        en: 'Simulate carbon credit trading on the real-time exchange terminal',
      },
      {
        id: 'Periksa rincian emisi Scope 1, 2, dan 3 per fasilitas industri',
        en: 'Review Scope 1, 2, and 3 emission breakdowns per industrial facility',
      },
      {
        id: 'Uji filter status kepatuhan regulasi lingkungan',
        en: 'Test environmental regulatory compliance status filters',
      },
    ],
    capabilities: ['interactive-3d', 'ui-ux', 'web-development', 'business-websites'],
    categoryLabel: {
      id: 'Enterprise Concept Demo & 3D Inspector',
      en: 'Enterprise Concept Demo & 3D Inspector',
    },
    shortDescription: {
      id: 'Eksplorasi antarmuka produk B2B ekonomi sirkular untuk perdagangan material sekunder industri, memadukan inspektor 3D WebGL tiga mode, kalkulator koreksi kadar air (dry-basis), simulasi pencairan Net-60, dan estimasi karbon Scope-3.',
      en: 'B2B circular-economy product interface exploration for secondary industrial materials, combining a 3-mode WebGL 3D inspector, dry-basis moisture settlement math, Net-60 factoring calculator, and Scope-3 carbon estimation.',
    },
    overview: [
      {
        id: 'SymbioFlow Enterprise memvisualisasikan konsep platform perdagangan limbah/material sampingan industri terverifikasi (seperti cangkang sawit PKS, silika sekam padi, dan fly ash) antara pabrik penghasil dan pabrik pemanfaat.',
        en: 'SymbioFlow Enterprise visualizes a B2B trading platform concept for secondary industrial materials (such as palm kernel shell, rice husk silica, and fly ash) between generator plants and industrial off-takers.',
      },
      {
        id: 'Aplikasi ini dibangun sebagai single-page interactive concept demo: sebagian modul memiliki perhitungan matematis dan interaksi 3D nyata di browser, sementara modul integrasi pihak ketiga (AI OCR PDF, ERP SAP webhook, KYB KLHK, video call gudang) merupakan simulasi alur presentasi.',
        en: 'Built as a single-page interactive concept demo: several modules execute real browser-side 3D rendering and settlement math, whereas external enterprise integrations (AI PDF OCR, SAP ERP webhooks, government KYB, warehouse video calls) are presentation-level simulations.',
      },
    ],
    goals: [
      {
        id: 'Mendemonstrasikan kemampuan merancang dashboard B2B padat data (data-dense UI) dengan navigasi tahap end-to-end dan command palette (Ctrl+K).',
        en: 'Demonstrate data-dense B2B dashboard design with end-to-end workflow stages and a keyboard command palette (Ctrl+K).',
      },
      {
        id: 'Membangun komponen 3D WebGL Digital Twin dan kalkulator koreksi harga berbasis kualitas fisik material (kadar air / moisture penalty) yang dapat diuji langsung.',
        en: 'Build an interactive WebGL 3D Digital Twin inspector and physical quality settlement calculators (dry-basis moisture adjustment) testable right in the browser.',
      },
    ],
    problem: [
      {
        id: 'Perdagangan material sekunder B2B melibatkan variabel teknis (kadar air, kadar abu, kemasan FIBC 20ft, serta termin pembayaran Net-60) yang sulit dijelaskan hanya lewat slide presentasi statis.',
        en: 'Secondary industrial material trading involves technical variables (moisture content, ash percentage, 20ft FIBC container loading, and Net-60 payment terms) that static pitch slides struggle to convey.',
      },
    ],
    targetUsers: [
      {
        id: 'Pemangku kepentingan produk atau tim bisnis industri yang meninjau konsep platform pasar material sirkular.',
        en: 'Product stakeholders or industrial business teams evaluating a circular-materials marketplace concept.',
      },
      {
        id: 'Perekrut produk/frontend yang menilai kemampuan perancangan antarmuka dashboard kompleks serta integrasi Three.js.',
        en: 'Product and frontend recruiters evaluating complex dashboard UI design and custom Three.js integration.',
      },
    ],
    role: {
      id: 'Product Concept Designer & Frontend / 3D Developer (Proyek Eksplorasi Mandiri)',
      en: 'Product Concept Designer & Frontend / 3D Developer (Independent Concept Exploration)',
    },
    teamSetup: {
      id: 'Proyek eksplorasi individu pada akun Vercel pemilik.',
      en: 'Individual concept exploration under the owner Vercel organization.',
    },
    contributionBoundaries: [
      {
        id: 'Perancangan sistem desain industrial dark-slate & emerald (didokumentasikan di DESIGN.md proyek), 7 tab modul, serta command palette.',
        en: 'Design of the industrial dark-slate and emerald visual system (documented in the project’s DESIGN.md), 7 workflow modules, and command palette.',
      },
      {
        id: 'Implementasi kanvas Three.js 3 mode (partikel granular, kontainer FIBC 20ft, jaringan simbiosis), kalkulator dry-basis moisture QC, kalkulator anjak piutang Net-60, dan unduhan ringkasan .txt.',
        en: 'Implementation of the 3-mode Three.js canvas (granular particles, 20ft FIBC container, symbiosis network), dry-basis moisture QC calculator, Net-60 factoring calculator, and .txt report export.',
      },
    ],
    confirmationNote: null,
    simulationNotice: {
      id: 'Demo Konsep Interaktif - Seluruh angka transaksi, saldo escrow, status KYB/KLHK, AI Lab Scanner, dan integrasi ERP di dalam aplikasi ini adalah simulasi state memori browser (tanpa backend).',
      en: 'Interactive Concept Demo - All transaction figures, escrow balances, KYB/KLHK badges, AI Lab Scanner progress bars, and ERP webhooks in this app are in-memory browser simulations with no backend.',
    },
    techStack: [
      'Vite 6.1',
      'React 18.3',
      'TypeScript 5.7',
      'Three.js 0.173 (Custom WebGL Renderer)',
      'Tailwind CSS 3.4',
      'Lucide React',
    ],
    techVerificationSource: {
      id: 'Diverifikasi langsung dari package.json dan src/App.tsx pada repository lokal.',
      en: 'Verified directly from package.json and src/App.tsx in the local repository.',
    },
    architectureFlow: [
      {
        id: 'State In-Memory Terpadu (React Hooks): Seluruh perpindahan 7 modul utama, filter komoditas spot, pengajuan penawaran tender simulasi, dan mode peran (Buyer, Supplier, Financier, Auditor) berjalan di memori client.',
        en: 'In-Memory Client State (React Hooks): Navigation across all 7 modules, spot commodity filters, simulated tender bids, and role perspectives run in client memory.',
      },
      {
        id: 'Three.js Inspector Kustom: Merender tiga skema geometri (struktur partikel komoditas, muatan kontainer 20ft dengan toggle X-Ray/Exploded View, dan graf simpul logistik) secara prosedural.',
        en: 'Custom Three.js Inspector: Procedurally renders three scene modes (commodity particle lattice, 20ft container load with X-Ray/Exploded toggles, and logistics node graph).',
      },
      {
        id: 'Mesin Kalkulasi Settlement & ESG: Menghitung penyesuaian tonase kering terhadap deviasi kadar air laboratorium, diskon pencairan dini Net-60, serta selisih emisi CO2e Scope-3.',
        en: 'Settlement & ESG Calculators: Computes dry-tonnage payout adjustments from lab moisture variance, early Net-60 factoring discounts, and Scope-3 CO2e savings.',
      },
    ],
    verifiedFeatures: [
      {
        name: {
          id: '3D WebGL Digital Twin Inspector (3 mode geometri + Wireframe / Thermal X-Ray / Exploded View)',
          en: '3D WebGL Digital Twin Inspector (3 scene modes + Wireframe / Thermal X-Ray / Exploded View)',
        },
        status: 'Verified Feature',
        evidence: {
          id: 'Diuji dengan Playwright: kanvas WebGL aktif, perpindahan tab "2. 3D & Bursa" dan penggantian mode scene bekerja tanpa error konsol.',
          en: 'Tested via Playwright: active WebGL canvas verified; switching to "2. 3D & Bursa" and toggling scene modes works with zero console errors.',
        },
      },
      {
        name: {
          id: 'Kalkulator Dynamic Moisture QC, kalkulator Net-60 Factoring, estimasi karbon Scope-3, & ekspor laporan .txt',
          en: 'Dynamic Moisture QC calculator, Net-60 Factoring calculator, Scope-3 carbon estimator, & .txt export',
        },
        status: 'Interactive Demo',
        evidence: {
          id: 'Rumus matematika berjalan reaktif saat slider diubah di browser; seluruh data bersifat simulasi in-memory dan kembali ke awal saat halaman dimuat ulang.',
          en: 'Formulas recompute reactively as sliders move in the browser; all records are in-memory simulations and reset on page refresh.',
        },
      },
      {
        name: {
          id: 'AI Lab Scanner (COA PDF), Deal Room Chat, Video Call Gudang, KYB NIB/KLHK, & ERP SAP Webhook',
          en: 'AI Lab Scanner (COA PDF), Deal Room Chat, Warehouse Video Call, KYB NIB/KLHK, & SAP ERP Webhook',
        },
        status: 'Prototype',
        evidence: {
          id: 'Menggunakan animasi progres setInterval/setTimeout dan respons bot terjadwal untuk mengilustrasikan alur konsep masa depan; bukan integrasi API eksternal nyata.',
          en: 'Uses setInterval/setTimeout progress animations and scripted bot replies to illustrate future enterprise workflows; no external APIs are connected.',
        },
      },
    ],
    decisionsAndChallenges: [
      {
        title: {
          id: 'Membedakan kalkulator fungsional dari elemen presentasi konsep secara jujur',
          en: 'Clearly separating working calculators from concept presentation mocks',
        },
        detail: {
          id: 'Karena UI SymbioFlow menampilkan istilah kepatuhan korporat (seperti NIB, KLHK, dan hash audit), studi kasus ini secara tegas menjelaskan bahwa fitur tersebut adalah mockup alur produk dan hash yang dipakai di kode merupakan hash 32-bit FNV ilustratif, bukan sertifikasi keamanan.',
          en: 'Because SymbioFlow’s UI displays enterprise compliance terminology (NIB, KLHK, audit hashes), this case study explicitly clarifies that those badges are workflow mockups and the in-code hash is an illustrative 32-bit FNV function rather than a security certification.',
        },
      },
    ],
    limitations: [
      {
        id: 'Tidak memiliki backend, database, maupun autentikasi; seluruh perubahan tender, chat, atau status kembali ke nilai awal ketika halaman di-refresh.',
        en: 'No backend, database, or authentication; all simulated bids, chat messages, and state toggles reset on page reload.',
      },
      {
        id: 'Arsitektur kode saat ini masih terkonsentrasi pada satu berkas komponen besar (src/App.tsx ~4.890 baris) yang perlu dipecah per domain modul untuk pemeliharaan jangka panjang.',
        en: 'Source code is currently concentrated in a single monolithic component (src/App.tsx ~4,890 lines) that should be split by domain module for long-term maintainability.',
      },
      {
        id: 'Label kepatuhan pada antarmuka demo (seperti status KLHK, API Uptime 99.99%, dan teks SHA-256) merupakan elemen ilustratif prototipe, bukan klaim operasional yang terverifikasi.',
        en: 'Compliance labels inside the demo UI (such as KLHK status, 99.99% API uptime, and SHA-256 copy) are illustrative prototype elements rather than verified operational claims.',
      },
    ],
    qaChecks: [
      {
        check: {
          id: 'Render WebGL Digital Twin, perpindahan 7 tab modul, & responsivitas 390x844 / 1440x900',
          en: 'WebGL Digital Twin render, 7-module tab switching, & 390x844 / 1440x900 responsiveness',
        },
        result: 'PASS',
        note: {
          id: '0 console error, 0 page error, dan 0 horizontal overflow pada desktop maupun mobile.',
          en: '0 console errors, 0 page errors, and 0 horizontal overflow on both desktop and mobile.',
        },
      },
    ],
    screenshots: [
      {
        id: 'symbioflow-desktop',
        url: '/images/projects/symbioflow-enterprise-desktop.png',
        width: 1440,
        height: 900,
        viewport: 'desktop',
        alt: {
          id: 'Tampilan desktop SymbioFlow Enterprise v4.0 memperlihatkan alur kerja 7 tahap dan 3D WebGL Digital Twin Inspector',
          en: 'SymbioFlow Enterprise v4.0 desktop view showing the 7-stage workflow and 3D WebGL Digital Twin Inspector',
        },
        caption: {
          id: 'Workspace Utama (1440x900) - Navigasi 7 tahap operasional dan inspektor 3D partikel komoditas.',
          en: 'Main Workspace (1440x900) - 7-stage operational navigation and commodity particle 3D inspector.',
        },
      },
      {
        id: 'symbioflow-bursa',
        url: '/images/projects/symbioflow-enterprise-bursa.png',
        width: 1440,
        height: 900,
        viewport: 'desktop',
        alt: {
          id: 'Modul 2 (3D & Bursa) pada SymbioFlow Enterprise menampilkan bursa material sekunder dan kontrol inspeksi WebGL',
          en: 'Module 2 (3D & Exchange) in SymbioFlow Enterprise displaying secondary material listings and WebGL inspection controls',
        },
        caption: {
          id: 'Modul 3D & Bursa Komoditas (1440x900) - Filter material sirkular dan telemetri kanvas 3D.',
          en: '3D & Commodity Exchange Module (1440x900) - Circular material filters and 3D canvas telemetry.',
        },
      },
      {
        id: 'symbioflow-mobile',
        url: '/images/projects/symbioflow-enterprise-mobile.png',
        width: 780,
        height: 1688,
        viewport: 'mobile',
        alt: {
          id: 'Tampilan mobile SymbioFlow Enterprise v4.0 pada viewport 390x844',
          en: 'Mobile view of SymbioFlow Enterprise v4.0 captured at 390x844',
        },
        caption: {
          id: 'Tampilan Mobile (390x844) - Adaptasi kartu alur kerja dan kanvas 3D pada layar vertikal.',
          en: 'Mobile View (390x844) - Responsive workflow cards and 3D canvas on portrait screens.',
        },
      },
    ],
  },
];

export function getWebProjectBySlug(slug: string): WebProjectCaseStudy | null {
  return WEB_PROJECTS.find((item) => item.slug === slug) || null;
}

export function getFeaturedWebProjects(): WebProjectCaseStudy[] {
  return WEB_PROJECTS.filter((item) => item.featuredTier === 'featured').sort(
    (a, b) => a.order - b.order
  );
}

export function getMoreWebProjects(): WebProjectCaseStudy[] {
  return WEB_PROJECTS.filter((item) => item.featuredTier === 'more').sort(
    (a, b) => a.order - b.order
  );
}

export function getAdjacentWebProject(currentSlug: string): WebProjectCaseStudy {
  const idx = WEB_PROJECTS.findIndex((item) => item.slug === currentSlug);
  if (idx === -1) return WEB_PROJECTS[0];
  return WEB_PROJECTS[(idx + 1) % WEB_PROJECTS.length];
}

export function pickLocale(text: LocalizedText, locale: Locale): string {
  return locale === 'en' ? text.en : text.id;
}
