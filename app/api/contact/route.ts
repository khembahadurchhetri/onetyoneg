import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, service, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Save the submission to your database
    const contact = await prisma.contact.create({
      data: { name, email, service: service || "Not specified", message }
    });

    // 2. Send the email notification to your Gmail
    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>", // Change to your verified domain later if you have one
      to: ["onetyoneg@gmail.com"],
      subject: `New message from ${name} (${service || "General"})`,
      replyTo: email,
      text: `
Name: ${name}
Email: ${email}
Service: ${service || "Not specified"}

Message:
${message}
      `,
    });

    return NextResponse.json({ id: contact.id }, { status: 201 });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}