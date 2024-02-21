import { contextBridge, ipcRenderer } from "electron";
import { AppContext } from "./types";

const context: AppContext = {
  info: (message: string) => {
    ipcRenderer.invoke("log", { level: "info", message });
  },
  platform: () => ipcRenderer.invoke("platform"),
};

contextBridge.exposeInMainWorld("app", context);

contextBridge.exposeInMainWorld("mainWindow", {
  handleMaximize: (callback: (maximized: boolean) => void) => {
    ipcRenderer.on("maximize", () => callback(true));
    ipcRenderer.on("unmaximize", () => callback(false));
  },
  maximized: () => ipcRenderer.invoke("maximized"),
});
