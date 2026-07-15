const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

/**
 * Autenticarse con Google Drive usando Service Account
 */
async function authenticateGoogleDrive() {
  try {
    const serviceAccountKey = JSON.parse(
      process.env.GOOGLE_SERVICE_ACCOUNT_KEY
    );

    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccountKey,
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    return google.drive({ version: 'v3', auth });
  } catch (error) {
    console.error('Error autenticando Google Drive:', error.message);
    throw error;
  }
}

/**
 * Crear carpeta en Google Drive si no existe
 */
async function ensureFolderExists(drive, parentFolderId, folderName) {
  try {
    const response = await drive.files.list({
      q: `'${parentFolderId}' in parents and name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      spaces: 'drive',
      fields: 'files(id, name)',
    });

    if (response.data.files.length > 0) {
      return response.data.files[0].id;
    }

    // Crear carpeta si no existe
    const createResponse = await drive.files.create({
      resource: {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [parentFolderId],
      },
      fields: 'id',
    });

    return createResponse.data.id;
  } catch (error) {
    console.error('Error en ensureFolderExists:', error.message);
    throw error;
  }
}

/**
 * Subir documento a Google Drive
 */
async function uploadDocumentToDrive(
  drive,
  folderId,
  fileName,
  content,
  mimeType = 'text/markdown'
) {
  try {
    const response = await drive.files.create({
      resource: {
        name: fileName,
        mimeType: mimeType,
        parents: [folderId],
      },
      media: {
        mimeType: mimeType,
        body: content,
      },
      fields: 'id, webViewLink',
    });

    console.log(`✓ Documento subido: ${fileName}`);
    console.log(`  URL: ${response.data.webViewLink}`);

    return response.data;
  } catch (error) {
    console.error('Error subiendo documento:', error.message);
    throw error;
  }
}

/**
 * Generar nombre de archivo con fecha
 */
function generateFileName(agentName) {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}-Research.md`;
}

module.exports = {
  authenticateGoogleDrive,
  ensureFolderExists,
  uploadDocumentToDrive,
  generateFileName,
};
