# Research Agent OpenSource - Agentes de Monitoreo

Automatización para monitorear **4 tipos diferentes** de herramientas y cambios open-source para creadores de contenido.

**🆓 Totalmente GRATIS** - Usa Google Gemini API (sin costo)

---

## 📋 AGENTES DISPONIBLES

### 1️⃣ **Agent 1: Open-Source Programs**
Busca nuevas herramientas open-source en GitHub trending
- Keywords: video editor, design tool, GIMP alternative, Audacity alternative, free DAW, streaming, 3D, vector design

### 2️⃣ **Agent 2: AI Open-Source**
Busca IAs abiertas útiles para creadores
- Keywords: AI video, stable diffusion alternative, upscaling, AI audio, text-to-speech, motion graphics AI, color grading

### 3️⃣ **Agent 3: Chinese Alternatives**
Busca software chino emergente en Gitee y Product Hunt Asia
- Keywords: gitee video editor, chinese design tool, streaming software, creative suite, alternatives, GIMP chino, DaVinci chino

### 4️⃣ **Agent 4: Software Updates & Changes**
Monitorea cambios en herramientas conocidas (pricing, features, crises)
- Keywords: Adobe price, DaVinci features, discontinued, lawsuit, shutdown, pricing change, fork

---

## 🔄 EJECUCIÓN

**Frecuencia:** Domingos 22:00 + Miércoles 22:00 (UTC)

**Output:** 
- Documentos en Google Drive
- Estructura: `Research-Reports/[1-4-Category]/[YYYY-MM-DD]-Research.md`
- Formato: Tabla ordenada por prioridad

---

## 🚀 SETUP LOCAL

### 1. Clonar repo
```bash
git clone https://github.com/dazamens/research-agent-opensource.git
cd research-agent-opensource
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
```bash
cp .env.example .env
```

Editar `.env` con:
```
ANTHROPIC_API_KEY=sk-...
GOOGLE_DRIVE_FOLDER_ID=1ABC...
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account"...}
```

### 4. Ejecutar agente individual
```bash
node agents/agent1.js
node agents/agent2.js
node agents/agent3.js
node agents/agent4.js
```

---

## 🔐 SETUP GITHUB ACTIONS (Automático)

Los agentes se ejecutan automáticamente cada domingo y miércoles a las 22:00 UTC.

**Para que funcione:**
1. Subir este repo a GitHub (en tu cuenta)
2. Agregar secrets en Settings → Secrets:
   - `ANTHROPIC_API_KEY`
   - `GOOGLE_DRIVE_FOLDER_ID`
   - `GOOGLE_SERVICE_ACCOUNT_KEY` (JSON completo)

3. GitHub Actions se ejecutará automáticamente según `.github/workflows/research-schedule.yml`

---

## 📊 FORMATO DE SALIDA

Cada agente genera una tabla con:

| PRIORIDAD | TIPO | NOMBRE | DESCRIPCIÓN | STARS/TRENDING | ÁNGULO ARTÍCULO | BÚSQUEDAS EST. |
|-----------|------|--------|-------------|-----------------|-----------------|----------------|
| Alta | Soft | Tool Name | Description | 500 stars ↑ | "Title" | 2,000/mes |

Ordenado por: **Prioridad → Trending → Potencial de búsqueda**

---

## 📁 ESTRUCTURA CARPETA DRIVE

```
Research-Reports/
├── 1-OpenSource-Programs/
│   ├── 2026-07-06-Research.md
│   ├── 2026-07-09-Research.md
│   └── ...
├── 2-AI-OpenSource/
│   ├── 2026-07-06-Research.md
│   └── ...
├── 3-Chinese-Alternatives/
│   └── ...
└── 4-Software-Updates-Changes/
    └── ...
```

---

## 🛠 TECH STACK

- **Node.js** - Runtime
- **Anthropic Claude API** - Búsqueda y análisis
- **Google Drive API** - Almacenamiento de reportes
- **GitHub Actions** - Scheduler automático

---

## 📝 NOTAS

- Los agentes NO publican nada automáticamente
- Tú revisas los reportes y decides qué artículos escribir
- Cada reporte tarda ~2-3 min en generarse
- Costo: ~$0.05-0.10 por ejecución (API calls)

---

## 👨‍💻 AUTOR

Generado para Andres | Lanzarote, Canary Islands
