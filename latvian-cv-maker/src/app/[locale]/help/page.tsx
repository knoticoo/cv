'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Layout, 
  Download, 
  Lightbulb, 
  HelpCircle, 
  Mail,
  ArrowRight,
  FileText,
  Globe,
  Shield,
  Zap,
  Users
} from 'lucide-react';

export default function HelpPage() {
  const t = useTranslations('help');

  const helpSections = [
    {
      icon: BookOpen,
      title: t('gettingStarted.title'),
      description: t('gettingStarted.description'),
      link: '/create'
    },
    {
      icon: Layout,
      title: t('templates.title'),
      description: t('templates.description'),
      link: '/templates'
    },
    {
      icon: Download,
      title: t('export.title'),
      description: t('export.description'),
      link: '/create'
    },
    {
      icon: Lightbulb,
      title: t('tips.title'),
      description: t('tips.description'),
      link: '#'
    },
    {
      icon: HelpCircle,
      title: t('faq.title'),
      description: t('faq.description'),
      link: '#'
    },
    {
      icon: Mail,
      title: t('contact.title'),
      description: t('contact.description'),
      link: 'mailto:support@latvian-cv-maker.com'
    }
  ];

  const quickTips = [
    {
      icon: FileText,
      title: "CV Writing Basics",
      tip: "Keep your CV concise (1-2 pages) and tailor it to each job application."
    },
    {
      icon: Globe,
      title: "Language Selection",
      tip: "Choose the language based on the job requirements and company location."
    },
    {
      icon: Shield,
      title: "Data Privacy",
      tip: "Your CV data is stored locally and never shared with third parties."
    },
    {
      icon: Zap,
      title: "Quick Actions",
      tip: "Use the mobile quick actions for faster navigation on small screens."
    },
    {
      icon: Users,
      title: "Professional Network",
      tip: "Include relevant social media profiles like LinkedIn for networking."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Help Sections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {helpSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{section.title}</CardTitle>
                  <CardDescription className="text-base">
                    {section.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      if (section.link.startsWith('mailto:')) {
                        window.location.href = section.link;
                      } else if (section.link !== '#') {
                        window.location.href = section.link;
                      }
                    }}
                  >
                    {section.link === '#' ? 'Coming Soon' : 'Get Started'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Tips Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Quick Tips</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickTips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <Card key={index} className="border-l-4 border-l-primary">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{tip.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{tip.tip}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How do I create my first CV?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Click on &quot;Create CV&quot; in the navigation, then fill out the forms step by step. 
                  You can see a live preview of your CV as you type.
                </p>
                <Button variant="outline" onClick={() => window.location.href = '/create'}>
                  Start Creating CV
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Which template should I choose?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  <strong>Europass:</strong> Best for EU applications and government jobs<br/>
                  <strong>Modern:</strong> Great for tech and creative industries<br/>
                  <strong>Traditional:</strong> Perfect for conservative industries like finance<br/>
                  <strong>Creative:</strong> Ideal for design, marketing, and creative roles
                </p>
                <Button variant="outline" onClick={() => window.location.href = '/templates'}>
                  View Templates
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How do I export my CV?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  After creating your CV, use the download button in the preview panel. 
                  You can export as PDF, Word document, or text format. PDF is recommended for job applications.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is my data secure?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Yes! Your CV data is stored locally in your browser and never sent to our servers. 
                  We use local storage to ensure your privacy and data security.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I use this for international jobs?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Absolutely! Our CV maker supports Latvian, Russian, and English languages. 
                  The Europass template is internationally recognized and perfect for EU applications.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Need More Help?</CardTitle>
              <CardDescription>
                                  Can&apos;t find what you&apos;re looking for? Contact our support team.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  We&apos;re here to help you create the perfect CV for your career goals.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    onClick={() => window.location.href = 'mailto:support@latvian-cv-maker.com'}
                    className="flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Email Support
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => window.location.href = '/create'}
                  >
                    <FileText className="w-4 h-4" />
                    Start Creating CV
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}