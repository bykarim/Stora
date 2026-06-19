"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { FoxMark } from "@/components/Logo";

const schema = z.object({
  commerce: z.string().min(2, "Indiquez le nom de votre commerce"),
  type: z.string().min(1, "Choisissez un type"),
  contact: z.string().min(2, "Indiquez votre nom"),
  email: z.string().email("Email invalide"),
  telephone: z
    .string()
    .min(8, "Numéro trop court")
    .regex(/^[0-9 +().-]+$/, "Numéro invalide"),
  quantite: z.coerce.number().int().min(1, "Au moins 1").max(500, "Maximum 500"),
  message: z.string().max(600, "600 caractères maximum").optional(),
});

type FormValues = z.input<typeof schema>;

const types = [
  "Café / Restaurant",
  "Boulangerie",
  "Commerce de détail",
  "Boutique mode",
  "Salon / Services",
  "Autre",
];

export function CommanderContent() {
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { quantite: 1, type: "" },
  });

  const onSubmit = handleSubmit(async () => {
    // Export statique : pas de backend. On simule l'envoi.
    await new Promise((r) => setTimeout(r, 700));
    setDone(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  if (done) {
    return (
      <section className="section pt-28 sm:pt-32">
        <div className="container-x max-w-lg text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-ink text-white">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
          <h1 className="h-section mt-7">Demande envoyée&nbsp;!</h1>
          <p className="lead mt-4">
            Merci. Notre équipe vous recontacte sous 24&nbsp;h ouvrées pour
            préparer la mise en place de votre tuile 1keti.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn btn-dark">
              Retour à l’accueil
            </Link>
            <Link href="/ticket" className="btn btn-ghost">
              Revoir la démo
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section pt-28 sm:pt-32">
      <div className="container-x grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        {/* colonne gauche */}
        <div>
          <span className="eyebrow">Commander</span>
          <h1 className="h-section mt-4">Équipez votre commerce</h1>
          <p className="lead mt-5">
            Dites-nous en un peu plus sur votre activité. Nous préparons votre
            tuile 1keti et vous accompagnons pour la connecter à votre caisse.
          </p>

          <ul className="mt-10 space-y-5">
            <Bullet title="Installation guidée">
              On vous accompagne pas à pas, à distance, en moins de 30 minutes.
            </Bullet>
            <Bullet title="Sans engagement">
              Testez 1keti sereinement. Pas de matériel propriétaire imposé.
            </Bullet>
            <Bullet title="Support réactif">
              Une question&nbsp;? Notre équipe répond sous 24&nbsp;h ouvrées.
            </Bullet>
          </ul>

          <div className="mt-10 flex items-center gap-3 rounded-2xl border border-border bg-surface p-5">
            <FoxMark className="h-9 w-9 shrink-0 text-ink" />
            <p className="body text-[0.9rem]">
              Vous préférez en discuter&nbsp;?{" "}
              <a className="font-medium text-ink underline underline-offset-4" href="mailto:bonjour@1keti.app">
                bonjour@1keti.app
              </a>
            </p>
          </div>
        </div>

        {/* formulaire */}
        <div className="card p-7 sm:p-9">
          <form onSubmit={onSubmit} noValidate className="space-y-5">
            <Field label="Nom du commerce" error={errors.commerce?.message}>
              <input className="inp" placeholder="Le Comptoir du Marché" {...register("commerce")} />
            </Field>

            <Field label="Type de commerce" error={errors.type?.message}>
              <select className="inp" defaultValue="" {...register("type")}>
                <option value="" disabled>
                  Sélectionnez…
                </option>
                {types.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Votre nom" error={errors.contact?.message}>
                <input className="inp" placeholder="Camille Durand" {...register("contact")} />
              </Field>
              <Field label="Nombre de tuiles" error={errors.quantite?.message}>
                <input type="number" min={1} className="inp" {...register("quantite")} />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Email" error={errors.email?.message}>
                <input type="email" className="inp" placeholder="vous@commerce.fr" {...register("email")} />
              </Field>
              <Field label="Téléphone" error={errors.telephone?.message}>
                <input type="tel" className="inp" placeholder="06 12 34 56 78" {...register("telephone")} />
              </Field>
            </div>

            <Field label="Message (optionnel)" error={errors.message?.message}>
              <textarea
                rows={4}
                className="inp resize-none"
                placeholder="Votre logiciel de caisse, vos besoins…"
                {...register("message")}
              />
            </Field>

            <button type="submit" className="btn btn-dark btn-block btn-lg" disabled={isSubmitting}>
              {isSubmitting ? "Envoi…" : "Envoyer ma demande"}
            </button>
            <p className="text-center text-[0.78rem] text-muted">
              En envoyant ce formulaire, vous acceptez d’être recontacté par 1keti.
            </p>
          </form>
        </div>
      </div>

      <style>{`
        .inp {
          width: 100%;
          border: 1px solid var(--color-border-strong);
          border-radius: 12px;
          background: #fff;
          padding: 12px 14px;
          font-size: 0.95rem;
          color: var(--color-ink);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          outline: none;
        }
        .inp::placeholder { color: var(--color-muted); }
        .inp:focus {
          border-color: var(--color-ink);
          box-shadow: 0 0 0 3px rgba(10,10,10,0.06);
        }
      `}</style>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[0.85rem] font-medium text-ink">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-[0.78rem] text-red-600">{error}</span>}
    </label>
  );
}

function Bullet({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-white">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
      <div>
        <h4 className="font-semibold tracking-tight text-ink">{title}</h4>
        <p className="body mt-1 text-[0.92rem]">{children}</p>
      </div>
    </li>
  );
}
