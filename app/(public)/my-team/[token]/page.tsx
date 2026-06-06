import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Trophy, Star, Target } from "lucide-react";
import type { Metadata } from "next";
import type { Database } from "@/lib/supabase/types";

export const revalidate = 30;

type TeamRow = Database["public"]["Functions"]["get_team_by_token"]["Returns"][number];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ token: string }>;
}): Promise<Metadata> {
  const { token } = await params;
  const supabase = await createClient();
  const { data } = await supabase.rpc("get_team_by_token", { p_token: token });
  if (!data || data.length === 0) return { title: "VIDI26" };
  return { title: `${data[0].team_name} — VIDI26` };
}

export default async function MyTeamPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_team_by_token", { p_token: token });

  const rows: TeamRow[] = data ?? [];
  if (error || rows.length === 0) notFound();

  const team = rows[0];
  const color = team.color_hex ?? "var(--neon-primary)";
  const challenges = rows.filter((r) => r.challenge_id !== null);

  // Group challenges by station
  const byStation: Record<string, TeamRow[]> = {};
  for (const row of challenges) {
    const key = row.station_name ?? "Khác";
    if (!byStation[key]) byStation[key] = [];
    byStation[key].push(row);
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-deep)" }}>
      <div className="mx-auto max-w-xl px-4 py-8">

        {/* Team header card */}
        <div
          className="rounded-2xl p-6 mb-6"
          style={{
            backgroundColor: "var(--bg-surface)",
            border: `2px solid ${color}55`,
            boxShadow: `0 0 32px ${color}18`,
          }}
        >
          {/* Color stripe */}
          <div className="w-10 h-1 rounded-full mb-4" style={{ backgroundColor: color }} />

          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>
                ĐỘI CỦA BẠN
              </div>
              <h1
                className="text-2xl font-black uppercase tracking-wide"
                style={{ color: "var(--text-primary)", fontFamily: "var(--font-serif)" }}
              >
                {team.team_name}
              </h1>
              <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                Team #{String(team.team_number).padStart(2, "0")} · VIDI26 Express
              </div>
            </div>

            {/* Rank badge */}
            <div
              className="shrink-0 rounded-xl px-4 py-3 text-center"
              style={{ backgroundColor: `${color}18`, border: `1px solid ${color}44` }}
            >
              <div className="text-[9px] uppercase tracking-widest" style={{ color }}>
                Xếp hạng
              </div>
              <div className="text-3xl font-black tabular-nums leading-none mt-1" style={{ color, fontFamily: "var(--font-mono)" }}>
                #{team.team_rank ?? "—"}
              </div>
              <div className="text-[9px] mt-0.5" style={{ color: "var(--text-muted)" }}>/ 24 đội</div>
            </div>
          </div>

          {/* Total score */}
          <div
            className="mt-5 rounded-xl px-4 py-3 flex items-center justify-between"
            style={{ backgroundColor: "var(--bg-deep)" }}
          >
            <div className="flex items-center gap-2">
              <Trophy size={16} style={{ color: "var(--accent-gold)" }} />
              <span className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>
                Tổng điểm
              </span>
            </div>
            <span
              className="text-2xl font-black tabular-nums"
              style={{ color: "var(--accent-gold)", fontFamily: "var(--font-mono)" }}
            >
              {Number(team.total_score).toFixed(1)}
            </span>
          </div>
        </div>

        {/* Challenge breakdown */}
        <div className="mb-2">
          <h2
            className="text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2"
            style={{ color: "var(--text-muted)" }}
          >
            <Target size={12} />
            Chi tiết điểm theo trạm
          </h2>

          {challenges.length === 0 ? (
            <div
              className="rounded-xl p-10 text-center"
              style={{ backgroundColor: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}
            >
              <Star size={28} className="mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Đội bạn chưa có điểm nào, theo dõi tiếp nhé!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(byStation).map(([stationName, items]) => (
                <div
                  key={stationName}
                  className="rounded-xl overflow-hidden"
                  style={{ backgroundColor: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}
                >
                  {/* Station header */}
                  <div
                    className="px-4 py-2.5 flex items-center gap-2"
                    style={{ backgroundColor: "var(--bg-elevated)", borderBottom: "1px solid var(--border-subtle)" }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color }}>
                      {stationName}
                    </span>
                  </div>

                  {/* Challenges */}
                  <div>
                    {items.map((row, i) => {
                      const pct = row.max_score ? Math.round(((row.raw_score ?? 0) / row.max_score) * 100) : 0;
                      return (
                        <div
                          key={row.challenge_id ?? i}
                          className="px-4 py-3"
                          style={{ borderBottom: i < items.length - 1 ? "1px solid var(--border-subtle)" : "none" }}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                              {row.challenge_name}
                            </span>
                            <span
                              className="text-sm font-bold tabular-nums"
                              style={{ color, fontFamily: "var(--font-mono)" }}
                            >
                              {row.raw_score ?? 0}
                              <span className="text-xs font-normal" style={{ color: "var(--text-muted)" }}>
                                /{row.max_score}
                              </span>
                            </span>
                          </div>

                          {/* Progress bar */}
                          <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--bg-elevated)" }}>
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                width: `${pct}%`,
                                backgroundColor: color,
                                boxShadow: `0 0 8px ${color}88`,
                              }}
                            />
                          </div>

                          {row.scored_at && (
                            <div className="text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>
                              Cập nhật{" "}
                              {new Date(row.scored_at).toLocaleTimeString("vi-VN", {
                                hour: "2-digit",
                                minute: "2-digit",
                                day: "2-digit",
                                month: "2-digit",
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer note */}
        <p className="text-center text-[10px] mt-8" style={{ color: "var(--text-muted)" }}>
          Trang này tự động cập nhật · VIDI26 Express 17–19.06.2026
        </p>
      </div>
    </div>
  );
}
