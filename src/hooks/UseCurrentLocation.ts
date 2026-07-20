// src/hooks/UseCurrentLocation.ts
"use client";

import { useState, useCallback } from "react";

interface Coords {
  lat: number;
  lng: number;
}

type PermissionStatus = "idle" | "requesting" | "granted" | "denied" | "error";

export function useCurrentLocation() {
  const [location, setLocation] = useState("Set your location");
  const [coords, setCoords] = useState<Coords | null>(null);
  const [accuracyMeters, setAccuracyMeters] = useState<number | null>(null);
  const [status, setStatus] = useState<PermissionStatus>("idle");

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus("error");
      setLocation("Location not supported on this device");
      return;
    }

    setStatus("requesting");
    setLocation("Detecting location...");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setCoords({ lat, lng });
        setAccuracyMeters(position.coords.accuracy);
        setStatus("granted");

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
            { headers: { "Accept-Language": "en" } }
          );
          const data = await res.json();
          const addr = data?.address ?? {};

          // Build the most specific label available: house number + road first,
          // falling back to broader area names. Most Lagos buildings aren't
          // individually mapped with house numbers in OSM, so this often
          // stops at road level — that's a real data limitation, not a bug.
          const parts = [
            addr.house_number,
            addr.road,
          ].filter(Boolean);

          const areaFallback =
            addr.suburb || addr.neighbourhood || addr.city_district || addr.town;

          const label = parts.length > 0
            ? `${parts.join(" ")}${areaFallback ? `, ${areaFallback}` : ""}`
            : areaFallback || data?.display_name?.split(",")[0] || "Current location";

          setLocation(label);
        } catch {
          setLocation("Current location");
        }
      },
      (err) => {
        setStatus("denied");
        setLocation(
          err.code === err.PERMISSION_DENIED
            ? "Location permission denied"
            : "Could not detect location"
        );
      },
      {
        enableHighAccuracy: true, // forces GPS chip use where available, not just WiFi/IP
        timeout: 15000,
        maximumAge: 0,
      }
    );
  }, []);

  return { location, coords, accuracyMeters, status, requestLocation };
}