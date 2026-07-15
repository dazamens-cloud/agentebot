# 🚀 Setup Guide - Research Agents

Guía completa para configurar y ejecutar los 4 agentes automáticamente.

---

## PASO 1: Preparar Google Drive

### 1.1 Crear carpeta madre en Drive

1. Ve a Google Drive
2. Haz clic derecho → "Nueva carpeta"
3. Nombra: `Research-Reports`
4. **IMPORTANTE:** Copia el ID de la carpeta de la URL
   - URL: `https://drive.google.com/drive/folders/1ABC123XYZ`
   - Tu ID: `1ABC123XYZ` ← **GUARDA ESTO**

### 1.2 Crear Google Service Account (para autenticación automática)

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Crea un nuevo proyecto o usa uno existente
3. Navega a: **IAM & Admin → Service Accounts**
4. Haz clic en: **"Create Service Account"**
5. Nombre: `research-agents-bot`
6. Descripción: `Bot para subir reportes de research automáticamente`
7. Haz clic en **"Create and Continue"**

**En "Grant this service account access to project":**
8. Role: **Editor** (o más específico: Google Drive API Editor)
9. Haz clic en **"Continue"**

**En "Grant users access to this service account":**
10. Deja en blanco, haz clic en **"Done"**

### 1.3 Crear JSON key para la Service Account

1. Vuelve a Service Accounts
2. Haz clic en el email de `research-agents-bot`
3. Ve a la pestaña **"Keys"**
4. Haz clic en **"Add Key" → "Create new key"**
5. Tipo: **JSON**
6. Haz clic en **"Create"**
   - Se descargará un archivo JSON automáticamente
   - **GUARDA ESTE ARCHIVO** (es tu credencial)

### 1.4 Compartir carpeta de Drive con la Service Account

1. Abre el JSON descargado
2. Busca el campo: `"client_email"` (algo como `research-agents-bot@xxxxx.iam.gserviceaccount.com`)
3. Ve a tu carpeta `Research-Reports` en Google Drive
4. Haz clic derecho → **"Compartir"**
5. Pega el email de la service account
6. Dale permisos: **Editor**
7. Haz clic en **"Compartir"** (sin notificación)

---

## PASO 2: Crear repositorio en GitHub

### 2.1 Crear repo

1. Ve a [GitHub.com](https://github.com)
2. Haz clic en el **"+"** arriba a la derecha
3. **"New repository"**
4. Nombre: `research-agent-opensource`
5. Descripción: `Agentes automáticos para monitorear open-source tools`
6. Privado o Público (como prefieras)
7. **NO** marques "Add README" (ya tenemos uno)
8. Haz clic en **"Create repository"**

### 2.2 Clonar y subir el código

En tu terminal:

```bash
cd /home/claude/research-agent-opensource

# Configurar remoto
git remote add origin https://github.com/TU-USUARIO/research-agent-opensource.git
git branch -M main
git add .
git commit -m "Initial commit: 4 research agents"
git push -u origin main
```

Reemplaza `TU-USUARIO` con tu username de GitHub.

---

## PASO 3: Configurar GitHub Secrets

Los secretos protegen tus credenciales sin mostrarlas en el código.

### 3.1 Ir a Settings del repo

1. En GitHub, abre tu repo
2. Ve a **Settings → Secrets and variables → Actions**
3. Haz clic en **"New repository secret"**

### 3.2 Agregar ANTHROPIC_API_KEY

1. **Name:** `ANTHROPIC_API_KEY`
2. **Value:** Tu API key de Anthropic (comienza con `sk-ant-`)
   - Obtenerla de: [Anthropic Console](https://console.anthropic.com/account/keys)
3. Haz clic en **"Add secret"**

### 3.3 Agregar GOOGLE_DRIVE_FOLDER_ID

1. **Name:** `GOOGLE_DRIVE_FOLDER_ID`
2. **Value:** El ID de carpeta que copiaste en PASO 1.1 (ej: `1ABC123XYZ`)
3. Haz clic en **"Add secret"**

### 3.4 Agregar GOOGLE_SERVICE_ACCOUNT_KEY

1. **Name:** `GOOGLE_SERVICE_ACCOUNT_KEY`
2. **Value:** Abre el JSON que descargaste en PASO 1.3
   - Copia TODO el contenido del JSON (desde `{` hasta `}`)
   - Pégalo en el Value
3. Haz clic en **"Add secret"**

**Resultado esperado:** 3 secrets configurados ✓

---

## PASO 4: Verificar GitHub Actions

### 4.1 Ver workflow configurado

1. En GitHub, ve a **Actions**
2. Deberías ver "Research Agents - Scheduled Execution"
3. Haz clic en **"Run workflow"** → **"Run workflow"** (para testear)
4. Espera ~5 minutos

### 4.2 Ver ejecución

1. La acción debería mostrarse como "in progress"
2. Cuando termine, verás ✓ o ✗

### 4.3 Verificar resultados en Google Drive

- Ve a `Research-Reports` en Google Drive
- Deberías ver 4 carpetas nuevas (1-OpenSource-Programs, 2-AI-OpenSource, etc.)
- Dentro de cada una, documentos `.md` con la fecha

---

## PASO 5: Programación Automática

La ejecución AUTOMÁTICA está ya configurada en `.github/workflows/research-schedule.yml`:

- **Domingos a las 22:00 UTC** (9pm UTC = 11pm CEST = 8pm UTC-3)
- **Miércoles a las 22:00 UTC**

### Ajustar horario si lo necesitas:

1. Abre `.github/workflows/research-schedule.yml`
2. Busca la línea:
   ```
   - cron: '0 22 * * 0'  # Sunday 22:00 UTC
   ```
3. Cambia los números según tu zona horaria:
   - Formato: `'MINUTO HORA DÍA MES DÍA-SEMANA'`
   - Ejemplos:
     - `0 22 * * 0` = Domingo 22:00
     - `0 22 * * 3` = Miércoles 22:00
     - `0 20 * * 1` = Lunes 20:00
     - Conversor: [crontab.guru](https://crontab.guru)
4. Commit y push

---

## PASO 6: Ejecución Manual (Testing)

Para probar un agente sin esperar:

### Local

```bash
# Instalar dependencias
npm install

# Crear .env con tus credenciales
cp .env.example .env
# Edita .env y agrega tus valores

# Ejecutar agente individual
node agents/agent1-opensource.js
node agents/agent2-ai-opensource.js
node agents/agent3-chinese-alternatives.js
node agents/agent4-updates-changes.js

# O todos a la vez
npm run all
```

### GitHub (sin local)

1. Ve a **Actions**
2. Haz clic en "Research Agents - Scheduled Execution"
3. Haz clic en **"Run workflow"** → **"Run workflow"**
4. Ver logs en tiempo real

---

## TROUBLESHOOTING

### Error: "GOOGLE_SERVICE_ACCOUNT_KEY is not defined"

- [ ] Verificar que el JSON está correctamente copiado en el secret
- [ ] Sin espacios al principio o final
- [ ] El JSON debe ser de una sola línea (sin saltos de línea)

### Error: "ANTHROPIC_API_KEY is invalid"

- [ ] Verificar que tu API key es correcta
- [ ] Si es nueva, esperar ~1 minuto a que se active
- [ ] Regenerar si es necesario

### No aparecen documentos en Drive

- [ ] Verificar que la Service Account tiene permisos en la carpeta
- [ ] Revisar logs de la acción en GitHub Actions
- [ ] Probar manualmente: `node agents/agent1-opensource.js`

### Los reportes están en blanco

- [ ] Verificar logs en GitHub Actions
- [ ] Puede ser que los agentes no encontraron resultados (búsquedas muy específicas)
- [ ] Aumentar verbosidad en código agregando más `console.log()`

---

## ✅ CHECKLIST FINAL

Antes de decir que está listo:

- [ ] Carpeta `Research-Reports` creada en Drive
- [ ] Service Account creado con JSON descargado
- [ ] JSON compartido con la carpeta de Drive
- [ ] Repositorio creado en GitHub
- [ ] Código pusheado a GitHub
- [ ] 3 secrets configurados en GitHub
- [ ] Primera ejecución manual passou ✓
- [ ] Documentos aparecen en Drive
- [ ] Workflow scheduled configurado para Domingo 22:00 + Miércoles 22:00

Si todo esto ✓, **¡LISTO!** Los agentes se ejecutarán automáticamente cada semana.

---

## 🆘 Contacto / Support

Si algo no funciona:

1. Revisar logs completos en GitHub Actions
2. Ejecutar agentes localmente para debugging
3. Verificar credenciales (la mayoría de errores son permisos)
4. Crear un issue en el repo con el error

---

*Generated: 2026-07-12 | Research Agents v1.0*
