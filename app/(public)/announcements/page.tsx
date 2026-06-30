import Link from "next/link";
import Image from "next/image";
import { Pin, Megaphone } from "lucide-react";
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

      {/* Feed */}
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-10">
        {list.length === 0 ? (
          <div
            className="rounded-xl p-12 text-center"
            style={{ backgroundColor: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}
          >
            <Megaphone size={32} className="mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
            <p style={{ color: "var(--text-muted)" }}>Trạm này chưa có dữ liệu, quay lại sau</p>
          </div>
        ) : (
          <div className="space-y-6">
            {list.map((ann) => {
              const caption = ann.body_md
                .replace(/#{1,3}\s/g, "")
                .replace(/\*\*/g, "")
                .replace(/\*/g, "")
                .replace(/\n+/g, " ")
                .slice(0, 220);

              const dateStr = ann.published_at
                ? new Date(ann.published_at).toLocaleDateString("vi-VN", {
                    day: "2-digit", month: "2-digit", year: "numeric",
                    hour: "2-digit", minute: "2-digit",
                  })
                : null;

              return (
                <div
                  key={ann.id}
                  className="rounded-2xl overflow-hidden"
                  style={{ backgroundColor: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}
                >
                  {/* Post header */}
                  <div className="flex items-center gap-3 px-4 pt-4 pb-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "rgba(63,169,255,0.15)", border: "1.5px solid var(--neon-primary)" }}
                    >
                      <Image src="/logo.png" alt="VIDI26" width={28} height={28} className="rounded-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>VIDI26 Express</span>
                        {ann.pinned && (
                          <span
                            className="inline-flex items-center gap-1 text-[9px] uppercase tracking-widest px-2 py-0.5 rounded"
                            style={{ backgroundColor: "rgba(245,197,24,0.1)", color: "var(--accent-gold)", border: "1px solid rgba(245,197,24,0.3)" }}
                          >
                            <Pin size={8} /> Ghim
                          </span>
                        )}
                      </div>
                      {dateStr && (
                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>{dateStr}</p>
                      )}
                    </div>
                  </div>

                  {/* Caption preview */}
                  <div className="px-4 pb-3">
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {caption}…{" "}
                      <Link href={`/announcements/${ann.slug}`} className="font-semibold" style={{ color: "var(--neon-primary)" }}>
                        Xem thêm
                      </Link>
                    </p>
                  </div>

                  {/* Image */}
                  {ann.cover_url && (
                    <Link href={`/announcements/${ann.slug}`} className="block">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={ann.cover_url}
                        alt={ann.title}
                        className="w-full object-cover"
                        style={{ maxHeight: 480 }}
                      />
                    </Link>
                  )}

                  {/* Post footer */}
                  <div
                    className="px-4 py-3 flex items-center justify-between"
                    style={{ borderTop: "1px solid var(--border-subtle)" }}
                  >
                    <span className="text-xs font-semibold" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                      VIDI26 · NEXT STATION
                    </span>
                    <Link
                      href={`/announcements/${ann.slug}`}
                      className="text-xs font-semibold px-3 py-1 rounded-lg transition-colors"
                      style={{ backgroundColor: "rgba(63,169,255,0.1)", color: "var(--neon-primary)", border: "1px solid var(--border-subtle)" }}
                    >
                      Đọc tiếp →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
