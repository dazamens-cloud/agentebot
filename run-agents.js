#!/usr/bin/env node

/**
 * RESEARCH AGENTS RUNNER - Google Gemini Version
 * Ejecuta los 4 agentes de research con Google Gemini API (GRATIS)
 * 
 * Uso:
 *   node run-agents.js              # Ejecuta todos los agentes
 *   node run-agents.js agent1       # Ejecuta solo Agent 1
 *   node run-agents.js --help       # Muestra ayuda
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Importar los agentes
const { runAgent1 } = require('./agents/agent1-opensource');
const { runAgent2 } = require('./agents/agent2-ai-opensource');
const { runAgent3 } = require('./agents/agent3-chinese-alternatives');
const { runAgent4 } = require('./agents/agent4-updates-changes');

const agents = {
  agent1: { name: 'Agent 1: Open-Source Programs', fn: runAgent1 },
  agent2: { name: 'Agent 2: AI Open-Source', fn: runAgent2 },
  agent3: { name: 'Agent 3: Chinese Alternatives', fn: runAgent3 },
  agent4: { name: 'Agent 4: Software Updates & Changes', fn: runAgent4 },
};

async function validateSetup() {
  console.log('\n🔍 Validando setup...\n');

  // Verificar API key
  if (!process.env.GOOGLE_GEMINI_API_KEY) {
    console.error('❌ Error: GOOGLE_GEMINI_API_KEY no configurada');
    console.error('   Solución: Edita .env y agrega tu Google Gemini API key');
    console.error('   Obtenerla de: https://aistudio.google.com/app/apikeys\n');
    process.exit(1);
  }

  console.log('✓ Google Gemini API Key detectada');

  // Verificar estructura de carpetas
  const requiredDirs = ['./agents', './utils', './reports'];
  for (const dir of requiredDirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✓ Carpeta ${dir} creada`);
    }
  }

  console.log('✓ Estructura de carpetas validada\n');
}

async function runSelectedAgents(selectedAgents) {
  console.log('\n' + '█'.repeat(70));
  console.log('🚀 RESEARCH AGENTS - Google Gemini Edition');
  console.log('█'.repeat(70) + '\n');

  const startTime = Date.now();
  let completed = 0;
  let failed = 0;

  for (const [key, agent] of Object.entries(agents)) {
    if (!selectedAgents.includes(key)) continue;

    try {
      console.log(`\n${'='.repeat(70)}`);
      console.log(`⚙️  ${agent.name}`);
      console.log(`${'='.repeat(70)}\n`);

      await agent.fn();
      completed++;
    } catch (error) {
      console.error(`\n❌ Error en ${agent.name}:`, error.message);
      failed++;
    }

    // Pequeña pausa entre agentes
    if (selectedAgents.indexOf(key) < selectedAgents.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  // Resumen final
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log('\n\n' + '█'.repeat(70));
  console.log('✅ EJECUCIÓN COMPLETADA');
  console.log('█'.repeat(70));
  console.log(`\n📊 Resultados:`);
  console.log(`   Agentes exitosos: ${completed}`);
  console.log(`   Agentes fallidos: ${failed}`);
  console.log(`   Tiempo total: ${elapsed}s`);
  console.log(`\n📂 Reportes guardados en: ./reports/\n`);
}

async function main() {
  const args = process.argv.slice(2);

  // Help
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
🤖 Research Agents Runner - Google Gemini Edition

USO:
  node run-agents.js                 Ejecutar todos los agentes
  node run-agents.js agent1          Ejecutar solo Agent 1
  node run-agents.js agent1 agent3   Ejecutar Agents 1 y 3
  node run-agents.js --help          Mostrar esta ayuda

AGENTES DISPONIBLES:
  • agent1    Agent 1: Open-Source Programs
  • agent2    Agent 2: AI Open-Source
  • agent3    Agent 3: Chinese Alternatives
  • agent4    Agent 4: Software Updates & Changes

EJEMPLOS:
  node run-agents.js                 # Todos los agentes
  node run-agents.js agent4          # Solo el que detecta crises
  node run-agents.js agent1 agent2   # Primeros dos agentes

REQUIREMENTS:
  • Google Gemini API Key en .env (gratuita)
  • Node.js 18+
  • npm install (dependencias)

DOCUMENTACIÓN:
  • QUICK-START.md   - Setup de 5 minutos
  • README.md        - Documentación completa
  • SETUP.md         - Setup detallado
    `);
    return;
  }

  // Validar setup
  try {
    await validateSetup();
  } catch (error) {
    console.error('❌ Error de validación:', error.message);
    process.exit(1);
  }

  // Determinar qué agentes ejecutar
  let selectedAgents = Object.keys(agents);

  if (args.length > 0) {
    selectedAgents = args.filter((arg) => agents[arg]);
    
    if (selectedAgents.length === 0) {
      console.error('❌ Error: No se reconocieron los agentes especificados');
      console.error('   Agentes válidos: agent1, agent2, agent3, agent4\n');
      process.exit(1);
    }
  }

  // Ejecutar
  try {
    await runSelectedAgents(selectedAgents);
  } catch (error) {
    console.error('❌ Error durante ejecución:', error);
    process.exit(1);
  }
}

main().catch(console.error);
