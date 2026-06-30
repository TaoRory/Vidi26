"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Lang, T, translations } from "@/lib/i18n/translations";

type LangCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: T;
};

const LanguageContext = createContext<LangCtx>({
  lang: "vi",
  setLang: () => {},
  t: translations.vi,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("vi");

  useEffect(() => {
    const stored = localStorage.getItem("vidi26-lang") as Lang | null;
    if (stored === "en" || stored === "vi") setLangState(stored);
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem("vidi26-lang", l);
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
