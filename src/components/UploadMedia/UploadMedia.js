import React, { Fragment } from "react";
import "./UploadMedia.css";
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import ModalImg from '../../images/modal-img.jpg';
const { defaultClassNames } = Dropzone;

export default class UploadMedia extends React.Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  componentDidUpdate = () => {
    window.scrollTo(0, 0)
  }
  
  render() {
    const Layout = ({ input, previews, submitButton, dropzoneProps, files, extra: { maxFiles } }) => {
      return (
        <div>
          {previews}
    
          <div {...dropzoneProps}>
            {files.length < maxFiles && input}
          </div>
    
          {files.length > 0 && submitButton}
        </div>
      )
    }

    const getUploadParams = () => ({ url: 'https://httpbin.org/post' })

    const handleSubmit = (files, allFiles) => {
      console.log(files.map(f => f.meta))
      allFiles.forEach(f => f.remove())
    }

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
            <Dropzone
              id="dzu-dropzone"
              getUploadParams={getUploadParams}
              LayoutComponent={Layout}
              onSubmit={handleSubmit}
              inputContent="Click Here To Upload"
            />       
          </div>
        </div>       
      </Fragment>
    );
  }
}