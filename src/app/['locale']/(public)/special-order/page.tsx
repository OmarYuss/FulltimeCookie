"use client";

import { useI18n } from "@/context/i18n-context";
import { SpecialOrderWizard } from "@/components/special-order-wizard";

export default function SpecialOrderPage() {
  const { t } = useI18n();
  
  return (
    <div className="container max-w-3xl py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-headline font-bold">{t('specialOrder.title')}</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          {t('specialOrder.subtitle')}
        </p>
      </div>

      <SpecialOrderWizard />
    </div>
  );
}
