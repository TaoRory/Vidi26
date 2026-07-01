"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Train, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const EVENT_DATE = new Date("2026-07-09T08:00:00+07:00");

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    function tick() {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
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
      <span className="font-mono text-sm font-bold tabular-nums leading-none" style={{ color: "var(--neon-primary)", fontFamily: "var(--font-mono)" }}>
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[9px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>{label}</span>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const countdown = useCountdown(EVENT_DATE);
  const { lang, setLang, t } = useLanguage();

  const NAV_ITEMS = [
    { href: "/",              label: t.header.nav.dashboard,    num: "01" },
    { href: "/agenda",        label: t.header.nav.timeline,     num: "02" },
    { href: "/leaderboard",   label: t.header.nav.leaderboard,  num: "03" },
    { href: "/announcements", label: t.header.nav.announcement, num: "04" },
  ];

  const c = t.header.countdown;

  return (
    <>
    <header
      className="sticky top-0 z-50 w-full"
      style={{ backgroundColor: "rgba(5, 8, 20, 0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid var(--border-subtle)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 group">
            <Image src="/logo-vidi26.svg" alt="VIDI26 Next Station" width={110} height={52} style={{ objectFit: "contain" }} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.num}
                  href={item.href}
                  className={cn("relative px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors group flex flex-col items-center gap-0.5 rounded")}
                  style={{ color: active ? "var(--neon-primary)" : "var(--text-secondary)" }}
                >
                  <span style={{ color: active ? "var(--neon-primary)" : "var(--text-muted)", fontSize: "8px" }}>{item.num}</span>
                  <span>{item.label}</span>
                  {active && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full" style={{ background: "var(--neon-primary)", boxShadow: "0 0 8px var(--neon-primary)" }} />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            {/* Countdown */}
            <div className="hidden sm:flex items-center gap-2 rounded px-3 py-1.5" style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}>
              <Train size={12} style={{ color: "var(--neon-primary)" }} />
              <div className="flex items-center gap-2">
                <CountdownUnit value={countdown.days}    label={c.day} />
                <span style={{ color: "var(--neon-primary)", fontSize: "10px" }}>:</span>
                <CountdownUnit value={countdown.hours}   label={c.hour} />
                <span style={{ color: "var(--neon-primary)", fontSize: "10px" }}>:</span>
                <CountdownUnit value={countdown.minutes} label={c.minute} />
                <span style={{ color: "var(--neon-primary)", fontSize: "10px" }}>:</span>
                <CountdownUnit value={countdown.seconds} label={c.second} />
              </div>
            </div>

            {/* Language toggle */}
            <div
              className="flex items-center rounded overflow-hidden"
              style={{ border: "1px solid var(--border-subtle)", backgroundColor: "var(--bg-elevated)" }}
            >
              {(["vi", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider transition-all"
                  style={{
                    color: lang === l ? "var(--neon-primary)" : "var(--text-muted)",
                    backgroundColor: lang === l ? "rgba(63,169,255,0.12)" : "transparent",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button className="lg:hidden p-2 rounded" onClick={() => setMenuOpen(!menuOpen)} style={{ color: "var(--text-secondary)" }} aria-label="Toggle menu">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <div className="lg:hidden py-4 border-t" style={{ borderColor: "var(--border-subtle)" }}>
            <div className="flex items-center justify-center gap-3 mb-4 rounded py-2" style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}>
              <Train size={12} style={{ color: "var(--neon-primary)" }} />
              <div className="flex items-center gap-2">
                <CountdownUnit value={countdown.days}    label={c.day} />
                <span style={{ color: "var(--neon-primary)", fontSize: "10px" }}>:</span>
                <CountdownUnit value={countdown.hours}   label={c.hour} />
                <span style={{ color: "var(--neon-primary)", fontSize: "10px" }}>:</span>
                <CountdownUnit value={countdown.minutes} label={c.minute} />
                <span style={{ color: "var(--neon-primary)", fontSize: "10px" }}>:</span>
                <CountdownUnit value={countdown.seconds} label={c.second} />
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
                    style={{ color: active ? "var(--neon-primary)" : "var(--text-secondary)", backgroundColor: active ? "rgba(63,169,255,0.08)" : "transparent" }}
                  >
                    <span style={{ color: "var(--text-muted)", fontSize: "10px", fontFamily: "var(--font-mono)" }}>{item.num}</span>
                    <span className="font-semibold">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>

      {/* Admin shortcut — fixed bottom-right */}
      <Link
        href="/admin/login"
        className="fixed bottom-5 right-5 z-50 w-9 h-9 rounded-full flex items-center justify-center transition-all"
        style={{
          backgroundColor: "rgba(5,8,20,0.75)",
          border: "1px solid var(--border-subtle)",
          backdropFilter: "blur(8px)",
          color: "var(--text-muted)",
        }}
        title="Admin"
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--neon-primary)";
          e.currentTarget.style.color = "var(--neon-primary)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--border-subtle)";
          e.currentTarget.style.color = "var(--text-muted)";
        }}
      >
        <Lock size={14} />
      </Link>
    </>
  );
}
