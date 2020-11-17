import React from "react";
import classnames from "classnames";
import style from "../../styles/pages/ModalUpdate.scss";
import Modal from "react-modal";


export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {error: null, errorInfo: null};
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  render() {
    if (this.state.errorInfo) {
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
      return (
        <Modal
          ariaHideApp={false}
          style={customStyles}
          isOpen>
          <h2 style={{textAlign: "center"}}>یه اتفاق ناجور افتاد تو تاک!!</h2>
          <details style={{whiteSpace: 'pre-wrap'}}>
            <summary>جزییات بیشتر</summary>
            {this.state.error && this.state.error.toString()}
            <br/>
            {this.state.errorInfo.componentStack}
          </details>
          <button className={okButtonClassNames} onClick={() => location.reload()}>رفرش صفحه</button>
        </Modal>
      );
    }
    return this.props.children;
  }
}