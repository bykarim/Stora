"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FoxMark } from "@/components/Logo";
import {
  drawReceipt,
  downloadReceiptPng,
  downloadReceiptPdf,
  sampleReceipt,
} from "@/lib/receipt";

type Phase = "idle" | "scanning" | "received";

export function TicketContent() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (phase !== "received") return;
    let cancelled = false;
    (async () => {
      try {
        if (document.fonts) {
          await Promise.all([
            document.fonts.load("400 12px 'JetBrains Mono'"),
            document.fonts.load("600 16px 'JetBrains Mono'"),
            document.fonts.load("700 17px 'JetBrains Mono'"),
          ]);
        }
      } catch {
        /* on rend quand même avec la police de repli */
      }
      const canvas = canvasRef.current;
      if (cancelled || !canvas) return;
      drawReceipt(canvas, sampleReceipt);
      if (!cancelled) setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [phase]);

  const tap = () => {
    if (phase !== "idle") return;
    setPhase("scanning");
    setTimeout(() => setPhase("received"), 1500);
  };

  const flash = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  };

  const onPdf = async () => {
    const c = canvasRef.current;
    if (!c || !ready) return;
    try {
      await downloadReceiptPdf(c, `ticket-1keti-${sampleReceipt.ticketNo}.pdf`);
      flash("Ticket enregistré en PDF");
    } catch {
      flash("Échec de l'export PDF");
    }
  };

  const onPng = () => {
    const c = canvasRef.current;
    if (!c || !ready) return;
    downloadReceiptPng(c, `ticket-1keti-${sampleReceipt.ticketNo}.png`);
    flash("Ticket enregistré en image");
  };

  const onShare = async () => {
    const c = canvasRef.current;
    if (!c || !ready || !navigator.share) return;
    c.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], `ticket-1keti-${sampleReceipt.ticketNo}.png`, {
        type: "image/png",
      });
      try {
        await navigator.share({ files: [file], title: "Mon ticket 1keti" });
      } catch {
        /* partage annulé */
      }
    }, "image/png");
  };

  const canShare =
    typeof navigator !== "undefined" &&
    "canShare" in navigator &&
    typeof navigator.share === "function";

  return (
    <section className="section pt-28 sm:pt-32">
      <div className="container-x max-w-3xl">
        <div className="text-center">
          <span className="eyebrow">Démonstration interactive</span>
          <h1 className="h-section mt-4">
            {phase === "received"
              ? "Votre ticket est arrivé"
              : "Approchez votre téléphone de la tuile"}
          </h1>
          <p className="lead mx-auto mt-4 max-w-xl">
            {phase === "received"
              ? "Voici le ticket de caisse dématérialisé reçu sur votre téléphone. Enregistrez-le en PDF ou en image."
              : "Touchez la tuile ci-dessous pour simuler le tap NFC et recevoir un ticket de démonstration."}
          </p>
        </div>

        {/* ---- Zone tuile / scan ---- */}
        {phase !== "received" && (
          <div className="mt-14 flex flex-col items-center">
            <button
              onClick={tap}
              disabled={phase === "scanning"}
              aria-label="Toucher la tuile 1keti"
              className="group relative flex h-56 w-56 items-center justify-center"
            >
              {/* anneaux NFC */}
              {phase === "scanning" && (
                <>
                  <Ring delay={0} />
                  <Ring delay={0.5} />
                  <Ring delay={1} />
                </>
              )}
              {/* la tuile */}
              <span
                className="relative flex h-40 w-40 items-center justify-center rounded-[28px] border border-border bg-white shadow-[0_30px_70px_-40px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:-translate-y-1 group-active:scale-95"
                style={{
                  animation:
                    phase === "idle" ? "floaty 4s ease-in-out infinite" : undefined,
                }}
              >
                <FoxMark className="h-20 w-20 text-ink" />
                <span className="absolute bottom-3 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted">
                  1keti · NFC
                </span>
              </span>
            </button>

            <p className="mt-8 font-mono text-[0.8rem] uppercase tracking-[0.15em] text-muted">
              {phase === "scanning" ? "Réception du ticket…" : "Touchez pour démarrer"}
            </p>
          </div>
        )}

        {/* ---- Ticket reçu ---- */}
        {phase === "received" && (
          <div className="mt-12 flex flex-col items-center">
            <div
              className="w-full max-w-[360px]"
              style={{ animation: "slideUpReceipt 0.6s cubic-bezier(0.16,1,0.3,1)" }}
            >
              <div className="overflow-hidden rounded-[18px] border border-border bg-white shadow-[0_40px_90px_-50px_rgba(0,0,0,0.55)]">
                <canvas
                  ref={canvasRef}
                  className="block w-full"
                  aria-label={`Ticket de caisse ${sampleReceipt.merchant}`}
                />
              </div>
            </div>

            {/* choix d'enregistrement */}
            <div className="mt-10 w-full max-w-[360px]">
              <p className="text-center font-mono text-[0.72rem] uppercase tracking-[0.16em] text-muted">
                Enregistrer le ticket
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button onClick={onPdf} className="btn btn-dark btn-block" disabled={!ready}>
                  <IconPdf /> PDF
                </button>
                <button onClick={onPng} className="btn btn-ghost btn-block" disabled={!ready}>
                  <IconImage /> Image
                </button>
              </div>
              {canShare && (
                <button onClick={onShare} className="btn btn-ghost btn-block mt-3" disabled={!ready}>
                  <IconShare /> Partager
                </button>
              )}

              <button
                onClick={() => {
                  setReady(false);
                  setPhase("idle");
                }}
                className="mx-auto mt-6 block text-[0.85rem] font-medium text-ink-soft underline-offset-4 transition-colors hover:text-ink hover:underline"
              >
                Recommencer la démo
              </button>
            </div>
          </div>
        )}

        <div className="mt-16 text-center">
          <Link href="/commander" className="btn btn-ghost">
            Équiper mon commerce →
          </Link>
        </div>
      </div>

      {/* toast */}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-7 z-50 flex justify-center px-4 transition-all duration-300"
        style={{
          opacity: toast ? 1 : 0,
          transform: toast ? "translateY(0)" : "translateY(12px)",
        }}
        aria-live="polite"
      >
        {toast && (
          <span className="rounded-full bg-ink px-5 py-3 text-sm font-medium text-white shadow-lg">
            {toast}
          </span>
        )}
      </div>
    </section>
  );
}

function Ring({ delay }: { delay: number }) {
  return (
    <span
      className="absolute h-40 w-40 rounded-[28px] border border-ink/30"
      style={{ animation: `pingRing 1.6s ease-out ${delay}s infinite` }}
    />
  );
}

function IconPdf() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M12 18v-6" />
      <path d="m9 15 3 3 3-3" />
    </svg>
  );
}
function IconImage() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" />
    </svg>
  );
}
function IconShare() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="m16 6-4-4-4 4" />
      <path d="M12 2v13" />
    </svg>
  );
}
