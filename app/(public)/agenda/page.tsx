import AgendaHeader from "./AgendaHeader";
import AgendaTabs from "./AgendaTabs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hành Trình / Timeline — VIDI26",
  description: "Lịch trình 3 ngày 2 đêm của chương trình VinUni Discovery 2026",
};

export default function AgendaPage() {
  return (
    <div>
      <AgendaHeader />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
        <AgendaTabs />
      </div>
    </div>
  );
}
