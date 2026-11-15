---
name: motion-interaction-design
description: Motion animations, micro-interactions, page transitions, loading states, reduced-motion support.
version: 1.0.0
---

# Motion & Interaction Design Skill

## Activation Criteria
Activate this skill when:
- Adding animations to components or page transitions
- Designing micro-interactions (hover effects, button clicks, feedback)
- Implementing loading states with animated skeletons or spinners
- Creating page-level enter/exit transitions
- Implementing gesture-based interactions (swipe, drag) on mobile
- Ensuring `prefers-reduced-motion` media query is respected
- Reviewing animation performance (avoid jank, use GPU-composited properties)

## Description
This skill governs all motion and interaction design for the KFU Fifth Semester platform. Animations should feel purposeful — they guide attention, provide feedback, and make transitions feel smooth rather than jarring. The platform uses Framer Motion as its primary animation library, with CSS transitions for simple hover/focus states. All animations must respect the `prefers-reduced-motion` accessibility setting.

## Operational Instructions

### 1. Animation Philosophy
- **Purposeful**: Every animation serves a purpose (feedback, orientation, delight)
- **Fast**: Durations: micro (100–150ms), standard (200–300ms), page (350–500ms)
- **Subtle**: Medical education context — not a game; animations should not distract
- **Performant**: Only animate `transform` and `opacity` (GPU-composited, no repaints)
- **Accessible**: Always respect `prefers-reduced-motion: reduce`

### 2. Framer Motion Setup
```bash
npm install framer-motion
```

```typescript
// src/lib/motion.ts — Shared animation variants
import { type Variants } from 'framer-motion'

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
}

export const staggerChildren: Variants = {
  visible: { transition: { staggerChildren: 0.05 } },
}

export const cardHover: Variants = {
  rest: { scale: 1, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  hover: { scale: 1.02, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', transition: { duration: 0.2 } },
}
```

### 3. Page Transitions
```tsx
// src/components/layout/PageTransition.tsx
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

### 4. Subject Card Hover Animation
```tsx
<motion.div
  variants={cardHover}
  initial="rest"
  whileHover="hover"
  whileTap={{ scale: 0.98 }}
  className="rounded-xl border p-6 cursor-pointer"
>
  {/* Card content */}
</motion.div>
```

### 5. Staggered List Animation (Lecture List)
```tsx
<motion.ul
  variants={staggerChildren}
  initial="hidden"
  animate="visible"
>
  {lectures.map((lecture) => (
    <motion.li key={lecture.id} variants={slideUp}>
      <LectureItem lecture={lecture} />
    </motion.li>
  ))}
</motion.ul>
```

### 6. Progress Bar Animation
```tsx
// Animated progress bar for quiz completion
<motion.div
  className="h-2 bg-primary rounded-full"
  initial={{ width: '0%' }}
  animate={{ width: `${progress}%` }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
/>
```

### 7. Quiz Answer Feedback Animation
```tsx
// Flash green/red on answer selection
const feedbackVariants = {
  idle: { backgroundColor: 'transparent' },
  correct: { backgroundColor: '#dcfce7', scale: 1.01, transition: { duration: 0.2 } },
  incorrect: { backgroundColor: '#fee2e2', x: [0, -4, 4, -4, 0], transition: { duration: 0.3 } },
}

<motion.div variants={feedbackVariants} animate={feedbackState}>
  {/* Answer option */}
</motion.div>
```

### 8. Skeleton Loading Animation
```tsx
// Pulsing skeleton — use Tailwind's animate-pulse
<div className="animate-pulse space-y-4">
  <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="h-32 bg-slate-200 dark:bg-slate-700 rounded-xl" />
    ))}
  </div>
</div>
```

### 9. Reduced Motion Support
```typescript
// src/hooks/useReducedMotion.ts
import { useReducedMotion } from 'framer-motion'

export function useAnimationProps(normalProps: object, reducedProps: object) {
  const shouldReduce = useReducedMotion()
  return shouldReduce ? reducedProps : normalProps
}

// In component:
const animationProps = useAnimationProps(
  { initial: 'hidden', animate: 'visible', variants: slideUp },
  { initial: false } // No animation
)
```

**Global rule**: Any component using Framer Motion MUST check `useReducedMotion()`.

### 10. CSS Transition Guidelines
For simple hover states (not requiring Framer Motion):
```css
/* Always use transition shorthand */
.card { transition: box-shadow 0.2s ease, transform 0.2s ease; }

/* Properties safe to animate (GPU-composited): */
/* transform, opacity, filter */

/* Avoid animating: */
/* width, height, padding, margin, top/left (causes layout) */
/* background-color (causes paint, prefer filter) */
```

## Workflows

### Adding Animation to Existing Component
1. Import `motion` from framer-motion
2. Convert target element to `motion.[element]` (e.g., `motion.div`)
3. Apply variants from `src/lib/motion.ts` or define locally
4. Add `useReducedMotion()` check
5. Test animation at reduced motion setting (OS accessibility settings)
6. Profile with Chrome DevTools → no layout thrashing

### New Page Animation
1. Wrap page content in `<PageTransition>`
2. Add stagger animation to list items
3. Add entrance animation to hero/header section
4. Test navigation between pages at normal and reduced motion

## Quality Checklist
- [ ] All animations check `prefers-reduced-motion` via `useReducedMotion()`
- [ ] Only `transform` and `opacity` animated (no layout properties)
- [ ] Page transitions use `AnimatePresence` with `mode="wait"`
- [ ] Animation durations: micro ≤150ms, standard ≤300ms, page ≤500ms
- [ ] Stagger children animations on all list views
- [ ] Quiz answer feedback (correct/incorrect) has animation
- [ ] Progress bars animate on value change
- [ ] Skeleton loaders replace content during async operations
- [ ] No animation loops that distract (only purposeful, non-looping motion)
- [ ] Tested on low-end Android device (no jank at 60fps target)
- [ ] `AnimatePresence` properly unmounts exit animations before navigation
- [ ] Dark mode tested with animations active
