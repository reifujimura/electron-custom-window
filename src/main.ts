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
    width: 1152,
    height: 864,
    titleBarStyle: "hidden",
    titleBarOverlay: {
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
  mainWindow.on("maximize", () => {
    logger.info("maximize");
    console.log("maximize");
    mainWindow?.webContents.send("maximize");
  });
  mainWindow.on("unmaximize", () => {
    logger.info("unmaximize");
    mainWindow?.webContents.send("unmaximize");
  });
  mainWindow.webContents.ipc.handle("maximized", () => {
    logger.info("ipc.handle(maximized)");
    const maximized = mainWindow?.isMaximized();
    logger.info(`maximized: ${maximized}`);
    return mainWindow?.isMaximized();
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
