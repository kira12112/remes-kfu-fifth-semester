---
name: security-performance
description: Dependency audits, XSS prevention, input validation, secure configuration, and client-side performance optimization for Reme's KFU Fifth Semester.
version: 1.0.0
---

# 14. Security & Performance Skill

## Activation Criteria
Activate this skill when evaluating dependencies, sanitizing content, configuring build optimization, optimizing asset bundles, auditing security risks, or improving loading speeds.

## Description
This skill enforces rigorous security standards and high-speed mobile performance. Given that the platform serves medical students who need fast, uninterrupted study sessions on cellular and Wi-Fi networks, asset sizes must be minimized and all user-rendered content sanitized against vulnerabilities.

## Operational Instructions

### 1. Security Guidelines & Content Sanitization
- **XSS Prevention**: Never render unsanitized HTML via `dangerouslySetInnerHTML`. Use structured markdown renderers with sanitized AST or custom React components.
- **Dependency Audit**: Regularly run `npm audit` to flag and address known CVEs in npm dependencies.
- **Zero Secrets**: Ensure frontend bundle contains zero API keys, passwords, or private environment variables.
- **Public Access Protection**: Protect original copyrighted textbooks in `source-books/` by excluding unapproved raw PDFs from public web distribution. Only verified educational summaries and approved excerpt materials should be bundled into public static assets.

### 2. Client-Side Performance Optimization
- **Code Splitting & Lazy Loading**: Utilize `React.lazy()` and dynamic imports for heavy components (such as PDF.js rendering canvas and extensive question banks).
- **Bundle Optimization**: Configure Vite with esbuild minification, manual chunk splitting (vendor, ui, pdfjs), and tree-shaking.
- **Font Optimization**: Preconnect to Google Fonts, load font subsets, and use `font-display: swap` to prevent FOIT (Flash of Invisible Text).
- **IndexedDB Caching**: Cache study progress and bookmark state locally in IndexedDB with debounced writes to avoid thread blocking.

### 3. Mobile Performance Metrics
- Strive for sub-1.5s First Contentful Paint (FCP) on mobile 4G.
- Target Cumulative Layout Shift (CLS) of 0.00 by reserving aspect ratios for cards and images.
- Keep initial JavaScript bundle under 250 KB compressed.

## Quality Checklist
- [ ] No `dangerouslySetInnerHTML` with raw input.
- [ ] Raw copyrighted PDFs excluded from public deployment bundle.
- [ ] No secrets or private tokens in code.
- [ ] Dynamic imports utilized for heavy components.
- [ ] Lazy loading configured for images and offscreen components.
- [ ] `npm audit` shows 0 high or critical vulnerabilities.
