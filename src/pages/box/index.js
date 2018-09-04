// src/list/BoxScene.jss
import React, {Component} from "react";
import {PodchatJSX} from "podchatweb";
import {connect} from "react-redux";

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
  }

  componentDidMount() {
    this.props.dispatch(userGetToken());
  }

  render() {
    const {token} = this.props;
    if (!token) {
      return (
        <div className={style.Box}>
          <div className={style.Box__Loader}/>
          <p className={style.Box__Message}>{strings.loadingForChat}</p>
        </div>);
    }
    return (
      <div className={style.Box}>
        <PodchatJSX token={token} boxClassName={style.Podchatbox} boxBodyClassName={style.Podchatboxbody}/>
      </div>
    )
  }
}