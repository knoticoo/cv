'use client';

import { useState } from 'react';
import { CVData } from '@/types/cv';
import { templates, templateStyles } from '@/lib/templates';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown, Check, Eye } from 'lucide-react';
import TemplatePreviewModal from './TemplatePreviewModal';

interface TemplateSelectorProps {
  cvData: CVData;
  onTemplateChange: (templateId: string) => void;
  selectedTemplate: string;
}

export default function TemplateSelector({ cvData, onTemplateChange, selectedTemplate }: TemplateSelectorProps) {
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const handleTemplateSelect = (templateId: string) => {
    onTemplateChange(templateId);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      europass: 'bg-blue-100 text-blue-800 border-blue-200',
      modern: 'bg-green-100 text-green-800 border-green-200',
      traditional: 'bg-gray-100 text-gray-800 border-gray-200',
      creative: 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors[category as keyof typeof colors] || colors.modern;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Izvēlieties CV Veidni</h2>
        <p className="text-muted-foreground">
          Katrai veidnei ir savs stils un mērķauditorija
        </p>
      </div>

      {/* Template Categories */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <Badge className="bg-blue-100 text-blue-800">
          Europass - ES standarts
        </Badge>
        <Badge className="bg-green-100 text-green-800">
          Modern - Mūsdienīgs
        </Badge>
        <Badge className="bg-gray-100 text-gray-800">
          Traditional - Konservatīvs
        </Badge>
        <Badge className="bg-purple-100 text-purple-800">
          Creative - Radošs
        </Badge>
      </div>

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => {
          const isSelected = selectedTemplate === template.id;
          const style = templateStyles[template.id as keyof typeof templateStyles];
          
          return (
            <Card 
              key={template.id} 
              className={`group cursor-pointer transition-all duration-200 hover:shadow-lg ${
                isSelected ? 'ring-2 ring-primary shadow-lg' : ''
              }`}
              onClick={() => handleTemplateSelect(template.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center">
                    {template.name}
                    {isSelected && (
                      <Check className="w-4 h-4 ml-2 text-primary" />
                    )}
                  </CardTitle>
                  {template.isPremium && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                      <Crown className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-sm">{template.description}</CardDescription>
              </CardHeader>

              <CardContent className="pb-4">
                {/* Template Preview */}
                <div 
                  className="aspect-[3/4] rounded-lg mb-4 flex items-center justify-center border-2 transition-colors"
                  style={{ 
                    backgroundColor: style?.secondaryColor || '#f8f9fa',
                    borderColor: style?.primaryColor || '#6b7280'
                  }}
                >
                  <div className="text-center">
                    <div 
                      className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-xl font-bold"
                      style={{ backgroundColor: style?.primaryColor || '#6b7280' }}
                    >
                      {template.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="space-y-1">
                      <div 
                        className="h-2 rounded mx-auto"
                        style={{ 
                          backgroundColor: style?.primaryColor || '#6b7280',
                          width: '80%'
                        }}
                      />
                      <div 
                        className="h-1 rounded mx-auto opacity-60"
                        style={{ 
                          backgroundColor: style?.primaryColor || '#6b7280',
                          width: '60%'
                        }}
                      />
                      <div 
                        className="h-1 rounded mx-auto opacity-40"
                        style={{ 
                          backgroundColor: style?.primaryColor || '#6b7280',
                          width: '70%'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Template Features */}
                <div className="space-y-2">
                  <div className={`inline-block px-2 py-1 rounded text-xs font-medium border ${getCategoryColor(template.category)}`}>
                    {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {style?.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>

              <div className="px-6 pb-4">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewTemplate(template.id);
                      setIsPreviewModalOpen(true);
                    }}
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    Skatīt
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1"
                    variant={isSelected ? "default" : "outline"}
                  >
                    {isSelected ? 'Izvēlēts' : 'Izmantot'}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Premium Info */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6 text-center">
        <div className="flex items-center justify-center mb-4">
          <Crown className="w-6 h-6 text-yellow-600 mr-2" />
          <h3 className="text-lg font-semibold text-yellow-800">Premium Veidnes</h3>
        </div>
        <p className="text-yellow-700 mb-4">
          Piekļūstiet ekskluzīvām radošajām veidnēm ar unikālu dizainu un papildu funkcijām
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <Badge className="bg-yellow-100 text-yellow-800">Kreatīvs dizains</Badge>
          <Badge className="bg-yellow-100 text-yellow-800">Unikālas krāsas</Badge>
          <Badge className="bg-yellow-100 text-yellow-800">Vizuāli elementi</Badge>
          <Badge className="bg-yellow-100 text-yellow-800">Portfolio integrācija</Badge>
        </div>
        <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
          Iegūt Premium Piekļuvi
        </Button>
      </div>

      {/* Template Preview Modal */}
      <TemplatePreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        template={templates.find(t => t.id === previewTemplate) || null}
        onSelectTemplate={handleTemplateSelect}
        selectedTemplate={selectedTemplate}
      />
    </div>
  );
}