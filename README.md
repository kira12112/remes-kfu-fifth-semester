# Reme's KFU Fifth Semester

A premium, interactive, personalized medical education platform engineered specifically for **Riham** at **Kazan Federal University (KFU)** for the Fifth Semester (Doctor of Medicine / Dentistry).

---

## 🌟 Product Vision

- **Target Student:** Riham
- **University:** Kazan Federal University (KFU), Faculty of Dentistry
- **Semester:** 5th Semester (3rd Year, 1st Semester)
- **Primary Viewport:** Android mobile phone (optimized for touch ergonomics and reading comfort)
- **Secondary Viewports:** Desktop and Tablet
- **Language Synergy:** Modern English user interface paired with conversational Egyptian Arabic educational explanations that preserve exact English medical terminology.
- **Authentication:** Zero login or registration required; complete privacy with local device persistence via IndexedDB.

---

## 🏛️ Official 12 KFU Course Catalog

The platform strictly organizes the official 12 subjects:

1. `DM.5 CAR HARD DENT` — Caries and diseases of hard dental tissues (Available · 3 Books)
2. `DM.5 EPES` — Elective courses in physical education and sports (Coming Soon)
3. `DM.5 FUND TERR EXT` — Fundamentals of prevention & counteraction to terrorism & extremism (Coming Soon)
4. `DM.5 MICROMVIRO` — Microbiology, virology (Available · 2 Books)
5. `DM.5 PATHOL ANAT` — Pathological anatomy (Available · 1 Book)
6. `DM.5 PATHOL PHYS` — Pathological physiology (Available · 1 Book)
7. `DM.5 PHARM` — Pharmacology (Available · 2 Books)
8. `DM.5 PROPAED INT MED` — Propaedeutics of internal diseases (Available · 1 Book)
9. `DM.5 PUB HEALTH` — Public Health and Healthcare (Available · 1 Book)
10. `DM.5 RAD DIAG` — Radiation diagnostics (Coming Soon)
11. `DM.5 RES METH BIO MED` — Research methods in biology and medicine (Available · 2 Books)
12. `DM.5 TOPOGR ANAT` — Topographic anatomy and operative surgery (Coming Soon)

---

## 🚀 Key Features

- **Personalized Home Dashboard:** Welcome greeting for Riham, course metrics, quick navigation, and continue-learning links.
- **Subject Library:** Instant filtering by availability (All, Available, Coming Soon) and live search.
- **Subject Dashboard:** 6 interactive tabs (Overview, Theory Lectures, Practical Labs, Original Books, Quizzes, Progress).
- **In-Depth Lecture Viewer:** Comprehensive Egyptian Arabic clinical breakdowns, learning objectives, clinical pearls, tables, terminology glossaries, and bookmarking.
- **Interactive Quiz Engine:** MCQ assessments supporting Practice Mode (immediate feedback with clinical rationale) and Exam Mode (timer, scoring, retry incorrect answers).
- **Source Reader (PDF Viewer):** View and navigate original textbooks with page references and zoom controls.
- **Local Progress Persistence:** Powered by IndexedDB; tracks completed lectures, quiz scores, and bookmarks locally without tracking.
- **Global Medical Search:** Real-time search across courses, lectures, and medical terms.

---

## 🛠️ Technology Stack

- **Framework:** React 18 + TypeScript + Vite
- **Styling & Tokens:** Tailwind CSS with warm medical palette (Teal #0F766E, Amber #D97706, Off-white #FAFAF9)
- **Typography:** Inter (English) + IBM Plex Sans Arabic (Arabic explanations)
- **Icons:** Lucide React
- **Routing:** React Router v6
- **Storage:** IndexedDB (`idb`) with local fallback
- **Testing:** Vitest (unit & schema integrity) + Playwright (mobile and desktop E2E)
- **Deployment:** GitHub + Cloudflare Pages (SPA routing configured)

---

## 💻 Quick Start & Development

```powershell
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Run unit tests
npm test

# 4. Compile TypeScript & Build production bundle
npm run build
```

---

## 📂 Project Structure

```
remes-kfu-fifth-semester/
├── .agents/skills/          # All 16 Agent Skills specifications
├── content/                 # Data-driven JSON content & schemas
│   ├── courses/             # fifth-semester.json (Master catalog)
│   ├── lectures/            # Verified lecture modules with Arabic explanations
│   ├── quizzes/             # Question banks with rationale
│   └── schemas/             # JSON schemas for validation
├── docs/                    # Design and architectural documentation
├── public/                  # Static assets, _redirects, _headers
├── source-books/            # Original KFU textbooks (kept private)
├── src/
│   ├── components/          # Reusable UI, Layout, Subject, Lecture, Quiz components
│   ├── lib/                 # IndexedDB storage and utility functions
│   ├── pages/               # 8 Core application pages
│   └── types/               # TypeScript type definitions
└── e2e/                     # Playwright end-to-end browser tests
```

---

## 📄 Authoritative Documentation Index

- [`ENVIRONMENT_AUDIT.md`](file:///d:/remes-KFU-fifth_semester/ENVIRONMENT_AUDIT.md) — Environment inspection report
- [`IMPLEMENTATION_PLAN.md`](file:///d:/remes-KFU-fifth_semester/IMPLEMENTATION_PLAN.md) — Strategic execution milestones
- [`PROJECT_STATUS.md`](file:///d:/remes-KFU-fifth_semester/PROJECT_STATUS.md) — Current build status
- [`SKILL_VERIFICATION.md`](file:///d:/remes-KFU-fifth_semester/SKILL_VERIFICATION.md) — 16 Agent skills verification
- [`COURSE_CATALOG.md`](file:///d:/remes-KFU-fifth_semester/COURSE_CATALOG.md) — Official 12 subjects catalog
- [`PDF_AUDIT.md`](file:///d:/remes-KFU-fifth_semester/PDF_AUDIT.md) — Source book audit & hashes
- [`SOURCE_MAPPING.md`](file:///d:/remes-KFU-fifth_semester/SOURCE_MAPPING.md) — PDF to subject mapping
- [`DESIGN.md`](file:///d:/remes-KFU-fifth_semester/DESIGN.md) — Visual design system specification
- [`DESIGN_REFERENCES.md`](file:///d:/remes-KFU-fifth_semester/DESIGN_REFERENCES.md) — Design research analysis
- [`COMPONENT_INVENTORY.md`](file:///d:/remes-KFU-fifth_semester/COMPONENT_INVENTORY.md) — Catalog of UI components
- [`CONTENT_REVIEW.md`](file:///d:/remes-KFU-fifth_semester/CONTENT_REVIEW.md) — Educational content review
- [`CONTENT_VALIDATION_REPORT.md`](file:///d:/remes-KFU-fifth_semester/CONTENT_VALIDATION_REPORT.md) — Scientific accuracy verification
- [`QA_REPORT.md`](file:///d:/remes-KFU-fifth_semester/QA_REPORT.md) — Automated testing results
- [`DEPLOYMENT_GUIDE.md`](file:///d:/remes-KFU-fifth_semester/DEPLOYMENT_GUIDE.md) — GitHub & Cloudflare deployment manual
- [`ADDING_NEW_COURSES.md`](file:///d:/remes-KFU-fifth_semester/ADDING_NEW_COURSES.md) — Step-by-step course addition protocol
- [`CHANGELOG.md`](file:///d:/remes-KFU-fifth_semester/CHANGELOG.md) — Version history
