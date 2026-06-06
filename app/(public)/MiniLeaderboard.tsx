"use client";

import type { LeaderboardEntry } from "@/lib/supabase/types";
import { formatScore, formatRelativeTime } from "@/lib/utils";

const RANK_COLORS = ["var(--accent-gold)", "#94a3b8", "#cd7f32", "var(--text-secondary)", "var(--text-secondary)"];

export default function MiniLeaderboard({ teams }: { teams: LeaderboardEntry[] }) {
  if (teams.length === 0) {
    return (
      <p className="text-center py-10" style={{ color: "var(--text-muted)" }}>
        Đang đồng bộ tín hiệu...
      </p>
    );
  }

  return (
    <div>
      {teams.map((team, idx) => (
        <div
          key={team.id}
          className="flex items-center gap-4 px-5 py-3.5 transition-colors"
          style={{
            borderBottom: idx < teams.length - 1 ? "1px solid var(--border-subtle)" : "none",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(63,169,255,0.04)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
        >
          <div
            className="w-7 text-center font-black text-sm tabular-nums"
            style={{ color: RANK_COLORS[idx] ?? "var(--text-secondary)", fontFamily: "var(--font-mono)" }}
          >
            {idx + 1}
          </div>
          <div
            className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold"
            style={{
              backgroundColor: team.color_hex ? `${team.color_hex}33` : "var(--bg-elevated)",
              border: `1px solid ${team.color_hex || "var(--border-subtle)"}`,
            }}
          >
            {team.team_number}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm truncate" style={{ color: "var(--text-primary)" }}>
              {team.name}
            </div>
            <div className="text-xs" style={{ color: "var(--text-muted)" }}>
              {team.challenges_scored ?? 0} thử thách · cập nhật {formatRelativeTime(team.last_update)}
            </div>
          </div>
          <div
            className="text-lg font-bold tabular-nums shrink-0"
            style={{ color: idx === 0 ? "var(--accent-gold)" : "var(--neon-primary)", fontFamily: "var(--font-mono)" }}
          >
            {formatScore(Number(team.total_score))}
          </div>
        </div>
      ))}
    </div>
  );
}
