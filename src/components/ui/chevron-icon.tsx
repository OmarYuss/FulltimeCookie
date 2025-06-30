import { useLocale } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChevronIconProps {
  className?: string;
}

export function ChevronIcon({ className }: ChevronIconProps) {
  const locale = useLocale();
  const isRTL = ["ar", "he"].includes(locale);
  
  return isRTL ? (
    <ChevronLeft className={cn("h-4 w-4", className)} />
  ) : (
    <ChevronRight className={cn("h-4 w-4", className)} />
  );
} 