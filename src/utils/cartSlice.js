import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      let stateCopy = [...state];
      console.log(stateCopy, "eee");
      let flag = state.findIndex((item) => {
        console.log(item.id, action.payload.id, "iddd");
        return item.id == action.payload.id;
      });
      console.log(current(state));
      console.log(flag, "flag");
      if (flag == -1) {
        state.push({ item: action.payload, qty: 1 });
      } else {
        state[flag].qty += 1;
      }
    },
    removeProduct: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});
export const { addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
