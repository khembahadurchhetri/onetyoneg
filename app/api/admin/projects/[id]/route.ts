import { NextRequest, NextResponse } from "next/server";
import { del } from "@vercel/blob";
import { requireAdmin, requireSameOrigin } from "@/lib/admin-api";
import { prisma } from "@/lib/prisma";
import {
  isHttpUrl,
  projectImageFile,
  readProjectText,
  uploadProjectImage,
  validateProjectImage,
} from "@/lib/project-upload";

export const runtime = "nodejs";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const originError = requireSameOrigin(request);
  if (originError) return originError;
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  let form: FormData;
  let uploadedImageUrl: string | null = null;
  let oldImageCleanupWarning = false;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ message: "Invalid project update." }, { status: 400 });
  }
  const title = readProjectText(form, "title", 120);
  const description = readProjectText(form, "description", 1000);
  const category = readProjectText(form, "category", 80);
  const imageAlt = readProjectText(form, "imageAlt", 200);
  const projectUrl = readProjectText(form, "projectUrl", 2048, true);
  const image = form.get("image");
  if (!title || !description || !category || !imageAlt || projectUrl === null || (projectUrl && !isHttpUrl(projectUrl))) {
    return NextResponse.json({ message: "Check the project details and use a valid http(s) project link." }, { status: 400 });
  }
  if (image !== null && image !== "") {
    const imageError = validateProjectImage(image);
    if (imageError) return NextResponse.json({ message: imageError }, { status: 400 });
  }

  try {
    const existing = await prisma.project.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ message: "Project not found." }, { status: 404 });

    let imageUrl = existing.imageUrl;
    if (image && projectImageFile(image)) {
      uploadedImageUrl = await uploadProjectImage(image);
      imageUrl = uploadedImageUrl;
    }

    const project = await prisma.project.update({
      where: { id: params.id },
      data: { title, description, category, imageAlt, projectUrl: projectUrl || null, imageUrl },
    });

    if (imageUrl !== existing.imageUrl && isVercelBlobUrl(existing.imageUrl)) {
      try {
        await del(existing.imageUrl);
      } catch (error) {
        oldImageCleanupWarning = true;
        console.error("Old project image could not be removed from Blob storage:", error);
      }
    }
    return NextResponse.json({
      project,
      warning: oldImageCleanupWarning
        ? "Project updated, but the previous image could not be removed from Blob storage."
        : undefined,
    });
  } catch (error) {
    console.error("Admin project could not be updated:", error);
    if (uploadedImageUrl) {
      try {
        await del(uploadedImageUrl);
      } catch (cleanupError) {
        console.error("Unattached replacement project image could not be cleaned up:", cleanupError);
      }
    }
    return NextResponse.json({ message: "Could not update the project." }, { status: 500 });
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
    const project = await prisma.project.findUnique({ where: { id: params.id } });
    if (!project) return NextResponse.json({ message: "Project not found." }, { status: 404 });
    await prisma.project.delete({ where: { id: params.id } });

    let warning: string | undefined;
    if (isVercelBlobUrl(project.imageUrl)) {
      try {
        await del(project.imageUrl);
      } catch (error) {
        console.error("Deleted project image could not be removed from Blob storage:", error);
        warning = "The project was deleted, but its stored image could not be removed.";
      }
    }
    return NextResponse.json({ ok: true, warning });
  } catch (error) {
    console.error("Admin project could not be deleted:", error);
    return NextResponse.json({ message: "Could not delete the project." }, { status: 500 });
  }
}

function isVercelBlobUrl(value: string) {
  try {
    return new URL(value).hostname.endsWith(".public.blob.vercel-storage.com");
  } catch {
    return false;
  }
}
