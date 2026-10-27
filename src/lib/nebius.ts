/**
 * Nebius Token Factory client (NVIDIA open models).
 * When NEBIUS_API_KEY is unset, callers fall back to the deterministic hunter.
 */

export type NebiusChatResult = {
  text: string;
  model: string;
  provider: "nebius" | "local-fallback";
};

const DEFAULT_MODEL =
  process.env.NEBIUS_MODEL || "nvidia/NVIDIA-Nemotron-Nano-9B-v2";

export function nebiusConfigured() {
  return Boolean(process.env.NEBIUS_API_KEY?.trim());
}

export async function nebiusChat(
  system: string,
  user: string
): Promise<NebiusChatResult> {
  const key = process.env.NEBIUS_API_KEY?.trim();
  const base =
    process.env.NEBIUS_BASE_URL?.trim() ||
    "https://api.tokenfactory.nebius.com/v1";

  if (!key) {
    return {
      text: "",
      model: "local-hunter",
      provider: "local-fallback",
    };
  }

  const res = await fetch(`${base}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: DEFAULT_MODEL,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      temperature: 0.2,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`nebius_error:${res.status}:${err.slice(0, 200)}`);
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
    model?: string;
  };
  const text = data.choices?.[0]?.message?.content?.trim() || "";
  return {
    text,
    model: data.model || DEFAULT_MODEL,
    provider: "nebius",
  };
}
