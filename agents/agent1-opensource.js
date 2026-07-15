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

const AGENT_NAME = 'Agent 1: Open-Source Programs';
const CATEGORY_NAME = '1-OpenSource-Programs';

const KEYWORDS = [
  'open source video editor trending',
  'free design tool github',
  'free 3D modeling open source',
  'vector design open source',
];

const ANALYSIS_PROMPT = `
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
`;

/**
 * Ejecutar Agent 1
 */
async function runAgent1() {
  try {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`⚙️  ${AGENT_NAME}`);
    console.log(`${'='.repeat(60)}\n`);

    // Recopilar datos de todas las palabras clave
    let allResults = [];

    for (const keyword of KEYWORDS) {
      console.log(`\n📌 Procesando keyword: "${keyword}"`);
      const results = await searchAndAnalyze(keyword, ANALYSIS_PROMPT, 1);
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

## 📝 Notas

- **Prioridad Alta:** Herramientas con potencial inmediato de artículo
- **Trending:** Crecimiento en GitHub (stars/week)
- **Est. Búsquedas:** Estimación conservadora de búsquedas mensuales

---

## 🎯 Artículos Sugeridos (TOP 3)

${allResults
  .filter((r) => r.prioridad === 'Alta')
  .slice(0, 3)
  .map(
    (r, i) => `
${i + 1}. **${r.nombre || 'Sin nombre'}**
   - Ángulo: ${r.angulo || 'N/A'}
   - CPC Estimado: $3-6
   - Búsquedas/mes: ${r.busquedas_est || 'N/A'}
`
  )
  .join('')}

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
  runAgent1();
}

module.exports = { runAgent1 };
