type Messages = {
  [locale: string]: {
    [key: string]: string;
  };
};

let messages: Messages = {};

export function initializeMessages(localeMessages: Messages) {
  messages = localeMessages;
}

export function t(key: string, locale: string): string {
  if (!messages[locale]) {
    console.warn(`Missing locale: ${locale}`);
    return `[${key}]`;
  }

  const translation = messages[locale][key] || messages.en?.[key];
  
  if (!translation) {
    console.warn(`Missing translation for key: ${key} in locale: ${locale}`);
    return `[${key}]`;
  }

  return translation;
}

export function validateTranslations(locales: string[]): { 
  missingKeys: { [locale: string]: string[] },
  coverage: { [locale: string]: number } 
} {
  const englishKeys = Object.keys(messages.en || {});
  const result = {
    missingKeys: {} as { [locale: string]: string[] },
    coverage: {} as { [locale: string]: number }
  };

  locales.forEach(locale => {
    if (locale === 'en') return;

    const localeKeys = Object.keys(messages[locale] || {});
    const missing = englishKeys.filter(key => !localeKeys.includes(key));
    
    result.missingKeys[locale] = missing;
    result.coverage[locale] = ((englishKeys.length - missing.length) / englishKeys.length) * 100;
  });

  return result;
} 