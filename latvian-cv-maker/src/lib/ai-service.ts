import { AI_CONFIG, SupportedLanguage } from './ai-config';
import { CVData } from '@/types/cv';

export interface AIResponse {
  success: boolean;
  content?: string;
  error?: string;
  language?: SupportedLanguage;
}

export interface CVGenerationRequest {
  language: SupportedLanguage;
  jobTitle?: string;
  experience?: string;
  education?: string;
  skills?: string[];
  additionalInfo?: string;
}

export interface CVImprovementRequest {
  cvData: CVData;
  language: SupportedLanguage;
  improvementType: 'content' | 'structure' | 'language' | 'professional';
  specificFeedback?: string;
}

export interface ConversationalRequest {
  userMessage: string;
  conversationHistory: Array<{ type: 'user' | 'ai'; content: string; timestamp: Date }>;
  language: SupportedLanguage;
  cvData?: CVData;
}

export interface CVFromConversationRequest {
  conversationHistory: Array<{ type: 'user' | 'ai'; content: string; timestamp: Date }>;
  summary: string;
  language: SupportedLanguage;
}

class AIService {
  private baseUrl: string;
  private model: string;

  constructor() {
    this.baseUrl = AI_CONFIG.OLLAMA_BASE_URL;
    this.model = AI_CONFIG.DEFAULT_MODEL;
  }

  private async makeRequest(prompt: string, systemPrompt: string): Promise<AIResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          prompt,
          system: systemPrompt,
          options: {
            temperature: AI_CONFIG.TEMPERATURE,
            top_p: AI_CONFIG.TOP_P,
            num_predict: AI_CONFIG.MAX_TOKENS,
          },
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        content: data.response,
        language: this.detectLanguage(data.response),
      };
    } catch (error) {
      console.error('AI request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  private detectLanguage(text: string): SupportedLanguage {
    // Simple language detection based on common words
    const latvianWords = ['es', 'tu', 'viņš', 'viņa', 'mēs', 'jūs', 'viņi', 'viņas', 'ir', 'bija', 'būs'];
    const russianWords = ['я', 'ты', 'он', 'она', 'мы', 'вы', 'они', 'есть', 'был', 'будет'];
    
    const lowerText = text.toLowerCase();
    
    const latvianCount = latvianWords.filter(word => lowerText.includes(word)).length;
    const russianCount = russianWords.filter(word => lowerText.includes(word)).length;
    
    if (latvianCount > russianCount && latvianCount > 2) return 'lv';
    if (russianCount > latvianCount && russianCount > 2) return 'ru';
    return 'en';
  }

  async generateProfessionalCV(request: CVGenerationRequest): Promise<AIResponse> {
    const { language, jobTitle, experience, education, skills, additionalInfo } = request;
    
    const prompt = `
Create a professional CV in ${language === 'lv' ? 'Latvian' : language === 'ru' ? 'Russian' : 'English'} language.

Job Title: ${jobTitle || 'Software Developer'}
Experience Level: ${experience || 'Entry level'}
Education: ${education || 'Bachelor\'s degree'}
Skills: ${skills?.join(', ') || 'Programming, Problem solving, Teamwork'}
Additional Information: ${additionalInfo || 'Looking for opportunities to grow and learn'}

Please provide a complete, professional CV structure with:
1. Personal Information section
2. Professional Summary
3. Work Experience (with realistic examples)
4. Education
5. Skills (both technical and soft skills)
6. Languages
7. Additional sections as appropriate

Make it professional, modern, and suitable for the ${language === 'lv' ? 'Latvian' : language === 'ru' ? 'Russian' : 'English'} job market.
`;

    const systemPrompt = AI_CONFIG.PROMPTS[language].system;
    return this.makeRequest(prompt, systemPrompt);
  }

  async improveCV(request: CVImprovementRequest): Promise<AIResponse> {
    const { cvData, language, improvementType, specificFeedback } = request;
    
    let prompt = '';
    
    switch (improvementType) {
      case 'content':
        prompt = `Analyze this CV and suggest content improvements in ${language === 'lv' ? 'Latvian' : language === 'ru' ? 'Russian' : 'English'}:
        
CV Data: ${JSON.stringify(cvData, null, 2)}

Focus on:
- Making descriptions more impactful and specific
- Adding quantifiable achievements
- Improving professional language
- Enhancing skill descriptions

${specificFeedback ? `Specific feedback requested: ${specificFeedback}` : ''}`;
        break;
        
      case 'structure':
        prompt = `Analyze this CV structure and suggest improvements in ${language === 'lv' ? 'Latvian' : language === 'ru' ? 'Russian' : 'English'}:
        
CV Data: ${JSON.stringify(cvData, null, 2)}

Focus on:
- Logical flow and organization
- Section ordering
- Information hierarchy
- Professional presentation

${specificFeedback ? `Specific feedback requested: ${specificFeedback}` : ''}`;
        break;
        
      case 'language':
        prompt = `Review this CV for language improvements in ${language === 'lv' ? 'Latvian' : language === 'ru' ? 'Russian' : 'English'}:
        
CV Data: ${JSON.stringify(cvData, null, 2)}

Focus on:
- Grammar and spelling
- Professional terminology
- Consistent language style
- Cultural appropriateness for ${language === 'lv' ? 'Latvian' : language === 'ru' ? 'Russian' : 'English'} market

${specificFeedback ? `Specific feedback requested: ${specificFeedback}` : ''}`;
        break;
        
      case 'professional':
        prompt = `Provide professional CV advice in ${language === 'lv' ? 'Latvian' : language === 'ru' ? 'Russian' : 'English'}:
        
CV Data: ${JSON.stringify(cvData, null, 2)}

Focus on:
- Industry best practices
- ATS optimization
- Professional standards
- Market expectations for ${language === 'lv' ? 'Latvian' : language === 'ru' ? 'Russian' : 'English'} employers

${specificFeedback ? `Specific feedback requested: ${specificFeedback}` : ''}`;
        break;
    }

    const systemPrompt = AI_CONFIG.PROMPTS[language].system;
    return this.makeRequest(prompt, systemPrompt);
  }

  async generateJobSpecificCV(jobDescription: string, language: SupportedLanguage): Promise<AIResponse> {
    const prompt = `
Analyze this job description and create a tailored CV in ${language === 'lv' ? 'Latvian' : language === 'ru' ? 'Russian' : 'English'}:

Job Description:
${jobDescription}

Please provide:
1. Key skills and experiences to highlight
2. Relevant keywords for ATS optimization
3. Suggested modifications to existing CV
4. Professional summary tailored to this position
5. Skills prioritization based on job requirements

Make the CV specifically relevant to this job opportunity.
`;

    const systemPrompt = AI_CONFIG.PROMPTS[language].system;
    return this.makeRequest(prompt, systemPrompt);
  }

  async generateConversationalResponse(request: ConversationalRequest): Promise<AIResponse> {
    const { userMessage, conversationHistory, language, cvData } = request;
    
    // Create a context-aware prompt based on conversation history
    const conversationContext = conversationHistory
      .slice(-6) // Last 6 messages for context
      .map(msg => `${msg.type === 'user' ? 'User' : 'AI'}: ${msg.content}`)
      .join('\n');
    
    const prompt = `
Based on our conversation about creating a CV, please respond to the user's latest message.

Conversation History:
${conversationContext}

User's Latest Message: ${userMessage}

${cvData ? `Current CV Data: ${JSON.stringify(cvData, null, 2)}` : ''}

Please:
1. Ask relevant follow-up questions to gather necessary information
2. Provide helpful guidance about CV creation
3. When you have enough information, provide a CV summary
4. Respond in ${language === 'lv' ? 'Latvian' : language === 'ru' ? 'Russian' : 'English'}

Be conversational and helpful. Ask one question at a time to avoid overwhelming the user.
`;

    const systemPrompt = AI_CONFIG.PROMPTS[language].system;
    return this.makeRequest(prompt, systemPrompt);
  }

  async generateCVFromConversation(request: CVFromConversationRequest): Promise<AIResponse> {
    const { conversationHistory, summary, language } = request;
    
    // Extract key information from conversation
    const conversationText = conversationHistory
      .map(msg => msg.content)
      .join('\n');
    
    const prompt = `
Based on our conversation and the CV summary, please generate a complete professional CV.

Conversation Context:
${conversationText}

CV Summary:
${summary}

Please create a complete, professional CV in ${language === 'lv' ? 'Latvian' : language === 'ru' ? 'Russian' : 'English'} that includes:

1. Professional Summary
2. Work Experience (with achievements)
3. Education
4. Skills (both technical and soft skills)
5. Languages
6. Any additional relevant information

Format the CV in a clear, professional structure that would be suitable for job applications.
`;

    const systemPrompt = AI_CONFIG.PROMPTS[language].system;
    return this.makeRequest(prompt, systemPrompt);
  }

  async checkModelAvailability(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`);
      if (!response.ok) return false;
      
      const data = await response.json();
      const availableModels = data.models?.map((m: any) => m.name) || [];
      
      // Check if our preferred model is available
      if (availableModels.includes(this.model)) return true;
      
      // Try fallback models
      for (const fallbackModel of AI_CONFIG.FALLBACK_MODELS) {
        if (availableModels.includes(fallbackModel)) {
          this.model = fallbackModel;
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error('Model availability check failed:', error);
      return false;
    }
  }

  async getHealthStatus(): Promise<{ status: 'healthy' | 'unhealthy'; details: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/version`);
      if (!response.ok) {
        return { status: 'unhealthy', details: 'Ollama service not responding' };
      }
      
      const modelAvailable = await this.checkModelAvailability();
      if (!modelAvailable) {
        return { status: 'unhealthy', details: 'Required AI model not available' };
      }
      
      return { status: 'healthy', details: 'AI service ready' };
    } catch (error) {
      return { status: 'unhealthy', details: 'Cannot connect to Ollama service' };
    }
  }
}

export const aiService = new AIService();