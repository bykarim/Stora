"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

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
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 text-center max-w-3xl mx-auto px-6"
        >
          <motion.div variants={fadeUp} className="accent-line mx-auto mb-6" />
          <motion.h1 variants={fadeUp} className="heading-hero text-white mb-4">
            Notre histoire
          </motion.h1>
          <motion.p variants={fadeUp} className="text-body text-white/60 max-w-xl mx-auto">
            Rendre le café de spécialité accessible aux torréfacteurs artisanaux en France.
          </motion.p>
        </motion.div>
      </section>

      {/* Mission */}
      <section className="section-padded light">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-16"
          >
            <motion.div variants={fadeUp}>
              <span className="text-caption text-[#C8A96E] block mb-4">Notre mission</span>
              <h2 className="heading-card text-[#171717] mb-4">Démocratiser l&apos;accès au café vert de spécialité</h2>
              <p className="text-small text-[#666] leading-relaxed mb-4">
                Stora est né d&apos;un constat simple : les torréfacteurs artisanaux en France peinent à accéder à du café vert de qualité en petites quantités.
              </p>
              <p className="text-small text-[#666] leading-relaxed">
                Nous avons créé le pont entre les meilleurs terroirs du monde et votre atelier de torréfaction.
              </p>
            </motion.div>
            <motion.div variants={fadeUp}>
              <span className="text-caption text-[#C8A96E] block mb-4">Notre approche</span>
              <h2 className="heading-card text-[#171717] mb-4">Sourcing direct, service personnalisé</h2>
              <p className="text-small text-[#666] leading-relaxed mb-4">
                Nous travaillons en direct avec les producteurs et coopératives dans six pays. Cette relation garantit qualité, traçabilité et prix justes.
              </p>
              <p className="text-small text-[#666] leading-relaxed">
                Notre flexibilité sur les volumes et notre service d&apos;échantillons gratuits font de nous le partenaire idéal.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padded">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.div variants={fadeUp} className="accent-line mx-auto mb-6" />
            <motion.h2 variants={fadeUp} className="heading-section text-white">Ce qui nous guide</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { num: "01", title: "Qualité", desc: "Chaque lot est évalué selon les standards SCA. Nous ne proposons que des cafés scorant 83+ points." },
              { num: "02", title: "Transparence", desc: "Traçabilité complète du producteur à votre torréfacteur. Fiches techniques détaillées." },
              { num: "03", title: "Confiance", desc: "Relations durables avec nos producteurs et nos clients. Pas de surprises, que de la constance." },
            ].map((v) => (
              <motion.div key={v.num} variants={fadeUp} className="text-center">
                <span className="text-caption text-[#C8A96E] block mb-4">{v.num}</span>
                <h3 className="heading-card text-white mb-3">{v.title}</h3>
                <p className="text-small text-white/40">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padded light">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "6+", label: "Origines" },
              { value: "120+", label: "Torréfacteurs" },
              { value: "85t", label: "Importées/an" },
              { value: "98%", label: "Satisfaction" },
            ].map((s) => (
              <motion.div key={s.label} variants={fadeUp}>
                <div className="text-3xl font-light text-[#171717] mb-1" style={{ fontFamily: 'var(--font-display)' }}>{s.value}</div>
                <div className="text-xs text-[#999] uppercase tracking-widest">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
