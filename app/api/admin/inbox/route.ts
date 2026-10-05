import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-api";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const [contacts, applications] = await Promise.all([
      prisma.contact.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
      prisma.careerApplication.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
      }),
    ]);
    return NextResponse.json({ contacts, applications });
  } catch (error) {
    console.error("Admin inbox could not be loaded:", error);
    return NextResponse.json(
      { message: "Could not load the admin inbox." },
      { status: 500 }
    );
  }
}
