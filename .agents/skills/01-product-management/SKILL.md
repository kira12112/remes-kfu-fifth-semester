---
name: product-management
description: Product requirements, roadmaps, acceptance criteria, feature prioritization, change management for Reme's KFU Fifth Semester platform.
version: 1.0.0
---

# Product Management Skill

## Activation Criteria
Activate this skill when:
- Defining or refining product requirements for the KFU Fifth Semester platform
- Creating or updating feature roadmaps and release plans
- Writing acceptance criteria for user stories
- Prioritizing features based on student needs and academic timelines
- Managing scope changes or feature requests
- Aligning development work with semester academic calendar

## Description
This skill governs all product decision-making for Reme's KFU Fifth Semester medical education platform. It ensures that every feature built serves real student needs: navigating course theory, accessing practical lab content, practicing with MCQs, and preparing for exams. Product decisions must balance educational value, technical feasibility, and the academic schedule of King Faisal University's fifth-semester medical program.

## Operational Instructions

### 1. Requirement Gathering
- Always start by understanding the student's academic context: 5th-semester KFU medical student, subjects include Pharmacology, Pathology, Microbiology, etc.
- Identify whether the need is for theory content, practical/lab content, quizzes, or exam preparation
- Map requirements to academic calendar milestones (midterms, finals, lab exams)
- Distinguish between must-have (MVP) and nice-to-have features
- Document requirements in structured user stories: "As a [student], I want [feature] so that [outcome]"

### 2. Feature Prioritization Framework
Use the RICE scoring model:
- **Reach**: How many students benefit? (whole class vs. individual)
- **Impact**: Does it directly improve exam scores or understanding?
- **Confidence**: How certain are we this solves the problem?
- **Effort**: Dev weeks required

Priority tiers:
- P0: Core navigation, subject listing, lecture access — blocking without these
- P1: Quiz system, progress tracking — high educational value
- P2: Search, bookmarking, offline support — quality-of-life
- P3: Social features, gamification — future consideration

### 3. Acceptance Criteria Writing
Every feature must have:
- Given/When/Then format for testable criteria
- Performance thresholds (page load < 2s, PDF render < 3s)
- Accessibility requirements (WCAG 2.1 AA)
- Mobile responsiveness criteria (iOS Safari, Android Chrome)
- Content accuracy requirements for medical terminology

### 4. Change Management
- Log all scope changes in CHANGELOG.md with date, reason, and impact assessment
- Assess downstream effects on architecture, content data, and testing
- Communicate breaking changes to all dependent skills (architecture, frontend, testing)
- Maintain a "parking lot" of deferred features in PROJECT_STATUS.md

### 5. Roadmap Maintenance
- Phase 1: Environment Audit & Setup
- Phase 2: Agent Skills & Tooling
- Phase 3: Design System (tokens, components, motion)
- Phase 4: Core Platform (navigation, subjects, lectures)
- Phase 5: Content Integration (PDF ingestion, quizzes)
- Phase 6: Testing & QA
- Phase 7: Deployment (Cloudflare Pages)
- Phase 8: Future content updates (new PDFs, additional subjects)

## Workflows

### New Feature Workflow
1. Receive feature request (from student feedback, Reme's notes, or academic need)
2. Write user story with acceptance criteria
3. Score with RICE framework
4. Place in appropriate priority tier
5. Update roadmap and PROJECT_STATUS.md
6. Brief relevant skill agents (architecture, frontend, etc.)
7. Track implementation progress
8. Validate against acceptance criteria before marking done

### Scope Change Workflow
1. Document the change request with rationale
2. Assess impact on timeline, effort, and dependencies
3. Update PROJECT_STATUS.md and CHANGELOG.md
4. Re-prioritize affected backlog items
5. Notify downstream agents of changes

### Release Planning Workflow
1. Define release scope (features included)
2. Confirm all P0 and P1 items are complete and tested
3. Verify content accuracy with medical-educational-content skill
4. Run accessibility and performance checks
5. Deploy to staging (Cloudflare preview), then production

## Quality Checklist
- [ ] Every feature has a clear user story with acceptance criteria
- [ ] All requirements are traceable to a student need or academic goal
- [ ] RICE scores documented for all backlog items
- [ ] Roadmap reflects current project phase accurately
- [ ] PROJECT_STATUS.md is up to date
- [ ] CHANGELOG.md documents all significant changes
- [ ] No feature shipped without passing acceptance criteria
- [ ] Mobile and accessibility criteria included in every story
- [ ] Medical content accuracy verified before content features ship
- [ ] Semester-specific content (5th year KFU) is scoped correctly
- [ ] Coming Soon placeholders planned for unfinished subjects
- [ ] Performance targets defined for all data-heavy features (PDF, quiz banks)
