/**
 * Configuración centralizada del proyecto
 */

require('dotenv').config();

const config = {
  // API Keys
  api: {
    google: {
      getKey: (agentNumber = 1) => {
        const keys = [
          process.env.GOOGLE_GEMINI_API_KEY,
          process.env.GOOGLE_GEMINI_API_KEY_2,
          process.env.GOOGLE_GEMINI_API_KEY_3,
          process.env.GOOGLE_GEMINI_API_KEY_4,
        ];
        const index = Math.min((agentNumber - 1) % 4, keys.length - 1);
        return keys[index];
      },
      model: 'gemini-2.0-flash',
    },
  },

  // Rutas
  paths: {
    reports: './reports',
    agents: './agents',
    utils: './utils',
  },

  // Agentes
  agents: [
    {
      id: 'agent1',
      name: 'Agent 1: Open-Source Programs',
      category: '1-OpenSource-Programs',
      number: 1,
      keywords: [
        'open source video editor trending',
        'free design tool github',
        'free 3D modeling open source',
        'vector design open source',
      ],
      analysisPrompt: `
Busca entre GitHub, Product Hunt y trending de desarrollo:
1. Nuevas herramientas open-source para creadores (video, audio, design, 3D)
2. Repos con crecimiento en últimas 2 semanas (50+ stars)
3. Alternativas viables a herramientas comerciales populares
4. Proyectos que tienen momentum real (commits activos, comunidad)

Prioriza por:
- Alta: Repos con 200+ stars en última semana, reemplaza herramienta popular
- Media: Repos con 50-200 stars, solución específica útil
- Baja: Repos nuevos (<50 stars) pero interesantes

Incluye: GitHub URL, descripción funcional, comparación con alternativa comercial.
      `,
    },
    {
      id: 'agent2',
      name: 'Agent 2: AI Open-Source',
      category: '2-AI-OpenSource',
      number: 2,
      keywords: [
        'open source AI video editing',
        'stable diffusion alternative free',
        'AI upscaling open source',
        'text-to-speech open source',
      ],
      analysisPrompt: `
Busca IAs open-source disponibles para creadores:
1. Modelos entrenados públicamente (Hugging Face, GitHub)
2. Herramientas que usan IAs open-source (LocalAI, Ollama, etc.)
3. Alternativas gratuitas a herramientas IA comerciales (Adobe Firefly, etc.)
4. Casos de uso práctico para video, audio, diseño

Prioriza por:
- Alta: IAs maduras, fáciles de usar, documentadas, con comunidad activa
- Media: IAs funcionales pero requieren setup técnico
- Baja: Proyectos experimentales o muy beta

Incluye: Nombre, URL del modelo/repo, requisitos (GPU/CPU), caso de uso.
      `,
    },
    {
      id: 'agent3',
      name: 'Agent 3: Chinese Alternatives',
      category: '3-Chinese-Alternatives',
      number: 3,
      keywords: [
        'chinese design software gitee',
        'chinese video editor alternatives',
        'asian software trending',
        'mandarin developer tools',
      ],
      analysisPrompt: `
Busca software chino/asiático emergente:
1. Herramientas desde Gitee, GitHub chino, Product Hunt Asia
2. Alternativas chinas a software popular (como Figma, DaVinci, Adobe)
3. Tendencias en desarrollo de software en China/Asia
4. Software único de Asia que no tiene equivalente en Occidente

Prioriza por:
- Alta: Herramientas maduras, alternativas viables
- Media: Interesantes pero niche
- Baja: Experimentales o muy locales

Incluye: Nombre, descripción, ventajas únicas, dónde descargar.
      `,
    },
    {
      id: 'agent4',
      name: 'Agent 4: Software Updates & Changes',
      category: '4-Software-Updates-Changes',
      number: 4,
      keywords: [
        'Adobe price increase 2026',
        'DaVinci Resolve new features',
        'software discontinued shutdown',
        'paid to free software transition',
      ],
      analysisPrompt: `
Monitorea cambios importantes en software conocido:
1. Cambios de pricing (suidas, bajadas, nuevos modelos)
2. Features nuevas o removidas
3. Software descontinuado o en crisis
4. Lawsuits, forked, o cambios de dirección
5. Migraciones forzadas de usuarios (como Twitter → X)

Prioriza por:
- Alta: URGENTES - afecta creadores ahora (precio, discontinuado)
- Media: Cambios importantes pero graduales
- Baja: Cambios menores o futuros

Incluye: Qué cambió, cuándo, impacto en creadores, alternativas.
      `,
    },
  ],

  // Retry logic
  retry: {
    maxAttempts: 3,
    initialDelay: 1000, // ms
    maxDelay: 10000, // ms
    backoffMultiplier: 2,
  },

  // Timeouts
  timeouts: {
    apiRequest: 30000, // 30 segundos
    totalAgent: 120000, // 2 minutos
  },

  // Logging
  logging: {
    level: process.env.DEBUG === 'true' ? 'DEBUG' : 'INFO',
    useTimestamps: true,
  },

  // Google Drive (opcional)
  googleDrive: {
    enabled: !!process.env.GOOGLE_DRIVE_FOLDER_ID,
    folderId: process.env.GOOGLE_DRIVE_FOLDER_ID,
    serviceAccount: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
  },

  // Telegram (opcional)
  telegram: {
    enabled: !!process.env.TELEGRAM_BOT_TOKEN && !!process.env.TELEGRAM_CHAT_ID,
    token: process.env.TELEGRAM_BOT_TOKEN,
    chatId: process.env.TELEGRAM_CHAT_ID,
  },
};

// Validación de configuración crítica
function validateConfig() {
  const errors = [];

  // Validar API keys
  const hasAnyKey = config.agents.some((agent) => {
    const key = config.api.google.getKey(agent.number);
    return key && key !== 'demo-mode-will-skip-api-calls';
  });

  if (!hasAnyKey) {
    errors.push(
      '❌ No Google Gemini API keys configured. See: https://aistudio.google.com/app/apikeys'
    );
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

module.exports = { config, validateConfig };
