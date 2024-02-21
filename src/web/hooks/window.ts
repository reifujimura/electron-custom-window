import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from ".";
import { setMaximized, setPlatform } from "../store";

export const useWindowState = () => {
  const dispatch = useAppDispatch();
  const maximized = useAppSelector((state) => state.window.maximized);
  useEffect(() => {
    const handleMaximize = (maximized: boolean) => {
      dispatch(setMaximized(maximized));
    };
    window.mainWindow.handleMaximize(handleMaximize);
    window.mainWindow.maximized().then((maximized) => {
      window.app.info(`maximized: ${maximized}`);
      handleMaximize(maximized);
    });
  }, []);
  return { maximized };
};

export const useElectron = () => {
  const dispatch = useAppDispatch();
  const platform = useAppSelector((state) => state.window.platform);
  useEffect(() => {
    window.app.platform().then((platform) => {
      dispatch(setPlatform(platform));
    });
  }, []);
  return { platform };
};
