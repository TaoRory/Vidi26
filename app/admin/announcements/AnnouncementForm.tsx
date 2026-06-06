"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pin, Globe, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import NeonButton from "@/components/theme/NeonButton";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

interface AnnouncementFormProps {
  mode: "new" | "edit";
  initial?: {
    id: string;
    title: string;
    slug: string;
    body_md: string;
    cover_url: string | null;
    pinned: boolean;
    published: boolean;
  };
}

const INPUT_STYLE = {
  backgroundColor: "var(--bg-elevated)",
  border: "1px solid var(--border-subtle)",
  color: "var(--text-primary)",
  borderRadius: 6,
  outline: "none",
  width: "100%",
  padding: "10px 14px",
  fontSize: 14,
};

const LABEL_STYLE = {
  display: "block",
  fontSize: 11,
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  fontWeight: 600,
  marginBottom: 6,
  color: "var(--text-secondary)",
};

export default function AnnouncementForm({ mode, initial }: AnnouncementFormProps) {
  const router = useRouter();
  const [title, setTitle]       = useState(initial?.title     ?? "");
  const [slug, setSlug]         = useState(initial?.slug      ?? "");
  const [bodyMd, setBodyMd]     = useState(initial?.body_md   ?? "");
  const [coverUrl, setCoverUrl] = useState(initial?.cover_url ?? "");
  const [pinned, setPinned]     = useState(initial?.pinned    ?? false);
  const [published, setPublished] = useState(initial?.published ?? false);
  const [preview, setPreview]   = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);

  function handleTitleChange(v: string) {
    setTitle(v);
    if (mode === "new") setSlug(slugify(v));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !slug.trim() || !bodyMd.trim()) {
      setError("Vui lòng điền đầy đủ tiêu đề, slug và nội dung.");
      return;
    }
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      body_md: bodyMd.trim(),
      cover_url: coverUrl.trim() || null,
      pinned,
      published,
      published_at: published ? (initial?.published ? undefined : new Date().toISOString()) : null,
    };

    let dbError;
    if (mode === "new") {
      ({ error: dbError } = await supabase.from("announcements").insert(payload));
    } else {
      ({ error: dbError } = await supabase
        .from("announcements")
        .update(payload)
        .eq("id", initial!.id));
    }

    if (dbError) {
      setError(dbError.message);
      setLoading(false);
      return;
    }

    router.push("/admin/announcements");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
      {/* Title */}
      <div>
        <label style={LABEL_STYLE}>Tiêu đề *</label>
        <input
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="VD: Lịch trình ngày 1 — Khởi Hành"
          style={INPUT_STYLE}
          onFocus={(e) => (e.target.style.borderColor = "var(--neon-primary)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border-subtle)")}
        />
      </div>

      {/* Slug */}
      <div>
        <label style={LABEL_STYLE}>Slug (URL) *</label>
        <div className="flex items-center gap-2">
          <span className="text-xs shrink-0" style={{ color: "var(--text-muted)" }}>/announcements/</span>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
            placeholder="lich-trinh-ngay-1"
            style={{ ...INPUT_STYLE, flex: 1 }}
            onFocus={(e) => (e.target.style.borderColor = "var(--neon-primary)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border-subtle)")}
          />
        </div>
      </div>

      {/* Cover URL */}
      <div>
        <label style={LABEL_STYLE}>Ảnh bìa (URL, tuỳ chọn)</label>
        <input
          value={coverUrl}
          onChange={(e) => setCoverUrl(e.target.value)}
          placeholder="https://..."
          style={INPUT_STYLE}
          onFocus={(e) => (e.target.style.borderColor = "var(--neon-primary)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border-subtle)")}
        />
      </div>

      {/* Body markdown */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label style={{ ...LABEL_STYLE, marginBottom: 0 }}>Nội dung (Markdown) *</label>
          <button
            type="button"
            className="flex items-center gap-1 text-xs"
            style={{ color: "var(--neon-primary)" }}
            onClick={() => setPreview(!preview)}
          >
            {preview ? <EyeOff size={12} /> : <Eye size={12} />}
            {preview ? "Ẩn preview" : "Xem preview"}
          </button>
        </div>
        {preview ? (
          <div
            className="rounded-md p-4 min-h-[200px] text-sm leading-relaxed"
            style={{
              backgroundColor: "var(--bg-elevated)",
              border: "1px solid var(--border-subtle)",
              color: "var(--text-primary)",
            }}
            dangerouslySetInnerHTML={{ __html: renderMarkdownSafe(bodyMd) }}
          />
        ) : (
          <textarea
            value={bodyMd}
            onChange={(e) => setBodyMd(e.target.value)}
            rows={12}
            placeholder={`## Thông báo quan trọng\n\nNội dung thông báo...\n\n- Mục 1\n- Mục 2`}
            style={{
              ...INPUT_STYLE,
              resize: "vertical",
              fontFamily: "var(--font-mono)",
              lineHeight: 1.6,
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--neon-primary)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border-subtle)")}
          />
        )}
        <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
          Hỗ trợ: # H1, ## H2, **in đậm**, *in nghiêng*, - danh sách, &gt; trích dẫn
        </p>
      </div>

      {/* Options row */}
      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer select-none text-sm" style={{ color: "var(--text-secondary)" }}>
          <input
            type="checkbox"
            checked={pinned}
            onChange={(e) => setPinned(e.target.checked)}
            className="accent-yellow-400"
          />
          <Pin size={13} style={{ color: "var(--accent-gold)" }} />
          Ghim thông báo
        </label>
        <label className="flex items-center gap-2 cursor-pointer select-none text-sm" style={{ color: "var(--text-secondary)" }}>
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="accent-sky-400"
          />
          <Globe size={13} style={{ color: "var(--neon-primary)" }} />
          Đăng ngay
        </label>
      </div>

      {error && (
        <div
          className="rounded px-4 py-2.5 text-sm"
          style={{ backgroundColor: "rgba(255,51,85,0.1)", border: "1px solid rgba(255,51,85,0.3)", color: "var(--accent-red)" }}
        >
          {error}
        </div>
      )}

      <div className="flex items-center gap-3 pt-2">
        <NeonButton type="submit" variant="primary" size="md" disabled={loading}>
          {loading ? "Đang lưu..." : mode === "new" ? "Tạo thông báo" : "Lưu thay đổi"}
        </NeonButton>
        <NeonButton
          type="button"
          variant="ghost"
          size="md"
          onClick={() => router.push("/admin/announcements")}
        >
          Huỷ
        </NeonButton>
      </div>
    </form>
  );
}

// Simple safe markdown → HTML (no external deps, no XSS from user content)
function renderMarkdownSafe(md: string): string {
  const escaped = md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const blocks = escaped.split(/\n\n+/);
  return blocks
    .map((block) => {
      const lines = block.split("\n");
      const first = lines[0];

      if (first.startsWith("### ")) return `<h3 style="font-size:1rem;font-weight:700;margin:0 0 4px;color:var(--text-primary)">${inlineFormat(first.slice(4))}</h3>`;
      if (first.startsWith("## "))  return `<h2 style="font-size:1.15rem;font-weight:800;margin:0 0 4px;color:var(--text-primary)">${inlineFormat(first.slice(3))}</h2>`;
      if (first.startsWith("# "))   return `<h1 style="font-size:1.4rem;font-weight:900;margin:0 0 6px;color:var(--text-primary)">${inlineFormat(first.slice(2))}</h1>`;

      if (lines.every((l) => l.startsWith("- ") || l.startsWith("* "))) {
        const items = lines.map((l) => `<li style="margin-left:1.2em;list-style:disc">${inlineFormat(l.slice(2))}</li>`).join("");
        return `<ul style="margin:0;padding:0">${items}</ul>`;
      }

      if (first.startsWith("&gt; ")) {
        return `<blockquote style="border-left:3px solid var(--neon-primary);padding:4px 12px;margin:0;color:var(--text-secondary);font-style:italic">${inlineFormat(first.slice(5))}</blockquote>`;
      }

      return `<p style="margin:0;color:var(--text-secondary)">${lines.map(inlineFormat).join("<br/>")}</p>`;
    })
    .join('<div style="height:10px"></div>');
}

function inlineFormat(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, `<code style="background:rgba(63,169,255,0.1);padding:1px 5px;border-radius:3px;font-size:0.85em">$1</code>`);
}
