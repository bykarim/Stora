/* Génération du ticket de caisse dématérialisé sur <canvas>.
   Une seule source de vérité : l'aperçu écran, le PNG et le PDF
   sont tous produits à partir du même rendu canvas. */

export type ReceiptItem = { name: string; qty: number; price: number };

export type ReceiptData = {
  merchant: string;
  addressLines: string[];
  phone: string;
  ticketNo: string;
  date: string;
  time: string;
  caisse: string;
  vendeur: string;
  items: ReceiptItem[];
  tvaRate: number; // ex. 0.10
  paymentMethod: string;
};

export const sampleReceipt: ReceiptData = {
  merchant: "LE COMPTOIR DU MARCHÉ",
  addressLines: ["12 rue des Halles", "75001 Paris"],
  phone: "01 42 36 88 14",
  ticketNo: "A-2026-04817",
  date: "19/06/2026",
  time: "14:32",
  caisse: "03",
  vendeur: "Camille",
  items: [
    { name: "Café allongé", qty: 2, price: 2.4 },
    { name: "Croissant beurre", qty: 1, price: 1.6 },
    { name: "Jus d'orange pressé", qty: 1, price: 4.5 },
    { name: "Salade de saison", qty: 1, price: 9.8 },
    { name: "Eau plate 50cl", qty: 2, price: 2.0 },
  ],
  tvaRate: 0.1,
  paymentMethod: "Carte bancaire",
};

const W = 380;
const PAD = 30;
const CENTER = W / 2;
const MONO = "'JetBrains Mono', ui-monospace, monospace";

function money(n: number): string {
  return n.toFixed(2).replace(".", ",") + " €";
}

type Op = (ctx: CanvasRenderingContext2D) => void;

/** Dessine le renard 1keti dans une boîte size×size à l'origine (x,y). */
function foxOps(x: number, y: number, size: number, color: string): Op {
  return (ctx) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size / 100, size / 100);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 5;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.stroke(new Path2D("M16 16 L13 53 L50 82 L87 53 L84 16 L60 41 L50 33 L40 41 Z"));
    ctx.stroke(new Path2D("M27 25 L34 39"));
    ctx.stroke(new Path2D("M73 25 L66 39"));
    ctx.fill(new Path2D("M29 52 L42 48 L37 57 Z"));
    ctx.fill(new Path2D("M71 52 L58 48 L63 57 Z"));
    ctx.fill(new Path2D("M45 65 L55 65 L50 72 Z"));
    ctx.restore();
  };
}

type ReceiptLayout = { width: number; height: number; ops: Op[] };

function buildReceipt(data: ReceiptData): ReceiptLayout {
  const ops: Op[] = [];
  let y = 0;

  const text = (
    str: string,
    opt: {
      x: number;
      align?: CanvasTextAlign;
      size?: number;
      weight?: number;
      color?: string;
    }
  ) => {
    const yy = y;
    const { x, align = "left", size = 12, weight = 400, color = "#0a0a0a" } = opt;
    ops.push((ctx) => {
      ctx.fillStyle = color;
      ctx.textAlign = align;
      ctx.textBaseline = "alphabetic";
      ctx.font = `${weight} ${size}px ${MONO}`;
      ctx.fillText(str, x, yy);
    });
  };

  const dashed = (gapBefore = 14, gapAfter = 16) => {
    y += gapBefore;
    const yy = y;
    ops.push((ctx) => {
      ctx.strokeStyle = "#d4d4d8";
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 3]);
      ctx.beginPath();
      ctx.moveTo(PAD, yy);
      ctx.lineTo(W - PAD, yy);
      ctx.stroke();
      ctx.setLineDash([]);
    });
    y += gapAfter;
  };

  // ---- en-tête ----
  y += 30;
  ops.push(foxOps(CENTER - 16, y - 4, 32, "#0a0a0a"));
  y += 46;
  text(data.merchant, { x: CENTER, align: "center", size: 16, weight: 600 });
  y += 22;
  data.addressLines.forEach((line) => {
    text(line, { x: CENTER, align: "center", size: 11.5, color: "#52525b" });
    y += 16;
  });
  text("Tél. " + data.phone, { x: CENTER, align: "center", size: 11.5, color: "#52525b" });
  y += 16;

  dashed();

  // ---- méta ----
  const meta = (label: string, value: string) => {
    text(label, { x: PAD, size: 11.5, color: "#52525b" });
    text(value, { x: W - PAD, align: "right", size: 11.5, weight: 500 });
    y += 17;
  };
  meta("Date", data.date);
  meta("Heure", data.time);
  meta("Ticket", data.ticketNo);
  meta("Caisse / Vendeur", `${data.caisse} · ${data.vendeur}`);

  dashed();

  // ---- articles ----
  text("ARTICLE", { x: PAD, size: 10.5, weight: 600, color: "#a1a1aa" });
  text("MONTANT", { x: W - PAD, align: "right", size: 10.5, weight: 600, color: "#a1a1aa" });
  y += 20;

  let total = 0;
  data.items.forEach((it) => {
    const lineTotal = it.qty * it.price;
    total += lineTotal;
    const label = it.qty > 1 ? `${it.qty}× ${it.name}` : it.name;
    text(label.length > 26 ? label.slice(0, 25) + "…" : label, {
      x: PAD,
      size: 12,
    });
    text(money(lineTotal), { x: W - PAD, align: "right", size: 12, weight: 500 });
    y += 17;
    if (it.qty > 1) {
      text(`   ${it.qty} × ${money(it.price)}`, {
        x: PAD,
        size: 10,
        color: "#a1a1aa",
      });
      y += 14;
    }
  });

  dashed();

  // ---- totaux ----
  const ht = total / (1 + data.tvaRate);
  const tva = total - ht;
  const row = (label: string, value: string, color = "#52525b") => {
    text(label, { x: PAD, size: 11.5, color });
    text(value, { x: W - PAD, align: "right", size: 11.5, color });
    y += 17;
  };
  row("Sous-total HT", money(ht));
  row(`TVA (${(data.tvaRate * 100).toFixed(0)}%)`, money(tva));
  y += 6;
  text("TOTAL TTC", { x: PAD, size: 17, weight: 700 });
  text(money(total), { x: W - PAD, align: "right", size: 17, weight: 700 });
  y += 24;

  dashed();

  // ---- paiement ----
  row("Paiement", data.paymentMethod, "#0a0a0a");
  row("Montant réglé", money(total), "#0a0a0a");

  dashed();

  // ---- remerciement ----
  text("Merci de votre visite !", { x: CENTER, align: "center", size: 12.5, weight: 600 });
  y += 18;
  text("À très bientôt au comptoir.", { x: CENTER, align: "center", size: 11, color: "#52525b" });
  y += 26;

  // ---- code-barres ----
  const barTop = y;
  const barH = 44;
  ops.push((ctx) => {
    ctx.fillStyle = "#0a0a0a";
    let seed = 0;
    for (const ch of data.ticketNo) seed += ch.charCodeAt(0);
    let bx = PAD;
    const maxX = W - PAD;
    let i = 0;
    while (bx < maxX) {
      const r = Math.abs(Math.sin(seed + i * 12.9898) * 43758.5453) % 1;
      const w = 1 + Math.round(r * 3);
      if (i % 2 === 0 && bx + w <= maxX) ctx.fillRect(bx, barTop, w, barH);
      bx += w;
      i++;
    }
  });
  y += barH + 16;
  text(data.ticketNo, { x: CENTER, align: "center", size: 10.5, color: "#52525b" });
  y += 24;

  // ---- pied ----
  text("Dématérialisé par 1keti", {
    x: CENTER,
    align: "center",
    size: 10.5,
    color: "#a1a1aa",
  });
  y += 28;

  return { width: W, height: y, ops };
}

/** Rend le ticket dans le <canvas> fourni. */
export function drawReceipt(
  canvas: HTMLCanvasElement,
  data: ReceiptData,
  scale = 3
): void {
  const { width, height, ops } = buildReceipt(data);
  canvas.width = Math.round(width * scale);
  canvas.height = Math.round(height * scale);
  if (canvas.style) canvas.style.aspectRatio = `${width} / ${height}`;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.scale(scale, scale);
  // fond blanc plein
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  ops.forEach((op) => op(ctx));
}

function triggerDownload(url: string, filename: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function downloadReceiptPng(canvas: HTMLCanvasElement, filename: string) {
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    triggerDownload(url, filename);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, "image/png");
}

export async function downloadReceiptPdf(
  canvas: HTMLCanvasElement,
  filename: string
) {
  const { jsPDF } = await import("jspdf");
  const imgData = canvas.toDataURL("image/png");
  const wmm = 80;
  const hmm = (wmm * canvas.height) / canvas.width;
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: [wmm, hmm],
  });
  pdf.addImage(imgData, "PNG", 0, 0, wmm, hmm);
  pdf.save(filename);
}
