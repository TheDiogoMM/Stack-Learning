import { describe, it, expect } from 'vitest';
import { scoreQuiz, scoreDiagnostic, recommendations, deltaLabel } from './scoring';
import type { QuizQuestion } from '@/data/quizzes';

const q = (id: string, correctIndex: number, pillar?: any): QuizQuestion => ({
  id, prompt: id, options: ['a', 'b', 'c', 'd'], correctIndex, explanation: '', pillar,
});

describe('scoreQuiz', () => {
  it('returns 100 when all answers correct', () => {
    const qs = [q('1', 0), q('2', 1), q('3', 2)];
    expect(scoreQuiz(qs, { '1': 0, '2': 1, '3': 2 })).toBe(100);
  });
  it('returns 0 when all wrong', () => {
    const qs = [q('1', 0), q('2', 1)];
    expect(scoreQuiz(qs, { '1': 3, '2': 3 })).toBe(0);
  });
  it('rounds partial scores', () => {
    const qs = [q('1', 0), q('2', 1), q('3', 2)];
    expect(scoreQuiz(qs, { '1': 0, '2': 1, '3': 0 })).toBe(67);
  });
  it('treats missing answers as wrong', () => {
    const qs = [q('1', 0), q('2', 1)];
    expect(scoreQuiz(qs, { '1': 0 })).toBe(50);
  });
});

describe('scoreDiagnostic', () => {
  it('computes per-pillar and overall scores', () => {
    const qs = [q('a', 0, 'Fundamentos'), q('b', 0, 'Fundamentos'), q('c', 0, 'Integração')];
    const res = scoreDiagnostic(qs, { a: 0, b: 3, c: 0 });
    expect(res.byPillar.Fundamentos).toBe(50);
    expect(res.byPillar['Integração']).toBe(100);
    expect(res.overall).toBe(67);
  });
});

describe('recommendations', () => {
  it('flags weak pillars below 60 and strong above 80', () => {
    const rec = recommendations({ Fundamentos: 40, 'Integração': 90, Autonomia: 70, 'Produção': 55 } as any);
    expect(rec.focus).toContain('Fundamentos');
    expect(rec.focus).toContain('Produção');
    expect(rec.canSkip).toContain('Integração');
  });
});

describe('deltaLabel', () => {
  it('formats positive delta', () => { expect(deltaLabel(40, 75)).toBe('+35%'); });
  it('formats zero delta', () => { expect(deltaLabel(50, 50)).toBe('0%'); });
  it('formats negative delta', () => { expect(deltaLabel(80, 60)).toBe('-20%'); });
});
