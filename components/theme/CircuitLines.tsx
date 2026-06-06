"use client";

import { motion } from "framer-motion";

const NEON = "#3FA9FF";
const DIM = "rgba(63,169,255,0.18)";
const MED = "rgba(63,169,255,0.5)";
const BRIGHT = "rgba(63,169,255,0.8)";

// 4 parallel vertical tracks per panel
// Left panel:  x = [10, 24, 40, 56]  (track 0 = outermost/leftmost)
// Right panel: x = [24, 40, 56, 70]  (track 3 = outermost/rightmost)

const TRACKS_L = [10, 24, 40, 56];
const TRACKS_R = [24, 40, 56, 70];

// Horizontal connectors between adjacent/skip tracks [y, trackA, trackB]
const CONNS: [number, number, number][] = [
  [35,  0, 1], [75,  1, 2], [110, 2, 3],
  [150, 0, 1], [188, 1, 2], [225, 2, 3],
  [262, 0, 1], [300, 1, 2], [338, 2, 3],
  [375, 0, 2], [415, 1, 3],                // skip-track connectors for variety
  [452, 0, 1], [490, 1, 2], [528, 2, 3],
  [565, 0, 1], [603, 1, 2], [640, 2, 3],
  [678, 0, 1], [715, 1, 2], [752, 2, 3],
  [790, 0, 2], [828, 1, 3],
  [865, 0, 1], [902, 1, 2], [940, 2, 3],
  [975, 0, 1], [1000,1, 2],
];

// External branch stubs from outer 2 tracks going off-screen
// Each: [y, trackIdx, length]
const EXT_STUBS_L: [number, number, number][] = [
  [18,  0, 14], [55,  1, 10], [95,  0, 18],
  [132, 1, 12], [170, 0, 14], [208, 1, 10],
  [245, 0, 18], [282, 1, 12], [320, 0, 14],
  [357, 1, 10], [393, 0, 16], [430, 1, 12],
  [467, 0, 14], [503, 1, 10], [540, 0, 18],
  [578, 1, 12], [615, 0, 14], [652, 1, 10],
  [688, 0, 16], [726, 1, 12], [763, 0, 14],
  [800, 1, 10], [837, 0, 18], [875, 1, 12],
  [912, 0, 14], [950, 1, 10], [987, 0, 16],
];

function TrackPulse({ x, delay, dur }: { x: number; delay: number; dur: number }) {
  return (
    <motion.circle
      cx={x} r={2.8} fill={NEON}
      style={{ filter: `drop-shadow(0 0 5px ${NEON})` }}
      animate={{ cy: [-10, 1010], opacity: [0, 1, 1, 0] }}
      transition={{
        duration: dur, delay,
        repeat: Infinity, ease: "linear",
        repeatDelay: 2.5 + Math.floor(delay) * 0.4,
        times: [0, 0.04, 0.96, 1],
      }}
    />
  );
}

function BranchPacket({ x1, x2, y, delay }: { x1: number; x2: number; y: number; delay: number }) {
  return (
    <motion.circle
      cy={y} r={1.8} fill={BRIGHT}
      style={{ filter: `drop-shadow(0 0 3px ${NEON})` }}
      animate={{ cx: [x1, x2, x2], opacity: [0, 1, 0] }}
      transition={{
        duration: 0.9, delay,
        repeat: Infinity, repeatDelay: 7 + delay * 1.1,
        ease: "easeOut", times: [0, 0.7, 1],
      }}
    />
  );
}

function CircuitSVG({ flip = false }: { flip?: boolean }) {
  const id = flip ? "r" : "l";
  const T = flip ? TRACKS_R : TRACKS_L;
  const W = 80;

  // For left: outer = T[0] (small x), branches go left (toward 0)
  // For right: outer = T[3] (large x), branches go right (toward W)
  const outer0 = flip ? T[3] : T[0];
  const outer1 = flip ? T[2] : T[1];

  return (
    <svg viewBox={`0 0 ${W} 1000`} preserveAspectRatio="none" className="w-full h-full">
      <defs>
        <filter id={`glow${id}`} x="-80%" y="-30%" width="260%" height="160%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id={`lg${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="white" stopOpacity="0" />
          <stop offset="5%"   stopColor="white" stopOpacity="1" />
          <stop offset="95%"  stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id={`mask${id}`}>
          <rect width={W} height="1000" fill={`url(#lg${id})`} />
        </mask>
      </defs>

      <g mask={`url(#mask${id})`}>
        {/* ── 4 Vertical tracks ── */}
        {T.map((x, i) => (
          <line key={`t${i}`} x1={x} y1="0" x2={x} y2="1000"
            stroke={DIM} strokeWidth="1" />
        ))}

        {/* ── Horizontal connectors with junction pads ── */}
        {CONNS.map(([y, a, b], i) => {
          const x1 = T[a], x2 = T[b];
          return (
            <g key={`c${i}`} filter={`url(#glow${id})`}>
              <line x1={x1} y1={y} x2={x2} y2={y} stroke={DIM} strokeWidth="0.9" />
              {/* Via pads at junctions */}
              <circle cx={x1} cy={y} r="2.5" fill={MED} />
              <circle cx={x2} cy={y} r="2.5" fill={MED} />
              {/* Animated packet along connector (staggered) */}
              <BranchPacket
                x1={flip ? x2 : x1}
                x2={flip ? x1 : x2}
                y={y}
                delay={i * 0.7 + (b - a) * 0.3}
              />
            </g>
          );
        })}

        {/* ── External stub branches (go off-screen) ── */}
        {EXT_STUBS_L.map(([y, tIdx, len], i) => {
          const tx = tIdx === 0 ? outer0 : outer1;
          const ex = flip ? tx + len : tx - len;
          return (
            <g key={`e${i}`} filter={`url(#glow${id})`}>
              <line x1={tx} y1={y} x2={ex} y2={y} stroke={DIM} strokeWidth="0.9" />
              {/* PCB-style round pad (ring) at tip */}
              <circle cx={ex} cy={y} r="3"   fill="none" stroke={MED} strokeWidth="0.8" />
              <circle cx={ex} cy={y} r="1.2" fill={MED} />
            </g>
          );
        })}

        {/* ── Animated main-rail pulses ── */}
        {T.map((x, i) => (
          <TrackPulse key={`p${i}`}   x={x} delay={i * 1.4}       dur={5.5 + i * 0.5} />
        ))}
        {/* Second wave, staggered */}
        {T.slice(0, 3).map((x, i) => (
          <TrackPulse key={`p2${i}`}  x={x} delay={i * 1.8 + 2.5} dur={6 + i * 0.6} />
        ))}
      </g>
    </svg>
  );
}

export default function CircuitLines() {
  return (
    <>
      <div
        className="hidden lg:block fixed left-0 inset-y-0 pointer-events-none select-none"
        style={{ width: 80, zIndex: 3 }}
        aria-hidden="true"
      >
        <CircuitSVG flip={false} />
      </div>
      <div
        className="hidden lg:block fixed right-0 inset-y-0 pointer-events-none select-none"
        style={{ width: 80, zIndex: 3 }}
        aria-hidden="true"
      >
        <CircuitSVG flip={true} />
      </div>
    </>
  );
}
