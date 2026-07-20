"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Bus, Car, CarTaxiFront, Train, Footprints, ChevronRight, Loader2, Route } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const transportIcons: Record<string, any> = {
  DANFO: Bus,
  KEKE: CarTaxiFront,
  KOROPE: Car,
  BRT: Train,
  RIDE: Car,
  WALKING: Footprints,
};

function formatDuration(seconds: number) {
  const mins = Math.round(seconds / 60);
  if (mins < 60) return `${mins} mins`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}hr${m > 0 ? ` ${m}mins` : ""}`;
}

export default function SearchResultsPage() {
  const params = useSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const c = theme.colors;

  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRouteIdx, setSelectedRouteIdx] = useState(0);

  const fromLabel = params.get("fromLabel") || "Current location";
  const toLabel = params.get("toLabel") || "Destination";

  useEffect(() => {
    const fromLat = params.get("fromLat");
    const fromLng = params.get("fromLng");
    const toLat = params.get("toLat");
    const toLng = params.get("toLng");
    const toLocationId = params.get("toLocationId");
    const toName = params.get("toLabel") || "";

    if (!fromLat || !fromLng || !toLat || !toLng) {
      setError("Missing search details. Please search again.");
      setLoading(false);
      return;
    }

    const url =
      `${API_URL}/journey/plan?fromLng=${fromLng}&fromLat=${fromLat}` +
      `&toLng=${toLng}&toLat=${toLat}&toName=${encodeURIComponent(toName)}` +
      (toLocationId ? `&toLocationId=${toLocationId}` : "");

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (!data.routes || data.routes.length === 0) {
          setError(data.message || "Could not plan this journey.");
        } else {
          setPlan(data);
        }
      })
      .catch(() => setError("Could not reach EkoLens. Check your connection."))
      .finally(() => setLoading(false));
  }, [params]);

  const handleSelectOption = (option: any) => {
    const selectedRoute = plan.routes[selectedRouteIdx];
    // Store in the same shape the journey page already expects (plan.route singular)
    const journeyPlan = { route: selectedRoute, journeyGuide: plan.journeyGuide };
    sessionStorage.setItem("ekolens:lastPlan", JSON.stringify(journeyPlan));
    sessionStorage.setItem("ekolens:selectedOption", JSON.stringify(option));
    router.push(`/journey/${option.transportType.toLowerCase()}`);
  };

  return (
    <main className="min-h-screen" style={{ backgroundColor: c.background }}>
      <div className="border-b" style={{ borderColor: c.border, backgroundColor: c.surface }}>
        <div className="max-w-2xl mx-auto px-5 py-4">
          <Link href="/plan" className="inline-flex items-center gap-2 text-sm mb-3" style={{ color: c.textMuted }}>
            <ArrowLeft size={15} />
            Edit search
          </Link>
          <p className="text-[15px] font-semibold" style={{ color: c.text }}>
            {fromLabel} <span style={{ color: c.textMuted, fontWeight: 400 }}>to</span> {toLabel}
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5">
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Loader2 size={28} className="animate-spin" style={{ color: c.primary }} />
            <p className="text-sm" style={{ color: c.textMuted }}>Finding your route...</p>
          </div>
        )}

        {error && !loading && (
          <div className="mt-6 rounded-2xl border p-6 text-center" style={{ borderColor: c.border, backgroundColor: c.surface }}>
            <p className="text-sm" style={{ color: c.textMuted }}>{error}</p>
            <Link href="/plan" className="inline-block mt-4 text-sm font-semibold" style={{ color: c.primary }}>
              Try another search
            </Link>
          </div>
        )}

        {plan && !loading && (
          <>
            {/* Route alternatives — real distinct paths from GraphHopper */}
            <p className="mt-5 mb-2 text-xs font-semibold uppercase tracking-wide" style={{ color: c.textMuted }}>
              {plan.routes.length > 1 ? "Choose your road route" : "Route"}
            </p>

            <div className="rounded-2xl border divide-y overflow-hidden mb-5" style={{ borderColor: c.border, backgroundColor: c.surface }}>
              {plan.routes.map((route: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedRouteIdx(idx)}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left transition"
                  style={{ backgroundColor: idx === selectedRouteIdx ? `${c.primary}08` : "transparent" }}
                >
                  <div
                    className="h-9 w-9 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: idx === selectedRouteIdx ? c.primary : c.surfaceAlt,
                    }}
                  >
                    <Route size={15} style={{ color: idx === selectedRouteIdx ? "white" : c.textMuted }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold" style={{ color: c.text }}>
                      Route {idx + 1} {idx === 0 && plan.routes.length > 1 ? "(shortest)" : ""}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: c.textMuted }}>
                      {formatDuration(route.durationSeconds)} · {(route.distanceMeters / 1000).toFixed(1)} km
                    </p>
                  </div>
                  {idx === selectedRouteIdx && (
                    <span className="text-xs font-semibold" style={{ color: c.primary }}>Selected</span>
                  )}
                </button>
              ))}
            </div>

            <p className="mb-2 text-xs font-semibold uppercase tracking-wide" style={{ color: c.textMuted }}>
              Choose how you're getting there
            </p>

            <div className="rounded-2xl border divide-y overflow-hidden" style={{ borderColor: c.border, backgroundColor: c.surface }}>
              {plan.journeyGuide.options.map((option: any, idx: number) => {
                const Icon = transportIcons[option.transportType] ?? Bus;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(option)}
                    className="w-full flex items-center gap-4 px-5 py-4 hover:opacity-80 transition text-left"
                  >
                    <div
                      className="h-10 w-10 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: c.surfaceAlt }}
                    >
                      <Icon size={17} style={{ color: c.text }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold" style={{ color: c.text }}>
                        {option.transportType.charAt(0) + option.transportType.slice(1).toLowerCase()}
                      </p>
                      {option.note ? (
                        <p className="text-xs mt-0.5" style={{ color: c.textMuted }}>{option.note}</p>
                      ) : (
                        <p className="text-xs mt-0.5" style={{ color: c.textMuted }}>
                          {option.sampleSize} report{option.sampleSize !== 1 ? "s" : ""}
                          {option.isRushHourPrice ? " · rush hour pricing" : ""}
                        </p>
                      )}
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold" style={{ color: c.text, fontFamily: "var(--font-mono)" }}>
                        ₦{option.estimatedFare.min.toLocaleString()}–{option.estimatedFare.max.toLocaleString()}
                      </p>
                    </div>

                    <ChevronRight size={16} style={{ color: c.textMuted }} />
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </main>
  );
}