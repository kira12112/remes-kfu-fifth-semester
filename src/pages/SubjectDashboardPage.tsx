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
      { id: 'dm5-car-hard-dent-lec-02', titleEn: 'Etiology and Pathogenesis of Dental Caries', titleAr: 'أسباب وآلية حدوث تسوس الأسنان والبيوفيلم البكتيري', mins: 45, available: true },
      { id: 'dm5-car-hard-dent-lec-03', titleEn: 'Prevention of Dental Caries: Fluoride and Sealants', titleAr: 'الوقاية من تسوس الأسنان: آليات الفلورايد وسادات الشقوق', mins: 40, available: true },
      { id: 'dm5-car-hard-dent-lec-04', titleEn: 'Caries Risk Assessment and Management (CAMBRA)', titleAr: 'تقييم مخاطر التسوس وبروتوكول كامبرا (CAMBRA)', mins: 45, available: true },
      { id: 'dm5-car-hard-dent-lec-05', titleEn: 'Restoration of Teeth: Adhesive Systems and Composites', titleAr: 'ترميم الأسنان: أنظمة اللصق والمواد المركبة (الكومبوزيت)', mins: 50, available: true },
      { id: 'dm5-car-hard-dent-lec-06', titleEn: 'Complications and Failures in Restorative Treatment', titleAr: 'أخطاء ومضاعفات حشو الأسنان والتسوس الثانوي', mins: 40, available: true },
      { id: 'dm5-car-hard-dent-lec-07', titleEn: 'Non-Carious Cervical Lesions (NCCLs) & Hard Tissue Defects', titleAr: 'الآفات غير التسوسية: التآكل، الحت، الانقلاع، ونقص التكلس', mins: 45, available: true },
      { id: 'dm5-car-hard-dent-lec-08', titleEn: 'Teeth Whitening and Bleaching Mechanisms', titleAr: 'تبييض الأسنان: الكيمياء الحيوية والبروتوكولات السريرية', mins: 35, available: true },
    ],
    practical: [
      { id: 'dm5-car-hard-dent-prac-01', titleEn: 'Practical 1: Class I Cavity Preparation', titleAr: 'العملي ١: تحضير حفر الصنف الأول (Class I Cavity Preparation)', available: true },
      { id: 'dm5-car-hard-dent-prac-02', titleEn: 'Practical 2: Class II Cavity Preparation & Proximal Box', titleAr: 'العملي ٢: تحضير حفر الصنف الثاني والصندوق الملاصق (Class II)', available: true },
      { id: 'dm5-car-hard-dent-prac-03', titleEn: 'Practical 3: Class III Cavity Preparation', titleAr: 'العملي ٣: تحضير حفر الصنف الثالث على الأسنان الأمامية (Class III)', available: true },
      { id: 'dm5-car-hard-dent-prac-04', titleEn: 'Practical 4: Class IV Cavity Preparation & Beveling', titleAr: 'العملي ٤: تحضير وترميم حفر الصنف الرابع وشطب الحواف (Class IV)', available: true },
      { id: 'dm5-car-hard-dent-prac-05', titleEn: 'Practical 5: Class V Cavity Preparation', titleAr: 'العملي ٥: تحضير حفر الصنف الخامس وتثبيت الحشو (Class V)', available: true },
    ],
    quizzes: [
      { id: 'quiz-car-hard-dent-01', titleEn: 'Comprehensive Cariology & Cavity Preparation Question Bank', count: 8, available: true },
      { id: 'quiz-dm5-car-hard-dent-lec-01', titleEn: 'Quiz: Cariology Diagnosis & Assessment', count: 3, available: true },
      { id: 'quiz-dm5-car-hard-dent-lec-02', titleEn: 'Quiz: Etiology and Pathogenesis of Dental Caries', count: 3, available: true },
      { id: 'quiz-dm5-car-hard-dent-lec-03', titleEn: 'Quiz: Prevention of Dental Caries: Fluoride and Sealants', count: 2, available: true },
      { id: 'quiz-dm5-car-hard-dent-lec-04', titleEn: 'Quiz: Caries Risk Assessment and Management (CAMBRA)', count: 2, available: true },
      { id: 'quiz-dm5-car-hard-dent-lec-05', titleEn: 'Quiz: Restoration of Teeth: Adhesive Systems and Composites', count: 2, available: true },
      { id: 'quiz-dm5-car-hard-dent-lec-06', titleEn: 'Quiz: Complications and Failures in Restorative Treatment', count: 2, available: true },
      { id: 'quiz-dm5-car-hard-dent-lec-07', titleEn: 'Quiz: Non-Carious Cervical Lesions & Hard Tissue Defects', count: 2, available: true },
      { id: 'quiz-dm5-car-hard-dent-lec-08', titleEn: 'Quiz: Teeth Whitening and Bleaching Protocols', count: 2, available: true },
      { id: 'quiz-dm5-car-hard-dent-prac-01', titleEn: 'Quiz: Class I Cavity Preparation Principles', count: 1, available: true },
      { id: 'quiz-dm5-car-hard-dent-prac-02', titleEn: 'Quiz: Class II Cavity Preparation & Proximal Box', count: 1, available: true },
      { id: 'quiz-dm5-car-hard-dent-prac-03', titleEn: 'Quiz: Class III Cavity Preparation', count: 1, available: true },
      { id: 'quiz-dm5-car-hard-dent-prac-04', titleEn: 'Quiz: Class IV Cavity Preparation & Beveling', count: 1, available: true },
      { id: 'quiz-dm5-car-hard-dent-prac-05', titleEn: 'Quiz: Class V Cavity Preparation', count: 1, available: true },
    ],
  },
  'dm5-micromviro': {
    theoretical: [
      { id: 'dm5-micromviro-lec-01', titleEn: 'Sanitary Microbiology, Sterilization, and Bacterial Classification', titleAr: 'الأحياء الدقيقة الصحية: التعقيم والتطهير في عيادة الأسنان وتصنيف البكتيريا', mins: 45, available: true },
      { id: 'dm5-micromviro-lec-02', titleEn: 'Gram-Positive Cocci: Staphylococci and Streptococci', titleAr: 'المكورات الإيجابية لصبغة غرام: العنقوديات الذهبية والعقديات الفموية', mins: 45, available: true },
      { id: 'dm5-micromviro-lec-03', titleEn: 'Gram-Negative Cocci and Spore-Forming Gram-Positive Bacilli', titleAr: 'المكورات السلبية لغرام والعصيات الإيجابية المشكلة للأبواغ (الكلوستريديوم والكزاز)', mins: 45, available: true },
      { id: 'dm5-micromviro-lec-04', titleEn: 'Gram-Negative Bacilli and Dental Unit Waterline Biofilms', titleAr: 'العصيات السالبة لصبغة غرام وبيوفيلم خراطيم مياه كراسي الأسنان (Pseudomonas)', mins: 45, available: true },
      { id: 'dm5-micromviro-lec-05', titleEn: 'Mycobacterium tuberculosis and Airborne Transmission in Dental Aerosols', titleAr: 'عصيات السل (الدرن) وخطر انتقال العدوى بالرذاذ في عيادة الأسنان', mins: 45, available: true },
      { id: 'dm5-micromviro-lec-06', titleEn: 'Oral Microbiome, Dental Plaque Biofilm, and Periodontal Pathogens', titleAr: 'الميكروبيوم الفموي: تشكل البيوفيلم واللويحة السنية وبكتيريا النسج الداعمة', mins: 50, available: true },
      { id: 'dm5-micromviro-lec-07', titleEn: 'Virology: Herpesviruses, Bloodborne Hepatitis (HBV/HCV), and HIV in Dentistry', titleAr: 'علم الفيروسات: فيروسات الهربس، التهاب الكبد B و C، والإيدز ومخاطر الوخز بالإبر', mins: 50, available: true },
      { id: 'dm5-micromviro-lec-08', titleEn: 'Medical Mycology: Oral Candidiasis and Antifungal Therapy', titleAr: 'الفطريات الطبية: داء المبيضات الفموي (الكانديدا) وخيارات العلاج بمضادات الفطريات', mins: 45, available: true },
    ],
    practical: [
    ],
    quizzes: [
      { id: 'quiz-dm5-micromviro-lec-01', titleEn: 'Quiz: Sanitary Microbiology and Sterilization', count: 2, available: true },
      { id: 'quiz-dm5-micromviro-lec-02', titleEn: 'Quiz: Gram-Positive Cocci in Dentistry', count: 2, available: true },
      { id: 'quiz-dm5-micromviro-lec-03', titleEn: 'Quiz: Gram-Negative Cocci & Spore-Forming Bacilli', count: 1, available: true },
      { id: 'quiz-dm5-micromviro-lec-04', titleEn: 'Quiz: Gram-Negative Bacilli & Dental Unit Waterlines', count: 1, available: true },
      { id: 'quiz-dm5-micromviro-lec-05', titleEn: 'Quiz: Mycobacterium tuberculosis & Dental Aerosols', count: 1, available: true },
      { id: 'quiz-dm5-micromviro-lec-06', titleEn: 'Quiz: Oral Microbiome & Periodontal Pathogens', count: 1, available: true },
      { id: 'quiz-dm5-micromviro-lec-07', titleEn: 'Quiz: Virology in Dentistry: Herpes, Hepatitis, HIV', count: 1, available: true },
      { id: 'quiz-dm5-micromviro-lec-08', titleEn: 'Quiz: Medical Mycology & Oral Candidiasis', count: 1, available: true },
      { id: 'quiz-micromviro-01', titleEn: 'Microbiology & Virology High-Yield Question Bank', count: 3, available: true },
    ],
  },
  'dm5-pathol-anat': {
    theoretical: [
      { id: 'dm5-pathol-anat-lec-01', titleEn: 'Autoimmune Diseases and Hypersensitivity Disorders', titleAr: 'أمراض المناعة الذاتية واضطرابات فرط التحسس', mins: 35, available: true },
      { id: 'dm5-pathol-anat-lec-02', titleEn: 'Carbohydrate Metabolism Disorders & Diabetes Mellitus', titleAr: 'اضطرابات استقلاب السكريات ومرض السكري ومظاهره الفموية', mins: 45, available: true },
      { id: 'dm5-pathol-anat-lec-03', titleEn: 'Pathology of Acid-Base and Fluid Homeostasis', titleAr: 'اضطرابات التوازن الحمضي-القلوي وسوائل الجسم', mins: 40, available: true },
      { id: 'dm5-pathol-anat-lec-04', titleEn: 'Cardiovascular Pathology: Atherosclerosis and Infective Endocarditis', titleAr: 'أمراض القلب والأوعية الدموية: التصلب العصيدي والتهاب شغاف القلب العدوائي', mins: 45, available: true },
      { id: 'dm5-pathol-anat-lec-05', titleEn: 'Gastrointestinal Pathology & Oral Manifestations', titleAr: 'أمراض الجهاز الهضمي والتقرحات القلاعية الفموية المرافقة', mins: 40, available: true },
      { id: 'dm5-pathol-anat-lec-06', titleEn: 'Thermal Metabolism Disorders, Fever, and Pulmonary Pathology', titleAr: 'اضطرابات الحرارة والحمى وأمراض الرئة والجهاز التنفسي', mins: 40, available: true },
    ],
    practical: [
    ],
    quizzes: [
      { id: 'quiz-dm5-pathol-anat-lec-01', titleEn: 'Quiz: Autoimmune Diseases and Hypersensitivity', count: 2, available: true },
      { id: 'quiz-dm5-pathol-anat-lec-02', titleEn: 'Quiz: Diabetes Mellitus and Metabolic Pathology', count: 1, available: true },
      { id: 'quiz-dm5-pathol-anat-lec-03', titleEn: 'Quiz: Pathology of Acid-Base and Fluid Homeostasis', count: 1, available: true },
      { id: 'quiz-dm5-pathol-anat-lec-04', titleEn: 'Quiz: Atherosclerosis and Infective Endocarditis', count: 1, available: true },
      { id: 'quiz-dm5-pathol-anat-lec-05', titleEn: 'Quiz: Gastrointestinal Pathology & Oral Manifestations', count: 1, available: true },
      { id: 'quiz-dm5-pathol-anat-lec-06', titleEn: 'Quiz: Thermal Disorders, Fever, and Pulmonary Pathology', count: 1, available: true },
      { id: 'quiz-pathol-anat-01', titleEn: 'Pathological Anatomy High-Yield Question Bank', count: 2, available: true },
    ],
  },
  'dm5-pathol-phys': {
    theoretical: [
      { id: 'dm5-pathol-phys-lec-01', titleEn: 'General Nosology: Etiology, Pathogenesis, and Disease Concepts', titleAr: 'مبادئ علم الأمراض العام (النزولوجيا): المسببات والآليات وتصنيف الأمراض', mins: 45, available: true },
      { id: 'dm5-pathol-phys-lec-02', titleEn: 'Cellular Adaptation: Hypertrophy, Hyperplasia, Atrophy, and Metaplasia', titleAr: 'التكيف الخلوي: الضخامة، فرط التنسج، الضمور، والحؤول (التحول النسيجي)', mins: 45, available: true },
      { id: 'dm5-pathol-phys-lec-03', titleEn: 'Cell Injury: Reversible Damage, Necrosis, and Apoptosis', titleAr: 'أذية الخلية: الضرر العكوس، التموت النخري (Necrosis)، والموت المبرمج (Apoptosis)', mins: 45, available: true },
      { id: 'dm5-pathol-phys-lec-04', titleEn: 'Inflammation: Acute & Chronic Mechanisms and Chemical Mediators', titleAr: 'الالتهاب: الآليات الوعائية والخلوية للالتهاب الحاد والمزمن والوسطاء الكيميائيين', mins: 50, available: true },
      { id: 'dm5-pathol-phys-lec-05', titleEn: 'Intracellular Accumulations and Pathological Calcifications', titleAr: 'التراكمات داخل الخلايا والتكلسات المرضية (الحثلية والنقيلية)', mins: 40, available: true },
      { id: 'dm5-pathol-phys-lec-06', titleEn: 'Tissue Repair, Regeneration, and Wound Healing', titleAr: 'ترميم الأنسجة، التجدد الخلوي، والتئام الجروح والسنخ بعد الخلع', mins: 45, available: true },
      { id: 'dm5-pathol-phys-lec-07', titleEn: 'Circulatory Disturbances: Edema, Hyperemia, Thrombosis, Embolism, and Shock', titleAr: 'اضطرابات الدورة الدموية: الوذمة، الاحتقان، الخثار، الصمات، وحالات الصدمة', mins: 45, available: true },
      { id: 'dm5-pathol-phys-lec-08', titleEn: 'Neoplasia: Biology of Benign vs Malignant Tumors and Oral Cancer', titleAr: 'الأورام: بيولوجيا الأورام الحميدة والخبيثة وسرطان الفم الشائك الخلايا', mins: 50, available: true },
    ],
    practical: [
    ],
    quizzes: [
      { id: 'quiz-dm5-pathol-phys-lec-01', titleEn: 'Quiz: General Nosology, Etiology, and Pathogenesis', count: 1, available: true },
      { id: 'quiz-dm5-pathol-phys-lec-02', titleEn: 'Quiz: Cellular Adaptation: Hypertrophy, Hyperplasia, Metaplasia', count: 1, available: true },
      { id: 'quiz-dm5-pathol-phys-lec-03', titleEn: 'Quiz: Cell Injury, Necrosis, and Apoptosis', count: 1, available: true },
      { id: 'quiz-dm5-pathol-phys-lec-04', titleEn: 'Quiz: Acute and Chronic Inflammation Mechanisms', count: 1, available: true },
      { id: 'quiz-dm5-pathol-phys-lec-05', titleEn: 'Quiz: Intracellular Accumulations & Pathological Calcification', count: 1, available: true },
      { id: 'quiz-dm5-pathol-phys-lec-06', titleEn: 'Quiz: Tissue Repair, Regeneration, and Wound Healing', count: 1, available: true },
      { id: 'quiz-dm5-pathol-phys-lec-07', titleEn: 'Quiz: Circulatory Disturbances: Thrombosis and Shock', count: 1, available: true },
      { id: 'quiz-dm5-pathol-phys-lec-08', titleEn: 'Quiz: Neoplasia & Biology of Oral Squamous Cell Carcinoma', count: 1, available: true },
      { id: 'quiz-pathol-phys-01', titleEn: 'Pathological Physiology Comprehensive Question Bank', count: 3, available: true },
    ],
  },
  'dm5-pharm': {
    theoretical: [
      { id: 'dm5-pharm-lec-01', titleEn: 'General Pharmacology: Drug Nomenclature and Pharmacokinetics', titleAr: 'مبادئ علم الأدوية العامة: تسمية الأدوية والحرائك الدوائية', mins: 40, available: true },
      { id: 'dm5-pharm-lec-02', titleEn: 'Autonomic Pharmacology: Cholinergic Agonists and Antagonists', titleAr: 'أدوية الجهاز العصبي اللاإرادي: محاكيات ومضادات الكولين', mins: 45, available: true },
      { id: 'dm5-pharm-lec-03', titleEn: 'Autonomic Pharmacology: Sympathomimetics and Adrenergic Blockers', titleAr: 'أدوية الجهاز السمبثاوي: الأدرينالين ومثبطات المستقبلات الأدرينرجية', mins: 45, available: true },
      { id: 'dm5-pharm-lec-04', titleEn: 'Autacoids: Histamine, Serotonin, and Prostaglandins', titleAr: 'الأوتاكويدات: الهستامين ومضاداته، السيروتونين، والبروستاغلاندين', mins: 35, available: true },
      { id: 'dm5-pharm-lec-05', titleEn: 'CNS Pharmacology: Analgesics, Opioids, NSAIDs, and Sedatives', titleAr: 'أدوية الجهاز العصبي المركزي: المسكنات، مضادات الالتهاب، والمهدئات', mins: 50, available: true },
      { id: 'dm5-pharm-lec-06', titleEn: 'Cardiovascular Pharmacology and Dental Management', titleAr: 'أدوية القلب والدورة الدموية والتدبير السريري لمريض الأسنان', mins: 45, available: true },
    ],
    practical: [
      { id: 'dm5-pharm-prac-01', titleEn: 'Practical 1: Pharmaceutical Dosage Forms and Routes of Administration', titleAr: 'العملي ١: الأشكال الصيدلانية الدوائية وطرق إعطاء الدواء', available: true },
      { id: 'dm5-pharm-prac-02', titleEn: 'Practical 2: Prescription Writing and Dose Calculation in Dentistry', titleAr: 'العملي ٢: كتابة الروشتة الطبية وحساب الجرعات الدوائية في طب الأسنان', available: true },
      { id: 'dm5-pharm-prac-03', titleEn: 'Practical 3: Dental Local Anesthetic Formulations and Calculations', titleAr: 'العملي ٣: تركيبات بنج الأسنان وحساب الجرعات القصوى الآمنة', available: true },
      { id: 'dm5-pharm-prac-04', titleEn: 'Practical 4: Medical Emergencies in the Dental Chair and Emergency Drug Kit', titleAr: 'العملي ٤: تدبير طوارئ عيادة الأسنان وصيدلية الإسعاف الأولي', available: true },
    ],
    quizzes: [
      { id: 'quiz-dm5-pharm-lec-01', titleEn: 'Quiz: Drug Nomenclature and Pharmacokinetics', count: 2, available: true },
      { id: 'quiz-dm5-pharm-lec-02', titleEn: 'Quiz: Cholinergic Agonists and Antagonists', count: 2, available: true },
      { id: 'quiz-dm5-pharm-lec-03', titleEn: 'Quiz: Sympathomimetics and Adrenergic Blockers', count: 2, available: true },
      { id: 'quiz-dm5-pharm-lec-04', titleEn: 'Quiz: Autacoids and Chemical Mediators', count: 2, available: true },
      { id: 'quiz-dm5-pharm-lec-05', titleEn: 'Quiz: CNS Analgesics, Opioids, and NSAIDs', count: 2, available: true },
      { id: 'quiz-dm5-pharm-lec-06', titleEn: 'Quiz: Cardiovascular Pharmacology and Dental Management', count: 2, available: true },
      { id: 'quiz-dm5-pharm-prac-01', titleEn: 'Quiz: Pharmaceutical Dosage Forms and Routes', count: 1, available: true },
      { id: 'quiz-dm5-pharm-prac-02', titleEn: 'Quiz: Prescription Writing and Dose Calculation', count: 1, available: true },
      { id: 'quiz-dm5-pharm-prac-03', titleEn: 'Quiz: Dental Local Anesthetic Formulations and Calculations', count: 1, available: true },
      { id: 'quiz-dm5-pharm-prac-04', titleEn: 'Quiz: Medical Emergencies & Emergency Drug Kit', count: 1, available: true },
      { id: 'quiz-pharm-01', titleEn: 'Comprehensive Dental Pharmacology Question Bank', count: 8, available: true },
      { id: 'quiz-pharm-basics-01', titleEn: 'Basic Pharmacology — Sample Quiz', count: 5, available: true },
    ],
  },
  'dm5-propaed-int-med': {
    theoretical: [
      { id: 'dm5-propaed-int-med-lec-01', titleEn: 'The Medical History and the Art of Questioning', titleAr: 'التاريخ الطبي السريري وفن الاستجواب الطبي', mins: 30, available: true },
      { id: 'dm5-propaed-int-med-lec-02', titleEn: 'General (External) Examination of the Patient and Head & Neck Lymph Nodes', titleAr: 'الفحص السريري العام للمريض وجس العقد اللمفاوية في الرأس والعنق', mins: 45, available: true },
      { id: 'dm5-propaed-int-med-lec-03', titleEn: 'Examination of the Respiratory System: Inspection, Palpation, Percussion, and Auscultation', titleAr: 'فحص الجهاز التنفسي: المعاينة، الجس، القرع، والتسمع الرئوي', mins: 45, available: true },
      { id: 'dm5-propaed-int-med-lec-04', titleEn: 'Examination of the Cardiovascular System: Heart Sounds, Murmurs, and Blood Pressure', titleAr: 'فحص الجهاز القلبي الوعائي: أصوات القلب، النفخات، وقياس ضغط الدم', mins: 45, available: true },
      { id: 'dm5-propaed-int-med-lec-05', titleEn: 'Examination of Digestive and Urinary Systems: Abdominal Signs', titleAr: 'فحص الجهازين الهضمي والبولي: علامات البطن السريرية والألم المنقول', mins: 40, available: true },
      { id: 'dm5-propaed-int-med-lec-06', titleEn: 'Clinical Laboratory Diagnostics & Electrocardiography (ECG)', titleAr: 'التحاليل المخبرية السريرية وتخطيط القلب الكهربائي (ECG)', mins: 45, available: true },
    ],
    practical: [
    ],
    quizzes: [
      { id: 'quiz-dm5-propaed-int-med-lec-01', titleEn: 'Quiz: The Medical History and Art of Questioning', count: 1, available: true },
      { id: 'quiz-dm5-propaed-int-med-lec-02', titleEn: 'Quiz: General Examination & Head/Neck Lymph Nodes', count: 1, available: true },
      { id: 'quiz-dm5-propaed-int-med-lec-03', titleEn: 'Quiz: Examination of the Respiratory System', count: 1, available: true },
      { id: 'quiz-dm5-propaed-int-med-lec-04', titleEn: 'Quiz: Examination of the Cardiovascular System', count: 1, available: true },
      { id: 'quiz-dm5-propaed-int-med-lec-05', titleEn: 'Quiz: Abdominal and Digestive Examination in Dentistry', count: 1, available: true },
      { id: 'quiz-dm5-propaed-int-med-lec-06', titleEn: 'Quiz: Clinical Lab Diagnostics & Electrocardiography (ECG)', count: 1, available: true },
      { id: 'quiz-propaed-int-med-01', titleEn: 'Propaedeutics Clinical Examination Question Bank', count: 2, available: true },
    ],
  },
  'dm5-pub-health': {
    theoretical: [
      { id: 'dm5-pub-health-lec-01', titleEn: 'Concepts and Principles of Public Health and Practice', titleAr: 'مفاهيم ومبادئ الصحة العامة والممارسة الوقائية', mins: 45, available: true },
      { id: 'dm5-pub-health-lec-02', titleEn: 'Statistical Methods and Health Data Analysis in Medical Research', titleAr: 'الطرق الإحصائية وتحليل البيانات الصحية في البحوث الطبية', mins: 45, available: true },
      { id: 'dm5-pub-health-lec-03', titleEn: 'Demography and Health Measures: Vital Statistics and Indices', titleAr: 'علم السكان والمؤشرات الصحية: الإحصاءات الحيوية ومعدل وفيات الرضع', mins: 40, available: true },
      { id: 'dm5-pub-health-lec-04', titleEn: 'Health Determinants, Epidemiology, and Morbidity Measures', titleAr: 'محددات الصحة والوبائيات ومقاييس انتشار ووقوع الأمراض', mins: 45, available: true },
      { id: 'dm5-pub-health-lec-05', titleEn: 'Healthcare Systems, Primary Health Care, and Maternal-Child Health', titleAr: 'أنظمة الرعاية الصحية والرعاية الأولية وصحة الأم والطفل', mins: 45, available: true },
      { id: 'dm5-pub-health-lec-06', titleEn: 'Health Economics, Screening, and Disease Prevention Strategies', titleAr: 'اقتصاديات الصحة، معايير المسح الطبي الشامل (Screening)، واستراتيجيات الوقاية', mins: 45, available: true },
    ],
    practical: [
    ],
    quizzes: [
      { id: 'quiz-dm5-pub-health-lec-01', titleEn: 'Quiz: Concepts and Principles of Public Health', count: 1, available: true },
      { id: 'quiz-dm5-pub-health-lec-02', titleEn: 'Quiz: Statistical Methods and Health Data Analysis', count: 1, available: true },
      { id: 'quiz-dm5-pub-health-lec-03', titleEn: 'Quiz: Demography and Health Indices (DMFT)', count: 1, available: true },
      { id: 'quiz-dm5-pub-health-lec-04', titleEn: 'Quiz: Epidemiology and Morbidity Measures', count: 1, available: true },
      { id: 'quiz-dm5-pub-health-lec-05', titleEn: 'Quiz: Healthcare Systems and Primary Health Care', count: 1, available: true },
      { id: 'quiz-dm5-pub-health-lec-06', titleEn: 'Quiz: Health Economics and Disease Screening Strategies', count: 1, available: true },
      { id: 'quiz-pub-health-01', titleEn: 'Public Health & Epidemiology Comprehensive Question Bank', count: 2, available: true },
    ],
  },
  'dm5-res-meth-bio-med': {
    theoretical: [
      { id: 'dm5-res-meth-bio-med-lec-01', titleEn: 'Scientific Research Principles, Hypotheses, and Laboratory Animal Models', titleAr: 'مبادئ البحث العلمي وصياغة الفرضيات ونماذج الحيوانات المخبرية', mins: 45, available: true },
      { id: 'dm5-res-meth-bio-med-lec-02', titleEn: 'Stem Cells in Biology and Regenerative Dental Medicine', titleAr: 'الخلايا الجذعية في البيولوجيا والطب التجديدي لنسج الأسنان', mins: 45, available: true },
      { id: 'dm5-res-meth-bio-med-lec-03', titleEn: 'Critical Appraisal: How to Read and Evaluate Scientific Papers', titleAr: 'التقييم النقدي للأبحاث: كيف تقرأ وتقيم مقالاً علمياً طبياً؟', mins: 45, available: true },
      { id: 'dm5-res-meth-bio-med-lec-04', titleEn: 'Morphometry and Quantitative Stereology in Histological Research', titleAr: 'القياس الشكلي (المورفومتري) والتحليل الكمي في الأبحاث النسيجية', mins: 40, available: true },
      { id: 'dm5-res-meth-bio-med-lec-05', titleEn: 'Electrophysiological Diagnostic Methods: ECG, EEG, EMG, and Nerve Conduction', titleAr: 'الطرق التشخيصية الفيزيولوجية الكهربائية: تخطيط القلب والدماغ والعضلات وتوصيل الأعصاب', mins: 45, available: true },
    ],
    practical: [
    ],
    quizzes: [
      { id: 'quiz-dm5-res-meth-bio-med-lec-01', titleEn: 'Quiz: Scientific Principles & Laboratory Animal Models', count: 1, available: true },
      { id: 'quiz-dm5-res-meth-bio-med-lec-02', titleEn: 'Quiz: Stem Cells and Regenerative Dental Medicine', count: 1, available: true },
      { id: 'quiz-dm5-res-meth-bio-med-lec-03', titleEn: 'Quiz: Critical Appraisal of Medical Evidence', count: 1, available: true },
      { id: 'quiz-dm5-res-meth-bio-med-lec-04', titleEn: 'Quiz: Morphometry and Quantitative Stereology', count: 1, available: true },
      { id: 'quiz-dm5-res-meth-bio-med-lec-05', titleEn: 'Quiz: Electrophysiological Diagnostic Methods (EMG & Nerve Conduction)', count: 1, available: true },
      { id: 'quiz-res-meth-bio-med-01', titleEn: 'Research Methods & Evidence-Based Dentistry Question Bank', count: 2, available: true },
    ],
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
