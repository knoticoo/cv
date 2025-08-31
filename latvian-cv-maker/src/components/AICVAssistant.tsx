'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { CVData } from '@/types/cv';
import { aiService, AIResponse, CVGenerationRequest, CVImprovementRequest } from '@/lib/ai-service';
import { AI_CONFIG, SupportedLanguage } from '@/lib/ai-config';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles, Wand2, Languages, FileText, Target, Zap } from 'lucide-react';

interface AICVAssistantProps {
  cvData?: CVData;
  onCVUpdate?: (updates: Partial<CVData>) => void;
}

export default function AICVAssistant({ cvData, onCVUpdate }: AICVAssistantProps) {
  const t = useTranslations('ai');
  
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('lv');
  const [serviceStatus, setServiceStatus] = useState<'checking' | 'healthy' | 'unhealthy'>('checking');
  
  // CV Generation state
  const [generationForm, setGenerationForm] = useState({
    jobTitle: '',
    experience: '',
    education: '',
    skills: '',
    additionalInfo: '',
  });
  
  // CV Improvement state
  const [improvementForm, setImprovementForm] = useState({
    improvementType: 'content' as const,
    specificFeedback: '',
  });
  
  // Job-specific CV state
  const [jobDescription, setJobDescription] = useState('');

  // Check AI service health on mount
  const checkServiceHealth = useCallback(async () => {
    setServiceStatus('checking');
    try {
      const health = await aiService.getHealthStatus();
      setServiceStatus(health.status === 'healthy' ? 'healthy' : 'unhealthy');
    } catch (error) {
      setServiceStatus('unhealthy');
    }
  }, []);

  // Check health on mount
  useState(() => {
    checkServiceHealth();
  });

  const handleGenerateCV = async () => {
    if (!generationForm.jobTitle.trim()) {
      setAiResponse({ success: false, error: 'Please provide a job title' });
      return;
    }

    setIsLoading(true);
    setAiResponse(null);

    try {
      const request: CVGenerationRequest = {
        language: selectedLanguage,
        jobTitle: generationForm.jobTitle,
        experience: generationForm.experience,
        education: generationForm.education,
        skills: generationForm.skills.split(',').map(s => s.trim()).filter(Boolean),
        additionalInfo: generationForm.additionalInfo,
      };

      const response = await aiService.generateProfessionalCV(request);
      setAiResponse(response);
    } catch (error) {
      setAiResponse({ success: false, error: 'Failed to generate CV' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImproveCV = async () => {
    if (!cvData) {
      setAiResponse({ success: false, error: 'No CV data available for improvement' });
      return;
    }

    setIsLoading(true);
    setAiResponse(null);

    try {
      const request: CVImprovementRequest = {
        cvData,
        language: selectedLanguage,
        improvementType: improvementForm.improvementType,
        specificFeedback: improvementForm.specificFeedback,
      };

      const response = await aiService.improveCV(request);
      setAiResponse(response);
    } catch (error) {
      setAiResponse({ success: false, error: 'Failed to improve CV' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleJobSpecificCV = async () => {
    if (!jobDescription.trim()) {
      setAiResponse({ success: false, error: 'Please provide a job description' });
      return;
    }

    setIsLoading(true);
    setAiResponse(null);

    try {
      const response = await aiService.generateJobSpecificCV(jobDescription, selectedLanguage);
      setAiResponse(response);
    } catch (error) {
      setAiResponse({ success: false, error: 'Failed to generate job-specific CV' });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = () => {
    switch (serviceStatus) {
      case 'healthy': return 'text-green-600';
      case 'unhealthy': return 'text-red-600';
      default: return 'text-yellow-600';
    }
  };

  const getStatusIcon = () => {
    switch (serviceStatus) {
      case 'healthy': return '🟢';
      case 'unhealthy': return '🔴';
      default: return '🟡';
    }
  };

  return (
    <div className="space-y-6">
      {/* Service Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            AI Service Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <span className={getStatusColor()}>
              {getStatusIcon()} {serviceStatus === 'checking' ? 'Checking...' : serviceStatus === 'healthy' ? 'Ready' : 'Unavailable'}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={checkServiceHealth}
              disabled={serviceStatus === 'checking'}
            >
              Refresh
            </Button>
          </div>
          {serviceStatus === 'unhealthy' && (
            <p className="text-sm text-red-600 mt-2">
              Please ensure Ollama is running with a compatible model (llama2:3b, mistral:7b-instruct-q4_0, or phi3:mini)
            </p>
          )}
        </CardContent>
      </Card>

      {/* Language Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="h-5 w-5" />
            Language Selection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedLanguage} onValueChange={(value: SupportedLanguage) => setSelectedLanguage(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lv">Latviešu (Latvian)</SelectItem>
              <SelectItem value="ru">Русский (Russian)</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* CV Generation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Generate Professional CV
          </CardTitle>
          <CardDescription>
            Create a complete professional CV from scratch using AI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Job Title *</label>
              <input
                type="text"
                value={generationForm.jobTitle}
                onChange={(e) => setGenerationForm(prev => ({ ...prev, jobTitle: e.target.value }))}
                placeholder="e.g., Software Developer"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Experience Level</label>
              <input
                type="text"
                value={generationForm.experience}
                onChange={(e) => setGenerationForm(prev => ({ ...prev, experience: e.target.value }))}
                placeholder="e.g., Entry level, Mid-level"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium">Education</label>
            <input
              type="text"
              value={generationForm.education}
              onChange={(e) => setGenerationForm(prev => ({ ...prev, education: e.target.value }))}
              placeholder="e.g., Bachelor's degree in Computer Science"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Skills (comma-separated)</label>
            <input
              type="text"
              value={generationForm.skills}
              onChange={(e) => setGenerationForm(prev => ({ ...prev, skills: e.target.value }))}
              placeholder="e.g., Programming, Problem solving, Teamwork"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Additional Information</label>
            <textarea
              value={generationForm.additionalInfo}
              onChange={(e) => setGenerationForm(prev => ({ ...prev, additionalInfo: e.target.value }))}
              placeholder="Any additional context or requirements..."
              rows={3}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <Button 
            onClick={handleGenerateCV} 
            disabled={isLoading || serviceStatus !== 'healthy'}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating CV...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Professional CV
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* CV Improvement */}
      {cvData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5" />
              Improve Existing CV
            </CardTitle>
            <CardDescription>
              Get AI-powered suggestions to enhance your current CV
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Improvement Type</label>
              <Select 
                value={improvementForm.improvementType} 
                onValueChange={(value: any) => setImprovementForm(prev => ({ ...prev, improvementType: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="content">Content & Impact</SelectItem>
                  <SelectItem value="structure">Structure & Organization</SelectItem>
                  <SelectItem value="language">Language & Grammar</SelectItem>
                  <SelectItem value="professional">Professional Standards</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Specific Feedback (Optional)</label>
              <textarea
                value={improvementForm.specificFeedback}
                onChange={(e) => setImprovementForm(prev => ({ ...prev, specificFeedback: e.target.value }))}
                placeholder="Any specific areas you'd like me to focus on..."
                rows={3}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <Button 
              onClick={handleImproveCV} 
              disabled={isLoading || serviceStatus !== 'healthy'}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing CV...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Improve CV
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Job-Specific CV */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Job-Specific CV Optimization
          </CardTitle>
          <CardDescription>
            Tailor your CV for a specific job opportunity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Job Description</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here to get tailored CV suggestions..."
              rows={6}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <Button 
            onClick={handleJobSpecificCV} 
            disabled={isLoading || serviceStatus !== 'healthy'}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Job...
              </>
            ) : (
              <>
                <Target className="mr-2 h-4 w-4" />
                Optimize for This Job
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* AI Response */}
      {aiResponse && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-4" />
              AI Response
            </CardTitle>
          </CardHeader>
          <CardContent>
            {aiResponse.success ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    {aiResponse.language === 'lv' ? 'Latviešu' : aiResponse.language === 'ru' ? 'Русский' : 'English'}
                  </Badge>
                  <Badge variant="outline">AI Generated</Badge>
                </div>
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-md border">
                    {aiResponse.content}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="text-red-600 bg-red-50 p-4 rounded-md border">
                <strong>Error:</strong> {aiResponse.error}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}