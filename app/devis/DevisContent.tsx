"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send, CheckCircle, FileText } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";

const schema = z.object({
  societe: z.string().min(1, "Le nom de la société est requis"),
  nom: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Adresse email invalide"),
  telephone: z.string().optional(),
  typeActivite: z.string().min(1, "Veuillez sélectionner un type d'activité"),
  cafesSelectionnes: z.string().optional(),
  volumeEstime: z.string().optional(),
  frequence: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

function DevisForm() {
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const cafes = searchParams.get("cafes");
    if (cafes) setValue("cafesSelectionnes", cafes);
  }, [searchParams, setValue]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSubmitted(true);
    } catch {
      alert("Erreur lors de l'envoi. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg mx-auto text-center py-20">
        <CheckCircle size={64} className="text-[#C8A96E] mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-[#F0EDE6] font-[family-name:var(--font-serif)] mb-3">Demande envoyée !</h2>
        <p className="text-[#A8A49C] text-lg">Merci pour votre demande. Nous reviendrons vers vous sous 24h avec un devis personnalisé.</p>
      </motion.div>
    );
  }

  const inputClass = "w-full bg-[#1A1A17] border border-[#2A2A25] rounded-lg px-4 py-3 text-sm text-[#F0EDE6] placeholder:text-[#555] outline-none focus:border-[#C8A96E] transition-colors";
  const labelClass = "block text-sm font-medium text-[#A8A49C] mb-1.5";
  const errorClass = "text-xs text-red-400 mt-1";

  return (
    <motion.form onSubmit={handleSubmit(onSubmit)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl mx-auto space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Société *</label>
          <input {...register("societe")} className={inputClass} placeholder="Nom de votre entreprise" />
          {errors.societe && <p className={errorClass}>{errors.societe.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Nom et prénom *</label>
          <input {...register("nom")} className={inputClass} placeholder="Jean Dupont" />
          {errors.nom && <p className={errorClass}>{errors.nom.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Email professionnel *</label>
          <input {...register("email")} type="email" className={inputClass} placeholder="jean@entreprise.fr" />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Téléphone</label>
          <input {...register("telephone")} type="tel" className={inputClass} placeholder="+33 6 12 34 56 78" />
        </div>
      </div>

      <div>
        <label className={labelClass}>Type d&apos;activité *</label>
        <select {...register("typeActivite")} className={inputClass}>
          <option value="">Sélectionnez...</option>
          <option value="torrefacteur">Torréfacteur artisanal</option>
          <option value="coffeeshop">Coffee shop</option>
          <option value="restaurant">Restaurant / Hôtel</option>
          <option value="formation">Formation barista</option>
          <option value="autre">Autre</option>
        </select>
        {errors.typeActivite && <p className={errorClass}>{errors.typeActivite.message}</p>}
      </div>

      <div>
        <label className={labelClass}>Cafés sélectionnés</label>
        <textarea {...register("cafesSelectionnes")} rows={2} className={`${inputClass} resize-none`} placeholder="Ex: Yirgacheffe Kochere, Kiambu AA..." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Volume estimé</label>
          <input {...register("volumeEstime")} className={inputClass} placeholder="Ex: 300kg/mois, 1 conteneur/trimestre" />
        </div>
        <div>
          <label className={labelClass}>Fréquence souhaitée</label>
          <select {...register("frequence")} className={inputClass}>
            <option value="">Sélectionnez...</option>
            <option value="ponctuel">Ponctuel</option>
            <option value="mensuel">Mensuel</option>
            <option value="trimestriel">Trimestriel</option>
            <option value="autre">Autre</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Message / besoins spécifiques</label>
        <textarea {...register("message")} rows={4} className={`${inputClass} resize-none`} placeholder="Décrivez vos besoins, contraintes, questions..." />
      </div>

      <button type="submit" disabled={loading} className="w-full bg-[#C8A96E] text-[#0A0A08] py-3.5 rounded-lg font-semibold hover:bg-[#D4BC8A] transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
        {loading ? "Envoi en cours..." : <><Send size={16} /> Envoyer la demande de devis</>}
      </button>
    </motion.form>
  );
}

export function DevisContent() {
  return (
    <div className="pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionTitle tag="Devis" title="Demandez un devis" subtitle="Remplissez le formulaire ci-dessous et recevez un devis personnalisé sous 24h." />
        <Suspense fallback={<div className="text-center text-[#A8A49C]">Chargement...</div>}>
          <DevisForm />
        </Suspense>
      </div>
    </div>
  );
}
