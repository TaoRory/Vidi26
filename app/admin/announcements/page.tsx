import Link from "next/link";
import { Plus, Pencil, Pin, Globe, FileText } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import DeleteAnnouncementButton from "./DeleteAnnouncementButton";
import TogglePublishButton from "./TogglePublishButton";

export const revalidate = 0;

export default async function AdminAnnouncementsPage() {
  const supabase = await createClient();
  const { data: announcements } = await supabase
    .from("announcements")
    .select("id, title, slug, pinned, published, published_at, created_at")
    .order("created_at", { ascending: false });

  const list = announcements ?? [];

  return (
    <div className="p-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
            Thông Báo
          </h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            {list.length} thông báo · {list.filter(a => a.published).length} đã đăng
          </p>
        </div>
        <Link
          href="/admin/announcements/new"
          className="flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all"
          style={{
            background: "linear-gradient(135deg, var(--neon-primary), var(--neon-deep))",
            color: "white",
            boxShadow: "0 0 16px rgba(63,169,255,0.3)",
          }}
        >
          <Plus size={15} />
          Thêm thông báo
        </Link>
      </div>

      {/* Table */}
      {list.length === 0 ? (
        <div
          className="rounded-xl p-12 text-center"
          style={{ backgroundColor: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}
        >
          <FileText size={32} className="mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
          <p style={{ color: "var(--text-muted)" }}>Chưa có thông báo nào. Tạo thông báo đầu tiên!</p>
        </div>
      ) : (
        <div
          className="rounded-xl overflow-hidden"
          style={{ backgroundColor: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                {["Tiêu đề", "Trạng thái", "Ngày tạo", ""].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs uppercase tracking-wider font-medium"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map((ann, idx) => (
                <tr
                  key={ann.id}
                  style={{ borderBottom: idx < list.length - 1 ? "1px solid var(--border-subtle)" : "none" }}
                >
                  {/* Title */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {ann.pinned && (
                        <Pin size={12} style={{ color: "var(--accent-gold)" }} />
                      )}
                      <span className="font-medium" style={{ color: "var(--text-primary)" }}>
                        {ann.title}
                      </span>
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                      /{ann.slug}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-medium"
                        style={{
                          backgroundColor: ann.published ? "rgba(63,169,255,0.12)" : "rgba(100,116,139,0.12)",
                          color: ann.published ? "var(--neon-primary)" : "var(--text-muted)",
                          border: `1px solid ${ann.published ? "rgba(63,169,255,0.3)" : "rgba(100,116,139,0.2)"}`,
                        }}
                      >
                        <Globe size={9} />
                        {ann.published ? "Đã đăng" : "Nháp"}
                      </span>
                      <TogglePublishButton
                        id={ann.id}
                        published={ann.published}
                      />
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-4 py-3 text-xs" style={{ color: "var(--text-muted)" }}>
                    {new Date(ann.created_at).toLocaleDateString("vi-VN")}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <Link
                        href={`/admin/announcements/${ann.id}/edit`}
                        className="flex items-center gap-1 px-3 py-1.5 rounded text-xs transition-colors"
                        style={{
                          backgroundColor: "rgba(63,169,255,0.08)",
                          color: "var(--neon-primary)",
                          border: "1px solid rgba(63,169,255,0.2)",
                        }}
                      >
                        <Pencil size={11} />
                        Sửa
                      </Link>
                      <DeleteAnnouncementButton id={ann.id} title={ann.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
