import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface GlowPanelProps extends HTMLAttributes<HTMLDivElement> {
  glow?: "neon" | "gold" | "red" | "none";
  elevated?: boolean;
}

export default function GlowPanel({
  className,
  glow = "neon",
  elevated = false,
  children,
  style,
  ...props
}: GlowPanelProps) {
  const glowStyles = {
    neon: { border: "1px solid var(--border-glow)", boxShadow: "0 0 20px rgba(63,169,255,0.1), inset 0 0 30px rgba(63,169,255,0.03)" },
    gold: { border: "1px solid rgba(245,197,24,0.4)", boxShadow: "0 0 20px rgba(245,197,24,0.1)" },
    red:  { border: "1px solid rgba(255,51,85,0.4)",  boxShadow: "0 0 20px rgba(255,51,85,0.1)" },
    none: { border: "1px solid var(--border-subtle)" },
  };

  return (
    <div
      className={cn("rounded-xl p-5", className)}
      style={{
        backgroundColor: elevated ? "var(--bg-elevated)" : "var(--bg-surface)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        ...glowStyles[glow],
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
