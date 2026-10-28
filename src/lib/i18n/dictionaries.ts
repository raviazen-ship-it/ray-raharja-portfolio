export type Locale = 'id' | 'en';

export const dictionaries = {
  id: {
    nav: {
      home: 'Beranda',
      projects: 'Proyek',
      visualWorks: 'Desain Visual',
      about: 'Tentang',
      contact: 'Kontak',
      menuOpen: 'Buka Menu Navigasi',
      menuClose: 'Tutup Menu Navigasi',
    },
    hero: {
      indexLabel: 'PORTOFOLIO TERINTEGRASI 2025-2026',
      locationLabel: 'JAKARTA UTARA, INDONESIA • WEB & VISUAL DESIGN',
      available: 'Tersedia untuk Pekerjaan & Proyek Freelance',
      unavailable: 'Jadwal Kuartal Ini Penuh • Buka Diskusi Berikutnya',
      eyebrow: 'Web & Digital Products • Visual Design & Production',
      tagline: 'Designing useful digital experiences. Building them to work.',
      subtitle:
        'Saya merancang dan membangun website bisnis serta pengalaman web interaktif, dengan perhatian pada kebutuhan pengguna, kualitas visual, dan implementasi fitur.',
      ctaExplore: 'Lihat Semua Proyek',
      ctaContact: 'Hubungi Saya',
      trackWebTitle: 'Web & Digital Products',
      trackWebDesc:
        'Website bisnis, kalkulator interaktif, eksplorasi dashboard, dan visualisasi 3D berbasis browser dengan live demo yang dapat diuji.',
      trackWebAction: 'Telusuri 5 Proyek Web',
      trackVisualTitle: 'Visual Design & Production',
      trackVisualDesc:
        'Kampanye e-commerce marketplace, infografis teknis produk, carousel editorial, produksi cetak UV, motion 2.5D, dan video pendek.',
      trackVisualAction: 'Telusuri 12 Karya Visual',
    },
    featuredWeb: {
      index: '01 / FEATURED PROJECTS',
      label: 'Web & Produk Digital Unggulan',
      heading: 'Proyek Web Utama',
      subtitle:
        'Tiga proyek web pilihan dengan live demo publik, screenshot hasil tangkapan nyata, dan studi kasus yang memisahkan fitur teruji dari simulasi.',
      viewAllCta: 'Semua Proyek & Filter',
      caseStudyCta: 'Baca Studi Kasus',
      liveDemoCta: 'Buka Live Demo',
      verifiedDatePrefix: 'Diperiksa',
      roleLabel: 'Peran',
      stackLabel: 'Teknologi Terverifikasi',
    },
    capabilities: {
      index: '02 / EXPLORE BY CAPABILITY',
      label: 'Jalur Kompetensi & Bukti Karya',
      heading: 'Telusuri Berdasarkan Kapabilitas',
      subtitle:
        'Pilih area kerja untuk langsung menyaring proyek web maupun arsip desain grafis yang relevan.',
      exploreAction: 'Buka Proyek Terkait',
    },
    moreWeb: {
      index: '03 / MORE WEB PROJECTS',
      label: 'Eksplorasi Sistem & Prototipe',
      heading: 'Proyek Web Lainnya',
      subtitle:
        'Prototipe portal institusi pendidikan dan eksplorasi antarmuka B2B ekonomi sirkular dengan catatan batasan teknis yang transparan.',
    },
    works: {
      index: '04 / SELECTED DESIGN WORK',
      label: 'Arsip Desain Grafis, Brand, Motion & Video (2025-2026)',
      heading: 'Karya Desain Visual & Produksi',
      subtitle:
        'Kumpulan karya nyata dari kebutuhan e-commerce marketplace, produksi cetak UV, carousel editorial, hingga motion graphics dan penyuntingan video.',
      viewAllProjectsLink: 'Lihat Direktori Semua Proyek (/projects)',
      categories: {
        Semua: 'Semua',
        Branding: 'Branding',
        'Graphic Design': 'Graphic Design',
        Motion: 'Motion',
        'Video Editing': 'Video Editing',
      },
      emptyTitle: 'Belum ada karya pada kategori ini',
      emptyDesc:
        'Silakan pilih kategori lain atau tampilkan kembali seluruh arsip karya.',
      resetFilter: 'Tampilkan Semua Karya',
      viewProject: 'Baca Detail Karya',
      featuredBadge: 'Pilihan',
    },
    howIWork: {
      index: '05 / HOW I WORK',
      label: 'Metode Kerja Aktual',
      heading: 'Cara Saya Bekerja',
      subtitle:
        'Tahapan kerja yang saya terapkan saat mengerjakan proyek web maupun aset komunikasi visual agar hasil akhir sesuai kebutuhan nyata.',
      steps: [
        {
          number: '01',
          phase: 'Discovery',
          title: 'Memahami Konteks & Kebutuhan',
          description:
            'Memetakan tujuan halaman atau materi kampanye, siapa penggunanya, batasan teknis/cetak, serta informasi inti yang wajib tersampaikan.',
        },
        {
          number: '02',
          phase: 'Struktur',
          title: 'Menyusun Arsitektur Informasi & Alur',
          description:
            'Merancang urutan bagian halaman, alur input pengguna (seperti pencarian produk, tahap konstruksi, atau kalkulator), dan skema data.',
        },
        {
          number: '03',
          phase: 'Desain',
          title: 'Tipografi, Hirarki Visual & State UI',
          description:
            'Menentukan palet kontras yang terbaca, tata letak responsif mobile ke desktop, serta state kosong, loading, dan error.',
        },
        {
          number: '04',
          phase: 'Implementasi',
          title: 'Membangun Kode atau File Siap Produksi',
          description:
            'Menerjemahkan rancangan ke komponen React/Next.js/Three.js yang modular, atau menyiapkan file pracetak mesin UV dan komposisi After Effects.',
        },
        {
          number: '05',
          phase: 'Validasi',
          title: 'Uji Fungsi, Responsivitas & Kejujuran Status',
          description:
            'Memeriksa tautan, tampilan lintas ukuran layar, perhitungan logika, proteksi rute, atau akurasi warna cetak sebelum diserahkan.',
        },
      ],
    },
    about: {
      index: '06 / ABOUT & SKILLS',
      label: 'Web Creator • Graphic & Brand Designer • Jakarta Utara',
      heading: 'Tentang & Keahlian',
      fullPageLink: 'Halaman Profil Lengkap (/about)',
      philosophyLabel: 'Prinsip Kerja • Desain hingga Implementasi',
      philosophyQuote:
        '“Desain yang berguna tidak berhenti pada tampilan statis: ia harus jelas dibaca, jujur pada fungsinya, dan rapi saat dioperasikan maupun dicetak.”',
      roleBadge: 'Web & Visual Designer',
      locationShort: 'Jakarta Utara',
      toeicLabel: 'Skor TOEIC (ETS)',
      ukbiLabel: 'Sertifikasi UKBI',
      tracksMetricValue: '2 Jalur',
      tracksMetricLabel: 'Web & Produksi Visual',
      experienceHeading: 'Pengalaman Kerja & Organisasi',
      educationHeading: 'Pendidikan & Sertifikasi Resmi',
      skillsLabel: 'Keahlian Terverifikasi',
      toolsLabel: 'Teknologi & Perangkat Kerja',
      downloadCv: 'Unduh CV (PDF)',
    },
    services: {
      index: '07 / CAPABILITIES & SERVICES',
      label: 'Cakupan Kolaborasi & Freelance',
      heading: 'Layanan Web & Desain',
      subtitle:
        'Dukungan terarah untuk pembuatan website bisnis, antarmuka web interaktif, materi kampanye e-commerce, hingga produksi cetak kustom dan motion.',
      deliverablesLabel: 'Output Pekerjaan',
    },
    contact: {
      index: '07 / CONTACT',
      label: 'Lamaran Kerja & Diskusi Proyek Freelance',
      heading: 'Hubungi Ray Raharja',
      subtitle:
        'Terbuka untuk peluang kerja penuh waktu (Frontend / UI-UX / Graphic & Brand Designer) maupun pengerjaan proyek freelance. Setiap pesan ditinjau langsung oleh Ray.',
      directChannels: 'Kanal Kontak Aktif',
      emailCardLabel: 'Email Langsung',
      whatsappCardLabel: 'WhatsApp Langsung',
      networkLabel: 'Jejaring & Dokumen Profil',
      cvLinkLabel: 'Unduh CV (PDF)',
      whatsappPrefill:
        'Halo Ray, saya melihat portofolio terintegrasi Anda dan ingin mendiskusikan peluang kerja / proyek.',
      fallbackNoticeTitle: 'Kirim Langsung via Email atau WhatsApp',
      fallbackNoticeDesc:
        'Penyimpanan formulir server sedang tidak aktif pada environment ini agar tidak ada pesan yang hilang diam-diam. Klik tombol di bawah untuk membuka aplikasi email Anda dengan isi pesan yang sudah terisi otomatis.',
      openMailClientCta: 'Buka Aplikasi Email (Isi Otomatis)',
      form: {
        nameLabel: 'Nama Lengkap',
        namePlaceholder: 'Nama Anda atau tim perekrut / perusahaan',
        emailLabel: 'Alamat Email',
        emailPlaceholder: 'nama@perusahaan.com',
        messageLabel: 'Kebutuhan Proyek / Posisi',
        messagePlaceholder:
          'Jelaskan posisi atau ruang lingkup proyek (Website Bisnis, UI/UX, Web Interaktif, atau Desain Visual), jadwal, dan detail kontak...',
        requiredNote:
          '* Wajib diisi. Dilindungi validasi server, pembatas laju permintaan, dan filter anti-spam.',
        submit: 'Kirim Pesan',
        submitting: 'Memproses Pesan...',
        successTitle: 'Pesan Berhasil Tersimpan',
        successDesc:
          'Terima kasih telah menghubungi. Pesan Anda telah tercatat dan akan dibalas dalam 1-2 hari kerja.',
        errorName: 'Nama lengkap minimal 2 karakter.',
        errorEmail: 'Masukkan alamat email yang valid.',
        errorMessage: 'Pesan minimal 10 karakter agar konteks jelas.',
        errorGeneric:
          'Gagal menyimpan pesan ke server. Silakan gunakan tautan Email atau WhatsApp langsung.',
      },
    },
    projectsPage: {
      eyebrow: 'DIREKTORI LENGKAP & BUKTI KERJA',
      heading: 'Semua Proyek Web & Karya Desain',
      subtitle:
        'Telusuri 5 proyek aplikasi/website dengan live demo dan studi kasus teknis, bersama 12 arsip karya desain grafis, branding, motion, dan video.',
      searchLabel: 'Cari proyek, teknologi, atau topik',
      searchPlaceholder: 'Ketik mis. Three.js, Bakery, PPDB, KODAD, Motion...',
      clearSearch: 'Hapus pencarian',
      trackFilterLabel: 'Filter Jalur Karya',
      tracks: {
        all: 'Semua Karya',
        web: 'Web & Digital Products',
        visual: 'Visual Design & Production',
      },
      capabilityFilterLabel: 'Filter Kapabilitas',
      allCapabilities: 'Semua Kapabilitas',
      resultsCount: 'Menampilkan',
      ofCount: 'dari',
      itemsUnit: 'karya',
      webSectionHeading: 'Web & Digital Products (Studi Kasus & Live Demo)',
      visualSectionHeading: 'Visual Design & Production (Arsip Karya Studio)',
      emptyTitle: 'Tidak ada proyek yang cocok dengan filter ini',
      emptyDesc:
        'Coba kata kunci lain atau atur ulang filter jalur dan kapabilitas untuk melihat seluruh portofolio.',
      resetAll: 'Atur Ulang Semua Filter',
      screenshotUnavailable: 'Screenshot belum tersedia',
      viewCaseStudy: 'Baca Studi Kasus',
      openLiveDemo: 'Live Demo',
      viewVisualCase: 'Detail Karya Visual',
    },
    caseStudy: {
      backToProjects: 'Kembali ke Semua Proyek',
      liveDemoButton: 'Buka Live Demo Asli',
      externalHint: 'Membuka tab baru ke deployment Vercel asli',
      verifiedOn: 'Tanggal pemeriksaan',
      roleHeading: 'Peran & Konteks Tim',
      stackHeading: 'Teknologi Teridentifikasi (Repository)',
      statusHeading: 'Status Proyek',
      sec01Overview: '01 / Tinjauan Proyek & Tujuan',
      goalsSubheading: 'Tujuan Utama',
      sec02ProblemUsers: '02 / Masalah & Target Pengguna',
      problemSubheading: 'Masalah / Kebutuhan yang Diselesaikan',
      usersSubheading: 'Target Pengguna',
      sec03RoleTeam: '03 / Peran Ray, Tim & Batas Kontribusi',
      teamSetupSubheading: 'Susunan Tim',
      boundariesSubheading: 'Batas Kontribusi yang Terverifikasi',
      confirmationBadge: 'Catatan Konfirmasi Editorial',
      sec04VerifiedFeatures: '04 / Daftar Fitur & Status Verifikasi',
      featureCol: 'Fitur / Modul',
      statusCol: 'Status Bukti',
      evidenceCol: 'Bukti Pemeriksaan Aktual',
      sec05TechArchitecture: '05 / Teknologi & Alur Arsitektur',
      techSourceLabel: 'Sumber Verifikasi Stack',
      flowSubheading: 'Ringkasan Arsitektur & Alur Fitur',
      sec06Screenshots: '06 / Bukti Screenshot Asli (Desktop & Mobile)',
      enlargeHint: 'Klik gambar untuk memperbesar layar penuh',
      desktopBadge: 'Desktop 1440×900',
      mobileBadge: 'Mobile 390×844',
      sec07Decisions: '07 / Keputusan Desain, Implementasi & Tantangan',
      sec08Limitations: '08 / Status Kejujuran, Simulasi & Batasan Saat Ini',
      limitationsSubheading: 'Batasan & Bagian yang Belum Selesai',
      sec09EvidenceQa: '09 / Proof of Work & Catatan Pengujian QA',
      liveLinkLabel: 'URL Live Demo Publik',
      repoStatusLabel: 'Status Repository',
      qaTableHeading: 'Ringkasan Pemeriksaan Terdokumentasi',
      nextCaseStudy: 'Studi Kasus Web Berikutnya',
      ctaHeading: 'Tertarik Mendiskusikan Proyek Serupa atau Posisi Kerja?',
      ctaDesc:
        'Hubungi Ray untuk membahas pengembangan website bisnis, antarmuka interaktif, atau kebutuhan desain komunikasi visual.',
      ctaPrimary: 'Hubungi Ray Sekarang',
      ctaSecondary: 'Lihat Semua Proyek',
    },
    projectDetail: {
      backToWorks: 'Kembali ke Karya Desain',
      allProjectsLink: 'Jelajahi Proyek Web (/projects)',
      client: 'Klien / Konteks',
      year: 'Tahun',
      role: 'Peran',
      tools: 'Perangkat & Produksi',
      overview: 'Tinjauan & Konteks Karya',
      galleryLabel: 'Dokumentasi Visual & Plate Karya',
      clickToEnlarge: 'Klik media untuk layar penuh',
      nextProjectLabel: 'Karya Visual Berikutnya',
      exploreNext: 'Buka Karya Berikutnya',
    },
    footer: {
      tagline:
        'Pusat portofolio terintegrasi Web & Digital Products serta Visual Design & Production.',
      navHeading: 'Navigasi Utama',
      demosHeading: 'Live Demo Proyek Web',
      contactHeading: 'Kontak Langsung',
      privacyNote:
        'Privasi: Formulir kontak hanya digunakan untuk membalas pesan Anda dan tidak mengirim pelacak analitik pihak ketiga.',
      rights: 'Hak Cipta Dilindungi.',
      backToTop: 'Ke Atas',
    },
    cursor: {
      view: 'Buka',
    },
    lightbox: {
      viewerLabel: 'Penampil Media Layar Penuh',
      zoomIn: 'Perbesar Gambar',
      zoomOut: 'Perkecil Gambar',
      close: 'Tutup Layar Penuh (Esc)',
      prev: 'Media Sebelumnya',
      next: 'Media Berikutnya',
      hint: 'Gunakan tombol panah kiri/kanan atau geser layar • Esc untuk tutup',
    },
  },
  en: {
    nav: {
      home: 'Home',
      projects: 'Projects',
      visualWorks: 'Visual Design',
      about: 'About',
      contact: 'Contact',
      menuOpen: 'Open Navigation Menu',
      menuClose: 'Close Navigation Menu',
    },
    hero: {
      indexLabel: 'INTEGRATED PORTFOLIO 2025-2026',
      locationLabel: 'NORTH JAKARTA, INDONESIA • WEB & VISUAL DESIGN',
      available: 'Available for Roles & Freelance Projects',
      unavailable: 'Booked This Quarter • Open for Upcoming Discussions',
      eyebrow: 'Web & Digital Products • Visual Design & Production',
      tagline: 'Designing useful digital experiences. Building them to work.',
      subtitle:
        'I design and build business websites and interactive web experiences, focusing on user needs, visual clarity, and practical feature implementation.',
      ctaExplore: 'View All Projects',
      ctaContact: 'Contact Ray',
      trackWebTitle: 'Web & Digital Products',
      trackWebDesc:
        'Business websites, interactive calculators, dashboard explorations, and browser 3D visualizations backed by testable live demos.',
      trackWebAction: 'Browse 5 Web Projects',
      trackVisualTitle: 'Visual Design & Production',
      trackVisualDesc:
        'Marketplace e-commerce campaigns, technical product infographics, editorial carousels, UV print production, 2.5D motion, and short-form video.',
      trackVisualAction: 'Browse 12 Visual Works',
    },
    featuredWeb: {
      index: '01 / FEATURED PROJECTS',
      label: 'Highlighted Web & Interactive Work',
      heading: 'Featured Web Projects',
      subtitle:
        'Three selected web projects with public live demos, genuine captured screenshots, and case studies separating verified features from simulations.',
      viewAllCta: 'All Projects & Filters',
      caseStudyCta: 'Read Case Study',
      liveDemoCta: 'Open Live Demo',
      verifiedDatePrefix: 'Verified',
      roleLabel: 'Role',
      stackLabel: 'Verified Stack',
    },
    capabilities: {
      index: '02 / CAPABILITIES',
      label: 'Practice Areas & Verifiable Work',
      heading: 'Filter by Capability',
      subtitle:
        'Select a practice area to filter matching web applications and visual design works directly.',
      exploreAction: 'Filter Matching Work',
    },
    moreWeb: {
      index: '03 / MORE WEB PROJECTS',
      label: 'System Explorations & Prototypes',
      heading: 'More Web Projects',
      subtitle:
        'An institutional school portal prototype and a B2B circular-economy interface exploration documented with transparent technical boundaries.',
    },
    works: {
      index: '04 / SELECTED DESIGN WORK',
      label: 'Graphic, Brand, Motion & Video Archive (2025-2026)',
      heading: 'Selected Design Work',
      subtitle:
        'Real visual communication works spanning marketplace e-commerce campaigns, UV print production, continuous carousels, 2.5D motion, and video cuts.',
      viewAllProjectsLink: 'Browse Complete Project Directory (/projects)',
      categories: {
        Semua: 'All Works',
        Branding: 'Branding',
        'Graphic Design': 'Graphic Design',
        Motion: 'Motion',
        'Video Editing': 'Video Editing',
      },
      emptyTitle: 'No works found in this category',
      emptyDesc:
        'Select another discipline or reset the filter to view the complete visual archive.',
      resetFilter: 'Show All Visual Works',
      viewProject: 'View Work Details',
      featuredBadge: 'Selected',
    },
    howIWork: {
      index: '05 / HOW I WORK',
      label: 'Practical Working Method',
      heading: 'How I Work',
      subtitle:
        'The five-step workflow I use across web builds and visual production so deliverables solve concrete user and business needs.',
      steps: [
        {
          number: '01',
          phase: 'Discovery',
          title: 'Clarify Context & Real Requirements',
          description:
            'Identify page or campaign goals, target readers/buyers, technical or print constraints, and essential information hierarchy.',
        },
        {
          number: '02',
          phase: 'Structure',
          title: 'Map Information Architecture & Flows',
          description:
            'Outline section sequence, interactive user inputs (catalog filters, construction stages, or calculators), and data models.',
        },
        {
          number: '03',
          phase: 'Design',
          title: 'Typography, Contrast & Interface States',
          description:
            'Establish readable contrast pairs, mobile-to-desktop responsive grids, and clear empty, loading, and error states.',
        },
        {
          number: '04',
          phase: 'Implementation',
          title: 'Build Modular Code or Print-Ready Plates',
          description:
            'Translate designs into typed React/Next.js/Three.js components, or prepare calibrated UV print files and After Effects compositions.',
        },
        {
          number: '05',
          phase: 'Validation',
          title: 'Test Links, Viewports & Honest Boundaries',
          description:
            'Verify links, responsive layouts across screen sizes, formula math, route guards, or physical print output before handoff.',
        },
      ],
    },
    about: {
      index: '06 / ABOUT & SKILLS',
      label: 'Web Creator • Graphic & Brand Designer • North Jakarta',
      heading: 'About & Skills',
      fullPageLink: 'Full Profile Page (/about)',
      philosophyLabel: 'Working Principle • Design Through Implementation',
      philosophyQuote:
        '“Useful design does not stop at a static mockup: it stays legible, honest about what it does, and dependable in browser code or print production.”',
      roleBadge: 'Web & Visual Designer',
      locationShort: 'North Jakarta',
      toeicLabel: 'TOEIC Score (ETS)',
      ukbiLabel: 'UKBI Certification',
      tracksMetricValue: '2 Tracks',
      tracksMetricLabel: 'Web & Visual Production',
      experienceHeading: 'Work & Organizational Experience',
      educationHeading: 'Education & Official Certifications',
      skillsLabel: 'Verified Capabilities',
      toolsLabel: 'Technologies & Primary Tools',
      downloadCv: 'Download CV (PDF)',
    },
    services: {
      index: '07 / CAPABILITIES & SERVICES',
      label: 'Freelance & Collaboration Scope',
      heading: 'Web & Design Services',
      subtitle:
        'Practical execution across business websites, interactive web interfaces, e-commerce visual campaigns, UV print production, and short-form motion.',
      deliverablesLabel: 'Typical Deliverables',
    },
    contact: {
      index: '07 / CONTACT',
      label: 'Job Opportunities & Freelance Inquiries',
      heading: 'Contact Ray Raharja',
      subtitle:
        'Open to full-time roles (Frontend / UI-UX / Graphic & Brand Designer) and freelance projects. Every message goes directly to Ray.',
      directChannels: 'Active Direct Channels',
      emailCardLabel: 'Direct Email',
      whatsappCardLabel: 'Direct WhatsApp',
      networkLabel: 'Profiles & Resume',
      cvLinkLabel: 'Download CV (PDF)',
      whatsappPrefill:
        'Hello Ray, I explored your integrated portfolio and would like to discuss a role or project.',
      fallbackNoticeTitle: 'Continue Directly via Email or WhatsApp',
      fallbackNoticeDesc:
        'Server database storage is not active in this deployment environment so messages are never silently dropped. Click below to open your email client with your message pre-filled.',
      openMailClientCta: 'Open Email Client (Pre-Filled)',
      form: {
        nameLabel: 'Full Name',
        namePlaceholder: 'Your name, hiring team, or company',
        emailLabel: 'Email Address',
        emailPlaceholder: 'name@company.com',
        messageLabel: 'Role or Project Details',
        messagePlaceholder:
          'Share the role or project scope (Business Website, UI/UX, Interactive Web, or Visual Design), timeline, and how best to reach you...',
        requiredNote:
          '* Required. Protected by server validation, rate limiting, and honeypot spam filtering.',
        submit: 'Send Message',
        submitting: 'Processing...',
        successTitle: 'Your Message Was Saved',
        successDesc:
          'Thank you for reaching out. Your message has been recorded and I will reply within 1-2 business days.',
        errorName: 'Full name must be at least 2 characters.',
        errorEmail: 'Please enter a valid email address.',
        errorMessage: 'Message must be at least 10 characters.',
        errorGeneric:
          'Could not persist message on the server. Please use the direct Email or WhatsApp links.',
      },
    },
    projectsPage: {
      eyebrow: 'COMPLETE DIRECTORY & PROJECT EVIDENCE',
      heading: 'All Web Projects & Visual Works',
      subtitle:
        'Explore 5 web applications/websites with public live demos and technical case studies, alongside 12 graphic design, branding, motion, and video works.',
      searchLabel: 'Search projects, stack, or topics',
      searchPlaceholder: 'Type e.g. Three.js, Bakery, PPDB, KODAD, Motion...',
      clearSearch: 'Clear search',
      trackFilterLabel: 'Filter by Track',
      tracks: {
        all: 'All Work',
        web: 'Web & Digital Products',
        visual: 'Visual Design & Production',
      },
      capabilityFilterLabel: 'Filter by Capability',
      allCapabilities: 'All Capabilities',
      resultsCount: 'Showing',
      ofCount: 'of',
      itemsUnit: 'items',
      webSectionHeading: 'Web & Digital Products (Case Studies & Live Demos)',
      visualSectionHeading: 'Visual Design & Production (Studio Archive)',
      emptyTitle: 'No projects match these filters',
      emptyDesc:
        'Try a different search term or reset the track and capability filters to view all portfolio work.',
      resetAll: 'Reset All Filters',
      screenshotUnavailable: 'Screenshot not yet available',
      viewCaseStudy: 'View Case Study',
      openLiveDemo: 'Live Demo',
      viewVisualCase: 'View Visual Work',
    },
    caseStudy: {
      backToProjects: 'Back to All Projects',
      liveDemoButton: 'Open Live Demo',
      externalHint: 'Opens external Vercel deployment in a new tab',
      verifiedOn: 'Verified on',
      roleHeading: 'Role & Team Context',
      stackHeading: 'Verified Tech Stack (Repository)',
      statusHeading: 'Project Status',
      sec01Overview: '01 / Project Overview & Goals',
      goalsSubheading: 'Primary Goals',
      sec02ProblemUsers: '02 / Problem & Target Users',
      problemSubheading: 'Problem / Need Addressed',
      usersSubheading: 'Target Users',
      sec03RoleTeam: '03 / Ray’s Role, Team & Contribution Boundaries',
      teamSetupSubheading: 'Team Structure',
      boundariesSubheading: 'Verified Contribution Scope',
      confirmationBadge: 'Editorial Confirmation Note',
      sec04VerifiedFeatures: '04 / Verified Features & Status Ledger',
      featureCol: 'Feature / Module',
      statusCol: 'Evidence Status',
      evidenceCol: 'Recorded Verification Evidence',
      sec05TechArchitecture: '05 / Tech Stack & Architecture Flow',
      techSourceLabel: 'Stack Verification Source',
      flowSubheading: 'Architecture & Feature Flow Summary',
      sec06Screenshots: '06 / Authentic Live Screenshots (Desktop & Mobile)',
      enlargeHint: 'Click any screenshot to inspect fullscreen',
      desktopBadge: 'Desktop 1440×900',
      mobileBadge: 'Mobile 390×844',
      sec07Decisions: '07 / Design Decisions, Implementation & Challenges',
      sec08Limitations: '08 / Honest Status, Simulation Scope & Limitations',
      limitationsSubheading: 'Known Limitations & Unfinished Scope',
      sec09EvidenceQa: '09 / Proof of Work & QA Verification Log',
      liveLinkLabel: 'Public Live Demo URL',
      repoStatusLabel: 'Repository Status',
      qaTableHeading: 'Recorded QA Checks',
      nextCaseStudy: 'Next Web Case Study',
      ctaHeading: 'Interested in Discussing a Similar Project or Role?',
      ctaDesc:
        'Reach out to Ray to discuss business websites, interactive web interfaces, or visual design production.',
      ctaPrimary: 'Contact Ray',
      ctaSecondary: 'Browse All Projects',
    },
    projectDetail: {
      backToWorks: 'Back to Design Works',
      allProjectsLink: 'Browse Web Projects (/projects)',
      client: 'Client / Context',
      year: 'Year',
      role: 'Role',
      tools: 'Tools & Production',
      overview: 'Work Overview & Context',
      galleryLabel: 'Visual Documentation & Plates',
      clickToEnlarge: 'Click media for fullscreen view',
      nextProjectLabel: 'Next Visual Work',
      exploreNext: 'Open Next Work',
    },
    footer: {
      tagline:
        'Integrated portfolio hub uniting Web & Digital Products with Visual Design & Production.',
      navHeading: 'Navigation',
      demosHeading: 'Live Web Demos',
      contactHeading: 'Direct Contact',
      privacyNote:
        'Privacy: Contact submissions are used strictly to reply to your inquiry; no third-party ad or analytics trackers are loaded.',
      rights: 'All Rights Reserved.',
      backToTop: 'Back to Top',
    },
    cursor: {
      view: 'Open',
    },
    lightbox: {
      viewerLabel: 'Fullscreen Media Viewer',
      zoomIn: 'Zoom In Image',
      zoomOut: 'Zoom Out Image',
      close: 'Close Fullscreen (Esc)',
      prev: 'Previous Media',
      next: 'Next Media',
      hint: 'Use Left/Right arrow keys or swipe • Press Esc to close',
    },
  },
} as const;

type DeepWiden<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly DeepWiden<U>[]
    : T extends object
      ? { [K in keyof T]: DeepWiden<T[K]> }
      : T;

export type Dictionary = DeepWiden<(typeof dictionaries)['id']>;
