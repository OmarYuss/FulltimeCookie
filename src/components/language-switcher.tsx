"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Languages } from "lucide-react";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const onSelectChange = (nextLocale: string) => {
    // The pathname will be like `/en/about`, so we need to replace the current locale
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.replace(newPath);
  };

  return (
    <Select onValueChange={onSelectChange} defaultValue={locale}>
      <SelectTrigger className="w-[120px]">
        <Languages className="h-4 w-4 mr-2" />
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="he">עברית</SelectItem>
        <SelectItem value="ar">العربية</SelectItem>
      </SelectContent>
    </Select>
  );
}
