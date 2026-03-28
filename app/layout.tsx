import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: {
    default: "Stora — Importateur de café vert de spécialité",
    template: "%s | Stora",
  },
  description:
    "Importateur de café vert de spécialité en France. Lots fractionnés dès 30kg, traçabilité complète, sourcing direct auprès des producteurs.",
  openGraph: {
    title: "Stora — Importateur de café vert de spécialité",
    description:
      "Du terroir à votre torréfacteur. Café vert de spécialité, lots fractionnés, traçabilité complète.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
