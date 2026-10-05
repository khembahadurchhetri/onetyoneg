import { NextRequest, NextResponse } from "next/server";
import { getAdminSession, hasSameOrigin } from "@/lib/admin-auth";

export function requireAdmin(request: NextRequest) {
  try {
    if (!getAdminSession(request)) {
      return NextResponse.json({ message: "Sign in to continue." }, { status: 401 });
    }
  } catch (error) {
    console.error("Admin authentication configuration error:", error);
    return NextResponse.json(
      { message: "Admin authentication is not configured." },
      { status: 503 }
    );
  }
  return null;
}

export function requireSameOrigin(request: NextRequest) {
  if (!hasSameOrigin(request)) {
    return NextResponse.json(
      { message: "Request origin is not allowed." },
      { status: 403 }
    );
  }
  return null;
}

export async function readJson(request: NextRequest) {
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) return null;
    return body as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function textField(
  body: Record<string, unknown>,
  key: string,
  maxLength: number
) {
  const value = body[key];
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed.length <= maxLength ? trimmed : null;
}

export function topicList(value: unknown) {
  if (!Array.isArray(value) || value.length > 30) return null;
  const topics = value.map((topic) =>
    typeof topic === "string" ? topic.trim() : ""
  );
  if (topics.some((topic) => !topic || topic.length > 80)) return null;
  return topics;
}

export function makeSlug(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 100);
}
