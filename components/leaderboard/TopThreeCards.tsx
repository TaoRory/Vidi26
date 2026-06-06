"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import BoardingPassCard from "@/components/theme/BoardingPassCard";
import { formatScore } from "@/lib/utils";
import type { LeaderboardEntry } from "@/lib/supabase/types";

interface TopThreeCardsProps {
  top3: LeaderboardEntry[];
}

const VARIANTS: Array<"gold" | "silver" | "bronze"> = ["gold", "silver", "bronze"];
const HEIGHTS = ["lg:mt-8", "lg:mt-0", "lg:mt-16"];
const TROPHIES = ["🥇", "🥈", "🥉"];

export default function TopThreeCards({ top3 }: TopThreeCardsProps) {
  const ordered = [
    top3[1] ?? null,
    top3[0] ?? null,
    top3[2] ?? null,
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
      {ordered.map((entry, displayIdx) => {
        const actualRank = displayIdx === 0 ? 2 : displayIdx === 1 ? 1 : 3;
        const variant = VARIANTS[actualRank - 1];
        const height = HEIGHTS[displayIdx];

        if (!entry) {
          return (
            <div
              key={`empty-${displayIdx}`}
              className={`${height} rounded-xl`}
              style={{ backgroundColor: "var(--bg-surface)", border: "1px solid var(--border-subtle)", minHeight: 200, opacity: 0.4 }}
            />
          );
        }

        return (
          <motion.div
            key={entry.id}
            layout
            layoutId={`top-${entry.id}`}
            className={height}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: displayIdx * 0.1 }}
          >
            <BoardingPassCard
              rank={actualRank}
              teamNumber={entry.team_number}
              teamName={entry.name}
              score={formatScore(Number(entry.total_score))}
              subLabel={`${Number(entry.challenges_scored)} thử thách hoàn thành`}
              variant={variant}
            >
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl mb-2">{TROPHIES[actualRank - 1]}</div>
                  <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>
                    TEAM {entry.team_number}
                  </div>
                  <div
                    className="text-lg sm:text-xl font-bold leading-tight"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {entry.name}
                  </div>
                  <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                    {Number(entry.challenges_scored)} thử thách
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] uppercase mb-0.5" style={{ color: "var(--text-muted)" }}>SCORE</div>
                  <div
                    className="text-2xl sm:text-3xl font-bold tabular-nums"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: variant === "gold" ? "var(--accent-gold)" : variant === "silver" ? "#94a3b8" : "#cd7f32",
                      textShadow: `0 0 16px currentColor`,
                    }}
                  >
                    {formatScore(Number(entry.total_score))}
                  </div>
                </div>
              </div>
            </BoardingPassCard>
          </motion.div>
        );
      })}
    </div>
  );
}
