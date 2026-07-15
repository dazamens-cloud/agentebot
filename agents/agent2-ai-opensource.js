require('dotenv').config();
const { searchAndAnalyze, generateMarkdownTable } = require('../utils/anthropicSearch');
const { 
  authenticateGoogleDrive, 
  ensureFolderExists, 
  uploadDocumentToDrive,
  generateFileName 
} = require('../utils/googleDrive');
const {
  sendTelegramNotification,
  generateTelegramSummary,
} = require('../utils/telegram');

const AGENT_NAME = 'Agent 2: AI Open-Source';
const CATEGORY_NAME = '2-AI-OpenSource';

const KEYWORDS = [
  'open source AI video editing',
  'stable diffusion alternative free',
  'AI upscaling open source',
  'text-to-speech open source',
];

const ANALYSIS_PROMPT = `
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
`;

/**
 * Ejecutar Agent 2
 */
async function runAgent2() {
  try {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`⚙️  ${AGENT_NAME}`);
    console.log(`${'='.repeat(60)}\n`);

    // Recopilar datos de todas las palabras clave
    let allResults = [];

    for (const keyword of KEYWORDS) {
      console.log(`\n📌 Procesando keyword: "${keyword}"`);
      const results = await searchAndAnalyze(keyword, ANALYSIS_PROMPT, 2);
      allResults = allResults.concat(results);

      // Pequeña pausa entre requests
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    // Generar tabla markdown
    const markdownTable = generateMarkdownTable(allResults);

    // Generar documento completo
    const now = new Date();
    const isoDate = now.toISOString().split('T')[0];

    const documentContent = `# ${AGENT_NAME} - Research Report

**Fecha:** ${isoDate}  
**Palabras clave:** ${KEYWORDS.length} búsquedas realizadas  
**Resultados encontrados:** ${allResults.length}

---

## 📊 Tabla de Resultados

${markdownTable}

---

## 🤖 Categorías de IA Detectadas

### Generación de Imágenes
- Stable Diffusion, DALL-E alternativas
- Requisitos: GPU, modelos locales

### Video Enhancement
- Upscaling (Real-ESRGAN, etc)
- Motion generation
- Requisitos: GPU recomendada

### Audio
- TTS (Text-to-Speech) abiertos
- Voice enhancement
- Requisitos: CPU/GPU variable

### Motion Graphics
- IA para animación
- Generación de movimiento
- Requisitos: Variable

---

## 🎯 Oportunidades de Contenido (TOP 3)

${allResults
  .filter((r) => r.prioridad === 'Alta')
  .slice(0, 3)
  .map(
    (r, i) => `
${i + 1}. **${r.nombre || 'Sin nombre'}**
   - Ángulo: ${r.angulo || 'N/A'}
   - Setup: Local/Gratuito
   - Búsquedas/mes: ${r.busquedas_est || 'N/A'}
`
  )
  .join('')}

---

## ⚙️ Notas Técnicas

- **GPU requerida:** Para mayoría de IAs (NVIDIA/AMD/Apple)
- **CPU-only:** Posible pero lento
- **Hosting:** Replicate, Modal, HuggingFace Spaces para cloud

---

*Generado automáticamente por ${AGENT_NAME}*
`;

    console.log(`\n✓ Documento preparado con ${allResults.length} resultados`);

    // Subir a Google Drive
    if (process.env.GOOGLE_DRIVE_FOLDER_ID) {
      const drive = await authenticateGoogleDrive();
      const categoryFolderId = await ensureFolderExists(
        drive,
        process.env.GOOGLE_DRIVE_FOLDER_ID,
        CATEGORY_NAME
      );

      const fileName = generateFileName(AGENT_NAME);
      await uploadDocumentToDrive(
        drive,
        categoryFolderId,
        fileName,
        documentContent,
        'text/markdown'
      );

      console.log(`\n✅ ${AGENT_NAME} completado correctamente`);

      // Enviar notificación Telegram (opcional)
      const telegramSummary = generateTelegramSummary(allResults, AGENT_NAME);
      await sendTelegramNotification(telegramSummary, AGENT_NAME);
    } else {
      console.log('\n⚠️  GOOGLE_DRIVE_FOLDER_ID no configurado, guardando local');
      const fs = require('fs');
      const localPath = `./${CATEGORY_NAME}/${generateFileName(AGENT_NAME)}`;
      fs.mkdirSync(`./${CATEGORY_NAME}`, { recursive: true });
      fs.writeFileSync(localPath, documentContent);
      console.log(`✓ Guardado en: ${localPath}`);

      // Enviar notificación Telegram (opcional)
      const telegramSummary = generateTelegramSummary(allResults, AGENT_NAME);
      await sendTelegramNotification(telegramSummary, AGENT_NAME);
    }
  } catch (error) {
    console.error(`❌ Error en ${AGENT_NAME}:`, error);
    process.exit(1);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  runAgent2();
}

module.exports = { runAgent2 };
