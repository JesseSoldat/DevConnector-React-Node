import { SET_CURRENT_USER } from "../actions/types";
import isEmpty from "../validations/isEmpty";

const initialState = {
  isAuth: false,
  user: {}
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case SET_CURRENT_USER:
      // console.log("SET_CURRENT_USER ", payload);
      return {
        ...state,
        isAuth: !isEmpty(payload),
        user: payload
      };

    default:
      return state;
  }
}
