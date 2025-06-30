import { useLocale } from "next-intl";
import { ReactNode } from "react";

interface DirectionProviderProps {
  children: ReactNode;
}

export default function DirectionProvider({ children }: DirectionProviderProps) {
  const locale = useLocale();
  const dir = ["ar", "he"].includes(locale) ? "rtl" : "ltr";
  
  return (
    <div dir={dir} lang={locale} className="min-h-screen">
      {children}
    </div>
  );
} 