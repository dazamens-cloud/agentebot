/**
 * DEMO MODE: Simula búsquedas sin API key real
 * Muestra exactamente qué data generan los agentes
 */

const fs = require('fs');

// Datos DEMO simulados para Agent 1
const demoResults1 = [
  {
    prioridad: 'Alta',
    tipo: 'Software',
    nombre: 'Kdenlive 25.04',
    descripcion: 'Video editor open-source con timeline avanzado y GPU acceleration',
    trending: '350 stars ↑',
    angulo: 'Kdenlive vs DaVinci: La alternativa gratuita que compete',
    busquedas_est: '8,500/mes'
  },
  {
    prioridad: 'Alta',
    tipo: 'Software',
    nombre: 'Shotcut 24.12',
    descripcion: 'Editor de video multiplataforma con soporte 4K nativo',
    trending: '280 stars ↑',
    angulo: 'Best Free 4K Video Editor 2026',
    busquedas_est: '6,200/mes'
  },
  {
    prioridad: 'Media',
    tipo: 'Software',
    nombre: 'OpenShot 3.1',
    descripcion: 'Timeline editor simple e intuitivo, perfecto para principiantes',
    trending: '150 stars ↑',
    angulo: 'Easiest Video Editor for Beginners (Free)',
    busquedas_est: '4,800/mes'
  },
  {
    prioridad: 'Alta',
    tipo: 'Software',
    nombre: 'Blender 4.2 Video Seq',
    descripcion: 'Suite 3D con módulo de video sequencing integrado',
    trending: '1200 stars ↑',
    angulo: 'Blender for Video Editing: All-in-One Tool',
    busquedas_est: '12,000/mes'
  },
  {
    prioridad: 'Media',
    tipo: 'Software',
    nombre: 'Natron 2.5',
    descripcion: 'Compositing open-source similar a Nuke (profes)',
    trending: '89 stars ↑',
    angulo: 'Professional Compositing Without After Effects',
    busquedas_est: '2,300/mes'
  },
  {
    prioridad: 'Alta',
    tipo: 'Software',
    nombre: 'Inkscape 1.4',
    descripcion: 'Vector design tool profesional, alternativa a Illustrator',
    trending: '520 stars ↑',
    angulo: 'Inkscape vs Adobe Illustrator: Complete Comparison',
    busquedas_est: '9,400/mes'
  },
];

// Datos DEMO para Agent 2
const demoResults2 = [
  {
    prioridad: 'Alta',
    tipo: 'IA',
    nombre: 'Real-ESRGAN v0.3.0',
    descripcion: 'Upscaling de video con IA, 4x resolution sin pérdida',
    trending: '850 stars ↑',
    angulo: 'AI Video Upscaling: Best Free Tools 2026',
    busquedas_est: '7,800/mes'
  },
  {
    prioridad: 'Alta',
    tipo: 'IA',
    nombre: 'Stable Diffusion XL (LocalAI)',
    descripcion: 'Generación de imágenes local, sin enviar datos a nube',
    trending: '2100 stars ↑',
    angulo: 'Run Stable Diffusion Locally: Complete Setup',
    busquedas_est: '15,000/mes'
  },
  {
    prioridad: 'Alta',
    tipo: 'IA',
    nombre: 'OpenVoice (Myshell)',
    descripcion: 'Clonación de voz open-source, alta calidad',
    trending: '640 stars ↑',
    angulo: 'Best Open Source Voice Cloning Tools',
    busquedas_est: '6,500/mes'
  },
  {
    prioridad: 'Media',
    tipo: 'IA',
    nombre: 'Whisper v3 (OpenAI)',
    descripcion: 'Transcripción de audio a texto muy precisa',
    trending: '550 stars ↑',
    angulo: 'Free Automatic Transcription: Whisper Setup',
    busquedas_est: '8,200/mes'
  },
  {
    prioridad: 'Media',
    tipo: 'IA',
    nombre: 'Descript Alternative: Udio',
    descripcion: 'IA para generación y edición de música open-source',
    trending: '340 stars ↑',
    angulo: 'AI Music Generation Without Adobe',
    busquedas_est: '4,100/mes'
  },
];

// Datos DEMO para Agent 3
const demoResults3 = [
  {
    prioridad: 'Alta',
    tipo: 'Software',
    nombre: 'ActionCamera (Gitee)',
    descripcion: 'Editor de video chino con timeline avanzado, interfaz en inglés',
    trending: '420 stars ↑',
    angulo: 'Chinese Video Editor: Better Than DaVinci?',
    busquedas_est: '3,200/mes'
  },
  {
    prioridad: 'Media',
    tipo: 'Software',
    nombre: 'Pixo (Gitee)',
    descripcion: 'Herramienta de diseño 3D asiática, muy optimizada',
    trending: '180 stars ↑',
    angulo: 'Asian Design Tools: What China Does Better',
    busquedas_est: '1,900/mes'
  },
  {
    prioridad: 'Alta',
    tipo: 'Software',
    nombre: 'Mediastudio (Gitee)',
    descripcion: 'Suite creativa todo-en-uno desarrollada en China',
    trending: '510 stars ↑',
    angulo: 'All-in-One Creative Suite: Chinese Alternative',
    busquedas_est: '2,600/mes'
  },
  {
    prioridad: 'Baja',
    tipo: 'Software',
    nombre: 'AudioPro (Gitee)',
    descripcion: 'Editor de audio chino, interfaz compleja pero poderosa',
    trending: '95 stars',
    angulo: 'Open Source Chinese Audio Tools',
    busquedas_est: '800/mes'
  },
];

// Datos DEMO para Agent 4
const demoResults4 = [
  {
    prioridad: 'Alta',
    tipo: 'Update',
    nombre: 'Adobe Premiere 2025 - Pricing Increase',
    descripcion: 'Adobe aumentó precio de Premiere de $55 a $65/mes',
    trending: 'TRENDING ↑↑↑',
    angulo: 'Adobe Price Increase 2025: Free Alternatives',
    busquedas_est: '18,000/mes (CRISIS MOMENT)'
  },
  {
    prioridad: 'Alta',
    tipo: 'Update',
    nombre: 'DaVinci Resolve 19.2 - IA Integration',
    descripcion: 'Nuevas features IA para color grading automático',
    trending: '850 stars ↑',
    angulo: 'DaVinci 2026: New AI Features Explained',
    busquedas_est: '9,500/mes'
  },
  {
    prioridad: 'Alta',
    tipo: 'Crisis',
    nombre: 'Canva Design Lawsuit - AI Training',
    descripcion: 'Demanda contra Canva por entrenar IA con arte de usuarios',
    trending: 'VIRAL ↑↑',
    angulo: 'AI Training Controversy: Ethical Alternatives',
    busquedas_est: '12,000/mes (IMMEDIATE)'
  },
  {
    prioridad: 'Media',
    tipo: 'Update',
    nombre: 'Figma - Free Tier Reduction',
    descripcion: 'Figma reducción de features en plan gratuito',
    trending: 'TRENDING ↑',
    angulo: 'Figma Free Tier Changes: Best Alternatives',
    busquedas_est: '6,800/mes'
  },
  {
    prioridad: 'Media',
    tipo: 'Update',
    nombre: 'OBS Studio 30.2 - New Codec Support',
    descripcion: 'OBS agrega soporte para codecs de última generación',
    trending: '520 stars ↑',
    angulo: 'OBS Studio: Latest Features & Setup Guide',
    busquedas_est: '5,200/mes'
  },
];

function generateMarkdownTable(results) {
  if (!results || results.length === 0) {
    return '## Sin resultados\n\nNo se encontraron elementos relevantes.';
  }

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

function runDemoAgent(agentNumber, agentName, categoryName, results, description) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`⚙️  ${agentName}`);
  console.log(`${'='.repeat(60)}\n`);

  const markdownTable = generateMarkdownTable(results);
  const now = new Date();
  const isoDate = now.toISOString().split('T')[0];

  const documentContent = `# ${agentName} - Research Report

**Fecha:** ${isoDate}  
**Estado:** 🔬 DEMO MODE (Datos simulados sin API key)
**Resultados encontrados:** ${results.length}

---

## 📊 Tabla de Resultados

${markdownTable}

---

## 📝 Notas

- **Prioridad Alta:** Oportunidades inmediatas de artículos
- **Trending:** Crecimiento actual y relevancia
- **Est. Búsquedas:** Búsquedas mensuales estimadas (potencial de tráfico)

---

## 🎯 Top 3 Artículos Recomendados

${results
  .filter((r) => r.prioridad === 'Alta')
  .slice(0, 3)
  .map(
    (r, i) => `
${i + 1}. **${r.nombre}**
   - Ángulo: ${r.angulo}
   - Búsquedas/mes: ${r.busquedas_est}
   - Potencial: Alto
`
  )
  .join('')}

---

## 💡 Descripción del Agente

${description}

---

## ⚠️ Nota sobre DEMO

Este es un documento de demostración. Los datos son simulados para mostrar:
- Estructura de resultados
- Formato de tabla
- Tipos de información recopilada
- Sugerencias de contenido

En producción, estos datos provendrían de:
- Búsquedas reales en GitHub
- Análisis con Claude API
- Monitoreo de tendencias reales
- Detectar cambios/crisis en tiempo real

---

*Generado automáticamente por ${agentName} - DEMO MODE*
`;

  // Crear directorio y guardar archivo
  const dirPath = `./demo-reports/${categoryName}`;
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const fileName = `${isoDate}-Research-DEMO.md`;
  const filePath = `${dirPath}/${fileName}`;
  fs.writeFileSync(filePath, documentContent);

  console.log(`✅ ${agentName} completado`);
  console.log(`📁 Guardado en: ${filePath}`);
  console.log(`📊 Resultados encontrados: ${results.length}`);

  return filePath;
}

// Ejecutar DEMO de todos los agentes
async function runAllDemoAgents() {
  console.log('\n\n');
  console.log('█████████████████████████████████████████████████████████████');
  console.log('🚀 RESEARCH AGENTS - DEMO MODE');
  console.log('█████████████████████████████████████████████████████████████\n');

  const files = [];

  // Agent 1
  files.push(runDemoAgent(
    1,
    'Agent 1: Open-Source Programs',
    '1-OpenSource-Programs',
    demoResults1,
    'Busca nuevas herramientas open-source para creadores (video, audio, diseño, 3D). Filtra por repos con 50+ stars en última semana, commits activos, comunidad vibrante.'
  ));

  // Agent 2
  files.push(runDemoAgent(
    2,
    'Agent 2: AI Open-Source',
    '2-AI-OpenSource',
    demoResults2,
    'Busca modelos y herramientas IA abiertas disponibles para creadores. Enfoque en: generación de imágenes, upscaling de video, clonación de voz, transcripción de audio.'
  ));

  // Agent 3
  files.push(runDemoAgent(
    3,
    'Agent 3: Chinese Alternatives',
    '3-Chinese-Alternatives',
    demoResults3,
    'Busca software chino emergente en Gitee y Product Hunt Asia. Detecta alternativas asiáticas a herramientas occidentales con análisis de por qué son mejores/diferentes.'
  ));

  // Agent 4
  files.push(runDemoAgent(
    4,
    'Agent 4: Software Updates & Changes',
    '4-Software-Updates-Changes',
    demoResults4,
    'Monitorea cambios en herramientas conocidas: aumentos de precio, nuevas features IA, demandas legales, discontinuación de software, cambios de licencia.'
  ));

  console.log('\n\n');
  console.log('█████████████████████████████████████████████████████████████');
  console.log('✅ TODOS LOS AGENTES EJECUTADOS EXITOSAMENTE');
  console.log('█████████████████████████████████████████████████████████████\n');

  console.log('📂 Documentos generados:\n');
  files.forEach((file, i) => {
    console.log(`${i + 1}. ${file}`);
  });

  console.log('\n📊 Resumen:');
  console.log(`   - 4 agentes ejecutados`);
  console.log(`   - ${demoResults1.length + demoResults2.length + demoResults3.length + demoResults4.length} resultados totales`);
  console.log(`   - ${files.length} documentos generados`);
  console.log(`   - Ubicación: ./demo-reports/`);

  console.log('\n🎯 Próximo paso: Revisar documentos en ./demo-reports/\n');
}

runAllDemoAgents();
