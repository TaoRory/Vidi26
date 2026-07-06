"use client";

import Link from "next/link";
import Image from "next/image";
import { Train, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const STATIONS = [
  { slug: "khoi-hanh",  vi: "Khởi Hành",  en: "Departure",   num: "01" },
  { slug: "dong-hanh",  vi: "Đồng Hành",  en: "Companion",   num: "02" },
  { slug: "kich-hoat",  vi: "Kích Hoạt",  en: "Ignition",    num: "03" },
  { slug: "ke-tiep",    vi: "Kế Tiếp",    en: "Energy",   num: "04" },
  { slug: "tri-thuc",   vi: "Tri Thức",   en: "Discovery",   num: "05" },
  { slug: "luu-dau",    vi: "Lưu Dấu",    en: "Memory",      num: "06" },
  { slug: "toa-sang",   vi: "Tỏa Sáng",   en: "Shine",    num: "07" },
];

export default function Footer() {
  const { lang, t } = useLanguage();
  const f = t.footer;
  return (
    <footer style={{ backgroundColor: "var(--bg-surface)", borderTop: "1px solid var(--border-subtle)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

          {/* Left: Boarding Pass — KV image */}
          <div className="rounded-xl overflow-hidden" style={{ boxShadow: "0 0 24px rgba(245,197,24,0.08)" }}>
            <Image
              src="/boarding-pass.png"
              alt="VIDI26 Boarding Pass"
              width={600}
              height={280}
              className="w-full h-auto"
              style={{ display: "block" }}
            />
          </div>

          {/* Center: Route stations */}
          <div>
            <div className="text-xs uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
              {f.journey_label}
            </div>
            <div className="relative pl-4">
              <div
                className="absolute left-0 top-0 bottom-0 w-px"
                style={{ background: "linear-gradient(to bottom, var(--neon-primary), var(--neon-deep))" }}
              />
              <div className="space-y-3">
                {STATIONS.map((s, i) => (
                  <Link key={s.slug} href={`/stations#${s.slug}`} className="flex items-center gap-2 group">
                    <div
                      className="absolute left-0 w-2 h-2 rounded-full -translate-x-0.5 ring-1"
                      style={{
                        backgroundColor: i === STATIONS.length - 1 ? "var(--accent-gold)" : "var(--neon-primary)",
                        boxShadow: i === STATIONS.length - 1 ? "0 0 8px var(--accent-gold)" : "0 0 6px var(--neon-primary)",
                      }}
                    />
                    <span className="text-[9px] font-mono ml-3" style={{ color: "var(--text-muted)" }}>{s.num}</span>
                    <span
                      className="text-xs transition-colors group-hover:text-neon-bright"
                      style={{ color: i === STATIONS.length - 1 ? "var(--accent-gold)" : "var(--text-secondary)" }}
                    >
                      {lang === "en" ? `${s.en} Station` : `${f.station_prefix} ${s.vi}`}
                    </span>
                    {i === STATIONS.length - 1 && <MapPin size={10} style={{ color: "var(--accent-gold)" }} />}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Links + FINAL STOP */}
          <div className="space-y-4">
            <div>
              <div className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>{f.links_label}</div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { href: "/leaderboard",   label: f.links.leaderboard },
                  { href: "/teams",          label: f.links.teams },
                  { href: "/gallery",        label: f.links.gallery },
                  { href: "/announcements",  label: f.links.announcements },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-xs transition-colors"
                    style={{ color: "var(--text-muted)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--neon-bright)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div
              className="relative rounded-lg overflow-hidden text-center"
              style={{
                background: "linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)",
                border: "2px solid var(--accent-gold)",
                boxShadow: "0 0 20px rgba(245,197,24,0.25), inset 0 0 30px rgba(245,197,24,0.04)",
              }}
            >
              {/* Top stripe */}
              <div className="py-1 px-3" style={{ background: "rgba(245,197,24,0.15)", borderBottom: "1px solid rgba(245,197,24,0.3)" }}>
                <span className="text-[8px] uppercase tracking-[0.25em] font-bold" style={{ color: "var(--accent-gold)" }}>
                  {f.final_badge}
                </span>
              </div>
              {/* Main content */}
              <div className="px-4 py-3">
                <div className="text-[9px] uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{f.final_stop}</div>
                <div
                  className="text-2xl font-black uppercase tracking-widest"
                  style={{ color: "var(--text-primary)", textShadow: "0 0 20px rgba(245,197,24,0.4)", fontFamily: "var(--font-display)" }}
                >
                  {f.final_name}
                </div>
                <div className="text-[9px] uppercase tracking-widest mt-0.5" style={{ color: "var(--text-secondary)" }}>
                  {f.final_sub}
                </div>
              </div>
              {/* Bottom stripe */}
              <div className="py-1 px-3 flex items-center justify-center gap-1.5" style={{ background: "rgba(245,197,24,0.12)", borderTop: "1px solid rgba(245,197,24,0.3)" }}>
                <Train size={8} style={{ color: "var(--accent-gold)" }} />
                <span className="text-[8px] uppercase tracking-[0.2em] font-bold" style={{ color: "var(--accent-gold)" }}>{f.next_station}</span>
                <Train size={8} style={{ color: "var(--accent-gold)" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
          style={{ borderTop: "1px solid var(--border-subtle)", color: "var(--text-muted)" }}
        >
          <div>{f.copyright}</div>
          <div><span style={{ fontFamily: "var(--font-mono)" }}>{f.tagline}</span></div>
        </div>
      </div>
    </footer>
  );
}
