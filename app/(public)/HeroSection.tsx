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
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/kv-background.svg')",
          backgroundSize: "115% auto",
          backgroundPosition: "65% top",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#050814",
        }}
      >
        {/* Subtle top edge blend — keep short so building dome is not hidden */}
        <div
          className="absolute inset-x-0 top-0 pointer-events-none"
          style={{ height: "36px", background: "linear-gradient(to bottom, #050814 0%, transparent 100%)" }}
        />
        {/* Blend bottom strip — matches KV floor bottom edge */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{ height: "140px", background: "linear-gradient(to top, #050814 0%, #060a1c 55%, transparent 100%)" }}
        />
        {/* Dark overlay: heavy on left for text, fades right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(5,8,20,0.92) 0%, rgba(5,8,20,0.72) 40%, rgba(5,8,20,0.2) 70%, rgba(5,8,20,0.05) 100%)",
          }}
        />
      </div>

      {/* Main hero content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 pt-16 pb-8 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-[520px_1fr] gap-6 items-center">

          {/* Left: Text — fixed width so it stays tight on left */}
          <div className="max-w-[480px]">
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
                VIDI26 Express · 09.07.2026
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-3"
            >
              <div
                className="text-7xl sm:text-8xl lg:text-9xl leading-none"
                style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
              >
                VIDI
                <span style={{ color: "var(--accent-gold)", textShadow: "0 0 40px rgba(245,197,24,0.5)" }}>
                  26
                </span>
              </div>
              <div
                className="text-xl sm:text-2xl uppercase tracking-[0.35em] mt-2"
                style={{ fontFamily: "var(--font-display)", color: "var(--neon-primary)", textShadow: "0 0 20px rgba(63,169,255,0.6)" }}
              >
                Next Station
              </div>
            </motion.h1>

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
              className="text-sm sm:text-base mb-8 leading-relaxed"
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

          {/* Right: LEXCE mascot with shadow layer */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
            className="hidden lg:flex items-end justify-center relative"
            style={{ minHeight: "600px" }}
          >
            {/* Shadow / ghost layer */}
            <div
              className="absolute"
              style={{
                width: 820,
                height: 920,
                bottom: -80,
                left: "50%",
                transform: "translateX(-56%) scaleX(0.8)",
                opacity: 0.22,
                filter: "blur(22px) brightness(2.2)",
              }}
            >
              <Image
                src="/lexce-mascot.svg"
                alt=""
                fill
                aria-hidden
                className="object-contain object-bottom"
              />
            </div>

            {/* Main mascot */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: 740, height: 840, position: "relative", zIndex: 1, marginBottom: "-320px", marginLeft: "40px" }}
            >
              <Image
                src="/lexce-mascot.svg"
                alt="LEXCE — Linh vật VIDI26"
                fill
                className="object-contain object-bottom"
                style={{ filter: "drop-shadow(0 0 50px rgba(63,169,255,0.4)) drop-shadow(0 20px 70px rgba(63,169,255,0.2))" }}
              />
            </motion.div>

            {/* Ground glow */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-14 rounded-full blur-3xl"
              style={{ backgroundColor: "rgba(63,169,255,0.28)" }}
            />
          </motion.div>
        </div>
      </div>

      <TrainTrack className="mt-4" />
    </section>
  );
}
