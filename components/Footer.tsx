import Link from "next/link";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-x py-16">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-xs">
            <Logo />
            <p className="body mt-4 text-[0.92rem]">
              Le ticket de caisse dématérialisé en un tap. Moins de papier, plus
              de simplicité.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <FooterCol
              title="Produit"
              items={[
                { href: "/#fonctionnement", label: "Fonctionnement" },
                { href: "/#tuile", label: "La tuile" },
                { href: "/#avantages", label: "Avantages" },
                { href: "/ticket", label: "Démo" },
              ]}
            />
            <FooterCol
              title="Entreprise"
              items={[
                { href: "/commander", label: "Commander" },
                { href: "/#faq", label: "FAQ" },
                { href: "mailto:bonjour@1keti.app", label: "Contact" },
              ]}
            />
            <FooterCol
              title="Légal"
              items={[
                { href: "/#", label: "Confidentialité" },
                { href: "/#", label: "CGU" },
                { href: "/#", label: "Mentions légales" },
              ]}
            />
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-[0.82rem] text-muted sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} 1keti. Tous droits réservés.</span>
          <span className="font-mono">Conçu en France · Sans papier</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { href: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted">
        {title}
      </h4>
      <ul className="mt-4 space-y-2.5">
        {items.map((it) => (
          <li key={it.label}>
            <Link
              href={it.href}
              className="text-[0.92rem] text-ink-soft transition-colors hover:text-ink"
            >
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
