"use client";

import { motion } from "framer-motion";
import { Clock, ChevronRight } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const recentSearches = [
  { from: "Yaba", to: "Lekki", time: "55 min", fare: "₦800 – ₦1,000" },
  { from: "Ikeja", to: "Victoria Island", time: "1h 20min", fare: "₦1,200 – ₦1,500" },
  { from: "Surulere", to: "Ajah", time: "1h 45min", fare: "₦1,000 – ₦1,300" },
];

export default function RecentSearches() {
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-6"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold" style={{ color: c.text }}>
          Recent Searches
        </h3>
        <button className="text-xs font-medium" style={{ color: c.primary }}>
          See all
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {recentSearches.map((search, i) => (
          <button
            key={i}
            className="flex items-center justify-between rounded-2xl border px-4 py-3.5 transition hover:shadow-sm"
            style={{ borderColor: c.border, backgroundColor: c.surface }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: c.surfaceAlt }}>
                <Clock size={16} style={{ color: c.textMuted }} />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium" style={{ color: c.text }}>
                  {search.from} → {search.to}
                </p>
                <p className="text-xs" style={{ color: c.textMuted }}>
                  {search.time} • {search.fare}
                </p>
              </div>
            </div>
            <ChevronRight size={18} style={{ color: c.textMuted }} />
          </button>
        ))}
      </div>
    </motion.div>
  );
}