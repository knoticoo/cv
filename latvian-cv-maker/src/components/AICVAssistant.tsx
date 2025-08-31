'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { CVData } from '@/types/cv';
import { aiService, AIResponse } from '@/lib/ai-service';
import { AI_CONFIG, SupportedLanguage } from '@/lib/ai-config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles, Send, User, Bot, CheckCircle, RefreshCw } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface AICVAssistantProps {
  cvData?: CVData;
  onCVUpdate?: (updates: Partial<CVData>) => void;
}

export default function AICVAssistant({ cvData, onCVUpdate }: AICVAssistantProps) {
  const t = useTranslations('ai');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [serviceStatus, setServiceStatus] = useState<'checking' | 'healthy' | 'unhealthy'>('checking');
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('lv');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: selectedLanguage === 'lv' 
        ? 'Sveiki! 👋 Es esmu jūsu AI CV palīgs. Es palīdzēšu jums izveidot profesionālu CV. Sāksim ar pamatinformāciju - kādu amatu jūs meklējat?'
        : selectedLanguage === 'ru'
        ? 'Привет! 👋 Я ваш AI помощник по созданию CV. Я помогу вам создать профессиональное резюме. Начнем с основной информации - какую должность вы ищете?'
        : 'Hello! 👋 I\'m your AI CV assistant. I\'ll help you create a professional CV. Let\'s start with basic information - what job position are you looking for?',
      timestamp: new Date()
    }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [cvSummary, setCvSummary] = useState<string | null>(null);
  const [isGeneratingCV, setIsGeneratingCV] = useState(false);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Update greeting message when language changes
  useEffect(() => {
    if (messages.length === 1 && messages[0].type === 'ai') {
      const newGreeting = selectedLanguage === 'lv' 
        ? 'Sveiki! 👋 Es esmu jūsu AI CV palīgs. Es palīdzēšu jums izveidot profesionālu CV. Sāksim ar pamatinformāciju - kādu amatu jūs meklējat?'
        : selectedLanguage === 'ru'
        ? 'Привет! 👋 Я ваш AI помощник по созданию CV. Я помогу вам создать профессиональное резюме. Начнем с основной информации - какую должность вы ищете?'
        : 'Hello! 👋 I\'m your AI CV assistant. I\'ll help you create a professional CV. Let\'s start with basic information - what job position are you looking for?';
      
      setMessages([
        {
          id: '1',
          type: 'ai',
          content: newGreeting,
          timestamp: new Date()
        }
      ]);
    }
  }, [selectedLanguage]);

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

  useEffect(() => {
    checkServiceHealth();
  }, [checkServiceHealth]);

  const addMessage = (type: 'user' | 'ai', content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    if (!currentInput.trim() || isLoading) return;

    const userMessage = currentInput.trim();
    setCurrentInput('');
    addMessage('user', userMessage);
    setIsLoading(true);

    try {
      // Generate AI response based on conversation context
      const response = await aiService.generateConversationalResponse({
        userMessage,
        conversationHistory: messages,
        language: selectedLanguage,
        cvData
      });

      if (response.success && response.content) {
        addMessage('ai', response.content);
        
        // Check if AI has enough information to generate CV summary
        if (response.content.includes('CV kopsavilkums') || response.content.includes('CV summary')) {
          setCvSummary(response.content);
        }
      } else {
        addMessage('ai', 'Atvainojiet, radās kļūda. Lūdzu mēģiniet vēlreiz.');
      }
    } catch (error) {
      addMessage('ai', 'Atvainojiet, radās kļūda. Lūdzu mēģiniet vēlreiz.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateCV = async () => {
    if (!cvSummary) return;
    
    setIsGeneratingCV(true);
    try {
      // Extract CV data from the conversation and summary
      const cvData = await aiService.generateCVFromConversation({
        conversationHistory: messages,
        summary: cvSummary,
        language: selectedLanguage
      });

      if (cvData.success && cvData.content) {
        addMessage('ai', '🎉 Jūsu CV ir gatavs! Lūdzu pārskatiet to un apstipriniet, vai vēlaties to pievienot savam CV.');
        
        // Show the generated CV
        const cvMessage: Message = {
          id: Date.now().toString(),
          type: 'ai',
          content: `**Ģenerētais CV:**\n\n${cvData.content}`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, cvMessage]);
        
        // Clear summary to allow new conversation
        setCvSummary(null);
      }
    } catch (error) {
      addMessage('ai', 'Atvainojiet, radās kļūda ģenerējot CV. Lūdzu mēģiniet vēlreiz.');
    } finally {
      setIsGeneratingCV(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: '1',
        type: 'ai',
        content: selectedLanguage === 'lv' 
          ? 'Sveiki! 👋 Es esmu jūsu AI CV palīgs. Es palīdzēšu jums izveidot profesionālu CV. Sāksim ar pamatinformāciju - kādu amatu jūs meklējat?'
          : selectedLanguage === 'ru'
          ? 'Привет! 👋 Я ваш AI помощник по созданию CV. Я помогу вам создать профессиональное резюме. Начнем с основной информации - какую должность вы ищете?'
          : 'Hello! 👋 I\'m your AI CV assistant. I\'ll help you create a professional CV. Let\'s start with basic information - what job position are you looking for?',
        timestamp: new Date()
      }
    ]);
    setCvSummary(null);
    setCurrentInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (serviceStatus === 'unhealthy') {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-800 flex items-center gap-2">
            <Bot className="h-5 w-5" />
            AI Serviss Nav Pieejams
          </CardTitle>
          <CardDescription className="text-red-700">
            Lūdzu pārbaudiet, vai Ollama darbojas ar atbilstošu modeli
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-sm text-red-700">
              <p>Lai atrisinātu šo problēmu:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Pārbaudiet, vai Ollama ir instalēts un darbojas</li>
                <li>Pārbaudiet, vai ir pieejams viens no šiem modeļiem: llama2:3b, mistral:7b-instruct-q4_0, vai phi3:mini</li>
                <li>Palaidiet komandu: <code className="bg-red-100 px-2 py-1 rounded">ollama serve</code></li>
              </ul>
            </div>
            <Button onClick={checkServiceHealth} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Pārbaudīt Vēlreiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Language Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            AI CV Palīgs
          </CardTitle>
          <CardDescription>
            Sarunājieties ar AI, lai izveidotu profesionālu CV
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Valoda:</label>
            <Select value={selectedLanguage} onValueChange={(value: SupportedLanguage) => setSelectedLanguage(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lv">Latviešu</SelectItem>
                <SelectItem value="ru">Русский</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleReset} variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Jauna Saruna
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">CV Saruna</CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.type === 'ai' && (
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-blue-600" />
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm">
                    {message.content}
                  </div>
                  <div className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>

                {message.type === 'user' && (
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-blue-600" />
                </div>
                <div className="bg-gray-100 rounded-lg px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm text-gray-600">AI raksta...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Rakstiet savu ziņu..."
                disabled={isLoading || serviceStatus !== 'healthy'}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!currentInput.trim() || isLoading || serviceStatus !== 'healthy'}
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CV Summary and Generation */}
      {cvSummary && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              CV Kopsavilkums
            </CardTitle>
            <CardDescription className="text-green-700">
              AI ir savācis pietiekami daudz informācijas jūsu CV izveidei
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm text-green-800 bg-green-100 p-3 rounded-md">
                {cvSummary}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleGenerateCV}
                  disabled={isGeneratingCV}
                  className="flex-1"
                >
                  {isGeneratingCV ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Ģenerē CV...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Ģenerēt CV
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => setCvSummary(null)}
                  variant="outline"
                >
                  Atcelt
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}