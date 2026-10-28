# LAPORAN TINJAUAN KEAMANAN (SECURITY REVIEW)

**Tanggal Tinjauan**: 2026-10-28  
**Ruang Lingkup**: Repositori Pusat `ray-raharja-portfolio` dan 5 Repositori Proyek Terkait.  
**Prinsip Utama**: Zero-Trust, Defense-in-Depth, dan Pembersihan Total Rahasia (Zero Hardcoded Secrets).

---

## 1. Ringkasan Postur Keamanan

Audit keamanan menyeluruh telah dilakukan pada seluruh layer aplikasi, mencakup dependensi npm, konfigurasi environment variables, proteksi rute middleware, mekanisme autentikasi admin, endpoint API publik, serta penanganan file upload.

Seluruh temuan kerentanan tingkat kritis (P0) dan tinggi (P1) pada repositori yang dapat diakses telah diperbaiki di kode sumber lokal. **Tidak ada nilai password, secret key, atau token sesi yang dicantumkan dalam dokumen ini.**

---

## 2. Pemulihan Kerentanan yang Telah Diterapkan

### A. Repositori Utama (`ray-raharja-portfolio`)

1. **Patch Kerentanan Dependensi (CVE-2025-29927)**:
   - *Masalah*: Versi Next.js 14.2.24 memiliki kerentanan bypass middleware pada struktur rute tertentu.
   - *Tindakan*: Diperbarui ke Next.js 14.2.35 dan `eslint-config-next` 14.2.35.
   - *Verifikasi*: Pemeriksaan build dan typecheck berhasil tanpa peringatan.

2. **Pembersihan Rahasia di `.env.example`**:
   - *Masalah*: File template contoh memuat potongan token JWT Supabase aktif dan password contoh.
   - *Tindakan*: Dihapus seluruh nilai rahasia. File `.env.example` kini hanya berisi nama variabel kosong untuk panduan operator.

3. **Mekanisme Autentikasi Admin Tanpa Ketergantungan Secret Hardcoded**:
   - *Implementasi*: Menggunakan Web Crypto API bawaan (`crypto.subtle`) untuk hashing HMAC-SHA256 pada token sesi admin.
   - *Keamanan Cookie*: Cookie sesi diberi flag `HttpOnly`, `Secure` (pada mode produksi), `SameSite=Lax`, dan masa kedaluwarsa 8 jam.
   - *Timing-Safe Comparison*: Pengecekan password dan token menggunakan fungsi perbandingan waktu konstan (`crypto.timingSafeEqual`) untuk mencegah serangan timing analysis.

4. **Rate Limiting Sisi Server (In-Memory Sliding Window)**:
   - *Implementasi*: Modul `src/lib/rate-limit.ts` membatasi percobaan login (`POST /api/admin/login`) maksimal 5 kali per menit per IP. Jika terlampaui, server mengembalikan status `429 Too Many Requests`.
   - *Endpoint Umum*: Endpoint API admin lainnya dibatasi 60 request per menit per IP.

5. **Proteksi Akses Rute Admin & Validasi Origin**:
   - *Middleware*: `src/middleware.ts` memverifikasi sesi cookie HMAC secara kriptografis pada seluruh rute `/admin/*` (kecuali `/admin/login`). Permintaan tanpa sesi sah langsung dialihkan (`307`) ke `/admin/login`.
   - *Origin Verification*: Seluruh method mutasi (`POST`, `PUT`, `DELETE`) di API admin memvalidasi header `Origin` atau `Referer` terhadap domain yang diizinkan untuk mencegah serangan Cross-Site Request Forgery (CSRF).

6. **Verifikasi Magic-Byte pada Unggah File (`POST /api/admin/upload`)**:
   - *Implementasi*: API upload tidak hanya memeriksa ekstensi nama file, namun membaca magic byte biner awal (JPEG `FF D8 FF`, PNG `89 50 4E 47`, WebP `52 49 46 46`, MP4 `ftyp`) untuk memastikan file yang diunggah adalah media asli, bukan skrip berbahaya yang menyamar. Batas ukuran dibatasi maksimal 10 MB.

7. **Penanganan Error Formulir Kontak yang Jujur**:
   - *Implementasi*: Pada endpoint `POST /api/contact`, jika basis data cloud tidak dapat dihubungi dan penyimpanan lokal tidak tersedia, server secara transparan mengembalikan status `503 STORAGE_UNAVAILABLE` dan mengarahkan pengguna ke opsi komunikasi cadangan (tautan `mailto:` terisi dan WhatsApp resmi), bukan menampilkan notifikasi sukses palsu.

---

### B. Proyek Eksternal Terkait

1. **Leadkit Bakery (`leadkit-bakery`)**:
   - *Penolakan Pembayaran Sisi Klien*: Input `payment_status: 'Dibayar'` dari klien tidak lagi dipercaya langsung. Status pembayaran disimpan sebagai `'Menunggu Verifikasi'` sampai ada verifikasi server yang sah.
   - *Token Kriptografis Acak*: Token pesanan diganti menggunakan 16 byte acak kriptografis (`crypto.randomBytes(16).toString('hex')`).
   - *Resolusi IDOR*: Akses pelacakan pesanan publik (`/pesanan/[token]`) hanya mencocokkan `public_token` spesifik dengan panjang minimal 16 karakter, sehingga nomor pesanan berurutan tidak dapat ditebak.
   - *Pencegahan Kebocoran Data Riwayat*: Fungsi pencarian pesanan dibatasi ketat sehingga input kosong atau nomor telepon pendek tidak lagi memicu kueri `WHERE 1=1 LIMIT 50`.
   - *Banner Simulasi*: Ditambahkan pemberitahuan transparan bahwa transaksi dan gateway pembayaran bersifat simulasi.

2. **Sekolah Nusantara (`sekolah-nusantara`)**:
   - *Penghapusan Auto-Admin*: Pengunjung situs kini secara bawaan berstatus tamu/publik (`currentUser = null`), bukan otomatis masuk sebagai Administrator.
   - *Pelindung Peran Sisi Klien*: Rute `/admin`, `/portal/guru`, `/portal/siswa`, dan `/portal/wali` dilindungi dengan komponen peringatan akses terbatas jika peran akun tidak cocok.
   - *Sanitasi Data Identitas*: Seluruh nomor NIK riil diganti dengan format fiktif `0000000000000001` - `0000000000000005`, dan alamat rumah riil diganti dengan alamat simulasi.

3. **SymbioFlow Enterprise (`symbioflow-enterprise`)**:
   - *Koreksi Klaim Kriptografi*: Istilah "ISO 27001 / SOC2 SHA-256 Chain" dikoreksi secara faktual menjadi "Simulasi Log Audit Aktivitas (Digest Hash Deterministik FNV-32, Prototipe UI)".
   - *Pemberitahuan Prototipe*: Ditambahkan banner visual bahwa seluruh bursa B2B dan integrasi webhook ERP berjalan sebagai prototipe sisi klien.

4. **ArsiViz Pro (`arsiviz-pro`)**:
   - *Aksesibilitas & Sanitasi*: Ditambahkan heading semantik tanpa celah injeksi skrip.

---

## 3. Checklist Keamanan untuk Operator (Ray Raharja)

Saat melakukan deployment publik ke Vercel atau Supabase, operator disarankan mengikuti langkah berikut:

- [ ] **Rotasi Password Admin**: Buat kata sandi baru yang panjang (minimal 16 karakter, kombinasi huruf besar, kecil, angka, dan simbol) untuk variabel `ADMIN_PASSWORD` di dashboard Vercel.
- [ ] **Buat Secret Sesi Baru**: Jalankan perintah `openssl rand -hex 32` di terminal lokal dan masukkan hasilnya ke variabel `ADMIN_SESSION_SECRET` di Vercel.
- [ ] **Jangan Commit File `.env.local`**: Pastikan file `.env.local` tetap berada di dalam `.gitignore`.
- [ ] **Tinjau Akses Row Level Security (RLS)**: Jika menghubungkan Supabase produksi, pastikan seluruh tabel memiliki kebijakan RLS aktif sehingga anon key hanya dapat membaca data yang berstatus publik.
