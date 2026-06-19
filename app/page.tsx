import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { FoxMark } from "@/components/Logo";

export default function Home() {
  return (
    <>
      <Hero />
      <Steps />
      <Tile />
      <Formats />
      <Benefits />
      <Faq />
      <CtaBand />
    </>
  );
}

/* ============================ HERO ============================ */
function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* halo discret */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-60"
        style={{ background: "radial-gradient(closest-side, #f4f4f5, transparent)" }}
      />
      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3.5 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-ink" />
              Tap · NFC · Sans papier
            </span>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="h-hero mt-6">
              Le ticket de caisse,
              <br />
              dématérialisé en un tap.
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="lead mt-6 max-w-lg">
              Posez la tuile 1keti sur votre comptoir. Le client approche son
              téléphone, reçoit son ticket de caisse instantanément et
              l’enregistre en <strong className="text-ink">PDF</strong> ou en{" "}
              <strong className="text-ink">image</strong>. Sans application,
              sans email, sans papier.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/ticket" className="btn btn-dark btn-lg">
                Essayer la démo
              </Link>
              <Link href="/commander" className="btn btn-ghost btn-lg">
                Commander ma tuile
              </Link>
            </div>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-[0.85rem] text-ink-soft">
              <Check>Aucune app à installer</Check>
              <Check>Compatible iPhone & Android</Check>
              <Check>Prêt en 30 secondes</Check>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120} className="flex justify-center lg:justify-end">
          <HeroVisual />
        </Reveal>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative">
      {/* téléphone */}
      <div className="relative z-10 w-[260px] rounded-[40px] border border-border bg-white p-3 shadow-[0_50px_120px_-50px_rgba(0,0,0,0.45)]">
        <div className="rounded-[30px] border border-border bg-surface px-5 py-6">
          <div className="flex items-center justify-between">
            <FoxMark className="h-5 w-5 text-ink" />
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
              Ticket reçu
            </span>
          </div>
          <div className="mt-5 text-center">
            <p className="text-[0.7rem] font-semibold tracking-tight text-ink">
              LE COMPTOIR DU MARCHÉ
            </p>
            <p className="font-mono text-[0.58rem] text-muted">75001 Paris</p>
          </div>
          <div className="my-4 border-t border-dashed border-border-strong" />
          <MiniRow label="Café allongé ×2" value="4,80 €" />
          <MiniRow label="Croissant" value="1,60 €" />
          <MiniRow label="Jus pressé" value="4,50 €" />
          <div className="my-4 border-t border-dashed border-border-strong" />
          <div className="flex items-center justify-between">
            <span className="text-[0.72rem] font-bold text-ink">TOTAL</span>
            <span className="text-[0.72rem] font-bold text-ink">23,30 €</span>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <span className="rounded-lg bg-ink py-2 text-center text-[0.6rem] font-semibold text-white">
              PDF
            </span>
            <span className="rounded-lg border border-border-strong py-2 text-center text-[0.6rem] font-semibold text-ink">
              IMAGE
            </span>
          </div>
        </div>
      </div>

      {/* tuile + ondes NFC */}
      <div className="absolute -bottom-6 -left-10 z-20">
        <div className="relative flex h-24 w-24 items-center justify-center rounded-[22px] border border-border bg-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)]">
          <FoxMark className="h-12 w-12 text-ink" />
          <span
            className="absolute h-24 w-24 rounded-[22px] border border-ink/25"
            style={{ animation: "pingRing 2s ease-out infinite" }}
          />
          <span
            className="absolute h-24 w-24 rounded-[22px] border border-ink/25"
            style={{ animation: "pingRing 2s ease-out 1s infinite" }}
          />
        </div>
      </div>
    </div>
  );
}

function MiniRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-0.5 font-mono text-[0.6rem]">
      <span className="text-ink-soft">{label}</span>
      <span className="text-ink">{value}</span>
    </div>
  );
}

/* ============================ STEPS ============================ */
const steps = [
  {
    n: "01",
    title: "Approchez",
    text: "Le client pose son téléphone sur la tuile 1keti. Le tap NFC ouvre instantanément son ticket — aucune application requise.",
    icon: <IconTap />,
  },
  {
    n: "02",
    title: "Recevez",
    text: "Le ticket de caisse complet s’affiche aussitôt sur son écran : articles, montants, TVA et moyen de paiement.",
    icon: <IconReceipt />,
  },
  {
    n: "03",
    title: "Enregistrez",
    text: "D’un geste, il l’enregistre en PDF pour sa comptabilité ou en image dans sa galerie. Le ticket lui appartient.",
    icon: <IconDownload />,
  },
];

function Steps() {
  return (
    <section id="fonctionnement" className="section bg-surface">
      <div className="container-x">
        <SectionHead
          eyebrow="Fonctionnement"
          title="Trois gestes, zéro papier"
          sub="De l’encaissement au reçu numérique en moins de deux secondes."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <div className="card card-hover h-full p-7">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-white">
                    {s.icon}
                  </span>
                  <span className="font-mono text-sm text-muted">{s.n}</span>
                </div>
                <h3 className="h-card mt-6">{s.title}</h3>
                <p className="body mt-3">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ TILE ============================ */
function Tile() {
  return (
    <section id="tuile" className="section">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <div className="relative flex aspect-square items-center justify-center rounded-[32px] border border-border bg-surface">
            <div className="relative flex h-48 w-48 items-center justify-center rounded-[34px] border border-border bg-white shadow-[0_40px_90px_-50px_rgba(0,0,0,0.5)]">
              <FoxMark className="h-24 w-24 text-ink" />
              <span className="absolute bottom-5 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-muted">
                1keti
              </span>
            </div>
            <span className="absolute left-8 top-8 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
              NFC + QR
            </span>
          </div>
        </Reveal>

        <Reveal delay={80} className="order-1 lg:order-2">
          <span className="eyebrow">La tuile</span>
          <h2 className="h-section mt-4">
            Un objet simple, posé sur votre comptoir
          </h2>
          <p className="lead mt-5">
            La tuile 1keti embarque une puce NFC et un QR code de secours. Elle
            se relie à votre caisse et diffuse à chaque client le ticket de sa
            transaction — rien à imprimer, rien à saisir.
          </p>
          <ul className="mt-8 space-y-4">
            <Feature title="Compatible toutes caisses">
              S’intègre par API ou simple lien. Fonctionne avec votre logiciel
              de caisse actuel.
            </Feature>
            <Feature title="NFC + QR de secours">
              Le tap pour les téléphones compatibles, le QR code pour tous les
              autres. Personne n’est laissé de côté.
            </Feature>
            <Feature title="Sans application">
              Le ticket s’ouvre dans le navigateur. Le client n’installe rien et
              ne crée aucun compte.
            </Feature>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ FORMATS ============================ */
function Formats() {
  return (
    <section className="section bg-ink text-white">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-white/50">
            Deux formats, un seul geste
          </span>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            PDF pour la compta. Image pour la galerie.
          </h2>
          <p className="mt-5 text-white/70">
            Le client choisit le format qui lui convient. Le ticket est généré à
            la volée, propre et lisible, prêt à être archivé ou partagé.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-3xl gap-5 sm:grid-cols-2">
          <Reveal>
            <FormatCard
              icon={<IconPdfLg />}
              title="PDF"
              text="Un document universel, idéal pour les notes de frais, la garantie ou la comptabilité."
            />
          </Reveal>
          <Reveal delay={90}>
            <FormatCard
              icon={<IconImageLg />}
              title="Image (PNG)"
              text="Une image nette enregistrée en un instant dans la galerie du téléphone, prête à partager."
            />
          </Reveal>
        </div>

        <Reveal className="mt-12 text-center">
          <Link
            href="/ticket"
            className="btn mx-auto bg-white text-ink hover:bg-white/90"
          >
            Tester les deux formats
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function FormatCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="h-full rounded-[22px] border border-white/12 bg-white/[0.04] p-8">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white">
        {icon}
      </span>
      <h3 className="mt-6 text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-white/65">{text}</p>
    </div>
  );
}

/* ============================ BENEFITS ============================ */
const benefits = [
  { title: "Écologique", text: "Zéro rouleau thermique, zéro bisphénol. Chaque ticket dématérialisé compte.", icon: <IconLeaf /> },
  { title: "Instantané", text: "Le ticket s’affiche en moins de deux secondes après le tap.", icon: <IconBolt /> },
  { title: "Sans compte", text: "Aucune inscription, aucune donnée personnelle demandée au client.", icon: <IconLock /> },
  { title: "Conforme", text: "Mentions légales, TVA et détail des articles : un vrai ticket de caisse.", icon: <IconShield /> },
  { title: "À votre image", text: "Logo, couleurs et coordonnées de votre commerce sur chaque reçu.", icon: <IconBrush /> },
  { title: "Économique", text: "Plus de consommables ni de pannes d’imprimante à gérer.", icon: <IconCoin /> },
];

function Benefits() {
  return (
    <section id="avantages" className="section">
      <div className="container-x">
        <SectionHead
          eyebrow="Avantages"
          title="Pensé pour les commerçants et leurs clients"
          sub="Une solution sobre qui simplifie la vie des deux côtés du comptoir."
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={(i % 3) * 70}>
              <div className="h-full bg-white p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-2 text-ink">
                  {b.icon}
                </span>
                <h3 className="h-card mt-5">{b.title}</h3>
                <p className="body mt-2.5">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ FAQ ============================ */
const faq = [
  {
    q: "Le client doit-il installer une application ?",
    a: "Non. Le ticket s’ouvre directement dans le navigateur du téléphone après le tap NFC ou le scan du QR code. Aucune app, aucun compte.",
  },
  {
    q: "Est-ce compatible avec tous les téléphones ?",
    a: "Le NFC fonctionne sur la grande majorité des iPhone et Android récents. Pour les autres, un QR code imprimé sur la tuile prend le relais.",
  },
  {
    q: "Comment ça se connecte à ma caisse ?",
    a: "Via notre API ou un simple lien généré à chaque transaction. 1keti s’adapte à la plupart des logiciels de caisse du marché.",
  },
  {
    q: "Le ticket est-il un justificatif valable ?",
    a: "Oui. Il reprend toutes les mentions d’un ticket de caisse classique : commerçant, date, détail des articles, TVA et moyen de paiement.",
  },
  {
    q: "Quels formats le client peut-il enregistrer ?",
    a: "Deux : un PDF prêt pour la comptabilité, ou une image PNG enregistrée dans la galerie. Le partage natif du téléphone est aussi disponible.",
  },
];

function Faq() {
  return (
    <section id="faq" className="section bg-surface">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <span className="eyebrow">FAQ</span>
          <h2 className="h-section mt-4">Questions fréquentes</h2>
          <p className="body mt-4">
            Tout ce qu’il faut savoir avant d’équiper votre commerce. Une autre
            question&nbsp;?{" "}
            <a className="font-medium text-ink underline underline-offset-4" href="mailto:bonjour@1keti.app">
              Écrivez-nous.
            </a>
          </p>
        </Reveal>
        <Reveal delay={80}>
          <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-white">
            {faq.map((item) => (
              <details key={item.q} className="group px-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[1.02rem] font-medium text-ink [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-ink transition-transform duration-300 group-open:rotate-45">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <p className="body pb-5 pr-10">{item.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ CTA ============================ */
function CtaBand() {
  return (
    <section className="section">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] border border-border bg-surface px-8 py-16 text-center sm:px-16">
            <div className="mx-auto flex max-w-xl flex-col items-center">
              <FoxMark className="h-12 w-12 text-ink" />
              <h2 className="h-section mt-6">
                Prêt à dématérialiser vos tickets&nbsp;?
              </h2>
              <p className="lead mt-4">
                Recevez votre tuile 1keti et offrez à vos clients un ticket
                moderne, propre et sans papier.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link href="/commander" className="btn btn-dark btn-lg">
                  Commander ma tuile
                </Link>
                <Link href="/ticket" className="btn btn-ghost btn-lg">
                  Voir la démo
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ SHARED ============================ */
function SectionHead({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub: string;
}) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="h-section mt-4">{title}</h2>
      <p className="lead mt-4">{sub}</p>
    </Reveal>
  );
}

function Check({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink text-white">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
      {children}
    </span>
  );
}

function Feature({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-white">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
      <div>
        <h4 className="font-semibold tracking-tight text-ink">{title}</h4>
        <p className="body mt-1 text-[0.92rem]">{children}</p>
      </div>
    </li>
  );
}

/* ============================ ICONS ============================ */
function IconTap() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 10V5a2 2 0 1 1 4 0v5" />
      <path d="M12 10V4a2 2 0 1 1 4 0v6" />
      <path d="M16 10V6a2 2 0 1 1 4 0v8a6 6 0 0 1-6 6h-2a6 6 0 0 1-5.2-3l-2.3-4a2 2 0 0 1 3.4-2L8 13" />
    </svg>
  );
}
function IconReceipt() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
      <path d="M8 7h8M8 11h8M8 15h5" />
    </svg>
  );
}
function IconDownload() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M7 10l5 5 5-5M12 15V3" />
    </svg>
  );
}
function IconPdfLg() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M9 15l3 3 3-3M12 12v6" />
    </svg>
  );
}
function IconImageLg() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" />
    </svg>
  );
}
function IconLeaf() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6" />
    </svg>
  );
}
function IconBolt() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
    </svg>
  );
}
function IconLock() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
function IconBrush() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.06 11.9 16.5 4.5a2.12 2.12 0 0 1 3 3l-7.4 7.44" />
      <path d="M5 21c-.6-1.8.3-3.3 1.5-4.5C8 15 9 16 9 17.5 9 19 7 21 5 21Z" />
    </svg>
  );
}
function IconCoin() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M14.5 9a2.5 2 0 0 0-2.5-1.5c-1.5 0-2.5.8-2.5 2s1 1.6 2.5 2 2.5.8 2.5 2-1 2-2.5 2A2.5 2 0 0 1 9.5 16M12 6v1.5M12 16.5V18" />
    </svg>
  );
}
