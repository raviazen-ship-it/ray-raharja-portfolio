-- ============================================================================
-- SEED DATA: RAY RAHARJA SANTOSO INTEGRATED PORTFOLIO ("ONYX & BRASS")
-- Hanya memuat profil faktual Ray Raharja Santoso. Tanpa klaim fiktif.
-- ============================================================================

insert into public.site_settings (
  id,
  hero_title,
  hero_subtitle,
  available_for_work,
  about_text,
  profile_photo_url,
  cv_url,
  services,
  email,
  whatsapp,
  instagram,
  linkedin,
  behance
) values (
  1,
  'Ray Raharja Santoso',
  'Saya merancang dan membangun website bisnis serta pengalaman web interaktif, dengan perhatian pada kebutuhan pengguna, kualitas visual, dan implementasi fitur.',
  true,
  'Saya adalah kreator produk digital dan Graphic & Brand Designer berbasis di Jakarta Utara yang menggabungkan fondasi Rekayasa Perangkat Lunak dari SMKS Barunawati dengan praktik desain visual dan produksi cetak di PT Lightboxglobal.

Di ranah web dan produk digital, saya merancang antarmuka serta membangun website bisnis, kalkulator interaktif, dan visualisasi 3D berbasis browser menggunakan Next.js, React, TypeScript, Tailwind CSS, dan Three.js. Di ranah komunikasi visual, saya menangani fotografi produk, materi kampanye e-commerce (KODAD, DATANGBO, HANGDA, SUTU), infografis teknis, pengoperasian mesin cetak UV, hingga motion graphics di Adobe After Effects.',
  '/profile-ray-raharja.png',
  '/cv-ray-raharja-santoso.pdf',
  '[
    {
      "id": "svc-web",
      "index": "01",
      "title": "Web & Interactive Products",
      "subtitle": "Website Bisnis, Aplikasi Web & Eksplorasi 3D Interaktif",
      "description": "Perancangan dan pengembangan halaman arahan bisnis, katalog produk interaktif, kalkulator simulasi, serta visualisasi 3D berbasis browser dengan struktur informasi yang jelas.",
      "deliverables": ["Business Landing & Catalog Pages", "Interactive Calculators & Simulators", "Browser 3D Visualization (Three.js / R3F)", "Responsive UI Implementation", "Technical Documentation"]
    },
    {
      "id": "svc-branding",
      "index": "02",
      "title": "Brand Identity & Custom Print",
      "subtitle": "Identitas Visual, Merchandise & Produksi UV Print",
      "description": "Perancangan identitas merek dan lini produk kustom mulai dari key visual kampanye, desain merchandise korporat (jaket, totebag, ID card batik, custom case), hingga pengawalan cetak mesin UV.",
      "deliverables": ["Brand & Campaign Key Visual", "Custom Case & UV Print Production", "Corporate Apparel & Souvenir", "Exhibition Booth & Hampers Visual", "Pre-Press Quality Check"]
    },
    {
      "id": "svc-graphic",
      "index": "03",
      "title": "E-Commerce & Editorial Design",
      "subtitle": "Banner Marketplace, Infografis Produk & Carousel Editorial",
      "description": "Pengembangan aset visual toko resmi marketplace (Shopee, Tokopedia, TikTok Shop), infografis perbandingan spesifikasi teknis, serta carousel Instagram bersambung.",
      "deliverables": ["Marketplace Campaign Banners", "Before-After & Technical Infographics", "Continuous Instagram Carousel (4:5)", "Product Photography & Retouching", "Editorial Posters"]
    },
    {
      "id": "svc-motion",
      "index": "04",
      "title": "Motion Graphics & Video Cuts",
      "subtitle": "Animasi 2.5D, Tipografi Kinetik & Penyuntingan Video Pendek",
      "description": "Pengolahan ilustrasi statis dan potongan video menjadi konten gerak vertikal maupun persegi melalui compositing 2.5D dan penyuntingan ritme audio di Adobe After Effects.",
      "deliverables": ["Vertical Motion Reels (9:16)", "2.5D Character & Poster Compositing", "Beat-Sync Short Video Cuts", "Kinetic Typography", "Multi-Ratio Social Exports"]
    }
  ]'::jsonb,
  'rayraharja09@gmail.com',
  '+62 813-8145-7516',
  'https://instagram.com/Reyp.u',
  'https://linkedin.com/in/ray-raharja-santoso',
  'https://instagram.com/Reyp.u'
)
on conflict (id) do update set
  hero_title = excluded.hero_title,
  hero_subtitle = excluded.hero_subtitle,
  available_for_work = excluded.available_for_work,
  about_text = excluded.about_text,
  profile_photo_url = excluded.profile_photo_url,
  cv_url = excluded.cv_url,
  services = excluded.services,
  email = excluded.email,
  whatsapp = excluded.whatsapp,
  instagram = excluded.instagram,
  linkedin = excluded.linkedin,
  behance = excluded.behance,
  updated_at = now();
