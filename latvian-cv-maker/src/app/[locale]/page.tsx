import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { FileText, Layout, Globe, Shield, Zap, Users } from 'lucide-react';

export default function HomePage() {
  const t = useTranslations();

  const features = [
    {
      icon: Globe,
      title: "Daudzvalodu atbalsts",
      description: "Izveidojiet CV latviešu, krievu un angļu valodās"
    },
    {
      icon: Layout,
      title: "Europass saderība",
      description: "Profesionālas veidnes, kas atbilst ES standartiem"
    },
    {
      icon: Shield,
      title: "Datu drošība",
      description: "Jūsu personālā informācija ir droši aizsargāta"
    },
    {
      icon: Zap,
      title: "Ātrs un vienkārš",
      description: "Izveidojiet CV dažās minūtēs ar mūsu intuitīvo redaktoru"
    },
    {
      icon: Users,
      title: "Darba devēju iecienīts",
      description: "Optimizēts Latvijas darba tirgum un ATS sistēmām"
    },
    {
      icon: FileText,
      title: "Vairāki formāti",
      description: "Eksportējiet PDF, Word vai teksta formātā"
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-br from-primary/5 to-secondary/10 rounded-2xl">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Profesionāls CV veidotājs
            <span className="block text-primary">Latvijas tirgum</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Izveidojiet izcilu CV dažās minūtēs. Daudzvalodu atbalsts, Europass saderība 
            un optimizācija Latvijas darba devējiem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/create">
              <Button size="lg" className="text-lg px-8 py-3">
                <FileText className="w-5 h-5 mr-2" />
                Sākt veidot CV
              </Button>
            </Link>
            <Link href="/templates">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                <Layout className="w-5 h-5 mr-2" />
                Apskatīt veidnes
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Kāpēc izvēlēties mūsu CV veidotāju?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mēs esam izveidojuši šo rīku speciāli Latvijas darba tirgum, 
            ņemot vērā vietējos standartus un prasības.
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
            Gatavs sākt?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Pievienojieties tūkstošiem lietotāju, kas jau ir izveidojuši 
            savus profesionālos CV ar mūsu palīdzību.
          </p>
          <Link href="/create">
            <Button size="lg" className="text-lg px-8 py-3">
              Izveidot CV tagad
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t pt-8 pb-4">
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2024 Latvian CV Maker. Visi tiesības aizsargātas.</p>
          <p className="mt-2">
            Izveidots ar ❤️ Latvijas darba meklētājiem
          </p>
        </div>
      </footer>
    </div>
  );
}