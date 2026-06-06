"use client";

import Link from "next/link";
import { LayoutDashboard, Trophy, Settings, LogOut, Train, Megaphone, Users } from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin/dashboard",     label: "Dashboard",   icon: LayoutDashboard },
  { href: "/admin/scores",        label: "Nhập điểm",   icon: Trophy          },
  { href: "/admin/announcements", label: "Thông báo",   icon: Megaphone       },
  { href: "/admin/challenges",    label: "Thử thách",   icon: Settings        },
  { href: "/admin/teams",         label: "Đội",         icon: Users           },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "var(--bg-deep)" }}>
      {/* Sidebar */}
      <aside
        className="hidden md:flex flex-col w-56 shrink-0"
        style={{ backgroundColor: "var(--bg-surface)", borderRight: "1px solid var(--border-subtle)" }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-2 px-4 py-4"
          style={{ borderBottom: "1px solid var(--border-subtle)" }}
        >
          <div
            className="w-7 h-7 rounded flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, var(--neon-primary), var(--neon-deep))" }}
          >
            <Train size={14} className="text-white" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
              VIDI<span style={{ color: "var(--accent-gold)" }}>26</span>
            </div>
            <div className="text-[9px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
              Admin
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors"
                style={{ color: "var(--text-secondary)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(63,169,255,0.08)";
                  e.currentTarget.style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                <Icon size={15} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Sign out */}
        <div className="px-3 pb-4" style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "1rem" }}>
          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="flex items-center gap-2 w-full px-3 py-2 rounded text-sm transition-colors"
              style={{ color: "var(--text-muted)" }}
            >
              <LogOut size={14} />
              Đăng xuất
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 overflow-auto">{children}</main>
    </div>
  );
}
