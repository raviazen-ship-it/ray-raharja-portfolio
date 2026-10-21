'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, ArrowLeft, AlertCircle, LogIn, Sparkles } from 'lucide-react';

const OWNER_EMAILS = ['viaray2614@gmail.com', 'rayraharja09@gmail.com'];

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(OWNER_EMAILS[0]);
  const [password, setPassword] = useState('rayraharja09');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleQuickLogin = async (targetEmail: string) => {
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: targetEmail,
          quickAccess: true,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Gagal masuk ke Studio Admin.');
        setLoading(false);
        return;
      }
      router.push('/admin');
      router.refresh();
    } catch {
      setError('Gagal menghubungi server autentikasi.');
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Gagal masuk ke Studio Admin.');
        setLoading(false);
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch {
      setError('Gagal menghubungi server autentikasi.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0A0A0B] text-[#EDE8DF] p-5 sm:p-10">
      {/* Top Bar */}
      <div className="mx-auto w-full max-w-[1440px] flex items-center justify-between border-b border-[var(--line)] pb-5">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 min-h-[44px] text-xs uppercase tracking-[0.2em] text-[var(--muted)] hover:text-[var(--brass-light)] transition-colors"
        >
          <ArrowLeft className="h-4 w-4 text-[var(--brass)]" />
          <span>Kembali ke Website Publik</span>
        </Link>

        <span className="label-editorial text-[var(--brass-light)]">
          ONYX &amp; BRASS — STUDIO ADMIN
        </span>
      </div>

      {/* Center Login Card */}
      <main className="my-auto py-10 flex items-center justify-center">
        <div className="w-full max-w-md border border-[var(--line)] bg-[#131316] p-7 sm:p-10 space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center border border-[var(--line)] bg-[#0A0A0B] text-[var(--brass-light)]">
              <Lock className="h-4 w-4" />
            </span>
            <div>
              <span className="label-editorial block text-[10px]">
                Akses Pemilik Studio
              </span>
              <h1 className="font-editorial text-3xl text-[var(--ivory)]">
                Studio Admin Login
              </h1>
            </div>
          </div>

          {/* 1-Click Instant Login for Both Authorized Chrome Emails */}
          <div className="border border-[var(--brass)]/60 bg-[#0A0A0B] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--brass-light)] flex items-center gap-1.5">
                <Sparkles className="h-3 w-3" />
                Akses Cepat 1-Klik (Akun Chrome Anda)
              </span>
              <span className="text-[11px] text-emerald-400">Terverifikasi</span>
            </div>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              Pilih salah satu akun Gmail terotorisasi Anda untuk langsung
              membuka Studio Admin:
            </p>
            <div className="space-y-2.5">
              {OWNER_EMAILS.map((ownerEmail) => (
                <button
                  key={ownerEmail}
                  type="button"
                  onClick={() => handleQuickLogin(ownerEmail)}
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2.5 min-h-[46px] bg-[var(--brass)] px-4 py-2.5 text-xs uppercase tracking-[0.15em] font-medium text-[#0A0A0B] hover:bg-[var(--brass-light)] disabled:opacity-50 transition-colors"
                >
                  <LogIn className="h-4 w-4 shrink-0" />
                  <span className="truncate">Masuk: {ownerEmail}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-[var(--line)]" />
            <span className="flex-shrink mx-3 text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
              Atau Login Manual
            </span>
            <div className="flex-grow border-t border-[var(--line)]" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="admin-email"
                className="label-editorial block mb-2 text-[var(--ivory)]"
              >
                Email Administrator
              </label>
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="viaray2614@gmail.com / rayraharja09@gmail.com"
                className="w-full min-h-[46px] border border-[var(--line)] bg-[#0A0A0B] px-4 py-2.5 text-sm text-[var(--ivory)] placeholder:text-[var(--muted)]/50 focus:border-[var(--brass)] focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="label-editorial block mb-2 text-[var(--ivory)]"
              >
                Kata Sandi (rayraharja09 / viaray2614)
              </label>
              <input
                id="admin-password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full min-h-[46px] border border-[var(--line)] bg-[#0A0A0B] px-4 py-2.5 text-sm text-[var(--ivory)] placeholder:text-[var(--muted)]/50 focus:border-[var(--brass)] focus:outline-none"
              />
            </div>

            {error && (
              <div
                role="alert"
                className="flex items-start gap-2.5 border border-red-500/40 bg-red-950/30 p-3.5 text-xs text-red-200"
              >
                <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2.5 min-h-[46px] border border-[var(--brass)] bg-[#0A0A0B] px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium text-[var(--brass-light)] hover:bg-[var(--brass)] hover:text-[#0A0A0B] disabled:opacity-50 transition-colors"
            >
              <LogIn className="h-4 w-4" />
              <span>{loading ? 'Memverifikasi...' : 'Masuk dengan Sandi'}</span>
            </button>
          </form>
        </div>
      </main>

      <div className="mx-auto w-full max-w-[1440px] border-t border-[var(--line)] pt-5 text-center sm:text-left text-xs text-[var(--muted)]">
        &copy; {new Date().getFullYear()} Ray Raharja Santoso — Sistem Manajemen
        Portofolio
      </div>
    </div>
  );
}
