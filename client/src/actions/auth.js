import axios from "axios";
import jwtDecode from "jwt-decode";

import { SET_CURRENT_USER } from "./types";

export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded
});

export const loginUser = userData => async dispatch => {
  try {
    const res = await axios.post("/auth/login", userData);
    const token = res.data;

    localStorage.setItem("jwtToken", token);

    const decoded = jwtDecode(token);

    dispatch(setCurrentUser(decoded));
  } catch (err) {}
};

export const registerUser = userData => async dispatch => {
  try {
    const res = await axios.post("/auth/register", userData);
    const token = res.data;
    console.log("token ", token);

    localStorage.setItem("jwtToken", token);

    const decoded = jwtDecode(token);
    console.log("decoded ", decoded);

    dispatch(setCurrentUser(decoded));
  } catch (err) {}
};
