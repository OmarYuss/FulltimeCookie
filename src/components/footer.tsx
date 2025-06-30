"use client";

import { useTranslations } from "next-intl";
import { Logo } from "./logo";

export default function Footer() {
  const t = useTranslations('footer');
  return (
    <footer className="bg-muted py-8">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <Logo />
        <p className="text-sm text-muted-foreground">{t('copyright')}</p>
      </div>
    </footer>
  );
}
