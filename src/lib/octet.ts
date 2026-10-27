/**
 * Octet API + Ohai Wallet stubs for Hecto HAI.
 * Real calls activate when OCTET_API_KEY / OHAI_WALLET_ID are set.
 */

export function octetConfigured() {
  return Boolean(process.env.OCTET_API_KEY?.trim());
}

export async function createPrizeTransfer(input: {
  amountKrw: number;
  memo: string;
}): Promise<{ ok: boolean; provider: "octet" | "stub"; id: string }> {
  if (!octetConfigured()) {
    return {
      ok: true,
      provider: "stub",
      id: `stub_${Date.now()}_${input.amountKrw}`,
    };
  }

  const base = process.env.OCTET_BASE_URL?.trim() || "https://api.octet.online";
  const res = await fetch(`${base}/v1/transfers`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OCTET_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: input.amountKrw,
      currency: "KRW",
      memo: input.memo,
      walletId: process.env.OHAI_WALLET_ID,
    }),
  });

  if (!res.ok) {
    throw new Error(`octet_transfer_failed:${res.status}`);
  }
  const data = (await res.json()) as { id?: string };
  return { ok: true, provider: "octet", id: data.id || `octet_${Date.now()}` };
}
