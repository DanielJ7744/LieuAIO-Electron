import * as path from 'path';
import * as url from 'url';
import { BrowserWindow, ipcMain } from 'electron';

let mainWindow: BrowserWindow;
let authWindow: BrowserWindow;
const sentToasts = [];

async function createAuthWindow(): Promise<void> {
  authWindow = new BrowserWindow({
    width: 775,
    height: 425,
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, '/authwindow/preload.js'),
    },
    maxHeight: 425,
    maxWidth: 775,
    minHeight: 425,
    minWidth: 775,
  });

  authWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, '/authwindow/auth.html'),
      protocol: 'file',
      slashes: true,
    }),
  );
  // authWindow.webContents.openDevTools();
}

async function createMainWindow(): Promise<void> {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 770,
    minWidth: 1290,
    minHeight: 726,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      preload: path.resolve(__dirname, '..', 'renderer-preload.js'),
    },
    show: false,
  });
  mainWindow.webContents.openDevTools();
  mainWindow.setMenu(null);

  if (process.env.NODE_ENV !== 'production') {
    process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1';
    await mainWindow.loadURL('http://localhost:2003');
  } else {
    await mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, '..', '..', 'index.html'),
        protocol: 'file:',
        slashes: true,
      }),
    );
  }

  mainWindow.on('close', () => {
    ipcMain.emit('quit');
  });
}

function showMain(): void {
  mainWindow.show();
}

function closeMainWindow(): void {
  mainWindow.hide();
  ipcMain.emit('quit');
}

async function sendToast(toastData): Promise<void> {
  if (sentToasts.includes(toastData.name)) return;
  sentToasts.push(toastData.name);
  mainWindow.webContents.send('productMessage', toastData);
}

async function closeAuthWindow(): Promise<void> {
  authWindow.hide();
  authWindow = null;
}

function hideWindow(): void {
  mainWindow.minimize();
}

function maximize(): void {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
}
async function sendStatusToLogin(message): Promise<void> {
  authWindow.webContents.send('loginMessage', message);
}
async function sendTasks(message, data): Promise<void> {
  mainWindow.webContents.send('sendTasks', message, data);
}
async function sendMonitors(message, data): Promise<void> {
  mainWindow.webContents.send('sendMonitors', message, data);
}
async function sendProxies(message, data): Promise<void> {
  mainWindow.webContents.send('sendProxies', message, data);
}
async function sendProfiles(message, data): Promise<void> {
  mainWindow.webContents.send('sendProfiles', message, data);
}

export default {
  createMainWindow,
  hideWindow,
  maximize,
  createAuthWindow,
  closeAuthWindow,
  sendStatusToLogin,
  sendToast,
  showMain,
  closeMainWindow,
  sendTasks,
  sendMonitors,
  sendProxies,
  sendProfiles,
};
