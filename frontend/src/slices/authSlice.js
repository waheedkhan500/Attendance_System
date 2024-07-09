import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCrediential: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
    removeCrediential: (state, action) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCrediential, removeCrediential } = authSlice.actions;
export default authSlice.reducer;
