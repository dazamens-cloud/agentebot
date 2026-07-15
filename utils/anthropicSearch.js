const { GoogleGenerativeAI } = require('@google/generative-ai');
const { config } = require('../lib/config');
const logger = require('../lib/logger');

/**
 * Realizar búsqueda con retry logic
 */
async function searchAndAnalyze(query, analysisPrompt, agentNumber = 1) {
  const maxAttempts = config.retry.maxAttempts;
  let lastError = null;
  let delay = config.retry.initialDelay;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      logger.debug(`Buscando: "${query}" (intento ${attempt}/${maxAttempts})`);

      const apiKey = config.api.google.getKey(agentNumber);

      if (!apiKey || apiKey === 'demo-mode-will-skip-api-calls') {
        logger.warn(`API Key no configurada para Agent ${agentNumber}`);
        return [];
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: config.api.google.model });

      const prompt = `
Realiza una búsqueda exhaustiva sobre: "${query}"

${analysisPrompt}

Formato de respuesta: JSON array con objetos que tengan:
{
  "nombre": "nombre de la herramienta/noticia",
  "descripcion": "descripción breve",
  "prioridad": "Alta|Media|Baja",
  "tipo": "Software|IA|Alternativa|Update",
  "trending": "número de stars/relevancia",
  "angulo": "ángulo potencial de artículo",
  "busquedas_est": "estimación de búsquedas mensuales",
  "fuente": "dónde lo encontraste",
  "url": "enlace si aplica"
}

Solo retorna el JSON, sin explicaciones adicionales.
      `;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      try {
        const cleanedText = responseText
          .replace(/```json\n?/g, '')
          .replace(/```\n?/g, '')
          .trim();

        const parsed = JSON.parse(cleanedText);
        const data = Array.isArray(parsed) ? parsed : [parsed];

        logger.success(`Búsqueda exitosa: "${query}" (${data.length} resultados)`);
        return data;
      } catch (parseError) {
        logger.warn(`No se pudo parsear JSON en búsqueda "${query}"`);
        return [];
      }
    } catch (error) {
      lastError = error;
      logger.warn(`Error en intento ${attempt}: ${error.message}`);

      if (attempt < maxAttempts) {
        logger.debug(`Esperando ${delay}ms antes de reintentar...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay = Math.min(delay * config.retry.backoffMultiplier, config.retry.maxDelay);
      }
    }
  }

  logger.error(`Búsqueda fallida después de ${maxAttempts} intentos: "${query}"`, lastError);
  return [];
}

/**
 * Generar tabla markdown a partir de resultados
 */
function generateMarkdownTable(results) {
  if (!results || results.length === 0) {
    return '## Sin resultados\n\nNo se encontraron elementos relevantes.';
  }

  // Ordenar por prioridad
  const priorityOrder = { 'Alta': 1, 'Media': 2, 'Baja': 3 };
  const sorted = results.sort((a, b) => {
    return (priorityOrder[a.prioridad] || 3) - (priorityOrder[b.prioridad] || 3);
  });

  let markdown = `| PRIORIDAD | TIPO | NOMBRE | DESCRIPCIÓN | TRENDING | ÁNGULO ARTÍCULO | EST. BÚSQUEDAS |\n`;
  markdown += `|-----------|------|--------|-------------|----------|-----------------|----------------|\n`;

  sorted.forEach((item) => {
    const prioridad = item.prioridad || 'Media';
    const tipo = item.tipo || 'Software';
    const nombre = item.nombre || 'Sin nombre';
    const desc = (item.descripcion || '').substring(0, 50) + '...';
    const trending = item.trending || '—';
    const angulo = (item.angulo || '').substring(0, 40) + '...';
    const busquedas = item.busquedas_est || '—';

    markdown += `| ${prioridad} | ${tipo} | ${nombre} | ${desc} | ${trending} | ${angulo} | ${busquedas} |\n`;
  });

  return markdown;
}

module.exports = {
  searchAndAnalyze,
  generateMarkdownTable,
};
