import { ShieldCheck } from 'lucide-react';
import type { LucideProps } from 'lucide-react';

interface LogoProps extends LucideProps {
  // Add any custom props if needed, e.g., for different logo versions
}

export function Logo({ className, ...props }: LogoProps) {
  return <ShieldCheck className={className} size={48} {...props} aria-label="Securibot Logo" />;
}
