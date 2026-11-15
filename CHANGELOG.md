# Changelog — Reme's KFU Fifth Semester

All notable changes to this medical educational platform are documented in this file.

## [1.2.0] — 2026-11-15 (Dedicated Per-Lesson Quiz Suite Deployment)

### Added & Enriched
- **100% Dedicated Per-Lesson Interactive Quizzes (62 Quizzes):**
  - Designed and authored custom, curriculum-grounded quizzes for **every single one of the 62 lessons** (53 theoretical lectures + 9 practical sessions) across all 8 supported university subjects.
  - Total active quiz inventory expanded from 9 sample assessments to 71 quizzes (62 lesson-specific quizzes + 9 comprehensive subject mocks).
  - Authored over 100 clinically rigorous MCQs categorized into Easy, Medium, and Hard difficulty tiers.
  - Every question features in-depth bilingual explanations addressing Riham in warm Egyptian Arabic ("بصي يا ريهام...") while preserving all English medical terminology.
- **Bi-Directional Lesson & Quiz Linking:**
  - Updated all 62 lecture JSON files in `content/lectures/*.json` with `relatedQuizId: "quiz-" + lecture.id`.
  - Wired direct "Start Quiz Now" action link in `LectureViewer` bottom CTA to immediately launch the dedicated assessment.
  - Synchronized `SubjectDashboardPage.tsx` with all 62 quizzes surfaced in the "Quizzes" tab for each respective subject.
- **Automated Verification & Mobile QA:**
  - 100% test pass rate: 9/9 Playwright E2E tests passing on Desktop Chromium and 9/9 on Mobile Android (Pixel 7).
  - 6/6 Vitest unit tests passing.
  - 0 TypeScript compilation errors (`tsc --noEmit`).
  - Production bundle generated cleanly with Vite.

## [1.1.0] — 2026-11-15 (Comprehensive Real Content Implementation)

### Added & Enriched
- **Comprehensive Content Extraction & Authoring (62 Lectures):**
  - Generated 62 full curriculum lectures across all 8 subjects with available textbooks.
  - Authored natural Egyptian Arabic clinical explanations specifically addressing Riham ("بصي يا ريهام...") while preserving 100% of English medical terminology.
  - Implemented 9 practical clinical laboratory units: Classes I-V cavity preparations with bur selections for Cariology, dosage calculations, prescription writing, local anesthesia math, and emergency management for Pharmacology.
- **Verified MCQ Question Banks (35 Questions):**
  - Expanded interactive quiz question banks to 35 high-yield clinical MCQs with difficulty tiers (Easy, Medium, Hard).
  - Every question includes comprehensive bilingual rationales and precise textbook page references.
- **Dynamic Content Architecture:**
  - Migrated `LectureViewerPage`, `QuizPage`, and `SearchPage` to Vite `import.meta.glob` dynamic loaders.
  - All 62 lectures, glossaries, and clinical pearls are now fully searchable and indexed in real-time.
- **Official Content Reports:**
  - `CONTENT_AUDIT.md`: Complete audit of the 14 source PDFs (1,148 pages) vs previous baseline.
  - `MISSING_MATERIALS.md`: Rigorous documentation of the 4 subjects without uploaded textbooks maintaining Zero-Fabrication policy.
  - `CONTENT_IMPLEMENTATION_REPORT.md`: Comprehensive breakdown of all authored units and automated test verifications.
- **Automated Testing & Mobile QA:**
  - 8/8 Playwright E2E tests passing on Desktop Chromium.
  - 8/8 Playwright E2E tests passing on Mobile Android (Pixel 7).

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
