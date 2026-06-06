import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AnnouncementForm from "../../AnnouncementForm";
import type { Announcement } from "@/lib/supabase/types";

export default async function EditAnnouncementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: raw } = await supabase
    .from("announcements")
    .select("id, title, slug, body_md, cover_url, pinned, published")
    .eq("id", id)
    .single();
  const data = raw as Announcement | null;

  if (!data) notFound();

  return (
    <div className="p-6">
      <h1
        className="text-xl font-bold uppercase tracking-wider mb-6"
        style={{ color: "var(--text-primary)" }}
      >
        Sửa thông báo
      </h1>
      <AnnouncementForm
        mode="edit"
        initial={{
          id: data.id,
          title: data.title,
          slug: data.slug,
          body_md: data.body_md,
          cover_url: data.cover_url,
          pinned: data.pinned,
          published: data.published,
        }}
      />
    </div>
  );
}
