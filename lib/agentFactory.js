/**
 * AgentFactory - Crea agentes sin duplicar código
 * Elimina la duplicación de código entre agent1-4
 */

const fs = require('fs');
const path = require('path');
const { searchAndAnalyze, generateMarkdownTable } = require('../utils/anthropicSearch');
const { sendTelegramNotification, generateTelegramSummary } = require('../utils/telegram');
const { authenticateGoogleDrive, ensureFolderExists, uploadDocumentToDrive, generateFileName } = require('../utils/googleDrive');
const logger = require('./logger');
const { config } = require('./config');

/**
 * Crear un agente genérico
 * @param {Object} agentConfig - Configuración del agente
 * @returns {Function} Función ejecutable del agente
 */
function createAgent(agentConfig) {
  return async function executeAgent() {
    const startTime = Date.now();

    try {
      logger.info(`${agentConfig.name}`);
      logger.debug(`Palabras clave a procesar: ${agentConfig.keywords.length}`);

      // Recopilar datos de todas las palabras clave
      let allResults = [];

      for (const keyword of agentConfig.keywords) {
        logger.debug(`Procesando: "${keyword}"`);
        const results = await searchAndAnalyze(
          keyword,
          agentConfig.analysisPrompt,
          agentConfig.number
        );
        allResults = allResults.concat(results);

        // Pequeña pausa entre requests
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      logger.success(`${allResults.length} resultados encontrados`);

      // Generar tabla markdown
      const markdownTable = generateMarkdownTable(allResults);

      // Generar documento completo
      const now = new Date();
      const isoDate = now.toISOString().split('T')[0];

      const documentContent = `# ${agentConfig.name} - Research Report

**Fecha:** ${isoDate}
**Palabras clave:** ${agentConfig.keywords.length} búsquedas realizadas
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

*Generado automáticamente por ${agentConfig.name}*
`;

      logger.debug(`Documento preparado con ${allResults.length} resultados`);

      // Guardar localmente
      const localDir = path.join(config.paths.reports, agentConfig.category);
      fs.mkdirSync(localDir, { recursive: true });

      const fileName = `${isoDate}-Research.md`;
      const localPath = path.join(localDir, fileName);
      fs.writeFileSync(localPath, documentContent);

      logger.success(`Guardado localmente: ${localPath}`);

      // Intentar subir a Google Drive (opcional)
      if (config.googleDrive.enabled) {
        try {
          const drive = await authenticateGoogleDrive();
          const categoryFolderId = await ensureFolderExists(
            drive,
            config.googleDrive.folderId,
            agentConfig.category
          );

          await uploadDocumentToDrive(
            drive,
            categoryFolderId,
            generateFileName(agentConfig.name),
            documentContent,
            'text/markdown'
          );

          logger.success(`Subido a Google Drive`);
        } catch (driveError) {
          logger.warn(`Google Drive no disponible: ${driveError.message}`);
        }
      }

      // Enviar notificación Telegram (opcional)
      if (config.telegram.enabled) {
        try {
          const telegramSummary = generateTelegramSummary(allResults, agentConfig.name);
          const result = await sendTelegramNotification(telegramSummary, agentConfig.name);

          if (result) {
            logger.success(`Notificación Telegram enviada`);
          } else {
            logger.warn(`No se pudo enviar notificación Telegram`);
          }
        } catch (telegramError) {
          logger.warn(`Telegram no disponible: ${telegramError.message}`);
        }
      }

      const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
      logger.success(`${agentConfig.name} completado en ${elapsed}s`);

      return {
        success: true,
        agent: agentConfig.id,
        resultCount: allResults.length,
        duration: elapsed,
      };
    } catch (error) {
      logger.error(`${agentConfig.name} falló: ${error.message}`);

      return {
        success: false,
        agent: agentConfig.id,
        error: error.message,
      };
    }
  };
}

module.exports = { createAgent };
