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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rayraharja.studio';

export const viewport: Viewport = {
  themeColor: '#0A0A0B',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Ray Raharja Santoso — Graphic, Brand & Motion Designer',
    template: '%s — Ray Raharja Santoso',
  },
  description:
    'Studio portofolio resmi Ray Raharja Santoso — Graphic & Brand Designer, Motion Designer, dan Video Editor berbasis di Jakarta. Spesialis identitas merek, komunikasi visual editorial, motion graphics, dan penyuntingan film komersial.',
  keywords: [
    'Ray Raharja Santoso',
    'Graphic Designer Jakarta',
    'Brand Designer Indonesia',
    'Motion Designer',
    'Video Editor',
    'Brand Identity Studio',
    'Art Director',
    'Portofolio Desain Grafis',
  ],
  authors: [{ name: 'Ray Raharja Santoso', url: siteUrl }],
  creator: 'Ray Raharja Santoso',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: siteUrl,
    siteName: 'Ray Raharja Santoso — Studio Portofolio',
    title: 'Ray Raharja Santoso — Graphic, Brand & Motion Designer',
    description:
      'Kurasi karya terpilih identitas merek, desain grafis editorial, motion graphics, dan penyuntingan film komersial.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Ray Raharja Santoso — Onyx & Brass Studio Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ray Raharja Santoso — Graphic, Brand & Motion Designer',
    description:
      'Kurasi karya terpilih identitas merek, desain grafis editorial, motion graphics, dan penyuntingan film komersial.',
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
        {/* Subtle Editorial Grain Overlay (3.5% opacity) */}
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
