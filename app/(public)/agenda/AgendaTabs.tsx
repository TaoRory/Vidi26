"use client";

import { useState } from "react";
import { Clock, MapPin, Star } from "lucide-react";

type AgendaItem = {
  time?: string;
  title: string;
  description?: string;
  station?: string;
  highlight?: boolean;
  sub?: string[];
  type?: "break" | "special" | "default";
};

const DAY1: AgendaItem[] = [
  {
    time: "07:00 → 10:00",
    title: "Trạm Soát Vé",
    station: "Khởi Hành",
    description: "Điểm check-in mở đầu hành trình — nhận boarding pass, làm quen với cohort và chính thức \"lên chuyến tàu\" VIDI26.",
    type: "default",
  },
  {
    time: "09:00 → 10:30",
    title: "Parent Session",
    description: "Chương trình dành riêng cho phụ huynh song song với hoạt động đón tiếp.",
    type: "break",
  },
  {
    time: "10:00 → 11:30",
    title: "Trạm Khởi Hành — Opening Ceremony",
    station: "Khởi Hành",
    description: "Mở đầu chương trình, truyền tải tinh thần chào đón và giúp học sinh hiểu bối cảnh, mục tiêu của VinUni Discovery.",
    highlight: true,
    type: "special",
  },
  {
    time: "Cả ngày",
    title: "Nhiệm Vụ Lưu Dấu — Vlog Challenge",
    station: "Lưu Dấu",
    description: "Khuyến khích học sinh quan sát, ghi lại trải nghiệm và sáng tạo nội dung theo góc nhìn cá nhân/nhóm — tư liệu cho Gala Dinner.",
    type: "default",
  },
  {
    time: "14:00 → 17:00",
    title: "Trạm Bứt Phá — Team Building",
    station: "Bứt Phá",
    description: "Tăng tinh thần đồng đội giữa các thành viên, tạo năng lượng cho ngày đầu tiên thông qua các thử thách có tính tương tác.",
    highlight: true,
    type: "special",
  },
  {
    time: "16:00 → 18:00",
    title: "Trạm Năng Lượng",
    description: "Pool activities + Nghỉ ngơi — nạp lại năng lượng sau buổi team building.",
    type: "break",
  },
  {
    time: "20:00 → 22:00",
    title: "Scavenger Hunt — Next Station",
    description: "Khép lại ngày đầu bằng không gian nhẹ nhàng để học sinh thư giãn, giao lưu, chia sẻ cảm xúc và tăng sự gắn kết.",
    type: "special",
  },
];

const DAY2: AgendaItem[] = [
  {
    time: "05:30 → 07:00",
    title: "Trạm Nhiên Liệu — Morning Run",
    description: "Chạy bộ buổi sáng ra bờ sông (tuỳ chọn) — hoạt động khởi động ngày mới cho các bạn muốn tham gia.",
    type: "break",
  },
  {
    time: "07:00 → 08:30",
    title: "Ăn Sáng",
    type: "break",
  },
  {
    time: "08:30 → 11:30",
    title: "Trạm Tri Thức — Demo Class & Workshop",
    station: "Tri Thức",
    description: "Chuỗi 4 workshop giúp học sinh chuẩn bị tâm thế cho đời sống đại học.",
    highlight: true,
    type: "special",
    sub: [
      "Mental Health & Preparing for University Life — Chuẩn bị sức khoẻ tinh thần và tâm thế khi bước vào đại học",
      "Financial Management in University — Hướng dẫn quản lý tài chính cá nhân trong môi trường đại học",
      "IKIGAI — Giúp học sinh khám phá bản thân, sở thích và định hướng cá nhân",
      "Entrepreneurship — Khơi gợi tư duy sáng tạo, tinh thần chủ động và khởi nghiệp",
    ],
  },
  {
    time: "12:00",
    title: "Deadline Nộp Vlog",
    station: "Lưu Dấu",
    description: "Các đội gửi video vlog ghi lại hành trình trước 12:00 ngày 2.",
    highlight: true,
    type: "default",
  },
  {
    time: "13:30 → 18:00",
    title: "Reflection & Final Preparation",
    station: "Lưu Dấu",
    description: "Tạo không gian để học sinh nhìn lại hành trình, hoàn thiện sản phẩm đội và chuẩn bị cho Gala Dinner.",
    type: "default",
    sub: [
      "Reflection Session — Học sinh viết cảm nhận lên \"cuống vé\"",
      "Hoạt động tập thể (pending) — Hoạt động bổ trợ trước Gala Dinner",
      "Trao LEXCE buổi chiều",
    ],
  },
  {
    time: "18:00 → 22:00",
    title: "Gala Dinner — Tỏa Sáng",
    station: "Tỏa Sáng",
    description: "Tổng kết hành trình, ghi nhận sự tham gia của các đội và tạo điểm nhấn cảm xúc cho chương trình.",
    highlight: true,
    type: "special",
    sub: [
      "Ăn tối và giao lưu",
      "Trình chiếu vlog của các đội",
      "Chấm điểm và công bố kết quả thử thách",
      "Trao thưởng — các đội/cá nhân nổi bật",
      "Tổng kết hành trình 2 ngày tại VinUni Discovery",
    ],
  },
];

const DAY3: AgendaItem[] = [
  {
    time: "05:30 → 07:00",
    title: "Trạm Nhiên Liệu — Morning Run",
    description: "Buổi chạy bộ cuối cùng — tuỳ chọn.",
    type: "break",
  },
  {
    time: "07:00 → 08:30",
    title: "Ăn Sáng",
    type: "break",
  },
  {
    time: "09:00 → 11:00",
    title: "Trạm Tiếp Bước — Next Step",
    station: "Tiếp Bước",
    description: "Hành trình mới bắt đầu tại VinUni — học sinh nhận thông tin về năm học đầu tiên và chia tay VIDI26.",
    highlight: true,
    type: "special",
  },
  {
    time: "11:00 → 12:00",
    title: "Check-out & Chia Tay",
    description: "Kết thúc chương trình, học sinh check-out và về nhà.",
    type: "default",
  },
];

const DAYS = [
  { label: "Ngày 1", sublabel: "17.06", color: "var(--neon-primary)", items: DAY1 },
  { label: "Ngày 2", sublabel: "18.06", color: "var(--accent-sunset)", items: DAY2 },
  { label: "Ngày 3", sublabel: "19.06", color: "var(--accent-gold)", items: DAY3 },
];

const STATION_COLORS: Record<string, string> = {
  "Khởi Hành":  "var(--neon-primary)",
  "Khám Phá":   "var(--neon-bright)",
  "Tri Thức":   "#a78bfa",
  "Bứt Phá":    "var(--accent-sunset)",
  "Lưu Dấu":   "#34d399",
  "Tỏa Sáng":  "var(--accent-gold)",
  "Tiếp Bước": "#f472b6",
};

function AgendaCard({ item, accent }: { item: AgendaItem; accent: string }) {
  const isSpecial = item.type === "special";
  const isBreak   = item.type === "break";
  const stationColor = item.station ? STATION_COLORS[item.station] ?? accent : accent;

  return (
    <div
      className="rounded-xl p-4 sm:p-5 transition-all"
      style={{
        backgroundColor: isSpecial ? "var(--bg-elevated)" : "var(--bg-surface)",
        border: `1px solid ${isSpecial ? stationColor + "55" : "var(--border-subtle)"}`,
        opacity: isBreak ? 0.7 : 1,
        boxShadow: isSpecial ? `0 0 16px ${stationColor}18` : "none",
      }}
    >
      <div className="flex items-start gap-3">
        {/* Time pill */}
        <div className="shrink-0 mt-0.5">
          {item.time ? (
            <div
              className="flex items-center gap-1 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: isSpecial ? stationColor + "22" : "rgba(63,169,255,0.08)",
                color: isSpecial ? stationColor : "var(--text-muted)",
                border: `1px solid ${isSpecial ? stationColor + "44" : "var(--border-subtle)"}`,
                whiteSpace: "nowrap",
              }}
            >
              <Clock size={9} />
              {item.time}
            </div>
          ) : (
            <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: stationColor, marginTop: 8 }} />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3
              className="font-bold text-sm sm:text-base"
              style={{ color: isSpecial ? "var(--text-primary)" : "var(--text-secondary)" }}
            >
              {item.highlight && <Star size={12} className="inline mr-1.5 mb-0.5" style={{ color: stationColor }} />}
              {item.title}
            </h3>
            {item.station && (
              <span
                className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full font-medium"
                style={{
                  backgroundColor: stationColor + "18",
                  color: stationColor,
                  border: `1px solid ${stationColor}44`,
                }}
              >
                <MapPin size={7} className="inline mr-0.5" />
                {item.station}
              </span>
            )}
          </div>
          {item.description && (
            <p className="text-xs leading-relaxed mb-2" style={{ color: "var(--text-muted)" }}>
              {item.description}
            </p>
          )}
          {item.sub && item.sub.length > 0 && (
            <ul className="space-y-1.5 mt-2">
              {item.sub.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                  <span style={{ color: stationColor, marginTop: 2, flexShrink: 0 }}>▸</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AgendaTabs() {
  const [activeDay, setActiveDay] = useState(0);
  const day = DAYS[activeDay];

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-2 mb-8">
        {DAYS.map((d, i) => {
          const active = i === activeDay;
          return (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              className="flex flex-col items-center px-5 py-3 rounded-xl transition-all text-sm font-bold uppercase tracking-wider"
              style={{
                backgroundColor: active ? d.color + "22" : "var(--bg-surface)",
                border: `1px solid ${active ? d.color : "var(--border-subtle)"}`,
                color: active ? d.color : "var(--text-muted)",
                boxShadow: active ? `0 0 16px ${d.color}33` : "none",
              }}
            >
              {d.label}
              <span className="text-[9px] font-mono font-normal mt-0.5" style={{ opacity: 0.7 }}>{d.sublabel}.2026</span>
            </button>
          );
        })}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical rail */}
        <div
          className="absolute left-0 top-0 bottom-0 w-px hidden sm:block"
          style={{ background: `linear-gradient(to bottom, ${day.color}88, transparent)`, left: 12 }}
        />

        <div className="space-y-3 sm:pl-8">
          {day.items.map((item, i) => (
            <AgendaCard key={i} item={item} accent={day.color} />
          ))}
        </div>
      </div>

      {/* Day summary badge */}
      <div
        className="mt-8 rounded-xl px-5 py-4 flex items-center gap-3"
        style={{ backgroundColor: "var(--bg-surface)", border: `1px solid ${day.color}33` }}
      >
        <div className="text-2xl font-black" style={{ color: day.color, fontFamily: "var(--font-mono)" }}>
          {day.items.filter(it => it.type === "special").length}
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: day.color }}>
            Hoạt động chính
          </div>
          <div className="text-xs" style={{ color: "var(--text-muted)" }}>
            {day.label} · {day.sublabel}.2026 · VIDI26 EXPRESS
          </div>
        </div>
      </div>
    </div>
  );
}
