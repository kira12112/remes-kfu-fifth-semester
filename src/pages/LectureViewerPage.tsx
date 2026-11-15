import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { LectureViewer } from '@/components/lecture/LectureViewer';
import { Button } from '@/components/ui/Button';

// Dynamic imported lectures catalog for all available course units
import semesterData from '../../content/courses/fifth-semester.json';
import type { Lecture, Subject } from '@/types';

const lectureModules = import.meta.glob('../../content/lectures/*.json', { eager: true });
const allLectures: Record<string, Lecture> = {};

for (const path in lectureModules) {
  const mod = lectureModules[path] as { default?: Lecture } | Lecture;
  const lec = ('default' in mod && mod.default ? mod.default : mod) as Lecture;
  if (lec && lec.id) {
    allLectures[lec.id] = lec;
  }
}

const subjects = semesterData.subjects as Subject[];

export function LectureViewerPage() {
  const { id, lectureId } = useParams<{ id: string; lectureId: string }>();
  const subject = subjects.find(s => s.id === id);
  const lecture = lectureId ? allLectures[lectureId] : undefined;

  if (!subject) {
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
          <h2 className="text-xl font-bold text-stone-900">Subject Not Found</h2>
          <Link to="/subjects">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Subject Library
            </Button>
          </Link>
        </div>
      </AppShell>
    );
  }

  if (!lecture) {
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-100">
            <BookOpen className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-stone-900">Lecture Being Prepared</h2>
          <p className="text-stone-500 text-sm max-w-md mx-auto">
            This lecture content is currently being formatted from the original KFU textbooks.
          </p>
          <div className="pt-2">
            <Link to={`/subjects/${subject.id}`}>
              <Button variant="primary">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to {subject.code}
              </Button>
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center gap-2 text-xs text-stone-500 font-medium">
          <Link to="/subjects" className="hover:text-stone-900 transition-colors">
            Subjects
          </Link>
          <span>/</span>
          <Link to={`/subjects/${subject.id}`} className="hover:text-stone-900 transition-colors">
            {subject.code}
          </Link>
          <span>/</span>
          <span className="text-stone-800 font-semibold truncate max-w-xs">
            {lecture.titleEn}
          </span>
        </div>

        <LectureViewer
          lecture={lecture}
          subjectCode={subject.code}
        />
      </div>
    </AppShell>
  );
}
