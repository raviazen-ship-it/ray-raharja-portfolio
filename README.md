# Ray Raharja Santoso — Studio Portofolio ("Onyx & Brass")

Website portofolio kelas agensi untuk **Ray Raharja Santoso** (Graphic & Brand Designer, Motion Designer, dan Video Editor). Dirancang dengan arah visual **Onyx & Brass** (editorial, tenang, mewah, presisi tipografi majalah desain).

## Tech Stack
- **Framework**: Next.js 14 (App Router, TypeScript)
- **Styling & Tipografi**: Tailwind CSS, CSS Variables (`--onyx`, `--onyx-2`, `--line`, `--brass`, `--brass-light`, `--ivory`, `--muted`), `next/font/local` (`Cormorant Garamond` & `DM Sans`)
- **Animasi & Interaksi**: Framer Motion, Lenis Smooth Scroll, Custom Cursor (`Lihat`), Fullscreen Lightbox
- **Backend & Database**: Supabase (Auth, PostgreSQL + RLS, Storage, Realtime) + Fallback Penyimpanan Lokal Otomatis (`.data/local-db.json`)

---

## Panduan Setup Supabase (Langkah demi Langkah untuk Pemula)

1. **Buat Proyek Supabase Baru**
   - Buka [https://supabase.com](https://supabase.com) dan masuk ke akun Anda.
   - Klik **New Project**, pilih organisasi, beri nama proyek `ray-raharja-portfolio`, buat password database yang kuat, pilih region terdekat (misal: **Southeast Asia (Singapore)**), lalu klik **Create new project**.

2. **Jalankan SQL Migrasi & Seed Data**
   - Di sidebar kiri dashboard Supabase, buka menu **SQL Editor** lalu klik **New query**.
   - Buka file [`supabase/migrations/001_initial_schema.sql`](./supabase/migrations/001_initial_schema.sql), salin seluruh isinya, tempel ke SQL Editor,(ubah email default di fungsi `public.is_admin()` jika Anda memakai email selain `ray.raharja@studio-onyx.id`), lalu klik **Run**.
   - Buat query baru lagi, salin seluruh isi file [`supabase/seed.sql`](./supabase/seed.sql), tempel ke SQL Editor, lalu klik **Run** untuk mengisi 6 proyek contoh dan pengaturan awal situs.

3. **Verifikasi Storage Bucket (`portfolio-media`)**
   - Buka menu **Storage** di sidebar kiri Supabase.
   - Pastikan bucket bernama `portfolio-media` sudah otomatis terbuat (dari script SQL migrasi) dengan label **Public**.

4. **Buat Akun Admin Tunggal di Supabase Auth**
   - Buka menu **Authentication** -> **Users** di dashboard Supabase.
   - Klik **Add user** -> **Create new user**.
   - Masukkan alamat email admin utama Anda (wajib sama persis dengan `ADMIN_EMAIL` di `.env.local`) dan kata sandi yang kuat, centang **Auto Confirm User**, lalu klik **Create user**.

5. **Salin API Keys ke `.env.local`**
   - Buka **Project Settings** (ikon roda gigi) -> **API**.
   - Salin **Project URL**, **anon public key**, dan **service_role secret key** ke dalam file `.env.local`:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
     SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
     ADMIN_EMAIL=ray.raharja@studio-onyx.id
     ADMIN_SESSION_SECRET=isi-dengan-string-acak-panjang-minimal-32-karakter
     NEXT_PUBLIC_SITE_URL=https://rayraharja.studio
     ```

---

## Panduan Deploy ke Vercel & Menghubungkan Domain Kustom

1. **Unggah Kode ke GitHub**
   ```bash
   git init
   git add .
   git commit -m "feat: initial release Ray Raharja Santoso Onyx & Brass portfolio"
   git branch -M main
   git remote add origin https://github.com/username/ray-raharja-portfolio.git
   git push -u origin main
   ```

2. **Impor Proyek di Vercel**
   - Buka [https://vercel.com/new](https://vercel.com/new) dan login dengan GitHub.
   - Pilih repositori `ray-raharja-portfolio` lalu klik **Import**.
   - Pada bagian **Environment Variables**, tambahkan seluruh variabel dari `.env.local` (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_EMAIL`, `ADMIN_SESSION_SECRET`, `NEXT_PUBLIC_SITE_URL`).
   - Klik **Deploy**.

3. **Menghubungkan Domain Kustom (misal: `rayraharja.studio`)**
   - Setelah deploy selesai, buka dashboard proyek di Vercel -> tab **Settings** -> **Domains**.
   - Ketik nama domain Anda (`rayraharja.studio`) lalu klik **Add**.
   - Buka panel DNS tempat Anda membeli domain (Cloudflare / Niagahoster / Namecheap / Google Domains), lalu tambahkan record DNS sesuai instruksi Vercel:
     - **A Record**: Host `@` -> Value `76.76.21.21`
     - **CNAME Record**: Host `www` -> Value `cname.vercel-dns.com`
   - Tunggu propagasi DNS (biasanya 5–30 menit). Sertifikat SSL (HTTPS) akan aktif secara otomatis.
