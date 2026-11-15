# Deployment Guide — Reme's KFU Fifth Semester

**Platform Architecture:** React 18 + TypeScript + Vite SPA  
**Target Hosting:** Cloudflare Pages  
**Repository Name:** `remes-kfu-fifth-semester`  

---

## 1. Cloudflare Pages Setup

### Recommended Automatic Git Integration
1. **GitHub Connection:**
   - Push repository to GitHub under `remes-kfu-fifth-semester`.
   - Log into the [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
   - Select repository: `remes-kfu-fifth-semester`.
2. **Build Configuration:**
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/`
   - **Environment Variables:**
     - `NODE_VERSION`: `20` (or `24`)
3. **Single Page Application (SPA) Routing:**
   - Cloudflare Pages automatically honors `public/_redirects` which redirects all non-asset routes to `/index.html`:
     ```
     /*    /index.html   200
     ```
   - This ensures routes like `/subjects/dm5-pharm` and `/progress` resolve without 404 errors on browser page reloads.

---

## 2. CLI Deployment via Wrangler (Alternative)

To deploy directly from the local terminal using Cloudflare Wrangler CLI:

```powershell
# 1. Install Wrangler globally or run via npx
npx wrangler pages deploy dist --project-name=remes-kfu-fifth-semester

# 2. On first run, Wrangler will prompt you to authenticate via your web browser:
# "Allow Wrangler to connect to your Cloudflare account?" -> Click Authorize
```

---

## 3. Public Asset Security Audit

> [!IMPORTANT]
> **Copyright and Material Privacy:**
> The `source-books/` directory containing raw university PDFs is deliberately kept outside the public `dist/` directory. Only compiled React application bundles, extracted educational summaries, and public icons are published to Cloudflare edge nodes. This completely prevents unauthorized public scraping of proprietary university books.

---

## 4. Verification Checklist
- [x] Production build generated cleanly in `dist/`.
- [x] SPA redirection fallback configured in `public/_redirects`.
- [x] Security headers specified in `public/_headers`.
- [x] Zero hardcoded secrets, tokens, or environment keys in the bundle.
- [x] Client-side routing functional across all deep paths.
