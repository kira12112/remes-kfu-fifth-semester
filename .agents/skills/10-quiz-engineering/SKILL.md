---
name: quiz-engineering
description: MCQs, question banks, difficulty classification, answer validation, explanations, scoring, exam modes for Reme's KFU Fifth Semester.
version: 1.0.0
---

# 10. Quiz Engineering Skill

## Activation Criteria
Activate this skill when generating, reviewing, updating, or formatting quizzes, MCQs, answer keys, explanations, or question banks for any of the 12 KFU Fifth Semester subjects.

## Description
This skill governs the systematic creation, structuring, and pedagogical validation of interactive medical quizzes. It ensures that all questions are strictly grounded in verified source literature (such as KFU cariology, pharmacology, pathological anatomy, etc.), provide unambiguous single-choice answers, include natural Egyptian Arabic explanations paired with exact English medical terminology, and offer distinct Practice and Examination modes.

## Operational Instructions

### 1. Source Grounding & Medical Accuracy
- Every question must directly correlate with an identified concept in the source PDF.
- Record the exact source file name and page number in the question metadata.
- Never invent hypothetical or scientifically debated answer keys.
- Distractors (incorrect options) must be clinically plausible yet strictly incorrect according to the source material.

### 2. Question Classification & Metadata
Every question object must adhere to the following schema:
- `id`: Unique stable identifier (e.g., `q-pharm-beta-blockers-01`).
- `subjectId`: Matching the official subject ID (`dm5-pharm`, `dm5-car-hard-dent`, etc.).
- `lectureId`: Optional reference to a specific lecture.
- `textEn`: The question prompt in clear English.
- `textAr`: Optional Arabic prompt translation.
- `options`: 4 multiple-choice options (`id`, `textEn`, `textAr`).
- `correctOptionId`: Exact matching option ID.
- `difficulty`: `'easy' | 'medium' | 'hard'`.
- `explanationEn`: Detailed pedagogical rationale in English.
- `explanationAr`: Conversational Egyptian Arabic explanation highlighting clinical reasoning and why distractors are wrong.
- `sourceReference`: PDF filename and page number.

### 3. Practice vs. Exam Mode Workflows
- **Practice Mode**: Immediate feedback upon selection, visual indication of right/wrong, collapsible explanation revealed immediately.
- **Examination Mode**: Selection marked without immediate answer disclosure, timer active, comprehensive score summary and detailed review revealed only after submission.

### 4. Difficulty Calibration
- **Easy**: Direct recall of definitions, classifications, or prominent clinical signs.
- **Medium**: Conceptual application, understanding of mechanism of action or pathogenesis.
- **Hard**: Complex clinical vignette, differential diagnosis, multi-step pharmacological interaction or contraindication.

## Quality Checklist
- [ ] Question prompt is unambiguous and grammatically sound.
- [ ] Exactly one option is objectively correct based on source textbooks.
- [ ] Egyptian Arabic explanation clarifies the underlying mechanism warmly and clearly.
- [ ] English medical terminology is preserved intact.
- [ ] Difficulty level accurately reflects cognitive load.
- [ ] Validated against official schema (`quiz.schema.json`).
