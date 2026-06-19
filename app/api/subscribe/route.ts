import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * Email capture + access gate.
 *
 * PROTOTYPE: subscribers are appended to data/subscribers.jsonl on the server.
 * Swap this for a real ESP (Beehiiv / ConvertKit / Resend) when one is connected
 * — keep the cookie logic so the gate keeps working.
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

  try {
    const dir = path.join(process.cwd(), "data");
    await fs.mkdir(dir, { recursive: true });
    const line = JSON.stringify({ email, ts: new Date().toISOString() }) + "\n";
    await fs.appendFile(path.join(dir, "subscribers.jsonl"), line, "utf8");
  } catch (err) {
    // Don't block access if the write fails (e.g. read-only fs) — just log it.
    console.error("subscriber write failed", err);
  }
  console.log("new subscriber:", email);

  const response = NextResponse.json({ ok: true });
  response.cookies.set("pd_access", "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365
  });
  return response;
}
