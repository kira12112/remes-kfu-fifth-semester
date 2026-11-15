---
name: accessibility-responsive-design
description: WCAG principles, keyboard accessibility, screen readers, contrast, touch accessibility, and mobile-first responsive layouts for Reme's KFU Fifth Semester.
version: 1.0.0
---

# 12. Accessibility & Responsive Design Skill

## Activation Criteria
Activate this skill when designing, building, or reviewing UI components, layouts, pages, touch interactions, typography scales, or viewport adaptations, especially focusing on Android mobile viewports.

## Description
This skill ensures Reme's KFU Fifth Semester platform delivers a world-class, inclusive user experience that complies with WCAG 2.1 AA standards and prioritizes mobile usability. Since the target user primarily uses an Android mobile phone for intensive study sessions, touch targets, contrast ratios, smooth font rendering, and zero horizontal scrolling are paramount.

## Operational Instructions

### 1. Viewport Hierarchy & Breakpoint Strategy
- Primary target: Android mobile screens (360px, 390px, 412px, 430px).
- Secondary targets: Tablets (768px, 820px, 1024px) and Desktop monitors (1280px, 1440px+).
- Never allow unintentional horizontal scroll (`overflow-x: hidden` on viewport roots, fluid card containers).
- Preserve safe area insets for notched or rounded-corner displays (`safe-area-inset-bottom` for mobile bottom bars).

### 2. Touch & Ergonomics (Mobile-First)
- Minimum touch target size: 44px by 44px for buttons, navigation tabs, and option selectors.
- Generous tap padding around interactive cards and list items.
- Primary actions positioned within the comfortable thumb zone on mobile screens.
- Bottom navigation bar sticky on mobile; top header clean with branding and search.

### 3. Contrast & Legibility
- WCAG AA minimum contrast ratio of 4.5:1 for standard body text.
- Large headings (above 18px bold or 24px regular) must maintain at least 3:1 contrast.
- Subdued text (`text-stone-400` / `text-stone-500`) must be tested on light surface backgrounds.
- High contrast focus rings (`ring-2 ring-primary-600 ring-offset-2`) on all interactive controls.

### 4. Bilingual Typography & BiDi Support
- English text: `Inter`, line-height 1.5 - 1.7.
- Egyptian Arabic text: `IBM Plex Sans Arabic` or `Tajawal`, line-height 1.7 - 1.9 for enhanced diacritic and ligature clarity.
- Mixed text: Ensure English technical terms within Arabic sentences render in proper LTR inline order using appropriate Unicode BiDi rules.

### 5. Screen Readers & Keyboard Navigation
- All icon-only buttons must include descriptive `aria-label` attributes.
- Use semantic HTML tags (`<main>`, `<nav>`, `<article>`, `<header>`, `<section>`).
- Visible outline on `:focus-visible` without breaking custom design aesthetics.

## Quality Checklist
- [ ] Tested on 360px viewport without clipping or horizontal overflow.
- [ ] All interactive buttons meet 44x44px minimum touch target size.
- [ ] Focus outlines visible during full keyboard tab traversal.
- [ ] Screen readers announce quiz options and status changes accurately.
- [ ] Color contrast passes WCAG 2.1 AA guidelines.
