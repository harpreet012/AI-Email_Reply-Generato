import Navbar from "../components/Navbar";
import { useSavedReplies } from "../store/useSavedReplies";

export default function SavedReplies() {
  const { saved, removeSaved } = useSavedReplies();

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // clipboard unavailable — silently ignore
    }
  };

  return (
    <div>
      <Navbar title="Saved replies" subtitle="Replies you've kept for reuse" />
      <div className="p-6">
        {saved.length === 0 ? (
          <div className="bg-[var(--paper-raised)] border border-[var(--line)] rounded-lg p-8 text-center">
            <p className="text-sm text-[var(--muted)]">
              Nothing saved yet. From the Generator, click "Save reply" to keep
              one here.
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {saved.map((item) => (
              <li
                key={item.id}
                className="bg-[var(--paper-raised)] border border-[var(--line)] rounded-lg p-5 flex flex-col"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[var(--stamp-light)] text-[var(--stamp)]">
                    {item.tone}
                  </span>
                  <span className="text-xs text-[var(--muted)]">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {item.subject && (
                  <p className="font-voice text-sm text-[var(--ink)] mb-1">
                    Subject: {item.subject}
                  </p>
                )}
                <p className="text-sm text-[var(--ink-soft)] whitespace-pre-wrap font-type leading-relaxed flex-1">
                  {item.reply}
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => copy(item.reply)}
                    className="text-xs border border-[var(--line)] text-[var(--ink-soft)] rounded-full px-3 py-1.5 hover:border-[var(--stamp)] hover:text-[var(--ink)] transition-colors"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => removeSaved(item.id)}
                    className="text-xs border border-[var(--line)] text-[var(--ink-soft)] rounded-full px-3 py-1.5 hover:border-[var(--wax)] hover:text-[var(--wax-dark)] transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
