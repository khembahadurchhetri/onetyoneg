import { NextRequest, NextResponse } from "next/server";
import { sendAdminNotification } from "@/lib/email";
import { prisma } from "@/lib/prisma";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidUrl(value: string) {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 12_000) {
    return NextResponse.json({ error: "Application is too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Please submit a valid application." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Please submit a valid application." }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  if (typeof data.website === "string" && data.website.trim()) {
    return NextResponse.json({ error: "Unable to submit this application." }, { status: 400 });
  }

  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
  const role = typeof data.role === "string" ? data.role.trim() : "";
  const resumeUrl = typeof data.resumeUrl === "string" ? data.resumeUrl.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";

  if (
    !name ||
    name.length > 120 ||
    !isValidEmail(email) ||
    email.length > 254 ||
    !role ||
    role.length > 160 ||
    !isValidUrl(resumeUrl) ||
    resumeUrl.length > 2000 ||
    !message ||
    message.length > 5000
  ) {
    return NextResponse.json(
      { error: "Check your name, email, role, resume link, and note, then try again." },
      { status: 400 }
    );
  }

  let application;
  try {
    application = await prisma.careerApplication.create({
      data: { name, email, role, resumeUrl: resumeUrl || null, message },
    });
  } catch (error) {
    console.error("Career application could not be saved:", error);
    return NextResponse.json(
      { error: "We could not save your application. Please try again." },
      { status: 500 }
    );
  }

  try {
    await sendAdminNotification(
      `New careers application: ${role}`,
      `Name: ${name}\nEmail: ${email}\nRole: ${role}\nResume / portfolio: ${resumeUrl || "Not provided"}\n\nNote:\n${message}`,
      email
    );
    return NextResponse.json({ id: application.id, emailSent: true }, { status: 201 });
  } catch (error) {
    console.error("Career application notification email failed:", error);
    return NextResponse.json(
      {
        id: application.id,
        emailSent: false,
        message: "Your application was saved, but the email notification could not be sent. It is available in the admin inbox.",
      },
      { status: 201 }
    );
  }
}
