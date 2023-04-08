import { setToken } from "../../providers/auth/configAuth";
import {
  loginWithEmailAndPassword,
  logoutAccount,
} from "../../providers/auth/providerAuth";
import { checkingCredentials, login, logout, onError } from "./authSlice";

export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await loginWithEmailAndPassword({ email, password });
    console.log("Este es el resultado", result);

    if (result.ok) {
      dispatch(login(result));
      setToken(result.token);
      console.log("Data del user", result.user);
    } else {
      dispatch(onError(result.error));
    }
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutAccount();
    dispatch(logout());
  };
};
