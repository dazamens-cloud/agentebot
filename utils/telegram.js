const https = require('https');

/**
 * Enviar notificación a Telegram
 */
async function sendTelegramNotification(message, agentName) {
  try {
    if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
      console.log('⚠️  Telegram no configurado (opcional)');
      return false;
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const text = `📊 *${agentName}*\n\n${message}`;

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const postData = JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: 'Markdown',
      disable_web_page_preview: true,
    });

    return new Promise((resolve, reject) => {
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
          if (res.statusCode === 200) {
            console.log('✓ Notificación Telegram enviada');
            resolve(true);
          } else {
            console.error('Error Telegram:', res.statusCode);
            resolve(false);
          }
        });
      });

      req.on('error', (error) => {
        console.error('Error enviando a Telegram:', error.message);
        resolve(false);
      });

      req.write(postData);
      req.end();
    });
  } catch (error) {
    console.error('Error en Telegram:', error.message);
    return false;
  }
}

/**
 * Generar resumen para Telegram (corto, porque es mensaje)
 */
function generateTelegramSummary(results, agentName) {
  if (!results || results.length === 0) {
    return 'Sin resultados en esta búsqueda.';
  }

  // Top 3 de prioridad alta
  const topResults = results
    .filter((r) => r.prioridad === 'Alta')
    .slice(0, 3);

  if (topResults.length === 0) {
    return `Encontrados ${results.length} resultados (ver reporte completo en ./reports/)`;
  }

  let summary = `🔍 *Top Resultados:*\n\n`;

  topResults.forEach((item, i) => {
    summary += `${i + 1}. *${item.nombre || 'Sin nombre'}*\n`;
    summary += `   📌 ${item.angulo || 'N/A'}\n`;
    summary += `   🔎 ~${item.busquedas_est || 'N/A'}\n`;
    summary += `   ${item.trending || '—'}\n\n`;
  });

  summary += `_Ver reporte completo en ./reports/_`;

  return summary;
}

module.exports = {
  sendTelegramNotification,
  generateTelegramSummary,
};
