"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { coffees, testimonials } from "@/lib/data";

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function FadeSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1447933601403-56dc2f6421cc?w=1920&q=80"
            alt="Grains de café vert"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <p
            className="text-caption text-[#C8A96E] mb-6"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
            }}
          >
            Importateur de caf&eacute; vert de sp&eacute;cialit&eacute;
          </p>

          <h1
            className="heading-hero text-white mb-6"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s",
            }}
          >
            Du terroir à votre torréfacteur
          </h1>

          <p
            className="text-body text-white/60 max-w-xl mx-auto mb-10"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s",
            }}
          >
            Café vert de spécialité sourcé en direct. Lots fractionnés dès 30kg.
            Traçabilité complète du producteur à votre atelier.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease 0.8s, transform 0.8s ease 0.8s",
            }}
          >
            <Link href="/catalogue" className="btn-primary">
              Voir le catalogue
            </Link>
            <Link href="/devis" className="btn-secondary">
              Demander un devis
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
          <ArrowDown size={20} className="text-white/30 animate-bounce" />
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="bg-black border-y border-white/5">
        <div className="max-w-6xl mx-auto px-10 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "6", label: "Origines" },
              { value: "83+", label: "Score SCA minimum" },
              { value: "30kg", label: "Lot minimum" },
              { value: "24h", label: "Réponse devis" },
            ].map((stat, i) => (
              <FadeSection key={stat.label} delay={i * 0.1}>
                <div className="text-3xl md:text-4xl font-light text-white mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                  {stat.value}
                </div>
                <div className="text-xs text-white/40 uppercase tracking-widest">
                  {stat.label}
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VALUES - Light section ===== */}
      <section className="section-padded light">
        <div className="max-w-6xl mx-auto">
          <FadeSection className="text-center mb-20">
            <div className="accent-line mx-auto mb-6" />
            <h2 className="heading-section text-[#171717] mb-4">
              Le café vert, simplifié
            </h2>
            <p className="text-body text-[#666] max-w-xl mx-auto">
              Nous rendons le café vert de spécialité accessible aux torréfacteurs de toutes tailles.
            </p>
          </FadeSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {[
              { title: "Sourcing direct", desc: "Relations directes avec les producteurs dans six pays. Pas d'intermédiaires, des prix justes pour tous.", num: "01" },
              { title: "Lots fractionnés", desc: "De 30kg à un conteneur complet. Nous nous adaptons à votre volume, que vous soyez une micro-torréfaction ou un acteur établi.", num: "02" },
              { title: "Traçabilité totale", desc: "Ferme, altitude, variétal, process, score SCA, notes de dégustation. Chaque lot est documenté intégralement.", num: "03" },
            ].map((v, i) => (
              <FadeSection key={v.num} delay={i * 0.15} className="text-center md:text-left">
                <span className="text-caption text-[#C8A96E] block mb-4">{v.num}</span>
                <h3 className="heading-card text-[#171717] mb-3">{v.title}</h3>
                <p className="text-small text-[#666] leading-relaxed">{v.desc}</p>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED IMAGE SECTION ===== */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1524350876685-274059332603?w=1920&q=80"
          alt="Plantation de café"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <FadeSection>
            <div className="accent-line mx-auto mb-6" />
          </FadeSection>
          <FadeSection delay={0.1}>
            <h2 className="heading-section text-white mb-4">
              Sourcé avec soin,<br />livré avec précision
            </h2>
          </FadeSection>
          <FadeSection delay={0.2}>
            <p className="text-body text-white/60 max-w-lg mx-auto mb-8">
              Chaque lot est sélectionné sur place, évalué selon les standards SCA,
              et acheminé dans des conditions optimales.
            </p>
          </FadeSection>
          <FadeSection delay={0.3}>
            <Link href="/a-propos" className="btn-primary">
              Notre approche
            </Link>
          </FadeSection>
        </div>
      </section>

      {/* ===== FEATURED COFFEES ===== */}
      <section className="section-padded">
        <div className="max-w-6xl mx-auto">
          <FadeSection className="text-center mb-16">
            <div className="accent-line mx-auto mb-6" />
            <h2 className="heading-section text-white mb-4">
              Sélection actuelle
            </h2>
            <p className="text-body text-white/50 max-w-lg mx-auto">
              Nos cafés verts disponibles, prêts à être torréfiés.
            </p>
          </FadeSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
            {coffees.slice(0, 4).map((coffee, i) => (
              <FadeSection
                key={coffee.id}
                delay={i * 0.1}
                className="bg-black p-8 group hover:bg-white/[0.02] transition-colors duration-500"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{coffee.flag}</span>
                  <span className="text-xs text-white/40 uppercase tracking-widest">{coffee.origin}</span>
                </div>
                <h3 className="heading-card text-white mb-2">{coffee.name}</h3>
                <p className="text-sm italic text-[#C8A96E]/80 mb-4">{coffee.notes}</p>
                <div className="flex items-center justify-between text-xs text-white/30">
                  <span className="font-mono">{coffee.score} SCA</span>
                  <span>{coffee.priceFob}/kg</span>
                </div>
                <div className="w-full h-px bg-white/5 mt-4 mb-3" />
                <div className="flex gap-4 text-xs text-white/25">
                  <span>{coffee.process}</span>
                  <span>{coffee.altitude}</span>
                </div>
              </FadeSection>
            ))}
          </div>

          <FadeSection className="text-center mt-12">
            <Link href="/catalogue" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-300">
              Voir tout le catalogue <ArrowRight size={16} />
            </Link>
          </FadeSection>
        </div>
      </section>

      {/* ===== PROCESS - Light section ===== */}
      <section className="section-padded light">
        <div className="max-w-5xl mx-auto">
          <FadeSection className="text-center mb-20">
            <div className="accent-line mx-auto mb-6" />
            <h2 className="heading-section text-[#171717]">
              Comment ça marche
            </h2>
          </FadeSection>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { num: "01", title: "Sélection & devis", desc: "Parcourez le catalogue, sélectionnez vos cafés, demandez un devis." },
              { num: "02", title: "Échantillons", desc: "Recevez des échantillons gratuits pour valider en cupping." },
              { num: "03", title: "Commande", desc: "Confirmez votre commande. Nous gérons la logistique." },
              { num: "04", title: "Livraison", desc: "Livraison en France métropolitaine avec suivi." },
            ].map((step, i) => (
              <FadeSection key={step.num} delay={i * 0.1} className="text-center">
                <span className="text-caption text-[#C8A96E] block mb-4">{step.num}</span>
                <h3 className="text-lg font-medium text-[#171717] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                  {step.title}
                </h3>
                <p className="text-small text-[#666]">{step.desc}</p>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section-padded">
        <div className="max-w-5xl mx-auto">
          <FadeSection className="text-center mb-16">
            <div className="accent-line mx-auto mb-6" />
            <h2 className="heading-section text-white">
              Ce qu&apos;ils en disent
            </h2>
          </FadeSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <FadeSection
                key={t.name}
                delay={i * 0.1}
                className="border border-white/5 p-8 hover:border-white/10 transition-colors duration-500"
              >
                <p className="text-sm text-white/50 leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <div className="text-sm font-medium text-white">{t.name}</div>
                  <div className="text-xs text-white/30">{t.company}</div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&q=80"
          alt="Dégustation de café"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
          <FadeSection>
            <h2 className="heading-section text-white mb-4">
              Prêt à découvrir nos cafés ?
            </h2>
          </FadeSection>
          <FadeSection delay={0.1}>
            <p className="text-body text-white/50 mb-8">
              Échantillons gratuits sous 48h. Devis personnalisé sous 24h.
            </p>
          </FadeSection>
          <FadeSection delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/devis" className="btn-primary">
                Demander un devis
              </Link>
              <Link href="/catalogue" className="btn-secondary">
                Explorer le catalogue
              </Link>
            </div>
          </FadeSection>
        </div>
      </section>
    </>
  );
}
