import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface BoardingPassCardProps {
  rank?: number;
  teamNumber?: number | string;
  teamName?: string;
  score?: number | string;
  subLabel?: string;
  variant?: "gold" | "silver" | "bronze" | "default";
  className?: string;
  children?: ReactNode;
}

const RANK_STYLES = {
  gold:    { border: "1px solid var(--accent-gold)",    shadow: "0 0 30px rgba(245,197,24,0.3)",   label: "1ST" },
  silver:  { border: "1px solid #94a3b8",               shadow: "0 0 20px rgba(148,163,184,0.2)",  label: "2ND" },
  bronze:  { border: "1px solid #cd7f32",               shadow: "0 0 20px rgba(205,127,50,0.2)",   label: "3RD" },
  default: { border: "1px solid var(--border-subtle)",  shadow: "none",                             label: ""   },
};

export default function BoardingPassCard({
  rank,
  teamNumber,
  teamName,
  score,
  subLabel,
  variant = "default",
  className,
  children,
}: BoardingPassCardProps) {
  const styles = RANK_STYLES[variant];

  return (
    <div
      className={cn("relative rounded-xl overflow-hidden", className)}
      style={{
        backgroundColor: "var(--bg-elevated)",
        border: styles.border,
        boxShadow: styles.shadow,
      }}
    >
      {/* Top strip */}
      <div
        className="px-5 py-3"
        style={{
          borderBottom: "1px dashed var(--border-subtle)",
          background:
            variant === "gold"
              ? "linear-gradient(135deg, rgba(245,197,24,0.12), transparent)"
              : variant === "silver"
              ? "linear-gradient(135deg, rgba(148,163,184,0.08), transparent)"
              : variant === "bronze"
              ? "linear-gradient(135deg, rgba(205,127,50,0.08), transparent)"
              : "transparent",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="text-[9px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
            BOARDING PASS
          </div>
          {rank && (
            <div
              className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded"
              style={{
                color: variant === "gold" ? "var(--accent-gold)" : variant === "silver" ? "#94a3b8" : variant === "bronze" ? "#cd7f32" : "var(--text-muted)",
                border: `1px solid currentColor`,
                fontFamily: "var(--font-mono)",
              }}
            >
              #{rank}
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="px-5 py-4">
        {children || (
          <div className="flex items-end justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>
                TEAM {teamNumber}
              </div>
              <div className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                {teamName}
              </div>
              {subLabel && (
                <div className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>{subLabel}</div>
              )}
            </div>
            {score !== undefined && (
              <div className="text-right">
                <div className="text-[9px] uppercase mb-0.5" style={{ color: "var(--text-muted)" }}>SCORE</div>
                <div
                  className="text-2xl font-bold tabular-nums"
                  style={{
                    color: variant === "gold" ? "var(--accent-gold)" : "var(--neon-primary)",
                    fontFamily: "var(--font-mono)",
                    textShadow: variant === "gold" ? "0 0 12px rgba(245,197,24,0.5)" : "0 0 12px rgba(63,169,255,0.5)",
                  }}
                >
                  {score}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom: barcode strip */}
      <div className="px-5 pb-4">
        <div
          className="h-5 rounded"
          style={{
            background: "repeating-linear-gradient(90deg, var(--text-muted) 0px, var(--text-muted) 2px, transparent 2px, transparent 4px)",
            opacity: 0.3,
          }}
        />
        <div
          className="text-center text-[8px] mt-1 uppercase tracking-widest"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
        >
          VIDI26 ★ NEXT STATION: VINUNI
        </div>
      </div>
    </div>
  );
}
