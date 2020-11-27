import React, { Fragment } from "react";
import "./FullPost.css";
import ModalImg from '../../images/modal-img.jpg';

export default class FullPost extends React.Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  componentDidUpdate = () => {
    window.scrollTo(0, 0)
  }
  
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <Fragment> 
        <div className="full-bg">
          <div className="modal" id="modal">
          <i className="fas fa-window-close" onClick={this.props.onClose}></i>
            <img id="modal-img" src={ModalImg} />
            <i id="modal-icon" class="fab fa-atlassian"></i>       
          </div>
        </div>       
      </Fragment>
    );
  }
}