import React, { Fragment, useState, useEffect } from 'react';
import config from '../../config';
import UploadMedia from '../UploadMedia/UploadMedia';
import './UploadPost.css';

const UploadPost = props => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [fileInputState, setFileInputState] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [err, setError] = useState("");
  const { API_ENDPOINT } = config;
  const [showModal, setShowModal] = useState(false)

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
      <form className="upload-container" onSubmit={e => onSubmitForm(e)}>
        <h3>Got Something You Want To Share?</h3>
        <div className="signup-row">
          <div className="input-field">
            <label></label>
            <textarea typeof="text" required placeholder="Send some inspiration or words of encouragement!" onChange={e => setFirstName(e.target.value)}/>
          </div>
        </div>
        <button id="signup-submit" class="btn">Share Your Post</button>
        <button
          className="toggle-button btn modal-btn"
          id="centered-toggle-button"
          onClick={() => setShowModal(!showModal)}
        >
          <i class="fas fa-video"></i>
        </button>
        <div className="modal-container">
          <UploadMedia onClose={() => setShowModal(!showModal)} show={showModal}>
            
          </UploadMedia>
        </div>
      </form>
    </Fragment>
  )
}

export default UploadPost;