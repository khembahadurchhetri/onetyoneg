import { NextRequest, NextResponse } from "next/server";
import {
  makeSlug,
  readJson,
  requireAdmin,
  requireSameOrigin,
  textField,
} from "@/lib/admin-api";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const originError = requireSameOrigin(request);
  if (originError) return originError;
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;
  const body = await readJson(request);
  if (!body) return NextResponse.json({ message: "Invalid request body." }, { status: 400 });

  const name = textField(body, "name", 160);
  const detail = textField(body, "detail", 2000);
  const price = textField(body, "price", 100);
  if (!name || !detail || !price) {
    return NextResponse.json({ message: "Complete every service field." }, { status: 400 });
  }

  try {
    const service = await prisma.service.update({
      where: { id: params.id },
      data: { slug: makeSlug(name), name, detail, price },
    });
    return NextResponse.json({ service });
  } catch (error) {
    console.error("Admin service could not be updated:", error);
    return NextResponse.json(
      { message: "Could not update the service. Check that its name is unique." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const originError = requireSameOrigin(request);
  if (originError) return originError;
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    await prisma.service.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Admin service could not be deleted:", error);
    return NextResponse.json({ message: "Could not delete this service." }, { status: 500 });
  }
}
