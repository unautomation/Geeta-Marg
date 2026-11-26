import { VERSE_BANK, Verse } from "./verse_bank";

// Fallback verses used when nothing in the message matches a tag.
const GENERAL: string[] = ["2.47", "2.48", "6.5"];

// Score each verse by how many of its tags appear in the user's message.
export function retrieveVerses(message: string, limit = 4): Verse[] {
  const text = message.toLowerCase();

  const scored = VERSE_BANK.map((v) => {
    const score = v.tags.reduce(
      (n, tag) => (text.includes(tag.toLowerCase()) ? n + 1 : n),
      0
    );
    return { verse: v, score };
  })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    return VERSE_BANK.filter((v) => GENERAL.includes(v.ref));
  }
  return scored.slice(0, limit).map((s) => s.verse);
}

// Build the grounding block the model must follow.
export function groundingBlock(verses: Verse[]): string {
  const lines = verses.map((v) => `- Bhagavad Gita ${v.ref}: ${v.meaning}`);
  return [
    "VERSES YOU MAY CITE (use only these, by their reference):",
    ...lines,
    "If none of these fits the question, say so honestly and give general,",
    "practical guidance in the Gita's spirit, without citing any verse.",
  ].join("\n");
}
