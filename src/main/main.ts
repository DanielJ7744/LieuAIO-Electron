import { app, ipcMain as ipc, clipboard } from 'electron';
import * as path from 'path';
import * as url from 'url';
import CryptoJS from 'crypto-js';
import _ from 'lodash';
import currentProcesses from 'current-processes';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import windowManager from './helpers/main-window';
import apiManager from './managers/api-manager';
import logsManager from './managers/logs-manager';

const secret_key = 'lieuAIO@g22024';

const userDataPath = app.getPath('userData');
const tasksFile = path.join(userDataPath, 'tasks.json');
const proxiesFile = path.join(userDataPath, 'proxies.json');
const profilesFile = path.join(userDataPath, 'profiles.json');
const monitorsFile = path.join(userDataPath, 'monitors.json');

if (process.env.NODE_ENV === undefined) process.env.NODE_ENV = 'production';
const THREE_MINUTES = 180000;
process.setMaxListeners(0);

function scanProcesses(): void {
  currentProcesses.get((err, processes) => {
    const sorted = _.sortBy(processes, 'cpu');
    for (let i = 0; i < sorted.length; i += 1) {
      if (sorted[i].name.toLowerCase() === 'charles' || sorted[i].name.toLowerCase() === 'wireshark' || sorted[i].name.toLowerCase() === 'fiddler') {
        console.log('fuck out of here');
        app.quit();
      }
    }
  });
}
function checkProcesses(starting = false): void {
  if (process.env.NODE_ENV === 'development') return;
  try {
    // If the bot is starting we check every 3 minutes
    if (starting) {
      setInterval(() => {
        scanProcesses();
      }, THREE_MINUTES);
      // If it's not starting then we check whenever we make an api call, start task, etc
    } else {
      scanProcesses();
    }
  } catch (error) {
    console.log(error);
  }
}
const shouldNotQuit = app.requestSingleInstanceLock();
if (!shouldNotQuit) {
  app.quit();
}
app.on('ready', async () => {
  /*
   * Initialize profiles, settings, and proxies
   */
  logsManager.initLogs();

  checkProcesses(true);
  await windowManager.createAuthWindow();
});
// Necessary for captcha auto click
app.commandLine.appendSwitch('disable-site-isolation-trials');

// Proxy Login Event
app.on('activate', () => !windowManager && windowManager.createMainWindow());
app.on('window-all-closed', () => {
  app.exit();
  process.exit(0);
});
app.on('before-quit', (event) => {
  event.preventDefault();
  ipc.emit('quit');
});
ipc.on('show-me', () => windowManager.showMain());
ipc.on('quit', () => {
  app.exit();
  process.exit(0);
});
ipc.on('minimize', () => windowManager.hideWindow());
ipc.on('maxamize', () => windowManager.maximize());

ipc.on('login-key', async (e, key) => {
  checkProcesses();
  if (await apiManager.activateKey(key)) {
    await windowManager.closeAuthWindow();
    await windowManager.createMainWindow();
  } else {
    windowManager.sendStatusToLogin('Key invalid or needs to be deactivated.');
  }
});

/**
 * SETTINGS EVENTS
 */
ipc.on('send-logs', async (e, logId) => {
  clipboard.writeText(logId.toString());
  logsManager.sendLogs(logId);
});

/**
 * Tasks EVENTS
 */
let tasks: [];
ipc.on('get-tasks', () => {
  const data = [
    {
      id: `TG-${uuidv4()}`,
      name: 'Eastbay US',
      uniqueID: uuidv4(),
      taskArr: [
        {
          id: `Tid-${uuidv4()}`,
          site: 'Eastbay US',
          product: 'Nike Sb Dunk Low Brazil',
          proxy: '7665',
          profile: 'Profile 1',
          size: 'US8',
          status: 'Successful Purchase',
          uniqueID: uuidv4(),
        },
      ],
    },
  ];
  const ciphertext = encryptAES(data);
  if (!fs.existsSync(tasksFile)) {
    fs.writeFileSync(tasksFile, ciphertext);
  }
  tasks = fs.readFileSync(tasksFile, 'utf8');
  const decryptedData = decryptAES(tasks);
  windowManager.sendTasks('sendTasks', decryptedData);
});
console.log(tasksFile);
ipc.on('create-task-group', (e, data) => {
  fs.writeFileSync(tasksFile, encryptAES(data));
});
ipc.on('create-group-task', (e, data, taskGroupId) => {
  tasks = decryptAES(fs.readFileSync(tasksFile, 'utf8'));
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === taskGroupId) {
      tasks[i].taskArr = data;
    }
  }
  fs.writeFileSync(tasksFile, encryptAES(tasks));
  console.log(taskGroupId);
});
ipc.on('delete-group-task', (e, taskGroupId, data) => {
  tasks = decryptAES(fs.readFileSync(tasksFile, 'utf8'));
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === taskGroupId) {
      tasks[i].taskArr = data;
    }
  }
  fs.writeFileSync(tasksFile, encryptAES(tasks));
});
ipc.on('deleteGroup', (e, data) => {
  tasks = decryptAES(fs.readFileSync(tasksFile, 'utf8'));
  const aftertasks = tasks.filter((t) => t.id !== data.id);
  fs.writeFileSync(tasksFile, encryptAES(aftertasks));
});

ipc.on('deleteAllTasks', (e, groupId) => {
  tasks = decryptAES(fs.readFileSync(tasksFile, 'utf8'));
  const deleteAllTasks = tasks.filter((t) => t.id !== groupId);
  fs.writeFileSync(tasksFile, encryptAES(deleteAllTasks));
});

/**
 * Monitor EVENTS
 */

let monitors: [];
ipc.on('get-monitor', () => {
  const data = [
    {
      id: `TG-${uuidv4()}`,
      name: 'Eastbay US',
      uniqueID: uuidv4(),
      taskArr: [
        {
          id: `Tid-${uuidv4()}`,
          site: 'Eastbay US',
          product: 'Nike Sb Dunk Low Brazil',
          proxy: '',
          startGroup: 'Group 1',
          status: 'Monitoring Product',
          uniqueID: uuidv4(),
          logo: '',
        },
      ],
    },
  ];
  const ciphertext = encryptAES(data);
  if (!fs.existsSync(monitorsFile)) {
    fs.writeFileSync(monitorsFile, ciphertext);
  }
  monitors = fs.readFileSync(monitorsFile, 'utf8');
  const decryptedData = decryptAES(monitors);
  windowManager.sendMonitors('sendMonitors', decryptedData);
});
ipc.on('create-monitor-group', (e, data) => {
  fs.writeFileSync(monitorsFile, encryptAES(data));
});
ipc.on('create-group-monitor', (e, data, taskGroupId) => {
  monitors = decryptAES(fs.readFileSync(monitorsFile, 'utf8'));
  for (let i = 0; i < monitors.length; i++) {
    if (monitors[i].id === taskGroupId) {
      monitors[i].taskArr = data;
    }
  }
  fs.writeFileSync(monitorsFile, encryptAES(monitors));
});
ipc.on('delete-group-monitor', (e, groupId, data) => {
  monitors = decryptAES(fs.readFileSync(monitorsFile, 'utf8'));
  for (let i = 0; i < monitors.length; i++) {
    if (monitors[i].id === groupId) {
      monitors[i].taskArr = data;
    }
  }
  fs.writeFileSync(monitorsFile, encryptAES(monitors));
});
ipc.on('deleteMonitorGroup', (e, data) => {
  monitors = decryptAES(fs.readFileSync(monitorsFile, 'utf8'));
  const aftertasks = monitors.filter((t) => t.id !== data.id);
  fs.writeFileSync(monitorsFile, encryptAES(aftertasks));
});
ipc.on('deleteAllMonitor', (e, groupId) => {
  monitors = decryptAES(fs.readFileSync(monitorsFile, 'utf8'));
  const deleteAllMonitors = monitors.filter((t) => t.id !== groupId);
  fs.writeFileSync(monitorsFile, encryptAES(deleteAllMonitors));
});

/**
 * Profile EVENTS
 */
let profiles: [];
ipc.on('get-profile', () => {
  const data = [
    {
      id: `TG-${uuidv4()}`,
      name: 'Profile Group 1',
      uniqueID: uuidv4(),
      taskArr: [
        {
          id: `Tid-${uuidv4()}`,
          name: 'Profile Name 1',
          phone: 'Phone Number',
          key: '1234',
          dueDate: '12/23',
          cardholder: 'Max Mustermann',
          email: 'email@gmail.com',
          fullName: 'First Last Name',
          uniqueID: uuidv4(),
        },
      ],
    },
  ];
  const ciphertext = encryptAES(data);
  if (!fs.existsSync(profilesFile)) {
    fs.writeFileSync(profilesFile, ciphertext);
  }
  profiles = fs.readFileSync(profilesFile, 'utf8');
  const decryptedData = decryptAES(profiles);
  windowManager.sendProfiles('sendProfiles', decryptedData);
});
ipc.on('create-profile-group', (e, data) => {
  fs.writeFileSync(profilesFile, encryptAES(data));
});

ipc.on('create-profile-task', (e, data, profileGroupId) => {
  profiles = decryptAES(fs.readFileSync(profilesFile, 'utf8'));
  for (let i = 0; i < profiles.length; i++) {
    if (profiles[i].id === profileGroupId) {
      profiles[i].taskArr = data;
    }
  }
  fs.writeFileSync(profilesFile, encryptAES(profiles));
});

ipc.on('delete-group-profile', (event, id, data) => {
  profiles = decryptAES(fs.readFileSync(profilesFile, 'utf8'));
  for (let i = 0; i < profiles.length; i++) {
    if (profiles[i].id === id) {
      profiles[i].taskArr = data;
    }
  }
  fs.writeFileSync(profilesFile, encryptAES(profiles));
});

ipc.on('deleteProfileGroup', (e, data) => {
  profiles = decryptAES(fs.readFileSync(profilesFile, 'utf8'));
  const aftertasks = profiles.filter((t) => t.id !== data.id);
  fs.writeFileSync(profilesFile, encryptAES(aftertasks));
});

ipc.on('deleteAllProfiles', (e, groupId) => {
  profiles = decryptAES(fs.readFileSync(profilesFile, 'utf8'));
  const deleteAllProfiles = profiles.filter((t) => t.id !== groupId);
  fs.writeFileSync(profilesFile, encryptAES(deleteAllProfiles));
});
/**
 * Proxy EVENTS
 */

let proxies: [];
ipc.on('get-proxies', () => {
  const data = [
    {
      id: `TG-${uuidv4()}`,
      name: 'Proxy Group 1',
      uniqueID: uuidv4(),
      taskArr: [
        {
          id: `Tid-${uuidv4()}`,
          Proxy: 'IP:PORT:USERNAME:PASSWORD',
          Speed: '33ms',
          uniqueID: uuidv4(),
        },
      ],
    },
  ];
  const ciphertext = encryptAES(data);
  if (!fs.existsSync(proxiesFile)) {
    fs.writeFileSync(proxiesFile, ciphertext);
  }
  proxies = fs.readFileSync(proxiesFile, 'utf8');
  const decryptedData = decryptAES(proxies);
  windowManager.sendProxies('sendProxies', decryptedData);
});

ipc.on('create-proxy-group', (e, data) => {
  fs.writeFileSync(proxiesFile, encryptAES(data));
});

ipc.on('create-group-proxy', (e, data, taskGroupId) => {
  proxies = decryptAES(fs.readFileSync(proxiesFile, 'utf8'));
  for (let i = 0; i < proxies.length; i++) {
    if (proxies[i].id === taskGroupId) {
      proxies[i].taskArr = data;
    }
  }
  fs.writeFileSync(proxiesFile, encryptAES(proxies));
});
ipc.on('delete-group-proxy', (event, groupId, data) => {
  proxies = decryptAES(fs.readFileSync(proxiesFile, 'utf8'));
  for (let i = 0; i < proxies.length; i++) {
    if (proxies[i].id === groupId) {
      proxies[i].taskArr = data;
    }
  }
  fs.writeFileSync(proxiesFile, encryptAES(proxies));
});

ipc.on('deleteProxyGroup', (e, data) => {
  proxies = decryptAES(fs.readFileSync(proxiesFile, 'utf8'));
  const aftertasks = proxies.filter((t) => t.id !== data.id);
  fs.writeFileSync(proxiesFile, encryptAES(aftertasks));
});

ipc.on('deleteAllMonitor', (e, groupId) => {
  proxies = decryptAES(fs.readFileSync(proxiesFile, 'utf8'));
  const deleteAllProxies = proxies.filter((t) => t.id !== groupId);
  fs.writeFileSync(proxiesFile, encryptAES(deleteAllProxies));
});

function encryptAES(data): void {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secret_key).toString();
}
function decryptAES(data): void {
  const bytes = CryptoJS.AES.decrypt(data, secret_key);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
