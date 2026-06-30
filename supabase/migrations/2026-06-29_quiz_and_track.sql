-- Track column on existing progress (existing rows inherit 'stack')
ALTER TABLE user_progress ADD COLUMN IF NOT EXISTS track TEXT DEFAULT 'stack';

-- Quiz + diagnostic results
CREATE TABLE IF NOT EXISTS quiz_results (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID REFERENCES auth.users(id),
  lesson_id   TEXT NOT NULL,
  quiz_type   TEXT NOT NULL,
  pillar      TEXT,
  score       INTEGER NOT NULL,
  answers     JSONB,
  taken_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "ver próprios resultados" ON quiz_results;
CREATE POLICY "ver próprios resultados" ON quiz_results
  FOR ALL USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS quiz_results_user_lesson_idx
  ON quiz_results (user_id, lesson_id);
