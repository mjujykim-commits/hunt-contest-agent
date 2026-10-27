import { NextResponse } from "next/server";
import { appendFile, mkdir } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

type LeadBody = {
  name?: string;
  email?: string;
  note?: string;
  contestId?: string;
};

export async function POST(req: Request) {
  let body: LeadBody;
  try {
    body = (await req.json()) as LeadBody;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  if (!name || !email || !email.includes("@")) {
    return NextResponse.json({ error: "validation" }, { status: 400 });
  }

  const dir = path.join(process.cwd(), "data");
  await mkdir(dir, { recursive: true });
  const row = {
    at: new Date().toISOString(),
    name,
    email,
    note: (body.note || "").trim(),
    contestId: body.contestId || null,
  };
  await appendFile(
    path.join(dir, "leads.jsonl"),
    `${JSON.stringify(row)}\n`,
    "utf8"
  );

  return NextResponse.json({ ok: true });
}
