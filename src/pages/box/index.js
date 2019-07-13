// src/list/BoxScene.jss
import React, {Component} from "react";
import {PodchatJSX} from "podchatweb";
import {connect} from "react-redux";
import cookies from "cookies-js";
import packageJSON from "../../../package";
//strings
import strings from "../../constants/localization";

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
    const version = cookies.get("chat-version");
    if(packageJSON.version !== version ) {
      this.clearCache = true;
      cookies.set("chat-version", packageJSON.version);
    }
  }

  componentDidMount() {
    this.props.dispatch(userGetToken());
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
      <div className={style.Box} >
        <PodchatJSX token={token} clearCache={this.clearCache} customClassName={style.Podchatbox} ref={this.chatRef} originalServer/>
      </div>
    )
  }
}