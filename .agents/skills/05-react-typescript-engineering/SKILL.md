---
name: react-typescript-engineering
description: React, TypeScript, reusable components, hooks, routing, state management, performance optimization.
version: 1.0.0
---

# React & TypeScript Engineering Skill

## Activation Criteria
Activate this skill when:
- Writing React components (functional, with hooks)
- Defining TypeScript types, interfaces, and generics
- Implementing client-side routing with React Router
- Building custom hooks for reusable logic
- Managing application state (Context, Zustand, or local state)
- Optimizing React component performance
- Implementing code splitting and lazy loading
- Debugging React rendering issues

## Description
This skill covers all React and TypeScript implementation for the KFU Fifth Semester platform. The codebase uses React 18 with strict TypeScript — no `any` types, no implicit returns, full prop typing. All components are functional with hooks. This skill ensures code quality, maintainability, and type safety across the entire frontend codebase.

## Operational Instructions

### 1. TypeScript Standards
**Strict configuration (`tsconfig.json`):**
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true
  }
}
```

**Type naming conventions:**
- Interfaces for objects: `PascalCase` with `I` prefix avoided (use `SubjectProps` not `ISubjectProps`)
- Type aliases for unions/primitives: `type LectureStatus = 'available' | 'coming-soon'`
- Enums: Avoid — use `const` objects with `as const` instead
- Generic type parameters: Descriptive names (`TData`, `TError`, not just `T`)

**Avoid:**
- `any` — use `unknown` with type narrowing
- Type assertions (`as Type`) without validation
- Non-null assertions (`!`) without proven safety
- Implicit `any` from missing types in callbacks

### 2. Component Architecture Standards

**Component file structure:**
```typescript
// 1. Imports (external, then internal, then types)
import React, { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import type { SubjectCardProps } from '@/types/subject'

// 2. Component definition
export function SubjectCard({ subject, onSelect }: SubjectCardProps) {
  // 3. Hooks (in consistent order: state, refs, effects, context, callbacks)
  const [isHovered, setIsHovered] = useState(false)
  
  // 4. Derived values
  const isAvailable = subject.status === 'available'
  
  // 5. Event handlers
  const handleClick = useCallback(() => {
    if (isAvailable) onSelect(subject.id)
  }, [isAvailable, onSelect, subject.id])
  
  // 6. Render
  return (
    <div
      className={cn(
        'rounded-xl border p-6 cursor-pointer transition-all',
        isAvailable ? 'hover:shadow-md' : 'opacity-60 cursor-not-allowed'
      )}
      onClick={handleClick}
      role="button"
      tabIndex={isAvailable ? 0 : -1}
      aria-disabled={!isAvailable}
    >
      {/* JSX */}
    </div>
  )
}
```

**Component size rules:**
- Max 150 lines per component file
- Extract complex JSX into sub-components
- Extract complex logic into custom hooks
- One component per file (except tiny helpers in same file)

### 3. Custom Hooks Patterns

**Data fetching hook (for JSON files):**
```typescript
function useSubjectData(subjectId: string) {
  const [data, setData] = useState<Subject | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    import(`@/data/courses/${subjectId}.json`)
      .then(mod => setData(mod.default))
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, [subjectId])

  return { data, loading, error }
}
```

**Progress hook (IndexedDB):**
```typescript
function useStudentProgress(lectureId: string) {
  const { getProgress, setProgress } = useProgressStore()
  // Returns current progress and update function
}
```

### 4. React Router Setup
```typescript
// App.tsx — route definition
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'subject/:subjectId', element: <SubjectPage /> },
      { path: 'subject/:subjectId/theory', element: <TheoryPage /> },
      { path: 'subject/:subjectId/practical', element: <PracticalPage /> },
      { path: 'lecture/:lectureId', element: <LecturePage /> },
      { path: 'quiz/:subjectId', element: <QuizPage /> },
      { path: 'quiz/:subjectId/results', element: <QuizResultsPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'progress', element: <ProgressPage /> },
      { path: '*', element: <NotFoundPage /> },
    ]
  }
])
```

### 5. Performance Optimization
- **React.lazy + Suspense**: All page components lazy loaded
- **React.memo**: Wrap components that receive stable props from lists
- **useMemo**: For expensive computations (quiz bank filtering, search results)
- **useCallback**: For event handlers passed to memoized children
- **Virtual lists**: Use `react-window` for long lecture lists (>50 items)
- **Image lazy loading**: `loading="lazy"` on all images
- **PDF lazy loading**: Only load PDF.js when lecture page is opened

### 6. State Management Strategy
```typescript
// Global state via React Context
interface AppState {
  theme: 'light' | 'dark'
  progress: Record<string, LectureProgress>
  bookmarks: string[]
}

// Use Zustand for complex global state:
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useProgressStore = create(
  persist<ProgressState>(
    (set, get) => ({
      progress: {},
      setProgress: (lectureId, data) => set(state => ({
        progress: { ...state.progress, [lectureId]: data }
      }))
    }),
    { name: 'kfu-progress' }
  )
)
```

## Workflows

### New Component Implementation
1. Create file in correct directory (`src/components/[category]/[Name].tsx`)
2. Define TypeScript props interface
3. Write component with all visual states
4. Export from category index file
5. Add unit test in `tests/unit/`
6. Test in browser at all breakpoints

### New Route/Page Implementation
1. Create page component in `src/pages/`
2. Add route definition in router config
3. Implement lazy loading with React.lazy
4. Add Suspense boundary with skeleton fallback
5. Test navigation to and from the route
6. Add e2e test for the route

### Bug Fix
1. Write a failing test that reproduces the bug
2. Fix the implementation
3. Confirm test passes
4. Check for similar patterns elsewhere in codebase

## Quality Checklist
- [ ] No TypeScript errors (`tsc --noEmit` passes)
- [ ] No `any` types in codebase
- [ ] All components have typed props interfaces
- [ ] Custom hooks extracted for reusable logic
- [ ] All page components are lazy-loaded
- [ ] No unnecessary re-renders (use React DevTools Profiler)
- [ ] `useEffect` dependencies array is complete and correct
- [ ] No memory leaks (cleanup functions in useEffect)
- [ ] React Router used for all navigation (no `window.location`)
- [ ] Error boundaries in place for PDF viewer and quiz components
- [ ] Loading states handled for all async operations
- [ ] Keys provided and stable in all list renders
