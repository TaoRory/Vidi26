import { createClient } from "@/lib/supabase/server";
import { Trophy, Users, Target, Clock } from "lucide-react";
import Link from "next/link";
import GlowPanel from "@/components/theme/GlowPanel";
import NeonButton from "@/components/theme/NeonButton";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard — Admin" };

export const revalidate = 0;

async function getStats() {
  try {
    const supabase = await createClient();
    const [
      { count: totalScores },
      { count: totalTeams },
      { count: totalChallenges },
      { data: recentScores },
    ] = await Promise.all([
      supabase.from("scores").select("*", { count: "exact", head: true }),
      supabase.from("teams").select("*", { count: "exact", head: true }),
      supabase.from("challenges").select("*", { count: "exact", head: true }).eq("active", true),
      supabase
        .from("scores")
        .select("id, raw_score, notes, created_at, teams(name, team_number), challenges(name)")
        .order("created_at", { ascending: false })
        .limit(5),
    ]);
    return { totalScores: totalScores ?? 0, totalTeams: totalTeams ?? 0, totalChallenges: totalChallenges ?? 0, recentScores: recentScores ?? [] };
  } catch {
    return { totalScores: 0, totalTeams: 0, totalChallenges: 0, recentScores: [] };
  }
}

export default async function AdminDashboardPage() {
  const { totalScores, totalTeams, totalChallenges, recentScores } = await getStats();

  const stats = [
    { label: "Lượt nhập điểm", value: totalScores, icon: Trophy, color: "var(--accent-gold)" },
    { label: "Số đội", value: totalTeams, icon: Users, color: "var(--neon-primary)" },
    { label: "Thử thách đang mở", value: totalChallenges, icon: Target, color: "var(--accent-sunset)" },
  ];

  return (
    <div className="p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-black uppercase" style={{ color: "var(--text-primary)" }}>
          Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          VIDI26 Control Station
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <GlowPanel key={stat.label} elevated>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${stat.color}22`, border: `1px solid ${stat.color}44` }}
                >
                  <Icon size={18} style={{ color: stat.color }} />
                </div>
                <div>
                  <div
                    className="text-2xl font-black tabular-nums"
                    style={{ color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {stat.label}
                  </div>
                </div>
              </div>
            </GlowPanel>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="mb-8">
        <h2 className="text-sm uppercase tracking-wider font-bold mb-4" style={{ color: "var(--text-secondary)" }}>
          Thao tác nhanh
        </h2>
        <div className="flex gap-3 flex-wrap">
          <Link href="/admin/scores">
            <NeonButton variant="primary" size="sm">
              <Trophy size={14} /> Nhập điểm
            </NeonButton>
          </Link>
          <Link href="/leaderboard" target="_blank">
            <NeonButton variant="secondary" size="sm">
              Xem leaderboard
            </NeonButton>
          </Link>
        </div>
      </div>

      {/* Recent activity */}
      <div>
        <h2 className="text-sm uppercase tracking-wider font-bold mb-4" style={{ color: "var(--text-secondary)" }}>
          Hoạt động gần đây
        </h2>
        <GlowPanel className="p-0 overflow-hidden">
          {recentScores.length === 0 ? (
            <p className="text-center py-8 text-sm" style={{ color: "var(--text-muted)" }}>
              Chưa có điểm nào được nhập
            </p>
          ) : (
            <div>
              {(recentScores as Array<{ id: string; raw_score: number; notes: string | null; created_at: string; teams: { name: string; team_number: number } | null; challenges: { name: string } | null }>).map((s, i) => (
                <div
                  key={s.id}
                  className="flex items-center gap-3 px-5 py-3"
                  style={{ borderBottom: i < recentScores.length - 1 ? "1px solid var(--border-subtle)" : "none" }}
                >
                  <Clock size={14} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                      {s.teams?.name ?? "—"}
                    </span>
                    <span className="text-xs mx-2" style={{ color: "var(--text-muted)" }}>·</span>
                    <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                      {s.challenges?.name ?? "—"}
                    </span>
                    {s.notes && (
                      <p className="text-xs truncate mt-0.5" style={{ color: "var(--text-muted)" }}>{s.notes}</p>
                    )}
                  </div>
                  <div
                    className="text-sm font-bold tabular-nums shrink-0"
                    style={{ color: "var(--neon-primary)", fontFamily: "var(--font-mono)" }}
                  >
                    {s.raw_score}
                  </div>
                  <div className="text-xs shrink-0" style={{ color: "var(--text-muted)" }}>
                    {new Date(s.created_at).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </GlowPanel>
      </div>
    </div>
  );
}
