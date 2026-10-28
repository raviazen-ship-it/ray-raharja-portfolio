# BUKTI KERJA & STATUS PROYEK TERVERIFIKASI (PROJECT EVIDENCE)

**Tanggal Verifikasi**: 2026-10-28  
**Standar Status**: Berdasarkan bukti kerja nyata dan verifikasi kode sumber langsung.

---

## 1. Daftar 5 Proyek Web & Produk Digital

### Proyek 1: Leadkit Bakery (Aura Artisan Bakery & Catering)
- **Slug**: `leadkit-bakery`
- **URL Demo Langsung**: [https://leadkit-bakery.vercel.app/](https://leadkit-bakery.vercel.app/)
- **Repositori Lokal**: `C:\Users\USER\.gemini\antigravity\scratch\leadkit-bakery`
- **Status Terverifikasi**: **Verified Feature** (2026-10-28)
- **Stack Teknologi**: Next.js 16.0.7 (App Router), React 19, TypeScript, Tailwind CSS, SQLite via `node:sqlite`, Context API
- **Fitur yang Berhasil Diverifikasi**:
  - Katalog produk dengan filter kategori dinamis, varian harga, dan badge batas pemesanan minimum.
  - Alur keranjang belanja lengkap dengan persistensi lokal dan opsi catatan ucapan khusus kustom.
  - Formulir checkout dengan pemilihan slot pengiriman/penjemputan dan perhitungan ongkos kirim.
  - Halaman pelacakan pesanan publik (`/pesanan/[token]`) berbasis token kriptografis acak 128-bit.
  - Modal simulasi gateway pembayaran multi-metode (QRIS, VA BCA, Mandiri) dengan peringatan simulasi.
- **Inventaris Screenshot Asli**:
  1. Desktop: `public/images/projects/leadkit-bakery-desktop.png` (1440x900, 716 KB)
  2. Katalog & Filter: `public/images/projects/leadkit-bakery-catalog.png` (1440x900, 546 KB)
  3. Mobile: `public/images/projects/leadkit-bakery-mobile.png` (780x1688, 305 KB)
- **Batasan & Kontribusi**:
  - Kontribusi Terverifikasi: Desain sistem, antarmuka storefront responsif, integrasi alur checkout, dan perbaikan keamanan token.
  - Perlu dikonfirmasi oleh Ray: Kepemilikan akun operasional WhatsApp resmi toko dan konfigurasi gateway pembayaran riil jika toko beroperasi komersial penuh.

---

### Proyek 2: ArsiViz Pro (Studio Konfigurator Arsitektur 3D)
- **Slug**: `arsiviz-pro`
- **URL Demo Langsung**: [https://arsiviz-pro.vercel.app/](https://arsiviz-pro.vercel.app/)
- **Repositori Lokal**: `C:\Users\USER\.gemini\antigravity\scratch\arsiviz-pro`
- **Status Terverifikasi**: **Verified Feature** (2026-10-28)
- **Stack Teknologi**: Next.js 14.2.35 (App Router), React 18, TypeScript, Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`), Zustand, Tailwind CSS, Framer Motion
- **Fitur yang Berhasil Diverifikasi**:
  - Kanvas 3D interaktif dengan orbit controls, rotasi kamera, zoom, dan pemilihan material bangunan.
  - Visualisasi tahapan konstruksi (Struktur Bawah, Dinding & Kolom, Atap & Finishing).
  - Mode cutaway (potongan denah arsitektur) untuk inspeksi tata ruang interior.
  - Kalkulator Rencana Anggaran Biaya (RAB) dinamis yang memperbarui estimasi biaya secara real-time saat spesifikasi diubah.
  - Sistem bookmark dan riwayat undo/redo berbasis state Zustand.
- **Inventaris Screenshot Asli**:
  1. Desktop Studio: `public/images/projects/arsiviz-pro-desktop.png` (1440x900, 405 KB)
  2. Mode Cutaway 3D: `public/images/projects/arsiviz-pro-cutaway.png` (1440x900, 316 KB)
  3. Mobile View: `public/images/projects/arsiviz-pro-mobile.png` (780x1688, 361 KB)
- **Batasan & Kontribusi**:
  - Kontribusi Terverifikasi: Pengembangan antarmuka studio, integrasi viewport WebGL Three.js, dock tahapan konstruksi, dan kalkulator estimasi material.
  - Perlu dikonfirmasi oleh Ray: Ketersediaan model 3D custom tambahan dari firma arsitektur mitra.

---

### Proyek 3: SymbioFlow Enterprise (Bursa Residu Industri B2B)
- **Slug**: `symbioflow-enterprise`
- **URL Demo Langsung**: [https://symbioflow-enterprise.vercel.app/](https://symbioflow-enterprise.vercel.app/)
- **Repositori Lokal**: `C:\Users\USER\.gemini\antigravity\scratch\symbioflow-enterprise`
- **Status Terverifikasi**: **Interactive Demo** (2026-10-28)
- **Stack Teknologi**: Vite 6.4.5, React 19, TypeScript, Three.js, Lucide Icons, Tailwind CSS
- **Fitur yang Berhasil Diverifikasi**:
  - Bursa material sirkular B2B (biomassa kelapa sawit, abu sekam silika, fly ash, slag baja) dengan ticker harga real-time.
  - Inspeksi visual 3D WebGL untuk granulasi partikel material dan tata letak kontainer kargo.
  - Simulator penalti kadar air (moisture discount) dan rekonsiliasi faktur tiga arah (3-Way Matching: PO, jembatan timbang, faktur pajak).
  - Kalkulator reduksi emisi karbon Scope-3 berbasis metodologi ISO 14064-1 & GRI 306.
  - Simulator penerbitan draf sertifikat karbon dan integrasi webhook ERP (SAP S/4HANA MM).
- **Inventaris Screenshot Asli**:
  1. Dashboard Utama: `public/images/projects/symbioflow-enterprise-desktop.png` (1440x900, 230 KB)
  2. Bursa Material & Detail: `public/images/projects/symbioflow-enterprise-bursa.png` (1440x900, 239 KB)
  3. Mobile View: `public/images/projects/symbioflow-enterprise-mobile.png` (780x1688, 163 KB)
- **Batasan & Kontribusi**:
  - Kontribusi Terverifikasi: Desain UI enterprise B2B kelas berat, implementasi alur navigasi tab, perumusan logika kalkulator karbon, dan visualisasi 3D WebGL.
  - Perlu dikonfirmasi oleh Ray: Integrasi live API backend SAP di server produksi (saat ini berjalan sebagai simulasi prototipe interaktif).

---

### Proyek 4: Sekolah Nusantara (Sistem Ekosistem Sekolah Terpadu)
- **Slug**: `sekolah-nusantara`
- **URL Demo Langsung**: [https://sekolah-nusantara-teal.vercel.app/](https://sekolah-nusantara-teal.vercel.app/)
- **Repositori Lokal**: `C:\Users\USER\.gemini\antigravity\scratch\sekolah-nusantara`
- **Status Terverifikasi**: **Prototype** (2026-10-28)
- **Stack Teknologi**: Next.js 14.2.35 (App Router), React 18, TypeScript, Tailwind CSS, LocalStorage API
- **Fitur yang Berhasil Diverifikasi**:
  - Halaman profil institusi dengan sejarah, visi-misi, daftar fasilitas dengan tab kategori, dan direktori pendidik.
  - Portal informasi PPDB online 4 jalur (Zonasi, Prestasi, Afirmasi, Mutasi) dan formulir pendaftaran interaktif.
  - Fitur pelacakan status seleksi berkas calon siswa baru.
  - Portal peran terpisah untuk Siswa, Guru, Wali Murid, dan Administrator dengan pelindung akses.
  - Pengelolaan warta pengumuman dan berita sekolah.
- **Inventaris Screenshot Asli**:
  1. Beranda Heritage: `public/images/projects/sekolah-nusantara-desktop.png` (1440x900, 160 KB)
  2. Portal PPDB: `public/images/projects/sekolah-nusantara-ppdb.png` (1440x900, 126 KB)
  3. Mobile View: `public/images/projects/sekolah-nusantara-mobile.png` (780x1688, 169 KB)
- **Batasan & Kontribusi**:
  - Kontribusi Terverifikasi: Desain visual berkarakter heritage akademis, sistem formulir berjenjang, dan arsitektur data peran.
  - Perlu dikonfirmasi oleh Ray: Sekolah mitra yang menggunakan sistem dan integrasi Dapodik/database terpusat pada masa mendatang.

---

### Proyek 5: Seumur Gerak (Platform Kesehatan & Kalkulator Gerak)
- **Slug**: `seumur-gerak`
- **URL Demo Langsung**: [https://seumur-gerak.vercel.app/#kalkulator](https://seumur-gerak.vercel.app/#kalkulator)
- **Repositori Lokal**: `C:\Users\USER\.gemini\antigravity\scratch\seumur-gerak` (Shared Repo - Tidak Dimodifikasi)
- **Status Terverifikasi**: **Verified Feature** (2026-10-28)
- **Stack Teknologi**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **Fitur yang Berhasil Diverifikasi**:
  - Kalkulator kebutuhan gerak harian interaktif berdasarkan parameter usia, jenis kelamin, dan intensitas aktivitas.
  - Navigasi anchor responsif menuju bagian kalkulator dan rekomendasi pola hidup sehat.
  - Antarmuka kampanye kesehatan publik dengan visual modern dan ramah pengguna.
- **Inventaris Screenshot Asli**:
  1. Desktop Kalkulator: `public/images/projects/seumur-gerak-desktop.png` (1440x900, 1083 KB)
  2. Hero Section: `public/images/projects/seumur-gerak-hero.png` (1440x900, 1213 KB)
  3. Mobile View: `public/images/projects/seumur-gerak-mobile.png` (780x1688, 1238 KB)
- **Batasan & Kontribusi**:
  - Kontribusi Terverifikasi: Implementasi antarmuka kalkulator interaktif dan integrasi styling frontend.
  - Perlu dikonfirmasi oleh Ray: Pembagian lingkup kontribusi spesifik dengan 4 rekan pengembang lainnya di repositori tim.

---

## 2. Daftar 12 Karya Visual & Media Produksi

Seluruh 12 karya grafis, branding, kemasan, motion, dan video editor di bawah ini tersimpan secara fisik di folder `public/works/` dan telah diverifikasi keabsahannya:

| No | Slug Karya | Judul & Kategori | Klien / Proyek | File Media Terverifikasi |
|---|---|---|---|---|
| 1 | heyxi-peach-ginseng-99-glow-sale | Heyxi Peach Ginseng 9.9 Glow Sale (Social Media & Promo) | Heyxi Official Store | 3 JPG (`key-visual`, `banner-99`, `infographic-3panel`) |
| 2 | visual-poetry-bandung-hari-ini | Visual Poetry: Bandung Hari Ini (Editorial & Typography) | Proyek Eksplorasi Pribadi | 5 JPG (`slide-1`, `panorama`, `slide-2`, `slide-3`, `slide-4`) |
| 3 | shadow-monarch-amv-solo-leveling | Shadow Monarch AMV - Solo Leveling (Motion & Video) | Channel Kreator Populer | 1 MP4 (`solo-leveling-amv`), 1 JPG (`poster`) |
| 4 | kodad-official-store-shopee-revamp | Kodad Store Shopee & Tokopedia Revamp (E-Commerce Branding) | Kodad Official Store | 5 JPG (`frame-led`, `souvenir`, `backtoschool`, `atk`, `screen-protector`) |
| 5 | kodad-case-custom-series-collection | Kodad Custom Series - UV Printing Collection (Product & Merch) | Kodad Official Store | 5 JPG (`crybaby`, `shinchan`, `doraemon`, `batik-01`, `batik-02`) |
| 6 | dtb-gadget-campaign-bundle | DTB Gadget Campaign Bundle (Social Media & Promo) | DTB Gadget Store | 6 JPG (`mid-year`, `payday`, `hangda-44`, `hangda-33`, `hangda-cx`, `dtb-imd`) |
| 7 | sutu-gadget-marketplace-launch | SUTU Gadget Official Store Launch (E-Commerce Branding) | SUTU Store | 3 JPG (`style-protection`, `buy1get1`, `welcome-store`) |
| 8 | visual-poetry-bunga-dan-patah-hati | Visual Poetry: Bunga dan Patah Hati (Editorial & Typography) | Proyek Eksplorasi Pribadi | 5 JPG (`slide-1`, `panorama`, `slide-2`, `slide-3`, `slide-4`) |
| 9 | archipreneur-booth-mockup-and-packaging | Archipreneur Booth Mockup & Packaging (Product & Merch) | Archipreneur Event | 3 JPG (`booth-design`, `pixpax-gift`, `memopi-playhouse`) |
| 10 | omniscient-reader-manhwa-motion-edit | Omniscient Reader Manhwa Motion Edit (Motion & Video) | Komunitas Webtoon | 1 MP4 (`orv-edit`), 1 JPG (`orv-poster`) |
| 11 | olshop-tempered-glass-product-infographics | Tempered Glass Product Infographics (E-Commerce Branding) | Brand Aksesoris Gadget | 5 JPG (`transparansi`, `respons`, `perekat`, `perlindungan`, `ketebalan`) |
| 12 | pop-culture-and-editorial-poster-series | Pop Culture & Editorial Poster Series (Editorial & Typography) | Seri Portofolio Mandiri | 4 JPG (`karina`, `y2k`, `erigo-jkt48`, `waguri`), 1 MP4 (`meow-cut`), 3 JPG pelatihan |
