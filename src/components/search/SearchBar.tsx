"use client";

import { useState, useEffect, useRef } from "react";
import {
  Navigation,
  MapPin,
  Search,
  Bus,
  Train,
  Car,
  CarTaxiFront,
  Ship,
  Footprints,
  Loader2,
  LocateFixed,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContext";
import { useCurrentLocation } from "@/hooks/UseCurrentLocation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const transportModes = [
  { key: "all", label: "All", icon: Navigation },
  { key: "danfo", label: "Danfo", icon: Bus },
  { key: "keke", label: "Keke", icon: CarTaxiFront },
  { key: "brt", label: "BRT", icon: Train },
  { key: "ride", label: "Ride", icon: Car },
  { key: "ferry", label: "Ferry", icon: Ship },
  { key: "walk", label: "Walk", icon: Footprints },
];

interface LocationSuggestion {
  id: string;
  name: string;
  type: string;
  latitude: number;
  longitude: number;
  lga: string | null;
  source?: "local" | "osm_live";
}

export default function SearchBar() {
  const router = useRouter();
  const { theme } = useTheme();
  const c = theme.colors;

  const { location, coords, accuracyMeters, status, requestLocation } = useCurrentLocation();

  const [destinationText, setDestinationText] = useState("");
  const [selectedDestination, setSelectedDestination] =
    useState<LocationSuggestion | null>(null);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searching, setSearching] = useState(false);
  const [transport, setTransport] = useState("all");

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (selectedDestination && destinationText !== selectedDestination.name) {
      setSelectedDestination(null);
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (destinationText.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        setSearching(true);
        const res = await fetch(
          `${API_URL}/locations/search?q=${encodeURIComponent(destinationText)}`
        );
        const data = await res.json();
        setSuggestions(data);
        setShowSuggestions(true);
      } catch (err) {
        console.error("Location search failed:", err);
        setSuggestions([]);
      } finally {
        setSearching(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [destinationText]);

  const handleSelectSuggestion = (item: LocationSuggestion) => {
    setSelectedDestination(item);
    setDestinationText(item.name);
    setShowSuggestions(false);
  };

  const handleSearch = () => {
    if (!selectedDestination || !coords) return;
    router.push(
      `/search/results?fromLat=${coords.lat}&fromLng=${coords.lng}&fromLabel=${encodeURIComponent(
        location
      )}&toLocationId=${selectedDestination.id}&toLat=${selectedDestination.latitude}&toLng=${selectedDestination.longitude}&toLabel=${encodeURIComponent(
        selectedDestination.name
      )}&transport=${transport}`
    );
  };

  return (
    <div className="w-full">
      <div
        className="rounded-3xl border overflow-visible"
        style={{ borderColor: c.border, backgroundColor: c.surface }}
      >
        <div className="relative">
          <div className="absolute left-[27px] top-[26px] bottom-[26px] w-px flex flex-col items-center justify-between">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: c.primary }} />
            <div className="flex-1 border-l border-dashed my-1" style={{ borderColor: c.border }} />
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: c.road }} />
          </div>

          {/* From — with location icon, and explicit permission-gated detect button */}
          <div className="flex items-center gap-3 pl-5 pr-5 py-4 border-b" style={{ borderColor: c.border }}>
            <Navigation size={18} style={{ color: c.primary }} className="shrink-0 ml-1" />
            <div className="flex-1 min-w-0">
              <p className="text-[11px] uppercase tracking-wide" style={{ color: c.textMuted }}>
                From
              </p>
              <div className="mt-0.5 flex items-center justify-between gap-2">
                <span
                  className="text-sm font-medium truncate"
                  style={{ color: status === "granted" ? c.text : c.textMuted }}
                >
                  {location}
                </span>

                {status !== "granted" && (
                  <button
                    onClick={requestLocation}
                    disabled={status === "requesting"}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shrink-0"
                    style={{ backgroundColor: `${c.primary}12`, color: c.primary }}
                  >
                    {status === "requesting" ? (
                      <Loader2 size={13} className="animate-spin" />
                    ) : (
                      <LocateFixed size={13} />
                    )}
                    {status === "requesting" ? "Detecting..." : "Use my location"}
                  </button>
                )}
              </div>
              {status === "granted" && accuracyMeters && accuracyMeters > 500 && (
                <p className="mt-1 text-[11px]" style={{ color: "#B45309" }}>
                  Location approximate (±{Math.round(accuracyMeters)}m) — try again on a phone with GPS for better accuracy
                </p>
              )}
            </div>
          </div>

          {/* To — with destination pin icon */}
          <div className="flex items-center gap-3 pl-5 pr-5 py-4 relative">
            <MapPin size={18} style={{ color: c.road }} className="shrink-0 ml-1" />
            <div className="flex-1 min-w-0">
              <p className="text-[11px] uppercase tracking-wide" style={{ color: c.textMuted }}>
                To
              </p>
              <input
                type="text"
                placeholder="Where are you going?"
                value={destinationText}
                onChange={(e) => setDestinationText(e.target.value)}
                onFocus={() => {
                  if (suggestions.length > 0) setShowSuggestions(true);
                }}
                className="mt-0.5 w-full bg-transparent outline-none text-sm font-medium"
                style={{ color: c.text }}
              />
            </div>
            {searching && <Loader2 size={16} className="animate-spin" style={{ color: c.textMuted }} />}

            {showSuggestions && suggestions.length > 0 && (
              <div
                className="absolute left-0 right-0 top-full mt-2 z-20 rounded-2xl border shadow-xl overflow-hidden"
                style={{ borderColor: c.border, backgroundColor: c.surface }}
              >
                {suggestions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectSuggestion(item)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:opacity-70 transition"
                    style={{ borderBottom: `1px solid ${c.border}` }}
                  >
                    <MapPin size={15} style={{ color: c.textMuted }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: c.text }}>
                        {item.name}
                      </p>
                      <p className="text-xs" style={{ color: c.textMuted }}>
                        {item.type}
                        {item.lga ? ` · ${item.lga}` : ""}
                      </p>
                    </div>
                    {item.source === "local" && (
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                        style={{ backgroundColor: `${c.primary}15`, color: c.primary }}
                      >
                        fares available
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {showSuggestions &&
              suggestions.length === 0 &&
              destinationText.trim().length >= 2 &&
              !searching && (
                <div
                  className="absolute left-0 right-0 top-full mt-2 z-20 rounded-2xl border px-4 py-3 text-sm shadow-xl"
                  style={{ borderColor: c.border, backgroundColor: c.surface, color: c.textMuted }}
                >
                  No matching places found.
                </div>
              )}
          </div>
        </div>
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
        {transportModes.map((item) => {
          const Icon = item.icon;
          const active = transport === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setTransport(item.key)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-medium whitespace-nowrap transition"
              style={{
                borderColor: active ? c.primary : c.border,
                backgroundColor: active ? `${c.primary}10` : "transparent",
                color: active ? c.primary : c.textMuted,
              }}
            >
              <Icon size={14} />
              {item.label}
            </button>
          );
        })}
      </div>

      <button
        onClick={handleSearch}
        disabled={!selectedDestination || !coords}
        className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-2xl font-semibold text-white transition disabled:opacity-40"
        style={{ backgroundColor: c.text }}
      >
        <Search size={17} />
        Get me there
      </button>
    </div>
  );
}