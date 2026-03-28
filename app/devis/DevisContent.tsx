"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle } from "lucide-react";

const schema = z.object({
  societe: z.string().min(1, "Requis"),
  nom: z.string().min(1, "Requis"),
  email: z.string().email("Email invalide"),
  telephone: z.string().optional(),
  typeActivite: z.string().min(1, "Requis"),
  cafesSelectionnes: z.string().optional(),
  volumeEstime: z.string().optional(),
  frequence: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

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

function DevisForm() {
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const cafes = searchParams.get("cafes");
    if (cafes) setValue("cafesSelectionnes", cafes);
  }, [searchParams, setValue]);

  const onSubmit = async (_data: FormData) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <FadeSection className="text-center py-20 bg-white border border-[#e5e5e0] rounded-xl">
        <CheckCircle size={48} className="text-[#67b99a] mx-auto mb-6" />
        <h2 className="heading-card text-[#1a1a1a] mb-3">Demande envoyee</h2>
        <p className="text-sm text-[#666]">Nous reviendrons vers vous sous 24h.</p>
      </FadeSection>
    );
  }

  const inputClass = "w-full bg-white border border-[#e5e5e0] rounded-lg px-4 py-3.5 text-sm text-[#1a1a1a] placeholder:text-[#999] outline-none focus:border-[#67b99a] focus:ring-1 focus:ring-[#67b99a]/20 transition-all duration-300";
  const selectClass = "w-full bg-white border border-[#e5e5e0] rounded-lg px-4 py-3.5 text-sm text-[#1a1a1a] outline-none focus:border-[#67b99a] focus:ring-1 focus:ring-[#67b99a]/20 transition-all duration-300 appearance-none";
  const errorClass = "text-[11px] text-red-500 mt-1";
  const labelClass = "text-xs text-[#999] uppercase tracking-widest block mb-2";

  return (
    <FadeSection className="max-w-2xl mx-auto">
      <div className="bg-white border border-[#e5e5e0] rounded-xl p-8 md:p-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Societe *</label>
              <input {...register("societe")} className={inputClass} placeholder="Nom de la societe" />
              {errors.societe && <p className={errorClass}>{errors.societe.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Nom et prenom *</label>
              <input {...register("nom")} className={inputClass} placeholder="Votre nom complet" />
              {errors.nom && <p className={errorClass}>{errors.nom.message}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Email professionnel *</label>
              <input {...register("email")} type="email" className={inputClass} placeholder="votre@email.fr" />
              {errors.email && <p className={errorClass}>{errors.email.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Telephone</label>
              <input {...register("telephone")} type="tel" className={inputClass} placeholder="+33 ..." />
            </div>
          </div>
          <div>
            <label className={labelClass}>Type d&apos;activite *</label>
            <select {...register("typeActivite")} className={selectClass}>
              <option value="">Selectionnez...</option>
              <option value="torrefacteur">Torrefacteur artisanal</option>
              <option value="coffeeshop">Coffee shop</option>
              <option value="restaurant">Restaurant / Hotel</option>
              <option value="formation">Formation barista</option>
              <option value="autre">Autre</option>
            </select>
            {errors.typeActivite && <p className={errorClass}>{errors.typeActivite.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Cafes selectionnes</label>
            <textarea {...register("cafesSelectionnes")} rows={2} className={`${inputClass} resize-none`} placeholder="Noms des cafes qui vous interessent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Volume estime</label>
              <input {...register("volumeEstime")} className={inputClass} placeholder="ex: 300kg/mois" />
            </div>
            <div>
              <label className={labelClass}>Frequence</label>
              <select {...register("frequence")} className={selectClass}>
                <option value="">Selectionnez...</option>
                <option value="ponctuel">Ponctuel</option>
                <option value="mensuel">Mensuel</option>
                <option value="trimestriel">Trimestriel</option>
                <option value="autre">Autre</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Message / besoins specifiques</label>
            <textarea {...register("message")} rows={3} className={`${inputClass} resize-none`} placeholder="Decrivez vos besoins..." />
          </div>
          <div className="pt-4">
            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
              {loading ? "Envoi en cours..." : "Envoyer la demande"}
            </button>
          </div>
        </form>
      </div>
    </FadeSection>
  );
}

export function DevisContent() {
  return (
    <div className="section-alt" style={{ marginTop: 106 }}>
      <div className="max-w-4xl mx-auto px-10 py-20">
        <div className="text-center mb-16">
          <FadeSection>
            <p className="text-overline mb-4">Devis</p>
          </FadeSection>
          <FadeSection delay={0.1}>
            <h1 className="heading-section text-[#1a1a1a] mb-3">Demande de devis</h1>
          </FadeSection>
          <FadeSection delay={0.2}>
            <p className="text-body text-[#666]">Reponse garantie sous 24h.</p>
          </FadeSection>
        </div>
        <Suspense fallback={<div className="text-center text-[#999]">Chargement...</div>}>
          <DevisForm />
        </Suspense>
      </div>
    </div>
  );
}
