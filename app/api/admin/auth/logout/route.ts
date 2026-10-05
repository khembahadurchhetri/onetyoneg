import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, adminCookieOptions, hasSameOrigin } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  if (!hasSameOrigin(request)) {
    return NextResponse.json({ message: "Request origin is not allowed." }, { status: 403 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE_NAME, "", { ...adminCookieOptions(), maxAge: 0 });
  return response;
}
