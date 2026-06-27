"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Train } from "lucide-react";
import NeonButton from "@/components/theme/NeonButton";
import { TrainTrack } from "@/components/theme/TrainTrack";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col overflow-hidden">
      {/* KV Background image */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/kv-background.png"
          alt="VIDI26 KV"
          fill
          priority
          className="object-cover object-center"
          quality={90}
        />
        {/* Dark overlay to keep text readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(5,8,20,0.88) 0%, rgba(5,8,20,0.65) 55%, rgba(5,8,20,0.1) 100%), linear-gradient(to top, rgba(5,8,20,0.9) 0%, transparent 40%)",
          }}
        />
      </div>

      {/* Main hero content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pt-16 pb-8 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Text */}
          <div>
            {/* Event badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
              style={{
                backgroundColor: "rgba(63,169,255,0.12)",
                border: "1px solid var(--border-glow)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Train size={12} style={{ color: "var(--neon-primary)" }} />
              <span className="text-xs uppercase tracking-wider" style={{ color: "var(--neon-primary)" }}>
                VIDI26 Express · 17.06.2026
              </span>
            </motion.div>

            {/* Headline — Sakana font */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-3"
            >
              <div
                className="text-6xl sm:text-7xl lg:text-8xl leading-none"
                style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
              >
                VIDI
                <span style={{ color: "var(--accent-gold)", textShadow: "0 0 40px rgba(245,197,24,0.5)" }}>
                  26
                </span>
              </div>
              <div
                className="text-lg sm:text-2xl uppercase tracking-[0.35em] mt-2"
                style={{ fontFamily: "var(--font-display)", color: "var(--neon-primary)", textShadow: "0 0 20px rgba(63,169,255,0.6)" }}
              >
                Next Station
              </div>
            </motion.h1>

            {/* Sub-tagline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="text-sm uppercase tracking-widest mb-5"
              style={{ fontFamily: "var(--font-display)", color: "var(--accent-gold)", opacity: 0.85 }}
            >
              Trạm Kế Tiếp
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-sm sm:text-base mb-8 leading-relaxed max-w-md"
              style={{ color: "var(--text-secondary)" }}
            >
              Chuyến tàu VIDI26 đang chờ khởi hành. Cùng LEXCE và hơn 300 Cohort-7-to-be
              vượt qua từng trạm thử thách, thu thập năng lượng và đưa hành trình về đích VinUni.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
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

            {/* Quick links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex gap-5 mt-8"
            >
              {[
                { label: "Timeline", href: "/agenda" },
                { label: "Leaderboard", href: "/leaderboard" },
                { label: "Thông báo", href: "/announcements" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-xs uppercase tracking-wider transition-colors"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--neon-primary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          </div>

          {/* Right: LEXCE mascot */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
            className="hidden lg:flex items-end justify-center relative"
            style={{ minHeight: "420px" }}
          >
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
              style={{ width: 360, height: 420 }}
            >
              <Image
                src="/lexce-mascot.svg"
                alt="LEXCE — Linh vật VIDI26"
                fill
                className="object-contain object-bottom drop-shadow-2xl"
                style={{ filter: "drop-shadow(0 0 30px rgba(63,169,255,0.35))" }}
              />
            </motion.div>

            {/* Glow circle behind mascot */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-16 rounded-full blur-2xl"
              style={{ backgroundColor: "rgba(63,169,255,0.18)" }}
            />
          </motion.div>
        </div>
      </div>

      {/* Train track at bottom */}
      <TrainTrack className="mt-4" />
    </section>
  );
}
