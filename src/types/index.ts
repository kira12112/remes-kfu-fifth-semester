// ===== CORE TYPES =====

export type AvailabilityStatus = 'available' | 'coming-soon' | 'in-progress' | 'completed';

export type ContentType = 'theoretical' | 'practical' | 'mixed';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface SourceReference {
  pdfFile: string;
  pageStart: number;
  pageEnd?: number;
  section?: string;
  confidence: 'verified' | 'inferred' | 'unassigned';
}

// ===== SUBJECT =====

export interface Subject {
  id: string;                    // e.g. "dm5-car-hard-dent"
  code: string;                  // e.g. "DM.5 CAR HARD DENT"
  titleEn: string;               // Official English title
  titleAr?: string;              // Arabic title (optional)
  descriptionEn: string;         // Brief English description
  descriptionAr?: string;        // Brief Arabic description
  icon: string;                  // Lucide icon name
  color: string;                 // Tailwind color class
  status: AvailabilityStatus;
  sourceFiles: string[];         // PDF filenames assigned to this subject
  theoreticalCount: number;      // Number of theoretical lectures
  practicalCount: number;        // Number of practical sessions
  estimatedHours?: number;
  prerequisites?: string[];      // Other subject IDs
  order: number;                 // Display order (1-12)
}

// ===== LECTURE =====

export interface LectureSection {
  id: string;
  titleEn: string;
  titleAr?: string;
  content: LectureContent[];
  subsections?: LectureSection[];
}

export interface LectureContent {
  type: 'paragraph' | 'heading' | 'list' | 'table' | 'image' | 'important' | 'definition';
  textEn?: string;
  textAr?: string;              // Egyptian Arabic explanation
  items?: string[];             // For lists
  tableData?: { headers: string[]; rows: string[][] };
  imageUrl?: string;
  caption?: string;
}

export interface LectureObjective {
  id: string;
  textEn: string;
  textAr?: string;
}

export interface GlossaryTerm {
  termEn: string;
  termAr?: string;
  definitionEn: string;
  definitionAr?: string;
}

export interface Lecture {
  id: string;
  subjectId: string;
  type: ContentType;
  titleEn: string;
  titleAr?: string;
  order: number;
  objectives: LectureObjective[];
  sections: LectureSection[];
  glossary: GlossaryTerm[];
  keyPoints: string[];
  sourceReference: SourceReference;
  status: AvailabilityStatus;
  estimatedMinutes?: number;
  relatedQuizId?: string;
  tags?: string[];
}

// ===== QUIZ =====

export interface QuizOption {
  id: string;
  textEn: string;
  textAr?: string;
}

export interface QuizQuestion {
  id: string;
  subjectId: string;
  lectureId?: string;
  textEn: string;
  textAr?: string;
  options: QuizOption[];
  correctOptionId: string;
  explanationEn: string;
  explanationAr?: string;
  difficulty: DifficultyLevel;
  sourceReference?: SourceReference;
  tags?: string[];
}

export interface Quiz {
  id: string;
  subjectId: string;
  lectureId?: string;
  titleEn: string;
  titleAr?: string;
  description?: string;
  questions: QuizQuestion[];
  estimatedMinutes?: number;
}

// ===== PROGRESS =====

export interface SubjectProgress {
  subjectId: string;
  completedLectures: string[];
  completedPracticals: string[];
  bookmarkedLectures: string[];
  quizAttempts: QuizAttempt[];
  lastStudied?: string;         // ISO date string
}

export interface QuizAttempt {
  quizId: string;
  date: string;                  // ISO date string
  score: number;                 // 0-100
  correctCount: number;
  totalCount: number;
  incorrectQuestionIds: string[];
  timeSpentSeconds?: number;
  mode: 'practice' | 'exam';
}

export interface UserProgress {
  version: number;
  subjects: Record<string, SubjectProgress>;
  recentlyViewed: string[];      // lecture IDs, most recent first
  settings: {
    darkMode: boolean;
    reducedMotion: boolean;
    fontSize: 'small' | 'medium' | 'large';
  };
}
