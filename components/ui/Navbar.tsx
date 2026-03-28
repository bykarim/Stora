"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/catalogue", label: "Catalogue" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0A08]/95 backdrop-blur-xl border-b border-[#2A2A25]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C8A96E] to-[#A08050] flex items-center justify-center">
            <span className="text-[#0A0A08] font-bold text-sm font-[family-name:var(--font-serif)]">S</span>
          </div>
          <span className="text-xl font-bold text-[#F0EDE6] font-[family-name:var(--font-serif)] tracking-tight">
            Stora
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-[#C8A96E] ${
                pathname === link.href ? "text-[#C8A96E]" : "text-[#A8A49C]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/devis"
            className="bg-[#C8A96E] text-[#0A0A08] px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#D4BC8A] transition-colors"
          >
            Demander un devis
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-[#F0EDE6] p-2"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0A0A08]/98 backdrop-blur-xl border-b border-[#2A2A25]"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-lg font-medium transition-colors ${
                    pathname === link.href ? "text-[#C8A96E]" : "text-[#A8A49C]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/devis"
                className="bg-[#C8A96E] text-[#0A0A08] px-5 py-3 rounded-lg text-center font-semibold mt-2"
              >
                Demander un devis
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
