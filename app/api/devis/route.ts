import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Log the quote request (in production, send via Resend/Nodemailer)
    console.log("Nouvelle demande de devis:", data);

    // If RESEND_API_KEY is configured, send email
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: "Stora Devis <onboarding@resend.dev>",
        to: process.env.CONTACT_EMAIL || "contact@stora-cafe.fr",
        subject: `Nouvelle demande de devis — ${data.societe}`,
        html: `
          <h2>Nouvelle demande de devis</h2>
          <p><strong>Société :</strong> ${data.societe}</p>
          <p><strong>Contact :</strong> ${data.nom}</p>
          <p><strong>Email :</strong> ${data.email}</p>
          <p><strong>Téléphone :</strong> ${data.telephone || "Non renseigné"}</p>
          <p><strong>Type d'activité :</strong> ${data.typeActivite}</p>
          <p><strong>Cafés sélectionnés :</strong> ${data.cafesSelectionnes || "Non précisé"}</p>
          <p><strong>Volume estimé :</strong> ${data.volumeEstime || "Non précisé"}</p>
          <p><strong>Fréquence :</strong> ${data.frequence || "Non précisée"}</p>
          <p><strong>Message :</strong> ${data.message || "Aucun"}</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur envoi devis:", error);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
