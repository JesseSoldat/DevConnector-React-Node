import axios from "axios";

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER
} from "./types";

export const setProfileLoading = () => ({
  type: PROFILE_LOADING
});

export const getCurrentProfile = () => async dispatch => {
  dispatch(setProfileLoading());
  try {
    const res = await axios.get("/api/profile");
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILE,
      payload: {}
    });
  }
};

export const createProfile = (profileData, history) => async dispatch => {
  try {
    await axios.post("/api/profile", profileData);
    history.push("/dashboard");
  } catch (err) {
    console.log("createProfile err", err);
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
