import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, FileText, ChevronRight, Sparkles } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { SearchBar } from '@/components/ui/SearchBar';
import { EmptyState } from '@/components/ui/EmptyState';
import semesterData from '../../content/courses/fifth-semester.json';
import type { Subject, Lecture } from '@/types';

const lectureModules = import.meta.glob('../../content/lectures/*.json', { eager: true });
const lectures: Lecture[] = [];

for (const path in lectureModules) {
  const mod = lectureModules[path] as { default?: Lecture } | Lecture;
  const lec = ('default' in mod && mod.default ? mod.default : mod) as Lecture;
  if (lec && lec.id) {
    lectures.push(lec);
  }
}

const subjects = semesterData.subjects as Subject[];

export function SearchPage() {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return { subjects: [], lectures: [], terms: [] };

    // Search subjects
    const matchingSubjects = subjects.filter(
      s =>
        s.titleEn.toLowerCase().includes(q) ||
        s.code.toLowerCase().includes(q) ||
        (s.titleAr && s.titleAr.includes(q)) ||
        s.descriptionEn.toLowerCase().includes(q)
    );

    // Search lectures
    const matchingLectures = lectures.filter(
      l =>
        l.titleEn.toLowerCase().includes(q) ||
        (l.titleAr && l.titleAr.includes(q)) ||
        l.keyPoints?.some(k => k.toLowerCase().includes(q))
    );

    // Search glossary terms
    const matchingTerms: {
      termEn: string;
      termAr?: string;
      definitionEn: string;
      definitionAr?: string;
      lectureId: string;
      subjectId: string;
    }[] = [];
    lectures.forEach(l => {
      l.glossary?.forEach(g => {
        if (
          g.termEn.toLowerCase().includes(q) ||
          (g.termAr && g.termAr.includes(q)) ||
          g.definitionEn.toLowerCase().includes(q)
        ) {
          matchingTerms.push({
            ...g,
            lectureId: l.id,
            subjectId: l.subjectId,
          });
        }
      });
    });

    return {
      subjects: matchingSubjects,
      lectures: matchingLectures,
      terms: matchingTerms,
    };
  }, [query]);

  const totalHits =
    searchResults.subjects.length +
    searchResults.lectures.length +
    searchResults.terms.length;

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Global Curriculum Search
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm mt-1">
            Instant search across all 12 subjects, verified lectures, and medical glossaries
          </p>
        </div>

        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search e.g. 'Xerostomia', 'Bioavailability', 'Bitewing', 'Hypersensitivity'..."
        />

        {!query.trim() ? (
          <div className="py-16 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
              <Search className="w-8 h-8 opacity-40" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-stone-700">Type any medical keyword</h3>
              <p className="text-xs text-stone-400 max-w-sm mx-auto">
                Search courses, clinical definitions, Egyptian Arabic summaries, and exam topics.
              </p>
            </div>
          </div>
        ) : totalHits === 0 ? (
          <EmptyState
            icon={<Search className="w-12 h-12 text-stone-300" />}
            title="No matching records found"
            description={`No medical terms or lectures matched "${query}". Check your spelling or try another English or Arabic query.`}
          />
        ) : (
          <div className="space-y-8">
            <div className="text-xs font-semibold text-stone-500 pb-2 border-b border-stone-200">
              Found {totalHits} result{totalHits > 1 ? 's' : ''} for "{query}"
            </div>

            {/* Matching Subjects */}
            {searchResults.subjects.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-primary-700" />
                  <span>Subjects ({searchResults.subjects.length})</span>
                </h2>
                <div className="space-y-2">
                  {searchResults.subjects.map(s => (
                    <Link
                      key={s.id}
                      to={`/subjects/${s.id}`}
                      className="block p-4 rounded-xl bg-white border border-stone-200 hover:border-primary-300 hover:shadow-xs transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-mono text-xs font-bold text-primary-700 uppercase">
                            {s.code}
                          </span>
                          <h3 className="font-bold text-stone-900 text-sm mt-0.5">
                            {s.titleEn}
                          </h3>
                        </div>
                        <ChevronRight className="w-4 h-4 text-stone-400" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Matching Lectures */}
            {searchResults.lectures.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-primary-700" />
                  <span>Lectures ({searchResults.lectures.length})</span>
                </h2>
                <div className="space-y-2">
                  {searchResults.lectures.map(l => (
                    <Link
                      key={l.id}
                      to={`/subjects/${l.subjectId}/lectures/${l.id}`}
                      className="block p-4 rounded-xl bg-white border border-stone-200 hover:border-primary-300 hover:shadow-xs transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-stone-900 text-sm">
                            {l.titleEn}
                          </h3>
                          {l.titleAr && (
                            <p className="arabic-text text-xs text-stone-500 mt-0.5">
                              {l.titleAr}
                            </p>
                          )}
                        </div>
                        <ChevronRight className="w-4 h-4 text-stone-400" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Matching Glossary Terms */}
            {searchResults.terms.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Medical Terms ({searchResults.terms.length})</span>
                </h2>
                <div className="space-y-2">
                  {searchResults.terms.map((t, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/70 space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-stone-900 text-sm font-sans">{t.termEn}</span>
                        {t.termAr && (
                          <span className="arabic-text text-primary-800 font-semibold">{t.termAr}</span>
                        )}
                      </div>
                      <p className="text-stone-700 leading-relaxed">{t.definitionEn}</p>
                      {t.definitionAr && (
                        <p className="arabic-text text-stone-600 pt-1 border-t border-amber-100">{t.definitionAr}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AppShell>
  );
}
