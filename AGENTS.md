# AGENTS.md — Agent System & Operating Protocol

**Project:** Reme's KFU Fifth Semester  
**Target User:** Riham (Doctor of Medicine / Dentistry, Kazan Federal University)  
**System:** Antigravity Autonomous Agent Fleet  

---

## 1. Overview

The development, maintenance, and educational authoring of **Reme's KFU Fifth Semester** platform is governed by 16 specialized Agent Skills located in `.agents/skills/`. Each skill provides domain-specific instructions, activation criteria, quality checklists, and workflows.

## 2. Agent Skill Roster

### Product & System Architecture
- **`01-product-management`**: Champions Riham's user experience, prioritizes features, establishes acceptance criteria, and manages change requests.
- **`02-software-architecture`**: Dictates component architecture, data modeling, IndexedDB state management, and scalability patterns.
- **`03-educational-platform-design`**: Formulates the LMS structure, separating theoretical lectures and practical laboratory sessions while preserving university course codes.

### Frontend & Visual Engineering
- **`04-frontend-design`**: Establishes visual hierarchy, mobile-first layouts tailored for Android screens, and warm medical aesthetics.
- **`05-react-typescript-engineering`**: Enforces strict TypeScript typing, reusable React functional components, custom hooks, and route definitions.
- **`06-tailwind-shadcn-ui`**: Provides design token mapping, accessible component foundations, and atomic CSS consistency.
- **`07-motion-interaction-design`**: Implements subtle, non-intrusive micro-interactions and transitions using Motion (`motion.dev`).

### Educational Content Engineering
- **`08-pdf-ingestion-ocr`**: Governs PDF inspection, text extraction, table preservation, and source mapping without modifying raw textbooks.
- **`09-medical-educational-content`**: Directs the authoring of natural, engaging Egyptian Arabic explanations while keeping English medical terms precise.
- **`10-quiz-engineering`**: Designs interactive MCQs with difficulty tiers (Easy, Medium, Hard), instant practice feedback, and exam mode scoring.
- **`11-content-data-management`**: Enforces JSON schemas (`subject.schema.json`, `lecture.schema.json`, `quiz.schema.json`) and manages the 4 subject availability states.

### Quality Assurance & Infrastructure
- **`12-accessibility-responsive-design`**: Enforces WCAG 2.1 AA standards, 44x44px touch targets, zero horizontal overflow, and high-contrast typography.
- **`13-testing-quality-assurance`**: Directs automated testing through Vitest and Playwright end-to-end browser automation.
- **`14-security-performance`**: Audits dependencies, prevents XSS, excludes private source PDFs from public static distribution, and optimizes bundle size.
- **`15-cloudflare-deployment`**: Automates production builds and releases to Cloudflare Pages with single-page application routing rules.
- **`16-project-documentation-maintenance`**: Maintains authoritative documentation and step-by-step guides for adding new courses.

---

## 3. Autonomous Execution Rules
1. **Never Stop at Mockups**: Agents deliver fully implemented, functional code and real educational content.
2. **Never Fabricate Data**: Medical explanations and quiz answer keys must match verified source books.
3. **Egyptian Arabic for Explanations**: Explanations speak to Riham in warm, natural Egyptian Arabic ("بصي يا ريهام...") while English technical terms remain untranslated.
4. **Autonomous Decisions**: Proceed confidently without repeated confirmation for routine engineering choices.
