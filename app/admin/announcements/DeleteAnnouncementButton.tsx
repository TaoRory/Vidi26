"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function DeleteAnnouncementButton({ id, title }: { id: string; title: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm(`Xoá thông báo "${title}"?`)) return;
    setLoading(true);
    const supabase = createClient();
    await supabase.from("announcements").delete().eq("id", id);
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="flex items-center gap-1 px-3 py-1.5 rounded text-xs transition-colors"
      style={{
        backgroundColor: "rgba(255,51,85,0.08)",
        color: "var(--accent-red)",
        border: "1px solid rgba(255,51,85,0.2)",
      }}
    >
      <Trash2 size={11} />
      {loading ? "..." : "Xoá"}
    </button>
  );
}
