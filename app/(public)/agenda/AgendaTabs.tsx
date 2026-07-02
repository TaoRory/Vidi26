"use client";

import { useState } from "react";
import { Clock, MapPin, Star, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type AccordionSubGroup = { label: string; items: string[] };
type AccordionGroup = {
  title: string;
  time?: string;
  items?: string[];
  sub_groups?: AccordionSubGroup[];
};

type AgendaItem = {
  time?: string;
  title: string;
  title_en?: string;
  location?: string;
  location_en?: string;
  station?: string;
  highlight?: boolean;
  sub?: string[];
  sub_en?: string[];
  type?: "break" | "special" | "default";
  accordion?: AccordionGroup[];
};

const DAY1: AgendaItem[] = [
  {
    time: "07:00 → 10:00",
    title: "Arrival & Check-in",
    location: "Ký túc xá (JA, JB)",
    location_en: "Dormitory (JA, JB)",
    station: "Khởi Hành",
    highlight: true,
    type: "special",
  },
  {
    time: "09:00 → 10:30",
    title: "Parent Session – VinUni Community",
    location: "JA102",
    station: "Đồng Hành",
    type: "default",
  },
  {
    time: "10:00 → 11:30",
    title: "Opening Ceremony",
    location: "Auditorium",
    station: "Khởi Hành",
    highlight: true,
    type: "special",
  },
  {
    time: "12:00 → 14:00",
    title: "Lunchbreak",
    location: "Ký túc xá + Nhà E",
    location_en: "Dormitory + Building E",
    type: "break",
  },
  {
    time: "14:00 → 16:30",
    title: "Teambuilding",
    location: "K-Complex",
    station: "Kích Hoạt",
    highlight: true,
    type: "special",
  },
  {
    time: "16:30 → 18:00",
    title: "Sport activities + Nghỉ ngơi",
    title_en: "Sport activities + Rest time",
    location: "K-Complex",
    type: "break",
  },
  {
    time: "18:00 → 20:00",
    title: "Dinner time - Food Discovery",
    location: "Ocean Park",
    type: "break",
  },
  {
    time: "20:00 → 22:00",
    title: "Scavenger Hunt",
    location: "I, C, A Building · ELAB",
    station: "Kế Tiếp",
    highlight: true,
    type: "special",
  },
  {
    time: "22:00",
    title: "Kết thúc lịch trình ngày 1",
    title_en: "End of Day 1",
    location: "Ký túc xá",
    location_en: "Dormitory",
    type: "break",
  },
];

const DAY2: AgendaItem[] = [
  {
    time: "05:30 → 06:00",
    title: "Morning Run",
    type: "break",
  },
  {
    time: "08:00 → 10:00",
    title: "Breakfast",
    type: "break",
  },
  {
    time: "09:00 → 12:00",
    title: "Demo class + Workshop",
    location: "C Building",
    station: "Tri Thức",
    highlight: true,
    type: "special",
    accordion: [
      {
        title: "WORKSHOP",
        time: "09:00 → 10:00",
        items: [
          "W1 - Academic Life 101 - Prof. Lien Trinh",
          "W2 - Resilience - Ms. Ngo Van Dung",
          "W3 - A Jigsaw of Culture: Explore VinUni International Community - VISA",
          "W4 - The Great Library Hunt - LLR",
        ],
      },
      {
        title: "DEMO CLASS",
        time: "10:00 → 12:00",
        sub_groups: [
          {
            label: "CBM",
            items: [
              'L1 - "Making 100 Million Dong: Starting a Part-Time Business for 2.5 Million Dong" - Marc Kramer',
              'L2 - "Why Do Business Models Matter? The What, How, Who, and Why Framework for Understanding Any Business Model" - Dinh Anh Tuan',
              'L3 - "Global Supply Chain and Strategy" - Nguyen Thu Giang',
            ],
          },
          {
            label: "CAS",
            items: [
              'L4 - "From TikTok Views to AI Media: How Stories Shape Attention, Meaning, and Careers" - Ricardo Braganca',
              'L5 - "Introduction to Economics" - Le Duy Anh',
              'L6 - "From Factory Floors to Artificial Intelligence: Do We Need Psychology at Work?" - Claire Hardy',
            ],
          },
          {
            label: "CECS",
            items: [
              "L7 | 10:00 - 11:00 | General overview of mechanical engineering - Simon Park",
              "L8 | 11:00 - 12:00 | Introduction about computing and the latest AI technologies with live demonstrations - Mo El-Haj",
            ],
          },
          {
            label: "CHS",
            items: [
              "L9 - Cardiopulmonary Resuscitation (CPR) - Nguyễn Thị Thúy Nga",
              "L10 - Anatomy - Trần Lê Đình Duy",
            ],
          },
        ],
      },
    ],
  },
  {
    time: "12:00 → 13:30",
    title: "Lunchbreak",
    location: "Ký túc xá + Nhà E",
    location_en: "Dormitory + Building E",
    type: "break",
  },
  {
    time: "13:30 → 14:30",
    title: "Reflection session",
    station: "Lưu Dấu",
    highlight: true,
    type: "special",
  },
  {
    time: "14:30 → 17:30",
    title: "Tổng Duyệt | Nghỉ Ngơi Tự Do",
    title_en: "Final Rehearsal | Free Break",
    location: "Auditorium + Ký túc xá",
    location_en: "Auditorium + Dormitory",
    type: "break",
  },
  {
    time: "18:30 → 22:00",
    title: "Gala Dinner + Trao thưởng",
    title_en: "Gala Dinner + Awards Ceremony",
    location: "Auditorium",
    station: "Tỏa Sáng",
    highlight: true,
    type: "special",
  },
  {
    time: "22:00",
    title: "Kết thúc lịch trình ngày 2",
    title_en: "End of Day 2",
    location: "Ký túc xá",
    location_en: "Dormitory",
    type: "break",
  },
];

const DAY3: AgendaItem[] = [
  {
    time: "07:00 → 10:00",
    title: "Check-out",
    location: "Ký túc xá",
    location_en: "Dormitory",
    type: "default",
  },
];

const DAYS_DATA = [
  { sublabel: "09.07", color: "var(--neon-primary)",   items: DAY1 },
  { sublabel: "10.07", color: "var(--accent-sunset)",  items: DAY2 },
  { sublabel: "11.07", color: "var(--accent-gold)",    items: DAY3 },
];

const STATION_COLORS: Record<string, string> = {
  "Khởi Hành": "var(--neon-primary)",
  "Đồng Hành": "#a78bfa",
  "Kích Hoạt": "var(--accent-sunset)",
  "Kế Tiếp":   "#f472b6",
  "Tri Thức":  "#60a5fa",
  "Lưu Dấu":  "#34d399",
  "Tỏa Sáng": "var(--accent-gold)",
};

const STATION_EN: Record<string, string> = {
  "Khởi Hành": "Departure",
  "Đồng Hành": "Companion",
  "Kích Hoạt": "Ignition",
  "Kế Tiếp":   "Energy",
  "Tri Thức":  "Discovery",
  "Lưu Dấu":  "Memory",
  "Tỏa Sáng": "Radiance",
};


function AgendaCard({ item, accent }: { item: AgendaItem; accent: string }) {
  const { lang, t } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const isSpecial = item.type === "special";
  const isBreak   = item.type === "break";
  const stationColor = item.station ? STATION_COLORS[item.station] ?? accent : accent;

  const prefix = t.agenda.station_prefix;
  const stationName = item.station
    ? (lang === "en" ? (STATION_EN[item.station] ?? item.station) : item.station)
    : null;
  const displayTitle = stationName
    ? (lang === "en" ? `${stationName} Station` : `${prefix} ${stationName}`)
    : (lang === "en" ? (item.title_en ?? item.title) : item.title);
  const activityTag = item.station
    ? (lang === "en" ? (item.title_en ?? item.title) : item.title)
    : null;
  const subItems = lang === "en" ? (item.sub_en ?? item.sub) : item.sub;

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
              {displayTitle}
            </h3>
            {activityTag && (
              <span
                className="text-[9px] px-2 py-0.5 rounded-full font-medium"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  color: "var(--text-muted)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                {activityTag}
              </span>
            )}
          </div>
          {item.location && (
            <p className="text-xs mb-1.5 flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
              <MapPin size={9} style={{ flexShrink: 0 }} />
              {lang === "en" ? (item.location_en ?? item.location) : item.location}
            </p>
          )}
          {subItems && subItems.length > 0 && (
            <ul className="space-y-1.5 mt-2">
              {subItems.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                  <span style={{ color: stationColor, marginTop: 2, flexShrink: 0 }}>▸</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Accordion sections */}
          {item.accordion && item.accordion.length > 0 && (
            <div className="mt-3 space-y-2" style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: 12 }}>
              {item.accordion.map((group, gi) => {
                const isOpen = openIdx === gi;
                return (
                  <div key={gi}>
                    <button
                      onClick={() => setOpenIdx(isOpen ? null : gi)}
                      className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all"
                      style={{
                        backgroundColor: isOpen ? stationColor + "18" : "rgba(255,255,255,0.04)",
                        color: isOpen ? stationColor : "var(--text-secondary)",
                        border: `1px solid ${isOpen ? stationColor + "55" : "var(--border-subtle)"}`,
                      }}
                    >
                      <span className="flex items-center gap-2">
                        <span className="uppercase tracking-wider">{group.title}</span>
                        {group.time && (
                          <span className="font-mono text-[9px]" style={{ color: "var(--text-muted)" }}>
                            {group.time}
                          </span>
                        )}
                      </span>
                      <ChevronDown
                        size={13}
                        style={{
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.2s",
                          flexShrink: 0,
                        }}
                      />
                    </button>

                    {isOpen && (
                      <div className="mt-2 pl-3 space-y-3">
                        {/* Flat items */}
                        {group.items && group.items.length > 0 && (
                          <ul className="space-y-1.5">
                            {group.items.map((it, ii) => (
                              <li key={ii} className="flex items-start gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                                <span style={{ color: stationColor, marginTop: 2, flexShrink: 0 }}>▸</span>
                                <span>{it}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Sub-groups (colleges) */}
                        {group.sub_groups && group.sub_groups.map((sg, si) => (
                          <div key={si}>
                            <div
                              className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded inline-block mb-1.5"
                              style={{ backgroundColor: stationColor + "20", color: stationColor }}
                            >
                              {sg.label}
                            </div>
                            <ul className="space-y-1.5">
                              {sg.items.map((it, ii) => (
                                <li key={ii} className="flex items-start gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                                  <span style={{ color: stationColor, marginTop: 2, flexShrink: 0 }}>▸</span>
                                  <span>{it}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AgendaTabs() {
  const [activeDay, setActiveDay] = useState(0);
  const { t } = useLanguage();
  const DAYS = DAYS_DATA.map((d, i) => ({ ...d, label: t.agenda.day_labels[i] }));
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
            {t.agenda.main_activities}
          </div>
          <div className="text-xs" style={{ color: "var(--text-muted)" }}>
            {day.label} · {day.sublabel}.2026 · VIDI26 EXPRESS
          </div>
        </div>
      </div>
    </div>
  );
}
