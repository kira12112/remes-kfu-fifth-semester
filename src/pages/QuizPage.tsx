import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { QuizEngine } from '@/components/quiz/QuizEngine';
import { Button } from '@/components/ui/Button';

// Static imported quizzes catalog
import pharmQuiz01 from '../../content/quizzes/sample-quiz-pharm.json';
import carQuiz01 from '../../content/quizzes/quiz-car-hard-dent-01.json';
import semesterData from '../../content/courses/fifth-semester.json';
import type { Quiz, Subject } from '@/types';

const allQuizzes: Record<string, Quiz> = {
  'sample-quiz-pharm': pharmQuiz01 as unknown as Quiz,
  'quiz-pharm-basics-01': pharmQuiz01 as unknown as Quiz,
  'quiz-car-hard-dent-01': carQuiz01 as unknown as Quiz,
};

const subjects = semesterData.subjects as Subject[];

export function QuizPage() {
  const { id, quizId } = useParams<{ id: string; quizId: string }>();
  const subject = subjects.find(s => s.id === id);
  const quiz = quizId ? allQuizzes[quizId] : undefined;

  if (!quiz) {
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-100">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-stone-900">Quiz Not Found</h2>
          <p className="text-stone-500 text-sm max-w-md mx-auto">
            The requested assessment is currently in development.
          </p>
          <div className="pt-2">
            <Link to={subject ? `/subjects/${subject.id}` : '/subjects'}>
              <Button variant="primary">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
          <Link to="/subjects" className="hover:text-stone-900 transition-colors">
            Subjects
          </Link>
          {subject && (
            <>
              <span>/</span>
              <Link to={`/subjects/${subject.id}`} className="hover:text-stone-900 transition-colors">
                {subject.code}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-stone-800 font-semibold truncate max-w-xs">
            {quiz.titleEn}
          </span>
        </div>

        <QuizEngine
          quiz={quiz}
          subjectId={subject ? subject.id : quiz.subjectId}
        />
      </div>
    </AppShell>
  );
}
