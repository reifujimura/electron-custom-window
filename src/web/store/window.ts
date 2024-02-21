import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  maximized: false,
};

const windowSlice = createSlice({
  name: "window",
  initialState,
  reducers: {
    setMaximized: (state, action) => {
      state.maximized = action.payload;
    },
  },
});

export const { setMaximized } = windowSlice.actions;

export default windowSlice.reducer;
