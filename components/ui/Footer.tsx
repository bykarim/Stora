"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#070706] border-t border-[#2A2A25]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C8A96E] to-[#A08050] flex items-center justify-center">
                <span className="text-[#0A0A08] font-bold text-sm font-[family-name:var(--font-serif)]">S</span>
              </div>
              <span className="text-xl font-bold text-[#F0EDE6] font-[family-name:var(--font-serif)]">Stora</span>
            </div>
            <p className="text-sm text-[#A8A49C] leading-relaxed">
              Importateur de café vert de spécialité en France. Du terroir à votre torréfacteur.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-[#C8A96E] uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Accueil" },
                { href: "/catalogue", label: "Catalogue" },
                { href: "/a-propos", label: "À propos" },
                { href: "/devis", label: "Demander un devis" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#A8A49C] hover:text-[#F0EDE6] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-[#C8A96E] uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-[#A8A49C]">
                <Mail size={14} className="text-[#C8A96E]" />
                contact@stora-cafe.fr
              </li>
              <li className="flex items-center gap-2 text-sm text-[#A8A49C]">
                <Phone size={14} className="text-[#C8A96E]" />
                +33 1 23 45 67 89
              </li>
              <li className="flex items-center gap-2 text-sm text-[#A8A49C]">
                <MapPin size={14} className="text-[#C8A96E]" />
                Paris, France
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-[#C8A96E] uppercase tracking-wider mb-4">Newsletter</h4>
            <p className="text-sm text-[#A8A49C] mb-3">Recevez nos nouveaux arrivages et actualités.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="votre@email.fr"
                className="flex-1 bg-[#1A1A17] border border-[#2A2A25] rounded-lg px-3 py-2 text-sm text-[#F0EDE6] placeholder:text-[#555] outline-none focus:border-[#C8A96E] transition-colors"
              />
              <button
                type="submit"
                className="bg-[#C8A96E] text-[#0A0A08] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#D4BC8A] transition-colors shrink-0"
              >
                OK
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#2A2A25] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#555]">
            &copy; {new Date().getFullYear()} Stora. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-[#555] hover:text-[#A8A49C] transition-colors">
              Mentions légales
            </Link>
            <Link href="#" className="text-xs text-[#555] hover:text-[#A8A49C] transition-colors">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
