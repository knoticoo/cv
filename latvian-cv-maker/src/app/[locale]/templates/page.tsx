import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Star, Crown } from 'lucide-react';

export default function TemplatesPage() {
  const t = useTranslations();

  const templates = [
    {
      id: 'europass',
      name: 'Europass',
      description: 'Oficiālā ES CV veidne, plaši atzīta visā Eiropā',
      category: 'europass',
      preview: '/templates/europass-preview.jpg',
      isPremium: false,
      features: ['EU standarts', 'Daudzvalodu atbalsts', 'ATS saderīgs']
    },
    {
      id: 'modern-professional',
      name: 'Mūsdienīgs profesionāls',
      description: 'Tīrs, mūsdienīgs dizains ar uzsvaru uz lasāmību',
      category: 'modern',
      preview: '/templates/modern-preview.jpg',
      isPremium: false,
      features: ['Minimālistisks', 'Foto atbalsts', 'Krāsu akcenti']
    },
    {
      id: 'traditional-business',
      name: 'Tradicionāls biznesa',
      description: 'Konservatīvs stils, piemērots tradicionālām nozarēm',
      category: 'traditional',
      preview: '/templates/traditional-preview.jpg',
      isPremium: false,
      features: ['Konservatīvs', 'Profesionāls', 'Drukāšanai optimizēts']
    },
    {
      id: 'creative-designer',
      name: 'Radošs dizaineris',
      description: 'Kreatīvs dizains radošajām profesijām',
      category: 'creative',
      preview: '/templates/creative-preview.jpg',
      isPremium: true,
      features: ['Kreatīvs dizains', 'Krāsains', 'Portfolio integrācija']
    },
    {
      id: 'tech-specialist',
      name: 'IT speciālists',
      description: 'Optimizēts IT un tehnoloģiju profesijām',
      category: 'modern',
      preview: '/templates/tech-preview.jpg',
      isPremium: true,
      features: ['Tehniskās prasmes', 'GitHub integrācija', 'Projektu sadaļa']
    },
    {
      id: 'executive-premium',
      name: 'Vadītāja Premium',
      description: 'Elegants dizains augsta līmeņa pozīcijām',
      category: 'modern',
      preview: '/templates/executive-preview.jpg',
      isPremium: true,
      features: ['Luksusa dizains', 'Vadības pieredze', 'Sasniegumu fokuss']
    }
  ];

  const categories = [
    { id: 'all', name: 'Visas veidnes' },
    { id: 'europass', name: 'Europass' },
    { id: 'modern', name: 'Mūsdienīgas' },
    { id: 'traditional', name: 'Tradicionālas' },
    { id: 'creative', name: 'Radošas' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          CV Veidnes
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Izvēlieties veidni, kas vislabāk atbilst jūsu profesijai un personīgajam stilam. 
          Visas veidnes ir optimizētas Latvijas darba tirgum.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={category.id === 'all' ? 'default' : 'outline'}
            size="sm"
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="group hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{template.name}</CardTitle>
                {template.isPremium && (
                  <Badge variant="secondary" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </div>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>

            <CardContent className="pb-4">
              {/* Template Preview */}
              <div className="aspect-[3/4] bg-gray-100 rounded-lg mb-4 flex items-center justify-center border">
                <div className="text-center text-gray-500">
                  <Eye className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">Priekšskatījums</p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Īpašības:</p>
                <div className="flex flex-wrap gap-1">
                  {template.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>

            <CardFooter className="pt-0">
              <div className="flex w-full gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  Priekšskatīt
                </Button>
                <Link href={`/create?template=${template.id}`} className="flex-1">
                  <Button size="sm" className="w-full">
                    Izmantot
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Premium Info */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6 text-center">
        <div className="flex items-center justify-center mb-4">
          <Crown className="w-8 h-8 text-yellow-600 mr-2" />
          <h3 className="text-xl font-semibold text-yellow-800">Premium Veidnes</h3>
        </div>
        <p className="text-yellow-700 mb-4">
          Piekļūstiet ekskluzīvām veidnēm ar papildu funkcijām un unikālu dizainu
        </p>
        <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
          Uzzināt vairāk par Premium
        </Button>
      </div>
    </div>
  );
}