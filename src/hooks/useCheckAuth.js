import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../providers/auth/configAuth";
import { login, logout } from "../store/auth/authSlice";
import { useNavigate } from "react-router-dom";

export const useCheckAuth = () => {
  const { status, email, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    async function loadUser() {
      if (!getToken()) {
        dispatch(logout());

        return;
      }

      try {
        dispatch(
          login({
            token: getToken(),
            user: user,
            email: email,
          })
        );

        navigate(sessionStorage.getItem("Location"));
      } catch (error) {
        dispatch(logout());
      }
    }
    loadUser();
  }, []);
  return {
    status: status,
  };
};
