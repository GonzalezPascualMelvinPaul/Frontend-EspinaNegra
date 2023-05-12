import { authApi } from "./configAuth";

export const loginWithEmailAndPassword = async ({ email, password }) => {
  try {
    const { data } = await authApi.post("login", {
      email: email,
      password: password,
    });
    console.log("Info del login", data);
    return {
      ok: true,
      token: data.token,
      user: data.user,
      errors: "",
    };
  } catch (error) {
    return { ok: false, error: error.response.data.message };
  }
};

export const getDataWithToken = async () => {
  try {
    const { data } = await authApi.get("user-profile");
    console.log("infor del token", data);
    return {
      ok: true,
      token: data.token,
      user: data.user,
      errors: "",
    };
  } catch (error) {
    return { ok: false, error: error.response.data.message };
  }
};

export const logoutAccount = async () => {
  try {
    const { data } = await authApi.post("logout");
    console.log("Cerrando Sesion", data);
    return { ok: true };
  } catch (error) {
    return { ok: false };
  }
};
