import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  maximized: false,
  platform: "unknown",
};

const windowSlice = createSlice({
  name: "window",
  initialState,
  reducers: {
    setMaximized: (state, action) => {
      state.maximized = action.payload;
    },
    setPlatform: (state, action) => {
      state.platform = action.payload;
    },
  },
});

export const { setMaximized, setPlatform } = windowSlice.actions;

export default windowSlice.reducer;
