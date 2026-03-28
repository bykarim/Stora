import type { Metadata } from "next";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez Stora, importateur de café vert de spécialité. Adresse, téléphone, email et formulaire de contact.",
};

export default function ContactPage() {
  return <ContactContent />;
}
