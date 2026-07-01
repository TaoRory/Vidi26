"use client";

import { useState, useEffect } from "react";
import { Edit2, Check, X, Copy, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Team {
  id: string;
  team_number: number;
  name: string;
  slogan: string | null;
  color_hex: string | null;
  access_token: string;
}

export default function AdminTeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editSlogan, setEditSlogan] = useState("");
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.from("teams").select("id, team_number, name, slogan, color_hex, access_token").order("team_number").then(({ data }) => {
      setTeams(data as Team[] || []);
      setLoading(false);
    });
  }, []);

  function startEdit(team: Team) {
    setEditId(team.id);
    setEditName(team.name);
    setEditSlogan(team.slogan || "");
  }

  async function saveEdit(id: string) {
    if (!editName.trim()) return;
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase.from("teams").update({
      name: editName.trim(),
      slogan: editSlogan.trim() || null,
    }).eq("id", id);
    if (!error) {
      setTeams((prev) => prev.map((t) => t.id === id ? { ...t, name: editName.trim(), slogan: editSlogan.trim() || null } : t));
      setEditId(null);
    }
    setSaving(false);
  }

  function copyLink(token: string, id: string) {
    const url = `${window.location.origin}/my-team/${token}`;
    navigator.clipboard.writeText(url);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  const origin = typeof window !== "undefined" ? window.location.origin : "";

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-black uppercase" style={{ color: "var(--text-primary)" }}>Đội Thi</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          {teams.length} đội · Click vào tên để sửa · Copy link chia sẻ cho team leader
        </p>
      </div>

      {loading ? (
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>Đang tải...</p>
      ) : (
        <div className="space-y-2">
          {teams.map((team) => (
            <div
              key={team.id}
              className="rounded-lg px-4 py-3 flex items-center gap-3"
              style={{ backgroundColor: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}
            >
              {/* Color dot + number */}
              <div
                className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-black"
                style={{
                  backgroundColor: team.color_hex ? `${team.color_hex}22` : "var(--bg-elevated)",
                  border: `2px solid ${team.color_hex || "var(--border-subtle)"}`,
                  color: team.color_hex || "var(--text-primary)",
                }}
              >
                {team.team_number}
              </div>

              {/* Name / edit */}
              <div className="flex-1 min-w-0">
                {editId === team.id ? (
                  <div className="flex flex-col gap-1">
                    <input
                      autoFocus
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="rounded px-2 py-1 text-sm outline-none w-full"
                      style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--neon-primary)", color: "var(--text-primary)" }}
                      onKeyDown={(e) => { if (e.key === "Enter") saveEdit(team.id); if (e.key === "Escape") setEditId(null); }}
                    />
                    <input
                      value={editSlogan}
                      onChange={(e) => setEditSlogan(e.target.value)}
                      placeholder="Slogan (tùy chọn)"
                      className="rounded px-2 py-1 text-xs outline-none w-full"
                      style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}
                    />
                  </div>
                ) : (
                  <div>
                    <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{team.name}</span>
                    {team.slogan && (
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>{team.slogan}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Token link */}
              <div className="hidden sm:block text-[10px] truncate max-w-[180px]" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                /my-team/{team.access_token.slice(0, 8)}...
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0">
                {editId === team.id ? (
                  <>
                    <button
                      onClick={() => saveEdit(team.id)}
                      disabled={saving}
                      className="p-1.5 rounded"
                      style={{ color: "var(--neon-primary)" }}
                      title="Lưu"
                    >
                      <Check size={14} />
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="p-1.5 rounded"
                      style={{ color: "var(--text-muted)" }}
                      title="Hủy"
                    >
                      <X size={14} />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => startEdit(team)}
                    className="p-1.5 rounded"
                    style={{ color: "var(--text-muted)" }}
                    title="Sửa tên"
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                  >
                    <Edit2 size={13} />
                  </button>
                )}

                <button
                  onClick={() => copyLink(team.access_token, team.id)}
                  className="p-1.5 rounded"
                  title="Copy link team leader"
                  style={{ color: copied === team.id ? "var(--neon-primary)" : "var(--text-muted)" }}
                  onMouseEnter={(e) => { if (copied !== team.id) (e.currentTarget.style.color = "var(--text-primary)"); }}
                  onMouseLeave={(e) => { if (copied !== team.id) (e.currentTarget.style.color = "var(--text-muted)"); }}
                >
                  {copied === team.id ? <Check size={13} /> : <Copy size={13} />}
                </button>

                <a
                  href={`${origin}/my-team/${team.access_token}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded"
                  style={{ color: "var(--text-muted)" }}
                  title="Mở link team leader"
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
