import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  FlaskConical,
  FileText,
  HelpCircle,
  TrendingUp,
  ExternalLink,
  CheckCircle2,
  ChevronRight,
  Clock,
  Sparkles,
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { ComingSoon } from '@/components/ui/ComingSoon';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { getSubjectProgress } from '@/lib/db';
import semesterData from '../../content/courses/fifth-semester.json';
import type { Subject, SubjectProgress } from '@/types';

const subjects = semesterData.subjects as Subject[];

// Course syllabus data mapped to verified subjects
const subjectCurricula: Record<
  string,
  {
    theoretical: { id: string; titleEn: string; titleAr: string; mins: number; available: boolean }[];
    practical: { id: string; titleEn: string; titleAr: string; available: boolean }[];
    quizzes: { id: string; titleEn: string; count: number; available: boolean }[];
  }
> = {
  'dm5-car-hard-dent': {
    theoretical: [
      { id: 'dm5-car-hard-dent-lec-01', titleEn: 'Diagnosis for Dental Caries and Hard Tissue Diseases', titleAr: 'تشخيص تسوس الأسنان وأمراض الأنسجة السنية الصلبة', mins: 35, available: true },
      { id: 'dm5-car-hard-dent-lec-02', titleEn: 'Dental Caries: Etiology, Pathogenesis & Classification', titleAr: 'تسوس الأسنان: الأسباب، آلية الحدوث، والتصنيفات', mins: 40, available: false },
      { id: 'dm5-car-hard-dent-lec-03', titleEn: 'Prevention of Dental Caries: Fluoride & Diet', titleAr: 'طرق الوقاية من التسوس: الفلورايد والنظام الغذائي', mins: 30, available: false },
      { id: 'dm5-car-hard-dent-lec-04', titleEn: 'Management of Caries: Non-Invasive vs Invasive', titleAr: 'إدارة التسوس: العلاج غير الجراحي مقابل الحفر', mins: 35, available: false },
      { id: 'dm5-car-hard-dent-lec-05', titleEn: 'Restoration of Teeth: Adhesive Materials', titleAr: 'ترميم وحشو الأسنان: المواد الرابطة', mins: 45, available: false },
      { id: 'dm5-car-hard-dent-lec-06', titleEn: 'Mistakes and Complications in Caries Treatment', titleAr: 'الأخطاء والمضاعفات الشائعة أثناء علاج التسوس', mins: 30, available: false },
      { id: 'dm5-car-hard-dent-lec-07', titleEn: 'Non-Carious Lesions: Erosion, Abrasion, Abfraction', titleAr: 'الآفات غير النخرية: التآكل الكيميائي، السحج، والانسحال', mins: 30, available: false },
      { id: 'dm5-car-hard-dent-lec-08', titleEn: 'Teeth Whitening and Bleaching Protocols', titleAr: 'بروتوكولات تبييض وتفتيح الأسنان', mins: 25, available: false },
    ],
    practical: [
      { id: 'car-prac-01', titleEn: 'Class I Cavity Preparation & 6 Fundamental Steps', titleAr: 'تحضير حفر الصنف الأول والخطوات الست الأساسية', available: true },
      { id: 'car-prac-02', titleEn: 'Class II Cavity Preparation: Proximal Box & Retention', titleAr: 'تحضير حفر الصنف الثاني: الصندوق الملاصق ووسائل التثبيت', available: false },
      { id: 'car-prac-03', titleEn: 'Class III Cavity Preparation in Anterior Teeth', titleAr: 'تحضير حفر الصنف الثالث في الأسنان الأمامية', available: false },
      { id: 'car-prac-04', titleEn: 'Class IV Incisal Angle Preparation', titleAr: 'تحضير حفر الصنف الرابع متضمناً الزاوية القاطعة', available: false },
      { id: 'car-prac-05', titleEn: 'Class V Cervical Preparation & Isolation', titleAr: 'تحضير حفر الصنف الخامس العنقي وطرق العزل', available: false },
    ],
    quizzes: [
      { id: 'quiz-car-hard-dent-01', titleEn: 'Cariology Diagnosis & Clinical Assessment Quiz', count: 3, available: true },
    ],
  },
  'dm5-pharm': {
    theoretical: [
      { id: 'dm5-pharm-lec-01', titleEn: 'General Pharmacology: Drug Nomenclature and Pharmacokinetics', titleAr: 'مبادئ علم الأدوية: تسمية الأدوية والحرائك الدوائية (ADME)', mins: 40, available: true },
      { id: 'dm5-pharm-lec-02', titleEn: 'Autonomic Pharmacology: Cholinergic (Parasympathomimetic) Drugs', titleAr: 'أدوية الجهاز الذاتي: محاكيات الجهاز نظير الودي', mins: 35, available: false },
      { id: 'dm5-pharm-lec-03', titleEn: 'Adrenergic (Sympathomimetic) Drugs & Receptor Actions', titleAr: 'أدوية ومستقبلات الجهاز الودي وتطبيقاتها في التخدير السني', mins: 40, available: false },
      { id: 'dm5-pharm-lec-04', titleEn: 'Autacoids, Histamine & NSAIDs in Dental Practice', titleAr: 'مضادات الالتهاب غير الستيرويدية والأوتاكويد في طب الأسنان', mins: 35, available: false },
      { id: 'dm5-pharm-lec-05', titleEn: 'CNS Pharmacology: Sedatives & Opioid Analgesics', titleAr: 'أدوية الجهاز العصبي المركزي: المهدئات والمسكنات الأفيونية', mins: 40, available: false },
      { id: 'dm5-pharm-lec-06', titleEn: 'Local Anesthetics in Dentistry: Mechanism & Toxicity', titleAr: 'المخدرات الموضعية في طب الأسنان: آلية العمل والسمية', mins: 35, available: false },
    ],
    practical: [
      { id: 'pharm-prac-01', titleEn: 'Prescription Writing Rules & Dental Dosages', titleAr: 'قواعد كتابة الروشتة الطبية وحساب الجرعات السنية', available: true },
      { id: 'pharm-prac-02', titleEn: 'Emergency Drug Administration & Anaphylaxis Kit', titleAr: 'أدوية الطوارئ والتعامل مع الصدمة التحسسية بالعيادة', available: false },
    ],
    quizzes: [
      { id: 'sample-quiz-pharm', titleEn: 'Basic Pharmacology MCQ Quiz', count: 5, available: true },
    ],
  },
  'dm5-pathol-anat': {
    theoretical: [
      { id: 'dm5-pathol-anat-lec-01', titleEn: 'Autoimmune Diseases and Hypersensitivity Disorders', titleAr: 'أمراض المناعة الذاتية واضطرابات فرط التحسس', mins: 35, available: true },
      { id: 'dm5-pathol-anat-lec-02', titleEn: 'Carbohydrate Metabolism Disorders & Diabetes Pathology', titleAr: 'اضطرابات أيض الكربوهيدرات والتشريح المرضي للسكري', mins: 30, available: false },
      { id: 'dm5-pathol-anat-lec-03', titleEn: 'Acid-Base Homeostasis & Cellular Disorders', titleAr: 'اضطرابات التوازن الحمضي القلوي', mins: 30, available: false },
      { id: 'dm5-pathol-anat-lec-04', titleEn: 'Cardiovascular Pathology: Atherosclerosis & Infarction', titleAr: 'أمراض القلب والأوعية: تصلب الشرايين واحتشاء العضلة القلبية', mins: 40, available: false },
      { id: 'dm5-pathol-anat-lec-05', titleEn: 'Gastrointestinal & Oral Mucosal Pathology', titleAr: 'أمراض الجهاز الهضمي والآفات المخاطية الفموية', mins: 35, available: false },
      { id: 'dm5-pathol-anat-lec-06', titleEn: 'General Neoplasia: Benign vs Malignant Tumors', titleAr: 'الأورام العامة: التفرقة بين الأورام الحميدة والخبيثة', mins: 40, available: false },
    ],
    practical: [
      { id: 'pa-prac-01', titleEn: 'Histopathological Slide Identification & Diagnostic Biopsy', titleAr: 'قراءة الشرائح النسيجية المرضية ومبادئ الخزعة التشخيصية', available: false },
    ],
    quizzes: [],
  },
  'dm5-propaed-int-med': {
    theoretical: [
      { id: 'dm5-propaed-int-med-lec-01', titleEn: 'The Medical History and the Art of Questioning', titleAr: 'التاريخ الطبي السريري وفن الاستجواب الطبي', mins: 30, available: true },
      { id: 'dm5-propaed-int-med-lec-02', titleEn: 'General Physical Examination of the Patient', titleAr: 'الفحص السريري العام للمريض والعلامات الحيوية', mins: 35, available: false },
      { id: 'dm5-propaed-int-med-lec-03', titleEn: 'Examination of the Respiratory System', titleAr: 'فحص الجهاز التنفسي والسمعيات الصدرية', mins: 40, available: false },
      { id: 'dm5-propaed-int-med-lec-04', titleEn: 'Examination of the Cardiovascular System', titleAr: 'فحص القلب والأوعية الدموية والأصوات القلبية', mins: 40, available: false },
      { id: 'dm5-propaed-int-med-lec-05', titleEn: 'Examination of the Digestive System & Abdomen', titleAr: 'فحص الجهاز الهضمي والبطن', mins: 35, available: false },
      { id: 'dm5-propaed-int-med-lec-06', titleEn: 'Endocrine & Metabolic Signs in Clinical Practice', titleAr: 'العلامات السريرية للغدد الصماء والتمثيل الغذائي', mins: 30, available: false },
    ],
    practical: [
      { id: 'pim-prac-01', titleEn: 'Vital Signs Measurement & Blood Pressure Recording', titleAr: 'قياس العلامات الحيوية وتسجيل ضغط الدم السريري', available: false },
    ],
    quizzes: [],
  },
};

const tabs = [
  { id: 'overview', label: 'Overview', icon: BookOpen },
  { id: 'theoretical', label: 'Theory', icon: BookOpen },
  { id: 'practical', label: 'Practical', icon: FlaskConical },
  { id: 'books', label: 'Source Books', icon: FileText },
  { id: 'quiz', label: 'Quizzes', icon: HelpCircle },
  { id: 'progress', label: 'Progress', icon: TrendingUp },
];

export function SubjectDashboardPage() {
  const { id } = useParams<{ id: string }>();
  const subject = subjects.find(s => s.id === id);
  const [activeTab, setActiveTab] = useState('overview');
  const [userProgress, setUserProgress] = useState<SubjectProgress | null>(null);

  useEffect(() => {
    if (subject) {
      getSubjectProgress(subject.id).then(setUserProgress);
    }
  }, [subject]);

  if (!subject) {
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
          <h2 className="text-xl font-bold text-stone-900">Subject Not Found</h2>
          <Link to="/subjects">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Subjects
            </Button>
          </Link>
        </div>
      </AppShell>
    );
  }

  if (subject.status === 'coming-soon') {
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          <Link to="/subjects" className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 mb-6 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Subject Library
          </Link>
          <ComingSoon subjectTitle={subject.titleEn} subjectCode={subject.code} />
        </div>
      </AppShell>
    );
  }

  const curriculum = subjectCurricula[subject.id] || {
    theoretical: [],
    practical: [],
    quizzes: [],
  };

  const completedLecs = userProgress?.completedLectures || [];
  const progressPercent =
    curriculum.theoretical.length > 0
      ? Math.round((completedLecs.length / curriculum.theoretical.length) * 100)
      : 0;

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Back Link */}
        <Link
          to="/subjects"
          className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 text-xs sm:text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Subject Library
        </Link>

        {/* Subject Header Card */}
        <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="font-mono font-bold text-xs uppercase px-2.5 py-1 rounded bg-primary-50 text-primary-800 border border-primary-200/50">
              {subject.code}
            </span>
            <div className="flex items-center gap-2">
              <Badge variant={subject.status as any} size="sm">
                {subject.status === 'available' ? 'Available' : subject.status}
              </Badge>
              {subject.sourceFiles.length > 0 && (
                <Link to={`/subjects/${subject.id}/pdf`}>
                  <Button variant="outline" size="sm" className="text-xs">
                    <FileText className="w-3.5 h-3.5 mr-1 text-primary-600" />
                    Read Source PDFs
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              {subject.titleEn}
            </h1>
            {subject.titleAr && (
              <p className="arabic-text text-base sm:text-lg text-primary-800 font-semibold mt-1">
                {subject.titleAr}
              </p>
            )}
          </div>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            {subject.descriptionEn}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-stone-100">
            <div className="bg-stone-50/80 p-3 rounded-xl border border-stone-100">
              <div className="text-lg font-bold text-stone-900">
                {subject.theoreticalCount}
              </div>
              <div className="text-xs text-stone-500">Lectures</div>
            </div>
            <div className="bg-stone-50/80 p-3 rounded-xl border border-stone-100">
              <div className="text-lg font-bold text-stone-900">
                {subject.practicalCount}
              </div>
              <div className="text-xs text-stone-500">Practical Labs</div>
            </div>
            <div className="bg-stone-50/80 p-3 rounded-xl border border-stone-100">
              <div className="text-lg font-bold text-stone-900">
                {subject.sourceFiles.length}
              </div>
              <div className="text-xs text-stone-500">Textbooks</div>
            </div>
            <div className="bg-stone-50/80 p-3 rounded-xl border border-stone-100">
              <div className="text-lg font-bold text-primary-700">
                {progressPercent}%
              </div>
              <div className="text-xs text-stone-500">Completed</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-primary-700 text-white shadow-xs'
                    : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-8 space-y-4">
              <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary-600" />
                <span>About this Course · نبذة عن المقرر</span>
              </h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                {subject.descriptionEn}
              </p>
              {subject.descriptionAr && (
                <div className="arabic-text text-stone-700 text-sm leading-loose bg-stone-50 p-4 rounded-xl border border-stone-200/60 mt-3">
                  {subject.descriptionAr}
                </div>
              )}
            </div>

            {/* Featured Start Lecture */}
            {curriculum.theoretical.length > 0 && (
              <div className="bg-gradient-to-br from-primary-700 to-primary-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="space-y-1">
                  <div className="text-xs text-primary-200 uppercase font-semibold">
                    First Recommended Lecture
                  </div>
                  <h3 className="text-xl font-bold">
                    {curriculum.theoretical[0].titleEn}
                  </h3>
                  <p className="arabic-text text-sm text-primary-100">
                    {curriculum.theoretical[0].titleAr}
                  </p>
                </div>
                <Link to={`/subjects/${subject.id}/lectures/${curriculum.theoretical[0].id}`}>
                  <Button variant="secondary" className="font-bold shadow-xs whitespace-nowrap">
                    Start Lecture 01 <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: THEORETICAL LECTURES */}
        {activeTab === 'theoretical' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-bold text-stone-900">
                Official Theoretical Lectures ({curriculum.theoretical.length})
              </h2>
              <span className="text-xs text-stone-500 font-medium">
                {completedLecs.length} completed
              </span>
            </div>

            {curriculum.theoretical.map((lec, idx) => {
              const isCompleted = completedLecs.includes(lec.id);

              return (
                <div
                  key={lec.id}
                  className={`bg-white rounded-xl border border-stone-200/90 shadow-sm p-4 sm:p-5 flex items-center justify-between gap-4 transition-all ${
                    lec.available
                      ? 'hover:border-primary-300 hover:shadow-md cursor-pointer'
                      : 'opacity-70'
                  }`}
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-primary-50 text-primary-800'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : idx + 1}
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-snug truncate">
                        {lec.titleEn}
                      </h3>
                      <p className="arabic-text text-xs text-stone-500 mt-0.5 truncate">
                        {lec.titleAr}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-stone-400">
                        <span className="flex items-center gap-1 font-medium">
                          <Clock className="w-3.5 h-3.5" /> {lec.mins} mins
                        </span>
                        {lec.available ? (
                          <Badge variant="available" size="sm">Available</Badge>
                        ) : (
                          <Badge variant="coming-soon" size="sm">Coming Soon</Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    {lec.available ? (
                      <Link to={`/subjects/${subject.id}/lectures/${lec.id}`}>
                        <Button variant="primary" size="sm">
                          Read Lecture <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    ) : (
                      <Button variant="outline" size="sm" disabled>
                        Preparing...
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 3: PRACTICAL SESSIONS */}
        {activeTab === 'practical' && (
          <div className="space-y-3">
            <h2 className="text-base font-bold text-stone-900 mb-2">
              Practical Clinical Sessions ({curriculum.practical.length})
            </h2>

            {curriculum.practical.length === 0 ? (
              <div className="bg-white rounded-xl border border-stone-200 p-8 text-center text-stone-500 text-sm">
                Practical handbook sessions for this course are being cataloged.
              </div>
            ) : (
              curriculum.practical.map((prac) => (
                <div
                  key={prac.id}
                  className="bg-white rounded-xl border border-stone-200/90 shadow-sm p-4 sm:p-5 flex items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                      <FlaskConical className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-snug">
                        {prac.titleEn}
                      </h3>
                      <p className="arabic-text text-xs text-stone-500 mt-0.5">
                        {prac.titleAr}
                      </p>
                    </div>
                  </div>

                  <Badge variant={prac.available ? 'available' : 'coming-soon'} size="sm">
                    {prac.available ? 'In Curriculum' : 'Coming Soon'}
                  </Badge>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 4: SOURCE BOOKS */}
        {activeTab === 'books' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-stone-900">
                Original Textbooks ({subject.sourceFiles.length})
              </h2>
              <Link to={`/subjects/${subject.id}/pdf`}>
                <Button variant="primary" size="sm">
                  <FileText className="w-4 h-4 mr-1.5" /> Open Full PDF Reader
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {subject.sourceFiles.map((file, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-stone-200/90 shadow-sm p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-stone-900 text-sm sm:text-base">
                        {file.split('_')[0]}
                      </h3>
                      <p className="font-mono text-xs text-stone-400 mt-0.5 truncate max-w-md">
                        {file}
                      </p>
                    </div>
                  </div>

                  <Link to={`/subjects/${subject.id}/pdf`}>
                    <Button variant="outline" size="sm">
                      Read in Viewer <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: QUIZZES */}
        {activeTab === 'quiz' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-stone-900">
              Interactive Assessment Question Banks
            </h2>

            {curriculum.quizzes.length === 0 ? (
              <div className="bg-white rounded-xl border border-stone-200 p-8 text-center text-stone-500 text-sm">
                Quizzes for this subject are currently being generated from verified source textbooks.
              </div>
            ) : (
              curriculum.quizzes.map(q => (
                <div
                  key={q.id}
                  className="bg-white rounded-xl border border-stone-200/90 shadow-sm p-5 flex items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center flex-shrink-0">
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-stone-900 text-sm sm:text-base">
                        {q.titleEn}
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {q.count} verified MCQ questions with full Egyptian Arabic explanations
                      </p>
                    </div>
                  </div>

                  <Link to={`/subjects/${subject.id}/quiz/${q.id}`}>
                    <Button variant="primary" size="sm">
                      Start Quiz <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 6: PROGRESS */}
        {activeTab === 'progress' && (
          <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-stone-900 mb-1">
                Your Learning Track for {subject.code}
              </h2>
              <p className="text-xs text-stone-500">
                Data saved in local IndexedDB storage on this device
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold text-stone-700">
                <span>Lectures Completed</span>
                <span>
                  {completedLecs.length} of {curriculum.theoretical.length} ({progressPercent}%)
                </span>
              </div>
              <ProgressBar value={progressPercent} size="md" />
            </div>

            {userProgress?.quizAttempts && userProgress.quizAttempts.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-bold text-stone-800 text-sm">Recent Quiz Scores</h3>
                <div className="divide-y divide-stone-100 border border-stone-200 rounded-xl overflow-hidden">
                  {userProgress.quizAttempts.map((att, i) => (
                    <div key={i} className="p-3.5 bg-white flex items-center justify-between text-xs">
                      <div>
                        <div className="font-semibold text-stone-800">Score: {att.score}%</div>
                        <div className="text-stone-400 mt-0.5">
                          {att.correctCount} / {att.totalCount} correct · {att.mode} mode
                        </div>
                      </div>
                      <Badge variant={att.score >= 70 ? 'completed' : 'default'} size="sm">
                        {att.score >= 70 ? 'Pass' : 'Review Needed'}
                      </Badge>
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
