import { Resend } from "resend";

export async function sendAdminNotification(
  subject: string,
  text: string,
  replyTo?: string
) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "1T1G Website <onboarding@resend.dev>",
    to: [process.env.CONTACT_TO_EMAIL || "onetyoneg@gmail.com"],
    subject: subject.replace(/[\r\n\t]/g, " ").slice(0, 200),
    text,
    ...(replyTo ? { replyTo } : {}),
  });

  if (error) {
    throw new Error(`Email provider rejected the message: ${error.message}`);
  }
}
