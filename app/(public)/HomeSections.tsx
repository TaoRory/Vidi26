"use client";

import Link from "next/link";
import { ArrowRight, Megaphone, Trophy } from "lucide-react";
import GlowPanel from "@/components/theme/GlowPanel";
import NeonButton from "@/components/theme/NeonButton";
import MiniLeaderboard from "./MiniLeaderboard";
import { SectionDivider } from "@/components/theme/TrainTrack";
import { useLanguage } from "@/contexts/LanguageContext";
import type { LeaderboardEntry } from "@/lib/supabase/types";

type Ann = { id: string; title: string; slug: string; published_at: string | null; pinned: boolean; cover_url: string | null };

export default function HomeSections({
  leaderboard,
  announcements,
}: {
  leaderboard: LeaderboardEntry[];
  announcements: Ann[];
}) {
  const { lang, t } = useLanguage();
  const h = t.home;

  return (
    <>
      {/* Announcements */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Megaphone size={18} style={{ color: "var(--neon-primary)" }} />
            <h2 className="text-2xl font-black uppercase tracking-wider" style={{ color: "var(--text-primary)", fontFamily: "var(--font-display)" }}>
              {h.announcements_title}
            </h2>
          </div>
          <Link href="/announcements" className="flex items-center gap-1 text-sm transition-colors" style={{ color: "var(--neon-primary)" }}>
            {h.see_all} <ArrowRight size={14} />
          </Link>
        </div>

        {announcements.length === 0 ? (
          <GlowPanel>
            <p className="text-center py-8" style={{ color: "var(--text-muted)" }}>{h.no_data}</p>
          </GlowPanel>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {announcements.map((ann) => (
              <Link key={ann.id} href={`/announcements/${ann.slug}`}>
                <GlowPanel className="h-full hover:border-neon-primary transition-all duration-200 cursor-pointer group">
                  {ann.pinned && (
                    <div className="inline-flex items-center gap-1 text-[9px] uppercase tracking-widest px-2 py-0.5 rounded mb-3" style={{ backgroundColor: "rgba(245,197,24,0.1)", color: "var(--accent-gold)", border: "1px solid rgba(245,197,24,0.3)" }}>
                      📌 {h.pinned}
                    </div>
                  )}
                  <h3 className="text-sm font-semibold mb-2 group-hover:text-neon-bright transition-colors" style={{ color: "var(--text-primary)" }}>
                    {ann.title}
                  </h3>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {ann.published_at ? new Date(ann.published_at).toLocaleDateString(lang === "en" ? "en-US" : "vi-VN") : "—"}
                  </p>
                </GlowPanel>
              </Link>
            ))}
          </div>
        )}
      </section>

      <SectionDivider />

      {/* Mini Leaderboard */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Trophy size={18} style={{ color: "var(--accent-gold)" }} />
            <h2 className="text-2xl font-black uppercase tracking-wider" style={{ color: "var(--text-primary)", fontFamily: "var(--font-display)" }}>
              {h.leaderboard_title}
            </h2>
          </div>
          <Link href="/leaderboard" className="flex items-center gap-1 text-sm transition-colors" style={{ color: "var(--neon-primary)" }}>
            {h.view_full} <ArrowRight size={14} />
          </Link>
        </div>

        <GlowPanel className="p-0 overflow-hidden">
          <MiniLeaderboard teams={leaderboard} />
        </GlowPanel>

        <div className="mt-6 text-center">
          <Link href="/leaderboard">
            <NeonButton variant="secondary" size="md">
              {h.view_full_leaderboard} <ArrowRight size={16} />
            </NeonButton>
          </Link>
        </div>
      </section>
    </>
  );
}
