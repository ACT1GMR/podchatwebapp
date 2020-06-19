// src/list/BoxScene.jss
import React, {Component} from "react";
import Modal from 'react-modal';
import {connect} from "react-redux";
import classnames from "classnames";
//strings
import strings from "../../constants/localization";
import {serverConfig} from "../../constants/connection";

//actions
import {userGetToken} from "../../actions/userActions";

//styling
import style from "../../../styles/pages/box/ModalUpdate.scss";
import packageJSON from "../../../package";

@connect(store => {
  return {
    token: store.user.token
  };
})
export default class ModalUpdate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chatVersion: packageJSON.version,
      modalShow: false
    };
    this.onModalClose = this.onModalClose.bind(this);
    this.intervalId = setInterval(() => {
      if (this.state.modalShow) {
        return;
      }
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        // process response
        if (xhr.status === 200) {
          const reg = /Talk v(.+?<)/gm;
          const ver = reg.exec(xhr.response)[1].replace("<", "").trim();
          if (ver !== packageJSON.version) {
            this.setState({
              chatVersion: ver,
              modalShow: true
            });
          }
        }
      };
      xhr.open('GET', "/");
      xhr.send();
    }, 900000);
  }

  componentDidMount() {
  }

  onModalClose() {
    clearInterval(this.intervalId);
    this.setState({
      modalShow: false
    })
  }

  render() {
    const {modalShow, chatVersion} = this.state;
    const customStyles = {
      overlay: {
        backgroundColor: "rgba(25, 25, 25, 0.67)",
        zIndex: "100000"
      },
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        border: "none",
        transform: 'translate(-50%, -50%)'
      }
    };
    const notokButtonClassNames = classnames({
      [style.ModalUpdate__Button]: true,
      [style["ModalUpdate__Button--notOk"]]: true,
    });

    const okButtonClassNames = classnames({
      [style.ModalUpdate__Button]: true,
      [style["ModalUpdate__Button--ok"]]: true,
    });
    return (
      <Modal
        ariaHideApp={false}
        style={customStyles}
        isOpen={modalShow}>
        <h3>نسخه ی جدیدی از تاک در دسترس است. میخواهید آخرین نسخه بروز شده را داشته باشید؟</h3>
        نسخه شما <b>{packageJSON.version}</b> نسخه بروز شده <b>{chatVersion}</b>
        <br/>
        <button className={okButtonClassNames} onClick={() => location.reload()}>بله حتما!</button>
        <button className={notokButtonClassNames} onClick={this.onModalClose}>نه نمیخوام ممنون</button>
      </Modal>
    )
  }
}