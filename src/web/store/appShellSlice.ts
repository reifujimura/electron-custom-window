import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navbarOpen: false,
};

const appShellSlice = createSlice({
  name: "appShell",
  initialState,
  reducers: {
    toggleNavbar: (state) => {
      state.navbarOpen = !state.navbarOpen;
      window.app.info(`Navbar is now ${state.navbarOpen ? "open" : "closed"}`);
    },
  },
});

export const { toggleNavbar } = appShellSlice.actions;

export default appShellSlice.reducer;
