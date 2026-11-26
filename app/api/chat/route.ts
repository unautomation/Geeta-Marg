import { NextResponse } from "next/server";
import { SYSTEM_PROMPT, isDistress, CRISIS_MESSAGE } from "@/lib/guide";
import { retrieveVerses, groundingBlock } from "@/lib/retrieve";
import { getGuide, DISCLOSURE } from "@/lib/guides";

export const runtime = "nodejs";

type Message = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  const body = (await req.json()) as { messages?: Message[]; guideId?: string };
  const guide = getGuide(body.guideId);
  const messages = (body.messages ?? []).slice(-10); // last 10 turns only

  if (messages.length === 0) {
    return NextResponse.json({ error: "No message" }, { status: 400 });
  }

  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUser) {
    return NextResponse.json({ error: "No user message" }, { status: 400 });
  }

  // Safety first: distress never reaches the model.
  if (isDistress(lastUser.content)) {
    return NextResponse.json({ reply: CRISIS_MESSAGE, crisis: true });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Server is not configured. Missing API key." },
      { status: 500 }
    );
  }

  // Ground the answer in verses that fit this question.
  const verses = retrieveVerses(lastUser.content);
  const system = `${SYSTEM_PROMPT}\n\nYour guide persona: ${guide.displayName}, a ${guide.gender} ${guide.kind.toLowerCase()}. ${guide.style}\nIf asked who you are, say: "${DISCLOSURE}"\n\n${groundingBlock(verses)}`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-5-5",
      max_tokens: 600,
      system,
      messages,
    }),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "The guide is resting. Please try again in a moment." },
      { status: 502 }
    );
  }

  const data = await res.json();
  const reply = (data.content ?? [])
    .filter((b: { type: string }) => b.type === "text")
    .map((b: { text: string }) => b.text)
    .join("\n")
    .trim();

  return NextResponse.json({ reply, crisis: false, guide: guide.id, verses: verses.map((v) => v.ref) });
}
