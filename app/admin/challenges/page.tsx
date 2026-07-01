"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, ToggleLeft, ToggleRight, ChevronDown, ChevronUp } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import NeonButton from "@/components/theme/NeonButton";
import type { Station } from "@/lib/supabase/types";

interface Challenge {
  id: string;
  station_id: string | null;
  name: string;
  description: string | null;
  max_score: number;
  weight: number;
  active: boolean;
  created_at: string;
}

interface NewChallenge {
  station_id: string;
  name: string;
  description: string;
  max_score: string;
  weight: string;
}

export default function AdminChallengesPage() {
  const [stations, setStations] = useState<Station[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<NewChallenge>({
    station_id: "",
    name: "",
    description: "",
    max_score: "100",
    weight: "1",
  });
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const supabase = createClient();
    const [{ data: s }, { data: c }] = await Promise.all([
      supabase.from("stations").select("*").order("order_index"),
      supabase.from("challenges").select("*").order("created_at"),
    ]);
    setStations(s || []);
    setChallenges(c as Challenge[] || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleAdd() {
    if (!form.station_id || !form.name.trim()) {
      setError("Vui lòng chọn trạm và nhập tên thử thách.");
      return;
    }
    setSaving(true);
    setError(null);
    const supabase = createClient();
    const { error: err } = await supabase.from("challenges").insert({
      station_id: form.station_id,
      name: form.name.trim(),
      description: form.description.trim() || null,
      max_score: Number(form.max_score) || 100,
      weight: Number(form.weight) || 1,
      active: true,
    });
    if (err) {
      setError("Lỗi: " + err.message);
    } else {
      setForm({ station_id: form.station_id, name: "", description: "", max_score: "100", weight: "1" });
      setShowForm(false);
      await load();
    }
    setSaving(false);
  }

  async function toggleActive(id: string, current: boolean) {
    const supabase = createClient();
    await supabase.from("challenges").update({ active: !current }).eq("id", id);
    setChallenges((prev) => prev.map((c) => c.id === id ? { ...c, active: !current } : c));
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Xóa thử thách "${name}"? Tất cả điểm liên quan sẽ mất.`)) return;
    const supabase = createClient();
    const { error: err } = await supabase.from("challenges").delete().eq("id", id);
    if (err) {
      alert("Lỗi xóa: " + err.message);
    } else {
      setChallenges((prev) => prev.filter((c) => c.id !== id));
    }
  }

  const grouped = stations.reduce<Record<string, { station: Station; list: Challenge[] }>>((acc, s) => {
    acc[s.id] = { station: s, list: challenges.filter((c) => c.station_id === s.id) };
    return acc;
  }, {});

  return (
    <div className="p-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black uppercase" style={{ color: "var(--text-primary)" }}>Thử Thách</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            {challenges.length} thử thách · {challenges.filter((c) => c.active).length} đang mở
          </p>
        </div>
        <NeonButton variant="primary" size="sm" onClick={() => setShowForm(!showForm)}>
          {showForm ? <ChevronUp size={14} /> : <Plus size={14} />}
          {showForm ? "Đóng" : "Thêm mới"}
        </NeonButton>
      </div>

      {/* Add form */}
      {showForm && (
        <div
          className="rounded-xl p-5 mb-6 space-y-4"
          style={{ backgroundColor: "var(--bg-surface)", border: "1px solid var(--border-glow)" }}
        >
          <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: "var(--neon-primary)" }}>
            Thêm thử thách mới
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
                Trạm *
              </label>
              <select
                value={form.station_id}
                onChange={(e) => setForm({ ...form, station_id: e.target.value })}
                className="w-full rounded px-3 py-2 text-sm outline-none"
                style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)" }}
              >
                <option value="">— Chọn trạm —</option>
                {stations.map((s) => (
                  <option key={s.id} value={s.id}>{s.name_vi} ({s.name_en})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
                Tên thử thách *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="VD: Team Building Round"
                className="w-full rounded px-3 py-2 text-sm outline-none"
                style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)" }}
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
                Điểm tối đa
              </label>
              <input
                type="number"
                min={1}
                value={form.max_score}
                onChange={(e) => setForm({ ...form, max_score: e.target.value })}
                className="w-full rounded px-3 py-2 text-sm outline-none"
                style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)" }}
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
                Hệ số (weight)
              </label>
              <input
                type="number"
                min={0.1}
                step={0.1}
                value={form.weight}
                onChange={(e) => setForm({ ...form, weight: e.target.value })}
                className="w-full rounded px-3 py-2 text-sm outline-none"
                style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)" }}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
              Mô tả (tùy chọn)
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={2}
              placeholder="Mô tả ngắn về thử thách..."
              className="w-full rounded px-3 py-2 text-sm outline-none resize-none"
              style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)" }}
            />
          </div>
          {error && (
            <p className="text-sm" style={{ color: "var(--accent-red)" }}>{error}</p>
          )}
          <div className="flex gap-3">
            <NeonButton variant="primary" size="sm" onClick={handleAdd} disabled={saving}>
              {saving ? "Đang lưu..." : "Thêm thử thách"}
            </NeonButton>
            <NeonButton variant="ghost" size="sm" onClick={() => { setShowForm(false); setError(null); }}>
              Hủy
            </NeonButton>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>Đang tải...</p>
      ) : (
        <div className="space-y-6">
          {Object.values(grouped).map(({ station, list }) => (
            <div key={station.id}>
              <div
                className="text-xs uppercase tracking-widest font-bold mb-3 px-1 flex items-center gap-2"
                style={{ color: "var(--neon-primary)" }}
              >
                <span>{station.name_vi}</span>
                <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>({station.name_en})</span>
                <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>· {list.length} thử thách</span>
              </div>
              {list.length === 0 ? (
                <p className="text-xs px-3" style={{ color: "var(--text-muted)" }}>Chưa có thử thách</p>
              ) : (
                <div className="space-y-2">
                  {list.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center gap-3 rounded-lg px-4 py-3"
                      style={{
                        backgroundColor: "var(--bg-surface)",
                        border: `1px solid ${c.active ? "var(--border-subtle)" : "rgba(100,116,139,0.2)"}`,
                        opacity: c.active ? 1 : 0.6,
                      }}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                          {c.name}
                        </div>
                        {c.description && (
                          <div className="text-xs mt-0.5 truncate" style={{ color: "var(--text-muted)" }}>
                            {c.description}
                          </div>
                        )}
                        <div className="flex gap-3 mt-1 text-[10px]" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                          <span>MAX {c.max_score}</span>
                          <span>×{c.weight}</span>
                          <span className={c.active ? "" : "line-through"} style={{ color: c.active ? "var(--neon-primary)" : "var(--text-muted)" }}>
                            {c.active ? "ACTIVE" : "INACTIVE"}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleActive(c.id, c.active)}
                        title={c.active ? "Tắt thử thách" : "Bật thử thách"}
                        style={{ color: c.active ? "var(--neon-primary)" : "var(--text-muted)" }}
                      >
                        {c.active ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                      </button>
                      <button
                        onClick={() => handleDelete(c.id, c.name)}
                        title="Xóa thử thách"
                        style={{ color: "var(--text-muted)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-red)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
