"use client";

import Link from "next/link";

const footerLinks = [
  { href: "/catalogue", label: "Catalogue" },
  { href: "/a-propos", label: "À propos" },
  { href: "/devis", label: "Devis" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/5">
      <div className="max-w-6xl mx-auto px-10 py-12">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <span className="text-lg font-medium text-white tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Stora
          </span>
          <div className="flex items-center gap-8">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] text-white/40 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/20">
            &copy; {new Date().getFullYear()} Stora. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[11px] text-white/20">contact@stora-cafe.fr</span>
            <span className="text-[11px] text-white/20">+33 1 23 45 67 89</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
