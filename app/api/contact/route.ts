import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("Nouveau message de contact:", data);

    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: "Stora Contact <onboarding@resend.dev>",
        to: process.env.CONTACT_EMAIL || "contact@stora-cafe.fr",
        subject: `Message de contact — ${data.nom}`,
        html: `
          <h2>Nouveau message de contact</h2>
          <p><strong>Nom :</strong> ${data.nom}</p>
          <p><strong>Email :</strong> ${data.email}</p>
          <p><strong>Message :</strong> ${data.message}</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur envoi contact:", error);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
