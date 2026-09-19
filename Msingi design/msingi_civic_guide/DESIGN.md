---
name: Msingi Civic Guide
colors:
  surface: '#f1fcf7'
  surface-dim: '#d1ddd8'
  surface-bright: '#f1fcf7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#ebf6f1'
  surface-container: '#e5f0eb'
  surface-container-high: '#dfebe6'
  surface-container-highest: '#dae5e0'
  on-surface: '#141e1b'
  on-surface-variant: '#404945'
  inverse-surface: '#28332f'
  inverse-on-surface: '#e8f3ee'
  outline: '#717975'
  outline-variant: '#c0c8c3'
  surface-tint: '#3b6758'
  primary: '#013428'
  on-primary: '#ffffff'
  primary-container: '#1e4b3e'
  on-primary-container: '#8cbaa9'
  inverse-primary: '#a1d0bf'
  secondary: '#4b6458'
  on-secondary: '#ffffff'
  secondary-container: '#cbe6d7'
  on-secondary-container: '#50685c'
  tertiary: '#262f2b'
  on-tertiary: '#ffffff'
  tertiary-container: '#3c4541'
  on-tertiary-container: '#a8b2ad'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#bdeddb'
  primary-fixed-dim: '#a1d0bf'
  on-primary-fixed: '#002018'
  on-primary-fixed-variant: '#224e41'
  secondary-fixed: '#cee9da'
  secondary-fixed-dim: '#b2cdbe'
  on-secondary-fixed: '#082017'
  on-secondary-fixed-variant: '#344c41'
  tertiary-fixed: '#dbe5df'
  tertiary-fixed-dim: '#bfc9c3'
  on-tertiary-fixed: '#151d1a'
  on-tertiary-fixed-variant: '#3f4945'
  background: '#f1fcf7'
  on-background: '#141e1b'
  surface-variant: '#dae5e0'
typography:
  display-lg:
    fontFamily: Public Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Public Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Public Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  title-md:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0em
  body-lg:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Public Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0.01em
  body-sm:
    fontFamily: Public Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Public Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Public Sans
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system is engineered for civic utility, constitutional literacy, and public empowerment. Its core mandate is radical clarity: converting dense statutory frameworks into plain-language, actionable guidance for every citizen. The emotional tone must communicate unshakeable institutional authority, reassurance, and calm dignity during high-stress scenarios (e.g., unlawful arrest, land disputes, police misconduct).

The visual aesthetic sits at the intersection of **Institutional Minimalism** and **Human-Centered Public Utility**:
- **Utilitarian & Grounded:** Clean structured layouts prioritize rapid legibility under direct sunlight on budget mobile displays.
- **Calm Authority:** Deep botanical greens evoke national heritage, lawfulness, and stability, balanced with warm paper-tinted neutrals to prevent legal intimidation.
- **Radical Readability:** Generous line heights, crisp visual hierarchy, high WCAG AAA contrast ratios, and clear delineation between plain-text action points and verbatim constitutional citations.

## Colors

The palette is anchored by deep forest green and soft organic tones, evoking integrity, growth, and sovereign public service.

### Functional Roles & Guidelines
- **Primary (`#1E4B3E`):** Represents constitutional authority and primary action. Used for primary CTAs, active tab indicators, major category headers, and step counter badges.
- **Secondary (`#C8E3D4`):** Soft sage mint used for interactive highlights, subtle badge borders, active toggle segments, and verification card outlines.
- **Tertiary (`#E8F2EC`):** Pale mint wash utilized strictly for non-interactive tint backgrounds, category badge backdrops, quote callouts, and highlighted advice blocks.
- **Neutral Dark (`#192320`):** Charcoal slate with deep green undertones, avoiding harsh pure black. Used for high-contrast headlines, legal prose, and primary body text.
- **Surface Canvas (`#F8FAF9`):** Warm parchment neutral serving as the global app backdrop. Prevents eye strain common with sterile `#FFFFFF` surfaces.
- **Surface Container (`#FFFFFF`):** High-clarity white for modular cards, action sheets, search bars, and expandable constitutional source blocks.
- **Muted Neutral (`#5A6A64`):** Mid-tone sage gray dedicated to secondary metadata, article citations, navigation icons, and disclaimer microcopy.

## Typography

The typography system relies exclusively on **Public Sans**, an open-source, government-grade geometric grotesque engineered for supreme legibility across signs, physical print, and handheld interfaces.

### Editorial Hierarchy
- **Clarity First:** Plain-language legal interpretations require relaxed line-heights (`1.6` on body text) to accommodate cognitive processing during urgent civic situations.
- **Section Citations:** Verbatim constitutional excerpts (e.g., "Article 49(1) – (4)") use `label-md` or `body-sm` with slightly reduced leading and tabular numerals to emphasize reference precision.
- **Bilingual Balance:** Swahili phrases tend to have longer word structures than English. Typography styles must accommodate flexible container heights without clipping or hyphenating awkward civic terminology.

## Layout & Spacing

The layout is built on a responsive mobile-first architecture utilizing a strict 4px/8px incremental grid.

### Screen Grids & Layout Flow
- **Mobile Handheld (360px – 480px):** Single-column stack with `1rem` (16px) outer edge margins and a 2-column card grid for primary category tiles.
- **Tablet / Large Handheld (600px+):** Centered max-width shell capped at `520px` to maintain focused, step-by-step reading comprehension.
- **Vertical Rhythm:**
  - Content item gaps: `0.75rem` (12px) between sequential scenario links.
  - Section separation: `1.5rem` (24px) between contextual headers and card clusters.
  - Step timeline nodes: `1.25rem` (20px) top-to-bottom step displacement with continuous connected tracks.

## Elevation & Depth

This system avoids floating drop shadows or heavy blur effects, relying instead on structural containment, crisp contrast boundaries, and subtle tonal layering.

- **Level 0 (Canvas):** Flat base surface rendered in `#F8FAF9`.
- **Level 1 (Cards & Inputs):** Solid `#FFFFFF` surfaces bounded by a crisp 1px border of `#E1E9E5`. A resting shadow of `0 1px 3px rgba(25, 35, 32, 0.04)` provides micro-separation without visual clutter.
- **Level 2 (Active/Pressed Elements):** Pressed states on category cards use `#F0F5F2` fills with border accenting in `#C8E3D4`.
- **Level 3 (Modal Sheets & Floating Audio Controls):** Elevated bottom sheets use `0 -4px 20px rgba(25, 35, 32, 0.08)` coupled with an overlay tint of `rgba(25, 35, 32, 0.35)`.

## Shapes

The design system employs **Roundedness Level 2**, conveying warmth and accessibility while upholding disciplined civic structure.

- **Standard Elements (0.5rem / 8px):** Search inputs, list navigation rows, and step-by-step guidance cards.
- **Large Containers (1rem / 16px):** Category grid tiles, expandable constitutional source containers, and banner announcements.
- **Pill / Circular (9999px):** Numbered step identifiers (e.g., circular badges `1`, `2`, `3`), audio read-aloud buttons, and language switcher badges (EN/SW).

## Components

### Buttons & Interactive Badges
- **Primary Action Button:** Solid `#1E4B3E` background, `#FFFFFF` text, `0.5rem` radius, 48px minimum touch height, center-aligned `title-md` font.
- **Language Switcher (EN / SW):** Compact segmented pill badge. Active language uses `#1E4B3E` text on `#E8F2EC` fill; inactive language uses `#5A6A64`.
- **Audio Read-Aloud Utility:** Subtle outline pill button featuring a speaker glyph and `label-md` text, providing rapid access for audio-first citizens.

### Step-by-Step Flow Guides
- **Step Counters:** 28px circular markers with a solid `#1E4B3E` fill and bold white numerals. Connected vertically by a 2px `#C8E3D4` line track.
- **Content Blocks:** Paired rightward card blocks detailing the plain-language instruction, followed by secondary contextual advice in `#5A6A64`.

### Verification Cards ("What the Constitution actually says")
- **Visual Design:** Distinct accordion component wrapped in a `#F4F8F6` container with an `#C8E3D4` border.
- **Iconography:** Book or statutory balance linear icon at 20px in `#1E4B3E`.
- **Expandable State:** Toggles open to reveal exact constitutional text cited with bold article and clause indicators, establishing provenance and legal trust.

### Civic Disclaimer Footers
- **Styling:** Inset card with `#F4F6F5` background, faint `#E1E9E5` border, and an info circle glyph.
- **Microcopy:** Explicit statement distinguishing constitutional educational information from formal attorney-client legal representation, alongside dynamic "Last reviewed" date stamps.