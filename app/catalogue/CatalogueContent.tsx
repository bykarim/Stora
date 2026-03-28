"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { coffees, origins, processes, scoreRanges } from "@/lib/data";

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
    `px-4 py-2 text-xs tracking-wide rounded-full border transition-all duration-200 cursor-pointer ${
      active
        ? "bg-[#67b99a] text-white border-[#67b99a]"
        : "bg-white text-[#666] border-[#e5e5e0] hover:border-[#67b99a] hover:text-[#1a1a1a]"
    }`;

  return (
    <div className="section-light" style={{ marginTop: 106 }}>
      <div className="max-w-6xl mx-auto px-10 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeSection>
            <p className="text-overline mb-4">Collection</p>
          </FadeSection>
          <FadeSection delay={0.1}>
            <h1 className="heading-section text-[#1a1a1a] mb-3">Nos cafes verts</h1>
          </FadeSection>
          <FadeSection delay={0.2}>
            <p className="text-body text-[#666] max-w-lg mx-auto">
              Selectionnes avec soin aupres des meilleurs producteurs.
            </p>
          </FadeSection>
        </div>

        {/* Filters */}
        <FadeSection delay={0.25}>
          <div className="mb-12 space-y-6 bg-[#f5f5f0] rounded-xl p-8">
            <div className="flex items-center justify-between">
              <span className="text-overline">Filtres</span>
              {hasFilters && (
                <button onClick={clearFilters} className="text-xs text-[#67b99a] hover:text-[#1a1a1a] transition-colors">
                  Reinitialiser
                </button>
              )}
            </div>

            <div>
              <span className="text-xs text-[#999] uppercase tracking-widest block mb-3">Origine</span>
              <div className="flex flex-wrap gap-2">
                {origins.map((o) => (
                  <button key={o} onClick={() => toggle(selectedOrigins, setSelectedOrigins, o)} className={chipClass(selectedOrigins.includes(o))}>
                    {o}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs text-[#999] uppercase tracking-widest block mb-3">Process</span>
              <div className="flex flex-wrap gap-2">
                {processes.map((p) => (
                  <button key={p} onClick={() => toggle(selectedProcesses, setSelectedProcesses, p)} className={chipClass(selectedProcesses.includes(p))}>
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs text-[#999] uppercase tracking-widest block mb-3">Score SCA</span>
              <div className="flex flex-wrap gap-2">
                {scoreRanges.map((r) => (
                  <button key={r.label} onClick={() => setSelectedScoreRange(selectedScoreRange === r.label ? null : r.label)} className={chipClass(selectedScoreRange === r.label)}>
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px bg-[#e5e5e0]" />
            <span className="text-xs text-[#999]">{filtered.length} resultat{filtered.length > 1 ? "s" : ""}</span>
          </div>
        </FadeSection>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((coffee, i) => {
            const isSelected = selectedCoffees.includes(coffee.id);
            return (
              <FadeSection
                key={coffee.id}
                delay={i * 0.05}
                className={`bg-white rounded-xl border border-[#e5e5e0] p-8 transition-all duration-300 card-hover ${isSelected ? "ring-2 ring-[#67b99a]" : ""}`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{coffee.flag}</span>
                  <span className="text-overline">{coffee.origin}</span>
                </div>
                <h3 className="heading-card text-[#1a1a1a] mb-2">{coffee.name}</h3>
                <p className="text-sm italic text-[#67b99a] mb-5">{coffee.notes}</p>

                <div className="grid grid-cols-2 gap-3 text-xs text-[#666] mb-5">
                  <div><span className="text-[#999] block mb-0.5">Region</span>{coffee.region}</div>
                  <div><span className="text-[#999] block mb-0.5">Altitude</span>{coffee.altitude}</div>
                  <div><span className="text-[#999] block mb-0.5">Process</span>{coffee.process}</div>
                  <div><span className="text-[#999] block mb-0.5">Varietal</span>{coffee.varietal}</div>
                  <div><span className="text-[#999] block mb-0.5">Recolte</span>{coffee.harvest}</div>
                  <div><span className="text-[#999] block mb-0.5">Score SCA</span><span className="text-[#1a1a1a] font-mono font-medium">{coffee.score}</span></div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#e5e5e0]">
                  <span className="text-sm text-[#1a1a1a] font-medium">{coffee.priceFob}/kg FOB</span>
                  <button
                    onClick={() => toggleCoffee(coffee.id)}
                    className={`text-xs px-4 py-2 rounded-full transition-all duration-200 ${
                      isSelected
                        ? "bg-[#67b99a] text-white"
                        : "border border-[#e5e5e0] text-[#666] hover:border-[#67b99a] hover:text-[#67b99a]"
                    }`}
                  >
                    {isSelected ? "✓ Selectionne" : "Ajouter au devis"}
                  </button>
                </div>
              </FadeSection>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#999] mb-4">Aucun cafe ne correspond a vos filtres.</p>
            <button onClick={clearFilters} className="text-sm text-[#67b99a] hover:text-[#1a1a1a] transition-colors">Reinitialiser</button>
          </div>
        )}

        {/* Custom sourcing */}
        <div className="text-center mt-20 py-12 border-t border-b border-[#e5e5e0]">
          <p className="text-sm text-[#999] mb-2">Vous ne trouvez pas ce que vous cherchez ?</p>
          <Link href="/contact" className="discover-link">
            Sourcing sur mesure
          </Link>
        </div>
      </div>

      {/* Floating button */}
      {selectedCoffees.length > 0 && (
        <div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
          style={{ animation: "fadeSlideUp 0.3s ease forwards" }}
        >
          <Link
            href={`/devis?cafes=${encodeURIComponent(selectedNames)}`}
            className="btn-primary flex items-center gap-3 shadow-2xl rounded-full"
          >
            Demander un devis ({selectedCoffees.length})
          </Link>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
