# Component Inventory

> Complete inventory of all UI components for Reme's KFU Fifth Semester platform.  
> Each component lists its props interface, variants, states, and implementation notes.

---

## Layout Components

### `AppShell`
**Purpose:** Root layout wrapper — combines top nav, bottom nav, and scrollable content area.

```tsx
interface AppShellProps {
  children: React.ReactNode
  title?: string
  showBack?: boolean
  trailingAction?: React.ReactNode
  hideBottomNav?: boolean  // for fullscreen views like PDF viewer
}
```

**States:** Default | PDF-fullscreen (hides all chrome) | Scrolled (top nav gets shadow)  
**Notes:** Handles safe-area-inset-bottom for bottom nav. `position: sticky` top nav.

---

### `PageContainer`
**Purpose:** Content wrapper with max-width, centering, and responsive horizontal padding.

```tsx
interface PageContainerProps {
  children: React.ReactNode
  className?: string
  noPadding?: boolean  // for full-bleed sections
}
```

**Behavior:** `max-w-[1280px]`, `mx-auto`, `px-4 sm:px-6 lg:px-8`

---

### `SectionHeader`
**Purpose:** Consistent section heading with optional trailing link/action.

```tsx
interface SectionHeaderProps {
  title: string
  subtitle?: string
  action?: { label: string; href: string }
  dir?: 'ltr' | 'rtl'
}
```

**Variants:** With subtitle | With action link | Standalone title  
**Notes:** `dir` prop ensures Arabic section headers are right-aligned.

---

## Navigation Components

### `TopNavBar`
**Purpose:** App header — back navigation, page title, optional trailing action.

```tsx
interface TopNavBarProps {
  title: string
  showBack?: boolean
  onBack?: () => void
  trailingAction?: React.ReactNode
  transparent?: boolean  // for hero/splash screens
  dir?: 'ltr' | 'rtl'
}
```

**States:** Default | Scrolled (shadow) | Transparent (over hero)  
**Height:** 56px  
**Notes:** Back button is 44×44px tap target. Title truncates with ellipsis.

---

### `BottomNavBar`
**Purpose:** Primary mobile navigation — fixed to bottom of viewport.

```tsx
interface BottomNavBarProps {
  activeTab: 'home' | 'subjects' | 'bookmarks' | 'progress' | 'settings'
  onTabChange: (tab: string) => void
}

interface NavTab {
  id: string
  label: string       // Arabic label
  labelEn: string     // English label
  icon: LucideIcon
  href: string
  badge?: number      // notification count
}
```

**Tabs:** Home (`House`) | Subjects (`BookOpen`) | Bookmarks (`Bookmark`) | Progress (`BarChart2`) | Settings (`Settings`)  
**States:** Active (teal icon+label) | Inactive (gray) | With badge (red dot)  
**Notes:** `padding-bottom: env(safe-area-inset-bottom)` — required for iPhone notch support.

---

### `Sidebar`
**Purpose:** Desktop-only persistent navigation drawer.

```tsx
interface SidebarProps {
  activeRoute: string
  subjects?: Subject[]
  collapsed?: boolean
  onCollapse?: () => void
}
```

**Breakpoint:** Visible at `lg:` (1024px+) only. Hidden on mobile.  
**Width:** 240px expanded, 64px collapsed (icon-only mode)  
**Sections:** App Navigation | Subject Shortcuts | Settings

---

### `Breadcrumb`
**Purpose:** Hierarchical location indicator for deep navigation (Subject → Lecture).

```tsx
interface BreadcrumbProps {
  items: Array<{ label: string; href?: string }>
  dir?: 'ltr' | 'rtl'
}
```

**States:** Linked items (tappable) | Current page (non-linked, bold)  
**Notes:** Hidden on mobile (too small). Shows on `md:` (768px+) only.

---

## Subject Components

### `SubjectCard`
**Purpose:** Grid card representing a single medical subject.

```tsx
interface SubjectCardProps {
  subject: {
    id: string
    nameAr: string
    nameEn: string
    icon: LucideIcon | string  // emoji fallback
    accentColor: string        // subject-specific color
    lectureCount: number
    completedCount: number
    status: 'active' | 'coming-soon' | 'completed'
    semester: number
  }
  onClick?: () => void
  variant?: 'grid' | 'list'
}
```

**States:** Active | Coming Soon (locked, purple overlay) | Completed (green checkmark)  
**Variants:** Grid card (vertical) | List row (horizontal, compact)  
**Animations:** `whileHover={{ y: -2 }}` on grid variant; tap scale on mobile

---

### `SubjectGrid`
**Purpose:** Responsive grid container for `SubjectCard` components.

```tsx
interface SubjectGridProps {
  subjects: Subject[]
  loading?: boolean
  emptyState?: React.ReactNode
  columns?: 1 | 2 | 3 | 4
}
```

**Layout:** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`  
**Loading:** Shows 6 `SubjectCard` skeletons  
**Notes:** Skeleton count matches expected content to prevent layout shift.

---

### `SubjectDashboard`
**Purpose:** Full subject detail page — header, stats, Theory/Practical tabs, lecture list.

```tsx
interface SubjectDashboardProps {
  subject: Subject
  lectures: Lecture[]
  practicals: Practical[]
  userProgress: SubjectProgress
}
```

**Layout sections:**
1. Subject hero header (name, icon, overall progress bar)
2. Quick stats row (lectures count, quiz count, completion %)
3. `ContentTabs` (Theory | Practical | Quizzes)
4. `LectureCard` list / grid
5. Floating `QuizStartFAB`

---

## Content Components

### `LectureCard`
**Purpose:** Card representing a single lecture (PDF or video).

```tsx
interface LectureCardProps {
  lecture: {
    id: string
    title: string
    titleAr?: string
    type: 'pdf' | 'video' | 'notes'
    weekNumber: number
    duration?: string      // "12 pages" or "45 min"
    isCompleted: boolean
    isBookmarked: boolean
    isDownloaded: boolean
    isNew: boolean
    thumbnailUrl?: string
  }
  onPress?: () => void
  onBookmark?: () => void
  variant?: 'compact' | 'full'
}
```

**States:** New | In Progress | Completed | Bookmarked | Downloaded  
**Variants:** Compact (list row) | Full (card with thumbnail)  
**Notes:** `isNew` shows a teal dot indicator. Swipe-left gesture reveals bookmark/download actions.

---

### `LectureViewer`
**Purpose:** Full-screen lecture reading experience wrapper.

```tsx
interface LectureViewerProps {
  lecture: Lecture
  onComplete?: () => void
  onNext?: () => void
  onPrev?: () => void
  hasNext: boolean
  hasPrev: boolean
}
```

**Modes:** PDF (`PdfViewer`) | Video (native `<video>`) | Text notes (markdown renderer)  
**Overlay controls:** Auto-hide after 3s of inactivity; tap to show  
**Progress:** Updates `isCompleted` when user reaches last page / 80% of video

---

### `PracticalCard`
**Purpose:** Card representing a practical session, lab, or clinical case.

```tsx
interface PracticalCardProps {
  practical: {
    id: string
    title: string
    titleAr?: string
    type: 'lab' | 'clinical' | 'dissection' | 'case-study'
    sessionNumber: number
    date?: string
    isCompleted: boolean
    attachments: Attachment[]
  }
  onPress?: () => void
}
```

**Visual distinction:** Left border in amber (`color-secondary`) to visually separate from lecture cards.

---

### `PdfViewer`
**Purpose:** Full-screen PDF rendering and reading component.

```tsx
interface PdfViewerProps {
  url: string
  title: string
  initialPage?: number
  onPageChange?: (page: number, total: number) => void
  onClose?: () => void
}
```

**Features:**
- Page-by-page navigation (swipe + buttons)
- Pinch-to-zoom, double-tap to zoom
- Page counter overlay ("3 / 42")
- Zoom controls (−, reset, +)
- Dark background always (reading mode)
- Download button (if offline supported)

**States:** Loading (skeleton + spinner) | Rendered | Error (retry state) | Zoom mode

---

## Quiz Components

### `QuizCard`
**Purpose:** Entrypoint card to start a quiz for a subject or lecture.

```tsx
interface QuizCardProps {
  quiz: {
    id: string
    title: string
    subjectName: string
    questionCount: number
    estimatedMinutes: number
    difficulty: 'easy' | 'medium' | 'hard'
    lastScore?: number      // 0-100
    attemptCount: number
    isNew: boolean
  }
  onStart?: () => void
}
```

**States:** New | Previously attempted (shows last score) | Coming Soon  
**Notes:** Shows estimated time and question count prominently.

---

### `QuizEngine`
**Purpose:** State machine wrapper for the quiz flow.

```tsx
interface QuizEngineProps {
  quizId: string
  questions: Question[]
  settings: {
    timeLimit?: number      // seconds, optional
    showExplanations: boolean
    shuffleQuestions: boolean
    shuffleAnswers: boolean
  }
  onComplete: (result: QuizResult) => void
  onExit: () => void
}
```

**States:** Intro screen → Question loop → Results screen  
**Sub-components used:** `QuestionDisplay`, `AnswerOption`, `QuizResults`

---

### `QuestionDisplay`
**Purpose:** Renders a single question with its stem text and optional image.

```tsx
interface QuestionDisplayProps {
  question: {
    id: string
    stem: string            // question text (may be Arabic)
    stemAr?: string
    image?: string          // optional image URL
    type: 'mcq' | 'true-false' | 'matching'
    questionNumber: number
    totalQuestions: number
  }
  timeRemaining?: number
}
```

**Features:** Arabic/English auto-detect for `dir` setting. Image zoom on tap.  
**Progress:** Top progress bar showing question X of Y.

---

### `AnswerOption`
**Purpose:** Single answer choice button in a quiz.

```tsx
interface AnswerOptionProps {
  option: {
    id: string
    text: string
    textAr?: string
    isCorrect?: boolean    // revealed after submission
  }
  state: 'default' | 'selected' | 'correct' | 'incorrect' | 'revealed'
  onSelect?: () => void
  disabled?: boolean
}
```

**States and styling:**
- `default`: Border `color-border`, bg white
- `selected`: Border `color-primary` (2px), bg primary at 4% opacity
- `correct`: Border `color-success` (2px), bg `color-success-bg`, CheckCircle icon
- `incorrect`: Border `color-error` (2px), bg `color-error-bg`, XCircle icon
- `revealed` (correct answer shown): Border `color-success` dashed

---

### `QuizResults`
**Purpose:** End screen showing quiz score and performance breakdown.

```tsx
interface QuizResultsProps {
  result: {
    score: number           // 0-100
    correctCount: number
    wrongCount: number
    skippedCount: number
    timeTaken: number       // seconds
    passMark: number        // e.g. 60
  }
  onReview?: () => void     // review wrong answers
  onRetry?: () => void
  onShare?: () => void
}
```

**States:** Pass (teal, celebration micro-animation) | Fail (amber, encouraging message)  
**Visuals:** Large score number, circular progress ring, breakdown by category

---

### `ScoreDisplay`
**Purpose:** Reusable score visualization — compact for cards, large for results.

```tsx
interface ScoreDisplayProps {
  score: number          // 0-100
  variant: 'compact' | 'large' | 'ring'
  showLabel?: boolean
  passMark?: number
}
```

**Variants:**
- `compact`: Badge-style `"78%"` text with color coding
- `large`: Big centered number with descriptive label
- `ring`: Circular SVG progress ring

---

## Progress Components

### `ProgressBar`
**Purpose:** Linear progress indicator for lecture/subject completion.

```tsx
interface ProgressBarProps {
  value: number          // 0-100
  max?: number           // defaults to 100
  label?: string         // e.g. "12 / 20 lectures"
  color?: 'primary' | 'success' | 'warning'
  size?: 'sm' | 'md'    // sm: 4px, md: 8px height
  animated?: boolean     // animate on mount
  showValue?: boolean
}
```

**Animation:** `width` transition 400ms ease-out on mount (skipped if `prefers-reduced-motion`)

---

### `SubjectProgress`
**Purpose:** Progress summary for a single subject — bar + lecture stats.

```tsx
interface SubjectProgressProps {
  subject: Subject
  progress: {
    lecturesCompleted: number
    lecturesTotal: number
    quizzesCompleted: number
    quizzesTotal: number
    averageScore?: number
  }
  compact?: boolean
}
```

**Layout:** Subject name + ProgressBar + "X / Y lectures completed" text

---

### `OverallProgress`
**Purpose:** Dashboard widget showing progress across all subjects.

```tsx
interface OverallProgressProps {
  subjects: SubjectProgress[]
  currentSemester: number
  studyDaysThisSemester: number
}
```

**Visuals:** Mini ProgressBar per subject in a list; overall percentage hero number at top

---

### `StudyStreak`
**Purpose:** Gamified streak counter — consecutive days studied.

```tsx
interface StudyStreakProps {
  currentStreak: number    // days
  longestStreak: number
  streakDays: boolean[]    // last 7 days (true = studied)
}
```

**Visuals:** 7-day dot grid (filled = studied), flame icon for active streak  
**Color:** Amber (`color-secondary`) for the streak indicator  
**Motivation text:** "🔥 5-day streak! Keep going!"

---

## Utility Components

### `SearchBar`
**Purpose:** Prominent search input for finding lectures and subjects.

```tsx
interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string    // defaults to "Search lectures..." / "ابحث عن محاضرة..."
  onClear?: () => void
  dir?: 'ltr' | 'rtl'
  autoFocus?: boolean
}
```

**States:** Empty | Focused | With value (shows clear ×) | Loading (spinner in trailing)  
**Notes:** 16px font size — mandatory to prevent iOS Safari zoom on focus.

---

### `FilterPills`
**Purpose:** Horizontal scrollable filter chips for narrowing lecture lists.

```tsx
interface FilterPillsProps {
  filters: Array<{ id: string; label: string; count?: number }>
  activeFilter: string | null
  onFilterChange: (id: string | null) => void
}
```

**Layout:** `overflow-x: auto`, `scrollbar-width: none` — invisible horizontal scroll  
**Variants:** All (no filter) | By week | By type (PDF/Video) | Bookmarked | Completed

---

### `Badge`
**Purpose:** Small label chip for status, categories, counts.

```tsx
interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'coming-soon'
  size?: 'sm' | 'md'
  icon?: LucideIcon
  dot?: boolean          // just a colored dot, no text
}
```

**Coming Soon variant:** Purple (`#7C3AED`) with `Lock` icon, used on locked subjects/features.

---

### `LoadingSpinner`
**Purpose:** Activity indicator for async operations.

```tsx
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'   // 16px | 24px | 40px
  color?: 'primary' | 'white' | 'gray'
  label?: string               // for aria-label (screen reader only)
}
```

**Implementation:** Pure CSS spin animation. Respect `prefers-reduced-motion`.  
**Usage context:** Button loading state, page loading, inline data fetching

---

### `EmptyState`
**Purpose:** Placeholder content when a section has no data.

```tsx
interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
    variant?: 'primary' | 'secondary'
  }
  compact?: boolean
}
```

**Variants / Instances:**
| Context | Icon | Title |
|---|---|---|
| No lectures | `BookOpen` | "لا توجد محاضرات بعد" |
| No quiz history | `Brain` | "لم تبدأ أي اختبار بعد" |
| Search no results | `SearchX` | "لا توجد نتائج" |
| Offline | `WifiOff` | "لا يوجد اتصال بالإنترنت" |
| No bookmarks | `Bookmark` | "لم تحفظ أي محاضرة بعد" |

---

### `ErrorState`
**Purpose:** Error fallback with retry option — for failed API calls and broken views.

```tsx
interface ErrorStateProps {
  error?: Error | string
  onRetry?: () => void
  compact?: boolean
  fullPage?: boolean
}
```

**States:** With retry button | Without retry (permanent error) | Full page | Inline  
**Notes:** Never show raw error messages to users — only "Something went wrong" + retry.

---

### `ComingSoon`
**Purpose:** Overlay or replacement for content not yet available.

```tsx
interface ComingSoonProps {
  featureName?: string
  featureNameAr?: string
  variant?: 'overlay' | 'card' | 'inline'
  expectedDate?: string    // optional "Coming in Week 3"
}
```

**Visual:** Purple-tinted (`color-coming-soon-bg`) background, `Lock` icon, "قريباً" text  
**Overlay variant:** Semi-transparent purple overlay on top of a blurred card preview  
**Usage:** Subjects not yet uploaded, quiz features in development

---

### `BookmarkButton`
**Purpose:** Toggle button to save/unsave a lecture or subject.

```tsx
interface BookmarkButtonProps {
  isBookmarked: boolean
  onToggle: () => void
  size?: 'sm' | 'md'
  showLabel?: boolean
  aria-label?: string
}
```

**States:**
- Unbookmarked: `Bookmark` icon (outline), `color-text-tertiary`
- Bookmarked: `BookmarkCheck` icon (filled), `color-secondary` (amber)
- Toggling: Brief scale animation `spring(stiffness: 400, damping: 20)`

**Accessibility:** Always has `aria-label="Bookmark lecture"` / `"Remove bookmark"`. `aria-pressed` reflects state.

---

## Component Status Legend

| Status | Meaning |
|---|---|
| 🟢 **Defined** | Fully specified, ready to implement |
| 🟡 **Partial** | Core spec done, some edge cases TBD |
| 🔴 **Planned** | In inventory, not yet designed |

| Component | Status |
|---|---|
| AppShell | 🟢 |
| PageContainer | 🟢 |
| SectionHeader | 🟢 |
| TopNavBar | 🟢 |
| BottomNavBar | 🟢 |
| Sidebar | 🟢 |
| Breadcrumb | 🟢 |
| SubjectCard | 🟢 |
| SubjectGrid | 🟢 |
| SubjectDashboard | 🟢 |
| LectureCard | 🟢 |
| LectureViewer | 🟢 |
| PracticalCard | 🟢 |
| PdfViewer | 🟢 |
| QuizCard | 🟢 |
| QuizEngine | 🟢 |
| QuestionDisplay | 🟢 |
| AnswerOption | 🟢 |
| QuizResults | 🟢 |
| ScoreDisplay | 🟢 |
| ProgressBar | 🟢 |
| SubjectProgress | 🟢 |
| OverallProgress | 🟢 |
| StudyStreak | 🟢 |
| SearchBar | 🟢 |
| FilterPills | 🟢 |
| Badge | 🟢 |
| LoadingSpinner | 🟢 |
| EmptyState | 🟢 |
| ErrorState | 🟢 |
| ComingSoon | 🟢 |
| BookmarkButton | 🟢 |

---

**Total components defined: 32** — all 🟢 Fully Specified

---

*Component Inventory v1.0 — Reme's KFU Fifth Semester Platform*  
*Last updated: November 2026*
