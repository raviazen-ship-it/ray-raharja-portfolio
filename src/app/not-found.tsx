import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0A0A0B] text-[#EDE8DF]">
      <Navbar />

      <main className="flex-1 flex items-center pt-28 pb-20">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="border-t border-b border-[var(--line)] py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-editorial italic text-sm text-[var(--brass)]">
                  404 / Arsip Tidak Ditemukan
                </span>
                <span className="h-[1px] w-12 bg-[var(--line)]" />
                <span className="label-editorial">HALAMAN TIDAK TERSEDIA</span>
              </div>

              <h1 className="hero-display font-normal text-[var(--ivory)]">
                Halaman Hilang <br />
                <span className="italic text-[var(--brass-light)]">
                  dalam Penyuntingan.
                </span>
              </h1>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-end space-y-8">
              <p className="text-base sm:text-lg text-[var(--muted)] leading-relaxed">
                Tautan atau studi kasus yang Anda tuju mungkin telah dipindahkan,
                diperbarui namanya, atau sedang berada dalam tahap kurasi di
                studio.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-3 min-h-[48px] bg-[var(--brass)] px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium text-[#0A0A0B] hover:bg-[var(--brass-light)] transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Kembali ke Beranda</span>
                </Link>

                <Link
                  href="/#karya"
                  className="inline-flex items-center gap-2 min-h-[48px] border border-[var(--line)] bg-[#131316] px-6 py-3 text-xs uppercase tracking-[0.2em] text-[var(--ivory)] hover:border-[var(--brass)] transition-colors"
                >
                  <span>Lihat Arsip Karya</span>
                  <ArrowUpRight className="h-4 w-4 text-[var(--brass)]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
