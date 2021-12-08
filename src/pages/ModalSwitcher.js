// src/list/BoxScene.jss
import React, {Component} from "react";
import Modal from 'react-modal';
import classnames from "classnames";
import Cookies from "js-cookie";

//strings


//styling
import style from "../../styles/pages/ModalUpdate.scss";
import packageJSON from "../../package";

export default class ModalUpdate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalShow: props.isOpen,
      currentServer: Cookies.get("server")
    };
    this.onModalClose = this.onModalClose.bind(this);
    this.switchServer = this.switchServer.bind(this);
  }

  componentDidMount() {
  }

  onModalClose() {
    this.props.switchSwitchModalState(false)
  }

  switchServer() {
    let currentServer = this.state.currentServer;
    if(!currentServer || currentServer === "main") {
      currentServer = "sandbox"
    } else {
      currentServer = "main"
    }
    Cookies.set("server", currentServer, {expires: 365});
    location.reload();
  }

  render() {
    const {currentServer} = this.state;
    const {isOpen} = this.props;
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
    const okButtonClassNames = classnames({
      [style.ModalUpdate__Button]: true,
      [style["ModalUpdate__Button--ok"]]: true,
    });
    const notokButtonClassNames = classnames({
      [style.ModalUpdate__Button]: true,
      [style["ModalUpdate__Button--notOk"]]: true,
    });
    return (
      <Modal
        ariaHideApp={false}
        style={customStyles}
        isOpen={isOpen}>
        <h3>به کجا میروی ای دوست؟</h3>
        <br/>
        <button className={okButtonClassNames} onClick={this.switchServer}>{currentServer && currentServer === "main" ? "سرور تستی" : "سرور اصلی"}</button>
        <button className={notokButtonClassNames} onClick={this.onModalClose}>هیچ جا</button>
      </Modal>
    )
  }
}