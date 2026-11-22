"use client";

import { useState, CSSProperties } from "react";
import { GUIDES, Guide, GuideId } from "@/lib/guides";

type Message = { role: "user" | "assistant"; content: string };

const VERSE_OF_THE_DAY =
  "Bhagavad Gita 2.47: You have a right to your actions, but never to the fruits of your actions.";

// Short description shown on each guide card.
const ONE_LINE: Record<GuideId, string> = {
  "sage-male": "Calm and unhurried, with images from nature.",
  "sage-female": "Warm and patient, with stories from everyday life.",
  "counsellor-male": "Structured and practical. Finds the root cause first.",
  "counsellor-female": "Empathetic and calm. Reflects your feelings first.",
};

export default function Home() {
  const [guide, setGuide] = useState<Guide | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function chooseGuide(g: Guide) {
    setGuide(g);
    setMessages([]);
    setError(null);
  }

  function changeGuide() {
    setGuide(null);
    setMessages([]);
    setError(null);
  }

  async function send() {
    const text = input.trim();
    if (!text || loading || !guide) return;

    const next: Message[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next, guideId: guide.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
      } else {
        setMessages([...next, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setError("Network problem. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }

  // Step 1: the user picks a guide.
  if (!guide) {
    return (
      <main style={styles.page}>
        <header style={styles.header}>
          <h1 style={styles.title}>Geeta Marg</h1>
          <p style={styles.subtitle}>गीता मार्ग · Geeta Marg</p>
        </header>
        <p style={styles.hint}>Choose the guide you would like to talk with.</p>
        <div style={styles.grid}>
          {Object.values(GUIDES).map((g) => (
            <button key={g.id} style={styles.card} onClick={() => chooseGuide(g)}>
              <strong style={{ fontSize: 17 }}>{g.displayName}</strong>
              <span style={{ fontSize: 13, color: "#666" }}>
                {g.kind} · {g.gender}
              </span>
              <span style={{ fontSize: 14 }}>{ONE_LINE[g.id]}</span>
            </button>
          ))}
        </div>
        <footer style={styles.footer}>
          <p>Every guide is an AI character. None is a real person, priest, doctor or lawyer.</p>
        </footer>
      </main>
    );
  }

  // Step 2: the chat with the chosen guide.
  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>Geeta Marg</h1>
        <p style={styles.subtitle}>
          You are talking with {guide.displayName} ·{" "}
          <button style={styles.link} onClick={changeGuide}>Change guide</button>
        </p>
      </header>

      <section style={styles.votd}>
        <strong>Verse of the day:</strong> {VERSE_OF_THE_DAY}
      </section>

      <section style={styles.chat} aria-live="polite">
        {messages.length === 0 && (
          <div style={styles.botBubble}>{guide.intro}</div>
        )}
        {messages.map((m, i) => (
          <div key={i} style={m.role === "user" ? styles.userBubble : styles.botBubble}>
            {m.content}
          </div>
        ))}
        {loading && <div style={styles.botBubble}>Reflecting…</div>}
        {error && <div style={styles.error}>{error}</div>}
      </section>

      <form
        style={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question…"
          maxLength={500}
        />
        <button style={styles.button} type="submit" disabled={loading}>
          Ask
        </button>
      </form>

      <footer style={styles.footer}>
        <p>I am an AI guide, not a priest, doctor or lawyer. Answers are for reflection only.</p>
      </footer>
    </main>
  );
}

const styles: Record<string, CSSProperties> = {
  page: { maxWidth: 680, margin: "0 auto", padding: 16, fontFamily: "system-ui, sans-serif", minHeight: "100vh", display: "flex", flexDirection: "column", gap: 12 },
  header: { textAlign: "center" },
  title: { margin: 0, fontSize: 28 },
  subtitle: { margin: 0, color: "#666", fontSize: 14 },
  link: { background: "none", border: "none", color: "#b35c00", textDecoration: "underline", cursor: "pointer", fontSize: 14, padding: 0 },
  votd: { background: "#fff7e6", border: "1px solid #f0d9a8", borderRadius: 8, padding: 12, fontSize: 14 },
  chat: { flex: 1, display: "flex", flexDirection: "column", gap: 10, minHeight: 300 },
  hint: { color: "#444", fontSize: 15, margin: 0 },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
  card: { display: "flex", flexDirection: "column", gap: 6, textAlign: "left", padding: 14, border: "1px solid #ddd", borderRadius: 10, background: "#fff", cursor: "pointer" },
  userBubble: { alignSelf: "flex-end", background: "#e8eefc", padding: 10, borderRadius: 10, maxWidth: "85%", whiteSpace: "pre-wrap" },
  botBubble: { alignSelf: "flex-start", background: "#f4f4f4", padding: 10, borderRadius: 10, maxWidth: "85%", whiteSpace: "pre-wrap" },
  error: { color: "#b00020", fontSize: 14 },
  form: { display: "flex", gap: 8 },
  input: { flex: 1, padding: 12, fontSize: 16, borderRadius: 8, border: "1px solid #ccc" },
  button: { padding: "12px 18px", fontSize: 16, borderRadius: 8, border: "none", background: "#b35c00", color: "#fff", cursor: "pointer" },
  footer: { fontSize: 12, color: "#777", textAlign: "center" },
};
