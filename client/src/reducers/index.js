import { combineReducers } from "redux";

import errorReducer from "./error";
import authReducer from "./auth";
import profileReducer from "./profile";
import postReducer from "./post";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer
});
