"use client";

import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const NeonButton = forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, variant = "primary", size = "md", children, style, ...props }, ref) => {
    const base = "inline-flex items-center justify-center gap-2 font-semibold uppercase tracking-widest transition-all duration-200 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2";

    const sizes = {
      sm: "px-4 py-1.5 text-xs",
      md: "px-6 py-2.5 text-sm",
      lg: "px-8 py-3.5 text-base",
    };

    const variants = {
      primary: {
        backgroundColor: "var(--neon-primary)",
        color: "#050814",
        boxShadow: "0 0 16px rgba(63,169,255,0.5)",
      },
      secondary: {
        backgroundColor: "transparent",
        color: "var(--neon-primary)",
        border: "1px solid var(--neon-primary)",
        boxShadow: "0 0 12px rgba(63,169,255,0.2)",
      },
      ghost: {
        backgroundColor: "transparent",
        color: "var(--text-secondary)",
        border: "1px solid var(--border-subtle)",
      },
      gold: {
        backgroundColor: "var(--accent-gold)",
        color: "#050814",
        boxShadow: "0 0 16px rgba(245,197,24,0.4)",
      },
    };

    return (
      <button
        ref={ref}
        className={cn(base, sizes[size], className)}
        style={{ ...variants[variant], ...style }}
        onMouseEnter={(e) => {
          if (variant === "primary") {
            e.currentTarget.style.boxShadow = "0 0 24px rgba(63,169,255,0.8)";
            e.currentTarget.style.transform = "translateY(-1px)";
          } else if (variant === "secondary") {
            e.currentTarget.style.backgroundColor = "rgba(63,169,255,0.08)";
          } else if (variant === "gold") {
            e.currentTarget.style.boxShadow = "0 0 24px rgba(245,197,24,0.6)";
          }
        }}
        onMouseLeave={(e) => {
          Object.assign(e.currentTarget.style, variants[variant]);
          e.currentTarget.style.transform = "";
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
);
NeonButton.displayName = "NeonButton";

export default NeonButton;
