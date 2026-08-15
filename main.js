// main.js — EcoAudit_Manager App (version bureau / Electron)
// Ce processus a un accès réel au système d'exploitation — c'est lui qui permet
// d'ouvrir un fichier directement avec Word/Excel/PowerPoint (chose impossible
// depuis un simple site web dans un navigateur).

const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const fs = require('fs');

const DB_FILE = () => path.join(app.getPath('userData'), 'ecoaudit-db.json');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 650,
    icon: path.join(__dirname, 'build', 'icon.png'),
    backgroundColor: '#0b2c1f',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Affiche le fichier dans l'explorateur Windows / Finder (utile pour retrouver son emplacement réel)
ipcMain.handle('show-in-folder', async (event, filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    shell.showItemInFolder(filePath);
    return true;
  }
  return false;
});

// Lit un fichier lié et le renvoie en base64 — utilisé uniquement au moment de le
// partager en ligne (Supabase), puisque le destinataire, sur un autre ordinateur,
// a besoin du contenu réel et non du chemin (qui n'a de sens que sur votre poste).
ipcMain.handle('read-file-base64', async (event, filePath) => {
  try {
    if (!fs.existsSync(filePath)) return null;
    const data = fs.readFileSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const mimeMap = {
      '.pdf': 'application/pdf', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
      '.gif': 'image/gif', '.txt': 'text/plain', '.csv': 'text/csv', '.doc': 'application/msword',
      '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      '.xls': 'application/vnd.ms-excel', '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      '.ppt': 'application/vnd.ms-powerpoint', '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    };
    const mime = mimeMap[ext] || 'application/octet-stream';
    return `data:${mime};base64,${data.toString('base64')}`;
  } catch (e) {
    return null;
  }
});

// Enregistre un fichier reçu via la synchronisation en ligne comme un vrai fichier local,
// pour qu'il s'ouvre ensuite exactement comme un fichier lié (via le logiciel par défaut).
ipcMain.handle('save-received-file', async (event, { name, dataUrl }) => {
  try {
    const receivedDir = path.join(app.getPath('userData'), 'ReceivedFiles');
    if (!fs.existsSync(receivedDir)) fs.mkdirSync(receivedDir, { recursive: true });
    const base64 = dataUrl.split(',')[1] || '';
    const safeName = `${Date.now()}_${name}`.replace(/[\\/:*?"<>|]/g, '_');
    const filePath = path.join(receivedDir, safeName);
    fs.writeFileSync(filePath, Buffer.from(base64, 'base64'));
    return filePath;
  } catch (e) {
    return null;
  }
});

// --- Ponts IPC utilisés par l'application (voir preload.js) ---

// Ouvre un fichier avec le logiciel par défaut de l'ordinateur (Word, Excel, Acrobat, visionneuse d'image…)
ipcMain.handle('open-path', async (event, filePath) => {
