import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { translations, type Language, type Translation } from "./translations";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translation;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

function getInitialLanguage(): Language {
  if (typeof window === "undefined") {
    return "es";
  }

  const stored = window.localStorage.getItem("uropanama-language");
  return stored === "en" ? "en" : "es";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    window.localStorage.setItem("uropanama-language", language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: translations[language] as Translation,
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}
