import { cn } from "@/lib/utils";

interface StationSignProps {
  nameVi: string;
  nameEn?: string;
  number?: string;
  active?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function StationSign({
  nameVi,
  nameEn,
  number,
  active = false,
  size = "md",
  className,
}: StationSignProps) {
  const sizes = {
    sm: { outer: "px-3 py-1.5", vi: "text-sm font-bold", en: "text-[9px]", num: "text-[8px]" },
    md: { outer: "px-4 py-2",   vi: "text-base font-bold", en: "text-[10px]", num: "text-[9px]" },
    lg: { outer: "px-5 py-3",   vi: "text-xl font-bold", en: "text-xs", num: "text-xs" },
  };

  const s = sizes[size];

  return (
    <div
      className={cn("inline-flex flex-col items-center rounded transition-all duration-200", s.outer, className)}
      style={{
        backgroundColor: active ? "rgba(63,169,255,0.12)" : "var(--bg-elevated)",
        border: active ? "1px solid var(--neon-primary)" : "1px solid var(--border-subtle)",
        boxShadow: active ? "0 0 16px rgba(63,169,255,0.25)" : "none",
      }}
    >
      {number && (
        <div
          className={cn("uppercase tracking-widest mb-0.5", s.num)}
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
        >
          TRẠM {number}
        </div>
      )}
      <div
        className={cn("uppercase tracking-wider", s.vi)}
        style={{ color: active ? "var(--neon-primary)" : "var(--text-primary)" }}
      >
        {nameVi}
      </div>
      {nameEn && (
        <div
          className={cn("uppercase tracking-widest mt-0.5", s.en)}
          style={{ color: "var(--text-muted)" }}
        >
          {nameEn}
        </div>
      )}
    </div>
  );
}
