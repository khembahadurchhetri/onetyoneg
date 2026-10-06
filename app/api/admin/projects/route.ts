import { NextRequest, NextResponse } from "next/server";
import { del } from "@vercel/blob";
import { requireAdmin, requireSameOrigin } from "@/lib/admin-api";
import {
  isHttpUrl,
  projectImageFile,
  readProjectText,
  uploadProjectImage,
  validateProjectImage,
} from "@/lib/project-upload";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const projects = await prisma.project.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });
    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Admin projects could not be loaded:", error);
    return NextResponse.json({ message: "Could not load projects." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const originError = requireSameOrigin(request);
  if (originError) return originError;
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ message: "Invalid project upload." }, { status: 400 });
  }

  const fields = readProjectFields(form);
  const image = form.get("image");
  const imageError = validateProjectImage(image);
  if (!fields || imageError) {
    return NextResponse.json(
      { message: imageError || "Complete all project details and select an image." },
      { status: 400 }
    );
  }
  if (!image || !projectImageFile(image)) {
    return NextResponse.json({ message: "Choose an image to upload." }, { status: 400 });
  }

  let uploadedImageUrl: string | null = null;
  try {
    const lastProject = await prisma.project.findFirst({ orderBy: { sortOrder: "desc" } });
    uploadedImageUrl = await uploadProjectImage(image);
    const project = await prisma.project.create({
      data: {
        ...fields,
        imageUrl: uploadedImageUrl,
        sortOrder: (lastProject?.sortOrder ?? -1) + 1,
      },
    });
    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error("Admin project could not be created:", error);
    let cleanupFailed = false;
    if (uploadedImageUrl) {
      try {
        await del(uploadedImageUrl);
      } catch (cleanupError) {
        cleanupFailed = true;
        console.error("Unattached project image could not be cleaned up:", cleanupError);
      }
    }
    return NextResponse.json(
      {
        message: cleanupFailed
          ? "The project could not be saved, and the uploaded image needs cleanup in Blob storage."
          : "Could not save the project. Please try again.",
      },
      { status: 500 }
    );
  }
}

function readProjectFields(form: FormData) {
  const title = readProjectText(form, "title", 120);
  const description = readProjectText(form, "description", 1000);
  const category = readProjectText(form, "category", 80);
  const imageAlt = readProjectText(form, "imageAlt", 200);
  const projectUrl = readProjectText(form, "projectUrl", 2048, true);
  if (!title || !description || !category || !imageAlt || projectUrl === null) return null;
  if (projectUrl && !isHttpUrl(projectUrl)) return null;
  return { title, description, category, imageAlt, projectUrl: projectUrl || null };
}
