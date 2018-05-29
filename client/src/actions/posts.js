import axios from "axios";

import {
  ADD_POST,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST
} from "./types";

export const getPosts = () => async dispatch => {
  dispatch(setPostLoading());
  try {
    const res = await axios.get("/api/posts");
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_POSTS,
      payload: null
    });
  }
};

export const addPost = post => async dispatch => {
  dispatch(clearErrors());
  try {
    const res = await axios.post("/api/posts", post);
    dispatch({
      type: ADD_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      dispatch: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const setPostLoading = () => ({
  type: POST_LOADING
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});
