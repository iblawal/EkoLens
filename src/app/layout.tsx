// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Sora, IBM_Plex_Mono } from "next/font/google";
import "leaflet/dist/leaflet.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-display" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "EkoLens - Navigating Lagos Made Easy",
  description: "Get precise local transport costs and landmark details for Lagos.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${sora.variable} ${plexMono.variable}`}
        style={{ backgroundColor: "#F8FAFC" }}
      >
        <ThemeProvider initialMode="light">{children}</ThemeProvider>
      </body>
    </html>
  );
}