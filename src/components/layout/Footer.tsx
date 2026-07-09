"use client";

import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const AnchorTag = "a";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Community", href: "#community" },
];

// simple inline SVG icons — lucide-react doesn't include brand/logo icons
function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 011.141.195v3.325a8.623 8.623 0 00-.653-.036 26.805 26.805 0 00-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 00-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 1.928-.287 1.739h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 6.135 4.604 11.194 10.101 11.647z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0115.54 3h-3.09v12.4a2.592 2.592 0 01-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 004.3 1.38V7.3s-1.88.09-3.24-1.48z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.83 14.02c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.13.11-1.82-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.79-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.82 2 .89 2.15.07.15.12.32.02.51-.1.19-.15.31-.29.48-.14.17-.3.37-.43.5-.14.14-.29.29-.13.57.17.29.75 1.24 1.61 2.01 1.11.99 2.05 1.3 2.34 1.44.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.64-.14.26.1 1.64.77 1.92.91.28.14.47.21.53.33.07.12.07.68-.17 1.36z" />
    </svg>
  );
}

const socialLinks = [
  { icon: TwitterIcon, href: "#", label: "Twitter" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: FacebookIcon, href: "#", label: "Facebook" },
  { icon: TikTokIcon, href: "#", label: "TikTok" },
];

export default function Footer() {
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <footer
      className="pt-16 pb-8 px-6 mx-3 mb-3 rounded-2xl"
      style={{
        backgroundImage: `linear-gradient(135deg, ${c.primary}, ${c.accent})`,
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 pb-10 border-b border-white/20">
          {/* logo + tagline */}
          <div className="md:col-span-2 max-w-xs">
            <Image
              src="/images/ekolens-logo1.png"
              alt="EkoLens logo"
              width={160}
              height={160}
              className="h-12 w-auto object-contain mb-4"
            />
            <p className="text-sm text-white/80">
              Navigating Lagos, made easy. Real routes, real fares, real commuters.
            </p>
          </div>

          {/* nav links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Navigate</h4>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <AnchorTag
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/80 hover:text-white transition"
                >
                  {link.label}
                </AnchorTag>
              ))}
            </div>
          </div>

          {/* contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Contact Us</h4>
            <div className="flex flex-col gap-3">
              <AnchorTag
                href="mailto:hello@ekolens.app"
                className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition"
              >
                <Mail size={16} />
                hello@ekolens.app
              </AnchorTag>
              <AnchorTag
                href="https://wa.me/2340000000000"
                className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition"
              >
                <Phone size={16} />
                WhatsApp Us
              </AnchorTag>
            </div>
          </div>
        </div>

        {/* social row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
          <p className="text-xs text-white/70">
            © {new Date().getFullYear()} EkoLens. All rights reserved.
          </p>

          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <AnchorTag
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 transition"
              >
                <social.icon />
              </AnchorTag>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}