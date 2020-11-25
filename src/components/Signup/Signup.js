import React, { Fragment, useState, useEffect } from 'react';
import config from '../../config';
import './Signup.css';
import videoBg from '../../images/video7.mp4';

const Signup = props => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [fileInputState, setFileInputState] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [err, setError] = useState("");
  const { API_ENDPOINT } = config;

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const onSubmitForm = async (e) => {
    e.preventDefault();

    // if(!previewSource && !previewPetSource) {
    //   setError("* A Picture Is Required! / Check to make sure everything is filled out!")
    //   return;
    // }  
    // try {
    //   setIsLoading("true")
    //   const body = { email, username, password, headline, first_name, last_name, age, hobbies, gender, seeking_gender, description, pet_type, pet_name, pet_description, pet_meet_description, pet_hobbies, previewSource, previewPetSource }
    //   const response = await fetch(`${API_ENDPOINT}/api/users`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(body)
    //   })
    //   const parseRes = await response.json();
    //   localStorage.setItem("token", parseRes.token);
    //   setAuth(true);
    // } catch (err) {
    //   console.error(err.message)
    // }
  }

  const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    previewFile(file)
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    }
  }

  return (
    <Fragment>
      <video autoPlay muted loop id="mySignUpVideo">
        <source src={videoBg} type="video/mp4" />
      </video>
      <div className="signup fade-in-login">
        <form className="signup-container" onSubmit={e => onSubmitForm(e)}>
          <h2 id="main-signup"><u>Sign Up To Get Started</u></h2>
          <span>Some quick info and you're on your way!</span>
          <div className="input-field">
            {previewSource && (
              <img 
                className="profile-preview"
                src={previewSource} 
                alt="chosen" 
              />
            )}
            {!previewSource && (
              <i id="profile-placeholder" className="fas fa-user-circle"></i>
            )}
            <div class="upload-btn-wrapper">
              <button class="btn">Upload Picture</button>
              <input type="file"
                value={fileInputState} 
                onChange={handleFileInputChange} 
                name="image" 
                id="file" 
              />
            </div>
            <div className="err-msg">{err}</div>
          </div>
          <h3>Create A Username & Password</h3>
          <div className="signup-row">
            <div className="input-field">
              <label>Username </label>
              <input typeof="text" required onChange={e => setUsername(e.target.value)}/>
            </div>
            <div className='input-field'>
              <label>Password </label>
              <input type='password' value={password} required pattern="^.*(?=.{6,})(?=.*[a-z])(?=.*[A-Z]).*$"
              onChange={e => setPassword(e.target.value)}/>
            </div>
          </div>
          <h3>Just Some Basic Information</h3>
          <div className="signup-row">
            <div className="input-field">
              <label >First Name</label>
              <input typeof="text" required onChange={e => setFirstName(e.target.value)}/>
            </div>
            <div className="input-field">
              <label >Last Name</label>
              <input typeof="text" required onChange={e => setLastName(e.target.value)}/>
            </div>
          </div>
          <button id="signup-submit" class="btn">Sign Up</button>
        </form>
      </div>
    </Fragment>
  )
} 

export default Signup;