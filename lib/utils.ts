import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatScore(score: number): string {
  return score.toLocaleString("vi-VN", { minimumFractionDigits: 0, maximumFractionDigits: 1 });
}

export function getRankSuffix(rank: number): string {
  if (rank === 1) return "st";
  if (rank === 2) return "nd";
  if (rank === 3) return "rd";
  return "th";
}

export function getTeamGradient(colorHex: string | null): string {
  if (!colorHex) return "from-neon-deep to-bg-elevated";
  return `from-[${colorHex}33] to-bg-elevated`;
}

export function formatRelativeTime(date: string | null): string {
  if (!date) return "—";
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "vừa xong";
  if (minutes < 60) return `${minutes} phút trước`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} giờ trước`;
  return new Date(date).toLocaleDateString("vi-VN");
}
