"use client";

import { useState, useEffect, useRef } from "react";
import { CheckCircle } from "lucide-react";

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

  const inputClass = "w-full bg-white border border-[#e5e5e0] rounded-lg px-4 py-3.5 text-sm text-[#1a1a1a] placeholder:text-[#999] outline-none focus:border-[#67b99a] focus:ring-1 focus:ring-[#67b99a]/20 transition-all duration-300";

  return (
    <div className="section-light" style={{ marginTop: 106 }}>
      <div className="max-w-5xl mx-auto px-10 py-20">
        <div className="text-center mb-20">
          <FadeSection>
            <p className="text-overline mb-4">Parlons cafe</p>
          </FadeSection>
          <FadeSection delay={0.1}>
            <h1 className="heading-section text-[#1a1a1a] mb-3">Contact</h1>
          </FadeSection>
          <FadeSection delay={0.2}>
            <p className="text-body text-[#666]">
              Une question, un projet ? Nous sommes a votre ecoute.
            </p>
          </FadeSection>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* Info */}
          <FadeSection>
            <div className="space-y-2">
              {[
                { label: "Email", value: "contact@stora-cafe.fr" },
                { label: "Telephone", value: "+33 1 23 45 67 89" },
                { label: "Adresse", value: "12 Rue du Commerce\n75015 Paris, France" },
                { label: "Horaires", value: "Lundi — Vendredi\n9h00 — 18h00" },
              ].map((info) => (
                <div key={info.label} className="bg-white border border-[#e5e5e0] rounded-xl p-6">
                  <span className="text-overline block mb-2">{info.label}</span>
                  <span className="text-sm text-[#1a1a1a] whitespace-pre-line">{info.value}</span>
                </div>
              ))}
            </div>
          </FadeSection>

          {/* Form */}
          <FadeSection delay={0.15}>
            {submitted ? (
              <div className="text-center py-16 bg-white border border-[#e5e5e0] rounded-xl">
                <CheckCircle size={40} className="text-[#67b99a] mx-auto mb-4" />
                <h3 className="heading-card text-[#1a1a1a] mb-2">Message envoye</h3>
                <p className="text-sm text-[#666]">Nous reviendrons vers vous rapidement.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs text-[#999] uppercase tracking-widest block mb-2">Nom complet</label>
                  <input required type="text" className={inputClass} placeholder="Votre nom" />
                </div>
                <div>
                  <label className="text-xs text-[#999] uppercase tracking-widest block mb-2">Email</label>
                  <input required type="email" className={inputClass} placeholder="votre@email.fr" />
                </div>
                <div>
                  <label className="text-xs text-[#999] uppercase tracking-widest block mb-2">Message</label>
                  <textarea required rows={5} className={`${inputClass} resize-none`} placeholder="Comment pouvons-nous vous aider ?" />
                </div>
                <div className="pt-4">
                  <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
                    {loading ? "Envoi..." : "Envoyer le message"}
                  </button>
                </div>
              </form>
            )}
          </FadeSection>
        </div>
      </div>
    </div>
  );
}
