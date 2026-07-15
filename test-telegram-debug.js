#!/usr/bin/env node

/**
 * Test de Telegram con DEBUG detallado
 */

require('dotenv').config();
const https = require('https');

async function testTelegramDebug() {
  console.log('\n' + '='.repeat(60));
  console.log('🔍 TEST TELEGRAM CON DEBUG');
  console.log('='.repeat(60) + '\n');

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.log('❌ Credenciales faltantes');
    process.exit(1);
  }

  console.log('📋 Credenciales:');
  console.log(`  Token: ${botToken.substring(0, 20)}...`);
  console.log(`  Chat ID: ${chatId}\n`);

  const testMessage = '🧪 Test de Telegram - Verificación de conexión';

  const postData = JSON.stringify({
    chat_id: chatId,
    text: testMessage,
    parse_mode: 'Markdown',
  });

  console.log('📤 Enviando solicitud HTTP...');
  console.log(`  URL: https://api.telegram.org/bot${botToken.substring(0, 15)}...`);
  console.log(`  Método: POST`);
  console.log(`  Chat ID: ${chatId}`);
  console.log(`  Mensaje: ${testMessage}\n`);

  return new Promise((resolve) => {
    const options = {
      hostname: 'api.telegram.org',
      path: `/bot${botToken}/sendMessage`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log(`📊 Respuesta del servidor:`);
        console.log(`  Status Code: ${res.statusCode}`);
        console.log(`  Headers:`, JSON.stringify(res.headers, null, 2));
        console.log(`  Body: ${data}\n`);

        try {
          const response = JSON.parse(data);

          if (res.statusCode === 200 && response.ok) {
            console.log('✅ ¡ÉXITO! Mensaje enviado correctamente');
            console.log(`\n📲 Revisa tu Telegram (@ajdazabot) - deberías ver el mensaje\n`);
          } else {
            console.log('❌ Error en la respuesta:');
            console.log(`  ok: ${response.ok}`);
            console.log(`  error_code: ${response.error_code}`);
            console.log(`  description: ${response.description}`);

            console.log('\n💡 Soluciones según el error:');
            if (response.error_code === 400) {
              console.log('  • Error 400 (Bad Request) - Causas comunes:');
              console.log('    1. El bot NO ha sido iniciado por el usuario');
              console.log('    2. El Chat ID es incorrecto');
              console.log('    3. Token inválido o expirado');
              console.log('\n  ✔️ SOLUCIÓN: Abre Telegram → Busca @ajdazabot → Envía /start');
            } else if (response.error_code === 401) {
              console.log('  • Error 401 - Token inválido o expirado');
              console.log('    Regenera el bot con @BotFather');
            }
          }
        } catch (e) {
          console.log('❌ Error parseando respuesta JSON:', e.message);
        }

        resolve();
      });
    });

    req.on('error', (error) => {
      console.error('❌ Error de conexión:', error.message);
      resolve();
    });

    req.write(postData);
    req.end();
  });
}

testTelegramDebug();
