declare global {
  interface Window {
    app: AppContext;
    mainWindow: MainWindow;
  }
}

export interface AppContext {
  info: (message: string) => void;
}

export interface MainWindow {
  handleMaximize: (callback: (maxmized: boolean) => void) => void;
  maximized: () => Promise<boolean>;
}
