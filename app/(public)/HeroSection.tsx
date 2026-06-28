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
      {/* KV Background image — contain so edges are not cropped */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/kv-background.png')",
          backgroundSize: "contain",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "var(--bg-deep)",
        }}
      >
        {/* Dark overlay: heavy on left for text, fades right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(5,8,20,0.92) 0%, rgba(5,8,20,0.72) 40%, rgba(5,8,20,0.2) 70%, rgba(5,8,20,0.05) 100%), linear-gradient(to top, rgba(5,8,20,0.85) 0%, transparent 35%)",
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
            style={{ minHeight: "560px" }}
          >
            {/* Shadow / ghost — blurred, dimmed layer below mascot */}
            <div
              className="absolute"
              style={{
                width: 700,
                height: 780,
                bottom: -40,
                left: "50%",
                transform: "translateX(-46%) scaleX(0.82)",
                opacity: 0.2,
                filter: "blur(20px) brightness(2)",
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

            {/* Main mascot — larger + floating */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: 620, height: 700, position: "relative", zIndex: 1, marginBottom: "-30px" }}
            >
              <Image
                src="/lexce-mascot.svg"
                alt="LEXCE — Linh vật VIDI26"
                fill
                className="object-contain object-bottom"
                style={{ filter: "drop-shadow(0 0 40px rgba(63,169,255,0.4)) drop-shadow(0 20px 60px rgba(63,169,255,0.2))" }}
              />
            </motion.div>

            {/* Ground glow */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-14 rounded-full blur-3xl"
              style={{ backgroundColor: "rgba(63,169,255,0.25)" }}
            />
          </motion.div>
        </div>
      </div>

      <TrainTrack className="mt-4" />
    </section>
  );
}
