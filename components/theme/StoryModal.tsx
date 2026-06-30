"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Radio } from "lucide-react";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const style: React.CSSProperties = {
    position: "absolute",
    width: 20,
    height: 20,
    borderColor: "var(--neon-primary)",
    borderStyle: "solid",
    ...(pos === "tl" && { top: 0, left: 0, borderWidth: "2px 0 0 2px", borderRadius: "8px 0 0 0" }),
    ...(pos === "tr" && { top: 0, right: 0, borderWidth: "2px 2px 0 0", borderRadius: "0 8px 0 0" }),
    ...(pos === "bl" && { bottom: 0, left: 0, borderWidth: "0 0 2px 2px", borderRadius: "0 0 0 8px" }),
    ...(pos === "br" && { bottom: 0, right: 0, borderWidth: "0 2px 2px 0", borderRadius: "0 0 8px 0" }),
  };
  return (
    <motion.div
      style={style}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.25, duration: 0.3, ease: "easeOut" }}
    />
  );
}

export default function StoryModal({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();
  const s = t.story;

  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", fn);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        style={{ backgroundColor: "rgba(5,8,20,0.88)", backdropFilter: "blur(10px)" }}
      >
        {/* Electric flash */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          style={{ background: "radial-gradient(ellipse at center, rgba(63,169,255,0.25) 0%, transparent 70%)" }}
        />

        <motion.div
          onClick={e => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl"
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: [0, 0.5, 0.2, 1], scale: [0.8, 1.03, 0.98, 1], y: [30, 0, 0, 0] }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.45, times: [0, 0.25, 0.6, 1], ease: "easeOut" }}
          style={{
            backgroundColor: "#0a1228",
            border: "1px solid rgba(63,169,255,0.35)",
            boxShadow: "0 0 0 1px rgba(63,169,255,0.1), 0 0 40px rgba(63,169,255,0.25), 0 0 100px rgba(63,169,255,0.08), inset 0 0 60px rgba(63,169,255,0.03)",
          }}
        >
          <Corner pos="tl" /><Corner pos="tr" /><Corner pos="bl" /><Corner pos="br" />

          {/* Top power bar */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
            style={{
              background: "linear-gradient(90deg, transparent 0%, var(--neon-deep) 15%, var(--neon-primary) 40%, var(--neon-bright) 50%, var(--neon-primary) 60%, var(--neon-deep) 85%, transparent 100%)",
              transformOrigin: "left",
              boxShadow: "0 0 16px var(--neon-primary), 0 0 4px var(--neon-bright)",
            }}
          />

          {/* Scan line overlay */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(63,169,255,0.012) 3px, rgba(63,169,255,0.012) 4px)",
              zIndex: 0,
            }}
          />

          <div className="relative z-10 p-6 sm:p-8 pt-7">
            {/* Status bar */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex items-center gap-2 mb-5">
              <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
                <Radio size={10} style={{ color: "var(--neon-primary)" }} />
              </motion.div>
              <span className="text-[9px] uppercase tracking-[0.3em]" style={{ color: "var(--neon-primary)", fontFamily: "var(--font-mono)" }}>
                {s.status}
              </span>
              <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="ml-auto text-[9px] font-mono" style={{ color: "var(--neon-primary)" }}>
                ■
              </motion.div>
            </motion.div>

            {/* Title */}
            <div className="flex items-start justify-between mb-7">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35, duration: 0.4 }}>
                <h2
                  className="text-4xl sm:text-5xl font-black uppercase leading-none"
                  style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)", textShadow: "0 0 40px rgba(63,169,255,0.6), 0 0 80px rgba(63,169,255,0.2)" }}
                >
                  {s.title}{" "}
                  <span style={{ color: "var(--neon-primary)", textShadow: "0 0 20px var(--neon-primary), 0 0 40px rgba(63,169,255,0.5)" }}>
                    {s.title_highlight}
                  </span>
                </h2>
                <div className="flex items-center gap-1.5 mt-2">
                  <Zap size={10} style={{ color: "var(--accent-gold)" }} />
                  <span className="text-[9px] uppercase tracking-widest" style={{ color: "var(--accent-gold)", fontFamily: "var(--font-mono)" }}>{s.subtitle}</span>
                </div>
              </motion.div>

              <button
                onClick={onClose}
                className="rounded-lg p-2 transition-all shrink-0 ml-4"
                style={{ color: "var(--text-muted)", backgroundColor: "rgba(63,169,255,0.06)", border: "1px solid var(--border-subtle)" }}
                onMouseEnter={e => { e.currentTarget.style.color = "var(--neon-primary)"; e.currentTarget.style.borderColor = "var(--border-glow)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.borderColor = "var(--border-subtle)"; }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.4, duration: 0.4 }}
              className="h-px mb-6"
              style={{ background: "linear-gradient(to right, var(--neon-primary), transparent)", transformOrigin: "left" }}
            />

            {/* Story paragraphs */}
            <div className="space-y-5">
              {s.paragraphs.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 + i * 0.1, duration: 0.4 }}
                  className="text-sm sm:text-base leading-relaxed"
                  style={{ color: i === 0 ? "var(--text-primary)" : "var(--text-secondary)" }}
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
              className="mt-8 pt-5 flex items-center justify-between"
              style={{ borderTop: "1px solid var(--border-subtle)" }}
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "var(--neon-primary)", boxShadow: "0 0 6px var(--neon-primary)" }}
                />
                <span className="text-[9px] uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                  {s.footer_status}
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-lg transition-all"
                style={{ color: "var(--neon-primary)", border: "1px solid var(--border-glow)", fontFamily: "var(--font-mono)", backgroundColor: "rgba(63,169,255,0.08)" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(63,169,255,0.16)")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "rgba(63,169,255,0.08)")}
              >
                {s.close}
              </button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
