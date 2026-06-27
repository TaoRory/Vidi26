import Link from "next/link";
import { Pin, ArrowRight, Megaphone } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { TrainTrack } from "@/components/theme/TrainTrack";
import type { Announcement } from "@/lib/supabase/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thông Báo",
  description: "Thông báo sự kiện VIDI26",
};

export const revalidate = 60;

export default async function AnnouncementsPage() {
  const supabase = await createClient();
  const { data: raw } = await supabase
    .from("announcements")
    .select("id, title, slug, cover_url, pinned, published_at, body_md")
    .eq("published", true)
    .order("pinned", { ascending: false })
    .order("published_at", { ascending: false });

  const list = (raw as Announcement[] | null) ?? [];

  return (
    <div>
      {/* Header */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(to bottom, rgba(30,64,175,0.2) 0%, transparent 100%)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 pb-8">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "rgba(63,169,255,0.1)", border: "1px solid var(--border-glow)" }}
            >
              <Megaphone size={20} style={{ color: "var(--neon-primary)" }} />
            </div>
            <div>
              <h1
                className="text-3xl sm:text-4xl font-black uppercase tracking-wider"
                style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
              >
                Thông <span style={{ color: "var(--neon-primary)" }}>Báo</span>
              </h1>
              <p className="text-sm uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                ANNOUNCEMENTS · VIDI26
              </p>
            </div>
          </div>
        </div>
        <TrainTrack animated className="mt-2" />
      </div>

      {/* List */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
        {list.length === 0 ? (
          <div
            className="rounded-xl p-12 text-center"
            style={{ backgroundColor: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}
          >
            <Megaphone size={32} className="mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
            <p style={{ color: "var(--text-muted)" }}>Trạm này chưa có dữ liệu, quay lại sau</p>
          </div>
        ) : (
          <div className="space-y-4">
            {list.map((ann) => {
              const excerpt = ann.body_md
                .replace(/#{1,3}\s/g, "")
                .replace(/\*\*/g, "")
                .replace(/\*/g, "")
                .slice(0, 160);

              return (
                <Link key={ann.id} href={`/announcements/${ann.slug}`} className="block group">
                  <div
                    className="rounded-xl p-5 transition-all duration-200"
                    style={{
                      backgroundColor: "var(--bg-surface)",
                      border: `1px solid ${ann.pinned ? "rgba(245,197,24,0.3)" : "var(--border-subtle)"}`,
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        {ann.pinned && (
                          <div
                            className="inline-flex items-center gap-1 text-[9px] uppercase tracking-widest px-2 py-0.5 rounded mb-2"
                            style={{ backgroundColor: "rgba(245,197,24,0.1)", color: "var(--accent-gold)", border: "1px solid rgba(245,197,24,0.3)" }}
                          >
                            <Pin size={9} /> Ghim
                          </div>
                        )}
                        <h2
                          className="text-base font-bold mb-1 truncate transition-colors"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {ann.title}
                        </h2>
                        <p className="text-sm line-clamp-2" style={{ color: "var(--text-secondary)" }}>
                          {excerpt}…
                        </p>
                        <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
                          {ann.published_at
                            ? new Date(ann.published_at).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })
                            : "—"}
                        </p>
                      </div>
                      <ArrowRight
                        size={18}
                        className="shrink-0 mt-1 transition-transform group-hover:translate-x-1"
                        style={{ color: "var(--neon-primary)" }}
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
