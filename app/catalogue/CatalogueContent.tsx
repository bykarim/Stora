"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { coffees, origins, processes, scoreRanges } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function CatalogueContent() {
  const [selectedOrigins, setSelectedOrigins] = useState<string[]>([]);
  const [selectedProcesses, setSelectedProcesses] = useState<string[]>([]);
  const [selectedScoreRange, setSelectedScoreRange] = useState<string | null>(null);
  const [selectedCoffees, setSelectedCoffees] = useState<string[]>([]);

  const toggle = (arr: string[], set: (v: string[]) => void, val: string) =>
    set(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);

  const filtered = coffees.filter((c) => {
    if (selectedOrigins.length && !selectedOrigins.includes(c.origin)) return false;
    if (selectedProcesses.length && !selectedProcesses.includes(c.process)) return false;
    if (selectedScoreRange) {
      const range = scoreRanges.find((r) => r.label === selectedScoreRange);
      if (range && (c.score < range.min || c.score > range.max)) return false;
    }
    return true;
  });

  const toggleCoffee = (id: string) =>
    setSelectedCoffees((p) => (p.includes(id) ? p.filter((c) => c !== id) : [...p, id]));

  const clearFilters = () => {
    setSelectedOrigins([]);
    setSelectedProcesses([]);
    setSelectedScoreRange(null);
  };

  const hasFilters = selectedOrigins.length > 0 || selectedProcesses.length > 0 || selectedScoreRange !== null;
  const selectedNames = selectedCoffees.map((id) => coffees.find((c) => c.id === id)?.name).filter(Boolean).join(", ");

  const chipClass = (active: boolean) =>
    `px-4 py-2 text-xs tracking-wide transition-all duration-200 ${
      active
        ? "bg-white text-black"
        : "bg-transparent text-white/40 border border-white/10 hover:border-white/25"
    }`;

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-10">
        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="text-center mb-16">
          <motion.div variants={fadeUp} className="accent-line mx-auto mb-6" />
          <motion.h1 variants={fadeUp} className="heading-section text-white mb-3">Nos cafés verts</motion.h1>
          <motion.p variants={fadeUp} className="text-body text-white/40 max-w-lg mx-auto">
            Sélectionnés avec soin auprès des meilleurs producteurs.
          </motion.p>
        </motion.div>

        {/* Filters */}
        <div className="mb-12 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/30 uppercase tracking-widest">Filtres</span>
            {hasFilters && (
              <button onClick={clearFilters} className="text-xs text-white/30 hover:text-white transition-colors">
                Réinitialiser
              </button>
            )}
          </div>

          <div>
            <span className="text-[11px] text-white/20 uppercase tracking-widest block mb-3">Origine</span>
            <div className="flex flex-wrap gap-2">
              {origins.map((o) => (
                <button key={o} onClick={() => toggle(selectedOrigins, setSelectedOrigins, o)} className={chipClass(selectedOrigins.includes(o))}>
                  {o}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[11px] text-white/20 uppercase tracking-widest block mb-3">Process</span>
            <div className="flex flex-wrap gap-2">
              {processes.map((p) => (
                <button key={p} onClick={() => toggle(selectedProcesses, setSelectedProcesses, p)} className={chipClass(selectedProcesses.includes(p))}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[11px] text-white/20 uppercase tracking-widest block mb-3">Score SCA</span>
            <div className="flex flex-wrap gap-2">
              {scoreRanges.map((r) => (
                <button key={r.label} onClick={() => setSelectedScoreRange(selectedScoreRange === r.label ? null : r.label)} className={chipClass(selectedScoreRange === r.label)}>
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-white/5" />
          <span className="text-xs text-white/20">{filtered.length} résultat{filtered.length > 1 ? "s" : ""}</span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {filtered.map((coffee) => {
            const isSelected = selectedCoffees.includes(coffee.id);
            return (
              <motion.div
                key={coffee.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className={`bg-black p-8 transition-colors duration-300 ${isSelected ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"}`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{coffee.flag}</span>
                  <span className="text-[11px] text-white/30 uppercase tracking-widest">{coffee.origin}</span>
                </div>
                <h3 className="heading-card text-white mb-2">{coffee.name}</h3>
                <p className="text-sm italic text-[#C8A96E]/70 mb-5">{coffee.notes}</p>

                <div className="grid grid-cols-2 gap-3 text-xs text-white/25 mb-5">
                  <div><span className="text-white/10 block mb-0.5">Région</span>{coffee.region}</div>
                  <div><span className="text-white/10 block mb-0.5">Altitude</span>{coffee.altitude}</div>
                  <div><span className="text-white/10 block mb-0.5">Process</span>{coffee.process}</div>
                  <div><span className="text-white/10 block mb-0.5">Variétal</span>{coffee.varietal}</div>
                  <div><span className="text-white/10 block mb-0.5">Récolte</span>{coffee.harvest}</div>
                  <div><span className="text-white/10 block mb-0.5">Score SCA</span><span className="text-white/60 font-mono">{coffee.score}</span></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/50 font-medium">{coffee.priceFob}/kg FOB</span>
                  <button
                    onClick={() => toggleCoffee(coffee.id)}
                    className={`text-xs px-4 py-2 transition-all duration-200 ${
                      isSelected
                        ? "bg-white text-black"
                        : "border border-white/10 text-white/40 hover:border-white/25 hover:text-white/60"
                    }`}
                  >
                    {isSelected ? "✓ Sélectionné" : "Ajouter au devis"}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/30 mb-4">Aucun café ne correspond à vos filtres.</p>
            <button onClick={clearFilters} className="text-sm text-white/50 hover:text-white transition-colors">Réinitialiser</button>
          </div>
        )}

        {/* Custom sourcing */}
        <div className="text-center mt-20 py-12 border-t border-b border-white/5">
          <p className="text-sm text-white/30 mb-2">Vous ne trouvez pas ce que vous cherchez ?</p>
          <Link href="/contact" className="text-sm text-white/50 hover:text-white transition-colors">
            Sourcing sur mesure →
          </Link>
        </div>
      </div>

      {/* Floating button */}
      <AnimatePresence>
        {selectedCoffees.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
          >
            <Link
              href={`/devis?cafes=${encodeURIComponent(selectedNames)}`}
              className="btn-primary flex items-center gap-3 shadow-2xl shadow-black/50"
            >
              Demander un devis ({selectedCoffees.length})
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
