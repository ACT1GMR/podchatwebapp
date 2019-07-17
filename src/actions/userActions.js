// src/actions/messageActions.js
import {USER_GET_TOKEN} from "../constants/actionTypes";
import {auth} from "podauth";

export const userGetToken = () => {
  return (dispatch) => {
    auth({
      clientId: "84994fec93b1402825b650dba",
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
