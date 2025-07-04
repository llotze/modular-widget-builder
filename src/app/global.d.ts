// filepath: c:\Users\lucas\Desktop\Projects\modular-widget-builder\src\global.d.ts
interface ElectronAPI {
  minimize?: () => void;
  maximize?: () => void;
  close?: () => void;
  openDevTools?: () => void;
  selectWidgetsDir?: () => Promise<string>;
  readWidgets?: (dirPath: string) => Promise<any[]>;
  saveWidget?: (dirPath: string, widget: any) => Promise<boolean>;
}

interface Window {
  electronAPI?: ElectronAPI;
}