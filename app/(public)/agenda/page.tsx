import Image from "next/image";
import { TrainTrack } from "@/components/theme/TrainTrack";
import AgendaTabs from "./AgendaTabs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lịch Trình — VIDI26",
  description: "Lịch trình 3 ngày 2 đêm của chương trình VinUni Discovery 2026",
};

const STATIONS = [
  { num: "01", vi: "Soát Vé",    en: "Boarding Gate",       day: 1 },
  { num: "02", vi: "Khởi Hành",  en: "Departure Station",   day: 1 },
  { num: "03", vi: "Đồng Hành",  en: "Companion Station",   day: 1 },
  { num: "04", vi: "Kích Hoạt",  en: "Ignite Station",      day: 2 },
  { num: "05", vi: "Kế Tiếp",   en: "Next Station",        day: 2 },
  { num: "06", vi: "Tri Thức",   en: "Brain Station",       day: 2 },
  { num: "07", vi: "Lưu Dấu",   en: "Memory Station",      day: 3 },
  { num: "08", vi: "Tỏa Sáng",  en: "Shine Station",       day: 3 },
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
            <Image src="/logo-vidi26.svg" alt="VIDI26" width={110} height={52} style={{ objectFit: "contain" }} />
            <div>
              <h1
                className="text-3xl sm:text-4xl font-black uppercase tracking-wider"
                style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
              >
                Hành <span style={{ color: "var(--neon-primary)" }}>Trình</span>
              </h1>
              <p className="text-sm uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                AGENDA · 09–11.07.2026 · 3N2Đ
              </p>
            </div>
          </div>
          <p className="max-w-2xl text-sm" style={{ color: "var(--text-secondary)" }}>
            Chuyến tàu VIDI26 Express khởi hành 09.07.2026 — 3 ngày 2 đêm, 7 trạm thử thách, 24 đội thi đua.
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
