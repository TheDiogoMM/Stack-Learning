import { useCallback, useMemo, useState } from 'react';
import { diagnosticQuestions } from '@/data/quizzes';
import { scoreDiagnostic, recommendations, type Answers } from '@/lib/scoring';

export interface UseDiagnostic {
  index: number;
  total: number;
  answers: Answers;
  current: typeof diagnosticQuestions[number];
  selected?: number;
  canPrev: boolean;
  canNext: boolean;
  isLast: boolean;
  select: (choice: number) => void;
  prev: () => void;
  next: () => void;
  result: ReturnType<typeof scoreDiagnostic> & { recs: ReturnType<typeof recommendations> };
}

/** Drives the 12-question diagnostic with free back/forward navigation. */
export function useDiagnostic(): UseDiagnostic {
  const questions = diagnosticQuestions;
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const current = questions[index];
  const isLast = index === questions.length - 1;

  const select = useCallback((choice: number) => {
    setAnswers((a) => ({ ...a, [current.id]: choice }));
  }, [current]);

  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const next = useCallback(() => {
    if (answers[current.id] === undefined) return;
    setIndex((i) => Math.min(questions.length - 1, i + 1));
  }, [answers, current.id, questions.length]);

  const result = useMemo(() => {
    const base = scoreDiagnostic(questions, answers);
    return { ...base, recs: recommendations(base.byPillar) };
  }, [questions, answers]);

  return {
    index, total: questions.length, answers, current,
    selected: answers[current.id],
    canPrev: index > 0, canNext: answers[current.id] !== undefined,
    isLast, select, prev, next, result,
  };
}
