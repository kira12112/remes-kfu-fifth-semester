import { useState, useEffect } from 'react';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Award,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { recordQuizAttempt } from '@/lib/db';
import type { Quiz, QuizQuestion, DifficultyLevel } from '@/types';

interface QuizEngineProps {
  quiz: Quiz;
  subjectId: string;
  onFinish?: (score: number) => void;
}

export function QuizEngine({ quiz, subjectId, onFinish }: QuizEngineProps) {
  const [mode, setMode] = useState<'practice' | 'exam'>('practice');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | DifficultyLevel>('all');
  const [filteredQuestions, setFilteredQuestions] = useState<QuizQuestion[]>(quiz.questions);
  const [currentIndex, setCurrentIndex] = useState(0);

  // User answers map: questionId -> selectedOptionId
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Timer in seconds (for exam mode)
  const [secondsRemaining, setSecondsRemaining] = useState<number>(
    (quiz.estimatedMinutes || 10) * 60
  );
  const [timerActive, setTimerActive] = useState(false);

  // Filter effect
  useEffect(() => {
    let q = quiz.questions;
    if (difficultyFilter !== 'all') {
      q = q.filter(item => item.difficulty === difficultyFilter);
    }
    setFilteredQuestions(q.length > 0 ? q : quiz.questions);
    setCurrentIndex(0);
    setUserAnswers({});
    setIsSubmitted(false);
  }, [difficultyFilter, quiz]);

  // Exam timer effect
  useEffect(() => {
    if (mode === 'exam' && !isSubmitted && timerActive && secondsRemaining > 0) {
      const interval = setInterval(() => {
        setSecondsRemaining(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            handleFinalSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [mode, isSubmitted, timerActive, secondsRemaining]);

  const currentQ = filteredQuestions[currentIndex];
  if (!currentQ) return null;

  const selectedOptionId = userAnswers[currentQ.id];
  const isAnswered = Boolean(selectedOptionId);
  const isCurrentCorrect = selectedOptionId === currentQ.correctOptionId;

  const handleSelectOption = (optionId: string) => {
    if (isSubmitted && mode === 'exam') return;

    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  };

  const handleFinalSubmit = async () => {
    setIsSubmitted(true);
    setTimerActive(false);

    // Calculate score
    let correct = 0;
    const incorrectIds: string[] = [];
    filteredQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correctOptionId) {
        correct++;
      } else {
        incorrectIds.push(q.id);
      }
    });

    const score = Math.round((correct / filteredQuestions.length) * 100);

    await recordQuizAttempt(subjectId, {
      quizId: quiz.id,
      score,
      correctCount: correct,
      totalCount: filteredQuestions.length,
      incorrectQuestionIds: incorrectIds,
      mode,
    });

    if (onFinish) onFinish(score);
  };

  const handleReset = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setCurrentIndex(0);
    setSecondsRemaining((quiz.estimatedMinutes || 10) * 60);
    setTimerActive(mode === 'exam');
  };

  const handleRetryIncorrect = () => {
    const incorrectList = filteredQuestions.filter(
      q => userAnswers[q.id] !== q.correctOptionId
    );
    if (incorrectList.length > 0) {
      setFilteredQuestions(incorrectList);
      setUserAnswers({});
      setIsSubmitted(false);
      setCurrentIndex(0);
    }
  };

  // Format timer MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Summary statistics
  const totalCorrect = filteredQuestions.filter(
    q => userAnswers[q.id] === q.correctOptionId
  ).length;
  const scorePercent = Math.round((totalCorrect / filteredQuestions.length) * 100);

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden">
      {/* Quiz Top Bar */}
      <div className="bg-stone-50/80 px-4 sm:px-6 py-4 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-stone-900 text-base sm:text-lg">
              {quiz.titleEn}
            </h2>
            <Badge variant="default" size="sm">
              {filteredQuestions.length} Questions
            </Badge>
          </div>
          {quiz.titleAr && (
            <p className="arabic-text text-xs text-stone-500 mt-0.5">{quiz.titleAr}</p>
          )}
        </div>

        {/* Controls: Mode Switcher & Difficulty */}
        <div className="flex items-center gap-2">
          {/* Mode toggle */}
          <div className="flex bg-stone-200/70 p-0.5 rounded-lg text-xs font-medium">
            <button
              type="button"
              onClick={() => {
                setMode('practice');
                setTimerActive(false);
              }}
              className={`px-3 py-1 rounded-md transition-colors ${
                mode === 'practice'
                  ? 'bg-white text-primary-800 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Practice
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('exam');
                setTimerActive(true);
              }}
              className={`px-3 py-1 rounded-md transition-colors ${
                mode === 'exam'
                  ? 'bg-white text-primary-800 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Exam
            </button>
          </div>

          {/* Difficulty filter */}
          <select
            value={difficultyFilter}
            onChange={e => setDifficultyFilter(e.target.value as any)}
            className="text-xs bg-white border border-stone-200 rounded-lg px-2.5 py-1 text-stone-700 font-medium focus:ring-1 focus:ring-primary-600"
            aria-label="Filter by difficulty"
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          {/* Exam timer */}
          {mode === 'exam' && !isSubmitted && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 text-xs font-mono font-bold border border-amber-200">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTime(secondsRemaining)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Progress Line */}
      <div className="px-4 sm:px-6 pt-3">
        <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5 font-medium">
          <span>Question {currentIndex + 1} of {filteredQuestions.length}</span>
          <span>
            {Object.keys(userAnswers).length} answered
          </span>
        </div>
        <ProgressBar
          value={((currentIndex + 1) / filteredQuestions.length) * 100}
          size="sm"
        />
      </div>

      {/* Question Number Pills Carousel */}
      <div className="px-4 sm:px-6 py-3 flex gap-1.5 overflow-x-auto scrollbar-hide border-b border-stone-100">
        {filteredQuestions.map((q, idx) => {
          const ans = userAnswers[q.id];
          const isCurr = idx === currentIndex;
          let color = 'bg-stone-100 text-stone-600 hover:bg-stone-200';

          if (isSubmitted || mode === 'practice') {
            if (ans) {
              color = ans === q.correctOptionId ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-rose-100 text-rose-800 border-rose-300';
            }
          } else if (ans) {
            color = 'bg-primary-100 text-primary-800 font-bold';
          }

          return (
            <button
              key={q.id}
              onClick={() => setCurrentIndex(idx)}
              className={`w-7 h-7 flex-shrink-0 rounded-lg text-xs font-semibold flex items-center justify-center transition-all ${color} ${
                isCurr ? 'ring-2 ring-primary-600 ring-offset-1 font-bold' : ''
              }`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Main Body: Score Report OR Active Question */}
      {isSubmitted && mode === 'exam' ? (
        /* Results View */
        <div className="p-6 sm:p-8 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-primary-50 text-primary-700 flex items-center justify-center mx-auto border-4 border-primary-100 shadow-sm">
            <Award className="w-10 h-10" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-stone-900 mb-1">Exam Completed!</h3>
            <p className="text-stone-500 text-sm">Here is your performance breakdown</p>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
              <div className="text-2xl font-bold text-stone-900">{scorePercent}%</div>
              <div className="text-xs text-stone-500 mt-1">Final Score</div>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
              <div className="text-2xl font-bold text-emerald-700">{totalCorrect}</div>
              <div className="text-xs text-emerald-600 mt-1">Correct</div>
            </div>
            <div className="bg-rose-50 p-4 rounded-xl border border-rose-100">
              <div className="text-2xl font-bold text-rose-700">
                {filteredQuestions.length - totalCorrect}
              </div>
              <div className="text-xs text-rose-600 mt-1">Incorrect</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Exam
            </Button>
            {filteredQuestions.length - totalCorrect > 0 && (
              <Button variant="primary" onClick={handleRetryIncorrect}>
                <Sparkles className="w-4 h-4 mr-2" />
                Review & Retry Incorrect
              </Button>
            )}
            <Button
              variant="secondary"
              onClick={() => {
                setMode('practice');
                setIsSubmitted(false);
              }}
            >
              Browse with Full Explanations
            </Button>
          </div>
        </div>
      ) : (
        /* Question Card */
        <div className="p-4 sm:p-6 space-y-6">
          {/* Question Prompt */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-stone-100 text-stone-600 font-semibold">
                {currentQ.difficulty}
              </span>
              {currentQ.sourceReference && (
                <span className="text-[11px] text-stone-400 flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  {currentQ.sourceReference.pdfFile.split('_')[0]} (p.{currentQ.sourceReference.pageStart})
                </span>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
              {currentQ.textEn}
            </h3>

            {currentQ.textAr && (
              <p className="arabic-text text-sm text-stone-600 leading-relaxed bg-stone-50/60 p-3 rounded-xl border border-stone-100">
                {currentQ.textAr}
              </p>
            )}
          </div>

          {/* Options List */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, oIdx) => {
              const letter = String.fromCharCode(65 + oIdx);
              const isSelected = selectedOptionId === opt.id;
              const isCorrect = opt.id === currentQ.correctOptionId;

              let style =
                'bg-white border-stone-200 hover:border-primary-400 hover:bg-stone-50/70 text-stone-800';

              if (mode === 'practice' && isAnswered) {
                if (isCorrect) {
                  style = 'bg-emerald-50/80 border-emerald-400 text-emerald-950 ring-1 ring-emerald-400';
                } else if (isSelected) {
                  style = 'bg-rose-50/80 border-rose-400 text-rose-950 ring-1 ring-rose-400';
                } else {
                  style = 'bg-stone-50/40 border-stone-200 text-stone-400 opacity-60';
                }
              } else if (isSelected) {
                style = 'bg-primary-50 border-primary-600 text-primary-950 ring-1 ring-primary-600 font-medium';
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full p-4 rounded-xl border text-left flex items-start gap-3 transition-all duration-200 ${style}`}
                >
                  <span className="w-6 h-6 rounded-lg bg-stone-100/90 text-stone-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {letter}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-relaxed">{opt.textEn}</p>
                    {opt.textAr && (
                      <p className="arabic-text text-xs text-stone-500 mt-1">{opt.textAr}</p>
                    )}
                  </div>
                  {mode === 'practice' && isAnswered && (
                    <div className="flex-shrink-0 mt-0.5">
                      {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                      {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Practice Mode Explanation Box */}
          {mode === 'practice' && isAnswered && (
            <div className="mt-4 p-4 sm:p-5 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-3 animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>الشرح الطبي والسريري (Explanation)</span>
                </div>
                {isCurrentCorrect ? (
                  <Badge variant="completed" size="sm">إجابة صحيحة ✓</Badge>
                ) : (
                  <Badge variant="outline" size="sm">انتبهي للنقطة دي 💡</Badge>
                )}
              </div>

              {/* Egyptian Arabic explanation */}
              {currentQ.explanationAr && (
                <div className="arabic-text text-stone-800 text-sm leading-relaxed p-3 bg-white/80 rounded-lg border border-amber-100 shadow-xs">
                  {currentQ.explanationAr}
                </div>
              )}

              {/* English Academic Explanation */}
              {currentQ.explanationEn && (
                <p className="text-xs text-stone-600 leading-relaxed font-sans border-t border-amber-200/50 pt-2">
                  <strong className="text-stone-800">Key Scientific Takeaway:</strong> {currentQ.explanationEn}
                </p>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-100">
            <Button
              variant="outline"
              size="sm"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" /> Previous
            </Button>

            {currentIndex < filteredQuestions.length - 1 ? (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setCurrentIndex(prev => prev + 1)}
              >
                Next <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={handleFinalSubmit}
                disabled={isSubmitted}
              >
                Submit & Finish Exam <Award className="w-4 h-4 ml-1.5" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
