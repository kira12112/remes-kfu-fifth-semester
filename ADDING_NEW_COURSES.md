# Guide: Adding New Courses & Study Materials

**Platform:** Reme's KFU Fifth Semester  
**Maintainer:** Educational Engineering Team  

---

## 1. Overview
The platform uses a scalable, data-driven architecture. Adding a newly announced subject or uploading a newly received university textbook does **NOT** require altering application routing or rewriting components. Everything is driven by structured JSON files in `content/`.

---

## 2. Step-by-Step Ingestion Protocol

### Step 1: Deposit Original PDF
- Place the original university PDF in `source-books/`.
- Do not modify or alter the original document.

### Step 2: Audit & Inventory the File
Run a Python or CLI inspection to determine exact file size and page count:
```powershell
python -c "import pypdf; r = pypdf.PdfReader('source-books/new-file.pdf'); print(len(r.pages))"
```
Update `content-inventory.json` with the new file record.

### Step 3: Register or Update Course in `fifth-semester.json`
Open `content/courses/fifth-semester.json`:
- If updating an existing subject (e.g. transitioning from `coming-soon` to `available`):
  - Change `"status": "available"`
  - Add the PDF filename to `"sourceFiles"`
  - Set the verified `"theoreticalCount"` and `"practicalCount"`.

### Step 4: Author the Verified Lecture Content
Create a new JSON file under `content/lectures/` following the `lecture.schema.json`:
- Name: `<subject-id>-lec-<number>.json`
- Include:
  - English title and Egyptian Arabic subtitle
  - Structured sections with Arabic explanations and intact English medical terms
  - Clinical pearls (`type: "important"`)
  - Terminology glossary
  - Key summary takeaways
  - Accurate `sourceReference` (PDF filename and page numbers)

### Step 5: Formulate Matching Interactive Quizzes
Create matching MCQs in `content/quizzes/`:
- 4 multiple-choice options per question
- Difficulty tiers (`easy`, `medium`, `hard`)
- Egyptian Arabic explanation for immediate practice feedback

### Step 6: Verify and Build
```powershell
# 1. Type check
npx tsc --noEmit

# 2. Run unit tests
npm test

# 3. Production build
npm run build
```
Commit changes to Git and deploy to Cloudflare Pages.
