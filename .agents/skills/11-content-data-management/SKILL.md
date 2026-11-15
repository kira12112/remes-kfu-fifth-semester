---
name: content-data-management
description: JSON schemas, course metadata, lecture metadata, versioning, source mapping, and Coming Soon management for Reme's KFU Fifth Semester.
version: 1.0.0
---

# 11. Content Data Management Skill

## Activation Criteria
Activate this skill when creating or modifying JSON schemas, adding new lecture content, updating subject catalog entries, maintaining metadata, or managing source mappings and "Coming Soon" subjects.

## Description
This skill provides the data governance framework for all educational data in Reme's KFU Fifth Semester platform. It separates raw content from presentation logic, maintains JSON schema contracts, validates data integrity, and manages content states across the entire 12-subject spectrum.

## Operational Instructions

### 1. Schema Enforcement
- All content files must strictly adhere to schemas stored in `content/schemas/`:
  - `subject.schema.json`
  - `lecture.schema.json`
  - `quiz.schema.json`
- Ensure every entity possesses an immutable, URL-friendly unique identifier (kebab-case).

### 2. Subject State Lifecycle
Manage the four official availability states:
1. `available`: Content has been extracted, validated against original PDFs, and rendered with Egyptian Arabic explanations and quizzes.
2. `coming-soon`: Subject is part of the official curriculum, but source material is either not yet provided or pending extraction.
3. `in-progress`: Content is currently being structured and reviewed.
4. `completed`: Full course curriculum, practical sessions, and question banks are fully ingested and verified.

### 3. Source Mapping Management
- Maintain `content-inventory.json` as the definitive single source of truth for PDF metadata.
- When new PDFs are placed in `source-books/`, calculate file size, SHA hash, determine page count, and map to the corresponding course code.
- If mapping cannot be verified with certainty, flag as `requires-human-verification`.

### 4. Bilingual Content Structuring
- English content serves as the foundational academic standard.
- Arabic explanations (`textAr`, `explanationAr`) provide conversational Egyptian phrasing to break down complex concepts while leaving English medical terms un-translated.

## Quality Checklist
- [ ] Content validates against JSON schema.
- [ ] No hardcoded content within React UI components.
- [ ] Source references link back to verified PDF page ranges.
- [ ] Availability states strictly reflect current verified materials.
- [ ] Data files are formatted cleanly with 2-space indentation.
