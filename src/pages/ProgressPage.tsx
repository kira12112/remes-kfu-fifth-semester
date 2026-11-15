import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  BookOpen,
  Bookmark,
  CheckCircle2,
  ChevronRight,
  Database,
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { getProgress } from '@/lib/db';
import semesterData from '../../content/courses/fifth-semester.json';
import type { Subject, UserProgress } from '@/types';

const subjects = semesterData.subjects as Subject[];

export function ProgressPage() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    getProgress().then(setProgress);
  }, []);

  const availableSubjects = subjects.filter(s => s.status === 'available');

  let totalCompletedLectures = 0;
  let totalBookmarks = 0;
  let totalQuizAttempts = 0;

  if (progress) {
    Object.values(progress.subjects).forEach(sp => {
      totalCompletedLectures += sp.completedLectures?.length || 0;
      totalBookmarks += sp.bookmarkedLectures?.length || 0;
      totalQuizAttempts += sp.quizAttempts?.length || 0;
    });
  }

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Study Progress & Learning Analytics
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm mt-1">
            Real-time tracking of lectures, bookmarks, and quiz attempts for Riham
          </p>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm text-center space-y-1">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto mb-2 border border-teal-100">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-stone-900">
              {totalCompletedLectures}
            </div>
            <div className="text-xs text-stone-500 font-medium">Completed Lectures</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm text-center space-y-1">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mx-auto mb-2 border border-purple-100">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-stone-900">
              {totalQuizAttempts}
            </div>
            <div className="text-xs text-stone-500 font-medium">Quiz Attempts</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm text-center space-y-1">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-2 border border-amber-100">
              <Bookmark className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-stone-900">
              {totalBookmarks}
            </div>
            <div className="text-xs text-stone-500 font-medium">Bookmarked</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm text-center space-y-1">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center mx-auto mb-2 border border-sky-100">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-stone-900">
              {availableSubjects.length} / 12
            </div>
            <div className="text-xs text-stone-500 font-medium">Active Subjects</div>
          </div>
        </div>

        {/* Per-Subject Breakdown */}
        <section className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-8 space-y-5">
          <div>
            <h2 className="text-lg font-bold text-stone-900">
              Subject Mastery Breakdown
            </h2>
            <p className="text-xs text-stone-500">
              Progress per course based on completed verified lectures
            </p>
          </div>

          <div className="space-y-4">
            {availableSubjects.map(subject => {
              const sp = progress?.subjects[subject.id];
              const completedCount = sp?.completedLectures.length || 0;
              const totalLec = subject.theoreticalCount || 1;
              const percent = Math.min(100, Math.round((completedCount / totalLec) * 100));

              return (
                <div
                  key={subject.id}
                  className="p-4 rounded-xl border border-stone-100 bg-stone-50/50 space-y-2 hover:bg-stone-50 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <div>
                      <span className="font-mono font-bold text-primary-700 mr-2 uppercase">
                        {subject.code}
                      </span>
                      <span className="font-semibold text-stone-900">
                        {subject.titleEn}
                      </span>
                    </div>
                    <span className="font-bold text-stone-700">{percent}%</span>
                  </div>

                  <ProgressBar value={percent} size="sm" />

                  <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
                    <span>{completedCount} of {totalLec} lectures finished</span>
                    <Link
                      to={`/subjects/${subject.id}`}
                      className="text-primary-700 hover:underline font-semibold flex items-center gap-0.5"
                    >
                      Study <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Local Persistence & Privacy Disclaimer */}
        <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 text-xs text-stone-500 space-y-2">
          <div className="flex items-center gap-2 font-bold text-stone-700">
            <Database className="w-4 h-4 text-primary-700" />
            <span>Local Storage & Device Persistence Note</span>
          </div>
          <p className="leading-relaxed">
            All your reading progress, lecture bookmarks, and quiz scores are securely persisted inside your browser's local IndexedDB database. No login or external tracking is required. Please note that clearing browser site data will reset your local study analytics.
          </p>
          <p className="arabic-text text-stone-600 bg-white p-3 rounded-xl border border-stone-200/60 leading-relaxed">
            بياناتك وتقدمك الدراسي محفوظان محلياً على جهازك دون الحاجة لتسجيل دخول، ولا يتم نقل أي بيانات إلى خوادم خارجية حفاظاً على خصوصيتك وسرعة التصفح.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
