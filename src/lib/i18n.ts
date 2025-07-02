export async function loadTranslations(lang: string) {
  return await import(`../locales/${lang}.json`);
} 