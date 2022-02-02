// src/list/BoxScene.jss
import React, {Component} from "react";
import {PodchatJSX} from "podchatweb";
import {auth, retry, signOut} from "podauth";
import Cookies from "js-cookie";
import packageJSON from "../../package";
import ModalUpdate from "./ModalUpdate";

//strings
import strings from "../constants/localization";
import {serverConfig} from "../constants/connection";


//styling
import style from "../../styles/pages/index.scss";
import ModalSwitcher from "./ModalSwitcher";


export default class Box extends Component {

  constructor(props) {
    super(props);
    this.state = {
      token: null
    };
    auth({
      clientId: "88413l69cd4051a039cf115ee4e073",
      scope: "social:write",
      secure: window.location.href.indexOf('https') > -1,
      onNewToken: token => {
        this.setState({token});
      }
    });
    this.chatRef = React.createRef();
    this.clearCache = false;
    this.retryHook = this.retryHook.bind(this);
    this.onTypingHook = this.onTypingHook.bind(this);
    this.signOutHook = this.signOutHook.bind(this);
    this.switchSwitchModalState = this.switchSwitchModalState.bind(this);
    const version = Cookies.get("chat-version");
    const server = Cookies.get("server");
    if(!server) {
      Cookies.set("server", "sandbox");
    }
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

  onTypingHook(text) {
    const newText = text ? text.toLowerCase() : text;
    if (newText.indexOf("switchvoila") > -1) {
      this.switchSwitchModalState(true);
    }
  }

  switchSwitchModalState(state) {
    setTimeout(()=> {
      this.setState({
        switchModalShow: state
      });
    }, 100)

  }

  signOutHook() {
    signOut();
  }

  render() {
    const {token, switchModalShow} = this.state;
    if (!token) {
      return (
        <div className={`${style.Box} ${style["Box--noBoxShadow"]}`}>
          <div className={style.Box__Loader}/>
          <p className={style.Box__Message}>{strings.loadingForChat}</p>
        </div>);
    }
    if (window.location.pathname.indexOf('support-module') > -1) {
      return <PodchatJSX token={token} clearCache={this.clearCache}
                         supportMode={8543}
                         {...serverConfig(Cookies.get("server") === "sandbox")}
                         onRetryHook={this.retryHook}
                         onSignOutHook={this.signOutHook}
                         originalServer/>
    }
    return (
      <div className={style.Box}>
        <ModalUpdate/>
        <ModalSwitcher isOpen={switchModalShow} switchSwitchModalState={this.switchSwitchModalState}/>
        <PodchatJSX token={token} clearCache={this.clearCache} customClassName={style.Podchatbox}
                    ref={this.chatRef} {...serverConfig(Cookies.get("server") === "sandbox")}
                    onRetryHook={this.retryHook}
                    onTypingHook={this.onTypingHook}
                    onSignOutHook={this.signOutHook}
                    originalServer/>
      </div>
    )
  }
}

