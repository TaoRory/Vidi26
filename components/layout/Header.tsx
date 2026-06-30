"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Train } from "lucide-react";
import { cn } from "@/lib/utils";

const EVENT_DATE = new Date("2026-07-09T08:00:00+07:00");

const NAV_ITEMS = [
  { href: "/",             label: "Dashboard",    en: "Home",         num: "01" },
  { href: "/agenda",       label: "Timeline",     en: "Agenda",       num: "02" },
  { href: "/leaderboard",  label: "Leaderboard",  en: "Leaderboard",  num: "03" },
  { href: "/announcements",label: "Announcement", en: "News",         num: "04" },
];

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function tick() {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span
        className="font-mono text-sm font-bold tabular-nums leading-none"
        style={{ color: "var(--neon-primary)", fontFamily: "var(--font-mono)" }}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[9px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
        {label}
      </span>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const countdown = useCountdown(EVENT_DATE);

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        backgroundColor: "rgba(5, 8, 20, 0.92)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 group">
            <Image
              src="/logo-vidi26.svg"
              alt="VIDI26 Next Station"
              width={110}
              height={52}
              style={{ objectFit: "contain" }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.num}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors group flex flex-col items-center gap-0.5 rounded",
                    active
                      ? "text-neon-primary"
                      : "hover:text-neon-bright"
                  )}
                  style={{
                    color: active ? "var(--neon-primary)" : "var(--text-secondary)",
                  }}
                >
                  <span style={{ color: active ? "var(--neon-primary)" : "var(--text-muted)", fontSize: "8px" }}>
                    {item.num}
                  </span>
                  <span>{item.label}</span>
                  {active && (
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full"
                      style={{ background: "var(--neon-primary)", boxShadow: "0 0 8px var(--neon-primary)" }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Countdown */}
          <div
            className="hidden sm:flex items-center gap-2 rounded px-3 py-1.5 shrink-0"
            style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
          >
            <Train size={12} style={{ color: "var(--neon-primary)" }} />
            <div className="flex items-center gap-2">
              <CountdownUnit value={countdown.days}    label="ngày" />
              <span style={{ color: "var(--neon-primary)", fontSize: "10px" }}>:</span>
              <CountdownUnit value={countdown.hours}   label="giờ" />
              <span style={{ color: "var(--neon-primary)", fontSize: "10px" }}>:</span>
              <CountdownUnit value={countdown.minutes} label="phút" />
              <span style={{ color: "var(--neon-primary)", fontSize: "10px" }}>:</span>
              <CountdownUnit value={countdown.seconds} label="giây" />
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: "var(--text-secondary)" }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <div
            className="lg:hidden py-4 border-t"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            {/* Mobile countdown */}
            <div
              className="flex items-center justify-center gap-3 mb-4 rounded py-2"
              style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
            >
              <Train size={12} style={{ color: "var(--neon-primary)" }} />
              <div className="flex items-center gap-2">
                <CountdownUnit value={countdown.days}    label="ngày" />
                <span style={{ color: "var(--neon-primary)", fontSize: "10px" }}>:</span>
                <CountdownUnit value={countdown.hours}   label="giờ" />
                <span style={{ color: "var(--neon-primary)", fontSize: "10px" }}>:</span>
                <CountdownUnit value={countdown.minutes} label="phút" />
                <span style={{ color: "var(--neon-primary)", fontSize: "10px" }}>:</span>
                <CountdownUnit value={countdown.seconds} label="giây" />
              </div>
            </div>
            <nav className="grid grid-cols-2 gap-1">
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.num}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 rounded px-3 py-2.5 text-sm font-medium transition-colors"
                    style={{
                      color: active ? "var(--neon-primary)" : "var(--text-secondary)",
                      backgroundColor: active ? "rgba(63,169,255,0.08)" : "transparent",
                    }}
                  >
                    <span style={{ color: "var(--text-muted)", fontSize: "10px", fontFamily: "var(--font-mono)" }}>
                      {item.num}
                    </span>
                    <div>
                      <div className="font-semibold">{item.label}</div>
                      <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>{item.en}</div>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
