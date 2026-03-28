"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { coffees, testimonials } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <>
      {/* ===== HERO - Full viewport with background image ===== */}
      <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background image */}
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1447933601403-56dc2f6421cc?w=1920&q=80"
            alt="Grains de café vert"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>

        {/* Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center max-w-4xl mx-auto px-6"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-caption text-[#C8A96E] mb-6"
          >
            Importateur de caf&eacute; vert de sp&eacute;cialit&eacute;
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="heading-hero text-white mb-6"
          >
            Du terroir à votre torréfacteur
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-body text-white/60 max-w-xl mx-auto mb-10"
          >
            Café vert de spécialité sourcé en direct. Lots fractionnés dès 30kg.
            Traçabilité complète du producteur à votre atelier.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/catalogue" className="btn-primary">
              Voir le catalogue
            </Link>
            <Link href="/devis" className="btn-secondary">
              Demander un devis
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowDown size={20} className="text-white/30" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="bg-black border-y border-white/5">
        <div className="max-w-6xl mx-auto px-10 py-16">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { value: "6", label: "Origines" },
              { value: "83+", label: "Score SCA minimum" },
              { value: "30kg", label: "Lot minimum" },
              { value: "24h", label: "Réponse devis" },
            ].map((stat) => (
              <motion.div key={stat.label} variants={fadeUp}>
                <div className="text-3xl md:text-4xl font-light text-white mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                  {stat.value}
                </div>
                <div className="text-xs text-white/40 uppercase tracking-widest">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== VALUES - Light section ===== */}
      <section className="section-padded light">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <motion.div variants={fadeUp} className="accent-line mx-auto mb-6" />
            <motion.h2 variants={fadeUp} className="heading-section text-[#171717] mb-4">
              Le café vert, simplifié
            </motion.h2>
            <motion.p variants={fadeUp} className="text-body text-[#666] max-w-xl mx-auto">
              Nous rendons le café vert de spécialité accessible aux torréfacteurs de toutes tailles.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16"
          >
            {[
              {
                title: "Sourcing direct",
                desc: "Relations directes avec les producteurs dans six pays. Pas d'intermédiaires, des prix justes pour tous.",
                num: "01",
              },
              {
                title: "Lots fractionnés",
                desc: "De 30kg à un conteneur complet. Nous nous adaptons à votre volume, que vous soyez une micro-torréfaction ou un acteur établi.",
                num: "02",
              },
              {
                title: "Traçabilité totale",
                desc: "Ferme, altitude, variétal, process, score SCA, notes de dégustation. Chaque lot est documenté intégralement.",
                num: "03",
              },
            ].map((v) => (
              <motion.div key={v.num} variants={fadeUp} className="text-center md:text-left">
                <span className="text-caption text-[#C8A96E] block mb-4">{v.num}</span>
                <h3 className="heading-card text-[#171717] mb-3">{v.title}</h3>
                <p className="text-small text-[#666] leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
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
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="relative z-10 text-center max-w-3xl mx-auto px-6"
        >
          <motion.div variants={fadeUp} className="accent-line mx-auto mb-6" />
          <motion.h2 variants={fadeUp} className="heading-section text-white mb-4">
            Sourcé avec soin,<br />livré avec précision
          </motion.h2>
          <motion.p variants={fadeUp} className="text-body text-white/60 max-w-lg mx-auto mb-8">
            Chaque lot est sélectionné sur place, évalué selon les standards SCA,
            et acheminé dans des conditions optimales.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link href="/a-propos" className="btn-primary">
              Notre approche
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== FEATURED COFFEES ===== */}
      <section className="section-padded">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} className="accent-line mx-auto mb-6" />
            <motion.h2 variants={fadeUp} className="heading-section text-white mb-4">
              Sélection actuelle
            </motion.h2>
            <motion.p variants={fadeUp} className="text-body text-white/50 max-w-lg mx-auto">
              Nos cafés verts disponibles, prêts à être torréfiés.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5"
          >
            {coffees.slice(0, 4).map((coffee) => (
              <motion.div
                key={coffee.id}
                variants={fadeUp}
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
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/catalogue" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-300">
              Voir tout le catalogue <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== PROCESS - Light section ===== */}
      <section className="section-padded light">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <motion.div variants={fadeUp} className="accent-line mx-auto mb-6" />
            <motion.h2 variants={fadeUp} className="heading-section text-[#171717]">
              Comment ça marche
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-12"
          >
            {[
              { num: "01", title: "Sélection & devis", desc: "Parcourez le catalogue, sélectionnez vos cafés, demandez un devis." },
              { num: "02", title: "Échantillons", desc: "Recevez des échantillons gratuits pour valider en cupping." },
              { num: "03", title: "Commande", desc: "Confirmez votre commande. Nous gérons la logistique." },
              { num: "04", title: "Livraison", desc: "Livraison en France métropolitaine avec suivi." },
            ].map((step) => (
              <motion.div key={step.num} variants={fadeUp} className="text-center">
                <span className="text-caption text-[#C8A96E] block mb-4">{step.num}</span>
                <h3 className="text-lg font-medium text-[#171717] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                  {step.title}
                </h3>
                <p className="text-small text-[#666]">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section-padded">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} className="accent-line mx-auto mb-6" />
            <motion.h2 variants={fadeUp} className="heading-section text-white">
              Ce qu&apos;ils en disent
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                className="border border-white/5 p-8 hover:border-white/10 transition-colors duration-500"
              >
                <p className="text-sm text-white/50 leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <div className="text-sm font-medium text-white">{t.name}</div>
                  <div className="text-xs text-white/30">{t.company}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== FINAL CTA - Image background ===== */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&q=80"
          alt="Dégustation de café"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/60" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="relative z-10 text-center max-w-2xl mx-auto px-6"
        >
          <motion.h2 variants={fadeUp} className="heading-section text-white mb-4">
            Prêt à découvrir nos cafés ?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-body text-white/50 mb-8">
            Échantillons gratuits sous 48h. Devis personnalisé sous 24h.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/devis" className="btn-primary">
              Demander un devis
            </Link>
            <Link href="/catalogue" className="btn-secondary">
              Explorer le catalogue
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
