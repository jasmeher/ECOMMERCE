import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isAdmin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload.token;
      state.isAdmin = action.payload.isAdmin;
    },
    setLogout: (state) => {
      state.token = null;
      state.isAdmin = false;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;
