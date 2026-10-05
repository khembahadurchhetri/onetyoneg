import { NextRequest, NextResponse } from "next/server";
import {
  adminCookieOptions,
  assertAdminSessionConfigured,
  createAdminSession,
  hasSameOrigin,
  isAdminPasswordHash,
  verifyAdminPassword,
} from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!hasSameOrigin(request)) {
    return NextResponse.json({ message: "Request origin is not allowed." }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  if (
    !body ||
    typeof body !== "object" ||
    !("email" in body) ||
    !("password" in body) ||
    typeof body.email !== "string" ||
    typeof body.password !== "string"
  ) {
    return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
  }

  const email = body.email.trim().toLowerCase();
  const password = body.password;

  if (!email || password.length === 0 || password.length > 1024) {
    return NextResponse.json({ message: "Invalid email or password." }, { status: 400 });
  }

  try {
    assertAdminSessionConfigured();
    let admin = await prisma.adminAccount.findFirst();
    if (!admin) {
      const bootstrapEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
      const bootstrapPasswordHash = process.env.ADMIN_PASSWORD_HASH;
      if (
        !bootstrapEmail ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bootstrapEmail) ||
        !bootstrapPasswordHash ||
        !isAdminPasswordHash(bootstrapPasswordHash)
      ) {
        return NextResponse.json(
          { message: "Admin account is not configured correctly. Check ADMIN_EMAIL and ADMIN_PASSWORD_HASH." },
          { status: 503 }
        );
      }
      if (
        email !== bootstrapEmail ||
        !verifyAdminPassword(password, bootstrapPasswordHash)
      ) {
        return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
      }
      admin = await prisma.adminAccount.upsert({
        where: { email: bootstrapEmail },
        create: { email: bootstrapEmail, passwordHash: bootstrapPasswordHash },
        update: {},
      });
    }

    if (
      email !== admin.email ||
      !verifyAdminPassword(password, admin.passwordHash)
    ) {
      return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(
      "1t1g_admin_session",
      createAdminSession(admin.email),
      adminCookieOptions()
    );
    return response;
  } catch (error) {
    console.error("Admin login failed:", error);
    return NextResponse.json(
      { message: "Admin login is temporarily unavailable. Check the admin environment configuration and database." },
      { status: 500 }
    );
  }
}
