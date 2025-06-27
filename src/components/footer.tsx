import { Logo } from "./logo";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <Logo />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Fulltime Cookie. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
             {/* Add social links here if needed */}
          </div>
        </div>
      </div>
    </footer>
  );
}
