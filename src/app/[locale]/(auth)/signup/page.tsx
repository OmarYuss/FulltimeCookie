"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, KeyRound, User, Phone } from "lucide-react";
import { useTranslations } from 'next-intl';

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.6 1.62-4.58 1.62-3.57 0-6.48-2.9-6.48-6.48s2.9-6.48 6.48-6.48c2.04 0 3.3.83 4.1 1.62l2.5-2.5C18.16 3.4 15.66 2 12.48 2 7.18 2 3 6.18 3 11.5s4.18 9.5 9.48 9.5c2.9 0 5.2-1 6.9-2.73 1.76-1.73 2.55-4.18 2.55-6.18 0-.57-.05-.92-.12-1.38h-9.4z" />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M22.675 0h-21.35C.59 0 0 .59 0 1.325v21.35C0 23.41.59 24 1.325 24H12.82v-9.29H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h5.693c.735 0 1.325-.59 1.325-1.325V1.325C24 .59 23.41 0 22.675 0z" />
  </svg>
);

export default function SignupPage() {
  const t = useTranslations('signup');
  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader>
        <CardTitle className="text-xl">{t('title')}</CardTitle>
        <CardDescription>
          {t('description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="full-name">{t('fullName')}</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="full-name" placeholder={t('fullNamePlaceholder')} required className="pl-10" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">{t('email')}</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="email" type="email" placeholder={t('emailPlaceholder')} required className="pl-10" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">{t('password')}</Label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="password" type="password" required className="pl-10" />
            </div>
          </div>
          <Button type="submit" className="w-full">
            {t('createAccount')}
          </Button>
           <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {t('orSignUpWith')}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline">
              <GoogleIcon className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button variant="outline">
              <FacebookIcon className="mr-2 h-4 w-4" />
              Facebook
            </Button>
          </div>
           <Button variant="outline" className="w-full">
            <Phone className="mr-2 h-4 w-4" />
            {t('signUpWithPhone')}
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          {t('alreadyHaveAccount')}{' '}
          <Link href="/login" className="underline">
            {t('login')}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
