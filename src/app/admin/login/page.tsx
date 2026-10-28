'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';

function sanitizeNextPath(rawNext: string | null): string {
  if (
    rawNext &&
    rawNext.startsWith('/admin') &&
    !rawNext.startsWith('//') &&
    !rawNext.includes('\\')
  ) {
    return rawNext;
  }
  return '/admin';
}

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = sanitizeNextPath(searchParams.get('next'));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password) {
      setErrorMessage('Masukkan email dan kata sandi administrator.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setErrorMessage(
          data?.error || 'Email atau kata sandi tidak valid.'
        );
        setLoading(false);
        return;
      }

      router.replace(nextPath);
      router.refresh();
    } catch {
      setErrorMessage('Gagal menghubungi server autentikasi.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#EDE8DF] flex flex-col justify-between px-5 py-8 sm:px-8">
      <div className="mx-auto w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 min-h-[44px] text-xs uppercase tracking-[0.2em] text-[#8A857C] hover:text-[#D4AF6A] transition-colors"
        >
          <ArrowLeft className="h-4 w-4 text-[#B5893B]" />
          <span>Kembali ke Portofolio</span>
        </Link>
      </div>

      <main className="mx-auto w-full max-w-md my-auto py-10">
        <div className="border border-[var(--border-control,#7A7369)] bg-[#131316] p-7 sm:p-9">
          <div className="flex items-center gap-3 pb-6 mb-6 border-b border-[var(--line)]">
            <span className="flex h-10 w-10 items-center justify-center border border-[var(--border-control,#7A7369)] bg-[#0A0A0B] text-[#B5893B]">
              <Lock className="h-4 w-4" />
            </span>
            <div>
              <p className="label-editorial text-[10px] text-[#D4AF6A]">
                Akses Terbatas Pemilik
              </p>
              <h1 className="font-editorial text-2xl sm:text-3xl text-[#EDE8DF] leading-tight">
                Masuk Studio Admin
              </h1>
            </div>
          </div>

          <p className="text-xs text-[#8A857C] leading-relaxed mb-6">
            Halaman ini khusus untuk pengelolaan konten pemilik situs dan
            memerlukan autentikasi sesi server.
          </p>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div>
              <label
                htmlFor="admin-email"
                className="label-editorial block mb-2 text-[#EDE8DF]"
              >
                Email Administrator
              </label>
              <input
                id="admin-email"
                name="email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@domain.com"
                className="w-full min-h-[48px] border border-[var(--border-control,#7A7369)] bg-[#0A0A0B] px-4 py-3 text-sm text-[#EDE8DF] placeholder:text-[#8A857C] focus:border-[#D4AF6A] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="label-editorial block mb-2 text-[#EDE8DF]"
              >
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi"
                  className="w-full min-h-[48px] border border-[var(--border-control,#7A7369)] bg-[#0A0A0B] pl-4 pr-12 py-3 text-sm text-[#EDE8DF] placeholder:text-[#8A857C] focus:border-[#D4AF6A] focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={
                    showPassword
                      ? 'Sembunyikan kata sandi'
                      : 'Tampilkan kata sandi'
                  }
                  className="absolute right-1 top-1 inline-flex h-[40px] w-[40px] items-center justify-center text-[#8A857C] hover:text-[#EDE8DF] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {errorMessage && (
              <div
                role="alert"
                className="flex items-start gap-2.5 border border-red-500/50 bg-red-950/30 px-4 py-3 text-xs text-red-200"
              >
                <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center min-h-[48px] bg-[#B5893B] px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium text-[#0A0A0B] hover:bg-[#D4AF6A] disabled:opacity-50 transition-colors"
            >
              {loading ? 'Memverifikasi Sesi...' : 'Masuk ke Panel Admin'}
            </button>
          </form>
        </div>
      </main>

      <footer className="mx-auto w-full max-w-md text-center text-xs text-[#8A857C]">
        Ray Raharja Santoso • Sesi Terproteksi Server
      </footer>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0A0A0B] text-[#8A857C] flex items-center justify-center text-xs uppercase tracking-[0.2em]">
          Memuat Halaman Autentikasi...
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
