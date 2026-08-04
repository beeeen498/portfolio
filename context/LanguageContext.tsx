"use client";

import { createContext, useContext, useState, useEffect } from "react";

/* ========================
   LANGUAGE CONTEXT
   — stores current language (en / he)
   — saves preference to localStorage
   — auto-detects from browser on first load (if no saved preference)
   — lets any component read or switch the language
======================== */

type Lang = "en" | "he";

type LanguageContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
});

/* hook — use this in any component */
export const useLanguage = () => useContext(LanguageContext);

/* provider — wrap around the app */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  /* ========================
     INIT — check localStorage first, then browser language
  ======================== */
  useEffect(() => {
    const saved = localStorage.getItem("lang");

    if (saved === "en" || saved === "he") {
      setLang(saved);
    } else {
      const browserLang = navigator.language;
      if (browserLang.startsWith("he")) {
        setLang("he");
      }
    }
  }, []);

  /* ========================
     SAVE — persist language choice to localStorage
  ======================== */
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  /* ========================
     UPDATE HTML TAG — set lang attribute
  ======================== */
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}
