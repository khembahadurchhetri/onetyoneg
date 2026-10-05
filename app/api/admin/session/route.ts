import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const session = getAdminSession(request);
    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
    return NextResponse.json({ authenticated: true, email: session.email });
  } catch (error) {
    console.error("Admin session configuration error:", error);
    return NextResponse.json({ message: "Admin authentication is not configured." }, { status: 503 });
  }
}
