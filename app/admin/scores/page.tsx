"use client";

import { useState, useEffect } from "react";
import { ChevronRight, Check, AlertCircle, X, Clock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import NeonButton from "@/components/theme/NeonButton";
import GlowPanel from "@/components/theme/GlowPanel";
import type { Challenge, Team, Station, Database } from "@/lib/supabase/types";

type ScoreInsert = Database['public']['Tables']['scores']['Insert'];

type Step = 1 | 2 | 3;

interface ScoreInput {
  teamId: string;
  teamName: string;
  teamNumber: number;
  value: string;
  error?: string;
}

interface HistoryEntry {
  id: string;
  raw_score: number;
  notes: string | null;
  created_at: string;
  teams: { name: string; team_number: number } | null;
}

export default function AdminScoresPage() {
  const [step, setStep] = useState<Step>(1);
  const [stations, setStations] = useState<Station[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [scores, setScores] = useState<ScoreInput[]>([]);
  const [globalNotes, setGlobalNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: number; failed: number } | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    Promise.all([
      supabase.from("stations").select("*").order("order_index"),
      supabase.from("challenges").select("*, stations(*)").eq("active", true).order("created_at"),
      supabase.from("teams").select("*").order("team_number"),
    ]).then(([{ data: s }, { data: c }, { data: t }]) => {
      setStations(s || []);
      setChallenges((c as Challenge[]) || []);
      setTeams(t || []);
    });
  }, []);

  function selectChallenge(challenge: Challenge) {
    setSelectedChallenge(challenge);
    setScores(
      teams.map((t) => ({
        teamId: t.id,
        teamName: t.name,
        teamNumber: t.team_number,
        value: "",
      }))
    );
    setStep(2);
  }

  function updateScore(teamId: string, value: string) {
    setScores((prev) =>
      prev.map((s) => {
        if (s.teamId !== teamId) return s;
        const num = Number(value);
        let error: string | undefined;
        if (value !== "" && (isNaN(num) || num < 0)) error = "Không hợp lệ";
        if (value !== "" && selectedChallenge && num > selectedChallenge.max_score) {
          error = `Tối đa ${selectedChallenge.max_score}`;
        }
        return { ...s, value, error };
      })
    );
  }

  async function handleSubmit() {
    if (!selectedChallenge) return;
    const toSubmit = scores.filter((s) => s.value !== "" && !s.error);
    if (toSubmit.length === 0) return;

    setSubmitting(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const inserts: ScoreInsert[] = toSubmit.map((s) => ({
      team_id: s.teamId,
      challenge_id: selectedChallenge.id,
      raw_score: Number(s.value),
      notes: globalNotes || null,
      entered_by: user?.id ?? null,
    }));

    // Our hand-written Database type lacks Relationships — cast to bypass the generic constraint
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any).from("scores").insert(inserts).select();
    setSubmitting(false);

    if (error) {
      setSubmitResult({ success: 0, failed: toSubmit.length });
    } else {
      setSubmitResult({ success: data?.length ?? 0, failed: 0 });
      setStep(3);
    }
  }

  async function loadHistory() {
    if (!selectedChallenge) return;
    setHistoryLoading(true);
    setShowHistory(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("scores")
      .select("id, raw_score, notes, created_at, teams(name, team_number)")
      .eq("challenge_id", selectedChallenge.id)
      .order("created_at", { ascending: false })
      .limit(50);
    setHistory((data as HistoryEntry[]) || []);
    setHistoryLoading(false);
  }

  function reset() {
    setStep(1);
    setSelectedChallenge(null);
    setScores([]);
    setGlobalNotes("");
    setSubmitResult(null);
    setShowHistory(false);
    setHistory([]);
  }

  const grouped = stations.reduce<Record<string, { station: Station; challenges: Challenge[] }>>((acc, s) => {
    acc[s.id] = { station: s, challenges: challenges.filter((c) => c.station_id === s.id) };
    return acc;
  }, {});

  return (
    <div className="p-6 max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-black uppercase" style={{ color: "var(--text-primary)" }}>
          Nhập Điểm
        </h1>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mt-3">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  backgroundColor: step >= s ? "var(--neon-primary)" : "var(--bg-elevated)",
                  color: step >= s ? "#050814" : "var(--text-muted)",
                  border: step >= s ? "none" : "1px solid var(--border-subtle)",
                }}
              >
                {step > s ? <Check size={12} /> : s}
              </div>
              <span className="text-xs" style={{ color: step >= s ? "var(--text-primary)" : "var(--text-muted)" }}>
                {s === 1 ? "Chọn thử thách" : s === 2 ? "Nhập điểm" : "Hoàn thành"}
              </span>
              {s < 3 && <ChevronRight size={12} style={{ color: "var(--text-muted)" }} />}
            </div>
          ))}
        </div>
      </div>

      {/* STEP 1: Choose challenge */}
      {step === 1 && (
        <div className="space-y-4">
          {Object.values(grouped).map(({ station, challenges: sc }) => {
            if (sc.length === 0) return null;
            return (
              <div key={station.id}>
                <div
                  className="text-xs uppercase tracking-widest font-bold mb-2 px-1"
                  style={{ color: "var(--neon-primary)" }}
                >
                  {station.name_vi} — {station.name_en}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sc.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => selectChallenge(c)}
                      className="text-left rounded-lg p-4 transition-all"
                      style={{
                        backgroundColor: "var(--bg-surface)",
                        border: "1px solid var(--border-subtle)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--neon-primary)";
                        (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(63,169,255,0.06)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)";
                        (e.currentTarget as HTMLElement).style.backgroundColor = "var(--bg-surface)";
                      }}
                    >
                      <div className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
                        {c.name}
                      </div>
                      {c.description && (
                        <div className="text-xs mb-2 line-clamp-2" style={{ color: "var(--text-muted)" }}>
                          {c.description}
                        </div>
                      )}
                      <div className="flex gap-3 text-[10px]" style={{ color: "var(--text-muted)" }}>
                        <span>Max: <strong style={{ color: "var(--neon-primary)", fontFamily: "var(--font-mono)" }}>{c.max_score}</strong></span>
                        <span>Hệ số: <strong style={{ color: "var(--neon-primary)", fontFamily: "var(--font-mono)" }}>×{c.weight}</strong></span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

          {challenges.length === 0 && (
            <GlowPanel>
              <p className="text-center py-6 text-sm" style={{ color: "var(--text-muted)" }}>
                Chưa có thử thách nào. Thêm thử thách trong mục Thử thách.
              </p>
            </GlowPanel>
          )}
        </div>
      )}

      {/* STEP 2: Enter scores */}
      {step === 2 && selectedChallenge && (
        <div>
          {/* Challenge info */}
          <GlowPanel className="mb-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>
                  Thử thách đã chọn
                </div>
                <div className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                  {selectedChallenge.name}
                </div>
                <div className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                  Max score: {selectedChallenge.max_score} · Hệ số: ×{selectedChallenge.weight}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={loadHistory}
                  className="text-xs px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors"
                  style={{ backgroundColor: "var(--bg-elevated)", color: "var(--text-muted)", border: "1px solid var(--border-subtle)" }}
                >
                  <Clock size={11} /> Lịch sử
                </button>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs px-3 py-1.5 rounded transition-colors"
                  style={{ backgroundColor: "var(--bg-elevated)", color: "var(--text-muted)", border: "1px solid var(--border-subtle)" }}
                >
                  Đổi
                </button>
              </div>
            </div>
          </GlowPanel>

          {/* Score grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            {scores.map((s) => (
              <div
                key={s.teamId}
                className="rounded-lg p-3"
                style={{ backgroundColor: "var(--bg-surface)", border: s.error ? "1px solid var(--accent-red)" : "1px solid var(--border-subtle)" }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                      {s.teamName}
                    </div>
                    <div className="text-[9px]" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                      TEAM {s.teamNumber}
                    </div>
                  </div>
                  {s.error && <AlertCircle size={12} style={{ color: "var(--accent-red)" }} />}
                </div>
                <input
                  type="number"
                  min={0}
                  max={selectedChallenge.max_score}
                  placeholder={`0–${selectedChallenge.max_score}`}
                  value={s.value}
                  onChange={(e) => updateScore(s.teamId, e.target.value)}
                  className="w-full rounded px-3 py-2 text-sm font-bold outline-none text-right"
                  style={{
                    backgroundColor: "var(--bg-elevated)",
                    border: s.error ? "1px solid var(--accent-red)" : "1px solid var(--border-subtle)",
                    color: s.value ? "var(--neon-primary)" : "var(--text-muted)",
                    fontFamily: "var(--font-mono)",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--neon-primary)")}
                  onBlur={(e) => (e.target.style.borderColor = s.error ? "var(--accent-red)" : "var(--border-subtle)")}
                />
                {s.error && (
                  <p className="text-[10px] mt-1" style={{ color: "var(--accent-red)" }}>{s.error}</p>
                )}
              </div>
            ))}
          </div>

          {/* Notes */}
          <div className="mb-6">
            <label className="block text-xs uppercase tracking-wider mb-1.5 font-medium" style={{ color: "var(--text-secondary)" }}>
              Ghi chú (tùy chọn)
            </label>
            <textarea
              value={globalNotes}
              onChange={(e) => setGlobalNotes(e.target.value)}
              placeholder="Thêm ghi chú về lần nhập điểm này..."
              rows={2}
              className="w-full rounded px-4 py-2.5 text-sm outline-none resize-none"
              style={{
                backgroundColor: "var(--bg-elevated)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          {/* Summary + submit */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="text-sm" style={{ color: "var(--text-muted)" }}>
              {scores.filter((s) => s.value !== "" && !s.error).length} / {scores.length} đội có điểm
            </div>
            <div className="flex gap-3">
              <NeonButton variant="ghost" size="sm" onClick={() => setStep(1)}>
                Quay lại
              </NeonButton>
              <NeonButton
                variant="primary"
                size="sm"
                disabled={submitting || scores.filter((s) => s.value !== "" && !s.error).length === 0}
                onClick={handleSubmit}
              >
                {submitting ? "Đang lưu..." : "Xác nhận nhập điểm"}
              </NeonButton>
            </div>
          </div>

          {submitResult && submitResult.failed > 0 && (
            <div
              className="mt-4 rounded px-4 py-3 text-sm"
              style={{ backgroundColor: "rgba(255,51,85,0.1)", border: "1px solid rgba(255,51,85,0.3)", color: "var(--accent-red)" }}
            >
              Tín hiệu bị gián đoạn — {submitResult.failed} lần nhập thất bại. Thử lại.
            </div>
          )}
        </div>
      )}

      {/* STEP 3: Success */}
      {step === 3 && submitResult && (
        <GlowPanel glow="neon" className="text-center py-10">
          <div className="text-4xl mb-4">✅</div>
          <h2 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
            Nhập điểm thành công
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
            {submitResult.success} đội đã được cập nhật điểm cho{" "}
            <strong style={{ color: "var(--neon-primary)" }}>{selectedChallenge?.name}</strong>
          </p>
          <div className="flex gap-3 justify-center">
            <NeonButton variant="secondary" size="sm" onClick={reset}>
              Nhập thêm
            </NeonButton>
            <NeonButton variant="primary" size="sm" onClick={() => window.open("/leaderboard", "_blank")}>
              Xem leaderboard
            </NeonButton>
          </div>
        </GlowPanel>
      )}

      {/* History modal */}
      {showHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(5,8,20,0.8)" }}>
          <div className="w-full max-w-lg max-h-[80vh] flex flex-col rounded-xl overflow-hidden"
            style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-glow)" }}
          >
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
              <h3 className="font-bold" style={{ color: "var(--text-primary)" }}>
                Lịch sử: {selectedChallenge?.name}
              </h3>
              <button onClick={() => setShowHistory(false)} style={{ color: "var(--text-muted)" }}>
                <X size={16} />
              </button>
            </div>
            <div className="overflow-auto flex-1 p-4">
              {historyLoading ? (
                <p className="text-center py-8 text-sm" style={{ color: "var(--text-muted)" }}>
                  Đang tải...
                </p>
              ) : history.length === 0 ? (
                <p className="text-center py-8 text-sm" style={{ color: "var(--text-muted)" }}>
                  Chưa có điểm nào
                </p>
              ) : (
                <div className="space-y-2">
                  {history.map((h) => (
                    <div key={h.id} className="flex items-center gap-3 text-sm py-2" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                      <div className="flex-1">
                        <span style={{ color: "var(--text-primary)" }}>{h.teams?.name ?? "—"}</span>
                        {h.notes && <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{h.notes}</p>}
                      </div>
                      <div className="font-bold tabular-nums" style={{ color: "var(--neon-primary)", fontFamily: "var(--font-mono)" }}>
                        {h.raw_score}
                      </div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {new Date(h.created_at).toLocaleString("vi-VN")}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
