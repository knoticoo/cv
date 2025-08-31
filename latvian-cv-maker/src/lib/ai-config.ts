export const AI_CONFIG = {
  // Ollama configuration for 2GB RAM systems
  OLLAMA_BASE_URL: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
  
  // Model optimized for low memory usage
  DEFAULT_MODEL: 'llama2:3b', // 3B parameter model, good for 2GB RAM
  
  // Alternative lightweight models if needed
  FALLBACK_MODELS: [
    'llama2:3b',
    'mistral:7b-instruct-q4_0', // Quantized version, more memory efficient
    'phi3:mini', // Very lightweight, good for 2GB RAM
  ],
  
  // Memory optimization settings
  MAX_TOKENS: 512, // Limit response length to save memory
  TEMPERATURE: 0.7,
  TOP_P: 0.9,
  
  // Supported languages
  SUPPORTED_LANGUAGES: ['lv', 'ru', 'en'] as const,
  
  // Language detection fallback
  DEFAULT_LANGUAGE: 'en' as const,
  
  // CV-specific prompts for different languages
  PROMPTS: {
    lv: {
      system: 'Tu esi profesionāls CV padomdevējs, kas palīdz izveidot kvalitatīvus CV latviešu valodā. Atbildi tikai latviešu valodā.',
      cv_improvement: 'Palīdzi uzlabot šo CV latviešu valodā:',
      cv_analysis: 'Analizē šo CV un sniedzi ieteikumus:',
    },
    ru: {
      system: 'Ты профессиональный консультант по составлению резюме, который помогает создавать качественные резюме на русском языке. Отвечай только на русском языке.',
      cv_improvement: 'Помоги улучшить это резюме на русском языке:',
      cv_analysis: 'Проанализируй это резюме и дай рекомендации:',
    },
    en: {
      system: 'You are a professional CV consultant who helps create quality CVs in English. Respond only in English.',
      cv_improvement: 'Help improve this CV in English:',
      cv_analysis: 'Analyze this CV and provide recommendations:',
    },
  },
  
  // Error messages in different languages
  ERRORS: {
    lv: {
      model_not_found: 'AI model nav atrasts. Lūdzu, pārbaudiet Ollama instalāciju.',
      connection_error: 'Nevar izveidot savienojumu ar AI servisu.',
      memory_error: 'AI servisam nav pietiekami daudz atmiņas.',
    },
    ru: {
      model_not_found: 'AI модель не найдена. Пожалуйста, проверьте установку Ollama.',
      connection_error: 'Не удается подключиться к AI сервису.',
      memory_error: 'AI сервису недостаточно памяти.',
    },
    en: {
      model_not_found: 'AI model not found. Please check Ollama installation.',
      connection_error: 'Cannot connect to AI service.',
      memory_error: 'AI service does not have enough memory.',
    },
  },
};

export type SupportedLanguage = typeof AI_CONFIG.SUPPORTED_LANGUAGES[number];