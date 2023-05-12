import { setToken } from "../../providers/auth/configAuth";
import {
  getDataWithToken,
  loginWithEmailAndPassword,
  logoutAccount,
} from "../../providers/auth/providerAuth";
import { checkingCredentials, login, logout, onError } from "./authSlice";

export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startLoginWithEmailPassword = (values, navigate = () => {}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { ok, user, error, token } = await loginWithEmailAndPassword(values);

    if (ok) {
      dispatch(login({ token, user, error }));
      setToken(token);
      console.log("Data del user", user);
      navigate();
    } else {
      dispatch(onError(error));
    }
  };
};

export const startGetDataWithToken = () => {
  return async (dispatch) => {
    const { ok, user, error, token } = await getDataWithToken();
    if (ok) {
      dispatch(login({ token, user, error }));
      setToken(token);
      console.log("Data del user", user);
    } else {
      dispatch(onError(error));
    }
  };
};
