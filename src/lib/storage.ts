export type StoredAnswer = {
  questionId: number;
  optionId: string;
};

export type StoredSession = {
  started: boolean;
  currentIndex: number;
  answers: StoredAnswer[];
};

const STORAGE_KEY = "ice-cold-protocol-session";

export function loadSession(): StoredSession | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    return JSON.parse(raw) as StoredSession;
  } catch {
    return null;
  }
}

export function saveSession(session: StoredSession): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
}
