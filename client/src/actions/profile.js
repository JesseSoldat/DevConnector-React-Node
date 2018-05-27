import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

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

export const getProfileByHandle = handle => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/handle/${handle}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILE,
      payload: null
    });
  }
};

export const getProfiles = () => async dispatch => {
  dispatch(setProfileLoading());
  try {
    const res = await axios.get("/api/profiles");
    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILES,
      payload: null
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

export const addExperience = (expData, history) => async dispatch => {
  try {
    await axios.post("/api/profile/experience", expData);
    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const addEducation = (eduData, history) => async dispatch => {
  try {
    await axios.post("/api/profile/education", eduData);
    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const deleteAccount = history => async dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      await axios.delete("/api/profile");
      localStorage.removeItem("jwtToken");

      setAuthToken(false);

      dispatch({
        type: SET_CURRENT_USER,
        payload: {}
      });
      history.push("/");
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
  }
};
