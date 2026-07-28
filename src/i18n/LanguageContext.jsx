import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { en } from "./translations/en";
import { ne } from "./translations/ne";

const dictionaries = { en, ne };

const LanguageContext = createContext({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
});

function getByPath(obj, path) {
  return path.split(".").reduce((acc, part) => (acc == null ? undefined : acc[part]), obj);
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      return localStorage.getItem("raktasewa_lang") || "en";
    } catch {
      return "en";
    }
  });

  const setLang = (next) => {
    setLangState(next);
    try {
      localStorage.setItem("raktasewa_lang", next);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang === "ne" ? "ne" : "en";
  }, [lang]);

  const value = useMemo(() => {
    const dict = dictionaries[lang] || en;
    const t = (key, fallback) => {
      const found = getByPath(dict, key);
      if (found != null) return found;
      const enFound = getByPath(en, key);
      if (enFound != null) return enFound;
      return fallback != null ? fallback : key;
    };
    return { lang, setLang, t };
  }, [lang]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function useT() {
  return useLanguage().t;
}
