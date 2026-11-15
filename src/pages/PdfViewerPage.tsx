import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  FileText,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import semesterData from '../../content/courses/fifth-semester.json';
import type { Subject } from '@/types';

const subjects = semesterData.subjects as Subject[];

export function PdfViewerPage() {
  const { id } = useParams<{ id: string }>();
  const subject = subjects.find(s => s.id === id);

  const [selectedFile, setSelectedFile] = useState<string>(
    subject?.sourceFiles[0] || ''
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);

  if (!subject) {
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h2 className="text-xl font-bold text-stone-900 mb-2">Subject Not Found</h2>
          <Link to="/subjects" className="text-primary-700 hover:underline">← Back to Subjects</Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Navigation & Title */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to={`/subjects/${subject.id}`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to {subject.code}
              </Button>
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-stone-900">
                Original Source Reader
              </h1>
              <p className="text-xs text-stone-500">
                Ground-truth academic textbooks for {subject.titleEn}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" size="md">
              {subject.sourceFiles.length} Document{subject.sourceFiles.length > 1 ? 's' : ''}
            </Badge>
          </div>
        </div>

        {/* Security & Copyright Notice */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 flex items-start gap-3 text-xs text-amber-900">
          <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold">Confidential University Study Material</p>
            <p className="text-stone-600 leading-relaxed">
              These source textbooks are licensed educational materials provided for Riham's personal 5th Semester study at Kazan Federal University. Public distribution is restricted under university privacy rules.
            </p>
          </div>
        </div>

        {/* File Selector Tabs */}
        {subject.sourceFiles.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {subject.sourceFiles.map((file, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSelectedFile(file);
                  setCurrentPage(1);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  selectedFile === file
                    ? 'bg-primary-700 text-white border-primary-700 shadow-xs'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span className="truncate max-w-[200px]">{file.split('_')[0]}</span>
              </button>
            ))}
          </div>
        )}

        {/* Viewer Toolbar */}
        <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden">
          <div className="bg-stone-50 px-4 py-3 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Page navigation */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-1 font-mono font-medium text-stone-700">
                <span>Page</span>
                <input
                  type="number"
                  min={1}
                  value={currentPage}
                  onChange={e => setCurrentPage(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-14 text-center py-1 border border-stone-300 rounded-lg bg-white"
                  aria-label="Current page number"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => p + 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                disabled={zoomLevel <= 50}
                onClick={() => setZoomLevel(z => Math.max(50, z - 25))}
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </Button>
              <span className="font-mono text-stone-600 font-semibold px-2">
                {zoomLevel}%
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={zoomLevel >= 200}
                onClick={() => setZoomLevel(z => Math.min(200, z + 25))}
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          {/* Reader Canvas / Document Viewport */}
          <div className="min-h-[500px] sm:min-h-[650px] bg-stone-100/70 p-4 sm:p-8 flex items-center justify-center overflow-auto">
            <div
              className="bg-white rounded-xl shadow-lg border border-stone-300 p-8 sm:p-12 max-w-3xl w-full text-stone-800 space-y-6 transition-transform"
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            >
              <div className="border-b border-stone-200 pb-4 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono font-bold uppercase text-primary-700">
                    Kazan Federal University · Fifth Semester
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 mt-1">
                    {selectedFile.split('_')[0]}
                  </h3>
                </div>
                <Badge variant="outline" size="sm">
                  Page {currentPage}
                </Badge>
              </div>

              <div className="space-y-4 text-sm leading-relaxed text-stone-700">
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 font-mono text-xs text-stone-600">
                  <p className="font-bold text-stone-800 mb-1">Source Reference Header:</p>
                  <p>Document: {selectedFile}</p>
                  <p>Subject: {subject.titleEn} ({subject.code})</p>
                  <p>Current Viewport: Page {currentPage}</p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-stone-900 text-base">
                    Study Navigation Guidelines:
                  </h4>
                  <p>
                    All verified chapters and theoretical lectures extracted from this textbook are indexed in the Subject Dashboard with comprehensive Egyptian Arabic audio-visual explanations and interactive MCQs.
                  </p>
                  <div className="arabic-text text-sm bg-primary-50/50 p-4 rounded-xl border border-primary-100 text-stone-800">
                    💡 يمكنك قراءة المحاضرة المشروحة بالكامل باللغة العربية مع الحفاظ على المصطلحات الطبية الإنجليزية من خلال العودة إلى صفحة المادة واختيار المحاضرة من تبويب Theoretical.
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
                <span>Reme's KFU Fifth Semester Platform</span>
                <span>Protected Educational Archive</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
