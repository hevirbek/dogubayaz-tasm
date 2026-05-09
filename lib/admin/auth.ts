import "server-only";

import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_COOKIE = "asm_admin_session";
const SESSION_PAYLOAD = "asm-admin-session-v1";

export function isAdminAuthConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

function getSessionSignature() {
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    return null;
  }

  return createHmac("sha256", password).update(SESSION_PAYLOAD).digest("hex");
}

function safeCompare(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return timingSafeEqual(aBuffer, bBuffer);
}

export async function verifyAdminPassword(password: string) {
  const configuredPassword = process.env.ADMIN_PASSWORD;

  if (!configuredPassword) {
    return false;
  }

  return safeCompare(password, configuredPassword);
}

export async function setAdminSession() {
  const signature = getSessionSignature();

  if (!signature) {
    return;
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, signature, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 8
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
}

export async function isAdminAuthenticated() {
  const signature = getSessionSignature();

  if (!signature) {
    return false;
  }

  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE)?.value;

  if (!session) {
    return false;
  }

  return safeCompare(session, signature);
}

export async function requireAdmin() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    redirect("/admin/login");
  }
}
