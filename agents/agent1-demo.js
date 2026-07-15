#!/usr/bin/env node

/**
 * AGENT 1 DEMO - Open Source Programs
 * Genera datos ficticios realistas para demostración
 */

const fs = require('fs');
const path = require('path');

const AGENT_NAME = 'Agent 1: Open-Source Programs';
const CATEGORY_NAME = '1-OpenSource-Programs';

// Datos DEMO ficticios pero realistas
const DEMO_RESULTS = [
  {
    nombre: 'Shotcut 24.06',
    descripcion: 'Video editor multiplataforma con 2000+ commits últimas 2 semanas',
    prioridad: 'Alta',
    tipo: 'Software',
    trending: '450 stars ↑',
    angulo: 'Best DaVinci Resolve Alternative for Beginners',
    busquedas_est: '3,200/mes',
  },
  {
    nombre: 'Krita 5.2',
    descripcion: 'Digital painting y design tool open source, nueva versión con AI assist',
    prioridad: 'Alta',
    tipo: 'Software',
    trending: '380 stars ↑',
    angulo: 'Photoshop Alternative That Actually Works',
    busquedas_est: '2,800/mes',
  },
  {
    nombre: 'FFmpeg 7.0',
    descripcion: 'Video processing con soporte para codecs nuevos 8K',
    prioridad: 'Media',
    tipo: 'Software',
    trending: '200 stars ↑',
    angulo: 'The Ultimate Free Video Converter',
    busquedas_est: '1,500/mes',
  },
  {
    nombre: 'Olive Video Editor',
    descripcion: 'Node-based video editor en desarrollo activo (GitHub 18K stars)',
    prioridad: 'Media',
    tipo: 'Software',
    trending: '320 stars ↑',
    angulo: 'Professional Video Editing for Free',
    busquedas_est: '1,800/mes',
  },
  {
    nombre: 'Blender 4.2',
    descripcion: '3D modeling/animation con GPU rendering mejorado',
    prioridad: 'Alta',
    tipo: 'Software',
    trending: '290 stars ↑',
    angulo: 'Free 3D Animation That Replaces Cinema 4D',
    busquedas_est: '4,200/mes',
  },
  {
    nombre: 'GIMP 2.10.38',
    descripcion: 'Update con mejoras en GPU, nuevas herramientas de selección',
    prioridad: 'Media',
    tipo: 'Software',
    trending: '150 stars ↑',
    angulo: 'GIMP vs Photoshop: Benchmark 2026',
    busquedas_est: '2,100/mes',
  },
  {
    nombre: 'Inkscape 1.4',
    descripcion: 'Vector graphics con soporte para IA tracing',
    prioridad: 'Baja',
    tipo: 'Software',
    trending: '120 stars ↑',
    angulo: 'Free Vector Design: Inkscape vs Adobe Illustrator',
    busquedas_est: '1,200/mes',
  },
  {
    nombre: 'Kdenlive 24.06',
    descripcion: 'Video editor KDE con timeline mejorado y multicam support',
    prioridad: 'Media',
    tipo: 'Software',
    trending: '180 stars ↑',
    angulo: 'Best Free Linux Video Editor',
    busquedas_est: '950/mes',
  },
];

function generateMarkdownTable(results) {
  let markdown = `| PRIORIDAD | TIPO | NOMBRE | DESCRIPCIÓN | TRENDING | ÁNGULO ARTÍCULO | EST. BÚSQUEDAS |\n`;
  markdown += `|-----------|------|--------|-------------|----------|-----------------|----------------|\n`;

  results.forEach((item) => {
    const desc = (item.descripcion || '').substring(0, 50) + '...';
    const angulo = (item.angulo || '').substring(0, 40) + '...';

    markdown += `| ${item.prioridad} | ${item.tipo} | ${item.nombre} | ${desc} | ${item.trending} | ${item.angulo} | ${item.busquedas_est} |\n`;
  });

  return markdown;
}

async function runAgent1Demo() {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`⚙️  ${AGENT_NAME} - DEMO MODE`);
  console.log(`${'='.repeat(70)}\n`);

  console.log('🔍 Simulando búsquedas en 8 keywords...\n');

  const keywords = [
    'open source video editor new releases 2024 2025 2026',
    'free design tool github trending',
    'GIMP alternative open source',
    'Audacity alternative audio editing',
  ];

  keywords.forEach((kw, i) => {
    console.log(`   [${i + 1}/8] Procesando: "${kw}"`);
  });

  console.log(`\n✓ Búsquedas completadas`);
  console.log(`✓ Encontrados ${DEMO_RESULTS.length} resultados relevantes\n`);

  const now = new Date();
  const isoDate = now.toISOString().split('T')[0];

  const markdownTable = generateMarkdownTable(DEMO_RESULTS);

  const documentContent = `# ${AGENT_NAME} - Research Report

**Fecha:** ${isoDate}  
**Palabras clave:** 8 búsquedas realizadas  
**Resultados encontrados:** ${DEMO_RESULTS.length}

---

## 📊 Tabla de Resultados

${markdownTable}

---

## 📝 Notas

- **Prioridad Alta:** Herramientas con potencial inmediato de artículo (300+ stars/week)
- **Trending:** Crecimiento en GitHub en últimas 2 semanas
- **Est. Búsquedas:** Estimación conservadora de búsquedas mensuales en Google

---

## 🎯 Artículos Sugeridos (TOP 3)

1. **Shotcut vs DaVinci Resolve: The Ultimate Free Video Editor Showdown**
   - Ángulo: Best DaVinci Resolve Alternative for Beginners
   - CPC Estimado: $3.50-5.50
   - Búsquedas/mes: 3,200

2. **Krita 5.2 Released: Can This Beat Photoshop?**
   - Ángulo: Photoshop Alternative That Actually Works
   - CPC Estimado: $4.00-6.00
   - Búsquedas/mes: 2,800

3. **Blender 4.2 Updates: Free 3D Animation That Rivals Cinema 4D**
   - Ángulo: Free 3D Animation That Replaces Cinema 4D
   - CPC Estimado: $3.50-5.50
   - Búsquedas/mes: 4,200

---

*Generado automáticamente por ${AGENT_NAME} | DEMO MODE (Sin credenciales)*
`;

  // Guardar localmente
  const outputDir = path.join(__dirname, CATEGORY_NAME);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const fileName = `${isoDate}-Research.md`;
  const filePath = path.join(outputDir, fileName);
  fs.writeFileSync(filePath, documentContent);

  console.log(`✅ ${AGENT_NAME} COMPLETADO\n`);
  console.log(`📄 Archivo guardado: ${filePath}\n`);

  return { success: true, resultsCount: DEMO_RESULTS.length };
}

// Ejecutar
runAgent1Demo().catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
