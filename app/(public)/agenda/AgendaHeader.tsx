"use client";

import Image from "next/image";
import { TrainTrack } from "@/components/theme/TrainTrack";
import { useLanguage } from "@/contexts/LanguageContext";

const STATIONS = [
  { num: "01", vi: "Khởi Hành",  en: "Departure",   day: 1 },
  { num: "02", vi: "Đồng Hành",  en: "Companion",   day: 1 },
  { num: "03", vi: "Kích Hoạt",  en: "Ignition",    day: 1 },
  { num: "04", vi: "Kế Tiếp",   en: "Energy",   day: 2 },
  { num: "05", vi: "Tri Thức",   en: "Discovery",   day: 2 },
  { num: "06", vi: "Lưu Dấu",   en: "Memory",      day: 3 },
  { num: "07", vi: "Tỏa Sáng",  en: "Shine",    day: 3 },
];

export default function AgendaHeader() {
  const { lang, t } = useLanguage();
  const a = t.agenda;

  return (
    <div
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, rgba(30,64,175,0.2) 0%, transparent 100%)", borderBottom: "1px solid var(--border-subtle)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 pb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Image src="/logo-vidi26.svg" alt="VIDI26" width={110} height={52} style={{ objectFit: "contain" }} />
          <div>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-wider" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
              {a.title} <span style={{ color: "var(--neon-primary)" }}>{a.title_highlight}</span>
            </h1>
            <p className="text-sm uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
              {a.subtitle}
            </p>
          </div>
        </div>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{a.description}</p>

        {/* Route strip */}
        <div className="flex justify-center mt-5">
          <div className="flex items-center gap-1 overflow-x-auto pb-1">
            {STATIONS.map((s, i) => (
              <div key={s.num} className="flex items-center gap-1 shrink-0">
                <div
                  className="px-3 py-1.5 rounded-lg text-center"
                  style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
                >
                  <div className="text-[9px] font-mono" style={{ color: "var(--text-muted)" }}>{s.num}</div>
                  <div className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                    {lang === "en" ? s.en : s.vi}
                  </div>
                  <div className="text-[9px]" style={{ color: "var(--text-muted)" }}>
                    {a.day_labels[s.day - 1]}
                  </div>
                </div>
                {i < STATIONS.length - 1 && (
                  <div style={{ width: 16, height: 1, backgroundColor: "var(--border-glow)", flexShrink: 0 }} />
                )}
              </div>
            ))}

            <div style={{ width: 16, height: 1, backgroundColor: "rgba(245,197,24,0.6)", flexShrink: 0 }} />

            <div
              className="shrink-0 relative rounded-xl text-center"
              style={{
                padding: "10px 18px",
                background: "linear-gradient(135deg, rgba(245,197,24,0.18) 0%, rgba(245,197,24,0.08) 100%)",
                border: "2px solid var(--accent-gold)",
                boxShadow: "0 0 20px rgba(245,197,24,0.45), 0 0 6px rgba(245,197,24,0.2) inset",
              }}
            >
              <div className="text-[8px] uppercase tracking-[0.2em] font-bold mb-0.5" style={{ color: "rgba(245,197,24,0.7)", fontFamily: "var(--font-mono)" }}>
                ★ {a.final_num}
              </div>
              <div className="text-base font-black uppercase tracking-wider leading-none" style={{ color: "var(--accent-gold)", fontFamily: "var(--font-display)", textShadow: "0 0 16px rgba(245,197,24,0.7)" }}>
                {a.final_name}
              </div>
            </div>
          </div>
        </div>
      </div>
      <TrainTrack animated className="mt-2" />
    </div>
  );
}
