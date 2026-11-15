---
name: educational-platform-design
description: LMS architecture, semester organization, course structure, theory/practical separation, learning workflows.
version: 1.0.0
---

# Educational Platform Design Skill

## Activation Criteria
Activate this skill when:
- Designing the information architecture of the learning platform
- Organizing academic content by semester, subject, week, or lecture
- Structuring theory vs. practical content separation
- Designing student learning workflows and study paths
- Planning quiz and assessment flows within the LMS context
- Organizing PDFs and lecture notes within the course hierarchy
- Designing progress tracking and completion indicators

## Description
This skill defines how the KFU Fifth Semester medical education platform is organized as a learning experience. It draws on principles from Learning Management System (LMS) design, medical education pedagogy, and the specific structure of KFU's fifth-year medical curriculum. The platform must reflect how Egyptian medical students actually study: subject-by-subject, lecture-by-lecture, often switching between theory (lectures) and practical (lab/clinical) content, with heavy reliance on PDF notes and MCQ practice.

## Operational Instructions

### 1. Semester Structure
KFU Fifth Semester subjects include (but are not limited to):
- **Pharmacology** (Pharm) — Theory heavy, drug classifications, mechanisms
- **Pathology** (Path) — Theory + Practical microscopy slides
- **Microbiology** (Micro) — Theory + Practical lab techniques
- **Parasitology** (Para) — Theory + Practical slide identification
- **Community Medicine** (CommMed) — Theory + Field work
- **Clinical skills** — Practical examinations
- Each subject may have both a theory component and a practical component

### 2. Content Hierarchy
```
Platform
└── Semester 5
    └── Subject (e.g., Pharmacology)
        ├── Theory
        │   ├── Week 1
        │   │   ├── Lecture 1: Introduction to Pharmacokinetics
        │   │   ├── Lecture 2: Drug Absorption
        │   │   └── Lecture 3: Drug Distribution
        │   └── Week 2
        │       └── ...
        └── Practical
            ├── Practical 1: Drug calculations
            └── Practical 2: ...
```

### 3. Subject Card Design
Each subject on the home page shows:
- Subject name (English + Arabic)
- Subject code
- Icon representing the field
- Color theme (consistent per subject)
- Theory lecture count / Practical session count
- Progress indicator (% completed)
- Status badge: Available | Coming Soon

### 4. Lecture Display Design
Each lecture entry shows:
- Lecture title (English)
- Optional Arabic subtitle/explanation
- Week number
- Theory or Practical badge
- Page count of PDF
- Tags (e.g., "pharmacokinetics", "antibiotics")
- Status: Available / Coming Soon
- Quick actions: Open PDF, Start Quiz, Bookmark

### 5. Theory vs. Practical Separation
- Theory tab: Lecture notes, diagrams, mechanism explanations
- Practical tab: Lab protocols, slide images, case studies, clinical skills
- Each type uses a different visual treatment (color accent, icon set)
- Quizzes can be scoped to theory, practical, or mixed

### 6. Learning Workflow Design
**Primary Study Flow:**
1. Student arrives at Home → sees subject grid
2. Selects a subject (e.g., Pharmacology)
3. Sees subject overview: description, lecture list, progress
4. Selects a lecture → PDF viewer opens
5. Reads PDF → can annotate, bookmark pages
6. Finishes lecture → quiz prompt appears ("Test your knowledge?")
7. Completes quiz → sees score + explanations
8. Progress updated on subject overview

**Exam Prep Flow:**
1. Student selects "Exam Mode" for a subject
2. Timed quiz with random selection from full bank
3. Results page with weak areas highlighted
4. Revision recommendations based on wrong answers

### 7. Progress Tracking Design
Track per student (stored in IndexedDB):
- Lectures viewed (and % of PDF read)
- Quizzes completed (score, date, duration)
- Bookmarked pages and lectures
- Weak topics (from quiz wrong answers)
- Overall subject completion percentage

Display:
- Progress bar on subject cards
- Completion checkmarks on lecture list items
- Dashboard view with all subjects' progress
- Streak indicator for consistent study

### 8. Coming Soon Management
For subjects or lectures not yet available:
- Show grayed-out card with "Coming Soon" badge
- Tooltip: "Content being prepared"
- Allow students to "Notify me" (stored locally)
- Never show empty states — always show placeholder structure

### 9. Search and Discovery
- Global search across all lecture titles, tags, and content
- Filter by: subject, type (theory/practical), week, status
- Recent lectures list
- Bookmarks collection
- Quick-access to unfinished lectures

## Workflows

### Adding a New Subject
1. Define subject metadata (name, code, type, color, icon)
2. Create subject entry in course catalog JSON
3. Add theory lecture list (even if Coming Soon)
4. Add practical session list (even if Coming Soon)
5. Verify subject card renders correctly on home grid
6. Set appropriate status flags

### Adding a New Lecture
1. Place PDF in `public/pdfs/[subject]/[lecture-name].pdf`
2. Add lecture entry to subject's JSON data
3. Set status to 'available'
4. Add tags for searchability
5. Verify PDF viewer loads correctly
6. Check that lecture appears in correct week grouping

### Retiring Coming Soon Status
1. Confirm PDF is added and accessible
2. Update status from 'coming-soon' to 'available' in JSON
3. Verify lecture list updates correctly
4. Run smoke test on the subject page

## Quality Checklist
- [ ] All subjects reflect actual KFU 5th-semester curriculum
- [ ] Theory and practical content is correctly separated
- [ ] Every subject card shows accurate lecture counts
- [ ] Coming Soon badges visible for unavailable content
- [ ] Progress tracking works without backend (IndexedDB)
- [ ] Learning workflow tested end-to-end (arrive → read → quiz → results)
- [ ] Arabic subject names are accurate
- [ ] Week organization matches actual academic schedule
- [ ] Search indexes all lecture titles and tags
- [ ] No dead-end navigation states (always a path back)
- [ ] PDF viewer handles large files gracefully
- [ ] Mobile workflow tested on 375px and 390px viewports
