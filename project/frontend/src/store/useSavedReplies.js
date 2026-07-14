import { useCallback, useEffect, useState } from "react";

const KEY = "aierg_saved_replies";

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

export function useSavedReplies() {
  const [saved, setSaved] = useState(load);

  useEffect(() => {
    save(saved);
  }, [saved]);

  const addSaved = useCallback((entry) => {
    setSaved((prev) => [
      { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...entry },
      ...prev,
    ]);
  }, []);

  const removeSaved = useCallback((id) => {
    setSaved((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return { saved, addSaved, removeSaved };
}