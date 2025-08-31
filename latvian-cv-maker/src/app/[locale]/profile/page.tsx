'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { CVData } from '@/types/cv';
import { storage } from '@/lib/storage';

// Simple auth check
const checkAuth = () => {
  if (typeof window === 'undefined') return null;
  const session = localStorage.getItem('user-session');
  return session ? JSON.parse(session) : null;
};
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Edit, 
  Eye, 
  Download, 
  Trash2, 
  Calendar, 
  FileText, 
  User,
  Briefcase,
  GraduationCap,
  Star,
  Languages,
  Monitor,
  LogOut
} from 'lucide-react';

export default function ProfilePage() {
  const t = useTranslations('navigation');
  const router = useRouter();
  
  const [savedCVs, setSavedCVs] = useState<CVData[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const authUser = checkAuth();
    if (!authUser) {
      router.push('/auth/login');
      return;
    }
    setUser(authUser);
    loadSavedCVs();
  }, [router]);

  const loadSavedCVs = () => {
    const cvs = storage.getSavedCVs();
    setSavedCVs(cvs);
    setLoading(false);
  };

  const handleCreateNew = () => {
    router.push('/create');
  };

  const handleEditCV = (cvId: string) => {
    router.push(`/create?id=${cvId}`);
  };

  const handleViewCV = (cvId: string) => {
    router.push(`/preview/${cvId}`);
  };

  const handleDeleteCV = (cvId: string) => {
    if (confirm('Are you sure you want to delete this CV?')) {
      storage.deleteCV(cvId);
      loadSavedCVs();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user-session');
    router.push('/');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('lv-LV', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getLanguageLabel = (lang: string) => {
    const labels = {
      lv: 'Latviešu',
      ru: 'Русский',
      en: 'English'
    };
    return labels[lang as keyof typeof labels] || lang;
  };

  const getTemplateLabel = (template: string) => {
    const labels = {
      modern: 'Modernais',
      europass: 'Europass',
      creative: 'Kreatīvais',
      minimalist: 'Minimālistiskais',
      portfolio: 'Portfolio',
      infographic: 'Infografika'
    };
    return labels[template as keyof typeof labels] || template;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-24 w-24 sm:h-32 sm:w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground text-sm sm:text-base">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Mans Profils
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
                Pārvaldiet savus saglabātos CV un izveidojiet jaunus
              </p>
            </div>
            
            {user && (
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-medium">{user.firstName} {user.lastName}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Iziet
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Create New CV Button */}
        <div className="mb-6 lg:mb-8">
          <Button 
            onClick={handleCreateNew}
            size="lg"
            className="w-full sm:w-auto"
          >
            <Plus className="w-5 h-5 mr-2" />
            Izveidot jaunu CV
          </Button>
        </div>

        {/* CV List */}
        {savedCVs.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nav saglabātu CV</h3>
              <p className="text-muted-foreground mb-6">
                Jums vēl nav izveidots neviens CV. Sāciet ar jauna CV izveidi!
              </p>
              <Button onClick={handleCreateNew}>
                <Plus className="w-4 h-4 mr-2" />
                Izveidot pirmo CV
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:gap-6 lg:gap-8">
            {savedCVs.map((cv) => (
              <Card key={cv.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-lg sm:text-xl mb-2">
                        {cv.personalInfo.firstName} {cv.personalInfo.lastName}
                      </CardTitle>
                      <CardDescription className="text-sm sm:text-base">
                        {cv.personalInfo.email} • {cv.personalInfo.phone}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {getLanguageLabel(cv.language)}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {getTemplateLabel(cv.template)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {/* CV Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Briefcase className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <p className="text-sm font-medium">{cv.workExperience.length}</p>
                      <p className="text-xs text-muted-foreground">Darba pieredze</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <GraduationCap className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <p className="text-sm font-medium">{cv.education.length}</p>
                      <p className="text-xs text-muted-foreground">Izglītība</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Star className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <p className="text-sm font-medium">{cv.skills.length}</p>
                      <p className="text-xs text-muted-foreground">Prasmes</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Languages className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <p className="text-sm font-medium">{cv.languageSkills.length}</p>
                      <p className="text-xs text-muted-foreground">Valodas</p>
                    </div>
                  </div>

                  {/* Last Updated */}
                  <div className="flex items-center text-sm text-muted-foreground mb-6">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Pēdējoreiz atjaunināts: {formatDate(cv.updatedAt)}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewCV(cv.id)}
                      className="flex-1 sm:flex-none"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Skatīt
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEditCV(cv.id)}
                      className="flex-1 sm:flex-none"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Rediģēt
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 sm:flex-none"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Lejupielādēt
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDeleteCV(cv.id)}
                      className="flex-1 sm:flex-none text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Dzēst
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Quick Stats */}
        {savedCVs.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg">Kopsavilkums</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{savedCVs.length}</p>
                  <p className="text-sm text-muted-foreground">Kopā CV</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {savedCVs.filter(cv => cv.language === 'lv').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Latviešu valodā</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {savedCVs.filter(cv => cv.language === 'en').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Angļu valodā</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">
                    {savedCVs.filter(cv => cv.language === 'ru').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Krievu valodā</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}