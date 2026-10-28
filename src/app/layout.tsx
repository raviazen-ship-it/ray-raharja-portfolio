import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { LanguageProvider } from '@/components/providers/LanguageProvider';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { CustomCursor } from '@/components/ui/CustomCursor';

const cormorant = localFont({
  src: [
    {
      path: './fonts/CormorantGaramond-Variable.woff2',
      weight: '400 700',
      style: 'normal',
    },
    {
      path: './fonts/CormorantGaramond-Italic-Variable.woff2',
      weight: '400 700',
      style: 'italic',
    },
  ],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = localFont({
  src: [
    {
      path: './fonts/DMSans-Variable.woff2',
      weight: '400 700',
      style: 'normal',
    },
  ],
  variable: '--font-sans',
  display: 'swap',
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://ray-raharja-portfolio.vercel.app';

export const viewport: Viewport = {
  themeColor: '#0A0A0B',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Ray Raharja Santoso | Web & Digital Products, Visual Design',
    template: '%s | Ray Raharja Santoso',
  },
  description:
    'Portofolio terintegrasi Ray Raharja Santoso: website bisnis, antarmuka web interaktif, visualisasi 3D browser, desain grafis e-commerce, produksi cetak UV, dan motion graphics.',
  keywords: [
    'Ray Raharja Santoso',
    'Web Developer Portfolio Jakarta',
    'UI UX & Frontend Next.js',
    'Three.js Interactive Web',
    'Graphic & Brand Designer Jakarta',
    'E-Commerce Campaign Designer',
    'Motion Designer Indonesia',
  ],
  authors: [{ name: 'Ray Raharja Santoso', url: siteUrl }],
  creator: 'Ray Raharja Santoso',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: siteUrl,
    siteName: 'Ray Raharja Santoso Portfolio',
    title: 'Ray Raharja Santoso | Web & Digital Products, Visual Design',
    description:
      'Designing useful digital experiences. Building them to work. Pusat portofolio web interaktif dan komunikasi visual oleh Ray Raharja Santoso.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Ray Raharja Santoso Integrated Portfolio: Web & Digital Products and Visual Design',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ray Raharja Santoso | Web & Digital Products, Visual Design',
    description:
      'Portofolio terintegrasi proyek web interaktif, studi kasus teknis, dan arsip desain komunikasi visual oleh Ray Raharja Santoso.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${cormorant.variable} ${dmSans.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#0A0A0B] text-[#EDE8DF] antialiased selection:bg-[#B5893B]/30 selection:text-[#EDE8DF]">
        {/* Skip to Main Content Link for Keyboard Accessibility (WCAG AA) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--brass)] focus:text-[#0A0A0B] focus:font-medium focus:text-xs focus:uppercase focus:tracking-[0.16em] focus:outline-none focus:ring-2 focus:ring-[var(--brass-light)]"
        >
          Lewati ke konten utama
        </a>

        {/* Subtle Editorial Paper Grain Overlay (3.5% opacity) */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-30 bg-grain"
        />

        <LanguageProvider>
          <SmoothScroll>
            <CustomCursor />
            {children}
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
