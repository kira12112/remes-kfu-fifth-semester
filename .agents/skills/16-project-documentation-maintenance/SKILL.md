---
name: project-documentation-maintenance
description: Technical documentation, installation, project status, changelog, maintenance, and future content updates for Reme's KFU Fifth Semester.
version: 1.0.0
---

# 16. Project Documentation & Maintenance Skill

## Activation Criteria
Activate this skill when writing, updating, or auditing system documentation, README files, changelogs, operational guides, course addition manuals, or status trackers.

## Description
This skill governs the complete documentation lifecycle for Reme's KFU Fifth Semester. It guarantees that the codebase is completely documented, easily maintainable, and structured so that new semesters, subjects, or study materials can be added seamlessly without altering application logic.

## Operational Instructions

### 1. Master Documentation Index
Maintain the following authoritative project files at workspace root:
- `README.md`: Product vision, architecture overview, quick start, tech stack.
- `PROJECT_STATUS.md`: Real-time milestone tracker updated after major phases.
- `IMPLEMENTATION_PLAN.md`: Strategic roadmap and task execution order.
- `ENVIRONMENT_AUDIT.md`: Host environment, tools, and versions.
- `COURSE_CATALOG.md`: Official 12 subjects list and current status.
- `PDF_AUDIT.md`: Ingestion details of all source files.
- `SOURCE_MAPPING.md`: PDF-to-subject assignments and verification confidence.
- `DESIGN.md`: Visual tokens, color palette, typography, component rules.
- `DESIGN_REFERENCES.md`: Design research findings and library evaluations.
- `COMPONENT_INVENTORY.md`: Catalog of all reusable UI and layout components.
- `CONTENT_REVIEW.md`: Review of educational explanations and source grounding.
- `CONTENT_VALIDATION_REPORT.md`: Scientific accuracy and medical terminology checks.
- `QA_REPORT.md`: Automated test execution log and coverage summary.
- `DEPLOYMENT_GUIDE.md`: Step-by-step GitHub and Cloudflare Pages instructions.
- `ADDING_NEW_COURSES.md`: Step-by-step protocol for adding newly received books.
- `CHANGELOG.md`: Chronological log of versions and modifications.

### 2. Maintenance & Course Expansion Protocol
- When a new course material arrives:
  1. Inspect PDF metadata, calculate hash, and verify completeness.
  2. Map to existing subject ID or register new subject in `fifth-semester.json`.
  3. Extract core concepts, clinical pearls, and terminology.
  4. Author Egyptian Arabic explanations preserving English medical terms.
  5. Formulate verified MCQs and update question bank.
  6. Transition subject status from `coming-soon` to `available`.
  7. Run test suite, build bundle, and deploy update.

## Quality Checklist
- [ ] All 18 documentation files exist and are kept synchronized.
- [ ] Documentation links use relative file paths or clickable file links.
- [ ] Code examples and CLI commands are tested and verified.
- [ ] Project status reflects real implementation state.
