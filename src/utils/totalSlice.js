import { createSlice } from "@reduxjs/toolkit";

const totalSlice = createSlice({
  name: "total",
  initialState: 0,
  reducers: {
    addtotal: (state, action) => {
      return state + action.payload;
    },
    substotal: (state, action) => {
      return state - action.payload;
    },
    clearTotal: (state) => {
      return 0;
    },
  },
});
export const { addtotal, substotal, clearTotal } = totalSlice.actions;
export default totalSlice.reducer;
