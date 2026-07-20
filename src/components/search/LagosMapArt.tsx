"use client";

import { useTheme } from "@/contexts/ThemeContext";

// An original abstract illustration — not a real map — built from EkoLens's
// own visual language (the lagoon curve + zigzag road motif from the brand).
export default function LagosMapArt() {
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <svg
      viewBox="0 0 600 260"
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Lagoon curve */}
      <path
        d="M -20 180 C 100 140, 180 220, 300 170 S 480 100, 620 150"
        stroke={c.primary}
        strokeOpacity="0.15"
        strokeWidth="60"
        fill="none"
        strokeLinecap="round"
      />

      {/* Zigzag road */}
      <path
        d="M 30 60 L 130 110 L 210 55 L 300 115 L 390 50 L 480 105 L 570 60"
        stroke={c.road}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 30 60 L 130 110 L 210 55 L 300 115 L 390 50 L 480 105 L 570 60"
        stroke={c.road}
        strokeWidth="4"
        strokeDasharray="2 10"
        fill="none"
        strokeLinecap="round"
        strokeOpacity="0.5"
      />

      {/* Location pins along the road */}
      {[
        { x: 130, y: 110 },
        { x: 300, y: 115 },
        { x: 480, y: 105 },
      ].map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="10" fill={c.surface} stroke={c.primary} strokeWidth="3" />
          <circle cx={p.x} cy={p.y} r="3.5" fill={c.primary} />
        </g>
      ))}

      {/* Destination pin, distinct */}
      <g>
        <circle cx="570" cy="60" r="12" fill={c.surface} stroke={c.accent} strokeWidth="3" />
        <circle cx="570" cy="60" r="4.5" fill={c.accent} />
      </g>
    </svg>
  );
}