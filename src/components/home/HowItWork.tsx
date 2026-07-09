"use client";

import { motion, type Variants } from "framer-motion";
import { Search, ListTree, Navigation } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Enter Your Route",
    description:
      "Tell us where you're starting from and where you're headed — use a landmark if that's easier.",
  },
  {
    icon: ListTree,
    step: "02",
    title: "See Your Full Journey",
    description:
      "Get every leg mapped out — which buses to take, where to change, fares, and estimated time.",
  },
  {
    icon: Navigation,
    step: "03",
    title: "Travel With Confidence",
    description:
      "Follow the route with real safety tips and traffic insight from commuters who've made the trip.",
  },
];

export default function HowItWorks() {
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <section
      id="how-it-works"
      className="py-24 px-6"
      style={{ backgroundColor: c.surfaceAlt }}
    >
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
            How It Works
          </span>
          <h2
            className="mt-3 text-3xl sm:text-4xl font-bold leading-tight"
            style={{ color: c.text }}
          >
            Three steps to your destination
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
          className="grid sm:grid-cols-3 gap-6"
        >
          {steps.map((item) => (
            <motion.div
              key={item.step}
              variants={fadeUp}
              className="relative rounded-2xl border p-8 shadow-sm"
              style={{ borderColor: c.border, backgroundColor: c.surface }}
            >
              <span
                className="text-5xl font-extrabold opacity-10 absolute top-4 right-6"
                style={{ color: c.text }}
              >
                {item.step}
              </span>
              <div
                className="inline-flex items-center justify-center rounded-xl p-3 mb-4"
                style={{ backgroundColor: c.surfaceAlt }}
              >
                <item.icon size={22} style={{ color: c.primary }} />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: c.text }}>
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: c.textMuted }}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}