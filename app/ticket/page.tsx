import type { Metadata } from "next";
import { TicketContent } from "./TicketContent";

export const metadata: Metadata = {
  title: "Démo — Recevez un ticket dématérialisé",
  description:
    "Touchez la tuile 1keti pour recevoir un ticket de caisse dématérialisé de démonstration et l'enregistrer en PDF ou en image.",
};

export default function TicketPage() {
  return <TicketContent />;
}
