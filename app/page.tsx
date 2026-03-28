"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, Package, FileSearch, Truck, ArrowRight, Leaf, Scale, ShieldCheck } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatsCounter } from "@/components/ui/StatsCounter";
import { CoffeeCard } from "@/components/ui/CoffeeCard";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { coffees, testimonials } from "@/lib/data";

const stats = [
  { value: 6, suffix: "", label: "Origines" },
  { value: 83, suffix: "+", label: "Score SCA min." },
  { value: 30, suffix: "kg", label: "Lot minimum" },
  { value: 24, suffix: "h", label: "Réponse devis" },
];

const values = [
  {
    icon: Globe,
    title: "Sourcing direct",
    description: "Relations directes avec les producteurs. Pas d'intermédiaires inutiles, des prix justes pour tous.",
  },
  {
    icon: Package,
    title: "Lots fractionnés",
    description: "De 30kg à un conteneur complet. Nous nous adaptons à la taille de votre torréfaction.",
  },
  {
    icon: ShieldCheck,
    title: "Traçabilité totale",
    description: "Fiche complète pour chaque lot : ferme, altitude, variétal, process, score SCA, notes de dégustation.",
  },
];

const steps = [
  { icon: FileSearch, title: "Sélection & devis", description: "Parcourez notre catalogue et demandez un devis personnalisé." },
  { icon: Leaf, title: "Échantillons gratuits", description: "Recevez des échantillons pour valider votre sélection en cupping." },
  { icon: Scale, title: "Commande & logistique", description: "Confirmez votre commande. Nous gérons toute la logistique." },
  { icon: Truck, title: "Livraison & suivi", description: "Livraison en France métropolitaine avec suivi en temps réel." },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-[#0A0A08]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#C8A96E]/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8A96E]/20 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-[#C8A96E] mb-6 font-[family-name:var(--font-mono)]">
              Importateur de café vert de spécialité
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-[#F0EDE6] font-[family-name:var(--font-serif)] mb-6 leading-[1.1]">
              Du terroir à votre{" "}
              <span className="text-[#C8A96E]">torréfacteur</span>
            </h1>
            <p className="text-lg md:text-xl text-[#A8A49C] max-w-2xl mx-auto mb-10 leading-relaxed">
              Café vert de spécialité sourcé directement auprès des producteurs.
              Lots fractionnés dès 30kg, traçabilité complète, pour les torréfacteurs artisanaux en France.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                href="/catalogue"
                className="bg-[#C8A96E] text-[#0A0A08] px-8 py-3.5 rounded-lg font-semibold hover:bg-[#D4BC8A] transition-colors flex items-center gap-2"
              >
                Voir le catalogue <ArrowRight size={18} />
              </Link>
              <Link
                href="/devis"
                className="border border-[#2A2A25] text-[#F0EDE6] px-8 py-3.5 rounded-lg font-semibold hover:border-[#C8A96E] hover:text-[#C8A96E] transition-colors"
              >
                Demander un devis
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
          >
            {stats.map((stat) => (
              <StatsCounter key={stat.label} {...stat} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionTitle tag="Pourquoi Stora" title="Le café vert, simplifié" subtitle="Nous rendons le café vert de spécialité accessible aux torréfacteurs de toutes tailles." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#1A1A17] border border-[#2A2A25] rounded-xl p-8 hover:border-[#C8A96E]/20 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#C8A96E]/10 flex items-center justify-center mb-5 group-hover:bg-[#C8A96E]/20 transition-colors">
                  <v.icon size={24} className="text-[#C8A96E]" />
                </div>
                <h3 className="text-lg font-bold text-[#F0EDE6] mb-2 font-[family-name:var(--font-serif)]">{v.title}</h3>
                <p className="text-sm text-[#A8A49C] leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured coffees */}
      <section className="py-24 px-6 bg-[#070706]">
        <div className="max-w-6xl mx-auto">
          <SectionTitle tag="Catalogue" title="Nos cafés vedettes" subtitle="Découvrez notre sélection de cafés verts de spécialité, sourcés avec soin." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coffees.slice(0, 4).map((coffee) => (
              <CoffeeCard key={coffee.id} coffee={coffee} compact />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/catalogue" className="inline-flex items-center gap-2 text-[#C8A96E] font-semibold hover:text-[#D4BC8A] transition-colors">
              Voir tout le catalogue <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionTitle tag="Process" title="Comment ça marche" subtitle="De la sélection à la livraison, un process simple et transparent." />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#C8A96E]/10 flex items-center justify-center mx-auto mb-4 relative">
                  <step.icon size={24} className="text-[#C8A96E]" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#C8A96E] text-[#0A0A08] text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#F0EDE6] mb-2 font-[family-name:var(--font-serif)]">{step.title}</h3>
                <p className="text-sm text-[#A8A49C] leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-[#070706]">
        <div className="max-w-6xl mx-auto">
          <SectionTitle tag="Témoignages" title="Ils nous font confiance" subtitle="Ce que nos torréfacteurs partenaires disent de Stora." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.name} {...t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#C8A96E]/5 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F0EDE6] font-[family-name:var(--font-serif)] mb-4">
            Prêt à découvrir nos cafés ?
          </h2>
          <p className="text-[#A8A49C] mb-8 text-lg">
            Demandez un devis personnalisé et recevez des échantillons gratuits sous 48h.
          </p>
          <Link
            href="/devis"
            className="inline-flex items-center gap-2 bg-[#C8A96E] text-[#0A0A08] px-8 py-3.5 rounded-lg font-semibold hover:bg-[#D4BC8A] transition-colors"
          >
            Demander un devis <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
