import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("app", {
  info: (message: string) => {
    ipcRenderer.invoke("log", { level: "info", message });
  },
});

contextBridge.exposeInMainWorld("mainWindow", {
  handleMaximize: (callback: (maximized: boolean) => void) => {
    ipcRenderer.on("maximize", () => callback(true));
    ipcRenderer.on("unmaximize", () => callback(false));
  },
  maximized: () => ipcRenderer.invoke("maximized"),
});
