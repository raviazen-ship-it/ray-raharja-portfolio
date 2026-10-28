# DESIGN.md - Ray Raharja Integrated Portfolio ("Onyx & Brass")

## 1. Design Read
> Reading this as: integrated portfolio hub and evidence-backed case study archive for hiring managers, technical leads, and freelance business clients, in an Onyx & Brass print-plate editorial style, dial `ENERGY 2 / RHYTHM 3 / MOTION 2`.

- **Genre & Purpose:** Editorial integrated portfolio hub uniting **Web & Digital Products** (interactive web apps, parametric 3D tools, business websites) and **Visual Design & Production** (e-commerce campaigns, panoramic carousels, UV print production, motion & video editing) for recruiters, business owners, and freelance clients.
- **Character & Identity Motif:** Architectural print-plate ledger (`00 / Index` through `07 / Contact`), sharp `0px` plate corners with subtle `2px` inner token tags, warm ivory ink (`#EDE8DF`) over deep onyx (`#0A0A0B`), and a single metallic brass accent (`#B5893B` / `#D4AF6A`). Authentic screenshots and physical design plates provide visual richness; UI chrome stays restrained.
- **Dials:** `ENERGY 2 / RHYTHM 3 / MOTION 2`
  - **ENERGY 2:** Restrained dark editorial ground (`#0A0A0B`) with warm ivory ink (`#EDE8DF`) and single metallic brass accent (`#B5893B` / `#D4AF6A`). Zero neon gradients, zero decorative orbs, zero marketing buzzwords.
  - **RHYTHM 3:** Visibly varied section compositions across the page narrative: (00) Asymmetric 7/5 hero masthead + 2-track split bar; (01) 3-column vertical showcase cards; (02) Sticky 4/8 capability index rows; (03) 2-row horizontal split ledger plates; (04) Full-width campaign banners interleaved with aspect-ratio-preserving 3-column balanced masonry; (05) 5-stage numbered workflow list; (06) Sticky 4/8 framed portrait + chronological career ledger; (07) 5/7 direct-channel & validated form layout.
  - **MOTION 2:** Subtle one-shot scroll-entry reveals and spring filter pill state indicators only; zero infinite marquees, zero pulsing/pinging dots, and full `prefers-reduced-motion` bypass.

---

## 2. Design Tokens

### Color System & Verified WCAG 2.2 AA Contrast (R-25)
All foreground/background pairs were verified programmatically with `contrast-check.py`:

| Token | Hex / Value | Role | Tested Pair | Contrast Ratio | WCAG AA |
|---|---|---|---|---|---|
| `--onyx` | `#0A0A0B` | Primary canvas background | `#EDE8DF` on `#0A0A0B` | `16.22:1` | PASS (4.5:1) |
| `--onyx-2` | `#131316` | Card & ledger surface | `#EDE8DF` on `#131316` | `15.20:1` | PASS (4.5:1) |
| `--onyx-3` | `#18181C` | Elevated interactive hover surface | `#EDE8DF` on `#18181C` | `14.55:1` | PASS (4.5:1) |
| `--ivory` | `#EDE8DF` | Primary editorial & body ink | `#EDE8DF` on `#0A0A0B` | `16.22:1` | PASS (4.5:1) |
| `--muted` | `#8A857C` | Secondary metadata & captions | `#8A857C` on `#0A0A0B` / `#131316` | `5.40:1` / `5.06:1` | PASS (4.5:1) |
| `--brass` | `#B5893B` | Primary button fill & active tab | `#0A0A0B` on `#B5893B` | `6.23:1` | PASS (4.5:1) |
| `--brass-light` | `#D4AF6A` | Accent text, active eyebrows, focus ring | `#D4AF6A` on `#0A0A0B` / `#131316` | `9.56:1` / `8.95:1` | PASS (4.5:1) |
| `--border-control` | `#7A7369` | Non-text control boundary (inputs, buttons, filters) | `#7A7369` on `#131316` | `3.96:1` | PASS (3.0:1 UI) |
| `--line` | `rgba(181, 137, 59, 0.28)` | Decorative section & grid hairlines | Non-interactive divider | Decorative | N/A |

### Status Badge Palette (Single Source of Truth in `src/lib/web-projects-data.ts`)
- **Verified Feature:** `#86EFAC` text (`12.1:1`) on `#0A2618` surface, `#2E7D52` border (`3.8:1`).
- **Interactive Demo:** `#D4AF6A` text (`8.9:1`) on `#221B0E` surface, `#B5893B` border (`5.8:1`).
- **Prototype:** `#FCD34D` text (`12.4:1`) on `#261C08` surface, `#B47B18` border (`4.3:1`).
- **In Development:** `#93C5FD` text (`10.2:1`) on `#0D1F38` surface, `#3B82F6` border (`4.6:1`).
- **Live Product:** `#6EE7B7` text (`11.8:1`) on `#08281E` surface, `#10B981` border (`6.4:1`).

### Typography (R-06)
- **Display Serif (`--font-display`):** `Cormorant Garamond` local variable WOFF2 (`400-700`, normal & italic). Chosen to echo editorial print folios and contrast high-density technical metadata without relying on generic geometric sans headlines.
- **UI & Body Sans (`--font-sans`):** `DM Sans` local variable WOFF2 (`400-700`). Chosen for clean legibility at `14px-18px` across bilingual (`id`/`en`) case study tables, technology tags, and form labels.

### Spacing, Radius Hierarchy, Focus Ring & Breakpoints (R-11, R-32)
- **Radius Hierarchy:** `0px` architectural sharp corners on outer structural plates, cards, buttons, and inputs; `2px` (`rounded-[2px]`) on inner technology tags; `9999px` strictly on `6px` status indicator dots (`StatusBadge` and availability dot). Zero pill-shaped cards or buttons.
- **Focus Ring:** `2px solid #D4AF6A` with `3px` offset (`:focus-visible` in `globals.css`) across every link, button, input, and tab.
- **Container:** `max-w-[1440px]` with horizontal padding `20px` (`px-5`), `32px` (`sm:px-8`), `48px` (`lg:px-12`).
- **Touch Targets:** Minimum `44x44px` (`min-h-[44px]`) on all interactive links, filter tabs, language buttons, and mobile controls.
- **Responsive Verification Viewports:** `320x740`, `390x844`, `768x1024`, `1440x900`.

---

## 3. Decision & Purpose-Gate Log (R-31)
Every visual technique used in this codebase has an explicit one-line purpose:

1. **Dark Editorial Ground (`R-01`, `R-21`):** Deep onyx (`#0A0A0B`) frames high-saturation e-commerce campaign banners, 3D architectural renders, and live light/dark web screenshots without color cast clash, preserving the existing Onyx & Brass studio identity.
2. **Color Palette Cap (`R-29`):** Restricted to 2 neutral ink/ground tones (`#0A0A0B` / `#131316` and `#EDE8DF` / `#8A857C`) plus 1 metallic brass accent (`#B5893B` / `#D4AF6A`), with semantic colors reserved strictly for verified QA status badges and form validation alerts.
3. **Typography Pairing (`R-06`):** `Cormorant Garamond` provides editorial hierarchy for titles and section numerals (`01`-`07`), while `DM Sans` keeps dense bilingual technical documentation scannable; uppercase tracking (`0.18em`) is restricted to short metadata eyebrows (`11px`).
4. **Subtle Paper Grain (`R-07`):** A fixed `3.5%` SVG fractal-noise overlay (`bg-grain`) references Ray's physical UV print production background and prevents flat digital banding on dark surfaces.
5. **Semantic Iconography & Directional Arrows (`R-04`, `R-08`):** Zero decorative sparkle/star/magic icons; `ExternalLink` (`↗`) marks external Vercel demo/social destinations so users can distinguish outbound tabs from internal `ArrowRight` (`→`) case study navigation, while `Code2`, `LayoutTemplate`, `Box`, `Store`, and `Palette` map 1-to-1 to the five portfolio capabilities.
6. **Functional Evidence Badges (`R-09`):** Rectangular `StatusBadge` plates display only single-source `EvidenceStatus` values (`Interactive Demo`, `Prototype`, `Verified Feature`) backed by `2026-10-28` QA logs; no capsule badges sit above `<h1>`.
7. **Glassmorphism Dose Cap (`R-10`):** `backdrop-blur` is capped at 2 overlay surfaces: the scrolled sticky `Navbar` (`backdrop-blur-md`) and the fullscreen `Lightbox` modal (`backdrop-blur-xl`), never on cards or badges.
8. **Border-Led Elevation (`R-12`):** Hierarchy is established via surface contrast (`#0A0A0B` -> `#131316` -> `#18181C`) and `1px` brass/control hairlines rather than floating drop shadows.
9. **Varied Card & Section Composition (`R-05`, `R-14`):** Featured web projects use 3-column vertical screenshot cards, secondary web prototypes use 2-row horizontal `5/7` split plates, capabilities use a `4/8` sticky index table, visual works use aspect-ratio-preserving masonry + full-width plates, and workflow uses a 5-step `<ol>`.
10. **Motion Purpose (`R-19`):** One-shot scroll-reveal (`0.5s` `[0.22, 1, 0.36, 1]`), spring active-tab indicator (`layoutId`), mobile drawer transition (`0.28s`), and lightbox zoom (`0.25s`) orient spatial state changes and yield completely to `prefers-reduced-motion: reduce`.
