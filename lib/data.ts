export interface Coffee {
  id: string;
  name: string;
  origin: string;
  flag: string;
  region: string;
  altitude: string;
  process: "Lavé" | "Natural" | "Honey";
  score: number;
  notes: string;
  priceFob: string;
  varietal: string;
  harvest: string;
  image?: string;
}

export const coffees: Coffee[] = [
  {
    id: "yirgacheffe-kochere",
    name: "Yirgacheffe Kochere",
    origin: "Éthiopie",
    flag: "🇪🇹",
    region: "Gedeo Zone",
    altitude: "1900-2200m",
    process: "Lavé",
    score: 87,
    notes: "Jasmin, bergamote, agrumes",
    priceFob: "6.80€",
    varietal: "Heirloom",
    harvest: "Nov-Fév",
  },
  {
    id: "cerrado-mineiro",
    name: "Cerrado Mineiro",
    origin: "Brésil",
    flag: "🇧🇷",
    region: "Minas Gerais",
    altitude: "1000-1200m",
    process: "Natural",
    score: 84,
    notes: "Chocolat noir, noisette, caramel",
    priceFob: "4.20€",
    varietal: "Catuai / Mundo Novo",
    harvest: "Mai-Sep",
  },
  {
    id: "huila-supremo",
    name: "Huila Supremo",
    origin: "Colombie",
    flag: "🇨🇴",
    region: "Huila",
    altitude: "1600-1900m",
    process: "Lavé",
    score: 86,
    notes: "Fruits rouges, panela, florales",
    priceFob: "5.90€",
    varietal: "Caturra / Castillo",
    harvest: "Avr-Juil",
  },
  {
    id: "nyungwe-highland",
    name: "Nyungwe Highland",
    origin: "Rwanda",
    flag: "🇷🇼",
    region: "Nyamasheke",
    altitude: "1800-2100m",
    process: "Lavé",
    score: 88,
    notes: "Pêche, thé noir, miel",
    priceFob: "7.40€",
    varietal: "Red Bourbon",
    harvest: "Mar-Juin",
  },
  {
    id: "antigua-pastoral",
    name: "Antigua Pastoral",
    origin: "Guatemala",
    flag: "🇬🇹",
    region: "Antigua Valley",
    altitude: "1500-1700m",
    process: "Lavé",
    score: 85,
    notes: "Cacao, épices douces, orange",
    priceFob: "5.50€",
    varietal: "Bourbon / Caturra",
    harvest: "Déc-Mar",
  },
  {
    id: "kiambu-aa",
    name: "Kiambu AA",
    origin: "Kenya",
    flag: "🇰🇪",
    region: "Central Province",
    altitude: "1700-1900m",
    process: "Lavé",
    score: 89,
    notes: "Cassis, tomate, acidité vive",
    priceFob: "8.10€",
    varietal: "SL28 / SL34",
    harvest: "Oct-Déc",
  },
  {
    id: "sidamo-guji",
    name: "Sidamo Guji",
    origin: "Éthiopie",
    flag: "🇪🇹",
    region: "Guji Zone",
    altitude: "1800-2100m",
    process: "Natural",
    score: 86,
    notes: "Myrtille, chocolat, vin",
    priceFob: "7.10€",
    varietal: "Heirloom",
    harvest: "Nov-Fév",
  },
  {
    id: "mogiana-sul",
    name: "Mogiana Sul",
    origin: "Brésil",
    flag: "🇧🇷",
    region: "São Paulo",
    altitude: "900-1100m",
    process: "Honey",
    score: 83,
    notes: "Noisette, brown sugar, doux",
    priceFob: "3.90€",
    varietal: "Yellow Bourbon",
    harvest: "Mai-Sep",
  },
];

export const testimonials = [
  {
    name: "Marie Duval",
    role: "Torréfactrice",
    company: "Brûlerie du Marais, Paris",
    text: "Stora a transformé notre approvisionnement. La qualité des lots est constante et le service est irréprochable. Pouvoir commander dès 30kg nous permet de proposer des micro-lots exclusifs à nos clients.",
  },
  {
    name: "Antoine Lefèvre",
    role: "Fondateur",
    company: "Café Altitude, Lyon",
    text: "En tant que petit torréfacteur, trouver du café vert de spécialité en petites quantités était un cauchemar. Stora a résolu ce problème avec un catalogue exceptionnel et une transparence totale sur la traçabilité.",
  },
  {
    name: "Sophie Bernard",
    role: "Responsable achats",
    company: "Torréfaction Artisanale du Sud, Marseille",
    text: "Les fiches techniques détaillées et les échantillons gratuits nous permettent de faire des choix éclairés. Notre score de satisfaction client a augmenté de 30% depuis qu'on travaille avec Stora.",
  },
];

export const origins = ["Éthiopie", "Brésil", "Colombie", "Rwanda", "Guatemala", "Kenya"];
export const processes = ["Lavé", "Natural", "Honey"];
export const scoreRanges = [
  { label: "80-84", min: 80, max: 84 },
  { label: "85-87", min: 85, max: 87 },
  { label: "88+", min: 88, max: 100 },
];
