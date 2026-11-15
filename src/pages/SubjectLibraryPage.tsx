import { useState, useMemo, useEffect } from 'react';
import { Search } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { SubjectCard } from '@/components/subject/SubjectCard';
import { SearchBar } from '@/components/ui/SearchBar';
import { EmptyState } from '@/components/ui/EmptyState';
import { getProgress } from '@/lib/db';
import semesterData from '../../content/courses/fifth-semester.json';
import type { Subject, AvailabilityStatus, UserProgress } from '@/types';

const subjects = semesterData.subjects as Subject[];

type FilterType = 'all' | AvailabilityStatus;

const filterTabs: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All Subjects (12)' },
  { key: 'available', label: 'Available' },
  { key: 'coming-soon', label: 'Coming Soon' },
];

export function SubjectLibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    getProgress().then(setProgress);
  }, []);

  const filtered = useMemo(() => {
    return subjects.filter(subject => {
      const matchesFilter =
        activeFilter === 'all' || subject.status === activeFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        subject.titleEn.toLowerCase().includes(q) ||
        subject.code.toLowerCase().includes(q) ||
        (subject.titleAr && subject.titleAr.includes(q)) ||
        subject.descriptionEn.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [searchQuery, activeFilter]);

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Subject Library
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm mt-1">
            Complete curriculum directory for KFU Fifth Semester (Dentistry)
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="max-w-md w-full">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Filter by subject code, title or keywords..."
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
            {filterTabs.map(tab => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveFilter(tab.key)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  activeFilter === tab.key
                    ? 'bg-primary-700 text-white border-primary-700 shadow-xs'
                    : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        {filtered.length === 0 ? (
          <EmptyState
            icon={<Search className="w-12 h-12 text-stone-300" />}
            title="No matching subjects found"
            description={`We couldn't find any courses matching "${searchQuery}". Try searching by subject code (e.g., "DM.5 PHARM" or "Caries").`}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filtered.map(subject => {
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
        )}
      </div>
    </AppShell>
  );
}
