import { NextRequest, NextResponse } from "next/server";
import { getAdminSession, hasSameOrigin, verifyAdminPassword, hashAdminPassword } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function PATCH(request: NextRequest) {
  if (!hasSameOrigin(request)) {
    return NextResponse.json({ message: "Request origin is not allowed." }, { status: 403 });
  }

  let session;
  try {
    session = getAdminSession(request);
  } catch (error) {
    console.error("Admin session configuration error:", error);
    return NextResponse.json({ message: "Admin authentication is not configured." }, { status: 503 });
  }
  if (!session) {
    return NextResponse.json({ message: "Sign in to continue." }, { status: 401 });
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
    !("currentPassword" in body) ||
    !("newPassword" in body) ||
    typeof body.currentPassword !== "string" ||
    typeof body.newPassword !== "string"
  ) {
    return NextResponse.json({ message: "Current and new passwords are required." }, { status: 400 });
  }
  if (body.newPassword.length < 12 || body.newPassword.length > 1024) {
    return NextResponse.json({ message: "New password must be at least 12 characters." }, { status: 400 });
  }

  try {
    const admin = await prisma.adminAccount.findUnique({ where: { email: session.email } });
    if (!admin || !verifyAdminPassword(body.currentPassword, admin.passwordHash)) {
      return NextResponse.json({ message: "Current password is incorrect." }, { status: 401 });
    }
    await prisma.adminAccount.update({
      where: { id: admin.id },
      data: { passwordHash: hashAdminPassword(body.newPassword) },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Admin password update failed:", error);
    return NextResponse.json({ message: "Could not change the admin password." }, { status: 500 });
  }
}
