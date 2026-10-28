# Ray Raharja Santoso - Integrated Portfolio Hub

Portofolio terintegrasi kelas agensi untuk **Ray Raharja Santoso** yang menyatukan dua pilar keahlian: **Web & Digital Products** (arsitektur full-stack, 3D WebGL, e-commerce, enterprise dashboard) dan **Visual Design & Production** (brand identity, motion graphics, kemasan komersial, video production).

Dibangun dengan pendekatan desain **Onyx & Brass** (editorial tenang, tipografi presisi, arsitektur data terverifikasi, dan zero AI slop).

---

## 1. Ringkasan Arsitektur & Teknologi

- **Framework**: Next.js 14.2.35 (App Router, TypeScript 5.7.2, React 18.3.1)
- **Styling**: Tailwind CSS 3.4.17 dengan CSS Custom Properties (`--onyx`, `--onyx-2`, `--line`, `--border-control`, `--brass`, `--brass-light`, `--ivory`, `--muted`), font lokal `Cormorant Garamond` & `DM Sans`
- **Animasi & Interaksi**: Framer Motion 11, Lenis Smooth Scroll, Accessible Lightbox, responsive touch-friendly navigation
- **Interactive Live Sandbox**:
  - Simulator browser interaktif langsung di Beranda (`/`) dan di setiap halaman studi kasus (`/projects/[slug]`)
  - Pengganti resolusi viewport instan: Desktop (100%), Tablet (768px), dan Mobile (390px)
  - Mode ganda: Web Interaktif Langsung (iframe sandbox) dan Tangkapan Layar HD
  - Modal pratinjau global (`LivePreviewModal`) yang dapat dipicu dari setiap kartu proyek
- **Bilingual i18n**: Sistem dwibahasa penuh (`ID` / `EN`) berbasis konteks klien tanpa reload halaman, type-safe via `DeepWiden` dictionary
- **Data Layer & Keamanan**:
  - Sumber data proyek web tunggal: [`src/lib/web-projects-data.ts`](./src/lib/web-projects-data.ts)
  - Sumber data karya visual tunggal: [`src/lib/seed-data.ts`](./src/lib/seed-data.ts)
  - Abstraksi repository: [`src/lib/repository.ts`](./src/lib/repository.ts) dengan fallback lokal otomatis (`.data/local-db.json`) jika Supabase tidak terhubung
  - Autentikasi sesi admin: Web Crypto HMAC-SHA256 cookie dengan proteksi timing-safe, Origin check, dan rate limiting di API routes
  - Verifikasi otomatis: [`scripts/verify-portfolio.mjs`](./scripts/verify-portfolio.mjs)

---

## 2. Struktur Halaman & Rute Aplikasi

| Rute | Deskripsi & Komponen Utama |
|---|---|
| `/` | Beranda terintegrasi (Hero 2-track, Featured Web, Capability Explorer, Karya Visual Terpilih, How I Work, About, Services, Contact, Footer) |
| `/projects` | Direktori lengkap proyek web dengan filter track (Web App, Enterprise, E-Commerce, 3D) dan kapabilitas |
| `/projects/[slug]` | Halaman studi kasus mendalam untuk 5 proyek web utama dengan screenshot asli, bukti kerja, dan navigasi proyek terkait |
| `/karya/[slug]` | Halaman detail karya visual (12 karya grafis, branding, kemasan, motion, dan video) dengan galeri lightbox |
| `/about` | Profil lengkap Ray Raharja Santoso, filosofi kerja, keahlian teknis, dan riwayat profesional |
| `/contact` | Formulir kontak fungsional dengan fallback terhubung (WhatsApp & mailto) serta validasi data |
| `/admin/login` | Portal masuk aman bagi pemilik situs tanpa petunjuk kredensial atau auto-fill publik |
| `/admin` | Panel manajemen konten terlindungi sesi cookie HMAC |
| `/opengraph-image` | Penghasil kartu OpenGraph dinamis (1200x630 PNG) menggunakan `@vercel/og` |
| `/sitemap.xml` | Peta situs XML dinamis mencakup seluruh halaman statis dan studi kasus |
| `/robots.txt` | Konfigurasi perayap web yang mengizinkan rute publik dan memblokir rute admin |

---

## 3. Cara Menjalankan di Komputer Lokal

### Prasyarat
- Node.js versi 18.18 atau lebih baru (disarankan Node.js 20+)
- npm versi 9 atau lebih baru

### Langkah Instalasi
1. Gandakan repositori dan masuk ke direktori:
   ```bash
   cd ray-raharja-portfolio
   ```

2. Pasang dependensi:
   ```bash
   npm install
   ```

3. Siapkan environment variable lokal:
   ```bash
   cp .env.example .env.local
   ```
   Isi `ADMIN_PASSWORD` dan `ADMIN_SESSION_SECRET` (string acak minimal 32 karakter). Jika Supabase belum disiapkan, aplikasi otomatis menggunakan penyimpanan lokal (`.data/local-db.json`).

4. Jalankan server pengembangan:
   ```bash
   npm run dev
   ```
   Buka browser di `http://localhost:3000`.

---

## 4. Perintah QA dan Verifikasi

Repositori dilengkapi script verifikasi otomatis untuk memastikan integritas kode dan data:

```bash
# 1. Typecheck TypeScript
npm run typecheck

# 2. Linting ESLint
npm run lint

# 3. Verifikasi Integritas Data & Bukti Kerja
npm run verify

# 4. Build Produksi
npm run build
```

Script `npm run verify` memeriksa secara otomatis:
- Status seluruh 5 proyek web sesuai daftar status resmi (Verified Feature, Interactive Demo, Prototype, In Development, Live Product).
- Tanggal verifikasi sesuai tanggal pemeriksaan aktual (2026-10-28).
- Seluruh 15 file screenshot asli di `public/images/projects/` berukuran valid (>10 KB).
- Seluruh file media dari 12 karya visual di `public/works/` tersedia di disk.
- Zero em dash (`\u2014`) pada seluruh source code.
- File `.env.example` bersih dari rahasia nyata.

---

## 5. Konfigurasi Environment Variables

File `.env.example` menyediakan contoh konfigurasi tanpa mengekspos rahasia produksi:

```env
# URL publik deployment (digunakan untuk canonical URL & sitemap)
NEXT_PUBLIC_SITE_URL=https://ray-raharja-portfolio.vercel.app

# Supabase API (opsional, fallback lokal aktif jika kosong)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Autentikasi Pengelola / Admin
ADMIN_EMAIL=ray.raharja@studio-onyx.id
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
```

---

## 6. Panduan Deployment Aman ke Vercel

1. **Pastikan Build Bersih**: Jalankan `npm run typecheck`, `npm run lint`, dan `npm run build` di lokal.
2. **Konfigurasi Vercel Environment Variables**:
   - Masuk ke dashboard proyek Vercel -> **Settings** -> **Environment Variables**.
   - Masukkan `ADMIN_PASSWORD` (gunakan password yang kuat).
   - Masukkan `ADMIN_SESSION_SECRET` (string acak minimal 32 karakter).
   - Masukkan kredensial Supabase jika menggunakan database cloud.
3. **Deploy**:
   - Lakukan push ke branch utama repositori GitHub yang terhubung dengan Vercel, atau deploy via Vercel CLI.
   - Jangan menyertakan file `.env.local` ke dalam git.
