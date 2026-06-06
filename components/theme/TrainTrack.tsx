"use client";

import { motion } from "framer-motion";

interface TrainTrackProps {
  className?: string;
  animated?: boolean;
}

export function TrainTrack({ className, animated = true }: TrainTrackProps) {
  return (
    <div className={`relative w-full overflow-hidden ${className || ""}`}>
      {/* Rail lines */}
      <div className="relative h-8 flex flex-col justify-between py-1">
        <div
          className="h-px w-full"
          style={{ background: "linear-gradient(90deg, transparent, var(--neon-primary), transparent)" }}
        />
        <div className="flex items-center gap-3 opacity-30">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="h-2 shrink-0"
              style={{ width: "3px", backgroundColor: "var(--neon-primary)" }}
            />
          ))}
        </div>
        <div
          className="h-px w-full"
          style={{ background: "linear-gradient(90deg, transparent, var(--neon-primary), transparent)" }}
        />

        {/* Animated light streak */}
        {animated && (
          <motion.div
            className="absolute top-0 bottom-0 pointer-events-none"
            style={{ width: 120, left: 0 }}
            animate={{ x: ["0%", "calc(100vw + 120px)"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
          >
            <div
              className="h-full w-full rounded-full"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(63,169,255,0.8), var(--neon-bright), transparent)",
                filter: "blur(2px)",
              }}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}

export function SectionDivider() {
  return (
    <div className="relative my-12 flex items-center">
      <div
        className="flex-1 h-px"
        style={{ background: "linear-gradient(to right, transparent, var(--border-subtle))" }}
      />
      <div
        className="mx-4 w-2 h-2 rounded-full"
        style={{ backgroundColor: "var(--neon-primary)", boxShadow: "0 0 8px var(--neon-primary)" }}
      />
      <div
        className="flex-1 h-px"
        style={{ background: "linear-gradient(to left, transparent, var(--border-subtle))" }}
      />
    </div>
  );
}
