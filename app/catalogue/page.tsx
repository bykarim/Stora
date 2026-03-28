import type { Metadata } from "next";
import { CatalogueContent } from "./CatalogueContent";

export const metadata: Metadata = {
  title: "Catalogue",
  description: "Découvrez notre sélection de cafés verts de spécialité. Filtrez par origine, process et score SCA.",
};

export default function CataloguePage() {
  return <CatalogueContent />;
}
