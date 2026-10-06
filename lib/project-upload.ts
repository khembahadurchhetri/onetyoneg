import { put } from "@vercel/blob";

const MAX_IMAGE_SIZE = 4 * 1024 * 1024;
const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

export function readProjectText(form: FormData, name: string, maxLength: number, optional = false) {
  const value = form.get(name);
  if (typeof value !== "string") return optional ? "" : null;
  const trimmed = value.trim();
  if (!trimmed && optional) return "";
  return trimmed && trimmed.length <= maxLength ? trimmed : null;
}

export function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function validateProjectImage(value: FormDataEntryValue | null): string | null {
  if (!value || typeof value === "string" || typeof value.arrayBuffer !== "function") {
    return "Choose an image to upload.";
  }
  if (!allowedImageTypes.has(value.type)) {
    return "Use a JPEG, PNG, WebP, or AVIF image.";
  }
  if (value.size > MAX_IMAGE_SIZE) {
    return "Choose an image that is 4 MB or smaller.";
  }
  if (value.size === 0) {
    return "The selected image is empty.";
  }
  return null;
}

export function projectImageExtension(type: string) {
  switch (type) {
    case "image/jpeg": return "jpg";
    case "image/png": return "png";
    case "image/webp": return "webp";
    case "image/avif": return "avif";
    default: throw new Error("Unsupported project image type.");
  }
}

export function projectImageFile(value: FormDataEntryValue): value is File {
  return typeof value !== "string" && typeof value.arrayBuffer === "function";
}

export async function uploadProjectImage(file: File) {
  const blob = await put(
    `projects/${crypto.randomUUID()}.${projectImageExtension(file.type)}`,
    file,
    { access: "public", addRandomSuffix: true, contentType: file.type }
  );
  return blob.url;
}
