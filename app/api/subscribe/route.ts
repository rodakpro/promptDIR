import { NextResponse } from "next/server";
import { addSubscriber } from "@/lib/subscribe-provider";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * Email capture + access gate.
 *
 * Capture is delegated to lib/subscribe-provider (file in the prototype; swap to
 * an ESP via env). The cookie is what actually unlocks the gated library.
 */
export async function POST(request: Request) {
  let email = "";
  try {
    const body = await request.json();
    email = typeof body?.email === "string" ? body.email.trim() : "";
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  await addSubscriber(email);

  const response = NextResponse.json({ ok: true });
  response.cookies.set("pd_access", "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365
  });
  return response;
}
