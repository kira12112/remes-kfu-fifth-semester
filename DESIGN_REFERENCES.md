# Design References Research

> Research and rationale behind every design decision in Reme's KFU Fifth Semester platform.

---

## Selected Technologies

### Animation — Motion (motion.dev)
- **Package:** `motion` (formerly Framer Motion, now standalone)
- **Why chosen:** Best-in-class React animation library. Provides:
  - `AnimatePresence` for route/page transitions
  - `layoutId` for shared element animations (tab indicators, card expansions)
  - `whileHover` / `whileTap` for micro-interactions
  - `spring` physics for natural-feeling animations
  - Automatic `prefers-reduced-motion` support
- **Usage scope:** Page transitions, card hovers, tab switching, modal enter/exit, progress bar fills
- **Bundle size:** Tree-shakeable; only import what you use

### UI Components — shadcn/ui
- **Why chosen:**
  - Copy-paste components, fully owned code (not a black-box dependency)
  - Built on Radix UI primitives — fully accessible (ARIA, keyboard nav, focus management)
  - Tailwind-based styling — aligns with our design system perfectly
  - Actively maintained, excellent documentation
  - Easily customizable to our warm teal/amber palette
- **Components to use:** Dialog, Sheet, Tabs, Select, Checkbox, RadioGroup, Tooltip, Popover, DropdownMenu, Progress, Scroll Area
- **Customization:** Override `components.json` to use our `color-primary` teal tokens

### Icons — Lucide React
- **Why chosen:**
  - Consistent 24x24 stroke-based icons
  - Huge library covering all medical/education use cases
  - React-native compatible (expo-modules version available if needed)
  - Accessible: accepts `aria-label`, `aria-hidden` props
  - Lightweight: individually importable
- **Key icons used:**
  - `BookOpen` — lectures
  - `FlaskConical` — practical/lab sessions
  - `Brain` — quiz/study
  - `FileText` — PDF content
  - `Bookmark` — save lecture
  - `CheckCircle2` — completed
  - `Lock` — coming soon
  - `ChevronLeft/Right` — navigation
  - `Search` — search bar
  - `Moon/Sun` — dark mode toggle

### Typography — IBM Plex Sans Arabic + Inter

#### IBM Plex Sans Arabic
- **Designer:** IBM + Bold Monday
- **Why chosen for Arabic:**
  - Specifically designed for screen rendering at all sizes
  - Modern, clean letterforms — matches the premium feel
  - Excellent Latin-Arabic mixing (designed to work together)
  - Available on Google Fonts (no CORS issues)
  - Better alternative to Noto Arabic (more personality) or Cairo (too casual)
- **Fallback:** Tajawal (also Google Fonts, clean modern Arabic)

#### Inter
- **Designer:** Rasmus Andersson
- **Why chosen for English:**
  - Purpose-built for screen interfaces and high readability
  - Extremely high legibility at small sizes (critical for mobile)
  - Variable font — single file for all weights
  - Used by: Linear, Vercel, Supabase, Stripe — premium product standard
  - Excellent numeral alignment for grades/progress displays

---

## Design Inspiration Sources

### Mobbin.com — Mobile Education App Patterns
Studied the following patterns from Mobbin's education app library:
- **Card-based subject browsing:** Large, tappable cards with clear visual hierarchy work better than dense lists on mobile
- **Progress visualization:** Circular progress per subject (like Duolingo) vs. linear bar — chose linear for simplicity and Arabic-friendliness
- **Tab navigation (Theory / Practical):** Segmented control pattern used by apps like Khan Academy, Coursera mobile
- **Bottom sheet for quiz settings:** Less disruptive than a full modal; keeps context visible
- **Swipe-to-navigate lectures:** PDFs/pages swiped like slides; inspired by Kindle, Apple Books
- **Empty state illustrations:** Purposeful, not decorative; each has a CTA

### Component.gallery — Component Pattern References
Referenced the following component patterns:
- **Badge/Tag:** Rounded pill shape (not square) consistently chosen for readability in tight mobile spaces
- **Input fields:** Underline-only inputs rejected (harder to see on mobile, low contrast); full-border inputs chosen
- **Navigation patterns:** Bottom tab bar analysis — icon + label combination outperforms icon-only for discoverability in education apps
- **Card anatomy:** Established card structure: image → metadata → title → footer action

### Land-book.com — Dashboard / App Inspiration
Noted characteristics of premium educational and SaaS products:
- **Warm neutrals** are dominant in products that want to feel "crafted" vs. "enterprise"
- **Teal/green-adjacent primaries** are common in health, education, and science products (trustworthy + professional)
- **Generous white space** in top-tier products — content breathes; density is a last resort
- **Consistent type scale** — the best products use 2–3 sizes maximum in any single view

---

## Rejected Libraries (with Reasons)

| Library | Category | Reason for Rejection |
|---|---|---|
| **Spline 3D** | 3D scene rendering | No use case in an educational reading platform; massive bundle size; distracts from content |
| **Aceternity UI** | Effect components | Beautiful but wrong context — spotlight effects, beam animations, and particle fields harm reading focus; inappropriate for a study tool |
| **React Spring** | Animation | Superseded by Motion (motion.dev) which has better React 18 support, simpler API, and built-in layout animations |
| **Lottie animations** | Illustration animations | Too heavy for mobile; complex JSON files; slower than CSS/Motion alternatives |
| **Animate.css** | CSS animations | No React integration; not customizable enough; produces jarring animations |
| **Swiper.js** | Carousel/slider | Overcomplicated for our swipe needs; Motion handles gesture-based navigation with less overhead |
| **Material UI** | Component library | Google Material design language conflicts with our warm premium aesthetic; heavy bundle |
| **Chakra UI** | Component library | Less accessible than Radix/shadcn; slower customization for our specific design tokens |
| **Bootstrap** | CSS framework | Tailwind chosen instead — utility-first matches our component architecture better |
| **GSAP** | Animation | Overkill for our animation needs; Motion covers all use cases at lower complexity |
| **Three.js / R3F** | 3D rendering | No 3D content in a medical PDF/quiz platform; pure performance cost |
| **Framer (design tool)** | Prototyping | Development uses Motion library directly; Figma used for design |
| **Glassmorphism CSS kits** | Visual effects | Explicitly avoided — glass effects on text backgrounds harm readability |

---

## Color Inspiration

### Why Teal (`#0F766E`) as Primary

| Factor | Rationale |
|---|---|
| **Medical association** | Teal/green is universally associated with medicine, health, and science |
| **Trust** | Blue-greens convey trustworthiness and calm — appropriate for study tools |
| **Warmth** | Unlike pure blue, teal has green warmth — less cold and corporate |
| **Contrast** | Deep teal (`#0F766E`) achieves 7.2:1 contrast on `#FAFAF9` — exceeds AA |
| **Distinctiveness** | Most medical apps use pure blue; teal differentiates Reme's platform |
| **Dark mode** | Brightens naturally to `#2DD4BF` on dark backgrounds with no extra work |

### Why Amber (`#D97706`) as Secondary

| Factor | Rationale |
|---|---|
| **Warmth complement** | Amber is the natural warm complement to teal on the color wheel |
| **Attention without alarm** | Signals "important" (bookmarks, streaks, highlights) without warning/danger |
| **Arabic aesthetic** | Gold/amber tones resonate with Middle Eastern and Arabic design traditions |
| **Legibility** | Dark amber on white passes WCAG AA; avoids the pure-yellow contrast trap |

### Why Warm Neutrals (Stone scale)

| Factor | Rationale |
|---|---|
| **Eye comfort** | `#FAFAF9` (warm white) reduces eye fatigue vs. pure `#FFFFFF` on OLED screens |
| **Coherence** | Stone-family grays have slight warmth that keeps the palette feeling unified |
| **Dark mode** | `#0C0A09` warm near-black is more comfortable for night studying than pure black |

---

## Component Pattern Decisions

### Cards Over Lists for Subjects
- **Decision:** Subject library displayed as cards, not a list with rows
- **Reason:** Cards are more scannable on mobile; support richer visual differentiation (color accent, progress, lecture count); encourage exploration over linear scrolling
- **Reference:** Coursera, edX, and Moodle mobile all moved from lists to cards in recent redesigns

### Tab Navigation for Theory / Practical Split
- **Decision:** Segmented tab control within a subject to switch Theory ↔ Practical content
- **Reason:** Medical education at KFU has a clear Theory/Practical structure; this mirrors the academic reality; students know which mode they're in; avoids back-navigation
- **Implementation:** shadcn/ui Tabs component with Motion `layoutId` indicator animation

### Bottom Nav on Mobile for Primary Navigation
- **Decision:** Persistent bottom tab bar with 4–5 primary destinations
- **Reason:** Thumb reachability on modern large phones; faster switching between Home, Subjects, Progress, Settings; industry standard (Instagram, YouTube, Spotify all use this)
- **Destinations:** Home | Subjects | Bookmarks | Progress | Settings

### Floating Action Button for Quiz Start
- **Decision:** FAB within subject/lecture views to start a quiz
- **Reason:** Quiz-taking is a frequent secondary action — not primary (not in bottom nav) but needs to be instantly reachable. FAB placement (bottom-right, above nav bar) is the mobile-native pattern for context-specific primary actions.

### No Infinite Scroll — Paginated / Categorized Loading
- **Decision:** Lectures grouped by week/unit with expandable sections, not infinite scroll
- **Reason:** Medical students need to track position in a curriculum; infinite scroll destroys spatial memory; grouped content matches how KFU organizes lectures by unit

### Offline-First Architecture (Design Implication)
- **Decision:** Design assumes offline access is a core feature, not an edge case
- **Implication:** Every view has an offline state design; downloaded indicator on lecture cards; no features that break silently offline
- **Reason:** Medical students study in libraries, hospitals, and locations without reliable Wi-Fi

---

*References compiled by Design System Architect — November 2026*
