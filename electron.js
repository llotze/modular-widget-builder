const { app, BrowserWindow } = require('electron');
const http = require('http');

function waitForServer(url, cb) {
  const tryConnect = () => {
    http.get(url, () => cb()).on('error', () => setTimeout(tryConnect, 500));
  };
  tryConnect();
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  waitForServer('http://localhost:3000', () => {
    win.loadURL('http://localhost:3000');
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});