"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";

const AnchorTag = "a";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Community", href: "#community" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const { theme } = useTheme();
  const c = theme.colors;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? c.surface + "CC" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid " + c.border : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        {/* logo — sized to fill navbar height properly */}
        <div className="flex items-center">
          <Image
            src="/images/ekolens-logo1.png"
            alt="EkoLens logo"
            width={160}
            height={160}
            priority
            className="h-14 w-auto object-contain"
          />
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            return (
              <AnchorTag
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition hover:opacity-70"
                style={{ color: c.textMuted }}
              >
                {link.label}
              </AnchorTag>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button
            className="px-5 py-2.5 rounded-full text-sm font-medium text-white transition hover:scale-105"
            style={{
              backgroundImage: "linear-gradient(to right, " + c.primary + ", " + c.primaryLight + ")",
            }}
          >
            Get Started
          </button>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          style={{ color: c.text }}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t"
            style={{ backgroundColor: c.surface, borderColor: c.border }}
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((link) => {
                return (
                  <AnchorTag
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium"
                    style={{ color: c.textMuted }}
                  >
                    {link.label}
                  </AnchorTag>
                );
              })}
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}