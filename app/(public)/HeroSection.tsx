"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Train, Star } from "lucide-react";
import NeonButton from "@/components/theme/NeonButton";
import { TrainTrack } from "@/components/theme/TrainTrack";

const STATIONS = [
  { num: "01", vi: "Dashboard",    en: "Home",         href: "/"             },
  { num: "02", vi: "Timeline",     en: "Agenda",       href: "/agenda"       },
  { num: "03", vi: "Leaderboard",  en: "Leaderboard",  href: "/leaderboard"  },
  { num: "04", vi: "Announcement", en: "News",         href: "/announcements"},
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(30,64,175,0.25) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(63,169,255,0.08) 0%, transparent 60%)",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: "var(--neon-primary)",
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 20}%`,
              opacity: 0.4,
            }}
            animate={{ y: [-10, 10, -10], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Main hero content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pt-16 pb-8 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            {/* Event badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
              style={{
                backgroundColor: "rgba(63,169,255,0.1)",
                border: "1px solid var(--border-glow)",
              }}
            >
              <Train size={12} style={{ color: "var(--neon-primary)" }} />
              <span className="text-xs uppercase tracking-wider" style={{ color: "var(--neon-primary)" }}>
                VIDI26 Express · 17.06.2026
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-4"
            >
              <div
                className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase leading-none tracking-tight"
                style={{ fontFamily: "var(--font-serif)", color: "var(--text-primary)" }}
              >
                VIDI
                <span style={{ color: "var(--accent-gold)", textShadow: "0 0 30px rgba(245,197,24,0.4)" }}>
                  26
                </span>
              </div>
              <div
                className="text-xl sm:text-2xl font-light uppercase tracking-[0.3em] mt-1"
                style={{ color: "var(--neon-primary)" }}
              >
                Next Station
              </div>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg mb-8 leading-relaxed max-w-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              Chuyến tàu VIDI26 đang chờ khởi hành. Cùng LEXCE và hơn 300 Cohort-7-to-be
              vượt qua từng trạm thử thách, thu thập năng lượng và đưa hành trình về đích VinUni.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              <Link href="/leaderboard">
                <NeonButton variant="primary" size="lg">
                  <Train size={16} /> Lên tàu thôi
                </NeonButton>
              </Link>
              <Link href="/story">
                <NeonButton variant="secondary" size="lg">
                  Câu chuyện <ArrowRight size={16} />
                </NeonButton>
              </Link>
            </motion.div>
          </div>

          {/* Right: Station route map */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div
              className="rounded-2xl p-6"
              style={{
                backgroundColor: "var(--bg-surface)",
                border: "1px solid var(--border-glow)",
                boxShadow: "0 0 40px rgba(63,169,255,0.1)",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-[9px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                    ROUTE MAP
                  </div>
                  <div className="text-sm font-bold uppercase" style={{ color: "var(--neon-primary)" }}>
                    VIDI26 Express
                  </div>
                </div>
                <div
                  className="text-xs px-2 py-1 rounded"
                  style={{ backgroundColor: "rgba(63,169,255,0.1)", color: "var(--neon-primary)", border: "1px solid var(--border-glow)", fontFamily: "var(--font-mono)" }}
                >
                  3N · 2Đ
                </div>
              </div>

              {/* Station list */}
              <div className="relative">
                <div
                  className="absolute left-3 top-0 bottom-0 w-px"
                  style={{ background: "linear-gradient(to bottom, var(--neon-primary), var(--neon-deep))" }}
                />
                <div className="space-y-3 pl-8">
                  {STATIONS.map((s, i) => (
                    <motion.div
                      key={s.num}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                      className="flex items-center gap-3"
                    >
                      {/* Station dot */}
                      <div
                        className="absolute left-2 w-2.5 h-2.5 rounded-full"
                        style={{
                          backgroundColor: i === 0 ? "var(--accent-gold)" : "var(--neon-primary)",
                          boxShadow: i === 0 ? "0 0 10px var(--accent-gold)" : "0 0 8px var(--neon-primary)",
                          marginLeft: "-1px",
                        }}
                      />
                      <span
                        className="text-[9px] font-mono"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {s.num}
                      </span>
                      <div>
                        <span
                          className="text-sm font-bold"
                          style={{ color: i === 0 ? "var(--accent-gold)" : "var(--text-primary)" }}
                        >
                          {s.vi}
                        </span>
                        <span className="text-xs ml-2" style={{ color: "var(--text-muted)" }}>
                          {s.en}
                        </span>
                      </div>
                      {i === 0 && (
                        <Star size={10} style={{ color: "var(--accent-gold)" }} />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Final destination */}
              <div
                className="mt-5 rounded-lg p-3 text-center"
                style={{ backgroundColor: "var(--bg-deep)", border: "2px solid var(--accent-gold)" }}
              >
                <div className="text-[9px] uppercase tracking-widest mb-0.5" style={{ color: "var(--text-muted)" }}>
                  FINAL STOP
                </div>
                <div className="text-xl font-black uppercase" style={{ color: "var(--text-primary)" }}>
                  VINUNIVERSITY
                </div>
                <div className="text-[9px] uppercase tracking-widest mt-0.5" style={{ color: "var(--accent-gold)" }}>
                  WHERE THE FUTURE BEGINS
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Train track at bottom */}
      <TrainTrack className="mt-4" />
    </section>
  );
}
