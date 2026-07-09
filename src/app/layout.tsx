// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

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
    <html lang="en">
      <body style={{ backgroundColor: "#F8FAFC" }}>
        <ThemeProvider initialMode="light">{children}</ThemeProvider>
      </body>
    </html>
  );
}