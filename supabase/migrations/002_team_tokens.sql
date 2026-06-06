-- Migration 002: Team access tokens for team leader portal

-- Add unique secret token to each team
ALTER TABLE teams
  ADD COLUMN IF NOT EXISTS access_token UUID NOT NULL DEFAULT gen_random_uuid();

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'teams_access_token_key'
  ) THEN
    ALTER TABLE teams ADD CONSTRAINT teams_access_token_key UNIQUE (access_token);
  END IF;
END $$;

-- SECURITY DEFINER function: returns a team's score breakdown given its token.
-- Runs with postgres privileges (bypasses RLS on scores/latest_scores),
-- but only ever returns data for the one team matching the token.
CREATE OR REPLACE FUNCTION get_team_by_token(p_token UUID)
RETURNS TABLE (
  team_id        UUID,
  team_number    INT,
  team_name      TEXT,
  color_hex      TEXT,
  total_score    NUMERIC,
  team_rank      BIGINT,
  challenge_id   UUID,
  challenge_name TEXT,
  station_name   TEXT,
  raw_score      NUMERIC,
  max_score      INT,
  weight         NUMERIC,
  scored_at      TIMESTAMPTZ
)
SECURITY DEFINER
SET search_path = public
LANGUAGE sql
AS $$
  WITH matched_team AS (
    SELECT id, team_number, name, color_hex
    FROM   teams
    WHERE  access_token = p_token
  ),
  team_total AS (
    SELECT COALESCE(SUM(ls.raw_score * c.weight), 0) AS total
    FROM   latest_scores ls
    JOIN   challenges c ON c.id = ls.challenge_id
    WHERE  ls.team_id = (SELECT id FROM matched_team)
  ),
  all_ranks AS (
    SELECT id, rank() OVER (ORDER BY total_score DESC) AS r
    FROM   leaderboard
  )
  SELECT
    t.id,
    t.team_number,
    t.name,
    t.color_hex,
    tt.total,
    ar.r,
    c.id,
    c.name,
    s.name_vi,
    ls.raw_score,
    c.max_score,
    c.weight,
    ls.created_at
  FROM       matched_team  t
  CROSS JOIN team_total    tt
  LEFT JOIN  all_ranks     ar ON ar.id = t.id
  LEFT JOIN  latest_scores ls ON ls.team_id = t.id
  LEFT JOIN  challenges    c  ON c.id = ls.challenge_id
  LEFT JOIN  stations      s  ON s.id = c.station_id
  ORDER BY   s.order_index NULLS LAST, c.name
$$;

-- Allow anon (unauthenticated) to call this function
GRANT EXECUTE ON FUNCTION get_team_by_token(UUID) TO anon;
