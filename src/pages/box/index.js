// src/list/BoxScene.jss
import React, {Component} from "react";
import {PodchatJSX} from "podchatweb";
import {retry, signOut} from "podauth";
import {connect} from "react-redux";
import cookies from "cookies-js";
import packageJSON from "../../../package";
//strings
import strings from "../../constants/localization";
import {serverConfig} from "../../constants/connection";

//actions
import {userGetToken} from "../../actions/userActions";

//styling
import style from "../../../styles/pages/box/index.scss";

@connect(store => {
  return {
    token: store.user.token
  };
})
export default class Box extends Component {

  constructor(props) {
    super(props);
    this.chatRef = React.createRef();
    this.clearCache = false;
    this.retryHook = this.retryHook.bind(this);
    this.signOutHook = this.signOutHook.bind(this);
    const version = cookies.get("chat-version");
    if (packageJSON.version !== version) {
      this.clearCache = true;
      cookies.set("chat-version", packageJSON.version);
    }
  }

  componentDidMount() {
    this.props.dispatch(userGetToken());
  }

  retryHook() {
    return retry();
  }

  signOutHook() {
    signOut();
  }

  render() {
    const {token} = this.props;
    if (!token) {
      return (
        <div className={`${style.Box} ${style["Box--noBoxShadow"]}`}>
          <div className={style.Box__Loader}/>
          <p className={style.Box__Message}>{strings.loadingForChat}</p>
        </div>);
    }
    return (
      <div className={style.Box}>
        <PodchatJSX token={token} clearCache={this.clearCache} customClassName={style.Podchatbox}
                    ref={this.chatRef} {...serverConfig}
                    onRetryHook={this.retryHook}
                    chatSignOutHook={this.signOutHook}
                    originalServer/>
      </div>
    )
  }
}