"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X, ShoppingCart } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CoffeeCard } from "@/components/ui/CoffeeCard";
import { coffees, origins, processes, scoreRanges } from "@/lib/data";

export function CatalogueContent() {
  const [selectedOrigins, setSelectedOrigins] = useState<string[]>([]);
  const [selectedProcesses, setSelectedProcesses] = useState<string[]>([]);
  const [selectedScoreRange, setSelectedScoreRange] = useState<string | null>(null);
  const [selectedCoffees, setSelectedCoffees] = useState<string[]>([]);

  const toggleFilter = (arr: string[], setArr: (v: string[]) => void, val: string) => {
    setArr(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const filtered = coffees.filter((c) => {
    if (selectedOrigins.length && !selectedOrigins.includes(c.origin)) return false;
    if (selectedProcesses.length && !selectedProcesses.includes(c.process)) return false;
    if (selectedScoreRange) {
      const range = scoreRanges.find((r) => r.label === selectedScoreRange);
      if (range && (c.score < range.min || c.score > range.max)) return false;
    }
    return true;
  });

  const toggleCoffee = (id: string) => {
    setSelectedCoffees((prev) => prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]);
  };

  const clearFilters = () => {
    setSelectedOrigins([]);
    setSelectedProcesses([]);
    setSelectedScoreRange(null);
  };

  const hasFilters = selectedOrigins.length > 0 || selectedProcesses.length > 0 || selectedScoreRange !== null;

  const selectedCoffeeNames = selectedCoffees
    .map((id) => coffees.find((c) => c.id === id)?.name)
    .filter(Boolean)
    .join(", ");

  return (
    <div className="pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          tag="Catalogue"
          title="Nos cafés verts"
          subtitle="Explorez notre sélection de cafés verts de spécialité, sourcés directement auprès des producteurs."
        />

        {/* Filters */}
        <div className="mb-10 space-y-4">
          <div className="flex items-center gap-2 text-sm text-[#A8A49C] mb-3">
            <Filter size={16} className="text-[#C8A96E]" />
            <span>Filtrer par</span>
            {hasFilters && (
              <button onClick={clearFilters} className="ml-auto flex items-center gap-1 text-[#C8A96E] hover:text-[#D4BC8A]">
                <X size={14} /> Réinitialiser
              </button>
            )}
          </div>

          {/* Origin */}
          <div>
            <span className="text-xs text-[#A8A49C] uppercase tracking-wider mb-2 block">Origine</span>
            <div className="flex flex-wrap gap-2">
              {origins.map((o) => (
                <button
                  key={o}
                  onClick={() => toggleFilter(selectedOrigins, setSelectedOrigins, o)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedOrigins.includes(o)
                      ? "bg-[#C8A96E] text-[#0A0A08]"
                      : "bg-[#1A1A17] text-[#A8A49C] border border-[#2A2A25] hover:border-[#C8A96E]/30"
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>

          {/* Process */}
          <div>
            <span className="text-xs text-[#A8A49C] uppercase tracking-wider mb-2 block">Process</span>
            <div className="flex flex-wrap gap-2">
              {processes.map((p) => (
                <button
                  key={p}
                  onClick={() => toggleFilter(selectedProcesses, setSelectedProcesses, p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedProcesses.includes(p)
                      ? "bg-[#C8A96E] text-[#0A0A08]"
                      : "bg-[#1A1A17] text-[#A8A49C] border border-[#2A2A25] hover:border-[#C8A96E]/30"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Score */}
          <div>
            <span className="text-xs text-[#A8A49C] uppercase tracking-wider mb-2 block">Score SCA</span>
            <div className="flex flex-wrap gap-2">
              {scoreRanges.map((r) => (
                <button
                  key={r.label}
                  onClick={() => setSelectedScoreRange(selectedScoreRange === r.label ? null : r.label)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedScoreRange === r.label
                      ? "bg-[#C8A96E] text-[#0A0A08]"
                      : "bg-[#1A1A17] text-[#A8A49C] border border-[#2A2A25] hover:border-[#C8A96E]/30"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-[#A8A49C] mb-6">{filtered.length} café{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}</p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((coffee) => (
            <CoffeeCard
              key={coffee.id}
              coffee={coffee}
              selected={selectedCoffees.includes(coffee.id)}
              onToggleSelect={toggleCoffee}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#A8A49C]">
            <p className="text-lg mb-2">Aucun café ne correspond à vos filtres.</p>
            <button onClick={clearFilters} className="text-[#C8A96E] font-semibold hover:text-[#D4BC8A]">
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {/* Custom sourcing */}
        <div className="mt-16 text-center p-8 bg-[#1A1A17] border border-[#2A2A25] rounded-xl">
          <p className="text-[#A8A49C] mb-3">Vous ne trouvez pas ce que vous cherchez ?</p>
          <Link href="/contact" className="text-[#C8A96E] font-semibold hover:text-[#D4BC8A]">
            Contactez-nous pour un sourcing sur mesure →
          </Link>
        </div>
      </div>

      {/* Floating quote button */}
      <AnimatePresence>
        {selectedCoffees.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
          >
            <Link
              href={`/devis?cafes=${encodeURIComponent(selectedCoffeeNames)}`}
              className="flex items-center gap-3 bg-[#C8A96E] text-[#0A0A08] px-6 py-3.5 rounded-full font-semibold shadow-lg shadow-[#C8A96E]/20 hover:bg-[#D4BC8A] transition-colors"
            >
              <ShoppingCart size={18} />
              Demander un devis ({selectedCoffees.length} café{selectedCoffees.length > 1 ? "s" : ""})
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
