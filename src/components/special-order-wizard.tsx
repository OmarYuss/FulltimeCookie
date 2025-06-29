"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";

import { useI18n } from "@/context/i18n-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { handleSpecialOrder } from "@/ai/flows/special-order-flow";
import { cn } from "@/lib/utils";
import { CalendarIcon, CheckCircle, PartyPopper, Loader2 } from "lucide-react";
import { format } from "date-fns";

const TOTAL_STEPS = 3;

const specialOrderSchema = z.object({
  type: z.string().min(1, "Please select a type of baked good."),
  contains: z.string().max(100, "Must be 100 characters or less."),
  description: z.string().min(10, "Please provide a more detailed description (at least 10 characters)."),
  dueDate: z.date().optional(),
  inspirationLink: z.string().url().optional().or(z.literal('')),
});

type SpecialOrderFormValues = z.infer<typeof specialOrderSchema>;

export function SpecialOrderWizard() {
  const { t } = useI18n();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  const form = useForm<SpecialOrderFormValues>({
    resolver: zodResolver(specialOrderSchema),
    defaultValues: {
      type: "",
      contains: "",
      description: "",
      inspirationLink: "",
    },
  });

  async function onSubmit(values: SpecialOrderFormValues) {
    setIsLoading(true);
    try {
      const result = await handleSpecialOrder(values);
      if (result.success) {
        setIsFinished(true);
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

  const nextStep = async () => {
    let fieldsToValidate: (keyof SpecialOrderFormValues)[] = [];
    if (step === 1) fieldsToValidate = ['type', 'contains', 'description'];
    if (step === 2) fieldsToValidate = ['dueDate', 'inspirationLink'];

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setStep(s => s + 1);
    }
  };
  
  const prevStep = () => setStep(s => s - 1);

  if (isFinished) {
    return (
      <Card className="w-full">
        <CardHeader className="text-center">
          <PartyPopper className="w-16 h-16 mx-auto text-primary" />
          <CardTitle className="text-2xl mt-4">{t('specialOrder.successTitle')}</CardTitle>
          <CardDescription>{t('specialOrder.successDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
            <Button onClick={() => { form.reset(); setStep(1); setIsFinished(false); }}>Create Another Order</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="border rounded-lg shadow-lg p-6 md:p-8">
      <Progress value={(step / TOTAL_STEPS) * 100} className="mb-8 h-2" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-headline font-semibold">The Basics</h3>
                  <FormField control={form.control} name="type" render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('specialOrder.type')}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder={t('specialOrder.typePlaceholder')} /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="Cake">Cake</SelectItem>
                          <SelectItem value="Cookies">Cookies</SelectItem>
                          <SelectItem value="Baked Goods">Other Baked Goods</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="contains" render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('specialOrder.contains')}</FormLabel>
                      <FormControl><Input placeholder={t('specialOrder.containsPlaceholder')} {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="description" render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('specialOrder.description')}</FormLabel>
                      <FormControl><Textarea placeholder={t('specialOrder.descriptionPlaceholder')} rows={6} {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              )}
              {step === 2 && (
                <div className="space-y-6">
                   <h3 className="text-2xl font-headline font-semibold">Details & Inspiration</h3>
                    <FormField control={form.control} name="dueDate" render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Requested Due Date (Optional)</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button variant="outline" className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))} initialFocus/>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <div>
                        <FormLabel>{t('specialOrder.inspiration')}</FormLabel>
                        <FormField control={form.control} name="inspirationLink" render={({ field }) => (
                        <FormItem>
                            <FormControl><Input placeholder={t('specialOrder.inspirationLink')} {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                        )} />
                        <div className="relative flex items-center my-4">
                            <div className="flex-grow border-t border-muted-foreground"></div>
                            <span className="flex-shrink mx-4 text-muted-foreground text-sm">OR</span>
                            <div className="flex-grow border-t border-muted-foreground"></div>
                        </div>
                        <Input type="file" disabled />
                        <p className="text-xs text-muted-foreground mt-2">File uploads are not yet supported. Please use a link for now.</p>
                    </div>
                </div>
              )}
              {step === 3 && (
                <div className="text-center space-y-4">
                  <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
                  <h3 className="text-2xl font-headline font-semibold">Ready to Submit?</h3>
                  <p className="text-muted-foreground">Click the button below to send your request for review. We'll get back to you soon!</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-between mt-8 pt-4 border-t">
            <Button type="button" variant="outline" onClick={prevStep} disabled={step === 1}>Back</Button>
            {step < TOTAL_STEPS && <Button type="button" onClick={nextStep}>Next</Button>}
            {step === TOTAL_STEPS && (
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t('specialOrder.submit')}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
