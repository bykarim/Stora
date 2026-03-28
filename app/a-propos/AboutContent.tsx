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
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(25px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

export function AboutContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden" style={{ marginTop: 106 }}>
        <Image
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920&q=80"
          alt="Producteur de cafe"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-[#1a1a1a]/60" />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <FadeSection>
            <div className="accent-bar mx-auto mb-6" />
          </FadeSection>
          <FadeSection delay={0.15}>
            <h1 className="heading-hero text-white mb-4">
              Notre histoire
            </h1>
          </FadeSection>
          <FadeSection delay={0.3}>
            <p className="text-body text-white/80 max-w-xl mx-auto">
              Rendre le cafe de specialite accessible aux torrefacteurs artisanaux en France.
            </p>
          </FadeSection>
        </div>
      </section>

      {/* Mission */}
      <section className="section-light">
        <div className="max-w-5xl mx-auto px-10 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <FadeSection>
              <div className="relative h-[400px] rounded-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80"
                  alt="Grains de cafe"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </FadeSection>
            <FadeSection delay={0.15}>
              <p className="text-overline mb-4">Notre mission</p>
              <h2 className="heading-section text-[#1a1a1a] mb-6">Democratiser l&apos;acces au cafe vert de specialite</h2>
              <p className="text-body text-[#666] leading-relaxed mb-4">
                Stora est ne d&apos;un constat simple : les torrefacteurs artisanaux en France peinent a acceder a du cafe vert de qualite en petites quantites.
              </p>
              <p className="text-body text-[#666] leading-relaxed mb-6">
                Nous avons cree le pont entre les meilleurs terroirs du monde et votre atelier de torrefaction.
              </p>
              <div className="accent-bar mb-6" />
              <p className="text-overline mb-4">Notre approche</p>
              <h3 className="heading-card text-[#1a1a1a] mb-4">Sourcing direct, service personnalise</h3>
              <p className="text-body text-[#666] leading-relaxed mb-4">
                Nous travaillons en direct avec les producteurs et cooperatives dans six pays. Cette relation garantit qualite, tracabilite et prix justes.
              </p>
              <p className="text-body text-[#666] leading-relaxed">
                Notre flexibilite sur les volumes et notre service d&apos;echantillons gratuits font de nous le partenaire ideal.
              </p>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-alt">
        <div className="max-w-5xl mx-auto px-10 py-24">
          <div className="text-center mb-16">
            <FadeSection>
              <p className="text-overline mb-4">Nos valeurs</p>
            </FadeSection>
            <FadeSection delay={0.15}>
              <h2 className="heading-section text-[#1a1a1a]">Ce qui nous guide</h2>
            </FadeSection>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: "01", title: "Qualite", desc: "Chaque lot est evalue selon les standards SCA. Nous ne proposons que des cafes scorant 83+ points." },
              { num: "02", title: "Transparence", desc: "Tracabilite complete du producteur a votre torrefacteur. Fiches techniques detaillees." },
              { num: "03", title: "Confiance", desc: "Relations durables avec nos producteurs et nos clients. Pas de surprises, que de la constance." },
            ].map((v, i) => (
              <FadeSection key={v.num} delay={i * 0.15}>
                <div className="bg-white rounded-xl border border-[#e5e5e0] p-8 text-center card-hover h-full">
                  <span className="inline-block text-2xl font-light text-[#67b99a] mb-4" style={{ fontFamily: 'var(--font-display)' }}>{v.num}</span>
                  <h3 className="heading-card text-[#1a1a1a] mb-3">{v.title}</h3>
                  <p className="text-small text-[#666]">{v.desc}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-light">
        <div className="max-w-4xl mx-auto px-10 py-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "6+", label: "Origines" },
              { value: "120+", label: "Torrefacteurs" },
              { value: "85t", label: "Importees/an" },
              { value: "98%", label: "Satisfaction" },
            ].map((s, i) => (
              <FadeSection key={s.label} delay={i * 0.1}>
                <div className="text-4xl font-light text-[#67b99a] mb-2" style={{ fontFamily: 'var(--font-display)' }}>{s.value}</div>
                <div className="text-xs text-[#999] uppercase tracking-widest">{s.label}</div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
