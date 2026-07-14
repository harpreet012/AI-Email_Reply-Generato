import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useHistory } from "../store/useHistory";
import { useSavedReplies } from "../store/useSavedReplies";

const TONES = ["Professional", "Formal", "Friendly", "Concise", "Persuasive"];
const API_BASE = import.meta.env.VITE_API_URL || "https://ai-email-reply-generato.onrender.com";

function wordCount(text) {
  const t = text.trim();
  return t ? t.split(/\s+/).length : 0;
}

export default function Generator() {
  const [email, setEmail] = useState("");
  const [tone, setTone] = useState(TONES[0]);
  const [includeSubject, setIncludeSubject] = useState(false);
  const [reply, setReply] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  const { addEntry } = useHistory();
  const { addSaved } = useSavedReplies();

  const generate = async () => {
    if (!email.trim()) {
      setError("Paste an email above before generating a reply.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_BASE}/api/generate`, {
        email,
        tone,
        includeSubject,
      });
      setReply(data.reply || "");
      setSubject(data.subject || "");
      addEntry({
        email,
        tone,
        reply: data.reply || "",
        subject: data.subject || "",
      });
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Could not reach the server. Is it running?";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const copyReply = async () => {
    try {
      await navigator.clipboard.writeText(reply);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setError("Could not copy — select the text manually instead.");
    }
  };

  const downloadReply = () => {
    const blob = new Blob([reply], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reply.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const saveReply = () => {
    if (!reply) return;
    addSaved({ email, tone, reply, subject });
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1500);
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") generate();
  };

  return (
    <div>
      <Navbar
        title="Generator"
        subtitle="Paste an email, pick a tone, and draft a reply"
      />
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          <section className="bg-[var(--paper-raised)] border border-[var(--line)] rounded p-5">
            <div className="flex justify-between text-[11px] tracking-[0.14em] uppercase text-[var(--muted)] font-medium mb-3">
              <span>Original email</span>
              <span>{wordCount(email)} words</span>
            </div>

            <textarea
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Paste the email you're replying to..."
              rows={10}
              className="w-full resize-y border-none bg-transparent font-type text-[13.5px] leading-[1.8] text-[var(--ink)] outline-none placeholder:text-[var(--muted)]"
            />

            <div className="flex flex-wrap gap-2 my-4">
              {TONES.map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`font-type text-[11.5px] tracking-wide px-3 py-1.5 rounded-full border transition-all ${
                    tone === t
                      ? "bg-[var(--stamp)] border-[var(--stamp)] text-white"
                      : "border-[var(--line)] text-[var(--ink-soft)] hover:border-[var(--stamp)]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <label className="flex items-center gap-2 text-xs text-[var(--ink-soft)] mb-4">
              <input
                type="checkbox"
                checked={includeSubject}
                onChange={(e) => setIncludeSubject(e.target.checked)}
                className="accent-[var(--wax)]"
              />
              Also suggest a subject line
            </label>

            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={generate}
                disabled={loading}
                title="Generate reply"
                className="relative w-16 h-16 rounded-full border-none cursor-pointer bg-[var(--wax)] text-[#F3E4C8] font-voice text-xs flex items-center justify-center shrink-0 transition-transform hover:scale-[1.04] active:scale-[0.97] disabled:opacity-55 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading && (
                  <span className="seal-ring absolute -inset-1 rounded-full border-2 border-transparent border-t-[#F3E4C8]" />
                )}
                <span className={loading ? "opacity-50" : ""}>
                  {loading ? "Sealing..." : "Seal & Send"}
                </span>
              </button>

              <button
                onClick={generate}
                disabled={!reply || loading}
                className="text-sm text-[var(--ink-soft)] bg-transparent border border-[var(--line)] rounded-full px-4 py-2 transition-colors hover:border-[var(--ink-soft)] hover:text-[var(--ink)] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Regenerate
              </button>
            </div>

            {error && (
              <div className="mt-3.5 bg-[#F6E9E6] border border-[var(--wax)] text-[var(--wax-dark)] text-[13px] px-3.5 py-2.5 rounded">
                {error}
              </div>
            )}
          </section>

          <section className="bg-[var(--paper-raised)] border border-[var(--line)] rounded p-5">
            <div className="flex justify-between text-[11px] tracking-[0.14em] uppercase text-[var(--muted)] font-medium mb-3">
              <span>Drafted reply</span>
              <span>{wordCount(reply)} words</span>
            </div>

            <div
              className={`font-voice text-[15px] pb-2.5 mb-2.5 border-b border-dashed border-[var(--line)] min-h-[20px] ${
                subject
                  ? "text-[var(--ink)]"
                  : "text-[var(--muted)] italic font-sans text-[13px]"
              }`}
            >
              {subject ? `Subject: ${subject}` : "No subject suggested yet"}
            </div>

            <textarea
              value={reply}
              readOnly
              rows={10}
              placeholder="Your generated reply will appear here..."
              className="w-full resize-y border-none bg-transparent font-type text-[13.5px] leading-[1.8] text-[var(--ink)] outline-none placeholder:text-[var(--muted)]"
            />

            <div className="flex items-center gap-3 flex-wrap mt-2">
              <button
                onClick={copyReply}
                disabled={!reply}
                className={`text-sm bg-transparent border rounded-full px-4 py-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                  copied
                    ? "border-[var(--stamp)] text-[var(--stamp)]"
                    : "border-[var(--line)] text-[var(--ink-soft)] hover:border-[var(--ink-soft)] hover:text-[var(--ink)]"
                }`}
              >
                {copied ? "Copied" : "Copy reply"}
              </button>
              <button
                onClick={downloadReply}
                disabled={!reply}
                className="text-sm text-[var(--ink-soft)] bg-transparent border border-[var(--line)] rounded-full px-4 py-2 transition-colors hover:border-[var(--ink-soft)] hover:text-[var(--ink)] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Download .txt
              </button>
              <button
                onClick={saveReply}
                disabled={!reply}
                className={`text-sm bg-transparent border rounded-full px-4 py-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                  savedFlash
                    ? "border-[var(--stamp)] text-[var(--stamp)]"
                    : "border-[var(--line)] text-[var(--ink-soft)] hover:border-[var(--ink-soft)] hover:text-[var(--ink)]"
                }`}
              >
                {savedFlash ? "Saved" : "Save reply"}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
