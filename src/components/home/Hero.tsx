// src/components/home/Hero.tsx
"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Play,
  Bus,
  Car,
  MapPin,
  ShieldCheck,
  Users,
  Lock,
  Compass,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const textContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const fadeFromLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeFromRight: Variants = {
  hidden: { opacity: 0, x: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
  },
};

const categories = [
  { icon: Bus, label: "Danfo", sub: "Routes & Fares" },
  { icon: Car, label: "Keke", sub: "Routes & Fares" },
  { icon: Bus, label: "BRT", sub: "Routes & Stops" },
  { icon: MapPin, label: "Landmark", sub: "Details & Info" },
];


export default function Hero() {
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: c.background }}
    >
      {/* dotted grid pattern behind headline */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-40 left-0 w-[500px] h-[400px] opacity-40"
          style={{
            backgroundImage: `radial-gradient(circle, ${c.border} 1.5px, transparent 1.5px)`,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      {/* curving road ribbon on the right */}
      <svg
        className="absolute right-0 top-0 h-full pointer-events-none hidden md:block"
        width="500"
        height="1000"
        viewBox="0 0 500 1000"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M 500 50 C 350 150, 250 300, 350 450 C 430 570, 480 650, 400 780 C 350 860, 380 920, 500 980"
          stroke={c.road}
          strokeWidth="55"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M 500 50 C 350 150, 250 300, 350 450 C 430 570, 480 650, 400 780 C 350 860, 380 920, 500 980"
          stroke="white"
          strokeWidth="3"
          strokeDasharray="14 14"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative max-w-7xl mx-auto pl-6 pr-0 pt-32 sm:pt-36 lg:pt-40 pb-16 grid lg:grid-cols-[minmax(0,3.5fr)_minmax(0,8.5fr)] gap-4 items-start overflow-visible">
        {/* LEFT: text fades in from left, staggered */}
        <motion.div initial="hidden" animate="visible" variants={textContainer}>
          {/* badge */}
          <motion.div
            variants={fadeFromLeft}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 mb-6"
            style={{ borderColor: c.border, backgroundColor: c.surface }}
          >
            <Compass size={14} style={{ color: c.primary }} />
            <span
              className="text-xs font-semibold tracking-wide uppercase"
              style={{ color: c.primary }}
            >
              Lagos Navigation Reimagined
            </span>
          </motion.div>

          <motion.h1
            variants={fadeFromLeft}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
            style={{ color: c.text }}
          >
            Navigating <span style={{ color: c.primary }}>Lagos</span>
            <br />
            is easy with
            <br />
            <span className="relative inline-block" style={{ color: c.primary }}>
              EkoLens
              <svg
                className="absolute left-0 -bottom-2 w-full"
                height="10"
                viewBox="0 0 200 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 6 Q 100 -2, 198 6"
                  stroke={c.primary}
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            variants={fadeFromLeft}
            className="mt-6 text-lg max-w-md"
            style={{ color: c.textMuted }}
          >
            Get precise local transport costs and landmark details now.
          </motion.p>

          <motion.div variants={fadeFromLeft} className="mt-8 flex flex-wrap gap-4">
            <Link href="/search">
            <button
              className="px-5 py-2.5 rounded-full text-sm font-medium text-white transition hover:scale-105"
              style={{
                backgroundImage: "linear-gradient(to right, " + c.primary + ", " + c.primaryLight + ")",
              }}
            >
              Get Started
            </button>
          </Link>
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-full font-medium border transition hover:opacity-80"
              style={{ borderColor: c.border, color: c.text, backgroundColor: c.surface }}
            >
              <Play size={16} /> Watch Demo
            </button>
          </motion.div>

          <motion.div
            variants={fadeFromLeft}
            className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-md"
          >
            {categories.map((cat) => (
              <div
                key={cat.label}
                className="flex flex-col items-center gap-2 rounded-2xl px-3 py-4 text-center border shadow-sm transition hover:shadow-md"
                style={{ borderColor: c.border, backgroundColor: c.surface }}
              >
                <cat.icon style={{ color: c.primary }} size={22} />
                <span className="text-sm font-semibold" style={{ color: c.text }}>
                  {cat.label}
                </span>
                <span className="text-[11px]" style={{ color: c.textMuted }}>
                  {cat.sub}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT: image pulled close to headline, large */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeFromRight}
          className="relative w-full flex justify-center lg:justify-start lg:-ml-8 xl:-ml-16"
        >
          <Image
            src="/images/hand-phone.png"
            alt="EkoLens app showing route search"
            width={800}
            height={1000}
            priority
            className="w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[680px] xl:max-w-[820px] h-auto drop-shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}