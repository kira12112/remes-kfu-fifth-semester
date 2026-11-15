import { Clock, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface ComingSoonProps {
  subjectTitle: string;
  subjectCode: string;
}

export function ComingSoon({ subjectTitle, subjectCode }: ComingSoonProps) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm p-8 sm:p-12 text-center max-w-xl mx-auto my-8">
      <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-4 border border-purple-100 shadow-inner">
        <Clock className="w-8 h-8" />
      </div>

      <div className="inline-block mb-3">
        <Badge variant="coming-soon" size="md">
          {subjectCode}
        </Badge>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mb-2 leading-snug">
        {subjectTitle}
      </h2>

      <div className="space-y-3 my-6">
        <p className="text-stone-600 text-sm leading-relaxed">
          Educational materials for this subject are being processed and verified against official KFU curriculum standards. They will be uploaded soon.
        </p>

        <p className="arabic-text text-stone-600 text-sm leading-relaxed bg-stone-50 p-3.5 rounded-xl border border-stone-100">
          المواد التعليمية والملخصات المصرية لهذه المادة قيد التجهيز والمراجعة الدقيقة على المراجع الرسمية، وسيتم إضافتها فور توفرها.
        </p>
      </div>

      <div className="pt-4 border-t border-stone-100 flex items-center justify-center gap-2 text-xs text-stone-400">
        <BookOpen className="w-4 h-4 text-stone-300" />
        <span>Kazan Federal University · 5th Semester</span>
      </div>
    </div>
  );
}
