const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const http = require("http");
const fs = require("fs");
const path = require("path");
let win;

function waitForServer(url, cb) {
  const tryConnect = () => {
    http.get(url, () => cb()).on("error", () => setTimeout(tryConnect, 500));
  };
  tryConnect();
}

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false,
    webPreferences: {
      preload: require("path").join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  waitForServer("http://localhost:3000", () => {
    win.loadURL("http://localhost:3000");
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("window-minimize", () => win.minimize());
ipcMain.on("window-maximize", () => {
  if (win.isMaximized()) {
    win.unmaximize();
  } else {
    win.maximize();
  }
});
ipcMain.on("window-close", () => win.close());
ipcMain.on("window-open-devtools", () => win.webContents.openDevTools());

ipcMain.handle("select-widgets-dir", async () => {
  const result = await dialog.showOpenDialog(win, {
    properties: ["openDirectory"],
  });
  return result.filePaths[0];
});

ipcMain.handle("read-widgets", async (event, dirPath) => {
  try {
    const files = fs.readdirSync(dirPath);
    return files
      .filter((f) => f.endsWith(".json"))
      .map((f) => JSON.parse(fs.readFileSync(path.join(dirPath, f), "utf-8")));
  } catch (e) {
    return [];
  }
});

ipcMain.handle("save-widget", async (event, dirPath, widget) => {
  const filePath = path.join(dirPath, `${widget.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(widget, null, 2));
  return true;
});

