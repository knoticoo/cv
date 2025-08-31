import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { FileText, Layout, Globe, Shield, Zap, Users } from 'lucide-react';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';

export default function HomePage() {
  const t = useTranslations();

  const features = [
    {
      icon: Globe,
      title: t('homepage.features.multilingual.title'),
      description: t('homepage.features.multilingual.description')
    },
    {
      icon: Layout,
      title: t('homepage.features.europass.title'),
      description: t('homepage.features.europass.description')
    },
    {
      icon: Shield,
      title: t('homepage.features.security.title'),
      description: t('homepage.features.security.description')
    },
    {
      icon: Zap,
      title: t('homepage.features.fast.title'),
      description: t('homepage.features.fast.description')
    },
    {
      icon: Users,
      title: t('homepage.features.employer.title'),
      description: t('homepage.features.employer.description')
    },
    {
      icon: FileText,
      title: t('homepage.features.formats.title'),
      description: t('homepage.features.formats.description')
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-br from-primary/5 to-secondary/10 rounded-2xl">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            {t('homepage.hero.title')}
            <span className="block text-primary">{t('homepage.hero.subtitle')}</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('homepage.hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/create">
              <Button size="lg" className="text-lg px-8 py-3">
                <FileText className="w-5 h-5 mr-2" />
                {t('homepage.hero.startButton')}
              </Button>
            </Link>
            <Link href="/templates">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                <Layout className="w-5 h-5 mr-2" />
                {t('homepage.hero.templatesButton')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t('homepage.features.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('homepage.features.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="p-6 border rounded-xl hover:shadow-lg transition-shadow bg-card"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5 rounded-2xl text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t('homepage.cta.title')}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {t('homepage.cta.description')}
          </p>
          <Link href="/create">
            <Button size="lg" className="text-lg px-8 py-3">
              {t('homepage.cta.button')}
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t pt-8 pb-4">
        <div className="text-center text-sm text-muted-foreground">
          <p>{t('homepage.footer.copyright')}</p>
          <p className="mt-2">
            {t('homepage.footer.madeWith')}
          </p>
        </div>
      </footer>

      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
    </div>
  );
}