import { createClient } from "@/lib/supabase/server";
import HeroSection from "./HeroSection";
import HomeSections from "./HomeSections";
import type { LeaderboardEntry, Announcement } from "@/lib/supabase/types";

export const revalidate = 0;

async function getHomeData() {
  try {
    const supabase = await createClient();
    const [{ data: leaderboard }, { data: announcements }] = await Promise.all([
      supabase.from("leaderboard").select("*").order("total_score", { ascending: false }).limit(5),
      supabase.from("announcements").select("id, title, slug, published_at, pinned, cover_url").eq("published", true).order("pinned", { ascending: false }).order("published_at", { ascending: false }).limit(3),
    ]);
    return { leaderboard: leaderboard || [], announcements: announcements || [] };
  } catch {
    return { leaderboard: [], announcements: [] };
  }
}

export default async function HomePage() {
  const { leaderboard, announcements } = await getHomeData();

  return (
    <div>
      <HeroSection />
      <HomeSections
        leaderboard={leaderboard as LeaderboardEntry[]}
        announcements={announcements as Announcement[]}
      />
    </div>
  );
}
