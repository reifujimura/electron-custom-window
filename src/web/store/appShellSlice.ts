import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navbarOpen: false,
  verticalSplitSizes: ["50%", "50%"],
  horizontalSplitSizes: ["50%", "50%"],
};

const appShellSlice = createSlice({
  name: "appShell",
  initialState,
  reducers: {
    toggleNavbar: (state) => {
      state.navbarOpen = !state.navbarOpen;
      window.app.info(`Navbar is now ${state.navbarOpen ? "open" : "closed"}`);
    },
    setVerticalSplitSizes: (state, action) => {
      state.verticalSplitSizes = action.payload;
    },
    setHorizontalSplitSizes: (state, action) => {
      state.horizontalSplitSizes = action.payload;
    },
  },
});

export const { toggleNavbar, setHorizontalSplitSizes, setVerticalSplitSizes } =
  appShellSlice.actions;

export default appShellSlice.reducer;
