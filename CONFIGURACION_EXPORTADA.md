# Research Agents - Exportación de Configuración
**Fecha:** 2026-07-15 02:30 UTC  
**Estado:** ✅ Completamente Configurado

---

## 📋 RESUMEN DEL SETUP

### ✅ Completado
- Proyecto clonado y configurado
- 4 Research Agents listos para ejecutar
- Credenciales configuradas (Google Gemini, Telegram, Google Drive)
- Reportes generados (estructura lista, esperando datos)
- GitHub sincronizado (agentebot)

### ⚠️ Estado Actual
- **API Keys:** En límite diario gratuito (se reinician mañana ~02:15 UTC)
- **Reportes:** 4 generados pero vacíos (sin datos por quota excedida)
- **Telegram:** No envió notificaciones (esperando datos de reportes)

---

## 🔧 CONFIGURACIÓN

### Ubicación del Proyecto
```
D:\proyectos godot\research-agent-opensource
Backup en: C:\Users\andre\OneDrive\Desktop\research-agent-opensource
```

### Archivo .env Configurado
**Credenciales activas:**
- ✅ GOOGLE_GEMINI_API_KEY (4 keys configuradas)
- ✅ TELEGRAM_BOT_TOKEN: [CONFIGURADO - ver .env local]
- ✅ TELEGRAM_CHAT_ID: [CONFIGURADO - ver .env local]
- ✅ GOOGLE_DRIVE_FOLDER_ID: [CONFIGURADO - ver .env local]
- ✅ GOOGLE_SERVICE_ACCOUNT_KEY: Configurada

⚠️ **IMPORTANTE:** Las credenciales reales se encuentran en el archivo `.env` local (nunca versionado en Git)

**Ubicación del .env:**
```
D:\proyectos godot\research-agent-opensource\.env
C:\Users\andre\OneDrive\Desktop\research-agent-opensource\.env
```

---

## 🚀 COMANDOS CLAVE

### Ejecutar desde PowerShell
```powershell
cd "D:\proyectos godot\research-agent-opensource"
npm install          # Instalar dependencias
npm run all          # Ejecutar los 4 agentes
```

### Ejecutar agentes individuales
```powershell
npm run agent1       # Open-Source Programs
npm run agent2       # AI Open-Source
npm run agent3       # Chinese Alternatives
npm run agent4       # Software Updates & Changes
```

---

## 📊 LOS 4 AGENTES

### Agent 1: Open-Source Programs
- **Objetivo:** Monitorear herramientas open-source trending
- **Búsquedas:** 8 por ejecución
- **Reporte:** `1-OpenSource-Programs/2026-07-15-Research.md`

### Agent 2: AI Open-Source
- **Objetivo:** Alternativas open-source de IA (Imagen, Video, Audio, Motion)
- **Búsquedas:** 8 por ejecución
- **Reporte:** `2-AI-OpenSource/2026-07-15-Research.md`

### Agent 3: Chinese Alternatives
- **Objetivo:** Herramientas chinas (Gitee, GitHub chino, Product Hunt Asia)
- **Búsquedas:** 8 por ejecución
- **Reporte:** `3-Chinese-Alternatives/2026-07-15-Research.md`

### Agent 4: Software Updates & Changes
- **Objetivo:** Cambios en software, updates importantes, controversias
- **Búsquedas:** 8 por ejecución
- **Reporte:** `4-Software-Updates-Changes/2026-07-15-Research.md`

---

## 📁 ESTRUCTURA DEL PROYECTO

```
research-agent-opensource/
├── .env                                    # Configuración (CREDENCIALES)
├── package.json                            # Dependencias
├── run-agents.js                           # Script principal
├── agents/
│   ├── agent1-opensource.js
│   ├── agent2-ai-opensource.js
│   ├── agent3-chinese-alternatives.js
│   ├── agent4-updates-changes.js
│   └── DEMO-all-agents.js
├── utils/
│   ├── googleDrive.js
│   ├── telegram.js
│   └── anthropicSearch.js
├── 1-OpenSource-Programs/
│   └── 2026-07-15-Research.md              # Reporte Agent 1
├── 2-AI-OpenSource/
│   └── 2026-07-15-Research.md              # Reporte Agent 2
├── 3-Chinese-Alternatives/
│   └── 2026-07-15-Research.md              # Reporte Agent 3
├── 4-Software-Updates-Changes/
│   └── 2026-07-15-Research.md              # Reporte Agent 4
└── reports/                                # (vacío - para futuras ejecuciones)
```

---

## ⏰ PRÓXIMOS PASOS

### Mañana (2026-07-16 ~02:15 UTC)
1. **Esperar reinicio de quota:** Google Gemini free tier se reinicia
2. **Ejecutar agentes:**
   ```powershell
   cd "D:\proyectos godot\research-agent-opensource"
   npm run all
   ```
3. **Verificar reportes:** Se generarán en las carpetas 1-4
4. **Recibir Telegram:** Bot enviará notificaciones automáticamente

### Para próximas ejecuciones
- Los reportes se generarán con fecha del día (ej: 2026-07-16-Research.md)
- Telegram recibirá notificaciones automáticas
- Google Drive recibirá copias de los reportes

---

## 🔑 CREDENCIALES IMPORTANTES

### No compartir públicamente:
- GOOGLE_GEMINI_API_KEY (4 keys)
- TELEGRAM_BOT_TOKEN
- GOOGLE_SERVICE_ACCOUNT_KEY (JSON)

### Ubicación segura:
Ambas ubicaciones tienen el .env configurado:
- D:\proyectos godot\research-agent-opensource\.env
- C:\Users\andre\OneDrive\Desktop\research-agent-opensource\.env

**Nota:** Si necesitas regenerar credenciales:
- Google API Keys: https://aistudio.google.com/app/apikeys
- Telegram Bot: @BotFather en Telegram
- Google Drive: Tu carpeta personal (ID: 10HBJ5UwBJ9yxaF3wMxKcIU7AHNFpZd7p)

---

## 📝 NOTAS TÉCNICAS

### Dependencias instaladas
```
@google/generative-ai
googleapis
google-auth-library
dotenv
node-fetch
```

### Problemas conocidos y soluciones

**Problema:** Quota excedida
- **Causa:** Las 4 API keys libres (free tier) tienen límite diario
- **Solución:** Esperar reinicio automático al día siguiente (~24h)
- **Alternativa:** Usar API keys de pago (sin límite)

**Problema:** Google Drive no recibe reportes
- **Causa:** Service Account sin cuota de almacenamiento
- **Solución:** Usar OAuth o shared drives (configurar en googleDrive.js)

**Problema:** Telegram no envía mensajes
- **Causa:** Sin reportes generados (falla en búsquedas)
- **Solución:** Esperar a que las búsquedas funcionen mañana

---

## 🔗 REPOSITORIO GITHUB

**URL:** https://github.com/dazamens-cloud/agentebot  
**Rama:** main  
**Estado:** Código sincronizado ✅  
**Token GitHub:** Generado (válido por 30 días desde 2026-07-15)

---

## 📞 CONTACTO / REFERENCIAS

- **Email:** dazamens@gmail.com
- **Telegram Chat ID:** [PRIVADO - configurado en .env]
- **Google Cloud Project:** research-agents-bot
- **Drive Folder:** [PRIVADO - configurado en .env]

⚠️ **NOTA:** No compartas credenciales en archivos versionados en Git

---

**Exportado:** 2026-07-15 02:30 UTC  
**Por:** Claude Code (Haiku 4.5)  
**Validez:** Indefinida (credenciales se pueden actualizar en .env)

