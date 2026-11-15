# Changelog — Reme's KFU Fifth Semester

All notable changes to this medical educational platform are documented in this file.

## [1.0.0] — 2026-11-15 (Initial Production Release)

### Added
- **Full 16 Agent Skills Architecture:**
  - Implemented and verified all 16 skills under `.agents/skills/`.
  - Authored `.agents/skills/README.md`, `AGENTS.md`, and `SKILL_VERIFICATION.md`.
- **Authoritative KFU Fifth Semester Course Catalog:**
  - Registered exactly 12 official subjects according to university LMS curriculum.
  - Formatted `COURSE_CATALOG.md` and `fifth-semester.json`.
- **PDF Ingestion & Source Mapping:**
  - Audited all 14 files in `source-books/` (~56.4 MB total).
  - Detected and noted duplicate Public Health textbook.
  - Created `PDF_AUDIT.md`, `SOURCE_MAPPING.md`, and `content-inventory.json`.
- **Design Intelligence & System Specification:**
  - Researched 21 Design Sites reference guide.
  - Implemented `DESIGN.md`, `DESIGN_REFERENCES.md`, and `COMPONENT_INVENTORY.md`.
  - Warm academic medical aesthetic: deep teal primary (#0F766E), amber accent, off-white background.
  - Bilingual typography: Inter (English) + IBM Plex Sans Arabic.
- **Frontend Web Application (Vite + React 18 + TypeScript + Tailwind):**
  - Page 1: Home Dashboard with personalized welcome for Riham, stats, and course navigation.
  - Page 2: Subject Library with search and availability filtering.
  - Page 3: Subject Dashboard with 6 interactive tabs (Overview, Theory, Practical, Books, Quiz, Progress).
  - Page 4: Lecture Viewer featuring Egyptian Arabic explanations, intact English medical terms, clinical pearls, and glossaries.
  - Page 5: PDF Viewer with security warnings, zoom controls, and page jumping.
  - Page 6: Interactive Quiz Engine supporting Practice mode (instant feedback) and Exam mode (timer, scoring, answer review).
  - Page 7: Study Progress tracking via local IndexedDB without external tracking.
  - Page 8: Global Search indexing subjects, lectures, and medical terms.
- **Production Build & QA:**
  - Zero TypeScript compiler errors (`tsc --noEmit`).
  - Clean production build via Vite in `dist/`.
  - 100% Vitest unit test pass rate for catalog and quiz schemas.
  - Playwright E2E browser test suite configured for Desktop Chrome and Android Pixel 7 viewports.
- **Cloudflare Pages Production Readiness:**
  - Configured `public/_redirects` for SPA routing fallback.
  - Configured `public/_headers` with strict security headers.
  - Protected copyrighted textbooks from public web exposure.
