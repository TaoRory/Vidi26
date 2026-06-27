import Image from "next/image";
import { TrainTrack } from "@/components/theme/TrainTrack";
import AgendaTabs from "./AgendaTabs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lịch Trình — VIDI26",
  description: "Lịch trình 3 ngày 2 đêm của chương trình VinUni Discovery 2026",
};

const STATIONS = [
  { num: "01", vi: "Khởi Hành",  en: "Departure",    day: 1 },
  { num: "02", vi: "Khám Phá",   en: "Discover",     day: 1 },
  { num: "03", vi: "Tri Thức",   en: "Knowledge",    day: 2 },
  { num: "04", vi: "Bứt Phá",    en: "Breakthrough", day: 1 },
  { num: "05", vi: "Lưu Dấu",   en: "Memory",       day: 2 },
  { num: "06", vi: "Tỏa Sáng",  en: "Shine",        day: 2 },
  { num: "07", vi: "Tiếp Bước", en: "Next Step",    day: 3 },
];

export default function AgendaPage() {
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
          <div className="flex items-center gap-3 mb-3">
            <Image src="/logo.png" alt="VIDI26" width={44} height={44} style={{ objectFit: "contain" }} />
            <div>
              <h1
                className="text-3xl sm:text-4xl font-black uppercase tracking-wider"
                style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
              >
                Hành <span style={{ color: "var(--neon-primary)" }}>Trình</span>
              </h1>
              <p className="text-sm uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                AGENDA · 17–19.06.2026 · 3N2Đ
              </p>
            </div>
          </div>
          <p className="max-w-2xl text-sm" style={{ color: "var(--text-secondary)" }}>
            Chuyến tàu VIDI26 Express khởi hành 17.06.2026 — 3 ngày 2 đêm, 7 trạm thử thách, 24 đội thi đua.
          </p>

          {/* Mini route strip */}
          <div className="flex items-center gap-1 mt-5 overflow-x-auto pb-1">
            {STATIONS.map((s, i) => (
              <div key={s.num} className="flex items-center gap-1 shrink-0">
                <div
                  className="px-3 py-1.5 rounded-lg text-center"
                  style={{
                    backgroundColor: "var(--bg-elevated)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <div className="text-[9px] font-mono" style={{ color: "var(--text-muted)" }}>{s.num}</div>
                  <div className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>{s.vi}</div>
                  <div className="text-[9px]" style={{ color: "var(--text-muted)" }}>Day {s.day}</div>
                </div>
                {i < STATIONS.length - 1 && (
                  <div style={{ width: 16, height: 1, backgroundColor: "var(--border-glow)", flexShrink: 0 }} />
                )}
              </div>
            ))}
            <div
              className="shrink-0 px-3 py-1.5 rounded-lg ml-1"
              style={{ backgroundColor: "rgba(245,197,24,0.1)", border: "1px solid rgba(245,197,24,0.4)" }}
            >
              <div className="text-[9px] font-mono" style={{ color: "var(--accent-gold)" }}>FINAL</div>
              <div className="text-xs font-black" style={{ color: "var(--accent-gold)" }}>VINUNI</div>
            </div>
          </div>
        </div>
        <TrainTrack animated className="mt-2" />
      </div>

      {/* Tabs content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
        <AgendaTabs />
      </div>
    </div>
  );
}
