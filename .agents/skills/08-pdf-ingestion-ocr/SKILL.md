---
name: pdf-ingestion-ocr
description: PDF extraction, OCR, scanned document detection, tables, figures, chapter structure, page references.
version: 1.0.0
---

# PDF Ingestion & OCR Skill

## Activation Criteria
Activate this skill when:
- Processing source-books PDFs for the platform
- Detecting whether PDFs are text-based or scanned (image-based)
- Extracting text content, tables, figures, and chapter structure from PDFs
- Running OCR on scanned lecture notes or slides
- Building metadata (page counts, chapter headings, tags) from PDF content
- Preparing PDFs for the in-browser PDF viewer (PDF.js)
- Validating PDF integrity and accessibility

## Description
This skill governs the extraction and processing of medical lecture PDFs from the `source-books/` directory. The PDFs are lecture slides and notes from KFU's 5th-semester medical courses, which may be text-based (selectable text) or scanned (image-based, requiring OCR). This skill produces clean PDF files and metadata JSON that drive the platform's lecture viewer and search system.

## Operational Instructions

### 1. Source PDF Classification
Before processing, classify each PDF:

**Type A — Native/Text PDF:**
- Characteristics: Selectable text, copy-paste works, small file size per page
- Detection: Try extracting text; if >50% pages yield text, it's native
- Tools: PDF.js (browser), pdfplumber (Python), pdf-parse (Node.js)
- OCR needed: No

**Type B — Scanned/Image PDF:**
- Characteristics: Scanned lecture notes, printed slides photographed
- Detection: Text extraction yields empty or garbled strings
- Tools: Tesseract OCR + pdf2image (Python)
- OCR needed: Yes

**Type C — Mixed PDF:**
- Characteristics: Combination of native slides and scanned handwritten notes
- Process: Page-by-page classification, OCR only scanned pages

### 2. PDF Metadata Extraction
For each processed PDF, extract:
```typescript
interface PDFMetadata {
  filename: string;
  originalPath: string;
  pageCount: number;
  fileSize: number;         // bytes
  type: 'native' | 'scanned' | 'mixed';
  ocrApplied: boolean;
  extractedTitle: string;   // From first page or PDF metadata
  chapters: ChapterMeta[];
  figures: FigureMeta[];
  tables: TableMeta[];
  keywords: string[];       // Medical terms extracted
  language: 'en' | 'ar' | 'mixed';
  lectureWeek?: number;     // If determinable from content
  subject?: string;         // If determinable from filename or content
}

interface ChapterMeta {
  title: string;
  pageNumber: number;
  level: 1 | 2 | 3;        // Heading hierarchy
}
```

### 3. PDF Processing Pipeline

**Step 1: Inventory**
```powershell
Get-ChildItem -Path "d:\remes-KFU-fifth_semester\source-books" -Recurse -Filter "*.pdf" |
  Select-Object Name, Length, DirectoryName |
  Export-Csv "pdf-inventory.csv"
```

**Step 2: Text extraction (Python with pdfplumber)**
```python
import pdfplumber
import json

def extract_pdf_metadata(pdf_path: str) -> dict:
    with pdfplumber.open(pdf_path) as pdf:
        pages_text = []
        for page in pdf.pages:
            text = page.extract_text() or ''
            pages_text.append(text)
        
        # Classify type
        text_pages = sum(1 for t in pages_text if len(t.strip()) > 50)
        pdf_type = 'native' if text_pages > len(pages_text) * 0.5 else 'scanned'
        
        return {
            'pageCount': len(pdf.pages),
            'type': pdf_type,
            'pagesText': pages_text,
        }
```

**Step 3: OCR (Tesseract for scanned pages)**
```python
from pdf2image import convert_from_path
import pytesseract

def ocr_pdf(pdf_path: str, language: str = 'eng') -> list[str]:
    images = convert_from_path(pdf_path, dpi=300)
    return [
        pytesseract.image_to_string(img, lang=language, config='--psm 6')
        for img in images
    ]
```

**Step 4: Chapter/heading extraction**
```python
def extract_headings(text: str) -> list[dict]:
    # Heuristic: Lines in ALL CAPS or significantly larger font = headings
    # For PDFs with TOC: parse table of contents
    headings = []
    for line in text.split('\n'):
        line = line.strip()
        if line.isupper() and len(line) > 5:
            headings.append({'title': line, 'level': 1})
    return headings
```

**Step 5: Medical keyword extraction**
Common 5th-semester medical terms to index:
- Pharmacology: bioavailability, pharmacokinetics, half-life, receptor, agonist, antagonist, drug classes
- Pathology: inflammation, neoplasia, apoptosis, necrosis, edema, fibrosis
- Microbiology: bacteria, virus, fungi, antibiotic, virulence, pathogenesis
- Parasitology: protozoa, helminths, vector, host, life cycle

### 4. PDF Optimization for Browser
```bash
# Optimize for web delivery using Ghostscript (Windows)
gswin64c -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/screen -dNOPAUSE -dQUIET -dBATCH -sOutputFile=output.pdf input.pdf
```
- Target: < 5MB per lecture PDF for fast mobile loading
- Maintain text layer for copy-paste
- Ensure page thumbnails are generated

### 5. PDF.js Integration (Browser Viewer)
```typescript
// src/components/pdf/PDFViewer.tsx
import * as PDFJS from 'pdfjs-dist'

PDFJS.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'

function PDFViewer({ pdfUrl }: { pdfUrl: string }) {
  // Load PDF lazily on component mount
  // Render pages to canvas elements
  // Implement virtual scrolling for large PDFs (>50 pages)
  // Show loading skeleton while PDF loads
  // Handle errors (corrupted PDF, 404)
}
```

### 6. PDF Organization in Project
```
public/
└── pdfs/
    ├── pharmacology/
    │   ├── 01-pharmacokinetics.pdf
    │   ├── 02-drug-absorption.pdf
    │   └── ...
    ├── pathology/
    │   └── ...
    └── microbiology/
        └── ...
```

## Workflows

### New PDF Batch Processing
1. Place raw PDFs in `source-books/[subject]/`
2. Run inventory script to list all files with sizes
3. Classify each PDF (native / scanned / mixed)
4. Run text extraction on native PDFs
5. Run OCR on scanned PDFs
6. Extract chapter headings and medical keywords
7. Optimize file size for web
8. Copy optimized PDFs to `public/pdfs/[subject]/`
9. Generate metadata JSON and merge into course data files
10. Update lecture entries in subject JSON (set status: 'available')

### Single PDF Addition
1. Classify PDF type
2. Extract page count and metadata
3. Add optimized copy to correct `public/pdfs/` folder
4. Update corresponding lecture entry in subject JSON
5. Verify PDF loads in browser viewer

## Quality Checklist
- [ ] All PDFs classified (native / scanned / mixed)
- [ ] Scanned PDFs have OCR text layer applied
- [ ] All PDFs < 5MB (compressed for web)
- [ ] Page counts accurate in lecture metadata JSON
- [ ] Chapter headings extracted and stored
- [ ] Medical keywords indexed for search
- [ ] PDF viewer loads without errors in Chrome, Firefox, Safari, Edge
- [ ] PDF viewer works on mobile (touch scrolling, pinch-to-zoom)
- [ ] 404 handling for missing PDFs (graceful error message)
- [ ] Large PDFs (>50 pages) use virtual scrolling
- [ ] Corrupted PDF handling with user-friendly error
- [ ] OCR accuracy verified for Arabic text if present
