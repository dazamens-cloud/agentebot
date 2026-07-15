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

const AGENT_NAME = 'Agent 4: Software Updates & Changes';
const CATEGORY_NAME = '4-Software-Updates-Changes';

const KEYWORDS = [
  'Adobe price increase change',
  'DaVinci Resolve new features',
  'software discontinued shutdown',
  'creative software lawsuit AI',
];

const ANALYSIS_PROMPT = `
Busca noticias y cambios recientes en herramientas de software creativo:

1. **CAMBIOS DE PRICING:**
   - Aumentos de precio anunciados
   - Cambios en modelo de suscripción
   - Eliminación de versiones gratuitas
   - Nuevas tarifas por feature

2. **FEATURES Y UPDATES:**
   - Grandes actualizaciones de herramientas populares
   - Nuevas características IA integradas
   - Cambios en workflow importante
   - Deprecación de features

3. **CRISIS Y CAMBIOS DE LICENCIA:**
   - Demandas legales (IA training, copyright)
   - Cambios de licencia de abierto a propietario
   - Software discontinuado/shutdown
   - Forks debido a cambios de directiva

4. **OPORTUNIDADES PARA CREADORES:**
   - Migración masiva a alternativas
   - Ventanas de oportunidad de contenido
   - Crisis = trending searches

Prioriza por:
- Alta: Cambios que afectan directamente creadores, pricing controversiales, shutdowns
- Media: Updates útiles, nuevas features
- Baja: Cambios menores, ajustes pequeños

Incluye: Qué cambió, cuándo, por qué importa, qué alternativas existen.
`;

/**
 * Ejecutar Agent 4
 */
async function runAgent4() {
  try {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`⚙️  ${AGENT_NAME}`);
    console.log(`${'='.repeat(60)}\n`);

    // Recopilar datos de todas las palabras clave
    let allResults = [];

    for (const keyword of KEYWORDS) {
      console.log(`\n📌 Procesando keyword: "${keyword}"`);
      const results = await searchAndAnalyze(keyword, ANALYSIS_PROMPT, 4);
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

## 🚨 Por Qué Estos Cambios Importan

### Pricing Crisis
- Cuando Adobe/otros suben precios → búsquedas de "free alternative" explotan
- Moment de oportunidad para contenido: "X tool sube precio, aquí tus opciones"
- CPC muy alto en estos momentos

### Updates Importantes
- Nuevas features en DaVinci = "best features" searches trending
- Cambios en workflow = tutorials necesarios
- IA integration = trending searches

### Shutdowns & Controversias
- Cuando software cierra = éxodo de usuarios
- Demandas de IA = "ethical alternatives" trending
- Cambios de licencia = búsquedas de forks/alternativas

---

## 🎯 Artículos de URGENCIA (TOP 3)

${allResults
  .filter((r) => r.prioridad === 'Alta')
  .slice(0, 3)
  .map(
    (r, i) => `
${i + 1}. **[URGENTE] ${r.nombre || 'Sin nombre'}**
   - Ángulo: ${r.angulo || 'N/A'}
   - Trending: ALTO (crisis/cambio anunciado)
   - Búsquedas/mes: ${r.busquedas_est || 'N/A'}
   - Fecha de publicación ideal: INMEDIATO
`
  )
  .join('')}

---

## 📈 Estrategia de Contenido Reactivo

**Cuando detectamos un cambio:**

1. **Hora 0:** Publicar alert sobre qué cambió
2. **Día 1:** "Guía de alternativas" (traffic boom)
3. **Día 2-7:** Comparativas específicas (DaVinci vs X, Adobe vs X)
4. **Semana 2+:** Tutoriales de migración (sustaining traffic)

---

## ⚠️ Monitoreo Constante

- Revisar noticias de Adobe, DaVinci, OBS, Blender cada semana
- Reddit/Twitter trending en espacios creativos
- GitHub trending (forks de software cerrado)
- Product Hunt para nuevos launches

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
  runAgent4();
}

module.exports = { runAgent4 };
