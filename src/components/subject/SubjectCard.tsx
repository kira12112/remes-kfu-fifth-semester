import { Link } from 'react-router-dom';
import { BookOpen, FlaskConical, ChevronRight, Clock, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import type { Subject, AvailabilityStatus } from '@/types';

interface SubjectCardProps {
  subject: Subject;
  progress?: number;
  className?: string;
}

const colorStyles: Record<string, { bg: string; text: string; border: string }> = {
  teal: { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-100' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-100' },
  red: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-100' },
  orange: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100' },
  blue: { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-100' },
  cyan: { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-100' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100' },
  violet: { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-100' },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-100' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-100' },
  green: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100' },
  slate: { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-100' },
};

function StatusBadge({ status }: { status: AvailabilityStatus }) {
  const map: Record<AvailabilityStatus, { label: string; variant: 'available' | 'coming-soon' | 'in-progress' | 'completed' }> = {
    available: { label: 'Available', variant: 'available' },
    'coming-soon': { label: 'Coming Soon', variant: 'coming-soon' },
    'in-progress': { label: 'In Progress', variant: 'in-progress' },
    completed: { label: 'Completed', variant: 'completed' },
  };
  const item = map[status] || { label: status, variant: 'default' };
  return <Badge variant={item.variant} size="sm">{item.label}</Badge>;
}

export function SubjectCard({ subject, progress = 0, className }: SubjectCardProps) {
  const isAvailable = subject.status === 'available' || subject.status === 'in-progress' || subject.status === 'completed';
  const colors = colorStyles[subject.color] || { bg: 'bg-stone-50', text: 'text-stone-700', border: 'border-stone-100' };

  const content = (
    <div
      className={cn(
        'group relative bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden flex flex-col justify-between transition-all duration-300',
        isAvailable
          ? 'hover:shadow-md hover:border-primary-300 hover:-translate-y-0.5 cursor-pointer'
          : 'opacity-75 hover:opacity-90',
        className
      )}
    >
      <div className="p-5">
        {/* Top Header: Icon + Status */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div
            className={cn(
              'w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border',
              colors.bg,
              colors.text,
              colors.border
            )}
          >
            <BookOpen className="w-5 h-5" />
          </div>
          <StatusBadge status={subject.status} />
        </div>

        {/* Course Code & Title */}
        <div className="space-y-1 mb-3">
          <div className="font-mono text-[11px] font-semibold text-primary-700/80 tracking-wide uppercase">
            {subject.code}
          </div>
          <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-primary-800 transition-colors">
            {subject.titleEn}
          </h3>
          {subject.titleAr && (
            <p className="arabic-text text-stone-500 text-xs line-clamp-1">
              {subject.titleAr}
            </p>
          )}
        </div>

        {/* Meta Counts: Theory, Practical, Books */}
        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-stone-500 border-t border-stone-100">
          {subject.theoreticalCount > 0 && (
            <span className="inline-flex items-center gap-1 font-medium text-stone-600">
              <BookOpen className="w-3.5 h-3.5 text-stone-400" />
              {subject.theoreticalCount} Lectures
            </span>
          )}
          {subject.practicalCount > 0 && (
            <span className="inline-flex items-center gap-1 font-medium text-stone-600">
              <FlaskConical className="w-3.5 h-3.5 text-stone-400" />
              {subject.practicalCount} Practical
            </span>
          )}
          {subject.sourceFiles && subject.sourceFiles.length > 0 && (
            <span className="inline-flex items-center gap-1 text-stone-400">
              <FileText className="w-3.5 h-3.5" />
              {subject.sourceFiles.length} Source{subject.sourceFiles.length > 1 ? 's' : ''}
            </span>
          )}
          {subject.status === 'coming-soon' && (
            <span className="inline-flex items-center gap-1 text-stone-400 italic">
              <Clock className="w-3.5 h-3.5" />
              Awaiting materials
            </span>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 py-3.5 bg-stone-50/70 border-t border-stone-100 flex items-center justify-between mt-auto">
        {isAvailable ? (
          <>
            <div className="flex-1 mr-3">
              {progress > 0 ? (
                <ProgressBar value={progress} size="sm" />
              ) : (
                <span className="text-xs text-stone-500 font-medium">Start Subject</span>
              )}
            </div>
            <div className="w-7 h-7 rounded-full bg-white shadow-xs border border-stone-200/80 flex items-center justify-center text-stone-400 group-hover:text-primary-700 group-hover:border-primary-200 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </div>
          </>
        ) : (
          <span className="text-xs text-purple-600 font-medium">Material In Development</span>
        )}
      </div>
    </div>
  );

  return (
    <Link to={`/subjects/${subject.id}`} className="block h-full">
      {content}
    </Link>
  );
}
