"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { Bus, CarTaxiFront, Car, Train, Footprints, MapPin, Flag, Clock3, ShieldCheck, ArrowLeft, ChevronDown } from "lucide-react";

const RouteMap = dynamic(() => import("@/components/map/RouteMap"), { ssr: false });

const transportIcons: Record<string, any> = {
  DANFO: Bus,
  KEKE: CarTaxiFront,
  KOROPE: Car,
  BRT: Train,
  RIDE: Car,
  WALKING: Footprints,
};

const transportVerb: Record<string, string> = {
  DANFO: "Board a danfo",
  KEKE: "Enter a keke",
  KOROPE: "Board a korope",
  BRT: "Board the BRT",
  RIDE: "Get a ride",
  WALKING: "Walk",
};

function formatDuration(seconds: number) {
  const mins = Math.round(seconds / 60);
  if (mins < 60) return `${mins} mins`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}hr${m > 0 ? ` ${m}mins` : ""}`;
}

export default function JourneyPage() {
  const { theme } = useTheme();
  const c = theme.colors;

  const [plan, setPlan] = useState<any>(null);
  const [option, setOption] = useState<any>(null);
  const [showRoadRoute, setShowRoadRoute] = useState(false);

  useEffect(() => {
    const storedPlan = sessionStorage.getItem("ekolens:lastPlan");
    const storedOption = sessionStorage.getItem("ekolens:selectedOption");
    if (storedPlan) setPlan(JSON.parse(storedPlan));
    if (storedOption) setOption(JSON.parse(storedOption));
  }, []);

  if (!plan || !option) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center" style={{ backgroundColor: c.background }}>
        <p className="text-sm" style={{ color: c.textMuted }}>
          No journey found. Plan a trip first.
        </p>
        <Link href="/plan" className="mt-4 text-sm font-semibold" style={{ color: c.primary }}>
          Plan a journey
        </Link>
      </main>
    );
  }

  const { route, journeyGuide } = plan;
  const Icon = transportIcons[option.transportType] ?? Bus;
  const verb = transportVerb[option.transportType] ?? "Board your vehicle";

  return (
    <main className="min-h-screen pb-24" style={{ backgroundColor: c.background }}>
      <div className="relative">
        <RouteMap
          key={`${journeyGuide.boardingFrom.name}-${journeyGuide.alightingAt.name}`}
          geometry={route.geometry}
          fromLabel={journeyGuide.boardingFrom.name}
          toLabel={journeyGuide.alightingAt.name}
          heightClass="h-64"
        />
        <Link
          href="/search/results"
          className="absolute top-6 left-6 h-9 w-9 rounded-full flex items-center justify-center shadow-md"
          style={{ backgroundColor: c.surface }}
        >
          <ArrowLeft size={16} style={{ color: c.text }} />
        </Link>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-6 relative z-10">
        {/* Trip summary */}
        <div className="rounded-3xl border p-5 shadow-lg" style={{ borderColor: c.border, backgroundColor: c.surface }}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold" style={{ color: c.text, fontFamily: "var(--font-display)" }}>
                {journeyGuide.boardingFrom.name} <span style={{ color: c.road }}>→</span> {journeyGuide.alightingAt.name}
              </h1>
              <div className="mt-2 flex items-center gap-2">
                <Icon size={14} style={{ color: c.textMuted }} />
                <span className="text-xs font-medium" style={{ color: c.textMuted }}>
                  {option.transportType.charAt(0) + option.transportType.slice(1).toLowerCase()}
                </span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xl font-bold" style={{ color: c.text, fontFamily: "var(--font-mono)" }}>
                ₦{option.estimatedFare.min.toLocaleString()}–{option.estimatedFare.max.toLocaleString()}
              </p>
              <p className="text-xs mt-0.5" style={{ color: c.textMuted }}>estimated fare</p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 pt-4 border-t" style={{ borderColor: c.border }}>
            <Clock3 size={15} style={{ color: c.textMuted }} />
            <span className="text-sm font-medium" style={{ color: c.text }}>
              About {formatDuration(route.durationSeconds)}
            </span>
          </div>
        </div>

        {/* THE REAL NARRATIVE — the primary content, in transit voice */}
        <div className="mt-5 rounded-3xl border p-6" style={{ borderColor: c.border, backgroundColor: c.surface }}>
          <p className="text-xs font-semibold uppercase tracking-wide mb-5" style={{ color: c.textMuted }}>
            How to get there
          </p>

          <div className="relative">
            <div className="absolute left-[19px] top-2 bottom-2 w-px" style={{ backgroundColor: c.border }} />

            <div className="space-y-6">
              {/* Step 1: head to the boarding point */}
              <div className="relative flex items-start gap-4">
                <div className="relative z-10 h-10 w-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: c.primary }}>
                  <MapPin size={17} className="text-white" />
                </div>
                <div className="pt-2">
                  <p className="text-sm font-semibold" style={{ color: c.text }}>
                    Head to {journeyGuide.boardingFrom.name}
                  </p>
                  {journeyGuide.boardingFrom.nearbyLandmarks?.length > 0 && (
                    <p className="text-xs mt-1" style={{ color: c.textMuted }}>
                      📍 Near {journeyGuide.boardingFrom.nearbyLandmarks.join(", ")}
                    </p>
                  )}
                </div>
              </div>

              {/* Step 2: board */}
              <div className="relative flex items-start gap-4">
                <div
                  className="relative z-10 h-10 w-10 rounded-full flex items-center justify-center shrink-0 border-2"
                  style={{ backgroundColor: c.surface, borderColor: c.border }}
                >
                  <Icon size={16} style={{ color: c.text }} />
                </div>
                <div className="pt-2">
                  <p className="text-sm font-semibold" style={{ color: c.text }}>
                    {verb} heading to {journeyGuide.alightingAt.name}
                  </p>
                  <p className="text-xs mt-1" style={{ color: c.textMuted }}>
                    Fare: ₦{option.estimatedFare.min.toLocaleString()}–{option.estimatedFare.max.toLocaleString()}
                    {option.isRushHourPrice ? " (rush hour)" : ""}
                  </p>

                  {/* Real crowdsourced description, if we have one — the authentic voice */}
                  {option.routeDescription && (
                    <div
                      className="mt-3 rounded-2xl px-4 py-3"
                      style={{ backgroundColor: c.surfaceAlt }}
                    >
                      <p className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: c.primary }}>
                        From a Lagos commuter
                      </p>
                      <p className="text-sm" style={{ color: c.text }}>
                        {option.routeDescription}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Step 3: alight */}
              <div className="relative flex items-start gap-4">
                <div className="relative z-10 h-10 w-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: c.road }}>
                  <Flag size={16} className="text-white" />
                </div>
                <div className="pt-2">
                  <p className="text-sm font-semibold" style={{ color: c.text }}>
                    Alight at {journeyGuide.alightingAt.name}
                  </p>
                  {journeyGuide.alightingAt.nearbyLandmarks?.length > 0 && (
                    <p className="text-xs mt-1" style={{ color: c.textMuted }}>
                      📍 Near {journeyGuide.alightingAt.nearbyLandmarks.join(", ")}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Raw driving directions — demoted, optional, for road reference only */}
        <div className="mt-5 rounded-3xl border overflow-hidden" style={{ borderColor: c.border, backgroundColor: c.surface }}>
          <button
            onClick={() => setShowRoadRoute(!showRoadRoute)}
            className="w-full flex items-center justify-between px-6 py-4"
          >
            <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: c.textMuted }}>
              Road route reference
            </span>
            <ChevronDown
              size={16}
              style={{ color: c.textMuted, transform: showRoadRoute ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
            />
          </button>

          {showRoadRoute && (
            <div className="px-6 pb-6 space-y-3">
              {route.steps
                .filter((s: any) => s.instruction !== "Arrive at destination")
                .map((step: any, index: number) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span style={{ color: c.textMuted }}>{step.instruction}</span>
                    <span className="text-xs shrink-0 ml-3" style={{ color: c.textMuted }}>
                      {(step.distanceMeters / 1000).toFixed(1)} km
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="mt-5 flex items-center gap-3 rounded-2xl p-4" style={{ backgroundColor: c.surfaceAlt }}>
          <ShieldCheck size={18} style={{ color: c.primary }} className="shrink-0" />
          <p className="text-xs" style={{ color: c.textMuted }}>
            Fares shown are based on real reports from Lagos commuters. Trust your journey.
          </p>
        </div>
      </div>
    </main>
  );
}