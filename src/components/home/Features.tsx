"use client";

import { motion, type Variants } from "framer-motion";
import { Wallet, MapPinned, Route, ShieldAlert, Clock, Users } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const features = [
  {
    icon: Wallet,
    title: "Real Fare Estimates",
    description:
      "Know what a trip should actually cost before you board — no more guessing, no more getting overcharged.",
  },
  {
    icon: MapPinned,
    title: "Landmark-Based Search",
    description:
      "Search by the landmarks people actually use — Admiralty Circle, Ikeja Under Bridge — not confusing addresses.",
  },
  {
    icon: Route,
    title: "Multi-Modal Route Planning",
    description:
      "Get the full journey mapped out — Danfo, Korope, Keke, or Bike — exactly how Lagosians really travel.",
  },
  {
    icon: ShieldAlert,
    title: "Community Safety Tips",
    description:
      "Real advice from real commuters on every route — know what to watch for before you travel.",
  },
  {
    icon: Clock,
    title: "Live Traffic & Wait Times",
    description:
      "See realistic trip durations based on actual traffic conditions, not just straight-line distance.",
  },
  {
    icon: Users,
    title: "Built on Real Commuter Data",
    description:
      "Every route, fare, and tip comes from Lagosians who've made the trip — not guesswork.",
  },
];

export default function Features() {
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <section id="features" className="py-24 px-6" style={{ backgroundColor: c.background }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span
            className="text-xs font-semibold tracking-wide uppercase"
            style={{ color: c.primary }}
          >
            Why EkoLens
          </span>
          <h2
            className="mt-3 text-3xl sm:text-4xl font-bold leading-tight"
            style={{ color: c.text }}
          >
            Built for how Lagos actually moves
          </h2>
          <p className="mt-4 text-lg" style={{ color: c.textMuted }}>
            Every feature comes from real commuter experiences — not assumptions.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              className="rounded-2xl border p-6 shadow-sm transition hover:shadow-md"
              style={{ borderColor: c.border, backgroundColor: c.surface }}
            >
              <div
                className="inline-flex items-center justify-center rounded-xl p-3 mb-4"
                style={{ backgroundColor: c.surfaceAlt }}
              >
                <feature.icon size={22} style={{ color: c.primary }} />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: c.text }}>
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: c.textMuted }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}