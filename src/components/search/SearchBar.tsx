"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, ArrowUpDown, Search } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const { theme } = useTheme();
  const c = theme.colors;
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-3xl border shadow-sm p-6"
      style={{ borderColor: c.border, backgroundColor: c.surface }}
    >
      <div className="relative flex flex-col gap-3">
        <div
          className="flex items-center gap-3 rounded-2xl border px-4 py-3.5"
          style={{ borderColor: c.border, backgroundColor: c.surfaceAlt }}
        >
          <Navigation size={18} style={{ color: c.primary }} />
          <input
            type="text"
            placeholder="Where are you starting from?"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: c.text }}
          />
        </div>

        <button
          onClick={handleSwap}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full border shadow-sm transition hover:scale-105"
          style={{ borderColor: c.border, backgroundColor: c.surface }}
          aria-label="Swap locations"
        >
          <ArrowUpDown size={16} style={{ color: c.primary }} />
        </button>

        <div
          className="flex items-center gap-3 rounded-2xl border px-4 py-3.5"
          style={{ borderColor: c.border, backgroundColor: c.surfaceAlt }}
        >
          <MapPin size={18} style={{ color: c.road }} />
          <input
            type="text"
            placeholder="Where are you going?"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: c.text }}
          />
        </div>
      </div>

      <button
         onClick={() => {
         if (!from || !to) return;

        router.push(
          `/search/results?from=${encodeURIComponent(
            from
         )}&to=${encodeURIComponent(to)}`
       );
     }}
       className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-white transition hover:scale-[1.02]"
       style={{
       backgroundImage: `linear-gradient(to right, ${c.primary}, ${c.primaryLight})`,
     }}
    >
      <Search size={18} />
        Search Route
    </button>
      </motion.div>
    );
 }