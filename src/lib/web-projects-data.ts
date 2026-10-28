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

export interface WorkflowStepItem {
  step: string;
  title: LocalizedText;
  summary: LocalizedText;
  input: LocalizedText;
  process: LocalizedText;
  output: LocalizedText;
  badge: LocalizedText;
}

export interface ScenarioExampleItem {
  id: string;
  title: LocalizedText;
  category: LocalizedText;
  description: LocalizedText;
  sampleData: { label: LocalizedText; value: string }[];
  expectedResult: LocalizedText;
  actionHint: LocalizedText;
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
  workflowSteps: WorkflowStepItem[];
  scenarioExamples: ScenarioExampleItem[];
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
    workflowSteps: [
      {
        step: '01',
        title: {
          id: 'Katalog & Penyaringan Alergen',
          en: 'Catalog & Allergen Filtering',
        },
        summary: {
          id: 'Pengunjung menelusuri etalase kuliner sourdough dan menyaring produk berdasarkan pantangan alergen atau preferensi diet.',
          en: 'Visitors browse the artisan sourdough catalog and filter products based on dietary preferences or allergen warnings.',
        },
        input: {
          id: 'Filter alergen (kacang, gluten, telur, susu) dan kategori produk kuliner.',
          en: 'Allergen filters (nuts, gluten, eggs, dairy) and culinary product categories.',
        },
        process: {
          id: 'Penyaringan instan sisi klien terhadap data produk SQLite tanpa reload halaman.',
          en: 'Instant client-side filtering against SQLite product records without page reloads.',
        },
        output: {
          id: 'Daftar produk aman konsumsi dengan badge alergen dan stok harian transparan.',
          en: 'Filtered culinary product list with visible allergen indicators and daily quotas.',
        },
        badge: {
          id: 'Katalog & Menu',
          en: 'Catalog & Menu',
        },
      },
      {
        step: '02',
        title: {
          id: 'Pemilihan Varian & Minimum Pemesanan (MOQ)',
          en: 'Variant Selection & Minimum Order Quantity',
        },
        summary: {
          id: 'Memilih varian porsi (Whole Loaf / Half), kuantitas snack box katering, serta catatan preferensi panggangan.',
          en: 'Choosing loaf portion variants, catering snack box counts, and specific bakery prep notes.',
        },
        input: {
          id: 'Pilihan varian ukuran, kuantitas katering (min. 10 pax), dan catatan kustom adonan.',
          en: 'Portion variant choice, catering quantities (min. 10 pax), and custom bakery notes.',
        },
        process: {
          id: 'Validasi aturan MOQ katering dan perhitungan subtotal harga berbasis kuantitas.',
          en: 'Enforcing catering MOQ rules and calculating tiered quantity subtotal prices.',
        },
        output: {
          id: 'Item tervalidasi masuk ke state keranjang belanja dengan rincian harga akurat.',
          en: 'Validated item added to cart state with itemized pricing details.',
        },
        badge: {
          id: 'Konfigurasi Varian',
          en: 'Variant Config',
        },
      },
      {
        step: '03',
        title: {
          id: 'Keranjang Belanja & Validasi Kode Promo',
          en: 'Cart Drawer & Promo Code Validation',
        },
        summary: {
          id: 'Mengecek isi keranjang belanja, menentukan tanggal pre-order, dan mengklaim voucher diskon.',
          en: 'Reviewing cart contents, selecting pre-order baking dates, and applying promo vouchers.',
        },
        input: {
          id: 'Kode voucher (contoh: DISKON10) dan pilihan tanggal jadwal pengiriman.',
          en: 'Voucher code (e.g. DISKON10) and chosen delivery or pickup date.',
        },
        process: {
          id: 'Request API ke endpoint /api/promo/validate untuk verifikasi syarat & nilai voucher.',
          en: 'API request to /api/promo/validate verifying discount rules and limits.',
        },
        output: {
          id: 'Potongan harga langsung teraplikasi dan subtotal bersih diperbarui secara real-time.',
          en: 'Applied discount deduction and dynamically updated net total.',
        },
        badge: {
          id: 'Kalkulasi Promo',
          en: 'Promo Validation',
        },
      },
      {
        step: '04',
        title: {
          id: 'Formulir Checkout & Simulasi Pembayaran Multisaluran',
          en: 'Checkout Form & Multi-Channel Payment Simulation',
        },
        summary: {
          id: 'Pelanggan mengisi kontak pengiriman dan memilih metode pembayaran QRIS atau Transfer Bank.',
          en: 'Customer enters delivery contact details and chooses QRIS or Bank Transfer payment.',
        },
        input: {
          id: 'Nama penerima, nomor WhatsApp, alamat lengkap pengiriman, dan metode bayar.',
          en: 'Recipient name, WhatsApp phone number, shipping address, and payment method.',
        },
        process: {
          id: 'Penerbitan instruksi pembayaran simulasi otomatis dan pencatatan transaksi ke SQLite.',
          en: 'Generating simulated payment instructions and committing transaction records to SQLite.',
        },
        output: {
          id: 'Kode QRIS dinamis simulasi / nomor virtual account transfer bank dengan batas waktu.',
          en: 'Simulated dynamic QRIS code / bank virtual account number with countdown.',
        },
        badge: {
          id: 'Checkout Gateway',
          en: 'Checkout Gateway',
        },
      },
      {
        step: '05',
        title: {
          id: 'Penerbitan Token & Pelacakan Pesanan Publik',
          en: 'Token Generation & Public Order Tracking',
        },
        summary: {
          id: 'Sistem menerbitkan token pelacakan publik untuk memantau status pesanan dan sinkronisasi dapur.',
          en: 'System generates a public tracking token to monitor order status and kitchen batch sync.',
        },
        input: {
          id: 'Nomor faktur pesanan dan token kriptografis pelacakan pesanan publik.',
          en: 'Order invoice number and unique cryptographic tracking token.',
        },
        process: {
          id: 'Query status pesanan dari basis data dan sinkronisasi antrean dapur (/admin/produksi).',
          en: 'Database query for order state and synchronization with kitchen queue (/admin/produksi).',
        },
        output: {
          id: 'Timeline status pesanan interaktif (Pesanan Diterima, Sedang Dipanggang, Siap Dikirim).',
          en: 'Interactive order timeline (Order Received, Baking in Oven, Ready for Delivery).',
        },
        badge: {
          id: 'Lacak Pesanan',
          en: 'Order Tracking',
        },
      },
    ],
    scenarioExamples: [
      {
        id: 'bakery-sc-1',
        title: {
          id: 'Pemesanan Roti Sourdough dengan Catatan Khusus',
          en: 'Artisan Sourdough Order with Custom Notes',
        },
        category: {
          id: 'Katalog & Pre-Order',
          en: 'Catalog & Pre-Order',
        },
        description: {
          id: 'Pelanggan memilih roti sourdough klasik untuk sarapan dengan permintaan potongan tipis pada jadwal pagi hari.',
          en: 'Customer orders a classic sourdough loaf for breakfast requesting thin slices for a morning slot.',
        },
        sampleData: [
          { label: { id: 'Produk', en: 'Product' }, value: 'Artisan Sourdough Country Loaf' },
          { label: { id: 'Varian Ukuran', en: 'Size Variant' }, value: 'Whole Loaf (850g)' },
          { label: { id: 'Catatan Khusus', en: 'Custom Note' }, value: 'Mohon diiris tipis 1.2 cm untuk sarapan' },
          { label: { id: 'Jadwal Ambil', en: 'Pickup Schedule' }, value: 'Besok Pukul 08.30 WIB' },
        ],
        expectedResult: {
          id: 'Subtotal Rp45.000, kuota oven tanggal besok tervalidasi aman, pesanan tercatat di batch dapur.',
          en: 'Subtotal Rp45,000, tomorrow oven quota confirmed, order queued in kitchen batch.',
        },
        actionHint: {
          id: 'Buka menu /produk di aplikasi live, pilih Country Loaf, dan ketik catatan pada form keranjang.',
          en: 'Open /produk in the live app, choose Country Loaf, and type instructions in cart note.',
        },
      },
      {
        id: 'bakery-sc-2',
        title: {
          id: 'Simulasi Katering Rapat Kantor (Validasi MOQ)',
          en: 'Office Meeting Catering Simulation (MOQ Enforcement)',
        },
        category: {
          id: 'Katering Korporat',
          en: 'Corporate Catering',
        },
        description: {
          id: 'Koordinator acara memesan snack box rapat kantor dan memverifikasi batas minimum pemesanan 10 kotak.',
          en: 'Event organizer orders corporate meeting snack boxes and tests the 10-box minimum order rule.',
        },
        sampleData: [
          { label: { id: 'Paket Katering', en: 'Catering Package' }, value: 'Executive Snack Box (3 Pastry + Cold Brew)' },
          { label: { id: 'Kuantitas Pesanan', en: 'Order Quantity' }, value: '25 Box (Syarat MOQ: 10 Box)' },
          { label: { id: 'Diskon Volume', en: 'Volume Discount' }, value: 'Potongan otomatis 5% untuk pesanan di atas 20 box' },
        ],
        expectedResult: {
          id: 'Validasi MOQ lolos, diskon volume aktif otomatis, total kalkulasi Rp831.250 dengan rincian box jelas.',
          en: 'MOQ validation passes, automatic volume discount applied, total Rp831,250 with clear breakdown.',
        },
        actionHint: {
          id: 'Pilih kategori Katering di katalog, naikkan counter kuantitas ke 25 box, dan periksa ringkasan di keranjang.',
          en: 'Select Catering in catalog, increase quantity counter to 25 boxes, and verify cart summary.',
        },
      },
      {
        id: 'bakery-sc-3',
        title: {
          id: 'Penerapan Voucher Promo & Checkout QRIS Dinamis',
          en: 'Promo Voucher Application & Dynamic QRIS Checkout',
        },
        category: {
          id: 'Simulasi Pembayaran',
          en: 'Payment Simulation',
        },
        description: {
          id: 'Pengguna memasukkan kode promo DISKON10 dan menyelesaikan simulasi transaksi menggunakan QRIS.',
          en: 'User applies voucher code DISKON10 and completes simulated transaction with QRIS.',
        },
        sampleData: [
          { label: { id: 'Kode Kupon', en: 'Coupon Code' }, value: 'DISKON10 (Potongan Rp10.000)' },
          { label: { id: 'Metode Bayar', en: 'Payment Option' }, value: 'QRIS Dinamis Otomatis' },
          { label: { id: 'Nomor Order Diterbitkan', en: 'Issued Order ID' }, value: 'ORD-2026-0412' },
        ],
        expectedResult: {
          id: 'Kupon divalidasi via API, potongan Rp10.000 teraplikasi, tampilan QRIS simulasi tampil dengan token pelacakan.',
          en: 'Coupon verified via API, Rp10,000 deducted, simulated QRIS code generated with tracking token.',
        },
        actionHint: {
          id: 'Buka drawer keranjang, ketik DISKON10 pada input voucher, klik Terapkan, lalu lanjutkan ke Checkout.',
          en: 'Open cart drawer, enter DISKON10 in promo field, click Apply, then proceed to Checkout.',
        },
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
    workflowSteps: [
      {
        step: '01',
        title: {
          id: 'Konfigurasi Dimensi Lahan & Sempadan (GSB)',
          en: 'Plot Dimensions & Setback (GSB) Configuration',
        },
        summary: {
          id: 'Pengguna mengatur ukuran kavling tanah; sistem memvalidasi Koefisien Dasar Bangunan (KDB) dan sempadan jalan.',
          en: 'User configures plot size; system validates Building Coverage Ratio (KDB) and street setback rules.',
        },
        input: {
          id: 'Dimensi lebar kavling (m), panjang kavling (m), dan batas sempadan muka/samping.',
          en: 'Lot width (m), lot length (m), and front/side setback clearance parameters.',
        },
        process: {
          id: 'Validasi geometri kavling parametrik dan perhitungan luas tapak efektif bangunan.',
          en: 'Parametric plot geometry validation and effective building footprint calculation.',
        },
        output: {
          id: 'Batas tapak 3D interaktif dengan garis batas sempadan warna hijau (aman) atau merah (melebihi batas).',
          en: 'Interactive 3D lot boundary with color-coded setback lines indicating regulatory compliance.',
        },
        badge: {
          id: 'Parameter Lahan',
          en: 'Plot Parameters',
        },
      },
      {
        step: '02',
        title: {
          id: 'Rendering Viewport 3D WebGL (Orbit, Pan, Zoom)',
          en: '3D WebGL Viewport Rendering (Orbit, Pan, Zoom)',
        },
        summary: {
          id: 'Mesin rendering Three.js merender struktur bangunan secara modular dan parametrik dalam 60 FPS.',
          en: 'Three.js rendering engine displays modular parametric building structures at a smooth 60 FPS.',
        },
        input: {
          id: 'Pilihan tipe hunian (1 Lantai, 2 Lantai, Split-Level) dan gaya fasad eksterior.',
          en: 'Housing archetype selection (Single, 2-Story, Split-Level) and facade styling.',
        },
        process: {
          id: 'Kalkulasi geometri mesh prosedural, material PBR dengan normal map, dan kalkulasi bayangan.',
          en: 'Procedural mesh geometry calculation, PBR materials with normal maps, and dynamic shadows.',
        },
        output: {
          id: 'Model 3D arsitektur responsif dengan kontrol orbital kamera 360 derajat.',
          en: 'Responsive 3D architectural model with smooth 360-degree orbital camera controls.',
        },
        badge: {
          id: 'Engine 3D WebGL',
          en: '3D WebGL Engine',
        },
      },
      {
        step: '03',
        title: {
          id: 'Simulasi Jam Matahari & Pencahayaan Alami (Daylight Study)',
          en: 'Sun Angle & Daylight Study Simulation',
        },
        summary: {
          id: 'Menggeser slider jam matahari dari pagi hingga sore hari untuk memantau arah bayangan dan ventilasi cahaya.',
          en: 'Adjusting solar time slider from dawn to dusk to analyze shadow direction and natural lighting.',
        },
        input: {
          id: 'Slider jam matahari (06.00 hingga 18.00 WIB) dan sudut orientasi kompas bangunan.',
          en: 'Solar simulation time slider (06:00 to 18:00) and building compass orientation.',
        },
        process: {
          id: 'Transformasi posisi directional light Three.js sesuai kurva elevasi dan azimuth matahari.',
          en: 'Transforming directional light coordinates along elevation and azimuth solar arcs.',
        },
        output: {
          id: 'Visualisasi bayangan dinamis real-time pada fasad dan bukaan jendela ruangan.',
          en: 'Real-time dynamic shadow visualization across facades and interior window openings.',
        },
        badge: {
          id: 'Simulasi Cahaya',
          en: 'Lighting Simulation',
        },
      },
      {
        step: '04',
        title: {
          id: 'Inspeksi Potongan Interior (Section Cutaway)',
          en: 'Section Cutaway Interior Inspection',
        },
        summary: {
          id: 'Mengaktifkan bidang potong horizontal/vertikal untuk menginspeksi interior tanpa terhalang dinding luar.',
          en: 'Engaging horizontal/vertical clipping planes to inspect interior layout unobstructed by exterior walls.',
        },
        input: {
          id: 'Toggle mode irisan struktural dan slider ketinggian bidang potong (clipping plane).',
          en: 'Structural cutaway mode toggle and clipping plane height adjustment slider.',
        },
        process: {
          id: 'Penerapan Three.js clipping planes pada material objek arsitektur secara real-time.',
          en: 'Applying Three.js clipping planes across architectural materials in real time.',
        },
        output: {
          id: 'Tampilan denah interior 3D dengan furnitur dan sirkulasi tangga terlihat jelas.',
          en: '3D interior plan view displaying furniture layout and stair circulation clearly.',
        },
        badge: {
          id: 'Mode Irisan 3D',
          en: '3D Section Mode',
        },
      },
      {
        step: '05',
        title: {
          id: 'Kalkulator RAB Dinamis & Simulasi Angsuran KPR',
          en: 'Dynamic Cost Estimate (RAB) & Mortgage Simulator',
        },
        summary: {
          id: 'Sistem mengkalkulasi 12 komponen biaya konstruksi per m2 dan menyediakan simulator cicilan KPR.',
          en: 'System computes 12 construction cost components per m2 and provides a mortgage payment simulator.',
        },
        input: {
          id: 'Tier material (Standar, Menengah, Premium), persentase uang muka (DP), dan tenor kredit.',
          en: 'Material tier (Standard, Mid, Premium), down payment percentage (DP), and loan term.',
        },
        process: {
          id: 'Kalkulasi matematis RAB real-time dan perhitungan bunga anuitas kredit pemilikan rumah.',
          en: 'Real-time mathematical cost compilation and annuity mortgage amortization calculation.',
        },
        output: {
          id: 'Rincian RAB terperinci, jadwal termin pembayaran, dan estimasi cicilan bulanan.',
          en: 'Detailed cost breakdown, stage disbursement schedule, and monthly payment estimate.',
        },
        badge: {
          id: 'Kalkulator RAB & KPR',
          en: 'Cost & Mortgage Calc',
        },
      },
    ],
    scenarioExamples: [
      {
        id: 'arsiviz-sc-1',
        title: {
          id: 'Konfigurasi Rumah 2 Lantai di Lahan Kompak 6x12m',
          en: '2-Story Compact Home Configuration on 6x12m Lot',
        },
        category: {
          id: 'Parameter Lahan & 3D',
          en: 'Plot Parameters & 3D',
        },
        description: {
          id: 'Pengguna merancang rumah tinggal modern 2 lantai di atas kavling perumahan 72 m2 dengan GSB depan 3 meter.',
          en: 'User configures a modern 2-story home on a 72 m2 urban lot with a 3-meter front setback.',
        },
        sampleData: [
          { label: { id: 'Dimensi Lahan', en: 'Plot Dimensions' }, value: '6.0 meter x 12.0 meter (Luas 72 m2)' },
          { label: { id: 'Tipe Bangunan', en: 'House Archetype' }, value: '2 Lantai Kontemporer (Luas Bangunan 84 m2)' },
          { label: { id: 'Garis Sempadan (GSB)', en: 'Setback Line' }, value: 'Depan 3.0m, Belakang 1.5m (KDB 58%)' },
          { label: { id: 'Status Regulasi', en: 'Regulatory Status' }, value: 'Terverifikasi Patuh Regulasi Tata Kota' },
        ],
        expectedResult: {
          id: 'Model 3D ter-render otomatis, carport dan bukaan ventilasi belakang terbentuk sempurna, status GSB hijau.',
          en: '3D model updates instantly, carport and rear courtyard formed, setback status confirmed green.',
        },
        actionHint: {
          id: 'Geser slider Dimensi Lahan ke 6x12m pada panel kiri aplikasi live dan pilih tipe 2 Lantai.',
          en: 'Adjust Plot Dimension sliders to 6x12m in the live app left panel and select 2-Story type.',
        },
      },
      {
        id: 'arsiviz-sc-2',
        title: {
          id: 'Analisis Bayangan Fasad Pukul 09.00 vs 15.00 WIB',
          en: 'Facade Solar Shading Analysis at 09:00 vs 15:00',
        },
        category: {
          id: 'Simulasi Pencahayaan',
          en: 'Lighting Simulation',
        },
        description: {
          id: 'Menguji efektivitas kisi-kisi penangkal panas matahari barat untuk mengurangi radiasi termal ruang keluarga.',
          en: 'Testing west-facing secondary skin louvers to minimize thermal radiation in the main living room.',
        },
        sampleData: [
          { label: { id: 'Arah Hadap Rumah', en: 'Building Orientation' }, value: 'Menghadap Barat (270 Derajat)' },
          { label: { id: 'Waktu Simulasi', en: 'Solar Simulation Hour' }, value: '15.30 WIB (Sudut Matahari Rendah)' },
          { label: { id: 'Elemen Shading', en: 'Shading Element' }, value: 'Secondary Skin Kisi Kayu Kamper' },
        ],
        expectedResult: {
          id: 'Bayangan kisi-kisi terproyeksi realistis pada kaca jendela, mereduksi intensitas pencahayaan langsung hingga 65%.',
          en: 'Realistic shadow casting over glazing, reducing direct solar exposure by 65%.',
        },
        actionHint: {
          id: 'Buka tab Lingkungan & Cahaya, geser slider waktu ke pukul 15.30, dan amati bayangan pada fasad depan.',
          en: 'Open Environment & Light tab, drag time slider to 15:30, and inspect facade shadows.',
        },
      },
      {
        id: 'arsiviz-sc-3',
        title: {
          id: 'Simulasi Anggaran Biaya (RAB) & Cicilan KPR',
          en: 'Bill of Quantities (RAB) & Mortgage Amortization Simulation',
        },
        category: {
          id: 'Kalkulator Finansial',
          en: 'Financial Calculator',
        },
        description: {
          id: 'Menghitung estimasi biaya riil konstruksi per m2 dan memproyeksikan skema angsuran KPR bank rekanan.',
          en: 'Estimating construction cost per m2 and projecting mortgage installment schedules.',
        },
        sampleData: [
          { label: { id: 'Tier Material', en: 'Material Tier' }, value: 'Menengah Plus (Lantai Homogeneous, Sanitair Toto)' },
          { label: { id: 'Estimasi RAB Total', en: 'Estimated Construction Cost' }, value: 'Rp462.000.000 (Rp5.500.000 / m2)' },
          { label: { id: 'Uang Muka (DP)', en: 'Down Payment (DP)' }, value: '20% (Rp92.400.000)' },
          { label: { id: 'Tenor KPR & Suku Bunga', en: 'Loan Term & Rate' }, value: '15 Tahun (180 Bulan) - Bunga Efektif 6.5%' },
        ],
        expectedResult: {
          id: 'Angsuran bulanan terproyeksi Rp3.220.000/bulan, 12 pos termin pekerjaan terinci lengkap dengan tabel tahapan.',
          en: 'Projected monthly payment of Rp3,220,000/mo, 12 itemized trade breakdown schedules displayed.',
        },
        actionHint: {
          id: 'Pilih tab RAB & KPR pada panel kanan aplikasi live, sesuaikan tier material dan tenor pinjaman.',
          en: 'Select RAB & KPR tab in the live app right drawer, adjust material tier and loan duration.',
        },
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
    workflowSteps: [
      {
        step: '01',
        title: {
          id: 'Input Slider Menit Aktivitas Harian & Mingguan',
          en: 'Daily & Weekly Activity Minute Slider Input',
        },
        summary: {
          id: 'Pengguna menggeser durasi aktivitas fisik mingguan: aerobik sedang, intensitas berat, dan latihan kekuatan otot.',
          en: 'User adjusts weekly physical activity durations: moderate aerobic, vigorous intensity, and muscle strengthening.',
        },
        input: {
          id: 'Slider menit jalan santai/sepeda, menit lari/olahraga berat, dan frekuensi latihan beban mingguan.',
          en: 'Sliders for moderate minutes, vigorous minutes, and muscle training days per week.',
        },
        process: {
          id: 'Normalisasi satuan waktu dan konversi menit ekuivalen aktivitas sedang menggunakan formula WHO.',
          en: 'Time normalization and moderate-equivalent minute conversion via official WHO formula.',
        },
        output: {
          id: 'Total akumulasi poin menit gerak mingguan terhitung secara real-time di antarmuka.',
          en: 'Total accumulated weekly movement points calculated in real-time on the interface.',
        },
        badge: {
          id: 'Input Aktivitas',
          en: 'Activity Input',
        },
      },
      {
        step: '02',
        title: {
          id: 'Komparasi Terhadap Target Panduan WHO 2020',
          en: 'Comparison Against WHO 2020 Activity Guidelines',
        },
        summary: {
          id: 'Sistem membandingkan capaian gerak pengguna dengan rekomendasi resmi Organisasi Kesehatan Dunia (150-300 menit).',
          en: 'System benchmarks user activity against official World Health Organization guidelines (150-300 mins).',
        },
        input: {
          id: 'Kategori kelompok usia (Anak & Remaja, Dewasa 18-64 tahun, Lansia 65+ tahun).',
          en: 'Age demographic bracket (Children & Teens, Adults 18-64, Seniors 65+).',
        },
        process: {
          id: 'Evaluasi ambang batas rekomendasi kesehatan kardiorespirasi dan kekuatan otot sesuai kelompok usia.',
          en: 'Evaluating cardiorespiratory and muscle strengthening threshold standards across age groups.',
        },
        output: {
          id: 'Persentase ketercapaian target WHO (contoh: 85% dari target minimum) dengan bar kemajuan visual.',
          en: 'Percentage of WHO target achieved (e.g. 85% of minimum) with visual progress bar.',
        },
        badge: {
          id: 'Standar WHO',
          en: 'WHO Standards',
        },
      },
      {
        step: '03',
        title: {
          id: 'Estimasi Rasio Harapan Hidup Sehat (Healthspan vs Lifespan)',
          en: 'Healthspan vs Lifespan Ratio Estimation',
        },
        summary: {
          id: 'Memproyeksikan estimasi rasio tahun hidup bebas dari penyakit degeneratif berdasarkan kebiasaan gerak.',
          en: 'Projecting estimated healthy disease-free years versus total life expectancy based on movement habits.',
        },
        input: {
          id: 'Total menit aktivitas terakumulasi dan riwayat konsistensi latihan beban.',
          en: 'Total accumulated activity minutes and strength training frequency.',
        },
        process: {
          id: 'Penerapan model regresi epidemiologi kebugaran fisik dan risiko morbiditas kronis.',
          en: 'Applying epidemiological fitness regression models and chronic morbidity risk reductions.',
        },
        output: {
          id: 'Grafik visual proyeksi rentang usia sehat (Healthspan) vs usia total (Lifespan).',
          en: 'Visual projection graph of healthy active years (Healthspan) vs total Lifespan.',
        },
        badge: {
          id: 'Model Healthspan',
          en: 'Healthspan Model',
        },
      },
      {
        step: '04',
        title: {
          id: 'Edukasi Mitos vs Fakta Sains Olahraga Interaktif',
          en: 'Interactive Exercise Science Myth vs Fact Education',
        },
        summary: {
          id: 'Kartu interaktif membedah miskonsepsi populer dengan rujukan jurnal ilmiah fisiologi olahraga.',
          en: 'Interactive cards dismantle popular misconceptions backed by peer-reviewed sports physiology citations.',
        },
        input: {
          id: 'Pilihan kartu mitos (contoh: Jalan 10.000 langkah wajib, Lansia dilarang angkat beban).',
          en: 'Selected myth card (e.g. 10,000 steps myth, Seniors should avoid weights).',
        },
        process: {
          id: 'Penyajian komparasi bukti ilmiah, mekanisme fisiologis tubuh, dan kesimpulan riset jurnal.',
          en: 'Displaying scientific evidence, physiological mechanisms, and research conclusions.',
        },
        output: {
          id: 'Rangkuman ringkas berbasis sains yang aplikatif dan mudah dipahami oleh masyarakat umum.',
          en: 'Concise, evidence-based takeaway easily understood by general audiences.',
        },
        badge: {
          id: 'Edukasi Sains',
          en: 'Science Education',
        },
      },
      {
        step: '05',
        title: {
          id: 'Generator Rekomendasi Rencana Gerak Personal',
          en: 'Personalized Movement Action Plan Generator',
        },
        summary: {
          id: 'Sistem merangkai rekomendasi jadwal aktivitas mingguan yang aplikatif dan realistis untuk mencapai target.',
          en: 'System builds an actionable and realistic weekly movement schedule to bridge activity gaps.',
        },
        input: {
          id: 'Defisit menit aktivitas fisik saat ini dan preferensi rutinitas harian keluarga.',
          en: 'Current activity minute deficit and daily family routine preferences.',
        },
        process: {
          id: 'Distribusi target menit ke dalam sesi latihan ringan harian (contoh: 30 menit jalan cepat 5x seminggu).',
          en: 'Allocating target minutes across manageable daily sessions (e.g. 30-min brisk walk 5x weekly).',
        },
        output: {
          id: 'Kartu rencana aksi mingguan personal yang dapat dijadikan panduan pola hidup sehat.',
          en: 'Actionable personalized weekly movement schedule card to guide daily healthy habits.',
        },
        badge: {
          id: 'Rencana Aksi',
          en: 'Action Plan',
        },
      },
    ],
    scenarioExamples: [
      {
        id: 'seumur-sc-1',
        title: {
          id: 'Evaluasi Profil Gaya Hidup Sedentari (Pekerja Meja)',
          en: 'Sedentary Lifestyle Profile Evaluation (Desk Worker)',
        },
        category: {
          id: 'Analisis Kebugaran',
          en: 'Fitness Assessment',
        },
        description: {
          id: 'Pekerja kantoran yang duduk lebih dari 8 jam sehari memeriksa status defisit aktivitas fisik mingguan.',
          en: 'Office worker sitting over 8 hours daily checks weekly physical activity deficit status.',
        },
        sampleData: [
          { label: { id: 'Aktivitas Aerobik Sedang', en: 'Moderate Aerobic' }, value: '30 Menit / Minggu (Jalan santai akhir pekan)' },
          { label: { id: 'Olahraga Intensitas Berat', en: 'Vigorous Sport' }, value: '0 Menit' },
          { label: { id: 'Latihan Kekuatan Otot', en: 'Muscle Strengthening' }, value: '0 Hari (Tidak pernah latihan beban)' },
          { label: { id: 'Kelompok Usia', en: 'Age Bracket' }, value: 'Dewasa 28 Tahun' },
        ],
        expectedResult: {
          id: 'Capaian 20% dari standar minimum WHO (defisit 120 menit sedang), risiko sindrom metabolik meningkat, rekomendasi jalan kaki 25 menit 5x seminggu.',
          en: '20% of WHO baseline achieved (120-min deficit), elevated metabolic risk flagged, 25-min brisk walking recommended 5x weekly.',
        },
        actionHint: {
          id: 'Geser slider pada kalkulator live ke 30 menit sedang dan 0 menit berat untuk melihat evaluasi instan.',
          en: 'Drag calculator sliders to 30 moderate and 0 vigorous minutes to see instant evaluation.',
        },
      },
      {
        id: 'seumur-sc-2',
        title: {
          id: 'Profil Aktif Seimbang Memenuhi Standar WHO',
          en: 'Balanced Active Lifestyle Meeting WHO Guidelines',
        },
        category: {
          id: 'Target Optimal',
          en: 'Optimal Target',
        },
        description: {
          id: 'Individu aktif yang mengombinasikan bersepeda komuter dan dua sesi latihan beban fungsional mingguan.',
          en: 'Active individual combining commute cycling with two weekly functional resistance workouts.',
        },
        sampleData: [
          { label: { id: 'Aktivitas Aerobik Sedang', en: 'Moderate Aerobic' }, value: '120 Menit / Minggu (Sepeda komuter)' },
          { label: { id: 'Olahraga Intensitas Berat', en: 'Vigorous Sport' }, value: '45 Menit (Futsal, setara 90 menit sedang)' },
          { label: { id: 'Latihan Beban Fungsional', en: 'Strength Training' }, value: '2 Sesi / Minggu (Push up, squat, dumbbell)' },
        ],
        expectedResult: {
          id: 'Mencapai 140% target WHO (210 menit setara sedang), rasio Healthspan optimal (+7.2 tahun bebas penyakit kronis), status: Sangat Prima.',
          en: '140% of WHO target achieved (210 equiv mins), optimal Healthspan (+7.2 healthy years), status: Excellent.',
        },
        actionHint: {
          id: 'Ubah slider sedang ke 120 dan berat ke 45 pada kalkulator untuk melihat proyeksi lonjakan Healthspan.',
          en: 'Set moderate slider to 120 and vigorous to 45 to view positive Healthspan trajectory.',
        },
      },
      {
        id: 'seumur-sc-3',
        title: {
          id: 'Verifikasi Mitos Sains: Latihan Beban pada Usia Lanjut',
          en: 'Science Myth Check: Strength Training in Older Adults',
        },
        category: {
          id: 'Edukasi Ilmiah',
          en: 'Scientific Education',
        },
        description: {
          id: 'Memeriksa kebenaran anggapan umum bahwa lansia hanya boleh jalan santai dan tidak boleh melatih kekuatan otot.',
          en: 'Testing common perception that seniors should only walk gently and avoid resistance training.',
        },
        sampleData: [
          { label: { id: 'Klaim Mitos', en: 'Myth Statement' }, value: 'Lansia di atas 60 tahun dilarang latihan beban karena memicu radang sendi' },
          { label: { id: 'Temuan Sains WHO', en: 'WHO Science Findings' }, value: 'Latihan resistensi multicomponent 2-3x seminggu terbukti mencegah sarkopenia dan osteoporosis' },
        ],
        expectedResult: {
          id: 'Status: Mitos Terbantahkan; latihan resistensi justru meningkatkan kepadatan mineral tulang dan menurunkan risiko jatuh hingga 34%.',
          en: 'Status: Myth Debunked; resistance training actively builds bone density and reduces fall risk by 34%.',
        },
        actionHint: {
          id: 'Buka bagian Mitos vs Fakta pada tab live dan klik kartu mitos lansia untuk membaca sitasi riset medis.',
          en: 'Navigate to Myth vs Fact section in the live tab and click senior myth card to view research citations.',
        },
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
    workflowSteps: [
      {
        step: '01',
        title: {
          id: 'Portal Informasi Publik, Kurikulum & Agenda',
          en: 'Public School Portal, Curriculum & Academic Calendar',
        },
        summary: {
          id: 'Masyarakat umum, orang tua, dan calon siswa mengakses visi misi, profil pengajar, warta berita, dan agenda sekolah.',
          en: 'Public visitors, parents, and prospective students access school profile, faculty info, news, and calendar.',
        },
        input: {
          id: 'Pencarian warta sekolah, filter kategori pengumuman, dan arsip kegiatan akademik.',
          en: 'News search queries, announcement category filters, and academic event archives.',
        },
        process: {
          id: 'Penyajian konten terstruktur dengan paginasi dan filter kategori instan tanpa reload halaman.',
          en: 'Structured content rendering with instant category filtering and pagination without reloads.',
        },
        output: {
          id: 'Halaman portal informasi sekolah interaktif dan responsif di semua perangkat.',
          en: 'Interactive and responsive school portal layout across all screen sizes.',
        },
        badge: {
          id: 'Portal Publik',
          en: 'Public Portal',
        },
      },
      {
        step: '02',
        title: {
          id: 'Pendaftaran PPDB Online Interaktif (4 Jalur Seleksi)',
          en: 'Interactive Online PPDB Admission (4 Selection Tracks)',
        },
        summary: {
          id: 'Calon peserta didik mendaftarkan diri secara mandiri dengan memilih salah satu dari 4 jalur seleksi resmi.',
          en: 'Prospective students self-register by selecting 1 of 4 official admission tracks.',
        },
        input: {
          id: 'Data calon siswa (NISN, Asal Sekolah, Nilai Rapor) dan pilihan jalur (Zonasi, Afirmasi, Prestasi, Mutasi).',
          en: 'Student info (NISN, previous school, grades) and chosen track (Zonasi, Affirmation, Merit, Relocation).',
        },
        process: {
          id: 'Validasi formulir multi-langkah dan pengecekan kelengkapan berkas digital secara instan.',
          en: 'Multi-step form validation and instant mandatory document completeness check.',
        },
        output: {
          id: 'Nomor registrasi unik PPDB (contoh: PPDB-2026-0842) dan lembar bukti pendaftaran digital.',
          en: 'Unique PPDB registration number (e.g. PPDB-2026-0842) and digital registration slip.',
        },
        badge: {
          id: 'Formulir PPDB',
          en: 'PPDB Admission',
        },
      },
      {
        step: '03',
        title: {
          id: 'Cek Status Verifikasi & Peringkat Seleksi Real-Time',
          en: 'Real-Time Verification Status & Ranking Lookup',
        },
        summary: {
          id: 'Pendaftar dapat memantau status validasi berkas dan estimasi batas aman penerimaan secara transparan.',
          en: 'Applicants monitor document verification status and threshold ranking cutoffs transparently.',
        },
        input: {
          id: 'Nomor registrasi PPDB dan tanggal lahir calon peserta didik.',
          en: 'PPDB registration code and student date of birth.',
        },
        process: {
          id: 'Pencocokan data registrasi terhadap tabel seleksi zonasi jarak dan nilai rapor.',
          en: 'Matching registration data against distance zoning and merit score rank tables.',
        },
        output: {
          id: 'Indikator status verifikasi (Berkas Lengkap / Dalam Penilaian / Lolos Seleksi).',
          en: 'Verification status badge (Complete / Under Review / Accepted).',
        },
        badge: {
          id: 'Lacak Seleksi',
          en: 'Admission Status',
        },
      },
      {
        step: '04',
        title: {
          id: 'Portal Multi-Peran Terpadu (Siswa, Guru, Wali Murid, Admin)',
          en: 'Unified Multi-Role Portal (Student, Teacher, Parent, Admin)',
        },
        summary: {
          id: 'Switcher peran simulasi memungkinkan peninjau merasakan antarmuka khusus masing-masing pemangku kepentingan.',
          en: 'Interactive role switcher allows reviewers to experience tailored interfaces for each stakeholder.',
        },
        input: {
          id: 'Pilihan peran pada bar navigasi (Siswa / Guru / Wali / Admin).',
          en: 'Role selector on navigation bar (Student / Teacher / Parent / Admin).',
        },
        process: {
          id: 'Perubahan konteks React state seketika untuk merender dasbor hak akses terkait.',
          en: 'Instant React state context switch rendering role-specific dashboard views.',
        },
        output: {
          id: 'Tampilan dasbor khusus: Jadwal & Nilai (Siswa), Presensi & Rapor (Guru), Tagihan SPP (Wali).',
          en: 'Custom dashboard view: Timetable & Grades (Student), Attendance (Teacher), Tuition (Parent).',
        },
        badge: {
          id: 'Multi-Peran',
          en: 'Multi-Role',
        },
      },
      {
        step: '05',
        title: {
          id: 'CMS Manajemen Konten Warta & Pengumuman Sekolah',
          en: 'School News & Announcement Content Management (CMS)',
        },
        summary: {
          id: 'Pengelola sekolah dapat membuat, mengedit, dan mempublikasikan pengumuman darurat atau warta prestasi.',
          en: 'School administrators author, edit, and publish emergency bulletins or achievement stories.',
        },
        input: {
          id: 'Judul warta, kategori berita, tanggal terbit, dan isi teks pengumuman.',
          en: 'Article title, news category, publish date, and announcement body text.',
        },
        process: {
          id: 'Penyimpanan state artikel dan pembaruan feed warta publik secara otomatis.',
          en: 'Article state mutation and automated feed update for the public portal.',
        },
        output: {
          id: 'Warta berita langsung tayang di portal publik tanpa perlu rebuild website.',
          en: 'Live publication on the public portal without requiring rebuilds.',
        },
        badge: {
          id: 'CMS Sekolah',
          en: 'School CMS',
        },
      },
    ],
    scenarioExamples: [
      {
        id: 'sekolah-sc-1',
        title: {
          id: 'Simulasi Pendaftaran PPDB Jalur Zonasi',
          en: 'PPDB Distance-Zoning Admission Track Simulation',
        },
        category: {
          id: 'Penerimaan Siswa',
          en: 'Admissions',
        },
        description: {
          id: 'Calon siswa mendaftar lewat jalur zonasi dengan memasukkan data alamat dan menguji validasi radius jarak sekolah.',
          en: 'Student registers via distance-zoning track inputting address and validating proximity radius.',
        },
        sampleData: [
          { label: { id: 'Nama Calon Siswa', en: 'Applicant Name' }, value: 'Ahmad Rayhan Pratama' },
          { label: { id: 'Nomor Induk Siswa (NISN)', en: 'Student NISN' }, value: '0089271632' },
          { label: { id: 'Jalur PPDB Dipilih', en: 'Selected Track' }, value: 'Zonasi Radius Tempat Tinggal (Jarak: 450 meter)' },
          { label: { id: 'Sekolah Asal', en: 'Previous School' }, value: 'SMP Negeri 4 Nusantara' },
        ],
        expectedResult: {
          id: 'Radius 450m masuk dalam zona prioritas 1, formulir tervalidasi lengkap, kode registrasi PPDB-2026-0842 diterbitkan.',
          en: '450m falls inside Priority Zone 1, form validated, registration code PPDB-2026-0842 generated.',
        },
        actionHint: {
          id: 'Kunjungi menu PPDB Online di aplikasi live, pilih Jalur Zonasi, dan lengkapi 3 tahap formulir pendaftaran.',
          en: 'Open PPDB Online in the live app, choose Zonasi track, and walk through the 3-step registration form.',
        },
      },
      {
        id: 'sekolah-sc-2',
        title: {
          id: 'Penelusuran Status Berkas & Peringkat Seleksi Mandiri',
          en: 'Application Document Verification & Ranking Lookup',
        },
        category: {
          id: 'Pelacakan PPDB',
          en: 'PPDB Tracking',
        },
        description: {
          id: 'Orang tua memasukkan kode pendaftaran untuk melihat status verifikasi dokumen fisik dan posisi kuota.',
          en: 'Parent enters registration ID to inspect physical document review and current quota standing.',
        },
        sampleData: [
          { label: { id: 'Kode Registrasi', en: 'Registration Code' }, value: 'PPDB-2026-0842' },
          { label: { id: 'Tanggal Lahir Siswa', en: 'Student Date of Birth' }, value: '14 Mei 2011' },
          { label: { id: 'Status Verifikasi', en: 'Verification Status' }, value: 'Berkas Fisik Terverifikasi Lengkap' },
        ],
        expectedResult: {
          id: 'Status: Lolos Administrasi; Posisi saat ini: Peringkat 18 dari daya tampung 96 siswa jalur zonasi.',
          en: 'Status: Documents Verified; Standing: Rank 18 of 96 available distance-zoning quota seats.',
        },
        actionHint: {
          id: 'Buka tab Cek Status PPDB di portal, masukkan kode registrasi dan periksa kartu verifikasi digital.',
          en: 'Open Check PPDB Status tab in portal, input code, and view the digital verification card.',
        },
      },
      {
        id: 'sekolah-sc-3',
        title: {
          id: 'Eksplorasi Peran: Dasbor Guru vs Dasbor Wali Murid',
          en: 'Role Perspectives: Teacher Dashboard vs Parent Portal',
        },
        category: {
          id: 'Multi-Peran Portal',
          en: 'Multi-Role Portal',
        },
        description: {
          id: 'Menguji perbedaan otorisasi dan tata letak antara peran guru kelas yang menginput rapor dan wali murid.',
          en: 'Testing permission and layout boundaries between homeroom teacher entering grades and parent monitoring.',
        },
        sampleData: [
          { label: { id: 'Peran 1 (Guru)', en: 'Role 1 (Teacher)' }, value: 'Drs. Bambang Wicaksono (Wali Kelas 10-A)' },
          { label: { id: 'Modul Guru Terbuka', en: 'Teacher Modules' }, value: 'Input Presensi Harian, Penilaian Formatif, Catatan Rapor' },
          { label: { id: 'Peran 2 (Wali Murid)', en: 'Role 2 (Parent)' }, value: 'Ibu Ratna Dewi (Wali dari Rayhan Pratama)' },
          { label: { id: 'Modul Wali Terbuka', en: 'Parent Modules' }, value: 'Grafik Kehadiran Anak, Unduh Rapor PDF, Status SPP' },
        ],
        expectedResult: {
          id: 'Role Switcher mengubah konteks seketika tanpa login ulang; fitur edit nilai terkunci aman pada mode wali murid.',
          en: 'Role Switcher transitions context instantly; grade editing is strictly disabled in parent mode.',
        },
        actionHint: {
          id: 'Klik bar Simulasi Akses di bagian atas website live untuk berganti peran antara Guru dan Wali Murid.',
          en: 'Click the top Role Simulator bar in the live app to toggle between Teacher and Parent views.',
        },
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
    workflowSteps: [
      {
        step: '01',
        title: {
          id: 'Ticker Bursa Residu Industri Real-Time',
          en: 'Real-Time Industrial Residue Spot Ticker',
        },
        summary: {
          id: 'Memantau kuotasi harga dan ketersediaan komoditas sampingan industri (Fly Ash, Slag, Biomassa, SBE).',
          en: 'Monitoring pricing quotes and available volumes of industrial residues (Fly Ash, Slag, Biomass, SBE).',
        },
        input: {
          id: 'Filter jenis residu, wilayah asal pasokan pabrik, dan batas volume tonase pesanan.',
          en: 'Residue type filter, origin factory region, and tonnage volume threshold.',
        },
        process: {
          id: 'Agregasi data spot market dan pemeringkatan penawaran residu sirkular aktif.',
          en: 'Spot market data aggregation and active circular residue offer ranking.',
        },
        output: {
          id: 'Tabel dan ticker harga pasar residu terbarukan dengan indikator fluktuasi indeks harian.',
          en: 'Renewable residue price ticker and market table with daily fluctuation indices.',
        },
        badge: {
          id: 'Bursa Residu',
          en: 'Residue Exchange',
        },
      },
      {
        step: '02',
        title: {
          id: 'Inspeksi Geometri Partikel 3D & Simulasi Kargo Kontainer',
          en: '3D Particle Lattice Inspection & Container Cargo Simulator',
        },
        summary: {
          id: 'Inspektur 3D Three.js memvisualisasikan struktur mikro partikel dan simulasi pemuatan kontainer 20ft.',
          en: 'Three.js 3D inspector visualizes micro-particle lattices and 20ft container cargo distribution.',
        },
        input: {
          id: 'Pilihan material komoditas dan opsi visualisasi (Kisi Partikel, Kargo Kontainer, Graf Logistik).',
          en: 'Commodity selection and visualization mode (Particle Lattice, Container Cargo, Network Graph).',
        },
        process: {
          id: 'Rendering WebGL 3D prosedural dengan kontrol orbit kamera dan mode X-Ray/Exploded View.',
          en: 'Procedural 3D WebGL rendering with orbital camera controls and X-Ray/Exploded View modes.',
        },
        output: {
          id: 'Visualisasi 3D interaktif persebaran muatan kontainer dan struktur kristal partikel.',
          en: 'Interactive 3D visualization of container load distribution and particle crystalline structure.',
        },
        badge: {
          id: 'Inspeksi 3D',
          en: '3D Inspection',
        },
      },
      {
        step: '03',
        title: {
          id: 'Rekonsiliasi Faktur 3-Way Matching & Diskon Kadar Air',
          en: '3-Way Matching Invoice Reconciliation & Moisture Discount',
        },
        summary: {
          id: 'Mencocokkan Purchase Order, Surat Jalan armada pengangkut, dan berat netto timbangan jembatan.',
          en: 'Matching Purchase Order, transport delivery manifest, and weighbridge net weight readings.',
        },
        input: {
          id: 'Data tonase PO, Surat Jalan, hasil timbangan jembatan, dan kadar air laboratorium.',
          en: 'PO tonnage, delivery manifest, weighbridge scale readings, and laboratory moisture %.',
        },
        process: {
          id: 'Pemeriksaan toleransi selisih berat dan penerapan formula penalti penyesuaian kadar air.',
          en: 'Tolerance variance checking and moisture adjustment penalty formula calculation.',
        },
        output: {
          id: 'Status rekonsiliasi faktur (Matched / Variance Flagged) dan nominal settlement bersih.',
          en: 'Invoice reconciliation status (Matched / Flagged) and net settlement amount.',
        },
        badge: {
          id: '3-Way Matching',
          en: '3-Way Matching',
        },
      },
      {
        step: '04',
        title: {
          id: 'Kalkulator Reduksi Karbon Scope-3 (ISO 14064-1)',
          en: 'Scope-3 Carbon Avoidance Calculator (ISO 14064-1)',
        },
        summary: {
          id: 'Menghitung emisi gas rumah kaca yang dihindari dengan mensubstitusi bahan baku perawan dengan residu industri.',
          en: 'Quantifying avoided greenhouse gas emissions by substituting virgin raw materials with industrial residues.',
        },
        input: {
          id: 'Tonase material yang disirkulasikan dan faktor emisi komparasi material primer.',
          en: 'Circulated residue tonnage and primary material comparative emission factors.',
        },
        process: {
          id: 'Kalkulasi faktor konversi karbon terakreditasi standar ISO 14064-1.',
          en: 'Applying accredited ISO 14064-1 carbon conversion coefficients.',
        },
        output: {
          id: 'Metrik reduksi emisi CO2e terverifikasi dan kredit dekarbonisasi rantai pasok.',
          en: 'Verified avoided CO2e metrics and supply chain decarbonization credits.',
        },
        badge: {
          id: 'Metrik ESG',
          en: 'ESG Metrics',
        },
      },
      {
        step: '05',
        title: {
          id: 'Verifikasi Audit Trail dengan Checksum FNV-1a',
          en: 'Audit Trail Integrity Verification via FNV-1a Checksum',
        },
        summary: {
          id: 'Setiap mutasi logistik dan pembayaran diikat dengan hash deterministik 32-bit untuk menjamin data anti-manipulasi.',
          en: 'Every logistics mutation and payment settlement is bound by a 32-bit deterministic hash to prevent tampering.',
        },
        input: {
          id: 'String kanonik gabungan nomor mutasi, tanggal, tonase, dan nilai settlement.',
          en: 'Canonical string combining transaction ID, timestamp, tonnage, and settlement value.',
        },
        process: {
          id: 'Perhitungan hash kriptografis FNV-1a 32-bit secara deterministik.',
          en: 'Deterministic FNV-1a 32-bit cryptographic hash calculation.',
        },
        output: {
          id: 'Kode checksum audit hex (contoh: 0x8A4F12C9) dengan indikator integritas valid.',
          en: 'Hexadecimal audit checksum (e.g. 0x8A4F12C9) with valid integrity indicator.',
        },
        badge: {
          id: 'Audit FNV-1a',
          en: 'FNV-1a Audit',
        },
      },
    ],
    scenarioExamples: [
      {
        id: 'symbio-sc-1',
        title: {
          id: 'Pencocokan Penawaran 120 Ton Fly Ash PLTU ke Pabrik Semen',
          en: '120-Ton Power Plant Fly Ash Matching to Green Cement Plant',
        },
        category: {
          id: 'Bursa Komoditas Sirkular',
          en: 'Circular Commodity Trading',
        },
        description: {
          id: 'Menghubungkan residu pembakaran batubara PLTU Paiton dengan kebutuhan pozzolan pabrik semen hijau Jawa Timur.',
          en: 'Matching thermal power plant fly ash byproduct with green cement plant pozzolan demand.',
        },
        sampleData: [
          { label: { id: 'Jenis Komoditas', en: 'Commodity Type' }, value: 'Coal Fly Ash Class F (SiO2 + Al2O3 > 70%)' },
          { label: { id: 'Volume Pasokan', en: 'Supply Volume' }, value: '120 Ton / Batch (4 Truk Tronton Tridem)' },
          { label: { id: 'Harga Spot Bursa', en: 'Spot Market Price' }, value: 'Rp185.000 / Ton FOB Paiton' },
          { label: { id: 'Status KYB Supplier', en: 'Supplier KYB Status' }, value: 'Terakreditasi KLHK Proper Hijau' },
        ],
        expectedResult: {
          id: 'Kontrak spot tereksekusi, armada 4 unit truk tronton dijadwalkan, dana escrow Rp22.200.000 terkunci aman.',
          en: 'Spot contract matched, 4 tridem trucks dispatched, Rp22,200,000 locked in escrow.',
        },
        actionHint: {
          id: 'Buka modul Spot Marketplace di aplikasi live, filter Fly Ash, dan klik tombol Buat Penawaran Kontrak.',
          en: 'Navigate to Spot Marketplace in live app, filter Fly Ash, and test Create Contract Offer.',
        },
      },
      {
        id: 'symbio-sc-2',
        title: {
          id: 'Penyesuaian Penalti Deviasi Kadar Air Laboratorium',
          en: 'Laboratory Moisture Penalty Deviation Adjustment',
        },
        category: {
          id: 'Quality Control & Settlement',
          en: 'QC & Settlement',
        },
        description: {
          id: 'Hasil uji lab menunjukkan kelembapan cangkang sawit melebihi batas toleransi kontrak sehingga memicu penalti kadar air.',
          en: 'Lab test shows palm kernel shell moisture exceeding contractual tolerance, triggering auto-discount math.',
        },
        sampleData: [
          { label: { id: 'Komoditas Diuji', en: 'Tested Commodity' }, value: 'Palm Kernel Shell (Cangkang Sawit Ekspor)' },
          { label: { id: 'Berat Timbangan Jembatan', en: 'Weighbridge Net Weight' }, value: '34.80 Ton (Gross 46.20 - Tare 11.40)' },
          { label: { id: 'Batas Toleransi Kadar Air', en: 'Moisture Tolerance' }, value: '12.0% Maksimum Kontraktual' },
          { label: { id: 'Hasil Uji Lab Lapangan', en: 'Field Lab Test' }, value: '14.8% (+2.8% Kelebihan Air)' },
        ],
        expectedResult: {
          id: 'Formula dry-basis memotong bobot settlement bersih menjadi 33.82 Ton, mencegah overpayment pembeli sebesar Rp1.240.000.',
          en: 'Dry-basis formula discounts payable tonnage to 33.82 tons, preventing Rp1,240,000 overpayment.',
        },
        actionHint: {
          id: 'Buka tab QC Lab Scanner, geser moisture slider ke 14.8%, dan perhatikan kalkulasi dry-basis settlement.',
          en: 'Open QC Lab Scanner tab, adjust moisture slider to 14.8%, and inspect dry-basis math.',
        },
      },
      {
        id: 'symbio-sc-3',
        title: {
          id: 'Verifikasi Audit Trail Kriptografis FNV-1a & Kredit Emisi Scope-3',
          en: 'FNV-1a Cryptographic Audit Trail & Scope-3 Emission Offsets',
        },
        category: {
          id: 'ESG & Compliance Audit',
          en: 'ESG & Compliance Audit',
        },
        description: {
          id: 'Memeriksa hash kriptografis transaksi untuk verifikasi data tidak dimanipulasi dan menghitung pengurangan karbon.',
          en: 'Verifying transaction cryptographic hash against tampering and computing net carbon avoidance.',
        },
        sampleData: [
          { label: { id: 'ID Transaksi Logistik', en: 'Logistics Mutation ID' }, value: 'TX-SYM-2026-0912' },
          { label: { id: 'Metode Pengurangan Emisi', en: 'Emission Avoidance Method' }, value: 'Substitusi Klinker Semen dengan Fly Ash Kelas F' },
          { label: { id: 'Standar Akreditasi', en: 'Accreditation Standard' }, value: 'ISO 14064-1 Greenhouse Gas Protocol' },
        ],
        expectedResult: {
          id: 'Reduksi emisi Scope-3 terverifikasi 84.6 Ton CO2e, status FNV-1a: 0x7E3D8A1B (Integritas Blok Rantai Pasok Terjamin).',
          en: 'Scope-3 avoided emissions verified at 84.6 tons CO2e, FNV-1a: 0x7E3D8A1B (Supply chain tamper-evident).',
        },
        actionHint: {
          id: 'Buka modul Audit Trail & ESG di aplikasi live, klik entri TX-SYM-2026-0912 untuk melihat sertifikat dekarbonisasi.',
          en: 'Open Audit Trail & ESG module in live app, click transaction TX-SYM-2026-0912 to view certificate.',
        },
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
