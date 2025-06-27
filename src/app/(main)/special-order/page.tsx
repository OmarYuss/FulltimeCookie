"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useI18n } from "@/context/i18n-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { handleSpecialOrder } from "@/ai/flows/special-order-flow";

const specialOrderSchema = (t: (key: string) => string) => z.object({
  type: z.string().min(1, t('specialOrder.typePlaceholder')),
  contains: z.string().max(100, "Must be 100 characters or less."),
  description: z.string().min(10, "Please provide a more detailed description."),
  inspirationLink: z.string().url().optional().or(z.literal('')),
});

export default function SpecialOrderPage() {
  const { t } = useI18n();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<ReturnType<typeof specialOrderSchema>>>({
    resolver: zodResolver(specialOrderSchema(t)),
    defaultValues: {
      type: "",
      contains: "",
      description: "",
      inspirationLink: "",
    },
  });

  async function onSubmit(values: z.infer<ReturnType<typeof specialOrderSchema>>) {
    setIsLoading(true);
    try {
      const result = await handleSpecialOrder(values);
      if (result.success) {
        toast({
          title: t('specialOrder.successTitle'),
          description: t('specialOrder.successDescription'),
        });
        form.reset();
      } else {
        toast({
          variant: "destructive",
          title: t('specialOrder.errorTitle'),
          description: result.message || t('specialOrder.errorDescription'),
        });
      }
    } catch (error) {
      console.error("Special order submission error:", error);
      toast({
        variant: "destructive",
        title: t('specialOrder.errorTitle'),
        description: t('specialOrder.errorDescription'),
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container max-w-2xl py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-headline font-bold">{t('specialOrder.title')}</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          {t('specialOrder.subtitle')}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('specialOrder.type')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('specialOrder.typePlaceholder')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Cake">Cake</SelectItem>
                    <SelectItem value="Cookies">Cookies</SelectItem>
                    <SelectItem value="Baked Goods">Other Baked Goods</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contains"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('specialOrder.contains')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('specialOrder.containsPlaceholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('specialOrder.description')}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t('specialOrder.descriptionPlaceholder')}
                    rows={6}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <div>
            <Label className="mb-2 block">{t('specialOrder.inspiration')}</Label>
            <div className="grid gap-4">
                 <FormField
                    control={form.control}
                    name="inspirationLink"
                    render={({ field }) => (
                    <FormItem>
                        <FormControl>
                        <Input placeholder={t('specialOrder.inspirationLink')} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <div className="relative flex items-center">
                    <div className="flex-grow border-t border-muted-foreground"></div>
                    <span className="flex-shrink mx-4 text-muted-foreground text-sm">OR</span>
                    <div className="flex-grow border-t border-muted-foreground"></div>
                </div>
                <Input type="file" disabled />
                <p className="text-xs text-muted-foreground">File uploads are not yet supported in this demo.</p>
            </div>
           </div>

          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
            {isLoading ? "Submitting..." : t('specialOrder.submit')}
          </Button>
        </form>
      </Form>
    </div>
  );
}
