# ⚡ QUICK START - Research Agents

**Tiempo total:** ~5 minutos

---

## 🚀 PASO 1: Obtener Google Gemini API Key (2 minutos)

1. Abre: https://aistudio.google.com/app/apikeys
2. Haz clic: **"Create API Key"**
3. Copia la key completa (comienza con `AIzaSyD`)
4. **IMPORTANTE:** Guárdala en un lugar seguro

---

## 📝 PASO 2: Configurar .env (1 minuto)

```bash
cd ~/research-agent-opensource

# Crear archivo .env
cp .env.example .env

# Editar con tu editor favorito
nano .env
```

Dentro del archivo, descomenta/edita esta línea:
```
GOOGLE_GEMINI_API_KEY=AIzaSyD_PEGA_TU_KEY_AQUI
```

Guarda: `Ctrl+O → Enter → Ctrl+X`

---

## 📦 PASO 3: Instalar dependencias (2 minutos)

```bash
npm install
```

---

## ▶️ PASO 4: Ejecutar un agente de prueba (1 minuto)

```bash
node agents/agent1-opensource.js
```

**Esperado:** Verás output similar a esto:

```
============================================================
⚙️  Agent 1: Open-Source Programs
============================================================

📌 Procesando keyword: "open source video editor..."
🔍 Buscando: open source video editor...
✓ Documento preparado con 6 resultados
```

---

## 🎉 ¡LISTO!

Los reportes se generan en:
```
./reports/1-OpenSource-Programs/
./reports/2-AI-OpenSource/
./reports/3-Chinese-Alternatives/
./reports/4-Software-Updates-Changes/
```

Cada archivo `.md` contiene una tabla con resultados listos para leer.

---

## 🔁 Ejecutar todos los agentes

```bash
npm run all
```

O individualmente:

```bash
node agents/agent1-opensource.js
node agents/agent2-ai-opensource.js
node agents/agent3-chinese-alternatives.js
node agents/agent4-updates-changes.js
```

---

## 📂 Revisar resultados

```bash
# Abre el archivo generado
cat ./reports/1-OpenSource-Programs/YYYY-MM-DD-Research.md

# O directamente con tu editor
nano ./reports/1-OpenSource-Programs/YYYY-MM-DD-Research.md
```

---

## ⚙️ Opcional: Automatizar con cron

Para ejecutar automáticamente cada domingo y miércoles a las 22:00:

```bash
# Editar crontab
crontab -e

# Agregar estas líneas:
0 22 * * 0 cd ~/research-agent-opensource && node agents/DEMO-all-agents.js >> reports/cron.log 2>&1
0 22 * * 3 cd ~/research-agent-opensource && node agents/DEMO-all-agents.js >> reports/cron.log 2>&1
```

---

## 💡 Notas

- **Sin Google Drive:** Los reportes se guardan solo en local (`./reports/`)
- **Con Google Drive:** Si quieres autoupload, configura `GOOGLE_DRIVE_FOLDER_ID` en `.env` (para después)
- **API Key:** Guarda en lugar seguro, NO la compartas en chat ni redes sociales
- **Costo:** TOTALMENTE GRATIS

---

## ❓ Troubleshooting

**Error: "GOOGLE_GEMINI_API_KEY is undefined"**
- Verifica que en `.env` está la key sin espacios al inicio

**Error: "Cannot find module '@google/generative-ai'"**
- Ejecuta: `npm install`

**Los reportes están vacíos**
- Verifica que tu API key es válida
- Aumenta verbosidad agregando: `DEBUG=true` en `.env`

---

**Eso es todo. ¡A disfrutar los agentes!** 🚀
