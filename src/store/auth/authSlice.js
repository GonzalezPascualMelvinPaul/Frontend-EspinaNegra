import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "not-authenticated",
    email: "",
    displayName: "",
    token: "",
    user: {
      name: "",
      email: "",
    },
    errorMessage: "",
  },
  reducers: {
    login: (state, { payload }) => {
      state.status = "authenticated";
      state.token = payload.token;

      state.user = payload.user;
      state.email = payload.user.email;
    },
    logout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.email = "";
      state.displayName = "";
      state.token = "";
    },
    checkingCredentials: (state) => {
      state.status = "checking";
    },
    onError: (state, { payload }) => {
      state.errorMessage = payload;
      state.status = "error";
    },
  },
});

export const { login, logout, checkingCredentials, onError } =
  authSlice.actions;
