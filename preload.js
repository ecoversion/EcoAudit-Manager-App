// preload.js — expose un pont sûr et limité entre la page web (renderer) et le
// système d'exploitation (main.js). La page ne peut appeler QUE ces fonctions
// précises, rien d'autre — c'est ce qui garde l'application sécurisée.

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openPath: (filePath) => ipcRenderer.invoke('open-path', filePath),
  pickFiles: () => ipcRenderer.invoke('pick-files'),
  showInFolder: (filePath) => ipcRenderer.invoke('show-in-folder', filePath),
  readFileBase64: (filePath) => ipcRenderer.invoke('read-file-base64', filePath),
  loadDB: () => ipcRenderer.invoke('load-db'),
  saveDB: (jsonString) => ipcRenderer.invoke('save-db', jsonString),
  exportDbFile: (jsonString, suggestedName) => ipcRenderer.invoke('export-db-file', jsonString, suggestedName),
  importDbFile: () => ipcRenderer.invoke('import-db-file')
});
