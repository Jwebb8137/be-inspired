import React, { Fragment } from "react"
import ApiContext from '../../ApiContext'
import config from '../../config'
import "./UploadMedia.css"
import ModalImg from '../../images/modal-img.jpg';

export default class UploadMedia extends React.Component {

  state = {
    uploaderId: 1,
    file: '',
    previewFile: '',
    previewSource: '',
    fileInputState: '',
    err: '',
    postSubmitted: false
  }

  static defaultProps = {
    history: {
      push: () => { }
    },
  }

  static contextType = ApiContext;

  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  componentDidUpdate = () => {
    window.scrollTo(0, 0)
  }

  handleFileInputChange = (e) => {
    const file = e.target.files[0]
    // previewFile(file)
    this.previewFile(file)
  }

  previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({
        previewSource: reader.result
      });
    }
  }

  onSubmitForm = async (e) => {
    e.preventDefault();
    const { API_ENDPOINT } = config;

    try {
        // const newPost = {
        //   post_uploader_id: this.state.uploaderId,
        //   post_description: e.target['post-description'].value,
        //   content_url: this.state.previewSource
        // } 
        const previewSource = this.state.previewSource
        const body = { previewSource };

        console.log(body)
    
        await fetch (`${API_ENDPOINT}/media`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
      } catch (err) {
          console.error(err);
      }
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
            <form className="media-container" onSubmit={e => this.onSubmitForm(e)}>
              <div className="input-field block">
                {this.state.previewSource && (
                  <img 
                    className="img-upload-preview"
                    src={this.state.previewSource} 
                    alt="chosen" 
                  />
                )}
                {!this.state.previewSource && (
                  <i id="profile-placeholder" className="fab fa-atlassian"></i>
                )}
                <div class="upload-btn-wrapper">
                  <button class="btn">Upload Picture</button>
                  <input type="file"
                    value={this.fileInputState} 
                    onChange={this.handleFileInputChange} 
                    name="image" 
                    id="file" 
                  />
                </div>
                <div className="err-msg">{this.state.err}</div>
              </div>
              <div className="input-field block">
                <label htmlFor='post-description'></label>
                <textarea typeof="text" name='post-description' placeholder="Send some inspiration or words of encouragement!"/>
                <button typeof="submit" id="img-upload-submit" class="btn bg-grey">Share Your Post</button>
              </div>
            </form>       
          </div>
        </div>       
      </Fragment>
    );
  }
}
