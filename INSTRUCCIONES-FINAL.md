# 📋 INSTRUCCIONES FINALES - Para cuando llegues a casa

**Tiempo total:** ~5 minutos

---

## 1️⃣ OBTENER TU API KEY GRATIS (2 minutos)

### Paso A: Ir a Google AI Studio
- Abre: https://aistudio.google.com/app/apikeys
- (Si pide login, usa tu cuenta de Google)

### Paso B: Crear una API Key
1. Haz clic en botón azul: **"Create API Key"**
2. Selecciona: **"Create API key in new project"** (o en un proyecto existente)
3. Se copiará automáticamente a tu portapapeles
4. **¡Listo!** Tienes tu key

**Nota:** Google permite 60 requests/minuto gratis. Para tu caso de uso (32 búsquedas cada ejecución), es más que suficiente.

---

## 2️⃣ CONFIGURAR EN TU MÁQUINA (3 minutos)

### Paso A: Crear bot Telegram (Opcional pero recomendado)

Si quieres recibir notificaciones:

1. Abre Telegram
2. Busca: `@BotFather`
3. Envía: `/newbot`
4. Sigue las instrucciones (te dará un token)
5. Busca: `@userinfobot`
6. Envía: `/start`
7. Copia tu ID

**Guarda:** Token y Chat ID para después

*(Si no quieres Telegram, salta al Paso B)*

### Paso B: Abrir terminal en la carpeta del proyecto
```bash
cd ~/research-agent-opensource
```

### Paso C: Crear archivo .env
```bash
cp .env.example .env
```

### Paso D: Editar .env y agregar tus credenciales
```bash
nano .env
```

**Dentro del archivo, busca estas líneas:**
```
GOOGLE_GEMINI_API_KEY=AIzaSyD_xxxxxxxxxxxxxxxxxxxxx
TELEGRAM_BOT_TOKEN=123456:ABCdef...
TELEGRAM_CHAT_ID=123456789
```

**Reemplaza con:**
- Tu Google Gemini API key (obligatorio)
- Tu Telegram Bot Token (opcional)
- Tu Telegram Chat ID (opcional)

**Guardar:** Presiona `Ctrl+O` → `Enter` → `Ctrl+X`

---

## 3️⃣ INSTALAR DEPENDENCIAS (2 minutos)

```bash
npm install
```

Espera a que termine. Verás mensajes sobre paquetes instalados.

---

## 4️⃣ ¡EJECUTAR! (1 minuto)

### Opción A: Ejecutar todos los agentes
```bash
npm run all
```

O equivalente:
```bash
node run-agents.js
```

### Opción B: Ejecutar solo un agente
```bash
node run-agents.js agent1
node run-agents.js agent4
```

### Opción C: Ejecutar solo el agente de cambios/crises (MÁS IMPORTANTE)
```bash
node run-agents.js agent4
```

---

## 5️⃣ VER LOS RESULTADOS

Los reportes aparecerán en:
```
./reports/1-OpenSource-Programs/
./reports/2-AI-OpenSource/
./reports/3-Chinese-Alternatives/
./reports/4-Software-Updates-Changes/
```

Cada carpeta tendrá archivos `.md` con las tablas de resultados.

**Para ver un reporte:**
```bash
# Opción 1: Mostrar en terminal
cat ./reports/4-Software-Updates-Changes/2026-07-13-Research.md

# Opción 2: Abrir con editor
nano ./reports/4-Software-Updates-Changes/2026-07-13-Research.md

# Opción 3: Ver con less (mejor para lectura)
less ./reports/4-Software-Updates-Changes/2026-07-13-Research.md
```

---

## 📊 QUÉ ESPERAR

Cuando ejecutes, verás algo así:

```
============================================================
⚙️  Agent 1: Open-Source Programs
============================================================

📌 Procesando keyword: "open source video editor new releases..."
🔍 Buscando: open source video editor...
... (más búsquedas)
✓ Documento preparado con 6 resultados
```

**Tiempo por agente:** ~30-60 segundos cada uno

---

## ✅ CHECKLIST

Antes de ejecutar, verifica:

- [ ] Creé una API key en https://aistudio.google.com/app/apikeys
- [ ] Edité .env y pegué mi API key
- [ ] Ejecuté `npm install`
- [ ] Estoy en la carpeta correcta: `~/research-agent-opensource`

---

## 🆘 SI ALGO FALLA

### Error: "GOOGLE_GEMINI_API_KEY is undefined"
```bash
# Verifica que .env está configurado correctamente
cat .env | grep GOOGLE_GEMINI_API_KEY

# Debe mostrar algo como:
# GOOGLE_GEMINI_API_KEY=AIzaSyD_...
```

### Error: "Cannot find module '@google/generative-ai'"
```bash
# Reinstala dependencias
npm install
```

### Los reportes están vacíos
- Verifica que tu API key es correcta (sin espacios al inicio/final)
- Si el problema persiste, prueba creando una nueva key

---

## 🚀 SIGUIENTES PASOS (DESPUÉS)

Una vez que los agentes funcionen:

1. **Revisar reportes** - Lee qué oportunidades de contenido encontraron
2. **Seleccionar ideas** - Elige 1-2 artículos para escribir
3. **Escribir contenido** - Basado en los descubrimientos de los agentes
4. **Publicar** - En tu web y ve el tráfico venir

**Automatización (Opcional):**
- Configurar cron para que ejecute automáticamente cada domingo y miércoles a las 22:00
- O dejar configurado en GitHub Actions

---

## 💡 RECORDATORIO

- **API Key:** Guarda en lugar seguro, NO la compartas en internet
- **Costo:** TOTALMENTE GRATIS (Google regala 60 requests/min)
- **Actualización:** Los agentes buscan info REAL y actualizada

---

**¡Bienvenido a tu sistema de research automation! 🚀**

Cualquier duda cuando llegues a casa, pregunta.
