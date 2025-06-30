import Footer from '@/components/footer';
import Header from '@/components/header';

// In a real app, this layout would enforce authentication,
// redirecting unauthenticated users to the login page.
export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
