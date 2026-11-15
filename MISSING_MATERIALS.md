# Missing Materials & Catalog Discrepancies Report
**Project:** Reme's KFU Fifth Semester  
**Target Student:** Riham (Dentistry, Kazan Federal University — 3rd Year / Semester 5)  
**Date:** November 15, 2026  

---

## 1. Overview

The official Kazan Federal University (KFU) 5th Semester Dental Medicine curriculum comprises **12 accredited subjects** as established by the university LMS. However, the repository `source-books/` contains textbooks for **8 subjects** across **14 PDF files** (including 1 duplicate).

This report outlines the **4 missing subjects**, the exact status of their educational materials, and the strict engineering protocol governing their presentation on Reme's platform.

---

## 2. Inventory of Missing Course Materials

| # | Subject ID | Official Course Code | Full Course Title (English) | Course Title (Arabic) | Category | Expected Materials | Current Status |
|---|---|---|---|---|---|---|---|
| 1 | `dm5-epes` | `DM.5 EPES` | Elective Courses in Physical Education and Sports | مقررات اختيارية في التربية البدنية والرياضة | University General Elective | Practical athletic curriculum guidelines, physical assessment standards | **Coming Soon** (No files uploaded) |
| 2 | `dm5-fund-terr-ext` | `DM.5 FUND TERR EXT` | Fundamentals of Prevention and Counteraction to Terrorism and Extremism | أسس الوقاية ومكافحة الإرهاب والتطرف | University Mandatory Non-Medical | Russian federal regulatory frameworks, civic safety guidelines | **Coming Soon** (No files uploaded) |
| 3 | `dm5-rad-diag` | `DM.5 RAD DIAG` | Radiation Diagnostics | التشخيص الإشعاعي | Dental Clinical Sciences | Dental radiography, panoramic imaging, CBCT protocols | **Coming Soon** (No files uploaded) |
| 4 | `dm5-topogr-anat` | `DM.5 TOPOGR ANAT` | Topographic Anatomy and Operative Surgery | التشريح الطبوغرافي والجراحة العملياتية | Head & Neck Anatomy / Surgery | Head and neck fascial spaces, nerve blocks, surgical approaches | **Coming Soon** (No files uploaded) |

---

## 3. Strict Operating Protocol: No Hallucinated Content

In accordance with the **Antigravity Medical Education Operating Protocol (`AGENTS.md`)**:

1. **Zero Fabrication Policy:**
   - Under no circumstances will artificial, generic, or AI-generated syllabi be synthesized for the 4 missing subjects.
   - Medical knowledge (especially in high-stakes fields like *Radiation Diagnostics* and *Head & Neck Topographic Anatomy*) must be grounded in verified, faculty-approved Russian dental curricula. Fabricating lectures or answers poses a direct hazard to Riham's clinical education.

2. **UI & State Handling:**
   - On the `SubjectLibraryPage`, all 4 missing subjects are rendered with a distinct **"Coming Soon" (قريباً)** badge.
   - When Riham clicks on any of these cards, the platform presents an elegant `ComingSoon` component featuring:
     - Clear status message stating that university course materials have not yet been distributed for the current semester.
     - A notification subscription indicator.
     - Zero broken links, zero empty 404 errors, and zero dummy lectures.

3. **Upload Pathway for Future Materials:**
   - As soon as KFU faculty distribute the official textbooks, lecture slides, or syllabi for these 4 subjects:
     1. Place the PDF in `source-books/`.
     2. Update `content/courses/fifth-semester.json` changing `status` from `"coming-soon"` to `"available"`.
     3. Extract chapters using the `pdf-ingestion-ocr` pipeline.
     4. Author bilingual lectures with Egyptian Arabic clinical explanations and MCQ sets.
     5. Register the lectures in `src/pages/SubjectDashboardPage.tsx` and related routing components.
