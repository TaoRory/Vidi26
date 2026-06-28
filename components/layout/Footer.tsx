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
      {/* Boarding pass style footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Left: Boarding pass info */}
          <div
            className="rounded-lg p-5 relative overflow-hidden"
            style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-glow)" }}
          >
            <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>
              LEXCE EVENT TRIP 2026
            </div>
            <div className="text-2xl font-bold mb-1" style={{ color: "var(--accent-gold)", fontFamily: "var(--font-mono)" }}>
              VIDI26
            </div>
            <div
              className="text-xs uppercase tracking-widest mb-3"
              style={{ color: "var(--neon-primary)" }}
            >
              TRẠM KẾ TIẾP
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <div className="text-[9px] uppercase" style={{ color: "var(--text-muted)" }}>FROM</div>
                <div style={{ color: "var(--text-secondary)" }}>LEXCEVERSE</div>
              </div>
              <div>
                <div className="text-[9px] uppercase" style={{ color: "var(--text-muted)" }}>TO</div>
                <div className="font-bold" style={{ color: "var(--text-primary)" }}>VINUNIVERSITY</div>
              </div>
              <div>
                <div className="text-[9px] uppercase" style={{ color: "var(--text-muted)" }}>DATE</div>
                <div style={{ color: "var(--text-secondary)" }}>09.07.2026</div>
              </div>
              <div>
                <div className="text-[9px] uppercase" style={{ color: "var(--text-muted)" }}>GATE</div>
                <div style={{ color: "var(--text-secondary)" }}>VIDI26</div>
              </div>
            </div>
            {/* Barcode strip */}
            <div
              className="mt-4 h-6 rounded"
              style={{
                background: "repeating-linear-gradient(90deg, var(--text-muted) 0px, var(--text-muted) 2px, transparent 2px, transparent 5px)",
                opacity: 0.4,
              }}
            />
            <div className="text-center text-[9px] mt-1" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              VIDI26 ★ TRẠM KẾ TIẾP
            </div>
          </div>

          {/* Center: Route stations */}
          <div>
            <div className="text-xs uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
              Hành Trình
            </div>
            <div className="relative pl-4">
              {/* Vertical track line */}
              <div
                className="absolute left-0 top-0 bottom-0 w-px"
                style={{ background: "linear-gradient(to bottom, var(--neon-primary), var(--neon-deep))" }}
              />
              <div className="space-y-3">
                {STATIONS.map((s, i) => (
                  <Link
                    key={s.slug}
                    href={`/stations#${s.slug}`}
                    className="flex items-center gap-2 group"
                  >
                    <div
                      className="absolute left-0 w-2 h-2 rounded-full -translate-x-0.5 ring-1"
                      style={{
                        backgroundColor: i === STATIONS.length - 1 ? "var(--accent-gold)" : "var(--neon-primary)",
                        boxShadow: i === STATIONS.length - 1 ? "0 0 8px var(--accent-gold)" : "0 0 6px var(--neon-primary)",
                      }}
                    />
                    <span
                      className="text-[9px] font-mono ml-3"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {s.num}
                    </span>
                    <span
                      className="text-xs transition-colors group-hover:text-neon-bright"
                      style={{ color: i === STATIONS.length - 1 ? "var(--accent-gold)" : "var(--text-secondary)" }}
                    >
                      {s.vi}
                    </span>
                    {i === STATIONS.length - 1 && (
                      <MapPin size={10} style={{ color: "var(--accent-gold)" }} />
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Links + FINAL STOP */}
          <div className="space-y-4">
            <div>
              <div className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
                Liên kết
              </div>
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
                    onMouseEnter={(e) => e.currentTarget.style.color = "var(--neon-bright)"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Final stop sign */}
            <div
              className="rounded p-3 text-center"
              style={{ backgroundColor: "var(--bg-deep)", border: "2px solid var(--accent-gold)" }}
            >
              <div className="text-[9px] uppercase tracking-widest mb-0.5" style={{ color: "var(--text-muted)" }}>
                FINAL STOP:
              </div>
              <div className="text-lg font-black uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
                VINUNI
              </div>
              <div className="flex items-center justify-center gap-1 mt-0.5">
                <Train size={8} style={{ color: "var(--accent-gold)" }} />
                <span className="text-[9px] uppercase tracking-widest" style={{ color: "var(--accent-gold)" }}>
                  NEXT STATION
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
          style={{ borderTop: "1px solid var(--border-subtle)", color: "var(--text-muted)" }}
        >
          <div>
            © 2026 VIDI26 — VinUni Discovery. LEXCE ★ Lead · Explore · Connect · Empower
          </div>
          <div className="flex items-center gap-2">
            <span style={{ fontFamily: "var(--font-mono)" }}>YOU · US · FUTURE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
