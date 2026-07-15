# 📱 SETUP TELEGRAM - Notificaciones de Research Agents

**Tiempo total:** ~5 minutos

Cuando ejecutes los agentes, recibirás notificaciones automáticas en Telegram con los resultados.

---

## 🤖 PASO 1: Crear tu Bot Telegram (2 minutos)

### 1. Abre Telegram en tu teléfono
- Si no tienes Telegram descargado: https://telegram.org/

### 2. Busca: `@BotFather`
- Es el bot oficial de Telegram para crear bots
- Dale click en el primer resultado

### 3. Envía: `/newbot`
- Él te pedirá:
  - **Nombre del bot** (ej: "Research Bot")
  - **Username del bot** (ej: "research_agents_bot" - debe ser único y terminar en "_bot")

### 4. BotFather te responderá con:
```
Congratulations! Your new bot is ready. You'll find it at t.me/your_bot_name. 
You can now add a description, about section and profile picture for your bot, see /help for a list of commands. By the way, when you've finished creating your cool bot, ping our Bot Support if you want a better username for the bot. Just make sure the bot is chalking up some non-trivial number of users, not just test accounts.

Here's your token:
123456:ABCdefghijklmnopqrstuvwxyz...
```

### 5. **COPIA Y GUARDA TU TOKEN** (la parte `123456:ABCdef...`)
- Este es tu `TELEGRAM_BOT_TOKEN`

---

## 👤 PASO 2: Obtener tu Chat ID (2 minutos)

### 1. En Telegram, busca: `@userinfobot`

### 2. Envía: `/start`

### 3. Te responderá algo como:
```
👤 User

Id: 123456789
First name: Tu Nombre
Username: @tu_username
Language: es
Is bot: No
```

### 4. **COPIA TU ID** (el número `123456789`)
- Este es tu `TELEGRAM_CHAT_ID`

---

## 🔧 PASO 3: Agregar a tu máquina (1 minuto)

### Editar .env

```bash
cd ~/research-agent-opensource
nano .env
```

Descomenta/edita estas líneas:

```
TELEGRAM_BOT_TOKEN=123456:ABCdefghijklmnopqrstuvwxyz...
TELEGRAM_CHAT_ID=123456789
```

Reemplaza con:
- Tu `TELEGRAM_BOT_TOKEN` (del paso 1)
- Tu `TELEGRAM_CHAT_ID` (del paso 2)

**Guardar:** `Ctrl+O` → `Enter` → `Ctrl+X`

---

## ✅ PASO 4: Probar (30 segundos)

```bash
npm run all
```

Deberías recibir un mensaje en Telegram después de cada agente, similar a:

```
📊 Agent 4: Software Updates & Changes

🔍 Top Resultados:

1. Adobe Price Increase
   📌 Adobe Price Increase 2025: Free Alternatives
   🔎 ~18,000/mes
   TRENDING ↑↑↑

Ver reporte completo en ./reports/
```

---

## 🔔 QUÉ RECIBIRÁS

Cada ejecución de los agentes:

```
📊 Agent 1: Open-Source Programs
  [Top 3 resultados]
  Ver reporte completo en ./reports/

📊 Agent 2: AI Open-Source
  [Top 3 resultados]
  Ver reporte completo en ./reports/

📊 Agent 3: Chinese Alternatives
  [Top 3 resultados]
  Ver reporte completo en ./reports/

📊 Agent 4: Software Updates & Changes
  [Top 3 resultados - MÁS IMPORTANTE]
  Ver reporte completo en ./reports/
```

---

## 🆘 Si algo falla

### "No recibo mensajes"
1. Verifica que `TELEGRAM_BOT_TOKEN` está correcto (sin espacios)
2. Verifica que `TELEGRAM_CHAT_ID` está correcto (es un número)
3. Intenta creando un nuevo bot con @BotFather

### "Token inválido"
1. Copia nuevamente tu token de @BotFather
2. Asegúrate de no tener espacios al inicio/final

### "Chat not found"
1. Copia tu ID nuevamente con @userinfobot
2. Verifica que es un número sin caracteres especiales

---

## 💡 NOTAS

- **Es opcional:** Si no quieres Telegram, los reportes se guardan en `./reports/` de todas formas
- **Es gratis:** No cuesta nada
- **Es seguro:** Solo tú recibes los mensajes
- **Es automático:** Si configurás los agentes en cron/GitHub Actions, también recibirás notificaciones automáticas

---

## 🚀 ¡LISTO!

Cuando ejecutes los agentes ahora:
```bash
npm run all
```

Recibirás notificaciones en Telegram instantáneamente.

---

*Guía rápida de Telegram para Research Agents*
