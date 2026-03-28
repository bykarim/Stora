"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

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
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

export function AboutContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920&q=80"
          alt="Producteur de café"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <FadeSection><div className="accent-line mx-auto mb-6" /></FadeSection>
          <FadeSection delay={0.15}>
            <h1 className="heading-hero text-white mb-4">
              Notre histoire
            </h1>
          </FadeSection>
          <FadeSection delay={0.3}>
            <p className="text-body text-white/60 max-w-xl mx-auto">
              Rendre le café de spécialité accessible aux torréfacteurs artisanaux en France.
            </p>
          </FadeSection>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padded light">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <FadeSection>
              <span className="text-caption text-[#C8A96E] block mb-4">Notre mission</span>
              <h2 className="heading-card text-[#171717] mb-4">Démocratiser l&apos;accès au café vert de spécialité</h2>
              <p className="text-small text-[#666] leading-relaxed mb-4">
                Stora est né d&apos;un constat simple : les torréfacteurs artisanaux en France peinent à accéder à du café vert de qualité en petites quantités.
              </p>
              <p className="text-small text-[#666] leading-relaxed">
                Nous avons créé le pont entre les meilleurs terroirs du monde et votre atelier de torréfaction.
              </p>
            </FadeSection>
            <FadeSection delay={0.15}>
              <span className="text-caption text-[#C8A96E] block mb-4">Notre approche</span>
              <h2 className="heading-card text-[#171717] mb-4">Sourcing direct, service personnalisé</h2>
              <p className="text-small text-[#666] leading-relaxed mb-4">
                Nous travaillons en direct avec les producteurs et coopératives dans six pays. Cette relation garantit qualité, traçabilité et prix justes.
              </p>
              <p className="text-small text-[#666] leading-relaxed">
                Notre flexibilité sur les volumes et notre service d&apos;échantillons gratuits font de nous le partenaire idéal.
              </p>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padded">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <FadeSection><div className="accent-line mx-auto mb-6" /></FadeSection>
            <FadeSection delay={0.15}><h2 className="heading-section text-white">Ce qui nous guide</h2></FadeSection>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { num: "01", title: "Qualité", desc: "Chaque lot est évalué selon les standards SCA. Nous ne proposons que des cafés scorant 83+ points." },
              { num: "02", title: "Transparence", desc: "Traçabilité complète du producteur à votre torréfacteur. Fiches techniques détaillées." },
              { num: "03", title: "Confiance", desc: "Relations durables avec nos producteurs et nos clients. Pas de surprises, que de la constance." },
            ].map((v, i) => (
              <FadeSection key={v.num} delay={i * 0.15} className="text-center">
                <span className="text-caption text-[#C8A96E] block mb-4">{v.num}</span>
                <h3 className="heading-card text-white mb-3">{v.title}</h3>
                <p className="text-small text-white/40">{v.desc}</p>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padded light">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "6+", label: "Origines" },
              { value: "120+", label: "Torréfacteurs" },
              { value: "85t", label: "Importées/an" },
              { value: "98%", label: "Satisfaction" },
            ].map((s, i) => (
              <FadeSection key={s.label} delay={i * 0.1}>
                <div className="text-3xl font-light text-[#171717] mb-1" style={{ fontFamily: 'var(--font-display)' }}>{s.value}</div>
                <div className="text-xs text-[#999] uppercase tracking-widest">{s.label}</div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
