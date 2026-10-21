'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { dictionaries, type Locale, type Dictionary } from '@/lib/i18n/dictionaries';

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: 'id',
  setLocale: () => {},
  t: dictionaries.id,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('id');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('ray_portfolio_locale') as Locale | null;
      if (saved === 'id' || saved === 'en') {
        setLocaleState(saved);
      }
    } catch {
      // Ignore storage access errors
    }
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem('ray_portfolio_locale', next);
      document.documentElement.lang = next;
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        t: dictionaries[locale] as unknown as Dictionary,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
