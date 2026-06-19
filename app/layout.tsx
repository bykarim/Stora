import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://1keti.app"),
  title: {
    default: "1keti — Le ticket de caisse dématérialisé en un tap",
    template: "%s · 1keti",
  },
  description:
    "Approchez votre téléphone de la tuile 1keti et recevez votre ticket de caisse dématérialisé instantanément. Enregistrez-le en PDF ou en image. Sans application, sans email, sans papier.",
  keywords: [
    "ticket de caisse dématérialisé",
    "reçu numérique",
    "NFC",
    "tuile 1keti",
    "ticket PDF",
    "sans papier",
  ],
  openGraph: {
    title: "1keti — Le ticket de caisse dématérialisé en un tap",
    description:
      "Un tap suffit. Recevez votre ticket de caisse sur votre téléphone et enregistrez-le en PDF ou en image.",
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
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
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
