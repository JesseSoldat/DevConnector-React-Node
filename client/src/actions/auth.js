import axios from "axios";
import jwtDecode from "jwt-decode";

import { SET_CURRENT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";

export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded
});

export const loginUser = (userData, history) => async dispatch => {
  try {
    const res = await axios.post("/auth/login", userData);
    const token = res.data;

    localStorage.setItem("jwtToken", token);

    const decoded = jwtDecode(token);

    dispatch(setCurrentUser(decoded));
    history.push("/dashboard");
  } catch (err) {}
};

export const registerUser = (userData, history) => async dispatch => {
  try {
    const res = await axios.post("/auth/register", userData);
    const token = res.data;

    localStorage.setItem("jwtToken", token);

    const decoded = jwtDecode(token);

    dispatch(setCurrentUser(decoded));

    history.push("/dashboard");
  } catch (err) {}
};

export const logoutUser = history => async dispatch => {
  localStorage.removeItem("jwtToken");

  setAuthToken(false);

  dispatch(setCurrentUser({}));

  history.push("/");
};
