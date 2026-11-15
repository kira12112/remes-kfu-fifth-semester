import { Routes, Route, Link } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { SubjectLibraryPage } from '@/pages/SubjectLibraryPage';
import { SubjectDashboardPage } from '@/pages/SubjectDashboardPage';
import { LectureViewerPage } from '@/pages/LectureViewerPage';
import { QuizPage } from '@/pages/QuizPage';
import { PdfViewerPage } from '@/pages/PdfViewerPage';
import { SearchPage } from '@/pages/SearchPage';
import { ProgressPage } from '@/pages/ProgressPage';
import { Button } from '@/components/ui/Button';

function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-surface-warm">
      <div className="text-center space-y-4 max-w-md">
        <div className="text-6xl font-black text-primary-200">404</div>
        <h1 className="text-2xl font-bold text-stone-900">Page Not Found</h1>
        <p className="text-stone-500 text-sm leading-relaxed">
          The requested educational page or resource could not be found.
        </p>
        <Link to="/">
          <Button variant="primary">← Return to Home Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/subjects" element={<SubjectLibraryPage />} />
      <Route path="/subjects/:id" element={<SubjectDashboardPage />} />
      <Route path="/subjects/:id/lectures/:lectureId" element={<LectureViewerPage />} />
      <Route path="/subjects/:id/quiz/:quizId" element={<QuizPage />} />
      <Route path="/quiz/:quizId" element={<QuizPage />} />
      <Route path="/subjects/:id/pdf" element={<PdfViewerPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/progress" element={<ProgressPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
