#!/usr/bin/env node

/**
 * Script de prueba para Telegram
 * NO gasta tokens de los agentes
 * Verifica que la configuración de Telegram funciona correctamente
 */

require('dotenv').config();
const { sendTelegramNotification } = require('./utils/telegram');

async function testTelegram() {
  console.log('\n' + '='.repeat(60));
  console.log('🧪 TEST DE TELEGRAM');
  console.log('='.repeat(60) + '\n');

  // Verificar variables de entorno
  if (!process.env.TELEGRAM_BOT_TOKEN) {
    console.log('❌ TELEGRAM_BOT_TOKEN no configurado en .env');
    console.log('   Lee TELEGRAM-SETUP.md para configurar');
    process.exit(1);
  }

  if (!process.env.TELEGRAM_CHAT_ID) {
    console.log('❌ TELEGRAM_CHAT_ID no configurado en .env');
    console.log('   Lee TELEGRAM-SETUP.md para configurar');
    process.exit(1);
  }

  console.log('✓ Variables de entorno detectadas');
  console.log(`  Bot Token: ${process.env.TELEGRAM_BOT_TOKEN.substring(0, 15)}...`);
  console.log(`  Chat ID: ${process.env.TELEGRAM_CHAT_ID}`);

  // Mensaje de prueba
  const testMessage = `
🧪 *TEST DE TELEGRAM* ✅

Este es un mensaje de prueba del sistema Research Agents.

Si ves este mensaje:
- ✅ Tu bot Telegram está correctamente configurado
- ✅ Las credenciales TELEGRAM_BOT_TOKEN y TELEGRAM_CHAT_ID son válidas
- ✅ Los agentes podrán enviarte notificaciones automáticamente

Puedes ejecutar los agentes con:
\`\`\`
npm run all
\`\`\`

_Generado por test-telegram.js_
  `.trim();

  console.log('\n📤 Enviando mensaje de prueba...\n');

  // Enviar mensaje
  const result = await sendTelegramNotification(testMessage, '🧪 TEST');

  if (result) {
    console.log('\n✅ ÉXITO: Mensaje enviado correctamente a Telegram');
    console.log('\n✨ Tu Telegram está listo. Ahora puedes ejecutar:');
    console.log('   npm run all');
    process.exit(0);
  } else {
    console.log('\n❌ ERROR: No se pudo enviar el mensaje');
    console.log('\nVerifica:');
    console.log('1. TELEGRAM_BOT_TOKEN - debe ser válido (sin espacios)');
    console.log('2. TELEGRAM_CHAT_ID - debe ser un número válido');
    console.log('3. Conexión a internet activa');
    console.log('\nLee TELEGRAM-SETUP.md para revisar la configuración');
    process.exit(1);
  }
}

// Ejecutar test
testTelegram().catch((error) => {
  console.error('❌ Error inesperado:', error.message);
  process.exit(1);
});
