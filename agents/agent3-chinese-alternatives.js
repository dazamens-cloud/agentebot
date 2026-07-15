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

const AGENT_NAME = 'Agent 3: Chinese Alternatives';
const CATEGORY_NAME = '3-Chinese-Alternatives';

const KEYWORDS = [
  'gitee video editor open source',
  'chinese design tool free',
  'gitee streaming software',
  'asian open source tools',
];

const ANALYSIS_PROMPT = `
Busca software y proyectos open-source de origen chino/asiático:
1. Repositorios en Gitee (plataforma china de Git)
2. Herramientas chinas populares en Product Hunt Asia
3. Alternativas chinas a software occidental (Adobe, DaVinci, etc)
4. Proyectos de desarrolladores chinos en GitHub

Prioriza por:
- Alta: Herramientas maduras, comunidad activa, traducción en inglés disponible
- Media: Funcionales pero UI en chino, documentación limitada en inglés
- Baja: Proyectos nuevos o muy específicos

Busca especialmente:
- Por qué es mejor/diferente que la alternativa occidental
- Cuánta comunidad tiene (stars, commits)
- Si soporta idiomas/localización
- Requisitos de instalación

Incluye: URL Gitee/GitHub, descripción, comparativa con alternativa occidental.
`;

/**
 * Ejecutar Agent 3
 */
async function runAgent3() {
  try {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`⚙️  ${AGENT_NAME}`);
    console.log(`${'='.repeat(60)}\n`);

    // Recopilar datos de todas las palabras clave
    let allResults = [];

    for (const keyword of KEYWORDS) {
      console.log(`\n📌 Procesando keyword: "${keyword}"`);
      const results = await searchAndAnalyze(keyword, ANALYSIS_PROMPT, 3);
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

## 🌏 Por Qué Monitorear Alternativas Chinas

1. **Innovación acelerada** - China invierte fuertemente en tech creativa
2. **Gratuidad** - Muchas herramientas tienen versión gratuita/open-source
3. **Diferenciación** - Enfoques distintos a problemas ya resueltos en occidente
4. **Ángulo de contenido único** - "Lo que China hace mejor" es trending
5. **Crecimiento de audiencia asia** - Creadores asiáticos tienen presupuesto

---

## 🎯 Oportunidades de Contenido (TOP 3)

${allResults
  .filter((r) => r.prioridad === 'Alta')
  .slice(0, 3)
  .map(
    (r, i) => `
${i + 1}. **${r.nombre || 'Sin nombre'}**
   - Comparación: ${r.angulo || 'N/A'}
   - Disponibilidad: Gitee/GitHub
   - Búsquedas/mes: ${r.busquedas_est || 'N/A'}
`
  )
  .join('')}

---

## 📌 Notas Importantes

- **Idioma:** Verificar si tiene interfaz en inglés o requiere traducción
- **Licencia:** Muchos son GPL/MIT pero verificar términos específicos
- **Mantenimiento:** Revisar última actividad (commits recientes)
- **Comunidad:** Chequear si hay comunidad en inglés en Discord/Reddit

---

## 🔗 Plataformas de Referencia

- **Gitee:** https://gitee.com/ (GitHub chino)
- **GitHub cn:** Búsquedas con filtro de ubicación China
- **Product Hunt Asia:** Herramientas populares en Asia

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
  runAgent3();
}

module.exports = { runAgent3 };
