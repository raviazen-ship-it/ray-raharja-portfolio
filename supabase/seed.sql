-- ============================================================================
-- SEED DATA: RAY RAHARJA SANTOSO PORTFOLIO ("ONYX & BRASS")
-- 1 Baris site_settings + 6 Proyek Contoh Berbagai Rasio + Pesan Contoh
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
  'Merancang identitas merek berkarakter, sistem komunikasi visual editorial, motion graphics, dan penyuntingan film komersial dengan ketenangan serta presisi kelas studio.',
  true,
  'Saya adalah Graphic & Brand Designer sekaligus Motion Designer dan Video Editor yang berbasis di Jakarta dengan pengalaman lebih dari 7 tahun menangani klien korporasi, perhotelan mewah, gaya hidup, hingga institusi budaya.

Pendekatan kerja saya memadukan ketajaman tipografi editorial dengan dinamika gambar bergerak. Bagi saya, sebuah merek tidak hanya hidup dalam logo statis di atas kertas—melainkan juga dalam bagaimana ia bergerak, terdengar, dan bercerita di layar digital.',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85',
  '/cv-ray-raharja-santoso.pdf',
  '[
    {
      "id": "svc-branding",
      "index": "01",
      "title": "Brand Identity",
      "subtitle": "Arsitektur & Sistem Identitas Merek",
      "description": "Perancangan sistem identitas menyeluruh mulai dari riset posisi merek, arahan seni, sistem tipografi, palet warna, desain kemasan, hingga buku panduan merek (brand guidelines).",
      "deliverables": ["Strategi & Arahan Visual", "Logo & Sistem Monogram", "Tipografi & Warna", "Desain Kemasan", "Brand Guidelines"]
    },
    {
      "id": "svc-graphic",
      "index": "02",
      "title": "Graphic Design",
      "subtitle": "Editorial, Publikasi & Komunikasi Visual",
      "description": "Desain publikasi cetak maupun digital dengan kepekaan tata letak majalah seni, laporan tahunan, materi kampanye terpadu, hingga sistem penunjuk arah (environmental graphics).",
      "deliverables": ["Desain Editorial & Buku", "Key Visual Kampanye", "Sistem Grid & Layout", "Desain Pameran & Cetak", "Aset Digital Sosial"]
    },
    {
      "id": "svc-motion",
      "index": "03",
      "title": "Motion Graphics",
      "subtitle": "Identitas Gerak & Eksplorasi 2D/3D",
      "description": "Menghidupkan sistem identitas melalui animasi logo, tipografi kinetik, bumper acara, dan visual 2D/3D berirama presisi untuk berbagai format layar.",
      "deliverables": ["Motion Identity System", "Kinetic Typography", "Title Sequence & Bumper", "3D Product Loop", "Reels & Vertical Motion"]
    },
    {
      "id": "svc-video",
      "index": "04",
      "title": "Video Editing",
      "subtitle": "Penyuntingan Narasi, Komersial & Color Grading",
      "description": "Penyuntingan film merek, iklan komersial, dokumenter pendek, dan fashion reel dengan penataan ritme cerita, tata suara imersif, dan color grading sinematik.",
      "deliverables": ["Offline & Online Editing", "Commercial & Brand Film", "Color Grading Sinematik", "Sound Design & Mixing", "Format Multi-Platform"]
    }
  ]'::jsonb,
  'ray.raharja@studio-onyx.id',
  '+6281298765432',
  'https://instagram.com/rayraharja.studio',
  'https://linkedin.com/in/ray-raharja-santoso',
  'https://behance.net/rayraharjasantoso'
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

-- Seed 6 Proyek dengan berbagai rasio gambar (16:10, 9:16, 4:5, 1:1, 16:9, 21:9)
insert into public.projects (
  title, slug, description, category, year, client, role, tools, cover_url, media, card_size, featured, order_index, published
) values
(
  'KALA Roastery & Reserve — Identitas & Kemasan',
  'kala-roastery-reserve',
  'Peremajaan total identitas visual dan arsitektur kemasan untuk KALA Roastery & Reserve, rumah sangrai kopi spesialti yang mengangkat hasil panen mikro dari dataran tinggi Nusantara.

Sistem desain menggabungkan tekstur kertas berpori gelap dengan sentuhan foil kuningan hangat, tipografi serif klasik yang dipadukan dengan label teknis ala laboratorium botani untuk menonjolkan catatan rasa, ketinggian tanam, dan metode pascapanen.',
  'Branding',
  '2026',
  'PT Kala Kopi Nusantara',
  'Lead Brand & Packaging Designer',
  array['Adobe Illustrator', 'Adobe InDesign', 'Blender 3D', 'Figma'],
  'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1600&q=85',
  array[
    '{"url":"https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1600&q=85","type":"image","width":1600,"height":1000,"alt":"Kemasan utama KALA Roastery dengan aksen foil kuningan di atas meja batu hitam","blurhash":"L10A0B241E14"}'::jsonb,
    '{"url":"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=85","type":"image","width":1400,"height":1050,"alt":"Eksplorasi sistem tipografi dan label varian biji kopi tunggal","blurhash":"L10A0B241E14"}'::jsonb,
    '{"url":"https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=85","type":"image","width":1600,"height":900,"alt":"Suasana interior flagship bar KALA Reserve di Senopati","blurhash":"L10A0B241E14"}'::jsonb
  ],
  'wide',
  true,
  1,
  true
),
(
  'Sovereign Watch Co. — Horology Vertical Anthology',
  'sovereign-watch-horology-motion',
  'Kampanye film vertikal (9:16) dan sistem identitas gerak untuk peluncuran koleksi jam tangan mekanis edisi terbatas Sovereign Watch Co.

Fokus utama proyek ini adalah menerjemahkan presisi roda gigi mikroskopis dan pantulan logam mulia ke dalam sekuens animasi 3D dan tipografi kinetik yang menghipnotis di layar mobile tanpa kehilangan wibawa merek mewah.',
  'Motion',
  '2026',
  'Sovereign Horology Geneva / Jakarta',
  'Motion Director & 3D Generalist',
  array['Cinema 4D', 'Redshift', 'After Effects', 'DaVinci Resolve'],
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1080&q=85',
  array[
    '{"url":"https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1080&q=85","type":"image","width":1080,"height":1920,"alt":"Frame vertikal 9:16 untuk kampanye Sovereign Watch Co.","blurhash":"L10A0B241E14"}'::jsonb,
    '{"url":"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=85","type":"image","width":1400,"height":1000,"alt":"Studi pencahayaan makro pada dial dan bezel jam tangan","blurhash":"L10A0B241E14"}'::jsonb
  ],
  'tall',
  true,
  2,
  true
),
(
  'Arsip Nusantara — Monografi Desain & Kriya',
  'arsip-nusantara-monograph',
  'Perancangan editorial buku meja (coffee table monograph) setebal 320 halaman yang mendokumentasikan 50 karya tekstil, logam, dan arsitektur vernakular Indonesia.

Menggunakan sistem grid 12 kolom Swiss yang ketat dengan perpaduan serif layar klasik dan indeks marginalia bernomor presisi.',
  'Graphic Design',
  '2025',
  'Yayasan Warisan Visual Indonesia',
  'Editorial Art Director',
  array['Adobe InDesign', 'Adobe Photoshop', 'Figma'],
  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=85',
  array[
    '{"url":"https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=85","type":"image","width":1200,"height":1500,"alt":"Sampul linen hitam berembos foil emas Arsip Nusantara","blurhash":"L10A0B241E14"}'::jsonb,
    '{"url":"https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1600&q=85","type":"image","width":1600,"height":1067,"alt":"Halaman bentang dalam dengan tata letak tipografi dua bahasa","blurhash":"L10A0B241E14"}'::jsonb
  ],
  'normal',
  true,
  3,
  true
),
(
  'SENJA Gastronomy — Sistem Identitas Kuliner',
  'senja-gastronomy-identity',
  'Perancangan identitas merek untuk restoran fine-dining kontemporer di Bali yang menyajikan menu degustasi berbasis bahan bakar kayu bakar dan fermentasi lokal.

Mencakup desain monogram kustom, buku menu kulit, kartu anggur bernomor seri, hingga perlengkapan meja berukir.',
  'Branding',
  '2025',
  'Senja Hospitality Group',
  'Brand Identity Designer',
  array['Adobe Illustrator', 'Adobe InDesign', 'Adobe Dimension'],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85',
  array[
    '{"url":"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85","type":"image","width":1200,"height":1200,"alt":"Suasana ruang makan malam SENJA Gastronomy dengan pencahayaan temaram hangat","blurhash":"L10A0B241E14"}'::jsonb,
    '{"url":"https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=85","type":"image","width":1400,"height":1050,"alt":"Detail cetakan menu degustasi di atas kertas katun 350gsm","blurhash":"L10A0B241E14"}'::jsonb
  ],
  'normal',
  true,
  4,
  true
),
(
  'Aether Botanical Parfum — Director’s Cut Campaign',
  'aether-parfum-campaign-film',
  'Penyuntingan film komersial berdurasi 90 detik dan penataan warna (color grading) untuk peluncuran parfum uniseks Aether Botanical.

Menonjolkan kontras bayangan pekat dengan kilau kaca amber, dipadukan dengan pemotongan ritmis mengikuti komposisi cello analog.',
  'Video Editing',
  '2026',
  'Aether Lab Paris / Singapura',
  'Lead Offline/Online Editor & Colorist',
  array['DaVinci Resolve Studio', 'Premiere Pro', 'After Effects', 'Audition'],
  'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1600&q=85',
  array[
    '{"url":"https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1600&q=85","type":"image","width":1600,"height":900,"alt":"Stills sinematik botol parfum Aether di atas permukaan air gelap","blurhash":"L10A0B241E14"}'::jsonb,
    '{"url":"https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1400&q=85","type":"image","width":1400,"height":933,"alt":"Proses color grading dengan tone hangat keemasan","blurhash":"L10A0B241E14"}'::jsonb
  ],
  'wide',
  true,
  5,
  true
),
(
  'Monolith Architecture Biennial 2026 — Sistem Visual Pameran',
  'monolith-architecture-biennial-2026',
  'Identitas pameran berskala penuh, desain katalog, motion wall instalasi, dan sistem penunjuk arah (wayfinding) untuk pameran arsitektur brutalism dan tropis modern di Asia Tenggara.',
  'Graphic Design',
  '2026',
  'Monolith Architectural Forum',
  'Visual System & Exhibition Designer',
  array['Adobe InDesign', 'Illustrator', 'After Effects', 'Figma'],
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1800&q=85',
  array[
    '{"url":"https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1800&q=85","type":"image","width":1890,"height":810,"alt":"Instalasi spanduk arsitektural Monolith Biennial","blurhash":"L10A0B241E14"}'::jsonb,
    '{"url":"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85","type":"image","width":1600,"height":1066,"alt":"Perspektif fasad gedung pameran dan elemen grafis","blurhash":"L10A0B241E14"}'::jsonb
  ],
  'full',
  true,
  6,
  true
)
on conflict (slug) do nothing;
