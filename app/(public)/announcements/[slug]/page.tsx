import { notFound } from "next/navigation";
import Link from "next/link";
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
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
      {/* Back */}
      <Link
        href="/announcements"
        className="inline-flex items-center gap-2 text-sm mb-8 transition-colors"
        style={{ color: "var(--text-muted)" }}
      >
        <ArrowLeft size={14} />
        Tất cả thông báo
      </Link>

      {/* Article */}
      <article
        className="rounded-xl overflow-hidden"
        style={{ backgroundColor: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}
      >
        {/* Cover image */}
        {data.cover_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data.cover_url}
            alt={data.title}
            className="w-full object-cover"
            style={{ maxHeight: 320 }}
          />
        )}

        <div className="p-6 sm:p-8">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {data.pinned && (
              <span
                className="inline-flex items-center gap-1 text-[9px] uppercase tracking-widest px-2 py-0.5 rounded"
                style={{ backgroundColor: "rgba(245,197,24,0.1)", color: "var(--accent-gold)", border: "1px solid rgba(245,197,24,0.3)" }}
              >
                <Pin size={9} /> Ghim
              </span>
            )}
            <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
              <Clock size={11} />
              {data.published_at
                ? new Date(data.published_at).toLocaleDateString("vi-VN", {
                    weekday: "long", day: "2-digit", month: "2-digit", year: "numeric",
                    hour: "2-digit", minute: "2-digit",
                  })
                : "—"}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-2xl sm:text-3xl font-black uppercase tracking-wide mb-6 leading-tight"
            style={{ color: "var(--text-primary)", fontFamily: "var(--font-serif)" }}
          >
            {data.title}
          </h1>

          {/* Divider */}
          <div className="mb-6" style={{ height: 1, background: "var(--border-subtle)" }} />

          {/* Markdown body */}
          <div className="announcement-body">
            <MarkdownBody content={data.body_md} />
          </div>
        </div>
      </article>
    </div>
  );
}

function MarkdownBody({ content }: { content: string }) {
  const blocks = content.split(/\n\n+/);

  return (
    <div className="space-y-4 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
      {blocks.map((block, i) => {
        const lines = block.split("\n");
        const first = lines[0];

        if (first.startsWith("# "))
          return (
            <h1 key={i} className="text-2xl font-black uppercase tracking-wide" style={{ color: "var(--text-primary)", fontFamily: "var(--font-serif)" }}>
              <InlineText text={first.slice(2)} />
            </h1>
          );
        if (first.startsWith("## "))
          return (
            <h2 key={i} className="text-lg font-bold uppercase tracking-wider mt-2" style={{ color: "var(--neon-bright)" }}>
              <InlineText text={first.slice(3)} />
            </h2>
          );
        if (first.startsWith("### "))
          return (
            <h3 key={i} className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
              <InlineText text={first.slice(4)} />
            </h3>
          );

        if (lines.every((l) => l.startsWith("- ") || l.startsWith("* ")))
          return (
            <ul key={i} className="space-y-1 pl-4">
              {lines.map((l, j) => (
                <li key={j} className="flex items-start gap-2">
                  <span style={{ color: "var(--neon-primary)", marginTop: 2 }}>▸</span>
                  <span><InlineText text={l.slice(2)} /></span>
                </li>
              ))}
            </ul>
          );

        if (first.startsWith("> "))
          return (
            <blockquote
              key={i}
              className="pl-4 py-1 italic text-sm"
              style={{ borderLeft: "3px solid var(--neon-primary)", color: "var(--text-muted)" }}
            >
              <InlineText text={first.slice(2)} />
            </blockquote>
          );

        if (first.startsWith("---"))
          return <hr key={i} style={{ border: "none", borderTop: "1px solid var(--border-subtle)" }} />;

        return (
          <p key={i}>
            {lines.map((line, j) => (
              <span key={j}>
                <InlineText text={line} />
                {j < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}

function InlineText({ text }: { text: string }) {
  // Split on **bold**, *italic*, `code`
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**"))
          return <strong key={i} style={{ color: "var(--text-primary)", fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
        if (part.startsWith("*") && part.endsWith("*"))
          return <em key={i}>{part.slice(1, -1)}</em>;
        if (part.startsWith("`") && part.endsWith("`"))
          return (
            <code key={i} className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: "rgba(63,169,255,0.1)", color: "var(--neon-bright)", fontFamily: "var(--font-mono)" }}>
              {part.slice(1, -1)}
            </code>
          );
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
