import { NextRequest, NextResponse } from "next/server";
import {
  makeSlug,
  readJson,
  requireAdmin,
  requireSameOrigin,
  textField,
} from "@/lib/admin-api";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;
  try {
    const services = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
    return NextResponse.json({ services });
  } catch (error) {
    console.error("Admin services could not be loaded:", error);
    return NextResponse.json({ message: "Could not load services." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
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
    const lastService = await prisma.service.findFirst({ orderBy: { sortOrder: "desc" } });
    const service = await prisma.service.create({
      data: {
        slug: makeSlug(name),
        name,
        detail,
        price,
        sortOrder: (lastService?.sortOrder ?? -1) + 1,
      },
    });
    return NextResponse.json({ service }, { status: 201 });
  } catch (error) {
    console.error("Admin service could not be created:", error);
    return NextResponse.json(
      { message: "Could not create the service. Check that its name is unique." },
      { status: 500 }
    );
  }
}
