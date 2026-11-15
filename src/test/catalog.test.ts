import { describe, it, expect } from 'vitest';
import semesterData from '../../content/courses/fifth-semester.json';
import carQuiz01 from '../../content/quizzes/quiz-car-hard-dent-01.json';
import pharmQuiz01 from '../../content/quizzes/sample-quiz-pharm.json';

describe('Official Course Catalog Verification', () => {
  it('must contain EXACTLY 12 official subjects', () => {
    expect(semesterData.subjects).toBeDefined();
    expect(semesterData.subjects.length).toBe(12);
  });

  it('must preserve exact official course codes', () => {
    const codes = semesterData.subjects.map(s => s.code);
    expect(codes).toContain('DM.5 CAR HARD DENT');
    expect(codes).toContain('DM.5 EPES');
    expect(codes).toContain('DM.5 FUND TERR EXT');
    expect(codes).toContain('DM.5 MICROMVIRO');
    expect(codes).toContain('DM.5 PATHOL ANAT');
    expect(codes).toContain('DM.5 PATHOL PHYS');
    expect(codes).toContain('DM.5 PHARM');
    expect(codes).toContain('DM.5 PROPAED INT MED');
    expect(codes).toContain('DM.5 PUB HEALTH');
    expect(codes).toContain('DM.5 RAD DIAG');
    expect(codes).toContain('DM.5 RES METH BIO MED');
    expect(codes).toContain('DM.5 TOPOGR ANAT');
  });

  it('must define valid availability states', () => {
    const validStates = ['available', 'coming-soon', 'in-progress', 'completed'];
    semesterData.subjects.forEach(s => {
      expect(validStates).toContain(s.status);
    });
  });

  it('available subjects must map to existing source book files', () => {
    const available = semesterData.subjects.filter(s => s.status === 'available');
    expect(available.length).toBeGreaterThan(0);
    available.forEach(s => {
      expect(s.sourceFiles.length).toBeGreaterThan(0);
    });
  });
});

describe('Quiz Scoring & Question Bank Integrity', () => {
  it('cariology quiz must contain valid single-choice MCQs', () => {
    expect(carQuiz01.questions.length).toBeGreaterThan(0);
    carQuiz01.questions.forEach(q => {
      expect(q.options.length).toBe(4);
      expect(q.correctOptionId).toBeDefined();
      const match = q.options.find(o => o.id === q.correctOptionId);
      expect(match).toBeDefined();
      expect(q.explanationAr).toBeDefined();
      expect(q.explanationEn).toBeDefined();
    });
  });

  it('pharmacology quiz must validate correct option IDs and explanations', () => {
    expect(pharmQuiz01.questions.length).toBe(5);
    pharmQuiz01.questions.forEach(q => {
      expect(q.options.length).toBe(4);
      const match = q.options.find(o => o.id === q.correctOptionId);
      expect(match).toBeDefined();
    });
  });
});
