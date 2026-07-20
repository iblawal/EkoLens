"use client";

import { useSearchParams } from "next/navigation";
import { ArrowLeft, Clock3, Wallet, Bus, Car, Train, Footprints, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";

const transportIcons: Record<string, any> = {
  Danfo: Bus,
  Keke: Car,
  Korope: Car,
  BRT: Train,
  EkoRide: Car,
  Ride: Car,
  Taxi: Car,
  Walk: Footprints,
};

const badgeColorKey: Record<string, string> = {
  "Cheapest Route": "road",
  "Fastest Route": "accent",
  "Safest Route": "success",
};

export default function SearchResultsPage() {
  const params = useSearchParams();
  const { theme } = useTheme();
  const c = theme.colors;

  const fromLabel = params.get("fromLabel") || "Current location";
  const toLabel = params.get("toLabel") || "Destination";

  // TODO: replace with a real call to /journey/plan using fromLat/fromLng/toLocationId
  const routes = [
    { id: 1, title: "Cheapest Route", fare: 1200, duration: "1hr 20mins", changes: 2, traffic: "Moderate", transport: ["Danfo", "Keke"] },
    { id: 2, title: "Fastest Route", fare: 6500, duration: "35 mins", changes: 0, traffic: "Light", transport: ["EkoRide"] },
    { id: 3, title: "Safest Route", fare: 2200, duration: "1hr", changes: 1, traffic: "Moderate", transport: ["BRT", "Taxi"] },
  ];

  const cheapest = routes.reduce((a, b) => (a.fare < b.fare ? a : b));
  const fastest = routes.reduce((a, b) =>
    parseInt(a.duration) < parseInt(b.duration) ? a : b
  );

  return (
    <main className="min-h-screen" style={{ backgroundColor: c.background }}>
      {/* Compact header, no big hero treatment */}
      <div className="border-b" style={{ borderColor: c.border, backgroundColor: c.surface }}>
        <div className="max-w-2xl mx-auto px-5 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm mb-3" style={{ color: c.textMuted }}>
            <ArrowLeft size={15} />
            Edit search
          </Link>
          <p className="text-[15px] font-semibold" style={{ color: c.text }}>
            {fromLabel} <span style={{ color: c.textMuted, fontWeight: 400 }}>to</span> {toLabel}
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5">
        {/* Quick stats strip, Citymapper walk/cycle/cab style */}
        <div className="grid grid-cols-2 divide-x mt-4 rounded-2xl border overflow-hidden" style={{ borderColor: c.border, backgroundColor: c.surface }}>
          <div className="px-5 py-4 text-center">
            <p className="text-lg font-bold" style={{ color: c.text, fontFamily: "var(--font-mono)" }}>
              {fastest.duration}
            </p>
            <p className="text-xs mt-0.5" style={{ color: c.textMuted }}>fastest</p>
          </div>
          <div className="px-5 py-4 text-center">
            <p className="text-lg font-bold" style={{ color: c.text, fontFamily: "var(--font-mono)" }}>
              ₦{cheapest.fare.toLocaleString()}
            </p>
            <p className="text-xs mt-0.5" style={{ color: c.textMuted }}>cheapest</p>
          </div>
        </div>

        {/* Compact list rows, not big cards */}
        <div className="mt-5 rounded-2xl border divide-y overflow-hidden" style={{ borderColor: c.border, backgroundColor: c.surface }}>
          {routes.map((route) => {
            const accentColor = (c as any)[badgeColorKey[route.title]] ?? c.primary;
            return (
              <Link
                key={route.id}
                href={`/journey/${route.id}`}
                className="flex items-center gap-4 px-5 py-4 hover:opacity-80 transition"
              >
                {/* Transport icon stack */}
                <div className="flex -space-x-2 shrink-0">
                  {route.transport.slice(0, 2).map((item, i) => {
                    const Icon = transportIcons[item] ?? Bus;
                    return (
                      <div
                        key={i}
                        className="h-9 w-9 rounded-full border-2 flex items-center justify-center"
                        style={{ borderColor: c.surface, backgroundColor: c.surfaceAlt }}
                      >
                        <Icon size={15} style={{ color: c.text }} />
                      </div>
                    );
                  })}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: `${accentColor}18`, color: accentColor }}
                    >
                      {route.title.replace(" Route", "")}
                    </span>
                    <span className="text-xs" style={{ color: c.textMuted }}>
                      {route.changes === 0 ? "Direct" : `${route.changes} changes`}
                    </span>
                  </div>
                  <p className="text-sm mt-1" style={{ color: c.textMuted }}>
                    {route.transport.join(" → ")}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-sm font-bold" style={{ color: c.text, fontFamily: "var(--font-mono)" }}>
                    {route.duration}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: c.textMuted }}>
                    ₦{route.fare.toLocaleString()}
                  </p>
                </div>

                <ChevronRight size={16} style={{ color: c.textMuted }} />
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}