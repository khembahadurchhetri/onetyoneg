import { NextRequest, NextResponse } from "next/server";
import {
  readJson,
  requireAdmin,
  requireSameOrigin,
  textField,
  topicList,
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
  const category = textField(body, "category", 100);
  const title = textField(body, "title", 160);
  const level = textField(body, "level", 100);
  const price = textField(body, "price", 100);
  const description = textField(body, "description", 2000);
  const topics = topicList(body.topics);
  if (!category || !title || !level || !price || !description || !topics?.length) {
    return NextResponse.json(
      { message: "Complete every course field and add at least one topic." },
      { status: 400 }
    );
  }

  try {
    const course = await prisma.course.update({
      where: { id: params.id },
      data: { category, title, level, price, description, topics },
    });
    return NextResponse.json({ course });
  } catch (error) {
    console.error("Admin course could not be updated:", error);
    return NextResponse.json(
      { message: "Could not update the course. Check that its title is unique." },
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
    await prisma.course.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Admin course could not be deleted:", error);
    return NextResponse.json({ message: "Could not delete this course." }, { status: 500 });
  }
}
