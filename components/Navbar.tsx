"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";

const links = [
  { href: "/#fonctionnement", label: "Fonctionnement" },
  { href: "/#tuile", label: "La tuile" },
  { href: "/#avantages", label: "Avantages" },
  { href: "/ticket", label: "Démo" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0)",
        backdropFilter: scrolled ? "saturate(180%) blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
      }}
    >
      <nav className="container-x flex h-[68px] items-center justify-between">
        <Link href="/" aria-label="Accueil 1keti" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[0.92rem] font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/commander" className="btn btn-dark">
            Commander ma tuile
          </Link>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center md:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-4 w-6">
            <span
              className="absolute left-0 block h-[2px] w-6 bg-ink transition-all duration-300"
              style={{ top: open ? "7px" : "0px", transform: open ? "rotate(45deg)" : "none" }}
            />
            <span
              className="absolute left-0 top-[7px] block h-[2px] w-6 bg-ink transition-all duration-300"
              style={{ opacity: open ? 0 : 1 }}
            />
            <span
              className="absolute left-0 block h-[2px] w-6 bg-ink transition-all duration-300"
              style={{ top: open ? "7px" : "14px", transform: open ? "rotate(-45deg)" : "none" }}
            />
          </span>
        </button>
      </nav>

      {/* Menu mobile */}
      <div
        className="overflow-hidden border-t border-border bg-white transition-all duration-300 md:hidden"
        style={{ maxHeight: open ? "360px" : "0px", opacity: open ? 1 : 0 }}
      >
        <div className="container-x flex flex-col gap-1 py-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-base font-medium text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/commander"
            onClick={() => setOpen(false)}
            className="btn btn-dark btn-block mt-2"
          >
            Commander ma tuile
          </Link>
        </div>
      </div>
    </header>
  );
}
