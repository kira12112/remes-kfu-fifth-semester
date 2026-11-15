---
name: software-architecture
description: Application architecture, data modeling, component architecture, scalability decisions for the medical education platform.
version: 1.0.0
---

# Software Architecture Skill

## Activation Criteria
Activate this skill when:
- Designing the overall application structure
- Making technology stack decisions
- Defining data models and JSON schemas
- Designing component hierarchies and module boundaries
- Addressing scalability, performance, or maintainability concerns
- Integrating new libraries or services into the platform
- Resolving architectural conflicts between modules

## Description
This skill governs the technical architecture of Reme's KFU Fifth Semester medical education platform. The platform is a client-side React + TypeScript + Vite single-page application (SPA) deployed on Cloudflare Pages. There is no backend server — all data is bundled as JSON files or loaded lazily. This skill ensures every architectural decision is deliberate, documented, and consistent with the project's constraints (static hosting, no server, offline-capable).

## Operational Instructions

### 1. Technology Stack
**Core:**
- React 18 (concurrent features, Suspense)
- TypeScript 5.x (strict mode enabled)
- Vite 5.x (build tool, dev server, code splitting)
- React Router v6 (client-side routing, nested routes)

**Styling & UI:**
- Tailwind CSS v3 (utility-first, design tokens via CSS variables)
- shadcn/ui (accessible component primitives)
- Lucide React (icon system)

**Motion:**
- Framer Motion or Motion One (page transitions, micro-interactions)

**Data:**
- JSON files in `src/data/` (course catalog, lecture metadata, quiz banks)
- IndexedDB (via idb library) for progress tracking and offline caching
- PDF.js for in-browser PDF rendering

**Testing:**
- Vitest (unit and integration)
- Playwright (e2e, cross-browser)
- Testing Library (component tests)

**Tooling:**
- ESLint + Prettier (code quality)
- Husky + lint-staged (pre-commit hooks)
- TypeScript strict (type safety)

### 2. Project Directory Structure
```
d:\remes-KFU-fifth_semester\
├── .agents\                  # Agent skills and config
├── source-books\             # Raw PDF source files
├── public\                   # Static assets
├── src\
│   ├── components\           # Reusable UI components
│   │   ├── ui\               # shadcn/ui primitives
│   │   ├── layout\           # Layout components (Header, Sidebar, Footer)
│   │   ├── subject\          # Subject-specific components
│   │   ├── quiz\             # Quiz system components
│   │   └── pdf\              # PDF viewer components
│   ├── pages\                # Route-level page components
│   ├── hooks\                # Custom React hooks
│   ├── data\                 # JSON data files
│   │   ├── courses\          # Per-subject course data
│   │   └── quizzes\          # Per-subject quiz banks
│   ├── lib\                  # Utility functions and helpers
│   ├── types\                # TypeScript type definitions
│   ├── styles\               # Global CSS, design tokens
│   └── store\                # State management (Zustand or React Context)
├── tests\
│   ├── unit\
│   ├── integration\
│   └── e2e\
├── AGENTS.md
├── PROJECT_STATUS.md
└── ENVIRONMENT_AUDIT.md
```

### 3. Data Architecture
All content is static JSON. No API calls to external servers at runtime.

**Course Catalog Schema:**
```typescript
interface CourseCatalog {
  semester: number;
  university: string;
  subjects: Subject[];
}

interface Subject {
  id: string;
  name: string;
  nameAr: string;
  code: string;
  type: 'theory' | 'practical' | 'both';
  status: 'available' | 'coming-soon';
  icon: string;
  color: string;
  lectures: Lecture[];
}

interface Lecture {
  id: string;
  title: string;
  titleAr?: string;
  week: number;
  type: 'theory' | 'practical';
  pdfPath?: string;
  status: 'available' | 'coming-soon';
  pageCount?: number;
  tags: string[];
}
```

### 4. Routing Architecture
```
/                          → Home (subject grid)
/subject/:subjectId        → Subject overview
/subject/:subjectId/theory → Theory lecture list
/subject/:subjectId/practical → Practical lecture list
/lecture/:lectureId        → PDF viewer + notes
/quiz/:subjectId           → Quiz session
/quiz/:subjectId/results   → Quiz results
/search                    → Global search
/progress                  → Student progress dashboard
```

### 5. State Management Strategy
- **Global state**: React Context + useReducer for user progress, theme, settings
- **Server state**: N/A (static data, no server)
- **Local state**: useState for UI-only state (modals, dropdowns, form inputs)
- **Persistent state**: IndexedDB for quiz scores, bookmarks, reading progress
- **URL state**: React Router search params for filters and pagination

### 6. Performance Architecture
- Route-based code splitting via React.lazy() + Suspense
- PDF lazy loading (load on demand, not at startup)
- JSON data lazy imports (import() for large quiz banks)
- Image optimization via Vite's asset pipeline
- Service Worker for offline caching (Workbox)
- React.memo and useMemo for expensive renders

## Workflows

### New Component Design
1. Identify if component is atomic (ui/), compound (feature/), or page-level
2. Define TypeScript props interface
3. Identify state requirements (local vs. global)
4. Consider accessibility (ARIA roles, keyboard navigation)
5. Plan responsive breakpoints
6. Write component with Storybook story (if applicable)
7. Add to component index exports

### Data Model Change
1. Update TypeScript interface in `src/types/`
2. Update JSON schema documentation
3. Migrate existing JSON data files
4. Update all components consuming the changed type
5. Run TypeScript compiler (tsc --noEmit) to catch errors
6. Update relevant tests

### Dependency Addition
1. Evaluate: bundle size impact (use bundlephobia.com)
2. Evaluate: maintenance status and license
3. Evaluate: TypeScript support
4. Add to package.json with exact version pinned
5. Document reason in ENVIRONMENT_AUDIT.md

## Quality Checklist
- [ ] TypeScript strict mode — zero `any` types
- [ ] All data models have TypeScript interfaces
- [ ] Route structure matches planned navigation
- [ ] No circular dependencies between modules
- [ ] Code splitting implemented for all routes
- [ ] No secrets or API keys in source code
- [ ] Bundle size monitored (target < 500KB initial)
- [ ] All third-party libraries evaluated for size and security
- [ ] Directory structure matches defined layout
- [ ] State management strategy applied consistently
- [ ] PDF loading is lazy, not blocking initial render
- [ ] Offline capability considered for core navigation
