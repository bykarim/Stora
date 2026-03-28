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
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
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
      <FadeSection className="text-center py-20">
        <CheckCircle size={48} className="text-[#C8A96E] mx-auto mb-6" />
        <h2 className="heading-card text-white mb-3">Demande envoyée</h2>
        <p className="text-sm text-white/40">Nous reviendrons vers vous sous 24h.</p>
      </FadeSection>
    );
  }

  const inputClass = "w-full bg-transparent border-b border-white/10 px-0 py-4 text-sm text-white placeholder:text-white/20 outline-none focus:border-white/40 transition-colors duration-300";
  const selectClass = "w-full bg-black border-b border-white/10 px-0 py-4 text-sm text-white outline-none focus:border-white/40 transition-colors duration-300";
  const errorClass = "text-[11px] text-red-400/80 mt-1";

  return (
    <FadeSection className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <div>
            <input {...register("societe")} className={inputClass} placeholder="Société *" />
            {errors.societe && <p className={errorClass}>{errors.societe.message}</p>}
          </div>
          <div>
            <input {...register("nom")} className={inputClass} placeholder="Nom et prénom *" />
            {errors.nom && <p className={errorClass}>{errors.nom.message}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <div>
            <input {...register("email")} type="email" className={inputClass} placeholder="Email professionnel *" />
            {errors.email && <p className={errorClass}>{errors.email.message}</p>}
          </div>
          <div>
            <input {...register("telephone")} type="tel" className={inputClass} placeholder="Téléphone" />
          </div>
        </div>
        <div>
          <select {...register("typeActivite")} className={selectClass}>
            <option value="">Type d&apos;activité *</option>
            <option value="torrefacteur">Torréfacteur artisanal</option>
            <option value="coffeeshop">Coffee shop</option>
            <option value="restaurant">Restaurant / Hôtel</option>
            <option value="formation">Formation barista</option>
            <option value="autre">Autre</option>
          </select>
          {errors.typeActivite && <p className={errorClass}>{errors.typeActivite.message}</p>}
        </div>
        <textarea {...register("cafesSelectionnes")} rows={2} className={`${inputClass} resize-none`} placeholder="Cafés sélectionnés" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <input {...register("volumeEstime")} className={inputClass} placeholder="Volume estimé (ex: 300kg/mois)" />
          <select {...register("frequence")} className={selectClass}>
            <option value="">Fréquence</option>
            <option value="ponctuel">Ponctuel</option>
            <option value="mensuel">Mensuel</option>
            <option value="trimestriel">Trimestriel</option>
            <option value="autre">Autre</option>
          </select>
        </div>
        <textarea {...register("message")} rows={3} className={`${inputClass} resize-none`} placeholder="Message / besoins spécifiques" />
        <div className="pt-8">
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
            {loading ? "Envoi en cours..." : "Envoyer la demande"}
          </button>
        </div>
      </form>
    </FadeSection>
  );
}

export function DevisContent() {
  return (
    <div className="pt-32 pb-20 px-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <FadeSection><div className="accent-line mx-auto mb-6" /></FadeSection>
          <FadeSection delay={0.1}><h1 className="heading-section text-white mb-3">Demande de devis</h1></FadeSection>
          <FadeSection delay={0.2}><p className="text-body text-white/40">Réponse garantie sous 24h.</p></FadeSection>
        </div>
        <Suspense fallback={<div className="text-center text-white/20">Chargement...</div>}>
          <DevisForm />
        </Suspense>
      </div>
    </div>
  );
}
