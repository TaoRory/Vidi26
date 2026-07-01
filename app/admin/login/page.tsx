"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Train, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import NeonButton from "@/components/theme/NeonButton";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/admin/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), 10000)
    );
    const authCall = supabase.auth.signInWithPassword({ email, password });
    const result = await Promise.race([authCall, timeout]).catch((err) => {
      if (err.message === "timeout") return { error: { message: "timeout" } };
      return { error: err };
    }) as Awaited<typeof authCall>;

    const authError = result.error;
    if (authError) {
      setError(
        (authError as { message: string }).message === "timeout"
          ? "Kết nối máy chủ hết thời gian — thử lại sau ít phút."
          : "Tín hiệu bị gián đoạn — kiểm tra lại email và mật khẩu."
      );
      setLoading(false);
      return;
    }

    router.push(redirectTo);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "var(--bg-deep)" }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="inline-flex w-14 h-14 rounded-2xl items-center justify-center mb-4"
            style={{
              background: "linear-gradient(135deg, var(--neon-primary), var(--neon-deep))",
              boxShadow: "0 0 30px rgba(63,169,255,0.4)",
            }}
          >
            <Train size={24} className="text-white" />
          </div>
          <h1
            className="text-2xl font-black uppercase tracking-wider"
            style={{ color: "var(--text-primary)" }}
          >
            VIDI<span style={{ color: "var(--accent-gold)" }}>26</span>
          </h1>
          <p className="text-xs uppercase tracking-widest mt-1" style={{ color: "var(--text-muted)" }}>
            Admin · Control Station
          </p>
        </div>

        {/* Form */}
        <div
          className="rounded-xl p-6"
          style={{
            backgroundColor: "var(--bg-surface)",
            border: "1px solid var(--border-glow)",
            boxShadow: "0 0 30px rgba(63,169,255,0.08)",
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="block text-xs uppercase tracking-wider mb-1.5 font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@vinuni.edu.vn"
                className="w-full rounded px-4 py-2.5 text-sm outline-none transition-all"
                style={{
                  backgroundColor: "var(--bg-elevated)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-primary)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--neon-primary)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border-subtle)")}
              />
            </div>

            <div>
              <label
                className="block text-xs uppercase tracking-wider mb-1.5 font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded px-4 py-2.5 text-sm outline-none transition-all pr-10"
                  style={{
                    backgroundColor: "var(--bg-elevated)",
                    border: "1px solid var(--border-subtle)",
                    color: "var(--text-primary)",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--neon-primary)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border-subtle)")}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--text-muted)" }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {error && (
              <div
                className="rounded px-4 py-2.5 text-sm"
                style={{ backgroundColor: "rgba(255,51,85,0.1)", border: "1px solid rgba(255,51,85,0.3)", color: "var(--accent-red)" }}
              >
                {error}
              </div>
            )}

            <NeonButton
              type="submit"
              variant="primary"
              size="md"
              disabled={loading}
              className="w-full justify-center"
            >
              {loading ? "Đang đồng bộ tín hiệu..." : "Đăng nhập"}
            </NeonButton>
          </form>
        </div>

        <p className="text-center text-xs mt-4" style={{ color: "var(--text-muted)" }}>
          Chỉ dành cho quản trò VIDI26
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--bg-deep)" }}>
        <div style={{ color: "var(--text-muted)" }}>Đang khởi động tàu...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
