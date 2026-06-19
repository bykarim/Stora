# 1keti — Le ticket de caisse dématérialisé en un tap

Plateforme web de la solution **1keti** : une tuile NFC posée sur le comptoir
d'un commerce. Le client approche son téléphone, reçoit instantanément son
ticket de caisse dématérialisé et l'enregistre en **PDF** ou en **image** —
sans application, sans email, sans papier.

## Pages

- **`/`** — page d'accueil : présentation du concept, fonctionnement, la tuile,
  formats (PDF / image), avantages et FAQ.
- **`/ticket`** — démonstration interactive : on « tape » la tuile, un ticket
  de caisse est généré sur `<canvas>` et peut être téléchargé en PDF, en PNG ou
  partagé via le partage natif du téléphone.
- **`/commander`** — formulaire de commande (validation côté client).

## Stack

- **Next.js 16** (App Router) en **export statique** (`output: "export"`).
- **Tailwind CSS v4** — design sobre, noir & blanc.
- **jsPDF** pour l'export PDF, **Canvas 2D** pour le rendu du ticket et l'image.
- **react-hook-form + zod** pour le formulaire de commande.

Le ticket affiché à l'écran, le PNG et le PDF proviennent tous du **même rendu
canvas** (`lib/receipt.ts`) : une seule source de vérité.

## Développement

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build statique

```bash
npm run build    # génère le dossier ./out
```

Le site est entièrement statique et peut être hébergé sur n'importe quel
serveur de fichiers (GitHub Pages, etc.).
