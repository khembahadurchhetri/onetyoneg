import { NextRequest, NextResponse } from "next/server";
import {
  makeSlug,
  readJson,
  requireAdmin,
  requireSameOrigin,
  textField,
  topicList,
} from "@/lib/admin-api";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;
  try {
    const courses = await prisma.course.findMany({ orderBy: { createdAt: "asc" } });
    return NextResponse.json({ courses });
  } catch (error) {
    console.error("Admin courses could not be loaded:", error);
    return NextResponse.json({ message: "Could not load courses." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
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
    const course = await prisma.course.create({
      data: {
        slug: makeSlug(title),
        category,
        title,
        level,
        price,
        description,
        topics,
      },
    });
    return NextResponse.json({ course }, { status: 201 });
  } catch (error) {
    console.error("Admin course could not be created:", error);
    return NextResponse.json(
      { message: "Could not create the course. Check that its title is unique." },
      { status: 500 }
    );
  }
}
