import { createSlice } from "@reduxjs/toolkit";

const emailSlice = createSlice({
  name: "email",
  initialState: "",
  reducers: {
    addEmail: (state, action) => {
      return action.payload;
    },
  },
});
export const { addEmail } = emailSlice.actions;
export default emailSlice.reducer;
