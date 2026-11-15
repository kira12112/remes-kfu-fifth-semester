---
name: testing-quality-assurance
description: Unit testing, integration testing, Playwright E2E, regression testing, browser and mobile viewport testing for Reme's KFU Fifth Semester.
version: 1.0.0
---

# 13. Testing & Quality Assurance Skill

## Activation Criteria
Activate this skill when creating automated tests, executing unit/component test suites, running Playwright browser automation, verifying production builds, or generating QA reports.

## Description
This skill defines the multi-tiered quality assurance strategy for the platform. It guarantees that code changes, content updates, and layout refactors are verified through actual automated test runs rather than assumptions.

## Operational Instructions

### 1. Testing Pyramid Architecture
- **Unit & Utility Tests (Vitest)**: Fast execution testing pure logic, data transformations, schema validations, progress calculations, and IndexedDB wrappers.
- **Component Tests (React Testing Library / Vitest)**: Testing individual component rendering, props validation, button clicks, state transitions, and accessibility attributes.
- **End-to-End Tests (Playwright)**: Full browser automation executing real user flows on mobile (Pixel 7 / iPhone viewports) and desktop.

### 2. Core Playwright E2E Test Scenarios
1. **Homepage Journey**: Verifies welcome greeting, branding, stats counters, 12 subject cards, navigation links.
2. **Subject Navigation & Catalog**: Verifies filtering (All, Available, Coming Soon), search input, clicking into an available subject dashboard.
3. **Subject Dashboard Verification**: Checks tabs (Overview, Theory, Practical, Books, Quiz, Progress).
4. **Lecture Reading Flow**: Opens a verified lecture, checks Arabic explanations and English medical terms, marks lecture completed.
5. **Interactive Quiz Engine**: Practice mode selection, immediate feedback, correct/incorrect scoring, answers review.
6. **Progress Persistence (IndexedDB)**: Completing a lecture or quiz, refreshing page, and verifying progress survives.
7. **Coming Soon State**: Verifies graceful empty states for subjects with pending materials.
8. **Mobile Viewport Test**: Simulates 390x844 (mobile), tests bottom navigation, tap targets, drawer behavior.

### 3. Execution & Verification Rules
- NEVER claim that tests passed without executing them via CLI and inspecting stdout/stderr.
- Fix all TypeScript errors (`tsc --noEmit`) before executing build or test commands.
- Capture failures, console errors, or broken promises and resolve them iteratively.
- Document test results with execution timestamps in `QA_REPORT.md`.

## Quality Checklist
- [ ] TypeScript type checks pass with 0 errors.
- [ ] Vitest unit tests pass 100%.
- [ ] Playwright E2E tests pass across mobile and desktop viewports.
- [ ] Production build (`npm run build`) generates clean bundle in `dist/`.
- [ ] No unhandled console errors or runtime warnings during navigation.
