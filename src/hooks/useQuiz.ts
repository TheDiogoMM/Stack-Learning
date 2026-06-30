import { useCallback, useMemo, useState } from 'react';
import type { QuizQuestion } from '@/data/quizzes';
import { scoreQuiz, type Answers } from '@/lib/scoring';

export interface UseQuiz {
  index: number;
  current: QuizQuestion;
  total: number;
  answers: Answers;
  revealed: boolean;
  isLast: boolean;
  selected?: number;
  select: (choice: number) => void;
  next: () => void;
  score: number;
  finished: boolean;
}

/** Drives a single lesson quiz: select → reveal → next, computing the final score. */
export function useQuiz(questions: QuizQuestion[]): UseQuiz {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);

  const current = questions[index];
  const isLast = index === questions.length - 1;

  const select = useCallback((choice: number) => {
    if (revealed) return;
    setAnswers((a) => ({ ...a, [current.id]: choice }));
    setRevealed(true);
  }, [current, revealed]);

  const next = useCallback(() => {
    if (isLast) { setFinished(true); return; }
    setIndex((i) => i + 1);
    setRevealed(false);
  }, [isLast]);

  const score = useMemo(() => scoreQuiz(questions, answers), [questions, answers]);

  return {
    index, current, total: questions.length, answers, revealed, isLast,
    selected: answers[current?.id], select, next, score, finished,
  };
}
