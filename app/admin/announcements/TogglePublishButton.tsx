"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function TogglePublishButton({ id, published }: { id: string; published: boolean }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleToggle() {
    setLoading(true);
    const supabase = createClient();
    await supabase
      .from("announcements")
      .update({
        published: !published,
        published_at: !published ? new Date().toISOString() : null,
      })
      .eq("id", id);
    router.refresh();
    setLoading(false);
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className="text-[10px] underline transition-opacity"
      style={{ color: "var(--text-muted)", opacity: loading ? 0.4 : 1 }}
    >
      {published ? "Ẩn" : "Đăng"}
    </button>
  );
}
