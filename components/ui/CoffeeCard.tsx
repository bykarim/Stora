"use client";

import { motion } from "framer-motion";
import { Mountain, Droplets, Award, Calendar, Beaker, DollarSign } from "lucide-react";
import type { Coffee } from "@/lib/data";

interface CoffeeCardProps {
  coffee: Coffee;
  selected?: boolean;
  onToggleSelect?: (id: string) => void;
  compact?: boolean;
}

export function CoffeeCard({ coffee, selected, onToggleSelect, compact }: CoffeeCardProps) {
  const scoreColor =
    coffee.score >= 88 ? "text-emerald-400" : coffee.score >= 85 ? "text-[#C8A96E]" : "text-[#A8A49C]";
  const scoreWidth = `${((coffee.score - 75) / 15) * 100}%`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className={`bg-[#1A1A17] border rounded-xl overflow-hidden transition-all duration-200 hover:border-[#C8A96E]/30 hover:shadow-lg hover:shadow-[#C8A96E]/5 ${
        selected ? "border-[#C8A96E] ring-1 ring-[#C8A96E]/20" : "border-[#2A2A25]"
      }`}
    >
      {/* Header */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{coffee.flag}</span>
              <span className="text-xs font-medium text-[#A8A49C] uppercase tracking-wider">{coffee.origin}</span>
            </div>
            <h3 className="text-lg font-bold text-[#F0EDE6] font-[family-name:var(--font-serif)]">{coffee.name}</h3>
          </div>
          <div className={`text-right ${scoreColor}`}>
            <div className="text-2xl font-bold font-[family-name:var(--font-mono)]">{coffee.score}</div>
            <div className="text-[10px] uppercase tracking-wider opacity-70">SCA</div>
          </div>
        </div>

        {/* Score bar */}
        <div className="w-full h-1 bg-[#2A2A25] rounded-full mb-3">
          <div className={`h-full rounded-full bg-[#C8A96E]`} style={{ width: scoreWidth }} />
        </div>

        {/* Tasting notes */}
        <p className="text-sm italic text-[#C8A96E] mb-4">{coffee.notes}</p>

        {/* Info grid */}
        {!compact && (
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-[#A8A49C]">
              <MapPinIcon /> {coffee.region}
            </div>
            <div className="flex items-center gap-1.5 text-[#A8A49C]">
              <Mountain size={12} className="text-[#C8A96E] shrink-0" /> {coffee.altitude}
            </div>
            <div className="flex items-center gap-1.5 text-[#A8A49C]">
              <Droplets size={12} className="text-[#C8A96E] shrink-0" /> {coffee.process}
            </div>
            <div className="flex items-center gap-1.5 text-[#A8A49C]">
              <Beaker size={12} className="text-[#C8A96E] shrink-0" /> {coffee.varietal}
            </div>
            <div className="flex items-center gap-1.5 text-[#A8A49C]">
              <Calendar size={12} className="text-[#C8A96E] shrink-0" /> {coffee.harvest}
            </div>
            <div className="flex items-center gap-1.5 text-[#F0EDE6] font-semibold">
              <DollarSign size={12} className="text-[#C8A96E] shrink-0" /> {coffee.priceFob}/kg FOB
            </div>
          </div>
        )}
      </div>

      {/* Action */}
      {onToggleSelect && (
        <div className="px-5 py-3 border-t border-[#2A2A25]">
          <button
            onClick={() => onToggleSelect(coffee.id)}
            className={`w-full py-2 rounded-lg text-sm font-semibold transition-all ${
              selected
                ? "bg-[#C8A96E] text-[#0A0A08]"
                : "bg-[#2A2A25] text-[#A8A49C] hover:bg-[#333] hover:text-[#F0EDE6]"
            }`}
          >
            {selected ? "✓ Sélectionné" : "Ajouter au devis"}
          </button>
        </div>
      )}
    </motion.div>
  );
}

function MapPinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#C8A96E] shrink-0">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
