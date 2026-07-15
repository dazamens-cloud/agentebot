#!/usr/bin/env node

/**
 * RESEARCH AGENTS RUNNER v2 - Google Gemini Edition
 * Ejecuta los 4 agentes de research con Google Gemini API (GRATIS)
 *
 * Cambios en v2:
 * - Ejecución en paralelo (3-4 min en lugar de 15-20)
 * - Mejor validación de configuración
 * - Logging mejorado
 * - Uso de AgentFactory para eliminar duplicación
 *
 * Uso:
 *   node run-agents.js              # Ejecuta todos los agentes (en paralelo)
 *   node run-agents.js agent1       # Ejecuta solo Agent 1
 *   node run-agents.js --parallel   # Fuerza ejecución paralela (default)
 *   node run-agents.js --sequential # Ejecución secuencial (más lenta)
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { config, validateConfig } = require('./lib/config');
const logger = require('./lib/logger');
const { createAgent } = require('./lib/agentFactory');

// Crear agentes dinámicamente desde config
const agents = {};
config.agents.forEach((agentConfig) => {
  agents[agentConfig.id] = {
    name: agentConfig.name,
    config: agentConfig,
    fn: createAgent(agentConfig),
  };
});

async function validateSetup() {
  logger.info('Validando configuración...');

  // Validar API keys
  const validation = validateConfig();
  if (!validation.valid) {
    validation.errors.forEach((error) => logger.error(error));
    process.exit(1);
  }

  logger.success('Configuración validada');

  // Crear directorios necesarios
  const requiredDirs = [
    config.paths.reports,
    config.paths.agents,
    config.paths.utils,
    './lib',
  ];

  for (const dir of requiredDirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      logger.debug(`Carpeta creada: ${dir}`);
    }
  }

  logger.success('Estructura de carpetas validada');
}

async function runAgentsParallel(selectedAgents) {
  logger.info('Ejecutando agentes en PARALELO');

  const promises = selectedAgents.map((agentKey) => agents[agentKey].fn());

  try {
    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    logger.error(`Error en ejecución paralela: ${error.message}`);
    throw error;
  }
}

async function runAgentsSequential(selectedAgents) {
  logger.info('Ejecutando agentes de forma SECUENCIAL');

  const results = [];

  for (const agentKey of selectedAgents) {
    try {
      const result = await agents[agentKey].fn();
      results.push(result);

      // Pausa entre agentes secuenciales
      if (selectedAgents.indexOf(agentKey) < selectedAgents.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    } catch (error) {
      logger.error(`Error en ${agents[agentKey].name}: ${error.message}`);
      results.push({ success: false, agent: agentKey, error: error.message });
    }
  }

  return results;
}

async function main() {
  const args = process.argv.slice(2);
  let mode = 'parallel'; // default

  // Parse arguments
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
🤖 Research Agents Runner v2 - Google Gemini Edition

USO:
  node run-agents.js                    Ejecutar todos (paralelo)
  node run-agents.js agent1             Ejecutar solo Agent 1
  node run-agents.js agent1 agent3      Ejecutar Agents 1 y 3
  node run-agents.js --sequential       Ejecutar todos (secuencial, más lento)
  node run-agents.js --help             Mostrar esta ayuda

AGENTES DISPONIBLES:
  • agent1    Agent 1: Open-Source Programs
  • agent2    Agent 2: AI Open-Source
  • agent3    Agent 3: Chinese Alternatives
  • agent4    Agent 4: Software Updates & Changes

EJEMPLOS:
  node run-agents.js                    # Todos en paralelo (~3-4 min)
  node run-agents.js agent4             # Solo Agent 4
  node run-agents.js agent1 agent2      # Agents 1 y 2 en paralelo
  node run-agents.js --sequential       # Todos secuencial (~15-20 min)

REQUIREMENTS:
  • Google Gemini API Keys en .env (gratuita)
  • Node.js 18+
  • npm install

DOCUMENTACIÓN:
  • QUICK-START.md   - Setup de 5 minutos
  • README.md        - Documentación completa
  • SETUP.md         - Setup detallado
    `);
    return;
  }

  if (args.includes('--sequential')) {
    mode = 'sequential';
    args.splice(args.indexOf('--sequential'), 1);
  }

  // Validar setup
  try {
    await validateSetup();
  } catch (error) {
    process.exit(1);
  }

  // Determinar qué agentes ejecutar
  let selectedAgents = Object.keys(agents);

  if (args.length > 0) {
    selectedAgents = args.filter((arg) => agents[arg]);

    if (selectedAgents.length === 0) {
      logger.error('No se reconocieron los agentes especificados');
      logger.error('Agentes válidos: agent1, agent2, agent3, agent4');
      process.exit(1);
    }
  }

  // Ejecutar
  try {
    logger.info('█'.repeat(70));
    logger.info('🚀 RESEARCH AGENTS - Google Gemini v2');
    logger.info('█'.repeat(70));

    const startTime = Date.now();

    let results;
    if (mode === 'parallel') {
      results = await runAgentsParallel(selectedAgents);
    } else {
      results = await runAgentsSequential(selectedAgents);
    }

    // Resumen
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    const successful = results.filter((r) => r.success).length;
    const failed = results.filter((r) => !r.success).length;

    logger.info('█'.repeat(70));
    logger.success('EJECUCIÓN COMPLETADA');
    logger.info('█'.repeat(70));

    logger.info(`Agentes ejecutados: ${selectedAgents.length}`);
    logger.success(`  ✅ Exitosos: ${successful}`);
    if (failed > 0) {
      logger.error(`  ❌ Fallidos: ${failed}`);
    }
    logger.info(`  ⏱️  Tiempo total: ${elapsed}s`);
    logger.info(`  📂 Reportes en: ${config.paths.reports}/`);

    process.exit(failed > 0 ? 1 : 0);
  } catch (error) {
    logger.error(`Error fatal: ${error.message}`);
    process.exit(1);
  }
}

main().catch((error) => {
  logger.error(`Error no manejado: ${error.message}`);
  process.exit(1);
});
