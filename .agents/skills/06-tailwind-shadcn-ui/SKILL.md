---
name: tailwind-shadcn-ui
description: Tailwind CSS, shadcn/ui, design tokens, accessible components, component consistency.
version: 1.0.0
---

# Tailwind CSS & shadcn/ui Skill

## Activation Criteria
Activate this skill when:
- Styling components using Tailwind CSS utility classes
- Installing and customizing shadcn/ui components
- Defining or updating design tokens in `tailwind.config.js`
- Ensuring component visual consistency across the platform
- Implementing dark mode via Tailwind's `dark:` variant
- Creating accessible form components and interactive elements
- Managing Tailwind purge/content configuration
- Resolving Tailwind class conflicts or specificity issues

## Description
This skill governs the styling system for the KFU Fifth Semester platform. Tailwind CSS v3 provides utility-first styling, shadcn/ui provides accessible, unstyled primitive components built on Radix UI, and together they form a consistent, scalable design system. This skill ensures that visual implementation matches design specifications, that components are accessible out of the box, and that the codebase avoids style sprawl.

## Operational Instructions

### 1. Tailwind Configuration
```javascript
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand colors as CSS variables for theming
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        // Subject colors
        pharmacology: '#7C3AED',
        pathology: '#E11D48',
        microbiology: '#0D9488',
        parasitology: '#16A34A',
        'community-med': '#D97706',
        'clinical-skills': '#4338CA',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Cairo', 'Noto Sans Arabic', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { transform: 'translateY(8px)', opacity: '0' }, to: { transform: 'translateY(0)', opacity: '1' } },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}
```

### 2. CSS Variables for Theming
```css
/* src/styles/globals.css */
@layer base {
  :root {
    --background: 248 250 252;    /* Slate 50 */
    --foreground: 15 23 42;       /* Slate 900 */
    --card: 255 255 255;
    --card-foreground: 15 23 42;
    --primary: 37 99 235;         /* Blue 600 */
    --primary-foreground: 255 255 255;
    --secondary: 8 145 178;       /* Cyan 600 */
    --secondary-foreground: 255 255 255;
    --muted: 241 245 249;         /* Slate 100 */
    --muted-foreground: 100 116 139; /* Slate 500 */
    --border: 226 232 240;        /* Slate 200 */
    --radius: 0.75rem;
  }

  .dark {
    --background: 15 23 42;       /* Slate 900 */
    --foreground: 248 250 252;    /* Slate 50 */
    --card: 30 41 59;             /* Slate 800 */
    --card-foreground: 248 250 252;
    --primary: 96 165 250;        /* Blue 400 */
    --border: 51 65 85;           /* Slate 700 */
  }
}
```

### 3. shadcn/ui Component Usage
**Core components to install:**
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add progress
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add sheet
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add accordion
npx shadcn-ui@latest add tooltip
npx shadcn-ui@latest add scroll-area
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add skeleton
npx shadcn-ui@latest add alert
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label
```

**Usage pattern:**
```tsx
// Always import from @/components/ui/
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Never re-create what shadcn/ui provides
// Customize via className prop and cn() utility
import { cn } from '@/lib/utils'

<Button
  variant="default"
  size="lg"
  className={cn('w-full', isLoading && 'opacity-70')}
  disabled={isLoading}
>
  Open Lecture
</Button>
```

### 4. `cn()` Utility Pattern
Always use `cn()` for conditional class merging:
```typescript
// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Usage:
cn(
  'base classes always applied',
  condition && 'classes when true',
  { 'class-a': conditionA, 'class-b': conditionB }
)
```

### 5. Component Variants with cva()
```typescript
import { cva, type VariantProps } from 'class-variance-authority'

const subjectBadge = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
  {
    variants: {
      subject: {
        pharmacology: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
        pathology: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-100',
        microbiology: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100',
      },
      type: {
        theory: 'bg-blue-100 text-blue-800',
        practical: 'bg-green-100 text-green-800',
      }
    },
    defaultVariants: { type: 'theory' }
  }
)
```

### 6. Responsive Classes Pattern
Mobile-first always:
```tsx
// ✅ Correct — mobile first, then larger
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">

// ❌ Avoid — not mobile first
<div className="grid grid-cols-4 max-md:grid-cols-1">
```

### 7. Avoid Anti-patterns
- Never use `@apply` for utility compositions — keep it in JSX className
- Never use arbitrary values when a Tailwind scale value exists
- Never mix Tailwind with inline styles — Tailwind only
- Never use `!important` — fix specificity properly
- Never hard-code colors — use design token classes

## Workflows

### Adding a shadcn/ui Component
1. Run `npx shadcn-ui@latest add [component-name]`
2. File appears in `src/components/ui/`
3. Customize only via `className` prop or `variants` — do not edit generated file
4. If deep customization needed, create a wrapper component in `src/components/`

### New Custom Component
1. Use shadcn/ui primitives as base
2. Add subject theming via `cva()` variants
3. Use `cn()` for conditional classes
4. Test all visual states in browser
5. Verify dark mode

## Quality Checklist
- [ ] All Tailwind content paths configured (no missing components)
- [ ] Design tokens in CSS variables, not hard-coded
- [ ] Dark mode works via `.dark` class on `<html>`
- [ ] `cn()` used for all conditional class merging
- [ ] `cva()` used for components with multiple variants
- [ ] No inline styles — Tailwind only
- [ ] No arbitrary values when scale values exist
- [ ] shadcn/ui components imported from `@/components/ui/`
- [ ] Mobile-first responsive classes on all layout components
- [ ] Typography plugin applied to rendered markdown/HTML content
- [ ] All interactive elements have visible focus rings (Tailwind `focus-visible:ring-*`)
- [ ] Skeleton components match the layout of the content they replace
