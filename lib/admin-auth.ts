import {
  createHmac,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";
import type { NextRequest } from "next/server";

export const ADMIN_COOKIE_NAME = "1t1g_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 8;

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET must contain at least 32 characters.");
  }
  return secret;
}

export function assertAdminSessionConfigured() {
  getSessionSecret();
}

export function hashAdminPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `scrypt$${salt}$${hash}`;
}

export function verifyAdminPassword(password: string, encodedHash: string) {
  const [algorithm, salt, expectedHex] = encodedHash.split("$");
  if (
    algorithm !== "scrypt" ||
    !salt ||
    !/^[a-f0-9]{32}$/i.test(salt) ||
    !expectedHex ||
    !/^[a-f0-9]{128}$/i.test(expectedHex)
  ) {
    return false;
  }

  const expected = Buffer.from(expectedHex, "hex");
  const actual = scryptSync(password, salt, expected.length);
  return timingSafeEqual(actual, expected);
}

export function isAdminPasswordHash(encodedHash: string) {
  return /^scrypt\$[a-f0-9]{32}\$[a-f0-9]{128}$/i.test(encodedHash);
}

function sign(payload: string) {
  return createHmac("sha256", getSessionSecret())
    .update(payload)
    .digest("base64url");
}

export function createAdminSession(email: string) {
  const payload = Buffer.from(
    JSON.stringify({
      email,
      expiresAt: Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS,
    })
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function getAdminSession(request: NextRequest) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return null;

  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra) return null;

  const expectedSignature = Buffer.from(sign(payload));
  const actualSignature = Buffer.from(signature);
  if (
    expectedSignature.length !== actualSignature.length ||
    !timingSafeEqual(expectedSignature, actualSignature)
  ) {
    return null;
  }

  try {
    const session = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    ) as { email?: unknown; expiresAt?: unknown };
    if (
      typeof session.email !== "string" ||
      typeof session.expiresAt !== "number" ||
      session.expiresAt <= Math.floor(Date.now() / 1000)
    ) {
      return null;
    }
    return { email: session.email };
  } catch {
    return null;
  }
}

export function hasSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  };
}
