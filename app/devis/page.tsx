import type { Metadata } from "next";
import { DevisContent } from "./DevisContent";

export const metadata: Metadata = {
  title: "Demander un devis",
  description: "Demandez un devis personnalisé pour du café vert de spécialité. Réponse garantie sous 24h.",
};

export default function DevisPage() {
  return <DevisContent />;
}
