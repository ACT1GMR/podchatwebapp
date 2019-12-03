// src/actions/messageActions.js
import {USER_GET_TOKEN} from "../constants/actionTypes";
import {auth} from "podauth";

export const userGetToken = () => {
  return (dispatch) => {
    auth({
      clientId: "17110820h0ad74351bb58eb766b533fda",
      scope: "social:write",
      onNewToken: token => {
        dispatch({
          payload: token,
          type: USER_GET_TOKEN
        })
      }
    });
  }
};
