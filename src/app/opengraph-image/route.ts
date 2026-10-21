import { NextResponse } from 'next/server';

export async function GET() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
    <rect width="1200" height="630" fill="#0A0A0B" />
    <rect x="36" y="36" width="1128" height="558" fill="#131316" stroke="#B5893B" stroke-opacity="0.4" stroke-width="1.5" />
    <line x1="84" y1="140" x2="1116" y2="140" stroke="#B5893B" stroke-opacity="0.3" stroke-width="1" />
    <line x1="84" y1="510" x2="1116" y2="510" stroke="#B5893B" stroke-opacity="0.3" stroke-width="1" />
    <rect x="84" y="72" width="44" height="44" fill="#0A0A0B" stroke="#B5893B" stroke-width="1.5" />
    <text x="106" y="102" text-anchor="middle" fill="#D4AF6A" font-family="Georgia, serif" font-size="24" font-weight="600">R</text>
    <text x="148" y="100" fill="#8A857C" font-family="system-ui, sans-serif" font-size="13" letter-spacing="4">SELECTED WORKS 2025—2026</text>
    <text x="1116" y="100" text-anchor="end" fill="#D4AF6A" font-family="system-ui, sans-serif" font-size="13" letter-spacing="4">JAKARTA, INDONESIA</text>
    <text x="84" y="255" fill="#B5893B" font-family="system-ui, sans-serif" font-size="15" letter-spacing="5">GRAPHIC &amp; BRAND DESIGNER • MOTION DESIGNER • VIDEO EDITOR</text>
    <text x="84" y="365" fill="#EDE8DF" font-family="Georgia, serif" font-size="86">Ray Raharja Santoso.</text>
    <text x="84" y="430" fill="#8A857C" font-family="Georgia, serif" font-style="italic" font-size="30">Identitas Merek, Komunikasi Visual Editorial &amp; Gambar Bergerak</text>
    <text x="84" y="555" fill="#8A857C" font-family="system-ui, sans-serif" font-size="13" letter-spacing="4">BRANDING / GRAPHIC DESIGN / MOTION / VIDEO EDITING</text>
    <text x="1116" y="555" text-anchor="end" fill="#D4AF6A" font-family="system-ui, sans-serif" font-size="13" letter-spacing="4">ONYX &amp; BRASS STUDIO</text>
  </svg>`;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
