"use client";

import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet's default marker icons breaking under bundlers
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface RouteMapProps {
  geometry: [number, number][]; // [lng, lat] pairs from GraphHopper
  fromLabel: string;
  toLabel: string;
  heightClass?: string;
}

export default function RouteMap({ geometry, fromLabel, toLabel, heightClass = "h-64" }: RouteMapProps) {
  if (!geometry || geometry.length === 0) return null;

  // Leaflet wants [lat, lng] — GraphHopper gives us [lng, lat]
  const positions: [number, number][] = geometry.map(([lng, lat]) => [lat, lng]);
  const start = positions[0];
  const end = positions[positions.length - 1];

  return (
    <div className={`${heightClass} w-full rounded-b-3xl overflow-hidden`}>
      <MapContainer
        bounds={positions}
        boundsOptions={{ padding: [30, 30] }}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline positions={positions} pathOptions={{ color: "#2563EB", weight: 4 }} />
        <Marker position={start} icon={defaultIcon}>
          <Popup>{fromLabel}</Popup>
        </Marker>
        <Marker position={end} icon={defaultIcon}>
          <Popup>{toLabel}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}