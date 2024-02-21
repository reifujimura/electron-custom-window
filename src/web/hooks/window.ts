import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from ".";
import { setMaximized } from "../store";

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
