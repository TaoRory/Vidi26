import { createClient } from "@/lib/supabase/server";
import LeaderboardLive from "@/components/leaderboard/LeaderboardLive";
import LeaderboardHeader from "./LeaderboardHeader";
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
      <LeaderboardHeader />

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <LeaderboardLive initialData={leaderboard} stations={stations} />
      </div>
    </div>
  );
}
