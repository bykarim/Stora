"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function ContactContent() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Simulate sending
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  const infos = [
    { icon: Mail, label: "Email", value: "contact@stora-cafe.fr" },
    { icon: Phone, label: "Téléphone", value: "+33 1 23 45 67 89" },
    { icon: MapPin, label: "Adresse", value: "12 Rue du Commerce, 75015 Paris" },
    { icon: Clock, label: "Horaires", value: "Lun-Ven : 9h-18h" },
  ];

  return (
    <div className="pt-28 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionTitle tag="Contact" title="Parlons café" subtitle="Une question, un projet ? N'hésitez pas à nous contacter." />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="space-y-6">
              {infos.map((info) => (
                <div key={info.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#C8A96E]/10 flex items-center justify-center shrink-0">
                    <info.icon size={18} className="text-[#C8A96E]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#F0EDE6]">{info.label}</div>
                    <div className="text-sm text-[#A8A49C]">{info.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            {submitted ? (
              <div className="bg-[#1A1A17] border border-[#2A2A25] rounded-xl p-8 text-center">
                <CheckCircle size={48} className="text-[#C8A96E] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#F0EDE6] font-[family-name:var(--font-serif)] mb-2">Message envoyé !</h3>
                <p className="text-[#A8A49C]">Nous reviendrons vers vous dans les plus brefs délais.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#A8A49C] mb-1.5">Nom complet</label>
                  <input required type="text" className="w-full bg-[#1A1A17] border border-[#2A2A25] rounded-lg px-4 py-3 text-sm text-[#F0EDE6] placeholder:text-[#555] outline-none focus:border-[#C8A96E] transition-colors" placeholder="Jean Dupont" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#A8A49C] mb-1.5">Email</label>
                  <input required type="email" className="w-full bg-[#1A1A17] border border-[#2A2A25] rounded-lg px-4 py-3 text-sm text-[#F0EDE6] placeholder:text-[#555] outline-none focus:border-[#C8A96E] transition-colors" placeholder="jean@exemple.fr" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#A8A49C] mb-1.5">Message</label>
                  <textarea required rows={5} className="w-full bg-[#1A1A17] border border-[#2A2A25] rounded-lg px-4 py-3 text-sm text-[#F0EDE6] placeholder:text-[#555] outline-none focus:border-[#C8A96E] transition-colors resize-none" placeholder="Votre message..." />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#C8A96E] text-[#0A0A08] py-3 rounded-lg font-semibold hover:bg-[#D4BC8A] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? "Envoi en cours..." : <><Send size={16} /> Envoyer le message</>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
