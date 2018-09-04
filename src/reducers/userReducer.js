import {USER_GET_TOKEN} from "../constants/actionTypes";
import {stateObject} from "../utils/serviceStateGenerator";

export default (state = {
  token: null
}, action) => {
  switch (action.type) {
    case USER_GET_TOKEN:
      return {...state, ...stateObject("SUCCESS", action.payload, "token")};
    default:
      return state;
  }
};