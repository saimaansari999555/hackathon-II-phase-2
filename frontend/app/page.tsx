// app/page.tsx
import PublicNavbar from '@/components/layout/PublicNavbar';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Stats from '@/components/landing/Stats';
import Footer from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicNavbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Stats />
      </main>
      <Footer />
    </div>
  );
}

