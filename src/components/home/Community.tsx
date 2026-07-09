"use client";

import { motion, type Variants } from "framer-motion";
import { Quote, Users2, MapPin } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const tips = [
  {
    quote: "Shine your eye — watch carefully, especially when changing buses.",
    route: "Ojuelegba → Ikeja",
  },
  {
    quote: "Clench your belongings tightly, especially during heavy traffic stretches.",
    route: "Iba Estate → Surulere",
  },
  {
    quote: "Ask traffic control carefully if you're unsure of the next stop.",
    route: "Ikeja → Ilupeju",
  },
];

export default function Community() {
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <section id="community" className="py-24 px-6" style={{ backgroundColor: c.background }}>
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
            Community
          </span>
          <h2
            className="mt-3 text-3xl sm:text-4xl font-bold leading-tight"
            style={{ color: c.text }}
          >
            Real tips from real Lagos commuters
          </h2>
          <p className="mt-4 text-lg" style={{ color: c.textMuted }}>
            Every route on EkoLens is grounded in actual trips people have made — not guesswork.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
          className="grid sm:grid-cols-3 gap-6 mb-16"
        >
          {tips.map((tip, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="rounded-2xl border p-6 shadow-sm"
              style={{ borderColor: c.border, backgroundColor: c.surface }}
            >
              <Quote size={22} style={{ color: c.primary }} className="mb-3" />
              <p className="text-sm leading-relaxed mb-4" style={{ color: c.text }}>
                "{tip.quote}"
              </p>
              <div className="flex items-center gap-2">
                <MapPin size={14} style={{ color: c.textMuted }} />
                <span className="text-xs font-medium" style={{ color: c.textMuted }}>
                  {tip.route}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* join community CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border p-10 text-center flex flex-col items-center"
          style={{ borderColor: c.border, backgroundColor: c.surfaceAlt }}
        >
          <Users2 size={32} style={{ color: c.primary }} className="mb-4" />
          <h3 className="text-xl font-bold mb-2" style={{ color: c.text }}>
            Be part of the founding community
          </h3>
          <p className="text-sm max-w-md mb-6" style={{ color: c.textMuted }}>
            EkoLens is built by commuters, for commuters. Share your route data and help
            make Lagos navigation easier for everyone.
          </p>
          <button
            className="px-6 py-3 rounded-full font-medium text-white transition hover:scale-[1.03]"
            style={{
              backgroundImage: `linear-gradient(to right, ${c.primary}, ${c.primaryLight})`,
            }}
          >
            Share Your Trip Data
          </button>
        </motion.div>
      </div>
    </section>
  );
}