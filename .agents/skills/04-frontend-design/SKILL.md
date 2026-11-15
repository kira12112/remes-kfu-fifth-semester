---
name: frontend-design
description: Premium UI/UX, design research, visual hierarchy, responsive design, design systems, mobile-first interfaces.
version: 1.0.0
---

# Frontend Design Skill

## Activation Criteria
Activate this skill when:
- Designing the visual identity and design system of the platform
- Creating page layouts and component visual specifications
- Defining color palettes, typography, spacing, and iconography
- Designing for mobile-first responsive experiences
- Conducting design research or reviewing UI/UX patterns
- Creating or updating design tokens
- Reviewing visual consistency across pages

## Description
This skill governs the visual design and user experience of the KFU Fifth Semester platform. The design philosophy is "Premium Medical Education" — clean, professional, trustworthy, and visually engaging without being distracting. The audience is 5th-year medical students who need to study efficiently, so the design must reduce cognitive load, establish clear visual hierarchy, and work flawlessly on mobile devices (students study on phones).

## Operational Instructions

### 1. Design Philosophy
- **Premium but accessible**: High-quality feel without clutter
- **Medical professional**: Blues, teals, clean whites — evokes clinical precision
- **Mobile-first**: Designed for 390px (iPhone 14 Pro) first, then tablet, then desktop
- **Content-first**: UI chrome is minimal; content gets maximum space
- **Consistent**: Every page follows the same visual language
- **Fast-feeling**: Skeleton screens, optimistic updates, no jarring layout shifts

### 2. Color System
**Primary palette:**
- Primary: `#2563EB` (Blue 600) — Interactive elements, links, buttons
- Primary Dark: `#1E40AF` (Blue 800) — Hover states
- Secondary: `#0891B2` (Cyan 600) — Accents, tags, badges
- Success: `#16A34A` (Green 600) — Correct answers, completion
- Warning: `#D97706` (Amber 600) — Caution, partial completion
- Danger: `#DC2626` (Red 600) — Wrong answers, errors

**Neutral palette:**
- Background: `#F8FAFC` (Slate 50) — Page background
- Surface: `#FFFFFF` — Cards, modals, panels
- Border: `#E2E8F0` (Slate 200) — Dividers, card borders
- Text Primary: `#0F172A` (Slate 900) — Headings
- Text Secondary: `#475569` (Slate 600) — Body text
- Text Muted: `#94A3B8` (Slate 400) — Placeholders, metadata

**Subject color themes** (consistent per subject):
- Pharmacology: Purple (`#7C3AED`)
- Pathology: Rose (`#E11D48`)
- Microbiology: Teal (`#0D9488`)
- Parasitology: Green (`#16A34A`)
- Community Medicine: Amber (`#D97706`)
- Clinical Skills: Indigo (`#4338CA`)

### 3. Typography
- **Font**: Inter (variable font, loaded via Google Fonts or self-hosted)
- **Headings**: Inter, weight 700 (Bold) — h1: 2.25rem, h2: 1.875rem, h3: 1.5rem, h4: 1.25rem
- **Body**: Inter, weight 400 (Regular) — 1rem (16px), line-height 1.6
- **Captions/Meta**: Inter, weight 400 — 0.875rem (14px)
- **Labels/Badges**: Inter, weight 600 (SemiBold) — 0.75rem (12px), uppercase tracking
- **Arabic text**: Noto Sans Arabic or Cairo (Google Fonts) — rendered RTL inline within LTR layouts

### 4. Spacing System
Follow Tailwind's default scale (4px base unit):
- xs: 4px (1), sm: 8px (2), md: 16px (4), lg: 24px (6), xl: 32px (8), 2xl: 48px (12), 3xl: 64px (16)
- Card padding: 24px (p-6)
- Section gaps: 32px–48px
- Mobile content padding: 16px horizontal

### 5. Component Visual Specifications

**Subject Card:**
- Rounded corners: 12px (rounded-xl)
- Subtle shadow: `shadow-sm` default, `shadow-md` on hover
- Left border accent in subject color (4px wide)
- Subject icon: 40x40px, subject color background, white icon
- Hover: scale(1.02), shadow increase, smooth transition
- Coming Soon: 60% opacity, "Coming Soon" badge overlay

**Navigation Header:**
- Height: 64px desktop, 56px mobile
- Sticky positioned
- Backdrop blur on scroll: `backdrop-blur-md bg-white/80`
- Logo left, navigation center (desktop), hamburger right (mobile)
- Active route indicator: bottom border in primary color

**PDF Viewer:**
- Full-width on mobile, contained max-width on desktop
- Floating controls bar (prev/next page, zoom, fullscreen)
- Page counter display
- Side panel (desktop) for bookmarks and table of contents

**Quiz Cards:**
- Question text in 1.125rem, semibold
- Answer options as large clickable radio-style buttons
- Color feedback on selection (highlight correct/incorrect after submission)
- Progress bar at top showing question N of Total

### 6. Responsive Breakpoints
- Mobile: 320px–767px (primary design target)
- Tablet: 768px–1023px
- Desktop: 1024px–1279px
- Wide: 1280px+

Grid behavior:
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns
- Wide: 4 columns (subject grid)

### 7. Dark Mode
- Implement using CSS variables and Tailwind's `dark:` prefix
- System preference detection via `prefers-color-scheme`
- Manual toggle stored in localStorage
- Dark background: `#0F172A` (Slate 900)
- Dark surface: `#1E293B` (Slate 800)

## Workflows

### New Page Design
1. Identify page purpose and primary user action
2. Sketch information hierarchy (what's most important?)
3. Define responsive layout (mobile first)
4. Apply design tokens (colors, spacing, typography)
5. Use shadcn/ui components as base
6. Verify against design checklist
7. Document any new design decisions in design system notes

### New Component Design
1. Check if shadcn/ui has the primitive needed
2. Define visual states: default, hover, active, disabled, loading, error
3. Define responsive behavior
4. Apply subject color theming if applicable
5. Add animation spec (see motion-interaction-design skill)
6. Document props and visual variants

## Quality Checklist
- [ ] Mobile-first: designed for 390px before larger screens
- [ ] All colors use design token variables (not hard-coded hex)
- [ ] Typography hierarchy is clear: headings, body, captions
- [ ] Subject color themes applied consistently
- [ ] Dark mode implemented and tested
- [ ] Interactive states: hover, focus, active, disabled defined
- [ ] Touch targets minimum 44x44px on mobile
- [ ] No layout shift (CLS) on page load
- [ ] Arabic text renders correctly within LTR layouts
- [ ] Coming Soon states visually distinct but not hidden
- [ ] Empty states designed for all list views
- [ ] Loading states (skeletons) designed for all async content
- [ ] Design decisions documented in design system notes
