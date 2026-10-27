import { NextResponse } from "next/server";
import { planPrizePurse } from "@/lib/wallet";
import { octetConfigured } from "@/lib/octet";
import { nebiusConfigured } from "@/lib/nebius";

export const dynamic = "force-dynamic";

export async function GET() {
  const plan = planPrizePurse();
  return NextResponse.json({
    ...plan,
    integrations: {
      octet: octetConfigured(),
      nebius: nebiusConfigured(),
    },
  });
}
