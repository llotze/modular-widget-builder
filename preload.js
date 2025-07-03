const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  minimize: () => ipcRenderer.send("window-minimize"),
  maximize: () => ipcRenderer.send("window-maximize"),
  close: () => ipcRenderer.send("window-close"),
  openDevTools: () => ipcRenderer.send("window-open-devtools"),
  selectWidgetsDir: () => ipcRenderer.invoke("select-widgets-dir"),
  readWidgets: (dirPath) => ipcRenderer.invoke("read-widgets", dirPath),
  saveWidget: (dirPath, widget) => ipcRenderer.invoke("save-widget", dirPath, widget),
});