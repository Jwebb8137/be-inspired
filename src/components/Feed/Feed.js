import React, { Fragment, useState, useEffect } from 'react';
import config from '../../config';
import UploadPost from '../UploadPost/UploadPost';
import Post from '../Post/Post';
import TextPost from '../Post/TextPost';
import FeaturedVid from '../../images/video2.mp4';
import './Feed.css';
import { useParams } from 'react-router-dom';

const Feed = props => {

  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({})
  const [posts, setPosts] = useState([])
  const [err, setError] = useState("");
  const [listFilter, setListFilter] = useState("");
  const { API_ENDPOINT } = config;

  const activeUserInfo = props.activeUser

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const getPosts = async () => {
    try {   
      const response = await fetch(`${API_ENDPOINT}/posts`);
      const jsonData = await response.json();

      setPosts(jsonData);
      setIsLoading(false)
    } catch (err) {
        console.error(err.message)
    }
  }

  useEffect(() => {
    getPosts()
    // eslint-disable-next-line
  }, []);

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
          <UploadPost getPosts={getPosts} activeUser={activeUserInfo}/>
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
          {posts
            .map(post => {
            return (
              <Post
                contentUrl={post.content_url}
                postDescription={post.post_description}
                postUploaderId={post.post_uploader_id}
                uploadDate={post.date_created}
                postId={post.id}
              />
            )
          })}
        </div>
      </div>
    </Fragment>
  )
}

export default Feed;