"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { en } from '@/locales/en';
import { he } from '@/locales/he';
import { ar } from '@/locales/ar';

type Language = 'en' | 'he' | 'ar';
type Direction = 'ltr' | 'rtl';

const translations = { en, he, ar };

// Helper to access nested keys like 'header.home'
const getTranslation = (lang: Language, key: string): string => {
  const keys = key.split('.');
  let result: any = translations[lang];
  for (const k of keys) {
    result = result?.[k];
    if (result === undefined) {
      // Fallback to English if translation is missing
      let fallbackResult: any = en;
      for (const fk of keys) {
          fallbackResult = fallbackResult?.[fk];
      }
      return fallbackResult || key;
    }
  }
  return result || key;
};


interface I18nContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  dir: Direction;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [dir, setDir] = useState<Direction>('ltr');

  useEffect(() => {
    const storedLang = localStorage.getItem('language') as Language | null;
    if (storedLang && ['en', 'he', 'ar'].includes(storedLang)) {
      setLanguage(storedLang);
    }
  }, []);
  
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  }

  useEffect(() => {
    const newDir = ['he', 'ar'].includes(language) ? 'rtl' : 'ltr';
    setDir(newDir);
    document.documentElement.lang = language;
    document.documentElement.dir = newDir;
  }, [language]);

  const t = (key: string) => getTranslation(language, key);

  return (
    <I18nContext.Provider value={{ language, setLanguage: handleSetLanguage, t, dir }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
