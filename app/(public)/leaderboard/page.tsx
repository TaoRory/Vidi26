import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import LeaderboardLive from "@/components/leaderboard/LeaderboardLive";
import { TrainTrack } from "@/components/theme/TrainTrack";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bảng Xếp Hạng",
  description: "Xếp hạng 24 đội VIDI26 theo thời gian thực",
};

export const revalidate = 0;

async function getData() {
  try {
    const supabase = await createClient();
    const [{ data: leaderboard }, { data: stations }] = await Promise.all([
      supabase
        .from("leaderboard")
        .select("*")
        .order("total_score", { ascending: false }),
      supabase
        .from("stations")
        .select("*")
        .order("order_index"),
    ]);
    return { leaderboard: leaderboard || [], stations: stations || [] };
  } catch {
    return { leaderboard: [], stations: [] };
  }
}

export default async function LeaderboardPage() {
  const { leaderboard, stations } = await getData();

  return (
    <div>
      {/* Header */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(to bottom, rgba(30,64,175,0.2) 0%, transparent 100%)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 pb-8">
          <div className="flex items-center gap-3 mb-2">
            <Image src="/logo-vidi26.svg" alt="VIDI26" width={110} height={52} style={{ objectFit: "contain" }} />
            <div>
              <h1
                className="text-3xl sm:text-4xl font-black uppercase tracking-wider"
                style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
              >
                Tỏa <span style={{ color: "var(--accent-gold)" }}>Sáng</span>
              </h1>
              <p className="text-sm uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                LEADERBOARD · LIVE
              </p>
            </div>
          </div>
          <p className="max-w-2xl text-sm sm:text-base" style={{ color: "var(--text-secondary)" }}>
            Bảng xếp hạng theo thời gian thực. Mỗi đội vượt qua thử thách, điểm cập nhật ngay lập tức.
          </p>
        </div>
        <TrainTrack animated className="mt-2" />
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <LeaderboardLive initialData={leaderboard} stations={stations} />
      </div>
    </div>
  );
}
