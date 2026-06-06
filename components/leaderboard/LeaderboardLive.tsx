"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { RefreshCw, Radio } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import TopThreeCards from "./TopThreeCards";
import DepartureBoardRow from "./DepartureBoardRow";
import type { LeaderboardEntry, Station } from "@/lib/supabase/types";
import GlowPanel from "@/components/theme/GlowPanel";

const POLL_INTERVAL = 10_000;

interface LeaderboardLiveProps {
  initialData: LeaderboardEntry[];
  stations: Station[];
}

export default function LeaderboardLive({ initialData, stations }: LeaderboardLiveProps) {
  const [data, setData] = useState<LeaderboardEntry[]>(initialData);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchLeaderboard = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data: fresh } = await supabase
        .from("leaderboard")
        .select("*")
        .order("total_score", { ascending: false });
      if (fresh) {
        setData(fresh);
        setLastUpdate(new Date());
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const id = setInterval(fetchLeaderboard, POLL_INTERVAL);
    return () => clearInterval(id);
  }, [fetchLeaderboard]);

  const sorted = [...data].sort((a, b) => Number(b.total_score) - Number(a.total_score));
  const top3 = sorted.slice(0, 3);
  const rest = sorted.slice(3);

  return (
    <div>
      {/* Status bar */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          {/* Station filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setFilter("all")}
              className="px-3 py-1.5 text-xs rounded uppercase tracking-wider font-medium transition-all"
              style={{
                backgroundColor: filter === "all" ? "var(--neon-primary)" : "var(--bg-elevated)",
                color: filter === "all" ? "#050814" : "var(--text-secondary)",
                border: filter === "all" ? "1px solid var(--neon-primary)" : "1px solid var(--border-subtle)",
              }}
            >
              Tất cả
            </button>
            {stations.map((s) => (
              <button
                key={s.id}
                onClick={() => setFilter(s.slug)}
                className="px-3 py-1.5 text-xs rounded uppercase tracking-wider font-medium transition-all"
                style={{
                  backgroundColor: filter === s.slug ? "var(--neon-primary)" : "var(--bg-elevated)",
                  color: filter === s.slug ? "#050814" : "var(--text-secondary)",
                  border: filter === s.slug ? "1px solid var(--neon-primary)" : "1px solid var(--border-subtle)",
                }}
              >
                {s.name_vi}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Poll status */}
          <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--neon-primary)" }}>
            <Radio size={12} />
            Auto · 10s
          </div>

          {lastUpdate && (
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              {lastUpdate.toLocaleTimeString("vi-VN")}
            </span>
          )}

          <button
            onClick={fetchLeaderboard}
            disabled={loading}
            className="p-1.5 rounded transition-colors"
            style={{ color: "var(--text-muted)", backgroundColor: "var(--bg-elevated)" }}
            title="Làm mới"
          >
            <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Top 3 */}
      {top3.length > 0 && <TopThreeCards top3={top3} />}

      {/* Departure board: ranks 4–24 */}
      {rest.length > 0 && (
        <GlowPanel className="p-4">
          <div className="text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ backgroundColor: "var(--neon-primary)", animation: "pulse 2s infinite" }}
            />
            Bảng xếp hạng — {data.length} đội
          </div>
          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {rest.map((entry, idx) => (
                <DepartureBoardRow key={entry.id} entry={entry} rank={idx + 4} />
              ))}
            </AnimatePresence>
          </div>
        </GlowPanel>
      )}

      {data.length === 0 && (
        <GlowPanel>
          <p className="text-center py-12" style={{ color: "var(--text-muted)" }}>
            Đang đồng bộ tín hiệu... quay lại sau
          </p>
        </GlowPanel>
      )}
    </div>
  );
}
