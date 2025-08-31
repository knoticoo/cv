'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Crown, Palette, Download, HardDrive, Settings, 
  Check, X, Star, Zap, Shield, Gift 
} from 'lucide-react';

export default function PremiumFeatures() {
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'professional' | 'executive'>('professional');

  const plans = {
    basic: {
      name: 'Pamata',
      price: '€4.99',
      period: 'mēnesī',
      description: 'Ideāls sākumam ar papildu veidnēm',
      features: [
        'Visas pamata veidnes',
        '3 Premium radošās veidnes',
        'PDF eksports augstā kvalitātē',
        'Pielāgojamas krāsas',
        'Watermark noņemšana',
        'Prioritārs atbalsts'
      ],
      notIncluded: [
        'Neierobežotas CV versijas',
        'Mākoņu sinhronizācija',
        'Papildu eksporta formāti',
        'Pielāgojami lauki'
      ]
    },
    professional: {
      name: 'Profesionāls',
      price: '€9.99',
      period: 'mēnesī',
      description: 'Pilnas funkcijas aktīviem darba meklētājiem',
      features: [
        'Visas Premium veidnes',
        'Neierobežotas CV versijas',
        'Mākoņu sinhronizācija',
        'Visi eksporta formāti (PDF, Word, HTML)',
        'Pielāgojami lauki un sadaļas',
        'QR kodu ģenerēšana',
        'Versiju vēsture',
        'Komandas sadarbība',
        'Prioritārs atbalsts'
      ],
      notIncluded: [
        'Personīgā konsultācija'
      ]
    },
    executive: {
      name: 'Vadītājs',
      price: '€19.99',
      period: 'mēnesī',
      description: 'Premium pakalpojumi vadošām pozīcijām',
      features: [
        'Viss no Professional plāna',
        'Personīgā CV konsultācija (1h/mēnesī)',
        'Ekskluzīvas Executive veidnes',
        'Pielāgots brending',
        'White-label risinājums',
        'Prioritārs tehniskais atbalsts',
        'Karjeras konsultācijas',
        'Nozares analītikas pārskati'
      ],
      notIncluded: []
    }
  };

  const designFeatures = [
    {
      title: 'Pielāgojamas Krāsas',
      description: 'Izvēlieties krāsu paleti, kas atbilst jūsu personīgajam brendam',
      icon: Palette,
      premium: 'basic'
    },
    {
      title: 'Premium Fonti',
      description: 'Piekļuve ekskluzīviem fontiem profesionālam izskatam',
      icon: Star,
      premium: 'basic'
    },
    {
      title: 'Layout Variācijas',
      description: 'Dažādas izkārtojuma opcijas katrai veidnei',
      icon: Settings,
      premium: 'professional'
    },
    {
      title: 'Pielāgojamas Sadaļas',
      description: 'Izveidojiet pielāgotas CV sadaļas savām vajadzībām',
      icon: Zap,
      premium: 'professional'
    }
  ];

  const exportFeatures = [
    {
      title: 'Vairāki Formāti',
      description: 'PDF, Word, HTML, un TXT eksports',
      icon: Download,
      premium: 'professional'
    },
    {
      title: 'Augsta Izšķirtspēja',
      description: '300 DPI PDF eksports drukāšanai',
      icon: Star,
      premium: 'basic'
    },
    {
      title: 'QR Kodi',
      description: 'Automātiska QR kodu ģenerēšana digitālai piekļuvei',
      icon: Zap,
      premium: 'professional'
    },
    {
      title: 'Batch Eksports',
      description: 'Eksportējiet vairākas CV versijas vienlaikus',
      icon: Download,
      premium: 'executive'
    }
  ];

  const storageFeatures = [
    {
      title: 'Mākoņu Sinhronizācija',
      description: 'Piekļūstiet saviem CV no jebkuras ierīces',
      icon: HardDrive,
      premium: 'professional'
    },
    {
      title: 'Neierobežotas Versijas',
      description: 'Izveidojiet neierobežotu skaitu CV versiju',
      icon: Star,
      premium: 'professional'
    },
    {
      title: 'Versiju Vēsture',
      description: 'Sekojiet izmaiņām un atjaunojiet iepriekšējās versijas',
      icon: Shield,
      premium: 'professional'
    },
    {
      title: 'Komandas Sadarbība',
      description: 'Dalieties ar karjeras konsultantiem vai komandas biedriem',
      icon: Settings,
      premium: 'executive'
    }
  ];

  const getPlanBadge = (requiredPlan: string) => {
    const badges = {
      basic: <Badge className="bg-green-100 text-green-800">Pamata</Badge>,
      professional: <Badge className="bg-blue-100 text-blue-800">Profesionāls</Badge>,
      executive: <Badge className="bg-purple-100 text-purple-800">Vadītājs</Badge>
    };
    return badges[requiredPlan as keyof typeof badges];
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Crown className="w-8 h-8 text-yellow-600 mr-2" />
          <h1 className="text-4xl font-bold text-foreground">Premium Funkcijas</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Paaugstiniet sava CV kvalitāti ar profesionāliem rīkiem un ekskluzīvām funkcijām
        </p>
      </div>

      {/* Pricing Plans */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {Object.entries(plans).map(([planId, plan]) => (
          <Card 
            key={planId}
            className={`relative cursor-pointer transition-all duration-200 ${
              selectedPlan === planId ? 'ring-2 ring-primary shadow-lg scale-105' : 'hover:shadow-lg'
            } ${planId === 'professional' ? 'border-primary' : ''}`}
            onClick={() => setSelectedPlan(planId as any)}
          >
            {planId === 'professional' && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-white px-4 py-1">
                  <Star className="w-3 h-3 mr-1" />
                  Populārākais
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <div className="text-3xl font-bold text-primary">
                {plan.price}
                <span className="text-lg font-normal text-muted-foreground">/{plan.period}</span>
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
              
              {plan.notIncluded.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 opacity-50">
                  <X className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-sm text-gray-500">{feature}</span>
                </div>
              ))}
            </CardContent>

            <div className="p-6 pt-0">
              <Button 
                className="w-full" 
                variant={selectedPlan === planId ? "default" : "outline"}
              >
                {selectedPlan === planId ? 'Izvēlēts' : 'Izvēlēties Plānu'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Feature Categories */}
      <Tabs defaultValue="design" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="design" className="flex items-center space-x-2">
            <Palette className="w-4 h-4" />
            <span>Dizains</span>
          </TabsTrigger>
          <TabsTrigger value="export" className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Eksports</span>
          </TabsTrigger>
          <TabsTrigger value="storage" className="flex items-center space-x-2">
            <HardDrive className="w-4 h-4" />
            <span>Glabāšana</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="design" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {designFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold">{feature.title}</h3>
                        {getPlanBadge(feature.premium)}
                      </div>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="export" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {exportFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold">{feature.title}</h3>
                        {getPlanBadge(feature.premium)}
                      </div>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="storage" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {storageFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold">{feature.title}</h3>
                        {getPlanBadge(feature.premium)}
                      </div>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Gatavs sākt ar Premium?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Pievienojieties tūkstošiem profesionāļu, kas jau izmanto mūsu Premium funkcijas, 
          lai izveidotu izcilus CV un paātrinātu karjeras izaugsmi.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8">
            <Crown className="w-5 h-5 mr-2" />
            Sākt 7 dienu bezmaksas izmēģinājumu
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8">
            <Gift className="w-5 h-5 mr-2" />
            Uzzināt vairāk
          </Button>
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="p-6 bg-gray-50 border-b">
          <h3 className="text-xl font-semibold text-center">Funkciju Salīdzinājums</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-semibold">Funkcija</th>
                <th className="text-center p-4 font-semibold">Bezmaksas</th>
                <th className="text-center p-4 font-semibold">Pamata</th>
                <th className="text-center p-4 font-semibold">Profesionāls</th>
                <th className="text-center p-4 font-semibold">Vadītājs</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-4">Pamata veidnes</td>
                <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
              </tr>
              <tr className="border-b">
                <td className="p-4">Premium radošās veidnes</td>
                <td className="text-center p-4"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                <td className="text-center p-4"><span className="text-sm">3 veidnes</span></td>
                <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
              </tr>
              <tr className="border-b">
                <td className="p-4">PDF eksports</td>
                <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
              </tr>
              <tr className="border-b">
                <td className="p-4">Pielāgojamas krāsas</td>
                <td className="text-center p-4"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
              </tr>
              <tr className="border-b">
                <td className="p-4">Mākoņu sinhronizācija</td>
                <td className="text-center p-4"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                <td className="text-center p-4"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
              </tr>
              <tr className="border-b">
                <td className="p-4">Personīgā konsultācija</td>
                <td className="text-center p-4"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                <td className="text-center p-4"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                <td className="text-center p-4"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Free Trial CTA */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6 text-center">
        <h3 className="text-xl font-semibold text-green-800 mb-2">
          🎉 Bezmaksas 7 dienu izmēģinājums
        </h3>
        <p className="text-green-700 mb-4">
          Izmēģiniet visas Premium funkcijas bez maksas. Nav nepieciešama kredītkarte.
        </p>
        <Button className="bg-green-600 hover:bg-green-700">
          Sākt Bezmaksas Izmēģinājumu
        </Button>
      </div>
    </div>
  );
}