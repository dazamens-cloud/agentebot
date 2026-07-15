/**
 * Logger centralizado con timestamps y niveles
 */

const { config } = require('./config');

const LEVELS = {
  DEBUG: { num: 0, color: '\x1b[36m', prefix: '🔍' },
  INFO: { num: 1, color: '\x1b[0m', prefix: 'ℹ️ ' },
  WARN: { num: 2, color: '\x1b[33m', prefix: '⚠️ ' },
  ERROR: { num: 3, color: '\x1b[31m', prefix: '❌' },
  SUCCESS: { num: 4, color: '\x1b[32m', prefix: '✅' },
};

const RESET = '\x1b[0m';

function timestamp() {
  return new Date().toISOString().split('T')[1].slice(0, 8);
}

function log(level, message, data = null) {
  const levelObj = LEVELS[level];
  if (!levelObj) return;

  const currentLevel = LEVELS[config.logging.level];
  if (levelObj.num < currentLevel.num) return;

  const ts = config.logging.useTimestamps ? `[${timestamp()}] ` : '';
  const msg = `${levelObj.color}${ts}${levelObj.prefix} ${message}${RESET}`;

  if (data) {
    if (level === 'ERROR') {
      console.error(msg);
      console.error(data);
    } else {
      console.log(msg);
      console.log(data);
    }
  } else {
    if (level === 'ERROR') {
      console.error(msg);
    } else {
      console.log(msg);
    }
  }
}

module.exports = {
  debug: (msg, data) => log('DEBUG', msg, data),
  info: (msg, data) => log('INFO', msg, data),
  warn: (msg, data) => log('WARN', msg, data),
  error: (msg, data) => log('ERROR', msg, data),
  success: (msg, data) => log('SUCCESS', msg, data),
};
