import { useCallback, useEffect, useState } from "react";

const KEY = "aierg_history";

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function save(items) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    // storage unavailable — fail silently
  }
}

export function useHistory() {
  const [history, setHistory] = useState(load);

  useEffect(() => {
    save(history);
  }, [history]);

  const addEntry = useCallback((entry) => {
    setHistory((prev) => [
      { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...entry },
      ...prev,
    ].slice(0, 100));
  }, []);

  const clearHistory = useCallback(() => setHistory([]), []);
  const removeEntry = useCallback((id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return { history, addEntry, clearHistory, removeEntry };
}