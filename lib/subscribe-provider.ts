import { promises as fs } from "fs";
import path from "path";

/**
 * Single swap point for email capture.
 *
 * Today (prototype): subscribers are appended to data/subscribers.jsonl.
 * To go live, set SUBSCRIBE_PROVIDER + the relevant key and implement the
 * matching branch in `addSubscriber` — nothing else in the app changes.
 */
export interface SubscribeResult {
  ok: boolean;
  provider: string;
}

async function writeToFile(email: string): Promise<void> {
  const dir = path.join(process.cwd(), "data");
  await fs.mkdir(dir, { recursive: true });
  const line = JSON.stringify({ email, ts: new Date().toISOString() }) + "\n";
  await fs.appendFile(path.join(dir, "subscribers.jsonl"), line, "utf8");
}

export async function addSubscriber(email: string): Promise<SubscribeResult> {
  const provider = process.env.SUBSCRIBE_PROVIDER ?? "file";

  switch (provider) {
    // case "convertkit": {
    //   await fetch(`https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ api_key: process.env.CONVERTKIT_API_KEY, email })
    //   });
    //   return { ok: true, provider };
    // }
    // case "beehiiv": {
    //   await fetch(`https://api.beehiiv.com/v2/publications/${process.env.BEEHIIV_PUB_ID}/subscriptions`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${process.env.BEEHIIV_API_KEY}`
    //     },
    //     body: JSON.stringify({ email })
    //   });
    //   return { ok: true, provider };
    // }
    case "file":
    default: {
      // Best-effort local capture — never block access if the write fails.
      try {
        await writeToFile(email);
      } catch (err) {
        console.error("subscriber write failed", err);
      }
      return { ok: true, provider: "file" };
    }
  }
}
