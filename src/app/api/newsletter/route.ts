import { NextResponse } from "next/server";
import { sendWelcomeEmail } from "@/utils/sendEmail"; // ajuste conforme seu caminho

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ message: "E-mail inválido" }, { status: 400 });
    }

    const res = await fetch("https://api.sendgrid.com/v3/marketing/contacts", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contacts: [{ email }] }),
    });

    if (!res.ok) {
      const error = await res.json();
      console.error("Erro SendGrid:", error);
      return NextResponse.json({ message: "Erro ao cadastrar na newsletter" }, { status: 500 });
    }

    // Envia o e-mail de boas-vindas assincronamente (não bloqueia resposta)
    sendWelcomeEmail(email).catch((err) => {
      console.error("Erro ao enviar e-mail de boas-vindas:", err);
    });

    return NextResponse.json({ message: "Inscrição realizada com sucesso" }, { status: 201 });
  } catch (error) {
    console.error("Erro interno:", error);
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 });
  }
}
