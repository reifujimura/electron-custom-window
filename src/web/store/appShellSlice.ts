import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fetchInitializeData = () =>
  new Promise((resolve) => setTimeout(resolve, 5));

export const initialize = createAsyncThunk("appShell/initialize", async () => {
  await fetchInitializeData();
  return true;
});

const initialState = {
  status: 1 as 1 | 2 | 3,
  navbarOpen: false,
  verticalSplitSizes: ["50%", "50%"] as (string | number)[],
  horizontalSplitSizes: ["50%", "50%"] as (string | number)[],
};

const appShellSlice = createSlice({
  name: "appShell",
  initialState,
  reducers: {
    toggleNavbar: (state) => {
      state.navbarOpen = !state.navbarOpen;
      window.app.info(`Navbar is now ${state.navbarOpen ? "open" : "closed"}`);
    },
    setVerticalSplitSizes: (
      state,
      action: PayloadAction<(string | number)[]>
    ) => {
      state.verticalSplitSizes = action.payload;
    },
    setHorizontalSplitSizes: (
      state,
      action: PayloadAction<(string | number)[]>
    ) => {
      state.horizontalSplitSizes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initialize.pending, (state) => {
        state.status = 2;
      })
      .addCase(initialize.fulfilled, (state) => {
        state.status = 3;
      });
  },
});

export const { toggleNavbar, setHorizontalSplitSizes, setVerticalSplitSizes } =
  appShellSlice.actions;

export default appShellSlice.reducer;
