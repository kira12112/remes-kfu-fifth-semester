import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Bookmark,
  CheckCircle2,
  Clock,
  BookOpen,
  Sparkles,
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  FileText,
  BookmarkCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { markLectureComplete, toggleBookmark, getSubjectProgress, addRecentlyViewed } from '@/lib/db';
import type { Lecture } from '@/types';

interface LectureViewerProps {
  lecture: Lecture;
  previousLectureId?: string;
  nextLectureId?: string;
  subjectCode: string;
}

export function LectureViewer({
  lecture,
  previousLectureId,
  nextLectureId,
  subjectCode,
}: LectureViewerProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // Add to recently viewed
    addRecentlyViewed(lecture.id);

    // Fetch initial progress state
    getSubjectProgress(lecture.subjectId).then(sp => {
      setIsCompleted(sp.completedLectures.includes(lecture.id));
      setIsBookmarked(sp.bookmarkedLectures.includes(lecture.id));
    });
  }, [lecture.id, lecture.subjectId]);

  const handleToggleComplete = async () => {
    await markLectureComplete(lecture.subjectId, lecture.id);
    setIsCompleted(true);
  };

  const handleToggleBookmark = async () => {
    const bookmarked = await toggleBookmark(lecture.subjectId, lecture.id);
    setIsBookmarked(bookmarked);
  };

  return (
    <article className="max-w-4xl mx-auto space-y-8">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-primary-700 uppercase bg-primary-50 px-2 py-0.5 rounded border border-primary-200/50">
              {subjectCode}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              {lecture.estimatedMinutes || 30} mins
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Bookmark button */}
            <button
              type="button"
              onClick={handleToggleBookmark}
              className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                isBookmarked
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
              }`}
              title="Bookmark lecture"
              aria-label="Bookmark lecture"
            >
              {isBookmarked ? (
                <>
                  <BookmarkCheck className="w-4 h-4 text-amber-600" />
                  <span className="hidden sm:inline">Bookmarked</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4 text-stone-400" />
                  <span className="hidden sm:inline">Bookmark</span>
                </>
              )}
            </button>

            {/* Mark complete button */}
            <button
              type="button"
              onClick={handleToggleComplete}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs ${
                isCompleted
                  ? 'bg-emerald-600 text-white'
                  : 'bg-primary-700 text-white hover:bg-primary-800'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? 'Completed' : 'Mark Completed'}</span>
            </button>
          </div>
        </div>

        {/* Lecture Titles */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-snug">
            {lecture.titleEn}
          </h1>
          {lecture.titleAr && (
            <p className="arabic-text text-lg text-primary-800 font-semibold mt-1">
              {lecture.titleAr}
            </p>
          )}
        </div>

        {/* Source Mapping Badge */}
        {lecture.sourceReference && (
          <div className="bg-stone-50 rounded-xl p-3 border border-stone-200/80 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-stone-600">
              <FileText className="w-4 h-4 text-primary-600" />
              <span className="font-semibold text-stone-700">Source Book:</span>
              <span className="font-mono text-stone-600 truncate max-w-xs">
                {lecture.sourceReference.pdfFile}
              </span>
            </div>
            <span className="font-mono text-stone-500 bg-white px-2 py-0.5 rounded border border-stone-200">
              Pages {lecture.sourceReference.pageStart}–{lecture.sourceReference.pageEnd || lecture.sourceReference.pageStart + 10}
            </span>
          </div>
        )}
      </div>

      {/* Learning Objectives Box */}
      {lecture.objectives && lecture.objectives.length > 0 && (
        <section className="bg-primary-50/60 rounded-2xl border border-primary-200/70 p-6 space-y-3">
          <div className="flex items-center gap-2 text-primary-900 font-bold text-sm tracking-wide uppercase">
            <Sparkles className="w-4 h-4 text-primary-700" />
            <span>Learning Objectives · أهداف المحاضرة</span>
          </div>
          <ul className="space-y-2.5">
            {lecture.objectives.map((obj, i) => (
              <li key={obj.id || i} className="flex items-start gap-3 text-sm">
                <span className="w-5 h-5 rounded-full bg-primary-200/70 text-primary-900 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <div className="space-y-1">
                  <p className="font-medium text-stone-800">{obj.textEn}</p>
                  {obj.textAr && (
                    <p className="arabic-text text-xs text-primary-900/80">{obj.textAr}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Main Sections */}
      <div className="space-y-6">
        {lecture.sections.map((sec, sIdx) => (
          <section
            key={sec.id || sIdx}
            className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-8 space-y-4"
          >
            <div>
              <h2 className="text-xl font-bold text-stone-900">
                {sec.titleEn}
              </h2>
              {sec.titleAr && (
                <p className="arabic-text text-sm text-stone-500 mt-0.5">
                  {sec.titleAr}
                </p>
              )}
            </div>

            {/* Section Content Blocks */}
            <div className="space-y-4 text-stone-800 leading-relaxed text-sm sm:text-base">
              {sec.content.map((block, bIdx) => {
                if (block.type === 'important') {
                  return (
                    <div
                      key={bIdx}
                      className="p-4 sm:p-5 rounded-xl bg-amber-50/80 border-l-4 border-amber-500 space-y-2 text-sm"
                    >
                      <div className="font-bold text-amber-900 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                        <span>Clinical Pearl / نقطة امتحانية هامة</span>
                      </div>
                      <p className="text-stone-800 font-medium">{block.textEn}</p>
                      {block.textAr && (
                        <p className="arabic-text text-stone-700 bg-white/60 p-2.5 rounded-lg border border-amber-100">
                          {block.textAr}
                        </p>
                      )}
                    </div>
                  );
                }

                if (block.type === 'table' && block.tableData) {
                  return (
                    <div key={bIdx} className="overflow-x-auto my-4 rounded-xl border border-stone-200">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead className="bg-stone-50 border-b border-stone-200 text-stone-700 font-semibold">
                          <tr>
                            {block.tableData.headers.map((h, hIdx) => (
                              <th key={hIdx} className="p-3 whitespace-nowrap">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                          {block.tableData.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-stone-50/50">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="p-3 text-stone-700">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }

                return (
                  <div key={bIdx} className="space-y-2.5">
                    {block.textEn && (
                      <p className="text-stone-800 leading-relaxed font-sans">
                        {block.textEn}
                      </p>
                    )}
                    {block.textAr && (
                      <div className="arabic-text text-stone-700 text-sm leading-loose bg-stone-50/80 p-4 rounded-xl border border-stone-200/60 shadow-xs">
                        {block.textAr}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Terminology Glossary */}
      {lecture.glossary && lecture.glossary.length > 0 && (
        <section className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-8 space-y-4">
          <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary-600" />
            <span>Terminology Glossary · مصطلحات طبية أساسية</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {lecture.glossary.map((g, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900 text-sm font-sans">{g.termEn}</span>
                  {g.termAr && (
                    <span className="arabic-text text-xs text-primary-700 font-semibold">{g.termAr}</span>
                  )}
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">{g.definitionEn}</p>
                {g.definitionAr && (
                  <p className="arabic-text text-xs text-stone-500 pt-1 border-t border-stone-200/50">{g.definitionAr}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Key Points Summary */}
      {lecture.keyPoints && lecture.keyPoints.length > 0 && (
        <section className="bg-emerald-50/50 rounded-2xl border border-emerald-200/70 p-6 space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Key Takeaways · نقاط تلخيصية للمراجعة السريعة</span>
          </h3>
          <ul className="space-y-2">
            {lecture.keyPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Related Quiz CTA */}
      {lecture.relatedQuizId && (
        <div className="bg-gradient-to-r from-primary-700 to-primary-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div>
            <h3 className="text-xl font-bold mb-1">اختبري فهمك للمحاضرة</h3>
            <p className="text-primary-100 text-xs sm:text-sm">
              Practice questions directly grounded in this lecture's KFU exam topics.
            </p>
          </div>
          <Link to={`/subjects/${lecture.subjectId}/quiz/${lecture.relatedQuizId}`}>
            <Button variant="secondary" className="whitespace-nowrap font-bold shadow-sm">
              <HelpCircle className="w-4 h-4 mr-2 text-primary-700" /> Start Quiz Now
            </Button>
          </Link>
        </div>
      )}

      {/* Navigation Footer: Prev / Next Lecture */}
      <div className="flex items-center justify-between pt-6 border-t border-stone-200">
        {previousLectureId ? (
          <Link to={`/subjects/${lecture.subjectId}/lectures/${previousLectureId}`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-1.5" /> Previous Lecture
            </Button>
          </Link>
        ) : (
          <div />
        )}

        {nextLectureId ? (
          <Link to={`/subjects/${lecture.subjectId}/lectures/${nextLectureId}`}>
            <Button variant="primary" size="sm">
              Next Lecture <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        ) : (
          <Link to={`/subjects/${lecture.subjectId}`}>
            <Button variant="secondary" size="sm">
              Back to Subject Dashboard
            </Button>
          </Link>
        )}
      </div>
    </article>
  );
}
