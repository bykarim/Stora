"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <span className="text-2xl font-bold tracking-tight block mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Stora
            </span>
            <p className="text-sm text-white/50 leading-relaxed">
              Importateur de café vert de spécialité. Du terroir à votre torréfacteur.
            </p>
          </div>

          {/* Nos cafés */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">Nos cafés</h4>
            <div className="space-y-3">
              <Link href="/catalogue" className="block text-sm text-white/60 hover:text-white transition-colors">Catalogue</Link>
              <Link href="/catalogue" className="block text-sm text-white/60 hover:text-white transition-colors">Éthiopie</Link>
              <Link href="/catalogue" className="block text-sm text-white/60 hover:text-white transition-colors">Brésil</Link>
              <Link href="/catalogue" className="block text-sm text-white/60 hover:text-white transition-colors">Colombie</Link>
              <Link href="/catalogue" className="block text-sm text-white/60 hover:text-white transition-colors">Rwanda</Link>
            </div>
          </div>

          {/* La maison */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">La maison</h4>
            <div className="space-y-3">
              <Link href="/a-propos" className="block text-sm text-white/60 hover:text-white transition-colors">Notre histoire</Link>
              <Link href="/a-propos" className="block text-sm text-white/60 hover:text-white transition-colors">Nos engagements</Link>
              <Link href="/contact" className="block text-sm text-white/60 hover:text-white transition-colors">Contact</Link>
              <Link href="/devis" className="block text-sm text-white/60 hover:text-white transition-colors">Demander un devis</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">Contact</h4>
            <div className="space-y-3 text-sm text-white/60">
              <p>12 Rue du Commerce<br />75015 Paris, France</p>
              <p>contact@stora-cafe.fr</p>
              <p>+33 1 23 45 67 89</p>
              <p className="text-white/40 text-xs">Lun — Ven : 9h00 — 18h00</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Stora. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-white/30">Mentions légales</span>
            <span className="text-xs text-white/30">Politique de confidentialité</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
