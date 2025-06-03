
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import { ArrowRight, Mic, Brain, ShieldAlert, UserCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
      <CardHeader className="items-center text-center pt-6 pb-4">
        <Icon className="h-12 w-12 text-primary mb-3" />
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center px-6 pb-6">
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

export default function LandingPage() {
  const features: FeatureCardProps[] = [
    {
      icon: Mic,
      title: "Analyse Vocale",
      description: "Posez vos questions en utilisant votre voix pour une interaction plus rapide et naturelle."
    },
    {
      icon: Brain,
      title: "Réponses Intelligentes",
      description: "Obtenez des explications claires et précises grâce à notre IA spécialisée en cybersécurité."
    },
    {
      icon: ShieldAlert,
      title: "Infos Menaces Actuelles",
      description: "Restez informé des dernières vulnérabilités, attaques et tendances en matière de sécurité."
    },
    {
      icon: UserCheck,
      title: "Conseils Personnalisés",
      description: "Recevez des recommandations de sécurité adaptées à vos besoins et à votre contexte."
    }
  ];

  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-foreground p-8 overflow-y-auto">
      <header className="text-center my-12 md:my-16">
        <Logo className="mx-auto mb-6" width={180} height={180} priority />
        {/* Le texte descriptif a été retiré d'ici */}
      </header>

      <main className="w-full max-w-5xl text-center">
        <div className="max-w-md mx-auto">
          <Link href="/auth" passHref>
            <Button size="lg" className="w-full group">
              Démarrer
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <p className="mt-6 text-sm text-muted-foreground">
            Sécurisez votre monde numérique, une conversation à la fois.
          </p>
        </div>

        <section className="mt-16 md:mt-24 mb-12">
          <h2 className="text-3xl font-bold font-headline text-primary mb-4">Découvrez Securibot</h2>
          <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
            Explorez les fonctionnalités clés conçues pour vous offrir une assistance experte en cybersécurité.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </section>
      </main>

      <footer className="w-full text-center text-sm text-muted-foreground py-8 mt-auto">
        © {new Date().getFullYear()} Securibot. Tous droits réservés.
      </footer>
    </div>
  );
}
