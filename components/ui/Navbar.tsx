"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  {
    label: "Nos cafés",
    href: "/catalogue",
    children: [
      { href: "/catalogue", label: "Catalogue complet" },
    ],
  },
  { label: "Notre maison", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
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
          ? "bg-white shadow-sm"
          : "bg-white"
      }`}
    >
      {/* Top bar */}
      <div className="border-b border-[#e5e5e0]">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-10">
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-[#999] tracking-wide">Importateur de café vert de spécialité</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/contact" className="text-[11px] text-[#999] hover:text-[#1a1a1a] transition-colors tracking-wide">
              Nous contacter
            </Link>
            <Link href="/devis" className="text-[11px] text-[#999] hover:text-[#1a1a1a] transition-colors tracking-wide">
              Demander un devis
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight text-[#1a1a1a]" style={{ fontFamily: 'var(--font-display)' }}>
            Stora
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <div key={link.href} className="relative group">
              <Link
                href={link.href}
                className={`flex items-center gap-1 text-[14px] font-medium tracking-wide transition-colors duration-200 py-5 ${
                  pathname === link.href || pathname?.startsWith(link.href + "/")
                    ? "text-[#1a1a1a]"
                    : "text-[#666] hover:text-[#1a1a1a]"
                }`}
              >
                {link.label}
                {link.children && <ChevronDown size={14} className="ml-0.5" />}
              </Link>
              {link.children && (
                <div className="absolute top-full left-0 pt-0 hidden group-hover:block">
                  <div className="bg-white shadow-lg border border-[#e5e5e0] py-2 min-w-[200px]">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-5 py-2.5 text-[13px] text-[#666] hover:text-[#1a1a1a] hover:bg-[#f5f5f0] transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link href="/devis" className="btn-primary text-[12px] py-2.5 px-5">
            Devis gratuit
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-[#1a1a1a] p-2"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#e5e5e0] absolute left-0 right-0 shadow-lg">
          <div className="px-6 py-6 space-y-1">
            {[{ href: "/", label: "Accueil" }, ...navLinks].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-3 text-[15px] font-medium border-b border-[#e5e5e0] transition-colors ${
                  pathname === link.href ? "text-[#1a1a1a]" : "text-[#666]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4">
              <Link href="/devis" className="btn-primary w-full text-center text-[13px]">
                Demander un devis
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
