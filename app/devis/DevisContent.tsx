"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
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

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

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

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await fetch("/api/devis", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      setSubmitted(true);
    } catch { alert("Erreur. Veuillez réessayer."); }
    finally { setLoading(false); }
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
        <CheckCircle size={48} className="text-[#C8A96E] mx-auto mb-6" />
        <h2 className="heading-card text-white mb-3">Demande envoyée</h2>
        <p className="text-sm text-white/40">Nous reviendrons vers vous sous 24h.</p>
      </motion.div>
    );
  }

  const inputClass = "w-full bg-transparent border-b border-white/10 px-0 py-4 text-sm text-white placeholder:text-white/20 outline-none focus:border-white/40 transition-colors duration-300";
  const selectClass = "w-full bg-black border-b border-white/10 px-0 py-4 text-sm text-white outline-none focus:border-white/40 transition-colors duration-300";
  const errorClass = "text-[11px] text-red-400/80 mt-1";

  return (
    <motion.form onSubmit={handleSubmit(onSubmit)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl mx-auto space-y-2">
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
    </motion.form>
  );
}

export function DevisContent() {
  return (
    <div className="pt-32 pb-20 px-10">
      <div className="max-w-4xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="text-center mb-16">
          <motion.div variants={fadeUp} className="accent-line mx-auto mb-6" />
          <motion.h1 variants={fadeUp} className="heading-section text-white mb-3">Demande de devis</motion.h1>
          <motion.p variants={fadeUp} className="text-body text-white/40">Réponse garantie sous 24h.</motion.p>
        </motion.div>
        <Suspense fallback={<div className="text-center text-white/20">Chargement...</div>}>
          <DevisForm />
        </Suspense>
      </div>
    </div>
  );
}
