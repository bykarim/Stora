import type { Metadata } from "next";
import { CommanderContent } from "./CommanderContent";

export const metadata: Metadata = {
  title: "Commander ma tuile",
  description:
    "Équipez votre commerce de la tuile 1keti et offrez à vos clients un ticket de caisse dématérialisé en un tap.",
};

export default function CommanderPage() {
  return <CommanderContent />;
}
