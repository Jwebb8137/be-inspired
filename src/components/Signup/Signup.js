import React, { Fragment, Component } from 'react'
import ApiContext from '../../ApiContext'
import config from '../../config'
import Loading from '../Loading/Loading'
import './Signup.css'
import videoBg from '../../images/video7.mp4'
import videoBgMobile from '../../images/signup-mobile.mp4'
import videoBgTablet from '../../images/signup-tablet.mp4'

export default class Signup extends Component {

  state = {
    err: '',
    username: '',
    firstName: '',
    lastName: '',
    userPassword: '',
    profileImgUrl: '',
    isLoading: true,
    imgError: ''
  }

  static defaultProps = {
    history: {
      push: () => { }
    },
  }

  static contextType = ApiContext;

  openWidget = (e) => {
    e.preventDefault()
    const onUpload = async (url) => {
      this.setState({
        profileImgUrl: url
      })
    }
    window.cloudinary.openUploadWidget({
      cloudName: "dvkqz0fed", singleUploadAutoClose: true, croppingCoordinatesMode: "custom", multiple: false, uploadPreset: "inspired", croppingAspectRatio: 1, showSkipCropButton: false, cropping: true }, (error, result) => { 
      if (!error && result && result.event === "success") { 
        onUpload(result.info.secure_url)
      }
    });
  }

  componentDidMount() {
    this.setState({
      isLoading: false
    })
  }

  onSubmitForm = async (e) => {
    e.preventDefault();
    const { API_ENDPOINT } = config;
    const username = this.state.username
    const first_name = this.state.firstName
    const last_name = this.state.lastName
    const user_password = this.state.userPassword
    const profile_img_url = this.state.profileImgUrl
    if (this.state.profileImgUrl) {
      try {
        this.setState({
          isLoading: true
        })
        const body = { username, user_password, first_name, last_name, profile_img_url}
        const response = await fetch(`${API_ENDPOINT}/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        })
        const parseRes = await response.json();
        localStorage.setItem("token", parseRes.token)
        localStorage.setItem('user', JSON.stringify(parseRes.userInfo))
        this.props.setUserInfo(parseRes.userInfo)
        this.props.setAuth(true)
      } catch (err) {
        console.error(err.message)
      }
      window.location.reload()
    }
    this.setState({
      imgError: '* Please Upload A Photo! *'
    })
  }

  handleFileInputChange = (e) => {
    const file = e.target.files[0]
    this.previewFile(file)
  }

  handleUsernameChange = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  handleFirstNameChange = (e) => {
    this.setState({
      firstName: e.target.value
    })
  }

  handleLastNameChange = (e) => {
    this.setState({
      lastName: e.target.value
    })
  }

  handlePasswordChange = (e) => {
    this.setState({
      userPassword: e.target.value
    })
  }

  render() {
    window.cloudinary.setCloudName("dvkqz0fed");
    if (this.state.isLoading) {
      <Loading />
    }
    return (
      <Fragment>
        <video autoPlay muted loop id="mySignUpVideo">
          <source src={videoBg} type="video/mp4" />
        </video>
        <video autoPlay muted loop id="mySignUpVideoTablet">
          <source src={videoBgTablet} type="video/mp4" />
        </video>
        <video autoPlay muted loop id="mySignUpVideoMobile">
          <source src={videoBgMobile} type="video/mp4" />
        </video>
        <div className="signup fade-in-login">
          <form className="signup-container" onSubmit={e => this.onSubmitForm(e)}>
            <h2 id="main-signup"><u>Sign Up To Get Started</u></h2>
            <span>Some quick info and you're on your way!</span>
            <div className="input-field">
              {this.state.profileImgUrl && (
                <img 
                  className="profile-preview"
                  src={this.state.profileImgUrl} 
                  alt="chosen" 
                />
              )}
              {!this.state.profileImgUrl && (
                <i id="profile-placeholder" className="fas fa-user-circle"></i>
              )}
              <div class="upload-btn-wrapper">
                <span id="signup-upload-btn" class="btn" onClick={e => this.openWidget(e)}>Upload Picture <i class="fas fa-upload"></i></span>
              </div>
              <div className="err-msg img-err">{this.state.imgError}</div>
            </div>
            <h3>Create A Username & Password</h3>
            <div className="signup-row">
              <div className="input-field">
                <label for='username-input'>Username </label>
                <input typeof="text" value={this.state.username} onChange={e=> this.handleUsernameChange(e)} name='username' required />
              </div>
              <div className='input-field'>
                <label for='user-password'>Password </label>
                <input type='password' value={this.state.userPassword} onChange={e=> this.handlePasswordChange(e)}  name='user-password' required 
                  pattern="^.*(?=.{6,})(?=.*[a-z])(?=.*[A-Z]).*$"
                />
              </div>
            </div>
            <h3>Just Some Basic Information</h3>
            <div className="signup-row">
              <div className="input-field">
                <label for='user-first-name'>First Name</label>
                <input typeof="text" value={this.state.firstName} onChange={e=> this.handleFirstNameChange(e)}  name='user-first-name' required />
              </div>
              <div className="input-field">
                <label for='user-last-name'>Last Name</label>
                <input typeof="text" value={this.state.lastName} onChange={e=> this.handleLastNameChange(e)}  name='user-last-name' required />
              </div>
            </div>
            <button typeof="submit" id="signup-submit" class="btn">Sign Up <i class="fas fa-sign-in-alt"></i></button>
          </form>
        </div>
      </Fragment>
    )
  } 
}