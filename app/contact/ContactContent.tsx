"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function ContactContent() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  const inputClass = "w-full bg-transparent border-b border-white/10 px-0 py-4 text-sm text-white placeholder:text-white/20 outline-none focus:border-white/40 transition-colors duration-300";

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-10">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="text-center mb-20">
          <motion.div variants={fadeUp} className="accent-line mx-auto mb-6" />
          <motion.h1 variants={fadeUp} className="heading-section text-white mb-3">Contact</motion.h1>
          <motion.p variants={fadeUp} className="text-body text-white/40">
            Une question, un projet ? Parlons café.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="space-y-8">
              {[
                { label: "Email", value: "contact@stora-cafe.fr" },
                { label: "Téléphone", value: "+33 1 23 45 67 89" },
                { label: "Adresse", value: "12 Rue du Commerce\n75015 Paris, France" },
                { label: "Horaires", value: "Lundi — Vendredi\n9h00 — 18h00" },
              ].map((info) => (
                <div key={info.label}>
                  <span className="text-[11px] text-white/20 uppercase tracking-widest block mb-1">{info.label}</span>
                  <span className="text-sm text-white/60 whitespace-pre-line">{info.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            {submitted ? (
              <div className="text-center py-16">
                <CheckCircle size={40} className="text-[#C8A96E] mx-auto mb-4" />
                <h3 className="heading-card text-white mb-2">Message envoyé</h3>
                <p className="text-sm text-white/40">Nous reviendrons vers vous rapidement.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <input required type="text" className={inputClass} placeholder="Nom complet" />
                <input required type="email" className={inputClass} placeholder="Email" />
                <textarea required rows={4} className={`${inputClass} resize-none`} placeholder="Message" />
                <div className="pt-6">
                  <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
                    {loading ? "Envoi..." : "Envoyer"}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
