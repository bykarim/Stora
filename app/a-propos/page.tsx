import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "À propos",
  description: "Découvrez Stora, importateur de café vert de spécialité en France. Notre mission, nos valeurs, notre approche.",
};

export default function AboutPage() {
  return <AboutContent />;
}
