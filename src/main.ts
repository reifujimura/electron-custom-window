import path from "node:path";
import { BrowserWindow, app, ipcMain } from "electron";
import log4js from "log4js";

let mainWindow: BrowserWindow | null = null;

log4js.configure({
  appenders: {
    console: { type: "console" },
  },
  categories: {
    default: { appenders: ["console"], level: "info" },
    renderer: { appenders: ["console"], level: "info" },
  },
});

const logger = log4js.getLogger();
const rendererLogger = log4js.getLogger("renderer");
logger.level = process.env.NODE_ENV === "production" ? "info" : "debug";

app.whenReady().then(() => {
  ipcMain.handle("log", (_, data) => {
    rendererLogger.log(data.level, data.message);
  });
  mainWindow = new BrowserWindow({
    minWidth: 640,
    width: 1152,
    minHeight: 40,
    height: 864,
    titleBarStyle: "hidden",
    titleBarOverlay:
      process.platform === "win32"
        ? {
            height: 40,
            color: "#00000000",
            symbolColor: "#dee2e6",
          }
        : {
            height: 40,
          },
    trafficLightPosition: {
      x: 20,
      y: 12,
    },
    webPreferences: {
      preload:
        process.env.NODE_ENV === "production"
          ? path.join(__dirname, "static", "preload.js")
          : path.join(__dirname, "preload.js"),
    },
  });
  const maximizeEvent =
    process.platform === "darwin" ? "enter-full-screen" : "maximize";
  mainWindow.on(maximizeEvent as any, () => {
    mainWindow?.webContents.send("maximize");
  });
  const unmaximizeEvent =
    process.platform === "darwin" ? "leave-full-screen" : "unmaximize";
  mainWindow.on(unmaximizeEvent as any, () => {
    mainWindow?.webContents.send("unmaximize");
  });

  mainWindow.webContents.ipc.handle("maximized", () => {
    logger.info("ipc.handle(maximized)");
    const maximized = mainWindow?.isMaximized();
    logger.info(`maximized: ${maximized}`);
    return mainWindow?.isMaximized();
  });
  ipcMain.handle("platform", () => {
    return process.platform;
  });

  mainWindow.setMenu(null);
  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadFile(
    process.env.NODE_ENV === "production"
      ? "dist/static/index.html"
      : "dist/index.html"
  );
  if (process.env.NODE_ENV === "development") {
    mainWindow.webContents.openDevTools({
      mode: "detach",
    });
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
