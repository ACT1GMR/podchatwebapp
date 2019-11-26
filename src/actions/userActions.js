// src/actions/messageActions.js
import {USER_GET_TOKEN} from "../constants/actionTypes";
import {auth} from "podauth";

export const userGetToken = () => {
  return (dispatch) => {
    auth({
      ssoBaseUrl: "https://accounts.pod.ir/oauth2",
      clientId: "84994fec93b1402825b650db",
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
