import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Search,
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { SubjectCard } from '@/components/subject/SubjectCard';
import { Button } from '@/components/ui/Button';
import { getProgress } from '@/lib/db';
import semesterData from '../../content/courses/fifth-semester.json';
import type { Subject, UserProgress } from '@/types';

const subjects = semesterData.subjects as Subject[];

export function HomePage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'available' | 'coming-soon'>('all');
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    getProgress().then(setProgress);
  }, []);

  const availableSubjects = subjects.filter(s => s.status === 'available');
  const comingSoonSubjects = subjects.filter(s => s.status === 'coming-soon');

  const displayedSubjects = subjects.filter(s => {
    if (activeFilter === 'available') return s.status === 'available';
    if (activeFilter === 'coming-soon') return s.status === 'coming-soon';
    return true;
  });

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-10">
        {/* Hero Section: Personal Welcome for Riham */}
        <section className="relative rounded-3xl bg-gradient-to-br from-primary-800 via-primary-900 to-teal-950 text-white p-6 sm:p-10 md:p-12 shadow-xl overflow-hidden">
          {/* Subtle decorative background shapes */}
          <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-primary-600/20 blur-3xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-teal-500/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-primary-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Kazan Federal University · Doctor of Medicine (Dentistry)</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                مرحباً يا ريهام 👋
              </h1>
              <p className="text-primary-100 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
                منصتك الأكاديمية الشاملة للفصل الدراسي الخامس بجامعة كازان الفيدرالية. شروحات مفصلة باللهجة المصرية مع الحفاظ الكامل على المصطلحات الطبية الإنجليزية، والمراجع الرسمية، وبنوك الأسئلة التفاعلية.
              </p>
            </div>

            {/* Quick Summary Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/15 text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-white">
                  {availableSubjects.length}
                </div>
                <div className="text-[11px] sm:text-xs text-primary-200 font-medium mt-0.5">
                  Available Subjects
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/15 text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-300">
                  {subjects.length}
                </div>
                <div className="text-[11px] sm:text-xs text-primary-200 font-medium mt-0.5">
                  Official Courses
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/15 text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-300">
                  14
                </div>
                <div className="text-[11px] sm:text-xs text-primary-200 font-medium mt-0.5">
                  Source Textbooks
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link to="/subjects">
                <Button variant="secondary" className="font-bold text-primary-950 shadow-md">
                  Explore All Subjects <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
              <Link to="/search">
                <Button variant="outline" className="text-white border-white/30 hover:bg-white/10">
                  <Search className="w-4 h-4 mr-1.5" /> Search Topics
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Continue Learning Callout for Active Topics */}
        <section className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-100 flex-shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase text-primary-700 tracking-wider">
                Featured Verified Lecture · Cariology
              </div>
              <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
                Diagnosis for Dental Caries and Hard Tissue Diseases
              </h3>
              <p className="arabic-text text-xs text-stone-500 mt-0.5">
                فحص البقع البيضاء، التفرقة بين التسوس النشط والمتوقف، وطرق التشخيص السريرية
              </p>
            </div>
          </div>

          <Link to="/subjects/dm5-car-hard-dent/lectures/dm5-car-hard-dent-lec-01" className="w-full md:w-auto">
            <Button variant="primary" className="w-full md:w-auto font-bold shadow-xs whitespace-nowrap">
              Study Lecture 01 <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </section>

        {/* Subjects Grid Section */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                Official 5th Semester Subjects
              </h2>
              <p className="text-xs sm:text-sm text-stone-500">
                12 official university subjects categorized by availability
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex gap-1.5 bg-stone-100/80 p-1 rounded-xl self-start sm:self-auto border border-stone-200/60">
              {[
                { id: 'all', label: `All (${subjects.length})` },
                { id: 'available', label: `Available (${availableSubjects.length})` },
                { id: 'coming-soon', label: `Coming Soon (${comingSoonSubjects.length})` },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeFilter === tab.id
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {displayedSubjects.map(subject => {
              const sp = progress?.subjects[subject.id];
              const completedCount = sp?.completedLectures.length || 0;
              const totalLec = subject.theoreticalCount || 1;
              const calcProgress = Math.round((completedCount / totalLec) * 100);

              return (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  progress={calcProgress}
                />
              );
            })}
          </div>
        </section>

        {/* Footer info note */}
        <footer className="pt-6 border-t border-stone-200 text-center space-y-1 text-xs text-stone-400">
          <p>Reme's KFU Fifth Semester Platform · Engineered with precision for Riham</p>
          <p className="arabic-text">
            جميع المواد التعليمية مستندة إلى المناهج والكتب الأصلية لجامعة كازان الفيدرالية
          </p>
        </footer>
      </div>
    </AppShell>
  );
}
