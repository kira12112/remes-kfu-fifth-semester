---
name: cloudflare-deployment
description: GitHub, Cloudflare Pages, CI/CD, build configuration, preview deployments, production deployment, and rollback for Reme's KFU Fifth Semester.
version: 1.0.0
---

# 15. Cloudflare Deployment Skill

## Activation Criteria
Activate this skill when configuring Git repositories, setting up Cloudflare Pages builds, generating deployment headers, writing SPA redirection rules, or verifying live production URLs.

## Description
This skill covers the production release pipeline for Reme's KFU Fifth Semester platform. It automates static single-page application (SPA) deployment via GitHub integration into Cloudflare Pages with edge caching, global CDN routing, and instant rollbacks.

## Operational Instructions

### 1. Repository Configuration
- Repository Name: `remes-kfu-fifth-semester`.
- Branch Strategy:
  - `main`: Production release branch.
  - Feature/fix branches for pull request preview deployments.
- Ensure `.gitignore` excludes:
  - `node_modules/`, `dist/`, `.vite/`, `test-results/`
  - `.env`, `.env.local`
  - Unapproved raw PDFs in `source-books/` to prevent public leakage.

### 2. Cloudflare Pages Build Specification
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Build Output Directory**: `dist`
- **Root Directory**: `/`
- **Node.js Version**: 20.x or 24.x (configured via `NODE_VERSION=20` environment variable or `.nvmrc`).

### 3. SPA Routing & Fallbacks
- In Cloudflare Pages, client-side routing (React Router) requires falling back to `/index.html` for unknown paths.
- Provide a `public/_redirects` or `public/_routes.json` file:
  ```
  /*    /index.html   200
  ```
- Ensure security headers are provided via `public/_headers`:
  ```
  /*
    X-Frame-Options: DENY
    X-Content-Type-Options: nosniff
    Referrer-Policy: strict-origin-when-cross-origin
    Permissions-Policy: geolocation=(), microphone=(), camera=()
  ```

### 4. Deployment Verification & Rollback
- NEVER declare deployment successful until the public URL responds with HTTP 200 and loads root assets without 404s.
- Test client-side navigation: navigate to `/subjects/dm5-pharm`, refresh browser, and verify the page loads cleanly without returning a 404 from Cloudflare.
- If deployment fails, inspect Cloudflare build logs and rollback to prior stable deployment via the Cloudflare dashboard.

## Quality Checklist
- [ ] Clean build passes locally with `npm run build`.
- [ ] SPA fallback redirect rule configured (`public/_redirects`).
- [ ] Security headers specified (`public/_headers`).
- [ ] Sensitive source books excluded from production bundle.
- [ ] Live URL verified with HTTP 200 response.
