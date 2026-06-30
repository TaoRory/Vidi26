import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Pin, ArrowLeft, Clock } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Announcement } from "@/lib/supabase/types";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("announcements")
    .select("title")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  const row = data as Pick<Announcement, "title"> | null;
  return { title: row?.title ?? "Thông Báo" };
}

export default async function AnnouncementDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: raw } = await supabase
    .from("announcements")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  const data = raw as Announcement | null;

  if (!data) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8">
      {/* Back */}
      <Link
        href="/announcements"
        className="inline-flex items-center gap-2 text-sm mb-6 transition-colors"
        style={{ color: "var(--text-muted)" }}
        onMouseEnter={undefined}
      >
        <ArrowLeft size={14} />
        Tất cả thông báo
      </Link>

      {/* Facebook-style post card */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ backgroundColor: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}
      >
        {/* Post header — page identity */}
        <div className="flex items-center gap-3 px-5 pt-5 pb-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: "rgba(63,169,255,0.12)", border: "2px solid var(--neon-primary)" }}
          >
            <Image src="/logo.png" alt="VIDI26" width={34} height={34} className="rounded-full object-contain" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-base" style={{ color: "var(--text-primary)" }}>VIDI26 Express</span>
              {data.pinned && (
                <span
                  className="inline-flex items-center gap-1 text-[9px] uppercase tracking-widest px-2 py-0.5 rounded"
                  style={{ backgroundColor: "rgba(245,197,24,0.1)", color: "var(--accent-gold)", border: "1px solid rgba(245,197,24,0.3)" }}
                >
                  <Pin size={8} /> Ghim
                </span>
              )}
            </div>
            {data.published_at && (
              <p className="text-xs flex items-center gap-1 mt-0.5" style={{ color: "var(--text-muted)" }}>
                <Clock size={10} />
                {new Date(data.published_at).toLocaleDateString("vi-VN", {
                  weekday: "long", day: "2-digit", month: "2-digit", year: "numeric",
                  hour: "2-digit", minute: "2-digit",
                })}
              </p>
            )}
          </div>
        </div>

        {/* Caption */}
        <div className="px-5 pb-4">
          <PostCaption content={data.body_md} />
        </div>

        {/* Cover image — full bleed */}
        {data.cover_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data.cover_url}
            alt={data.title}
            className="w-full block"
            style={{ maxHeight: 600, objectFit: "cover" }}
          />
        )}

        {/* Post footer */}
        <div
          className="px-5 py-3 flex items-center justify-between"
          style={{ borderTop: "1px solid var(--border-subtle)" }}
        >
          <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
            VIDI26 · NEXT STATION · 09.07.2026
          </span>
          <span className="text-[10px]" style={{ color: "var(--neon-primary)" }}>🚄</span>
        </div>
      </div>
    </div>
  );
}

function PostCaption({ content }: { content: string }) {
  const paragraphs = content.split(/\n+/).filter(Boolean);

  return (
    <div className="space-y-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
      {paragraphs.map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </div>
  );
}
