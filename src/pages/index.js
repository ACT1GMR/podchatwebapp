// src/list/BoxScene.jss
import React, {Component} from "react";
import Modal from 'react-modal';
import {PodchatJSX} from "podchatweb";
import {auth, retry, signOut} from "podauth";
import {connect} from "react-redux";
import Cookies from "js-cookie";
import packageJSON from "../../package";
import ModalUpdate from "./ModalUpdate";

//strings
import strings from "../constants/localization";
import {serverConfig} from "../constants/connection";


//styling
import style from "../../styles/pages/index.scss";

export default class Box extends Component {

  constructor(props) {
    super(props);
    this.state={
      token: null
    };
    auth({
      clientId: "2051121e4348af52664cf7de0bda",
      scope: "social:write",
      secure: window.location.href.indexOf('https') > -1,
      onNewToken: token => {
        this.setState({token});
      }
    });
    this.chatRef = React.createRef();
    this.clearCache = false;
    this.retryHook = this.retryHook.bind(this);
    this.signOutHook = this.signOutHook.bind(this);
    const version = Cookies.get("chat-version");
    if (packageJSON.version !== version) {
      this.clearCache = true;
      Cookies.set("chat-version", packageJSON.version, {expires: 365});
      console.log("removing old Cookies");
      Cookies.remove("codeVerifier");
      Cookies.remove("refreshToken");
    }
  }

  retryHook() {
    return retry();
  }

  signOutHook() {
    signOut();
  }

  render() {
    const {token} = this.state;
    if (!token) {
      return (
        <div className={`${style.Box} ${style["Box--noBoxShadow"]}`}>
          <div className={style.Box__Loader}/>
          <p className={style.Box__Message}>{strings.loadingForChat}</p>
        </div>);
    }
    return (
      <div className={style.Box}>
        <ModalUpdate/>
        <PodchatJSX token={token} clearCache={this.clearCache} customClassName={style.Podchatbox}
                    ref={this.chatRef} {...serverConfig}
                    onRetryHook={this.retryHook}
                    onSignOutHook={this.signOutHook}
                    originalServer/>
      </div>
    )
  }
}

