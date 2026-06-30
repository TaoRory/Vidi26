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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 pb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
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
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Chuyến tàu VIDI26 Express khởi hành 09.07.2026 — 3 ngày 2 đêm, 8 trạm thử thách, 24 đội thi đua.
          </p>

          {/* Mini route strip */}
          <div className="flex justify-center mt-5">
            <div className="flex items-center gap-1 overflow-x-auto pb-1">
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

              {/* Connector to FINAL */}
              <div style={{ width: 16, height: 1, backgroundColor: "rgba(245,197,24,0.6)", flexShrink: 0 }} />

              {/* FINAL VINUNI — nổi bật */}
              <div
                className="shrink-0 relative rounded-xl text-center"
                style={{
                  padding: "10px 18px",
                  background: "linear-gradient(135deg, rgba(245,197,24,0.18) 0%, rgba(245,197,24,0.08) 100%)",
                  border: "2px solid var(--accent-gold)",
                  boxShadow: "0 0 20px rgba(245,197,24,0.45), 0 0 6px rgba(245,197,24,0.2) inset",
                }}
              >
                <div
                  className="text-[8px] uppercase tracking-[0.2em] font-bold mb-0.5"
                  style={{ color: "rgba(245,197,24,0.7)", fontFamily: "var(--font-mono)" }}
                >
                  ★ FINAL STOP
                </div>
                <div
                  className="text-base font-black uppercase tracking-wider leading-none"
                  style={{
                    color: "var(--accent-gold)",
                    fontFamily: "var(--font-display)",
                    textShadow: "0 0 16px rgba(245,197,24,0.7)",
                  }}
                >
                  VinUni
                </div>
              </div>
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
