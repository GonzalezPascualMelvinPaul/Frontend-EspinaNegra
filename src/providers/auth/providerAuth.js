import { espinaNegraApi } from "../../api";

export const loginWithEmailAndPassword = async ({ email, password }) => {
  try {
    const { data } = await espinaNegraApi.post("login", {
      email: email,
      password: password,
    });
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
    const { data } = await espinaNegraApi.get("user/profile");
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
    const { data } = await espinaNegraApi.post("logout");
    return { ok: true };
  } catch (error) {
    return { ok: false };
  }
};
