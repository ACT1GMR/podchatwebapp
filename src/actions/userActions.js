// src/actions/messageActions.js
import {USER_GET_TOKEN} from "../constants/actionTypes";
import {auth} from "podauth";

export const userGetToken = () => {
  return (dispatch) => {
    auth({
      clientId: "84994fec93b1402825b650db",
      scope: "social:write",
      secure: window.location.href.indexOf('https') > -1,
      onNewToken: token => {
        dispatch({
          payload: token,
          type: USER_GET_TOKEN
        })
      }
    });
  }
};
