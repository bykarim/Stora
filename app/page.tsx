"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
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
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(25px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

const services = [
  { title: "Torréfacteurs artisanaux", desc: "Micro-lots et lots fractionnés dès 30kg", img: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=640&q=80" },
  { title: "Coffee shops", desc: "Sélection premium pour vos clients exigeants", img: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=640&q=80" },
  { title: "Hôtels & restaurants", desc: "Approvisionnement régulier et traçabilité", img: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=640&q=80" },
  { title: "Formations barista", desc: "Cafés de spécialité pour vos ateliers", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=640&q=80" },
  { title: "Bureaux & entreprises", desc: "Café de qualité pour vos équipes", img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=640&q=80" },
  { title: "Épiceries fines", desc: "Origines rares pour votre clientèle", img: "https://images.unsplash.com/photo-1524350876685-274059332603?w=640&q=80" },
];

export default function HomePage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden" style={{ marginTop: '106px' }}>
        <Image
          src="https://images.unsplash.com/photo-1447933601403-56dc2f6421cc?w=1920&q=80"
          alt="Grains de café vert"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <FadeSection>
            <p className="text-overline mb-6" style={{ color: '#C8A96E' }}>Depuis 2024</p>
          </FadeSection>
          <FadeSection delay={0.15}>
            <h1 className="heading-hero text-white mb-6" style={{ color: '#fff' }}>
              Cultivons l&apos;excellence<br />du café vert
            </h1>
          </FadeSection>
          <FadeSection delay={0.3}>
            <p className="text-lg text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">
              Du terroir à votre torréfacteur. Café vert de spécialité sourcé en direct auprès des producteurs.
            </p>
          </FadeSection>
          <FadeSection delay={0.45}>
            <Link href="/a-propos" className="btn-white">
              Découvrez la maison
            </Link>
          </FadeSection>
        </div>
      </section>

      {/* ===== SERVICES GRID ===== */}
      <section className="section-light">
        <div className="max-w-[1200px] mx-auto">
          <FadeSection className="text-center mb-14">
            <p className="text-overline mb-3">Solutions professionnelles</p>
            <h2 className="heading-section text-[#1a1a1a]">À chaque métier, son café</h2>
          </FadeSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <FadeSection key={s.title} delay={i * 0.08}>
                <Link href="/catalogue" className="block group card-hover bg-white overflow-hidden">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={s.img}
                      alt={s.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="heading-card text-[#1a1a1a] mb-1">{s.title}</h3>
                    <p className="text-sm text-[#999]">{s.desc}</p>
                    <span className="discover-link mt-4 text-[13px]">
                      Découvrir <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT SPLIT ===== */}
      <section className="section-alt">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <FadeSection>
              <div className="relative h-[450px] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1524350876685-274059332603?w=800&q=80"
                  alt="Plantation de café"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </FadeSection>
            <FadeSection delay={0.15}>
              <p className="text-overline mb-4">Notre engagement</p>
              <h2 className="heading-section text-[#1a1a1a] mb-6">
                Le café vert,<br />simplifié
              </h2>
              <p className="text-body mb-6">
                Nous rendons le café vert de spécialité accessible aux torréfacteurs de toutes tailles.
                Relations directes avec les producteurs dans six pays, lots fractionnés dès 30kg,
                traçabilité intégrale de la ferme à votre atelier.
              </p>
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div>
                  <div className="text-2xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-display)' }}>6</div>
                  <div className="text-xs text-[#999] uppercase tracking-wider">Origines</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-display)' }}>83+</div>
                  <div className="text-xs text-[#999] uppercase tracking-wider">Score SCA</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-display)' }}>30kg</div>
                  <div className="text-xs text-[#999] uppercase tracking-wider">Lot min.</div>
                </div>
              </div>
              <Link href="/a-propos" className="discover-link">
                En savoir plus <ArrowRight size={14} />
              </Link>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ===== FEATURED COFFEES ===== */}
      <section className="section-light">
        <div className="max-w-[1200px] mx-auto">
          <FadeSection className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-overline mb-3">Notre sélection</p>
              <h2 className="heading-section text-[#1a1a1a]">Cafés verts disponibles</h2>
            </div>
            <Link href="/catalogue" className="discover-link">
              Voir tout le catalogue <ArrowRight size={14} />
            </Link>
          </FadeSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coffees.slice(0, 4).map((coffee, i) => (
              <FadeSection key={coffee.id} delay={i * 0.08} className="bg-white border border-[#e5e5e0] card-hover overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{coffee.flag}</span>
                    <span className="text-xs text-[#999] uppercase tracking-widest">{coffee.origin}</span>
                  </div>
                  <h3 className="heading-card text-[#1a1a1a] mb-2">{coffee.name}</h3>
                  <p className="text-sm italic text-[#67b99a] mb-4">{coffee.notes}</p>
                  <div className="border-t border-[#e5e5e0] pt-4 mt-4">
                    <div className="flex items-center justify-between text-xs text-[#999]">
                      <span className="font-mono font-medium">{coffee.score} SCA</span>
                      <span className="font-semibold text-[#1a1a1a]">{coffee.priceFob}/kg</span>
                    </div>
                    <div className="flex gap-3 mt-2 text-xs text-[#ccc]">
                      <span>{coffee.process}</span>
                      <span>{coffee.altitude}</span>
                    </div>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="section-dark">
        <div className="max-w-[1200px] mx-auto">
          <FadeSection className="text-center mb-16">
            <p className="text-overline mb-3" style={{ color: '#C8A96E' }}>Comment ça marche</p>
            <h2 className="heading-section text-white">Du catalogue à votre atelier</h2>
          </FadeSection>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {[
              { num: "01", title: "Sélection & devis", desc: "Parcourez le catalogue, sélectionnez vos cafés, demandez un devis personnalisé." },
              { num: "02", title: "Échantillons", desc: "Recevez des échantillons gratuits pour valider en cupping dans votre atelier." },
              { num: "03", title: "Commande", desc: "Confirmez votre commande. Nous gérons toute la logistique d'acheminement." },
              { num: "04", title: "Livraison", desc: "Livraison en France métropolitaine sous 5 jours ouvrés avec suivi." },
            ].map((step, i) => (
              <FadeSection key={step.num} delay={i * 0.1} className="text-center">
                <div className="text-3xl font-bold text-[#67b99a] mb-4" style={{ fontFamily: 'var(--font-display)' }}>{step.num}</div>
                <h3 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                  {step.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section-alt">
        <div className="max-w-[1200px] mx-auto">
          <FadeSection className="text-center mb-14">
            <p className="text-overline mb-3">Témoignages</p>
            <h2 className="heading-section text-[#1a1a1a]">Ils nous font confiance</h2>
          </FadeSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <FadeSection key={t.name} delay={i * 0.1} className="bg-white p-8 border border-[#e5e5e0]">
                <p className="text-sm text-[#666] leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="border-t border-[#e5e5e0] pt-4">
                  <div className="text-sm font-semibold text-[#1a1a1a]">{t.name}</div>
                  <div className="text-xs text-[#999]">{t.company}</div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="relative py-24 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&q=80"
          alt="Café"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-[#1a1a1a]/70" />
        <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
          <FadeSection>
            <h2 className="heading-section text-white mb-4">Prêt à découvrir nos cafés ?</h2>
            <p className="text-white/60 mb-8">
              Échantillons gratuits sous 48h. Devis personnalisé sous 24h.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/devis" className="btn-white">
                Demander un devis
              </Link>
              <Link href="/catalogue" className="btn-secondary" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}>
                Explorer le catalogue
              </Link>
            </div>
          </FadeSection>
        </div>
      </section>
    </>
  );
}
