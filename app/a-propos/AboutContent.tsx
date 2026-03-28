"use client";

import { motion } from "framer-motion";
import { Heart, Eye, Handshake, Globe, Users, TrendingUp } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatsCounter } from "@/components/ui/StatsCounter";

const values = [
  { icon: Heart, title: "Qualité", description: "Chaque lot est évalué selon les standards SCA. Nous ne proposons que des cafés scorant 83 points et plus." },
  { icon: Eye, title: "Transparence", description: "Traçabilité complète du producteur à votre torréfacteur. Fiches techniques détaillées pour chaque lot." },
  { icon: Handshake, title: "Confiance", description: "Des relations durables avec nos producteurs et nos clients. Pas de surprises, que de la constance." },
];

const stats = [
  { value: 6, suffix: "+", label: "Origines couvertes" },
  { value: 120, suffix: "+", label: "Torréfacteurs partenaires" },
  { value: 85, suffix: "t", label: "Importées par an" },
  { value: 98, suffix: "%", label: "Clients satisfaits" },
];

export function AboutContent() {
  return (
    <div className="pt-28 pb-20">
      {/* Hero */}
      <section className="px-6 mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-[#C8A96E] mb-4 font-[family-name:var(--font-mono)]">
              Notre histoire
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#F0EDE6] font-[family-name:var(--font-serif)] mb-6">
              Rendre le café de spécialité <span className="text-[#C8A96E]">accessible</span>
            </h1>
            <p className="text-lg text-[#A8A49C] leading-relaxed max-w-3xl mx-auto">
              Stora est né d&apos;un constat simple : les torréfacteurs artisanaux en France peinent à accéder
              à du café vert de qualité en petites quantités. Nous avons créé le pont entre les meilleurs
              terroirs du monde et votre atelier de torréfaction.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="px-6 py-20 bg-[#070706]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C8A96E] mb-3 block font-[family-name:var(--font-mono)]">Notre mission</span>
              <h2 className="text-3xl font-bold text-[#F0EDE6] font-[family-name:var(--font-serif)] mb-4">
                Démocratiser l&apos;accès au café vert de spécialité
              </h2>
              <p className="text-[#A8A49C] leading-relaxed mb-4">
                Notre mission est de rendre le café vert de spécialité accessible aux torréfacteurs
                artisanaux en France, quelle que soit leur taille.
              </p>
              <p className="text-[#A8A49C] leading-relaxed">
                Nous croyons que chaque torréfacteur devrait pouvoir proposer des cafés exceptionnels
                à ses clients, sans les contraintes logistiques traditionnelles de l&apos;importation.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C8A96E] mb-3 block font-[family-name:var(--font-mono)]">Notre approche</span>
              <h2 className="text-3xl font-bold text-[#F0EDE6] font-[family-name:var(--font-serif)] mb-4">
                Sourcing direct, service personnalisé
              </h2>
              <p className="text-[#A8A49C] leading-relaxed mb-4">
                Nous travaillons en direct avec les producteurs et les coopératives dans six pays.
                Cette relation directe garantit la qualité, la traçabilité et des prix justes.
              </p>
              <p className="text-[#A8A49C] leading-relaxed">
                Notre flexibilité sur les volumes — de 30kg à un conteneur complet — et notre
                service d&apos;échantillons gratuits font de nous le partenaire idéal des torréfacteurs en croissance.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <SectionTitle tag="Nos valeurs" title="Ce qui nous guide" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#C8A96E]/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon size={26} className="text-[#C8A96E]" />
                </div>
                <h3 className="text-lg font-bold text-[#F0EDE6] font-[family-name:var(--font-serif)] mb-2">{v.title}</h3>
                <p className="text-sm text-[#A8A49C] leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 py-20 bg-[#070706]">
        <div className="max-w-4xl mx-auto">
          <SectionTitle tag="En chiffres" title="Stora aujourd'hui" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <StatsCounter key={s.label} {...s} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
