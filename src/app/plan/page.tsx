"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowLeft } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import SearchBar from "@/components/search/SearchBar";

// Leaflet needs the browser window — must never render on the server
const LagosPreviewMap = dynamic(
  () => import("@/components/map/LagospreviewMap"),
  { ssr: false }
);

export default function PlanPage() {
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <main className="min-h-screen" style={{ backgroundColor: c.background }}>
      <div className="px-6 pt-6">
        <Link
          href="/"
          className="inline-flex items-center justify-center h-9 w-9 rounded-full shadow-sm"
          style={{ backgroundColor: c.surface, border: `1px solid ${c.border}` }}
        >
          <ArrowLeft size={16} style={{ color: c.text }} />
        </Link>
      </div>

      <div className="flex flex-col items-center px-6 py-10">
        <div className="w-full max-w-md">
          <h1
            className="text-2xl font-bold text-center mb-6"
            style={{ color: c.text, fontFamily: "var(--font-display)" }}
          >
            Where are you headed?
          </h1>

          <div className="mb-6">
            <LagosPreviewMap />
          </div>

          <SearchBar />
        </div>
      </div>
    </main>
  );
}