import { NextRequest, NextResponse } from "next/server";
import { readJson, requireAdmin, requireSameOrigin } from "@/lib/admin-api";
import { prisma } from "@/lib/prisma";

const statuses = new Set(["new", "reviewing", "resolved"]);

export async function PATCH(
  request: NextRequest,
  { params }: { params: { type: string; id: string } }
) {
  const originError = requireSameOrigin(request);
  if (originError) return originError;
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const body = await readJson(request);
  const status = body?.status;
  if (typeof status !== "string" || !statuses.has(status)) {
    return NextResponse.json({ message: "Choose a valid inbox status." }, { status: 400 });
  }

  try {
    if (params.type === "contacts") {
      await prisma.contact.update({ where: { id: params.id }, data: { status } });
    } else if (params.type === "careers") {
      await prisma.careerApplication.update({
        where: { id: params.id },
        data: { status },
      });
    } else {
      return NextResponse.json({ message: "Inbox item not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Admin inbox item could not be updated:", error);
    return NextResponse.json(
      { message: "Could not update this inbox item." },
      { status: 500 }
    );
  }
}
