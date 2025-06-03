import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import { ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-8">
      <header className="text-center mb-12">
        <Logo className="mx-auto mb-6" width={120} height={156} priority />
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
          Your intelligent partner in navigating the complexities of cybersecurity. Ask questions, get insights, and stay secure.
        </p>
      </header>

      <main className="w-full max-w-md text-center">
        <Link href="/auth" passHref>
          <Button size="lg" className="w-full group">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
        <p className="mt-6 text-sm text-muted-foreground">
          Secure your digital world, one conversation at a time.
        </p>
      </main>

      <footer className="absolute bottom-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Securibot. All rights reserved.
      </footer>
    </div>
  );
}
