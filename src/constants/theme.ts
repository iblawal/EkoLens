// src/constants/theme.ts

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceAlt: string;
  primary: string;
  primaryLight: string;
  accent: string;
  success: string;
  road: string;
  text: string;
  textMuted: string;
  border: string;
}

export interface Theme {
  colors: ThemeColors;
}

export const lightTheme: Theme = {
  colors: {
    background: "#F8FAFC",
    surface: "#FFFFFF",
    surfaceAlt: "#E0F7FA",

    primary: "#2563EB",
    primaryLight: "#3B82F6",

    accent: "#06B6D4",
    success: "#22C55E",
    road: "#84CC16",

    text: "#0F172A",
    textMuted: "#64748B",

    border: "#E2E8F0",
  },
};

export const darkTheme: Theme = {
  colors: {
    background: "#070C1B",
    surface: "#0F172A",
    surfaceAlt: "#132335",

    primary: "#3B82F6",
    primaryLight: "#60A5FA",

    accent: "#22D3EE",
    success: "#4ADE80",
    road: "#A3E635",

    text: "#F8FAFC",
    textMuted: "#94A3B8",

    border: "#1E293B",
  },
};

export const theme = lightTheme;
export default theme;