"use client";

import Image from "next/image";
import { TrainTrack } from "@/components/theme/TrainTrack";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LeaderboardHeader() {
  const { t } = useLanguage();
  return (
    <div
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, rgba(30,64,175,0.2) 0%, transparent 100%)", borderBottom: "1px solid var(--border-subtle)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 pb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Image src="/logo-vidi26.svg" alt="VIDI26" width={110} height={52} style={{ objectFit: "contain" }} />
          <div>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-wider" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
              Leader<span style={{ color: "var(--accent-gold)" }}>board</span>
            </h1>
          </div>
        </div>
        <p className="text-sm sm:text-base" style={{ color: "var(--text-secondary)" }}>
          {t.leaderboard.description}
        </p>
      </div>
      <TrainTrack animated className="mt-2" />
    </div>
  );
}
