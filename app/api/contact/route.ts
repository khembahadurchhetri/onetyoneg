import { NextRequest, NextResponse } from "next/server";
import { sendAdminNotification } from "@/lib/email";
import { prisma } from "@/lib/prisma";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 12_000) {
    return NextResponse.json({ error: "Form submission is too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Please submit a valid form." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Please submit a valid form." }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  if (typeof data.website === "string" && data.website.trim()) {
    return NextResponse.json({ error: "Unable to submit this form." }, { status: 400 });
  }

  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
  const service = typeof data.service === "string" ? data.service.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";

  if (
    !name ||
    name.length > 120 ||
    !isValidEmail(email) ||
    email.length > 254 ||
    !service ||
    service.length > 160 ||
    !message ||
    message.length > 5000
  ) {
    return NextResponse.json(
      { error: "Enter a valid name, email, service, and message (up to 5,000 characters)." },
      { status: 400 }
    );
  }

  let contact;
  try {
    contact = await prisma.contact.create({
      data: { name, email, service, message },
    });
  } catch (error) {
    console.error("Contact submission could not be saved:", error);
    return NextResponse.json(
      { error: "We could not save your message. Please try again." },
      { status: 500 }
    );
  }

  try {
    await sendAdminNotification(
      `New website inquiry: ${service}`,
      `Name: ${name}\nEmail: ${email}\nService: ${service}\n\nMessage:\n${message}`,
      email
    );
    return NextResponse.json({ id: contact.id, emailSent: true }, { status: 201 });
  } catch (error) {
    console.error("Contact notification email failed:", error);
    return NextResponse.json(
      {
        id: contact.id,
        emailSent: false,
        message: "Your inquiry was saved, but the email notification could not be sent. We will follow up from the admin inbox.",
      },
      { status: 201 }
    );
  }
}
