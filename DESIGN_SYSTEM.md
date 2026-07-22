# SCREENLIGHT — Design System

> "The work is the only light."
> **Read this file first before starting any phase.**

The site is a dark room. Project screenshots are lit screens hanging in it.
The chrome is strictly **monochrome** (warm black + bone). Colour enters ONLY
through a per-project `--tint` sampled from each client screenshot. Scrolling
between case-study chapters re-lights the room in that client's colour.
**There is no fixed accent colour.**

## Hard bans (never, in any phase)

Gradients · glassmorphism / backdrop-blur · glowing orbs · bento grids ·
gradient text · ⌘K command menus · typing animations · particles ·
skill-percentage bars · emoji in UI · Inter / Geist / Instrument Serif ·
shadcn/ui · navy-blue backgrounds · `rounded-2xl` everywhere.

The **only** glow permitted anywhere is `.screenlight`.

## Colour tokens (`app/globals.css` → `@theme`)

| Token                 | Hex       | Use                              |
| --------------------- | --------- | -------------------------------- |
| `--color-backstage`   | `#0E0D0C` | main bg — warm black, never navy |
| `--color-iron`        | `#1C1B19` | raised surfaces, frames          |
| `--color-bone`        | `#F5F1E8` | primary text on dark             |
| `--color-dim`         | `#8B8579` | muted text                       |
| `--color-houselights` | `#EDE8DD` | the ONE light section bg (About) |
| `--color-carbon`      | `#17150F` | text on houselights              |
| `--color-live`        | `#52D273` | status light — availability dots / "LIVE" markers ONLY, never an accent |

Hairlines: `--line-dark: rgba(245,241,232,0.10)` ·
`--line-light: rgba(23,21,15,0.12)`

Tailwind utilities map automatically: `bg-backstage`, `text-bone`,
`bg-houselights`, `text-carbon`, etc.

## Tint system

- `:root { --tint: var(--color-bone); }` — monochrome by default.
- Any chapter overrides it inline: `<Section tint="#FF7A29">` sets `--tint`
  for everything inside, and nothing outside.
- `::selection` → `background: var(--tint); color: var(--color-backstage)`.
- `:focus-visible` → `outline: 2px solid var(--tint); outline-offset: 3px`.
- `.screenlight` glow is `color-mix(in oklch, var(--tint) 40%, transparent)`.
- Button hover states resolve to `var(--tint)`.

So a single `tint` prop re-lights selection, focus ring, hovers and glow
together. Provisional tints live in `lib/projects.ts` (marked `PROVISIONAL`,
to be replaced by sampling real screenshots).

## Section anchor contract

Every chapter section uses these exact ids (and the header depends on them):

`#work` · `#capabilities` · `#process` · `#about` · `#contact`

Each chapter section carries `data-section="<id>"`; project chapters also carry
`data-tint="<hex>"`. `hooks/useActiveSection.ts` observes `[data-section]` with
an IntersectionObserver (thin band at ~33% from top, no scroll listeners) and
returns `{ activeId, activeTint }` (`activeTint` falls back to
`var(--color-bone)`).

## Header (`components/layout/`)

Fixed, `z-50`, full width, **solid** — never backdrop-blur / glass.

- Sets `--tint: activeTint` inline on itself, so the active nav underline and
  hover states relight in the current chapter's colour.
- Top of page: transparent, `h-20`, no border. `scrollY > 32`: solid
  `bg-backstage`, `h-16`, 1px bottom border, transition `--dur-fast`.
- Wordmark (type is the mark, no logo), desktop nav (`.mono-label` links,
  active/hover underline drawn L→R in `--dur-fast`), availability chip
  (`--color-live` dot + "Open to work"), ghost "Hire me" button.
- `MobileMenu`: 44×44 morphing trigger, full-screen **solid** overlay,
  body scroll lock, staggered `.display` links, Escape + focus return + focus
  trap. Reduced motion → fades only.

## Motion tokens

| Token         | Value                            |
| ------------- | -------------------------------- |
| `--ease-out`  | `cubic-bezier(0.16, 1, 0.3, 1)`  |
| `--dur-fast`  | `220ms`                          |
| `--dur-base`  | `550ms`                          |
| `--dur-slow`  | `750ms`                          |

`@media (prefers-reduced-motion: reduce)` kills all animation/transition
durations and `scroll-behavior`.

## Shape

`--radius-sm: 2px` · `--radius-frame: 4px`. **Nothing rounder anywhere.**

## Type — Archivo, one family, two voices

Loaded via `next/font/google` with the `wdth` axis. `--font-archivo` →
`--font-sans`; `Fragment_Mono` (400) → `--font-fragment` → `--font-mono`.

- **Display voice** (`.display`): `font-stretch: 125%` (expanded),
  weight 900, uppercase, `letter-spacing: 0.005em`, `line-height: 0.92`.
- **Body / UI voice**: normal width, weights 400–600 (default body).
- **Mono label** (`.mono-label`): Fragment Mono, 11–12px, uppercase,
  `letter-spacing: 0.14em`, colour `--color-dim`. All eyebrows, placards,
  metadata.

Banned fonts: Inter, Geist, Instrument Serif.

## Utility classes (`app/globals.css`)

- `.display` — Archivo expanded display voice.
- `.mono-label` — Fragment Mono metadata voice.
- `.frame` — lit-screen treatment: `1px solid var(--line-dark)`,
  `border-radius: var(--radius-frame)`, `background: var(--color-iron)`,
  `overflow: hidden`.
- `.screenlight` — the cast light (the only glow):
  `box-shadow: 0 0 120px -20px color-mix(in oklch, var(--tint) 40%, transparent)`.

## Shared primitives (`components/ui/`)

- **`Section.tsx`** — chapter wrapper. Props: `tint?` (sets `--tint` inline),
  `light?` (houselights bg + carbon text). Padding `py-24 md:py-36`;
  container `max-w-[1400px] px-6 md:px-10`.
- **`MonoLabel.tsx`** — `.mono-label`, optional `index` prefix (`01 —`).
- **`Button.tsx`** — two variants, both `radius-sm`, `h-12`, `px-6`,
  Archivo 500:
  - `primary`: bg bone / text backstage → hover bg `var(--tint)` (`--dur-fast`).
  - `ghost`: transparent, `1px --line-dark` border, text bone → hover border
    & text `var(--tint)`, trailing `↗` translates 3px.

## Data layer (`lib/`)

- **`site.ts`** — name, role, availability, contact placeholders (TODO).
- **`projects.ts`** — typed `Project[]`: `slug`, `title`, `category`, `year`,
  `stack[]`, `liveUrl`, `screenshot` (`/public/projects/`), `tint`. Six seeded
  projects with PROVISIONAL tints.

## Stack

Next.js (App Router) · TypeScript (strict) · Tailwind v4 · `motion` (Motion
for React) is the **only** extra dependency. No GSAP, icon packs, or UI kits.
