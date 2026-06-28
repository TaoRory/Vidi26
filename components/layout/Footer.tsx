"use client";

import Link from "next/link";
import { Train, MapPin } from "lucide-react";

const STATIONS = [
  { slug: "khoi-hanh",  vi: "Khởi Hành",  num: "01" },
  { slug: "kham-pha",   vi: "Khám Phá",   num: "02" },
  { slug: "tri-thuc",   vi: "Tri Thức",   num: "03" },
  { slug: "but-pha",    vi: "Bứt Phá",    num: "04" },
  { slug: "luu-dau",    vi: "Lưu Dấu",    num: "05" },
  { slug: "toa-sang",   vi: "Tỏa Sáng",   num: "06" },
  { slug: "tiep-buoc",  vi: "Tiếp Bước",  num: "07" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--bg-surface)", borderTop: "1px solid var(--border-subtle)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

          {/* Left: Boarding Pass — adapted from KV Mẫu vé */}
          <div
            className="rounded-xl overflow-hidden"
            style={{
              border: "1.5px solid rgba(245,197,24,0.35)",
              boxShadow: "0 0 24px rgba(245,197,24,0.07), 0 0 0 1px rgba(63,169,255,0.08)",
            }}
          >
            {/* Header strip — dark navy */}
            <div
              className="px-4 py-2.5 flex items-center justify-between"
              style={{ backgroundColor: "#060c24", borderBottom: "1px solid rgba(245,197,24,0.15)" }}
            >
              {/* VinUniversity logo mark */}
              <div className="flex items-center gap-1.5">
                <div
                  className="w-5 h-5 rounded flex items-center justify-center text-white font-black text-[10px]"
                  style={{ background: "linear-gradient(135deg, var(--neon-primary), var(--neon-deep))" }}
                >
                  V
                </div>
                <span className="text-[8px] uppercase tracking-widest font-semibold" style={{ color: "var(--text-muted)" }}>
                  VinUniversity
                </span>
              </div>

              {/* BOARDING PASS title */}
              <div
                className="text-sm font-black italic tracking-wide"
                style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)", letterSpacing: "0.05em" }}
              >
                BOARDiNG PASS
              </div>

              <Train size={14} style={{ color: "var(--neon-primary)" }} />
            </div>

            {/* Passenger + barcode row */}
            <div
              className="px-4 pt-3 pb-2.5 flex items-center gap-3"
              style={{ backgroundColor: "#0b1535" }}
            >
              <div className="shrink-0">
                <div className="text-[8px] uppercase tracking-wider mb-0.5" style={{ color: "var(--text-muted)" }}>Passenger</div>
                <div className="text-sm font-black uppercase" style={{ color: "var(--neon-primary)", fontFamily: "var(--font-display)" }}>
                  LEXCE
                </div>
              </div>

              {/* Barcode */}
              <div className="flex-1">
                <div
                  className="h-7 w-full rounded-sm"
                  style={{
                    background: "repeating-linear-gradient(90deg, rgba(248,250,252,0.75) 0px, rgba(248,250,252,0.75) 2px, transparent 2px, transparent 4px, rgba(248,250,252,0.4) 4px, rgba(248,250,252,0.4) 5px, transparent 5px, transparent 9px)",
                  }}
                />
                <div className="text-center text-[7px] mt-0.5 tracking-widest" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                  VINUNI DISCOVERY 2026
                </div>
              </div>
            </div>

            {/* Perforated tear line */}
            <div className="relative flex items-center px-2" style={{ height: "12px" }}>
              {/* Left notch */}
              <div className="absolute -left-2 w-4 h-4 rounded-full" style={{ backgroundColor: "var(--bg-surface)" }} />
              <div
                className="flex-1 border-t border-dashed"
                style={{ borderColor: "rgba(245,197,24,0.4)", borderTopWidth: "1.5px" }}
              />
              {/* Right notch */}
              <div className="absolute -right-2 w-4 h-4 rounded-full" style={{ backgroundColor: "var(--bg-surface)" }} />
            </div>

            {/* Main content: From/To + Info fields */}
            <div
              className="px-4 py-3 flex gap-4"
              style={{ backgroundColor: "#0b1535" }}
            >
              {/* From / To route */}
              <div className="flex-1 relative pl-4">
                <div
                  className="absolute left-[5px] top-2 bottom-2 w-px border-l border-dashed"
                  style={{ borderColor: "rgba(63,169,255,0.5)" }}
                />
                {/* From */}
                <div className="mb-3">
                  <div className="text-[8px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>From</div>
                  <div
                    className="absolute left-[2px] w-[7px] h-[7px] rounded-full"
                    style={{ backgroundColor: "var(--neon-primary)", top: "22px", boxShadow: "0 0 6px var(--neon-primary)" }}
                  />
                  <div className="text-[11px] font-semibold" style={{ color: "var(--text-secondary)" }}>LEXCEVERSE</div>
                </div>
                {/* To */}
                <div>
                  <div className="text-[8px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>To</div>
                  <div
                    className="absolute left-[2px] w-[7px] h-[7px] rounded-full"
                    style={{ backgroundColor: "var(--accent-gold)", bottom: "12px", boxShadow: "0 0 6px var(--accent-gold)" }}
                  />
                  <div className="text-[11px] font-bold" style={{ color: "var(--text-primary)" }}>VINUNIVERSITY</div>
                </div>
              </div>

              {/* Info fields */}
              <div className="space-y-2 shrink-0">
                <div>
                  <div className="text-[8px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>APID</div>
                  <div className="text-[11px]" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>VIDI26-001</div>
                </div>
                <div>
                  <div className="text-[8px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Gate</div>
                  <div className="text-[11px] font-bold" style={{ color: "var(--neon-primary)" }}>VIDI 26</div>
                </div>
                <div>
                  <div className="text-[8px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Departure Date</div>
                  <div className="text-[11px] font-bold" style={{ color: "var(--accent-gold)" }}>JULY 09, 2026</div>
                </div>
              </div>
            </div>

            {/* VIDI26 brand footer strip */}
            <div
              className="px-4 py-2.5 flex items-center justify-between"
              style={{ backgroundColor: "#060c24", borderTop: "1px solid rgba(245,197,24,0.12)" }}
            >
              <Link
                href="/agenda"
                className="text-[9px] uppercase tracking-wider transition-colors"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--neon-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                ★ Agenda here
              </Link>
              <div className="text-right">
                <div
                  className="text-base font-black leading-none"
                  style={{ color: "var(--accent-gold)", fontFamily: "var(--font-display)" }}
                >
                  VIDI26
                </div>
                <div className="text-[7px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                  VinUni, Where the future begins
                </div>
              </div>
            </div>
          </div>

          {/* Center: Route stations */}
          <div>
            <div className="text-xs uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
              Hành Trình
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
                      {s.vi}
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
              <div className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>Liên kết</div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { href: "/leaderboard",   label: "Bảng xếp hạng" },
                  { href: "/teams",          label: "Danh sách đội" },
                  { href: "/gallery",        label: "Gallery" },
                  { href: "/announcements",  label: "Thông báo" },
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
              className="rounded p-3 text-center"
              style={{ backgroundColor: "var(--bg-deep)", border: "2px solid var(--accent-gold)" }}
            >
              <div className="text-[9px] uppercase tracking-widest mb-0.5" style={{ color: "var(--text-muted)" }}>FINAL STOP:</div>
              <div className="text-lg font-black uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>VINUNI</div>
              <div className="flex items-center justify-center gap-1 mt-0.5">
                <Train size={8} style={{ color: "var(--accent-gold)" }} />
                <span className="text-[9px] uppercase tracking-widest" style={{ color: "var(--accent-gold)" }}>NEXT STATION</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
          style={{ borderTop: "1px solid var(--border-subtle)", color: "var(--text-muted)" }}
        >
          <div>© 2026 VIDI26 — VinUni Discovery. LEXCE ★ Lead · Explore · Connect · Empower</div>
          <div><span style={{ fontFamily: "var(--font-mono)" }}>YOU · US · FUTURE</span></div>
        </div>
      </div>
    </footer>
  );
}
