"use client";

import { motion } from "framer-motion";
import { formatScore, formatRelativeTime } from "@/lib/utils";
import type { LeaderboardEntry } from "@/lib/supabase/types";

interface DepartureBoardRowProps {
  entry: LeaderboardEntry;
  rank: number;
}

export default function DepartureBoardRow({ entry, rank }: DepartureBoardRowProps) {
  return (
    <motion.div
      layout
      layoutId={entry.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-3 sm:gap-4 px-4 py-3 rounded-lg transition-colors cursor-default"
      style={{ border: "1px solid var(--border-subtle)" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(63,169,255,0.04)";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-glow)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = "";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)";
      }}
    >
      {/* Rank */}
      <div
        className="w-8 text-center font-bold tabular-nums text-sm shrink-0"
        style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
      >
        {rank}
      </div>

      {/* Team color badge */}
      <div
        className="w-9 h-9 rounded flex items-center justify-center text-xs font-bold shrink-0"
        style={{
          backgroundColor: entry.color_hex ? `${entry.color_hex}33` : "rgba(63,169,255,0.15)",
          border: `2px solid ${entry.color_hex || "var(--neon-primary)"}`,
          color: "var(--text-primary)",
        }}
      >
        {entry.team_number}
      </div>

      {/* Name + meta */}
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm truncate" style={{ color: "var(--text-primary)" }}>
          {entry.name}
        </div>
        <div className="text-xs flex items-center gap-2 mt-0.5" style={{ color: "var(--text-muted)" }}>
          <span>{Number(entry.challenges_scored)} thử thách</span>
          {entry.last_update && (
            <>
              <span>·</span>
              <span>{formatRelativeTime(entry.last_update)}</span>
            </>
          )}
        </div>
      </div>

      {/* Score */}
      <div className="text-right shrink-0">
        <div
          className="text-base font-bold tabular-nums"
          style={{ color: "var(--neon-primary)", fontFamily: "var(--font-mono)" }}
        >
          {formatScore(Number(entry.total_score))}
        </div>
        <div className="text-[9px] uppercase" style={{ color: "var(--text-muted)" }}>điểm</div>
      </div>
    </motion.div>
  );
}
