
import sgMail from "@sendgrid/mail";

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY não configurada em .env.local");
}
if (!process.env.SENDGRID_SENDER_EMAIL) {
  throw new Error("SENDGRID_SENDER_EMAIL não configurada em .env.local");
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendWelcomeEmail(to: string) {
  const msg = {
    to,
    from: process.env.SENDGRID_SENDER_EMAIL as string,
    subject: "Bem‐vindo(a) à nossa Newsletter!",
    text: `Olá!

Obrigado por se inscrever na nossa newsletter de eventos.

Em breve, enviaremos as novidades diretamente para seu e-mail.

Atenciosamente,
Equipe MeuApp`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <h1 style="color: #4B5563;">Olá!</h1>
        <p>Obrigado por se inscrever na nossa <strong>newsletter de eventos</strong>.</p>
        <p>Em breve, enviaremos as novidades diretamente para seu e-mail.</p>
        <br/>
        <p>Atenciosamente,<br/>Equipe MeuApp</p>
      </div>
    `,
  };

  await sgMail.send(msg);
}