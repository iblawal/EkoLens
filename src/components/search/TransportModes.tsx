"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bus, Car, Ship, Footprints } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const modes = [
  { icon: Bus, label: "Public Transport", key: "public" },
  { icon: Car, label: "EkoRide (Ride)", key: "ride" },
  { icon: Ship, label: "Ferry", key: "ferry" },
  { icon: Footprints, label: "Walk", key: "walk" },
];

export default function TransportModes() {
  const { theme } = useTheme();
  const c = theme.colors;
  const [selected, setSelected] = useState("public");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mt-6"
    >
      <h3 className="text-sm font-semibold mb-3" style={{ color: c.text }}>
        Find the best way to get there
      </h3>
      <div className="grid grid-cols-4 gap-3">
        {modes.map((mode) => {
          const isActive = selected === mode.key;
          return (
            <button
              key={mode.key}
              onClick={() => setSelected(mode.key)}
              className="flex flex-col items-center gap-2 rounded-2xl px-2 py-4 text-center border transition"
              style={{
                borderColor: isActive ? c.primary : c.border,
                backgroundColor: isActive ? c.surfaceAlt : c.surface,
              }}
            >
              <mode.icon size={22} style={{ color: isActive ? c.primary : c.textMuted }} />
              <span
                className="text-[11px] font-medium leading-tight"
                style={{ color: isActive ? c.primary : c.textMuted }}
              >
                {mode.label}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}