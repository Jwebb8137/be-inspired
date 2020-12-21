import React, { Fragment, Component } from 'react';
import ApiContext from '../../ApiContext'
import config from '../../config';
import './UploadPost.css';

export default class UploadPost extends Component{

  state = {
    contentUrl: '',
    show: true,
    userInfo: {},
    postSubmitted: false,
    err: '',
    postDescription: '',
    previewFile: ''
  }

  static defaultProps = {
    history: {
      push: () => { }
    },
  }

  static contextType = ApiContext;

  setShowModal = () => {
     this.setState({
      showModal: !this.state.showModal
    })
  }

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem('user'));
    console.log(userData.id)
    this.setState({
      userInfo: userData
    })
  }

  setPostSubmit = () => {
    this.setState({
      postSubmitted: !this.state.postSubmitted
    })
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

  getPosts = () => {
    this.props.getPosts()
  }

  resetPage = () => {
    this.props.resetPage()
  }

  onSubmitForm = async (e) => {
    e.preventDefault();
    console.log('Form submitted')
    const { API_ENDPOINT } = config;
    const content_url = this.state.previewFile
    const post_uploader_id = this.state.userInfo.id
    const post_description = this.state.postDescription
    const body = { content_url, post_uploader_id, post_description }

    try {
        console.log(body)
        console.log(this.state)
    
        await fetch (`${API_ENDPOINT}/posts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        this.setState({
          postSubmitted: true,
          previewFile: ""
        })
      } catch (err) {
          console.error(err);
    }
    this.resetPage()
    this.getPosts()
    this.props.updatedFeedAdd()
  }

  handleDescriptionChange = (e) => {
    this.setState({postDescription: e.target.value});
  }

  deletePreview = () => {
    this.setState({
      previewFile: ""
    })
  }
 
  openWidget = (e) => {
    e.preventDefault()
    const onUpload = async (url) => {
      console.log('Form submitted')
      this.setState({
        previewFile: url
      })
    }
    window.cloudinary.openUploadWidget({
      cloudName: "dvkqz0fed", uploadPreset: "inspired-uploads", singleUploadAutoClose: false, showUploadMoreButton: false }, (error, result) => { 
        if (!error && result && result.event === "success") { 
          console.log('Done! Here is the image info: ', result.info.secure_url);
          onUpload(result.info.secure_url)
        }
      });
  }

  render() {
    window.cloudinary.setCloudName("dvkqz0fed");
    if (this.state.err) {
      return (
        <Fragment>
          <div className="upload-container">
            <h3>Oops! Looks like something went wrong. Let's try again!</h3>
          </div>
        </Fragment>
      )
    }

    if (this.state.postSubmitted) {
      return (
        <Fragment>
          <div id="post-success" className="upload-container">
            <h3 id="post-success-heading">Your Post Has Been Submitted !</h3>
            <button
              className="toggle-button btn modal-btn"
              id="centered-toggle-button"
              onClick={this.setPostSubmit}
            >
              Post Again <i class="fas fa-caret-right"></i>
            </button>
          </div>
        </Fragment>
      )
    }

    if (!this.state.previewFile) {
      return (
        <Fragment>
          <form className="upload-container" onSubmit={e => this.onSubmitForm(e)}>
            <h3>Got Something You Want To Share?</h3>
            <div className="signup-row">
              <div id="post-description-container" className="input-field">
                <label htmlFor='post-description'></label>
                <input typeof="text" value={this.state.value} onChange={e=> this.handleDescriptionChange(e)} name='post-description' placeholder="Share some thoughts here ..." required/>
              </div>
            </div>
            <div className="flex-row">
              <button typeof="submit" id="upload-submit" class="btn">Share Post <i class="fas fa-share"></i></button>
              <button id="upload-feed-btn" class="btn" onClick={e => this.openWidget(e)}>Upload Media <i class="fas fa-upload"></i></button>
            </div>
          </form>
        </Fragment>
      )
    }

    return (
      <Fragment>
        <form className="upload-container" onSubmit={e => this.onSubmitForm(e)}>
          <div id="img-preview-container-feed" className="input-field block">
            <i id="img-preview-delete" onClick={this.deletePreview} class="fas fa-window-close"></i>
            <img src={this.state.previewFile ? this.state.previewFile : false} className="img-upload-preview"/>
            <span className="img-helper">(Image Preview)</span>
          </div>
          <h3>Add a description and click share to post!</h3>
          <div className="signup-row">
            <div id="post-description-container" className="input-field">
              <label htmlFor='post-description'></label>
              <input typeof="text" value={this.state.value} onChange={e=> this.handleDescriptionChange(e)} name='post-description' placeholder="Tell us about your post!" required/>
            </div>
          </div>
          <div className="flex-row">
            <button typeof="submit" id="upload-submit" class="btn bg-grey">Share Post</button>
            <button id="upload-feed-btn" class="btn" onClick={e => this.openWidget(e)}>Change Media</button>
          </div>
        </form>
      </Fragment>
    )  
  }
}
