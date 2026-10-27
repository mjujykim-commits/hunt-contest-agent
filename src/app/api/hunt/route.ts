import { NextResponse } from "next/server";
import { runHunt } from "@/lib/hunter";

export const dynamic = "force-dynamic";

export async function GET() {
  const brief = runHunt(100_000_000);
  return NextResponse.json(brief);
}
