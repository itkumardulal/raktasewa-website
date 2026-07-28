import { useCallback, useEffect, useState } from "react";

function readStored(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      return { ...fallback, ...parsed };
    }
    return fallback;
  } catch {
    return fallback;
  }
}

/**
 * Persist form draft in localStorage until cleared (e.g. after successful submit).
 */
export function usePersistentForm(storageKey, initialValues) {
  const [form, setForm] = useState(() => readStored(storageKey, initialValues));

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(form));
    } catch {
      /* ignore quota / private mode */
    }
  }, [storageKey, form]);

  const resetForm = useCallback(() => {
    setForm(initialValues);
    try {
      localStorage.removeItem(storageKey);
    } catch {
      /* ignore */
    }
  }, [storageKey, initialValues]);

  const clearDraft = useCallback(() => {
    try {
      localStorage.removeItem(storageKey);
    } catch {
      /* ignore */
    }
  }, [storageKey]);

  return [form, setForm, resetForm, clearDraft];
}

/**
 * Persist a single primitive value (string/boolean) until cleared.
 */
export function usePersistentValue(storageKey, initialValue = "") {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw == null) return initialValue;
      return JSON.parse(raw);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(value));
    } catch {
      /* ignore */
    }
  }, [storageKey, value]);

  const clearValue = useCallback(() => {
    setValue(initialValue);
    try {
      localStorage.removeItem(storageKey);
    } catch {
      /* ignore */
    }
  }, [storageKey, initialValue]);

  return [value, setValue, clearValue];
}
