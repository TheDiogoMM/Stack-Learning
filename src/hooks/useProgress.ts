import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { supabase } from '@/lib/supabase';

interface ProgressState {
  completed: string[];
  bookmarked: string[];
}

interface ProgressContext extends ProgressState {
  markComplete: (lessonId: string) => void;
  unmarkComplete: (lessonId: string) => void;
  toggleBookmark: (lessonId: string) => void;
  isCompleted: (lessonId: string) => boolean;
  isBookmarked: (lessonId: string) => boolean;
  getProgressPercent: (lessonIds: string[]) => number;
}

export const ProgressContext = createContext<ProgressContext>({
  completed: [],
  bookmarked: [],
  markComplete: () => {},
  unmarkComplete: () => {},
  toggleBookmark: () => {},
  isCompleted: () => false,
  isBookmarked: () => false,
  getProgressPercent: () => 0,
});

export function useProgress() {
  return useContext(ProgressContext);
}

const LS_COMPLETED = 'sl_completed_lessons';
const LS_BOOKMARKED = 'sl_bookmarked_lessons';

function loadFromStorage(): ProgressState {
  try {
    return {
      completed: JSON.parse(localStorage.getItem(LS_COMPLETED) ?? '[]'),
      bookmarked: JSON.parse(localStorage.getItem(LS_BOOKMARKED) ?? '[]'),
    };
  } catch {
    return { completed: [], bookmarked: [] };
  }
}

function saveToStorage(state: ProgressState) {
  localStorage.setItem(LS_COMPLETED, JSON.stringify(state.completed));
  localStorage.setItem(LS_BOOKMARKED, JSON.stringify(state.bookmarked));
}

export function useProgressProvider(): ProgressContext {
  const [state, setState] = useState<ProgressState>(loadFromStorage);

  // Carrega do Supabase se localStorage estiver vazio
  useEffect(() => {
    const stored = loadFromStorage();
    if (stored.completed.length > 0 || stored.bookmarked.length > 0) return;

    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      const { data: rows } = await supabase
        .from('user_progress')
        .select('lesson_id, completed, bookmarked')
        .eq('user_id', data.user.id);

      if (!rows || rows.length === 0) return;

      const completed = rows.filter(r => r.completed).map(r => r.lesson_id as string);
      const bookmarked = rows.filter(r => r.bookmarked).map(r => r.lesson_id as string);
      const next = { completed, bookmarked };
      setState(next);
      saveToStorage(next);
    });
  }, []);

  // Sync para Supabase a cada 5 minutos
  useEffect(() => {
    const interval = setInterval(() => syncToSupabase(state), 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [state]);

  function update(next: ProgressState) {
    setState(next);
    saveToStorage(next);
  }

  const markComplete = useCallback((lessonId: string) => {
    setState(prev => {
      if (prev.completed.includes(lessonId)) return prev;
      const next = { ...prev, completed: [...prev.completed, lessonId] };
      saveToStorage(next);
      return next;
    });
  }, []);

  const unmarkComplete = useCallback((lessonId: string) => {
    setState(prev => {
      const next = { ...prev, completed: prev.completed.filter(id => id !== lessonId) };
      saveToStorage(next);
      return next;
    });
  }, []);

  const toggleBookmark = useCallback((lessonId: string) => {
    setState(prev => {
      const has = prev.bookmarked.includes(lessonId);
      const next = {
        ...prev,
        bookmarked: has
          ? prev.bookmarked.filter(id => id !== lessonId)
          : [...prev.bookmarked, lessonId],
      };
      saveToStorage(next);
      return next;
    });
  }, []);

  const isCompleted = useCallback((lessonId: string) => state.completed.includes(lessonId), [state.completed]);
  const isBookmarked = useCallback((lessonId: string) => state.bookmarked.includes(lessonId), [state.bookmarked]);

  const getProgressPercent = useCallback((lessonIds: string[]) => {
    if (lessonIds.length === 0) return 0;
    const done = lessonIds.filter(id => state.completed.includes(id)).length;
    return Math.round((done / lessonIds.length) * 100);
  }, [state.completed]);

  void update; // evita warning — update é usado via setState direto nas funções acima

  return { ...state, markComplete, unmarkComplete, toggleBookmark, isCompleted, isBookmarked, getProgressPercent };
}

async function syncToSupabase(state: ProgressState) {
  const { data } = await supabase.auth.getUser();
  if (!data.user) return;

  const allIds = Array.from(new Set([...state.completed, ...state.bookmarked]));
  if (allIds.length === 0) return;

  const rows = allIds.map(lesson_id => ({
    user_id: data.user!.id,
    lesson_id,
    completed: state.completed.includes(lesson_id),
    bookmarked: state.bookmarked.includes(lesson_id),
    updated_at: new Date().toISOString(),
  }));

  await supabase.from('user_progress').upsert(rows, { onConflict: 'user_id,lesson_id' });
}
