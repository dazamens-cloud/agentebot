const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * Obtener API key según el número del agente
 * Agent 1 → KEY_1, Agent 2 → KEY_2, Agent 3 → KEY_3, Agent 4 → KEY_4
 */
function getGoogleAPIKey(agentNumber) {
  const keys = [
    process.env.GOOGLE_GEMINI_API_KEY,      // Agent 1
    process.env.GOOGLE_GEMINI_API_KEY_2,    // Agent 2
    process.env.GOOGLE_GEMINI_API_KEY_3,    // Agent 3
    process.env.GOOGLE_GEMINI_API_KEY_4,    // Agent 4
  ];
  
  const keyIndex = (agentNumber - 1) % 4;
  const key = keys[keyIndex];
  
  if (!key) {
    throw new Error(`API Key ${agentNumber} not found in environment variables`);
  }
  
  return key;
}

/**
 * Realizar búsqueda web y análisis con Google Gemini
 */
async function searchAndAnalyze(query, analysisPrompt, agentNumber = 1) {
  try {
    console.log(`🔍 Buscando: ${query}`);

    const apiKey = getGoogleAPIKey(agentNumber);
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

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
      // Limpiar posibles backticks markdown
      const cleanedText = responseText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      
      const parsed = JSON.parse(cleanedText);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch (parseError) {
      console.log('No se pudo parsear JSON, retornando texto raw');
      return [{ resultado: responseText }];
    }
  } catch (error) {
    console.error(`Error en búsqueda "${query}":`, error.message);
    return [];
  }
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
