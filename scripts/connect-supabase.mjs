/**
 * Helper Script: Otomatisasi Provisioning Akun Admin & Storage Bucket ke Supabase
 * Pastikan NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ADMIN_EMAIL,
 * dan ADMIN_PASSWORD telah diisi di .env.local sebelum menjalankan:
 *   node scripts/connect-supabase.mjs
 */

import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) return {};
  const lines = fs.readFileSync(envPath, 'utf-8').split(/\r?\n/);
  const env = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx > 0) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      env[key] = val;
    }
  }
  return env;
}

async function main() {
  const env = loadEnvLocal();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_ROLE_KEY;
  const adminEmail = (process.env.ADMIN_EMAIL || env.ADMIN_EMAIL || '').trim();
  const adminPassword = process.env.ADMIN_PASSWORD || env.ADMIN_PASSWORD || '';

  if (!url || !serviceKey) {
    console.error(
      'Harap isi NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY di .env.local terlebih dahulu.'
    );
    process.exit(1);
  }

  if (!adminEmail || adminPassword.length < 12) {
    console.error(
      'Harap isi ADMIN_EMAIL dan ADMIN_PASSWORD (minimal 12 karakter) di .env.local. Script ini tidak menggunakan password bawaan.'
    );
    process.exit(1);
  }

  const supabase = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  console.log('Memeriksa akun Admin di Supabase Auth...');
  const { data: usersData } = await supabase.auth.admin.listUsers();
  const existingUser = usersData?.users?.find(
    (u) => u.email?.toLowerCase() === adminEmail.toLowerCase()
  );

  if (!existingUser) {
    const { error: createErr } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
    });
    if (createErr) {
      console.error('Gagal membuat akun admin:', createErr.message);
      process.exit(1);
    }
    console.log('Akun Admin berhasil dibuat di Supabase Auth.');
  } else {
    console.log('Akun Admin sudah terdaftar di Supabase Auth.');
  }

  console.log('Memeriksa Storage Bucket "portfolio-media"...');
  const { data: bucket } = await supabase.storage.getBucket('portfolio-media');
  if (!bucket) {
    await supabase.storage.createBucket('portfolio-media', {
      public: true,
      fileSizeLimit: 52428800,
    });
    console.log('Storage Bucket "portfolio-media" berhasil dibuat.');
  } else {
    console.log('Storage Bucket "portfolio-media" sudah aktif.');
  }

  console.log('Konfigurasi Supabase Auth & Storage selesai.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
