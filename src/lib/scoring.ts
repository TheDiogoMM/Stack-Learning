import type { QuizQuestion } from '@/data/quizzes';
import type { Pillar } from '@/data/lessons';

export type Answers = Record<string, number>;

/** Percentage (0–100, rounded) of correctly answered questions. */
export function scoreQuiz(questions: QuizQuestion[], answers: Answers): number {
  if (questions.length === 0) return 0;
  const correct = questions.reduce(
    (n, q) => n + (answers[q.id] === q.correctIndex ? 1 : 0), 0,
  );
  return Math.round((correct / questions.length) * 100);
}

export interface DiagnosticResult {
  byPillar: Record<Pillar, number>;
  overall: number;
}

const PILLARS: Pillar[] = ['Fundamentos', 'Integração', 'Autonomia', 'Produção'];

export function scoreDiagnostic(questions: QuizQuestion[], answers: Answers): DiagnosticResult {
  const byPillar = {} as Record<Pillar, number>;
  for (const p of PILLARS) {
    const qs = questions.filter((q) => q.pillar === p);
    byPillar[p] = qs.length ? scoreQuiz(qs, answers) : 0;
  }
  const overall = scoreQuiz(questions, answers);
  return { byPillar, overall };
}

export interface Recommendation {
  focus: Pillar[];       // < 60 — needs attention
  canSkip: Pillar[];     // > 80 — likely already mastered
  startPillar: Pillar;   // first pillar (by order) that is < 80
}

export function recommendations(byPillar: Record<Pillar, number>): Recommendation {
  const focus = PILLARS.filter((p) => byPillar[p] < 60);
  const canSkip = PILLARS.filter((p) => byPillar[p] > 80);
  const startPillar = PILLARS.find((p) => byPillar[p] < 80) ?? 'Fundamentos';
  return { focus, canSkip, startPillar };
}

export function deltaLabel(before: number, after: number): string {
  const d = after - before;
  return d > 0 ? `+${d}%` : `${d}%`;
}
