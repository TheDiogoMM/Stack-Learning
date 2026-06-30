import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import type { Answers } from '@/lib/scoring';

export interface QuizRecord {
  lessonId: string;
  quizType: 'diagnostic' | 'lesson';
  pillar?: string;
  score: number;
  answers: Answers;
  takenAt: string;
}

interface QuizContextValue {
  results: QuizRecord[];
  latestFor: (lessonId: string) => QuizRecord | undefined;
  saveResult: (r: Omit<QuizRecord, 'takenAt'>) => Promise<void>;
}

const LS_KEY = 'sl_quiz_results';
const QuizContext = createContext<QuizContextValue | null>(null);

function readLocal(): QuizRecord[] {
  try { return JSON.parse(localStorage.getItem(LS_KEY) ?? '[]'); } catch { return []; }
}
function writeLocal(rs: QuizRecord[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(rs));
}

export function QuizProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [results, setResults] = useState<QuizRecord[]>(() => readLocal());

  // Hydrate from Supabase on login
  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from('quiz_results')
        .select('lesson_id, quiz_type, pillar, score, answers, taken_at')
        .eq('user_id', user.id)
        .order('taken_at', { ascending: false });
      if (cancelled || !data) return;
      const mapped: QuizRecord[] = data.map((r: any) => ({
        lessonId: r.lesson_id, quizType: r.quiz_type, pillar: r.pillar ?? undefined,
        score: r.score, answers: r.answers ?? {}, takenAt: r.taken_at,
      }));
      setResults(mapped);
      writeLocal(mapped);
    })();
    return () => { cancelled = true; };
  }, [user]);

  const saveResult = useCallback(async (r: Omit<QuizRecord, 'takenAt'>) => {
    const takenAt = new Date().toISOString();
    const rec: QuizRecord = { ...r, takenAt };
    setResults((prev) => { const next = [rec, ...prev]; writeLocal(next); return next; });
    if (user) {
      const { error } = await supabase.from('quiz_results').insert({
        user_id: user.id, lesson_id: r.lessonId, quiz_type: r.quizType,
        pillar: r.pillar ?? null, score: r.score, answers: r.answers,
        taken_at: takenAt,
      });
      if (error) console.error('[QuizProvider] saveResult insert failed:', error.message);
    }
  }, [user]);

  const latestFor = useCallback(
    (lessonId: string) => results.find((r) => r.lessonId === lessonId),
    [results],
  );

  const value = useMemo<QuizContextValue>(
    () => ({ results, latestFor, saveResult }),
    [results, latestFor, saveResult],
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuizStore(): QuizContextValue {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error('useQuizStore must be used within QuizProvider');
  return ctx;
}
