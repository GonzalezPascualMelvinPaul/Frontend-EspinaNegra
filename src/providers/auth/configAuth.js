import axios from "axios";

export const TOKEN_KEY = "TOKEN";
export const authApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

export const setToken = (token) => {
  sessionStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return sessionStorage.getItem(TOKEN_KEY);
};

export const deleteToken = () => {
  sessionStorage.removeItem(TOKEN_KEY);
};
