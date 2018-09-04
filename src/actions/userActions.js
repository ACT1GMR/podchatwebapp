// src/actions/messageActions.js
import {USER_GET_TOKEN} from "../constants/actionTypes";
import {auth} from "podauth";

export const userGetToken = () => {
  return (dispatch) => {
    auth({
      clientId: "2051121e4348af52664cf7de0bda",
      onNewToken: token => {
        dispatch({
          payload: token,
          type: USER_GET_TOKEN
        })
      }
    });
  }
};
