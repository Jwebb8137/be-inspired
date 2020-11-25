import React, { Fragment, useState, useEffect } from 'react';
import config from '../../config';
import UploadPost from '../UploadPost/UploadPost';
import Post from '../Post/Post';
import TextPost from '../Post/TextPost';
import FeaturedVid from '../../images/video2.mp4';
import './Feed.css';

const Feed = props => {

  const [isLoading, setIsLoading] = useState(false);
  const [err, setError] = useState("");
  const [listFilter, setListFilter] = useState("");
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

  return (
    <Fragment>
      <div id="feed-container" className="fade-in-login">
        <div className="feed-inner-container">
          {/* <h1 id="feed-heading">Fuel Your Inspiration <i class="fas fa-mountain"></i></h1> */}
          <div className="featured-post">
            <video autoPlay loop muted className="featured-video">
              <source src={FeaturedVid} type="video/mp4" />
              <source src={FeaturedVid} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div id="feed-options">
              <span>Inspiration Feed</span>
              <div className='input-field'>
                  <label>View </label>
                  <select onChange={e => setListFilter(e.target.value)} defaultValue="none" required>
                      <option value="trending">Trending</option>
                      <option value="newest">Newest</option>]
                  </select>
              </div>
          </div>
          <UploadPost />
          <Post />
          <TextPost />
          <Post />
          <TextPost />
          <Post />
          <TextPost />
          <Post />
        </div>
      </div>
    </Fragment>
  )
}

export default Feed;