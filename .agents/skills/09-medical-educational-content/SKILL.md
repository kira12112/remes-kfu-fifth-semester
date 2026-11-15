---
name: medical-educational-content
description: Medical terminology, Egyptian Arabic explanations, English terminology preservation, scientific accuracy.
version: 1.0.0
---

# Medical Educational Content Skill

## Activation Criteria
Activate this skill when:
- Writing or reviewing medical content for the platform
- Adding Arabic explanations or translations of medical terms
- Verifying scientific accuracy of content
- Creating quiz questions and answer explanations
- Writing lecture summaries or study notes
- Tagging medical content with appropriate terminology
- Deciding how to present complex medical concepts

## Description
This skill governs the creation and quality of all medical educational content on the KFU Fifth Semester platform. The audience is 5th-year medical students at King Faisal University (KFU), Al-Ahsa, Saudi Arabia, studying in English with Egyptian Arabic as their native language. Content must be scientifically accurate, use correct English medical terminology, and optionally include Egyptian Arabic explanations to aid understanding (never replace English terms with Arabic).

## Operational Instructions

### 1. Content Principles

**Rule 1: English Medical Terminology is Sacred**
- Never translate medical terms to Arabic
- Drug names, anatomical terms, disease names, and pathological processes remain in English
- Arabic is used for explanation and simplification only
- Example: ✅ "Pharmacokinetics (الحركيات الدوائية — كيف بيتحرك الدواء في الجسم)"
- Example: ❌ "الحركيات الدوائية" (without English term)

**Rule 2: Egyptian Arabic Dialect for Explanations**
- Use Egyptian Arabic (عامية مصرية), not formal/Modern Standard Arabic
- Students are Egyptian medical students — their internal dialogue is Egyptian Arabic
- Example: "يعني" not "أي" | "بيحصل" not "يحدث" | "ده" not "هذا"
- Academic accuracy in Egyptian colloquial style

**Rule 3: Scientific Accuracy**
- All medical content based on established medical literature (Harrison's, Robbins, Rang & Dale, etc.)
- Drug mechanisms must reflect current pharmacological understanding
- Pathological processes per Robbins Basic Pathology
- Microbiology per Murray's Medical Microbiology
- Do not add unverified claims or speculative content

**Rule 4: KFU Curriculum Alignment**
- Content aligned with 5th-year KFU medical curriculum
- Prioritize topics covered in KFU lecture slides
- Mirror the organization of source PDF lectures
- Note any discrepancies between source PDFs and current guidelines

### 2. Subject-Specific Content Guidelines

**Pharmacology:**
- Always include: Drug class, mechanism of action, pharmacokinetics (ADME), clinical uses, side effects, contraindications
- Drug names: Use generic name primarily, brand name in parentheses if helpful
- Drug mechanisms: Receptor-level explanation preferred
- Egyptian Arabic tip: "الدواء ده بيشتغل إزاي؟ — This is how the drug works..."

**Pathology:**
- Always include: Definition, etiology, pathogenesis, morphology (gross + microscopic), clinical features, complications
- Pathology descriptions: Link microscopic findings to clinical presentation
- Robbins terminology preferred for naming lesions and processes

**Microbiology:**
- Always include: Organism classification, virulence factors, disease manifestations, diagnosis, treatment
- Gram stain, culture characteristics, and clinical specimen types
- Antibiotic coverage and resistance mechanisms

**Parasitology:**
- Always include: Organism, life cycle, vectors/hosts, disease, diagnosis, treatment
- Life cycle diagrams referenced by page number from source PDF
- Endemic regions including Egypt/Saudi Arabia where relevant

**Community Medicine:**
- Epidemiology: Include rates, ratios, relevant Saudi/Egyptian statistics
- Preventive measures and public health interventions
- Biostatistics concepts explained clearly with examples

### 3. Quiz Content Standards
- Questions must be clinically oriented (not pure recall)
- Stem: Patient presentation or clinical scenario preferred
- Options: 5 options (A–E), one best answer (not "none of the above")
- Explanation: For each wrong answer, explain why it's wrong
- Difficulty levels: Easy (recall), Medium (application), Hard (analysis)
- Tags: subject, topic, week, difficulty, lecture source

**MCQ Writing Template:**
```json
{
  "id": "pharm-001",
  "question": "A 45-year-old patient with chronic kidney disease is started on a drug that inhibits prostaglandin synthesis. Which mechanism is most likely responsible for the drug's analgesic effect?",
  "options": {
    "A": "Activation of μ-opioid receptors",
    "B": "Inhibition of COX-1 and COX-2",
    "C": "Blockade of voltage-gated Na+ channels",
    "D": "Antagonism of bradykinin receptors",
    "E": "Inhibition of phosphodiesterase"
  },
  "correctAnswer": "B",
  "explanation": "NSAIDs work by inhibiting cyclooxygenase (COX) enzymes, reducing prostaglandin synthesis. COX-2 inhibition provides analgesia. Note: NSAIDs are relatively contraindicated in CKD due to reduced renal prostaglandins. (A) describes opioids, (C) describes local anesthetics/anticonvulsants, (D) is not a pharmacological target for analgesics, (E) describes theophylline/sildenafil.",
  "explanationAr": "الـ NSAIDs بتشتغل عن طريق تثبيط إنزيم COX اللي بيعمل البروستاجلاندين. تثبيط COX-2 هو اللي بيدي التسكين. مهم تعرف إن الـ NSAIDs ممنوعة في الكلى الواقفة عشان البروستاجلاندين بتحافظ على تروية الكلى.",
  "subject": "pharmacology",
  "topic": "NSAIDs",
  "week": 3,
  "difficulty": "medium",
  "lectureSource": "pharm-week3-nsaids",
  "tags": ["NSAIDs", "COX", "analgesics", "renal"]
}
```

### 4. Content Accuracy Review Process
1. Cross-reference with at least one standard textbook
2. Check drug names against standard pharmacological references
3. Verify pathological terminology against Robbins
4. For Arabic explanations: ensure the Egyptian Arabic is natural and accurate
5. Flag any outdated guidelines (e.g., drug withdrawn from market)
6. Note if content differs from KFU source PDF and explain why

### 5. Coming Soon Content Strategy
When a subject or lecture is not yet processed:
- Do not guess or fabricate content
- Use Coming Soon placeholder with:
  - Expected lecture title (from PDF filename if available)
  - Approximate availability timeline
  - What to study in the meantime (reference textbook chapters)

## Workflows

### New Lecture Content Creation
1. Read source PDF for the lecture
2. Extract key topics and learning objectives
3. Write lecture summary (English, 200–400 words)
4. Add Egyptian Arabic highlights for 3–5 key concepts
5. Write 10–15 MCQs covering the lecture content
6. Tag all MCQs with appropriate metadata
7. Review for accuracy against standard textbook
8. Add to subject's content JSON file

### Content Review
1. Load existing content for the lecture
2. Cross-reference with source PDF
3. Check medical accuracy against references
4. Verify Arabic explanations are in Egyptian dialect
5. Test MCQ options for plausibility and correctness
6. Update content and increment version

## Quality Checklist
- [ ] All medical terminology in English (not translated to Arabic)
- [ ] Egyptian Arabic explanations are in colloquial dialect (not MSA)
- [ ] All drug names use generic name as primary
- [ ] Pathology content follows Robbins classification
- [ ] Microbiology classification is current
- [ ] Quiz questions are clinically oriented (not pure recall)
- [ ] Every MCQ has explanation for correct AND wrong options
- [ ] Difficulty levels assigned consistently across the question bank
- [ ] KFU curriculum alignment verified against source PDFs
- [ ] No fabricated or speculative medical content
- [ ] Arabic explanations reviewed for naturalness and accuracy
- [ ] Coming Soon pages never show fabricated content
