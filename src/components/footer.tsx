"use client";

import { Logo } from "./logo";
import { useI18n } from "@/context/i18n-context";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <Logo />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Fulltime Cookie. {t('footer.rights')}
          </p>
          <div className="flex items-center space-x-4">
             {/* Add social links here if needed */}
          </div>
        </div>
      </div>
    </footer>
  );
}
