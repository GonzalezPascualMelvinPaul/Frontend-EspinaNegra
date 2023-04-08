import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "not-authenticated",
    email: null,
    displayName: null,
    token: null,
    user: {
      name: "",
      email: "",
    },
    errorMessage: null,
  },
  reducers: {
    login: (state, { payload }) => {
      state.status = "authenticated";
      state.token = payload.token;

      state.user = payload.user;
      state.email = payload.email;
    },
    logout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.email = null;
      state.displayName = null;
      state.token = null;
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
