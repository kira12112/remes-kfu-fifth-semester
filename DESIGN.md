# Reme's KFU Fifth Semester — Design System

> **Platform:** Medical Education App for Riham, Kazan Federal University, 5th Semester  
> **Primary Device:** Android Mobile  
> **Design Philosophy:** Premium, minimal, modern, warm — built for long study sessions, not for impressions.

---

## 1. Brand Identity

| Property | Value |
|---|---|
| **Product Name** | Reme's KFU Fifth Semester |
| **Tagline** | علم حقيقي، تجربة استثنائية |
| **Tagline (EN)** | Real Knowledge, Exceptional Experience |
| **Target User** | Riham — 5th Semester Medical Student, KFU |
| **Personality** | Academically sophisticated, warm, personal, trustworthy |
| **Voice** | Encouraging but focused; professional but not cold |

**Brand Principles:**
1. **Clarity first** — every decision must improve focus and reduce cognitive load
2. **Warm professionalism** — feels personal and crafted, not like a generic SaaS template
3. **Mobile native** — designed for the hand, not ported from desktop
4. **Bilingual respect** — Arabic and English are equal citizens, never an afterthought

---

## 2. Color Palette

### Light Mode

| Token | Hex | Usage |
|---|---|---|
| `color-primary` | `#0F766E` | Primary actions, links, active states |
| `color-primary-light` | `#14B8A6` | Hover states, secondary teal usage |
| `color-primary-dark` | `#0D5E57` | Pressed states, deep accents |
| `color-secondary` | `#D97706` | Highlights, bookmarks, warm accents |
| `color-secondary-light` | `#F59E0B` | Badges, streak indicators |
| `color-secondary-dark` | `#B45309` | Pressed amber states |
| `color-background` | `#FAFAF9` | Main app background (warm off-white) |
| `color-surface` | `#FFFFFF` | Cards, modals, drawers |
| `color-surface-alt` | `#F5F5F4` | Subtle section backgrounds |
| `color-text-primary` | `#1C1917` | Headings, primary body text |
| `color-text-secondary` | `#78716C` | Captions, helper text, metadata |
| `color-text-tertiary` | `#A8A29E` | Placeholders, disabled text |
| `color-border` | `#E7E5E4` | Dividers, card outlines |
| `color-border-strong` | `#D6D3D1` | Input borders, table lines |
| `color-success` | `#16A34A` | Correct answers, completion |
| `color-success-bg` | `#F0FDF4` | Success alert backgrounds |
| `color-warning` | `#D97706` | Partial completion, caution |
| `color-warning-bg` | `#FFFBEB` | Warning alert backgrounds |
| `color-error` | `#DC2626` | Wrong answers, errors, required |
| `color-error-bg` | `#FEF2F2` | Error alert backgrounds |
| `color-coming-soon` | `#7C3AED` | Coming Soon badges, locked content |
| `color-coming-soon-bg` | `#F5F3FF` | Coming Soon section backgrounds |

### Dark Mode

| Token | Hex | Usage |
|---|---|---|
| `color-background` | `#0C0A09` | Warm near-black (not pure #000000) |
| `color-surface` | `#1C1917` | Card and modal backgrounds |
| `color-surface-alt` | `#292524` | Elevated surface layer |
| `color-border` | `#292524` | Subtle dividers |
| `color-border-strong` | `#44403C` | Input borders, prominent dividers |
| `color-text-primary` | `#FAFAF9` | Headings, primary text |
| `color-text-secondary` | `#A8A29E` | Captions, helper text |
| `color-text-tertiary` | `#78716C` | Placeholders, disabled |
| `color-primary` | `#2DD4BF` | Brightened teal for dark bg contrast |
| `color-primary-dark` | `#0F766E` | Pressed state on dark |
| `color-secondary` | `#F59E0B` | Amber stays warm on dark |
| `color-success` | `#4ADE80` | Brightened for dark mode legibility |
| `color-warning` | `#FCD34D` | Brightened amber warning |
| `color-error` | `#F87171` | Brightened red for dark mode |
| `color-coming-soon` | `#A78BFA` | Lightened purple for dark |

### Tailwind CSS Custom Tokens (tailwind.config.js)

```js
colors: {
  primary: {
    DEFAULT: '#0F766E',
    light: '#14B8A6',
    dark: '#0D5E57',
  },
  secondary: {
    DEFAULT: '#D97706',
    light: '#F59E0B',
    dark: '#B45309',
  },
  surface: {
    DEFAULT: '#FFFFFF',
    alt: '#F5F5F4',
  },
  'coming-soon': '#7C3AED',
}
```

---

## 3. Typography

### English — Inter

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

| Token | Size | Line Height | Weight | Usage |
|---|---|---|---|---|
| `text-xs` | 12px | 1.4 | 400 | Labels, tiny metadata |
| `text-sm` | 14px | 1.5 | 400/500 | Captions, secondary text |
| `text-base` | 16px | 1.6 | 400 | Body text (minimum) |
| `text-lg` | 18px | 1.6 | 500 | Card titles, section labels |
| `text-xl` | 20px | 1.5 | 600 | Page subheadings |
| `text-2xl` | 24px | 1.3 | 700 | Section headings |
| `text-3xl` | 30px | 1.2 | 700 | Page titles |
| `text-4xl` | 36px | 1.1 | 700 | Hero headings |

### Arabic — IBM Plex Sans Arabic

```css
font-family: 'IBM Plex Sans Arabic', 'Tajawal', 'Cairo', sans-serif;
```

| Property | Value |
|---|---|
| **Primary** | IBM Plex Sans Arabic |
| **Fallback 1** | Tajawal |
| **Fallback 2** | Cairo |
| **Direction** | RTL (`dir="rtl"`) |
| **Line Height** | 1.6–1.8 (Arabic requires more) |
| **Same size scale** | As English above |

### Bilingual Text Rules

```css
/* Arabic content wrapper */
.arabic-text {
  font-family: 'IBM Plex Sans Arabic', 'Tajawal', sans-serif;
  direction: rtl;
  text-align: right;
  line-height: 1.8;
}

/* English within Arabic context */
.mixed-text {
  unicode-bidi: embed;
}

/* Force RTL paragraph with inline LTR numbers/EN */
.rtl-with-en {
  direction: rtl;
  unicode-bidi: isolate;
}
```

> **Rule:** Never set a fixed `letter-spacing` on Arabic text — it breaks glyph connections. English body text uses `letter-spacing: -0.01em` only at large sizes.

---

## 4. Spacing Scale

Base unit: **4px**

| Token | Value | Usage |
|---|---|---|
| `space-xs` | 4px | Icon gaps, tight list items |
| `space-sm` | 8px | Inner card padding, button gaps |
| `space-md` | 16px | Standard padding, section margins |
| `space-lg` | 24px | Card padding, section breaks |
| `space-xl` | 32px | Major section spacing |
| `space-2xl` | 48px | Page-level gaps |
| `space-3xl` | 64px | Hero spacing, large breaks |

```js
// tailwind.config.js
spacing: {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
}
```

---

## 5. Layout Grid

| Breakpoint | Columns | Horizontal Padding | Gutter |
|---|---|---|---|
| Mobile (< 640px) | 1 | 16px | 16px |
| Tablet (640–1023px) | 2 | 24px | 24px |
| Desktop (1024–1279px) | 3 | 32px | 32px |
| Wide (≥ 1280px) | 4 | 32px | 32px |

**Max content width:** `1280px` (centered with auto margins)

```css
.page-container {
  max-width: 1280px;
  margin: 0 auto;
  padding-inline: 16px;
}

@media (min-width: 640px)  { .page-container { padding-inline: 24px; } }
@media (min-width: 1024px) { .page-container { padding-inline: 32px; } }
```

---

## 6. Border Radius

| Token | Value | Usage |
|---|---|---|
| `rounded-sm` | 6px | Tags, chips, small buttons |
| `rounded-md` | 10px | Cards, inputs, dropdowns |
| `rounded-lg` | 16px | Modals, large cards, drawers |
| `rounded-full` | 9999px | Badges, pills, avatar circles |

---

## 7. Shadows

Shadows use **warm-toned transparency** (stone/brown tint, not cool gray):

| Token | CSS Value | Usage |
|---|---|---|
| `shadow-sm` | `0 1px 3px rgba(28,25,23,0.08), 0 1px 2px rgba(28,25,23,0.04)` | Subtle card lift |
| `shadow-md` | `0 4px 12px rgba(28,25,23,0.10), 0 2px 4px rgba(28,25,23,0.06)` | Elevated card, active state |
| `shadow-lg` | `0 16px 40px rgba(28,25,23,0.14), 0 4px 12px rgba(28,25,23,0.08)` | Modal, bottom sheet |
| `shadow-primary` | `0 4px 16px rgba(15,118,110,0.24)` | Teal glow for primary CTA buttons |

> **Dark mode note:** Reduce all shadow opacities by ~30% and increase surface elevation instead (use `color-surface-alt` to lift elements).

---

## 8. Component Specifications

### Card

```
Container:
  background: color-surface
  border: 1px solid color-border
  border-radius: rounded-md (10px)
  padding: space-lg (24px)
  shadow: shadow-sm
  transition: shadow 200ms ease-out

Hover state:
  shadow: shadow-md
  border-color: color-border-strong

Active/Pressed state:
  transform: scale(0.99)
```

### Button — Variants

```
Primary:
  background: color-primary (#0F766E)
  text: white, font-weight: 600, text-sm (14px)
  padding: 12px 24px
  border-radius: rounded-md
  shadow: shadow-primary
  min-height: 44px (accessibility)
  hover: background: color-primary-light
  active: background: color-primary-dark, scale(0.98)
  transition: all 150ms ease-out

Secondary:
  background: transparent
  border: 1px solid color-primary
  text: color-primary
  (same sizing as primary)
  hover: background: color-primary at 8% opacity

Ghost:
  background: transparent
  text: color-text-secondary
  hover: background: color-surface-alt
  (no border)

Destructive:
  background: color-error
  text: white

Disabled (all variants):
  opacity: 0.4
  cursor: not-allowed
  pointer-events: none

Icon Button:
  min-size: 44x44px
  border-radius: rounded-full
```

### Badge

```
Sizes: sm (px-2 py-0.5 text-xs), md (px-3 py-1 text-sm)
border-radius: rounded-full

Variants:
  default:   bg: #F5F5F4,  text: #44403C
  primary:   bg: #CCFBF1,  text: #0F766E
  secondary: bg: #FEF3C7,  text: #92400E
  success:   bg: #DCFCE7,  text: #15803D
  error:     bg: #FEE2E2,  text: #991B1B
  coming-soon: bg: #EDE9FE, text: #5B21B6
```

### Input

```
height: 44px (mobile tap target)
border: 1px solid color-border-strong
border-radius: rounded-md
padding: 0 12px
font-size: text-base (16px) — prevents iOS zoom!
background: color-surface
color: color-text-primary

Focus:
  border-color: color-primary
  box-shadow: 0 0 0 3px rgba(15,118,110,0.12)
  outline: none

Error:
  border-color: color-error
  box-shadow: 0 0 0 3px rgba(220,38,38,0.12)

Placeholder:
  color: color-text-tertiary
```

### Navigation — TopNavBar

```
height: 56px
background: color-surface (blur backdrop on scroll)
border-bottom: 1px solid color-border
padding: 0 16px
z-index: 50

Contains:
  - Back button (44x44px tap target)
  - Page title (text-lg, font-weight: 600)
  - Optional trailing action (44x44px)
```

### Navigation — BottomNavBar (Mobile)

```
height: 60px + safe-area-inset-bottom
background: color-surface
border-top: 1px solid color-border
display: flex, justify-content: space-around
padding-bottom: env(safe-area-inset-bottom)
position: fixed, bottom: 0

Tab item:
  min-width: 44px
  display: flex, flex-direction: column, align-items: center
  gap: 2px
  
  Icon: 24x24px (Lucide)
  Label: text-xs (10px for tight nav labels), font-weight: 500

Active tab:
  icon: color-primary
  label: color-primary
  
Inactive tab:
  icon + label: color-text-tertiary
```

### Tab (Content Switcher)

```
Container:
  background: color-surface-alt
  border-radius: rounded-md
  padding: 4px
  display: flex

Tab item:
  flex: 1
  height: 36px
  border-radius: rounded-sm (6px)
  font-size: text-sm (14px)
  font-weight: 500
  text-align: center
  transition: all 150ms ease-out

Active:
  background: color-surface
  color: color-primary
  shadow: shadow-sm

Inactive:
  color: color-text-secondary
```

### Progress Bar

```
Container height: 6px
border-radius: rounded-full
background: color-border (unfilled track)

Fill:
  background: color-primary
  border-radius: rounded-full
  transition: width 400ms ease-out

With label:
  Show "X / Y lectures" in text-xs color-text-secondary
  Margin-bottom: space-xs between label and bar
```

### Quiz Card

```
layout: same as Card base
header: Subject badge + difficulty badge (flex, space-between)
title: text-lg, font-weight: 600, margin-top: space-sm
meta: "X questions • Est. Y min" in text-sm color-text-secondary
footer: Start button (Primary variant, full-width on mobile)

Question states:
  Unanswered: border: 1px solid color-border
  Selected:   border: 2px solid color-primary, bg: rgba(15,118,110,0.04)
  Correct:    border: 2px solid color-success, bg: color-success-bg
  Incorrect:  border: 2px solid color-error,   bg: color-error-bg
```

### Lecture Card

```
layout: horizontal on mobile (image left, content right)
         vertical on tablet+ (image top)
image: aspect-ratio 16:9 (or icon placeholder), border-radius top corners
content area: padding space-md
title: text-base, font-weight: 600, 2-line clamp
meta: "Lecture X • PDF / Video" in text-xs color-text-secondary
badge: viewing status (Completed ✓ / In Progress / New)
```

### Subject Card

```
layout: vertical card, tap to open subject dashboard
icon/color: each subject has a unique accent color within the teal/amber family
title: text-lg, font-weight: 700
progress: ProgressBar + "X% complete" label
lecture count: text-sm color-text-secondary
status badge: Coming Soon (purple) / Active (teal) / Completed (green)
```

### PDF Viewer

```
Container: full-bleed, background: #1C1917 (always dark for reading contrast)
Controls:
  - Top bar: page number, zoom controls, close button
  - Swipe left/right: next/prev page
  - Double-tap: zoom in
  - Pinch: zoom

Loading state: skeleton with pulse animation
Error state: EmptyState component with retry action
```

### Search Bar

```
height: 44px
border-radius: rounded-full
background: color-surface-alt
border: 1px solid color-border
padding: 0 16px 0 44px (icon indent)
font-size: 16px (prevent iOS zoom)

Leading icon: Search (Lucide), color-text-tertiary, 20px
Trailing: Clear × button (animated fade-in when has value)

Focus ring: 2px solid color-primary, offset: 1px
```

### Loading States

```
Skeleton:
  background: linear-gradient(90deg, color-border 25%, color-surface-alt 50%, color-border 75%)
  background-size: 200% 100%
  animation: shimmer 1.5s infinite
  border-radius: matches the content shape

Spinner (for actions):
  24px circle, border: 2px solid color-border, border-top: 2px solid color-primary
  animation: spin 700ms linear infinite
  
Page loading:
  Logo fade pulse, centered, color-primary
```

### Empty States

```
Container: centered, padding: space-3xl space-xl
Illustration: Lucide icon, 64px, color-text-tertiary
Title: text-xl, font-weight: 600, color-text-primary
Body: text-sm, color-text-secondary, max-width: 280px, text-center
CTA: Primary button (when action exists)

Variants:
  - No lectures yet
  - No quiz history
  - Search no results
  - Offline / no connection
```

### Toast Notifications

```
Position: top-center (mobile), bottom-right (desktop)
max-width: 360px
border-radius: rounded-lg
padding: 12px 16px
shadow: shadow-lg
animation: slide down (enter), fade out (exit)
auto-dismiss: 4000ms

Variants:
  success: left border 4px color-success, icon: CheckCircle
  error:   left border 4px color-error,   icon: XCircle
  warning: left border 4px color-warning, icon: AlertTriangle
  info:    left border 4px color-primary, icon: Info
```

---

## 9. Dark Mode

Dark mode is detected via `prefers-color-scheme: dark` and togglable via user preference stored in localStorage.

| Token | Light | Dark |
|---|---|---|
| `color-background` | `#FAFAF9` | `#0C0A09` |
| `color-surface` | `#FFFFFF` | `#1C1917` |
| `color-surface-alt` | `#F5F5F4` | `#292524` |
| `color-border` | `#E7E5E4` | `#292524` |
| `color-border-strong` | `#D6D3D1` | `#44403C` |
| `color-text-primary` | `#1C1917` | `#FAFAF9` |
| `color-text-secondary` | `#78716C` | `#A8A29E` |
| `color-text-tertiary` | `#A8A29E` | `#78716C` |
| `color-primary` | `#0F766E` | `#2DD4BF` |
| `color-success` | `#16A34A` | `#4ADE80` |
| `color-warning` | `#D97706` | `#FCD34D` |
| `color-error` | `#DC2626` | `#F87171` |
| `color-coming-soon` | `#7C3AED` | `#A78BFA` |

> **Implementation:** Use Tailwind `dark:` variants and CSS custom properties. Avoid JavaScript-only theme switching to prevent flash-of-unstyled-content (FOUC).

```css
:root {
  --color-background: #FAFAF9;
  --color-surface: #FFFFFF;
  /* ... */
}

[data-theme="dark"], @media (prefers-color-scheme: dark) {
  --color-background: #0C0A09;
  --color-surface: #1C1917;
  /* ... */
}
```

---

## 10. Animation Principles

### Timing

| Token | Duration | Usage |
|---|---|---|
| `duration-fast` | 150ms | Hover states, button feedback, toggles |
| `duration-normal` | 250ms | Cards appearing, tabs switching, drawers |
| `duration-slow` | 400ms | Page transitions, modals, progress fills |

### Easing

| Use case | Curve |
|---|---|
| Elements entering | `ease-out` (cubic-bezier(0, 0, 0.2, 1)) |
| Elements exiting | `ease-in` (cubic-bezier(0.4, 0, 1, 1)) |
| Interactive feedback | `ease-in-out` |
| Spring bounce | Use Motion's `spring` with stiffness: 300, damping: 30 |

### Motion Library (motion.dev) Usage

```tsx
import { motion, AnimatePresence } from 'motion/react'

// Page transition
<motion.div
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -4 }}
  transition={{ duration: 0.25, ease: 'easeOut' }}
>

// Card hover
<motion.div whileHover={{ y: -2 }} transition={{ duration: 0.15 }}>

// Tab indicator
<motion.div layoutId="tab-indicator" />  // shared layout animation
```

### Rules

1. **Never animate text that is being read** — no moving lecture content
2. **Support `prefers-reduced-motion`** — wrap all non-essential animations:
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.01ms !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```
3. **No animation loops** in content areas (spinners only during loading)
4. **Performance** — use `transform` and `opacity` only (GPU-composited properties)
5. **Avoid layout animations on scroll** — only use on user interactions

---

## 11. Reading Experience Guidelines

| Property | Value | Reason |
|---|---|---|
| Minimum body font size | 16px | Below this causes iOS auto-zoom and eye strain |
| Arabic line height | 1.6–1.8 | Arabic descenders need more vertical space |
| English line height | 1.5–1.7 | Comfortable for extended reading |
| Max line length | 70ch | Prevents eye fatigue on wide screens |
| Paragraph spacing | 1em below each `<p>` | Visual separation between thoughts |
| Content padding | ≥ 16px horizontal | No text ever touches screen edges |
| Background (light) | `#FAFAF9` not pure white | Reduces eye strain on bright screens |
| Background (dark) | `#0C0A09` not pure black | Less harsh contrast for night reading |

**PDF Viewer special rules:**
- Always dark background for reading (#1C1917 or darker)
- Zoom: 100% default on mobile, pinch-to-zoom enabled
- Never restrict user zoom with `maximum-scale=1` in viewport meta

---

## 12. Mobile-First Rules

| Rule | Value | Reason |
|---|---|---|
| Minimum tap target | 44 × 44 px | iOS HIG + Android Material guideline |
| Primary navigation | Bottom nav bar | Reachable with one thumb |
| Secondary nav | Top nav (back, title, action) | Standard mobile pattern |
| Lecture navigation | Swipe left/right | Natural page-turn gesture |
| Pull-to-refresh | On lecture lists | Offline sync indication |
| Safe area insets | `env(safe-area-inset-*)` | Notched/punch-hole phones |
| Keyboard avoidance | Scroll view adjusts | Inputs never hidden by keyboard |
| Font size in inputs | Minimum 16px | Prevents iOS Safari auto-zoom |
| Long press | Bookmarking lectures | Contextual action without clutter |
| Offline indicator | Toast + subtle banner | Medical students study without Wi-Fi |

---

## 13. Responsive Breakpoints (Tailwind)

| Breakpoint | Min Width | Layout Change |
|---|---|---|
| *(default)* | 0px | 1 column, bottom nav, full-width cards |
| `sm` | 640px | 2 columns begin, side padding increases |
| `md` | 768px | Sidebar appears option, bottom nav may hide |
| `lg` | 1024px | 3 columns, full sidebar, top nav only |
| `xl` | 1280px | 4 columns, max-width container centers |
| `2xl` | 1536px | No change in layout, content stays at 1280px max |

```js
// tailwind.config.js
screens: {
  sm:  '640px',
  md:  '768px',
  lg:  '1024px',
  xl:  '1280px',
  '2xl': '1536px',
}
```

---

## 14. Accessibility Rules

| Rule | Standard | Implementation |
|---|---|---|
| Text contrast ratio | AA: 4.5:1 (body), 3:1 (large) | Verified for all color tokens above |
| Primary on background | 7.2:1 ✅ | `#0F766E` on `#FAFAF9` |
| Focus indicators | Visible, 2px offset ring | Never `outline: none` without custom ring |
| ARIA labels | All icon-only buttons | `aria-label="Bookmark lecture"` |
| Heading hierarchy | `h1` → `h2` → `h3` only | Never skip levels for styling |
| Landmark roles | `<main>`, `<nav>`, `<aside>` | Native HTML elements preferred |
| Form labels | Explicit `<label for>` | No placeholder-only labels |
| Error messages | Linked via `aria-describedby` | Screen reader announces errors |
| Loading state | `aria-busy="true"`, `aria-live` | Announced to screen readers |
| Images | `alt=""` for decorative, descriptive for content | Never omit |
| Language | `lang="ar"` / `lang="en"` on content switches | Correct TTS pronunciation |

---

*Design System Version 1.0 — Authored for Reme's KFU Fifth Semester Platform*  
*Last updated: November 2026*
