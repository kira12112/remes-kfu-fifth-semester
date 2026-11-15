import { openDB, type IDBPDatabase } from 'idb';
import type { UserProgress, SubjectProgress } from '@/types';

const DB_NAME = 'remes-kfu-db';
const DB_VERSION = 1;
const STORE_NAME = 'user-progress';

const DEFAULT_PROGRESS: UserProgress = {
  version: 1,
  subjects: {},
  recentlyViewed: [],
  settings: {
    darkMode: false,
    reducedMotion: false,
    fontSize: 'medium',
  },
};

let dbPromise: Promise<IDBPDatabase> | null = null;

function getDB(): Promise<IDBPDatabase> {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      },
    });
  }
  return dbPromise;
}

export async function getProgress(): Promise<UserProgress> {
  try {
    const db = await getDB();
    const stored = await db.get(STORE_NAME, 'current');
    if (stored) return stored;
  } catch (err) {
    console.warn('IndexedDB read failed, falling back to localStorage', err);
    try {
      const local = localStorage.getItem('remes_progress');
      if (local) return JSON.parse(local);
    } catch {
      // ignore
    }
  }
  return DEFAULT_PROGRESS;
}

export async function saveProgress(progress: UserProgress): Promise<void> {
  try {
    const db = await getDB();
    await db.put(STORE_NAME, progress, 'current');
  } catch (err) {
    console.warn('IndexedDB write failed, falling back to localStorage', err);
  }
  try {
    localStorage.setItem('remes_progress', JSON.stringify(progress));
  } catch {
    // ignore
  }
}

export async function getSubjectProgress(subjectId: string): Promise<SubjectProgress> {
  const progress = await getProgress();
  return (
    progress.subjects[subjectId] || {
      subjectId,
      completedLectures: [],
      completedPracticals: [],
      bookmarkedLectures: [],
      quizAttempts: [],
    }
  );
}

export async function markLectureComplete(subjectId: string, lectureId: string): Promise<void> {
  const progress = await getProgress();
  if (!progress.subjects[subjectId]) {
    progress.subjects[subjectId] = {
      subjectId,
      completedLectures: [],
      completedPracticals: [],
      bookmarkedLectures: [],
      quizAttempts: [],
    };
  }
  if (!progress.subjects[subjectId].completedLectures.includes(lectureId)) {
    progress.subjects[subjectId].completedLectures.push(lectureId);
    progress.subjects[subjectId].lastStudied = new Date().toISOString();
  }
  await saveProgress(progress);
}

export async function toggleBookmark(subjectId: string, lectureId: string): Promise<boolean> {
  const progress = await getProgress();
  if (!progress.subjects[subjectId]) {
    progress.subjects[subjectId] = {
      subjectId,
      completedLectures: [],
      completedPracticals: [],
      bookmarkedLectures: [],
      quizAttempts: [],
    };
  }
  const bookmarks = progress.subjects[subjectId].bookmarkedLectures;
  const idx = bookmarks.indexOf(lectureId);
  let isBookmarked = false;
  if (idx > -1) {
    bookmarks.splice(idx, 1);
    isBookmarked = false;
  } else {
    bookmarks.push(lectureId);
    isBookmarked = true;
  }
  await saveProgress(progress);
  return isBookmarked;
}

export async function recordQuizAttempt(
  subjectId: string,
  attempt: {
    quizId: string;
    score: number;
    correctCount: number;
    totalCount: number;
    incorrectQuestionIds: string[];
    mode: 'practice' | 'exam';
  }
): Promise<void> {
  const progress = await getProgress();
  if (!progress.subjects[subjectId]) {
    progress.subjects[subjectId] = {
      subjectId,
      completedLectures: [],
      completedPracticals: [],
      bookmarkedLectures: [],
      quizAttempts: [],
    };
  }
  progress.subjects[subjectId].quizAttempts.push({
    ...attempt,
    date: new Date().toISOString(),
  });
  progress.subjects[subjectId].lastStudied = new Date().toISOString();
  await saveProgress(progress);
}

export async function addRecentlyViewed(lectureId: string): Promise<void> {
  const progress = await getProgress();
  const filtered = progress.recentlyViewed.filter(id => id !== lectureId);
  filtered.unshift(lectureId);
  progress.recentlyViewed = filtered.slice(0, 10);
  await saveProgress(progress);
}
