import React, { Fragment, useState, useEffect } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import config from '../../config';
import Profile from '../../images/profile.jpg';
import './Post.css';

const Post = props => {

  const [likes, setLikes] = useState("0")
  const [avatar, setAvatar] = useState("")
  const [userInfo, setUserInfo] = useState({})
  const [fillLike, setFillLike] = useState("far")
  const [postComment, setPostComment] = useState("")
  const [commentDescription, setCommentDescription] = useState("")
  const [commentList, setCommentList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [disabledButton, setDisabledButton] = useState(false)
  const { API_ENDPOINT } = config;

  const getLikes = async () => {
    try {   
      const response = await fetch(`${API_ENDPOINT}/likes/${props.postId}`);
      const jsonData = await response.json();


      setLikes(jsonData.length);
      setIsLoading(false)
    } catch (err) {
        console.error(err.message)
    }
  }

  const getComments = async () => {
    try {   
      const response = await fetch(`${API_ENDPOINT}/comments/${props.postId}`);
      const jsonData = await response.json();
      setCommentList(jsonData)
    } catch (err) {
        console.error(err.message)
    }
  }

  const getAvatar = async () => {
    try {   
      const response = await fetch(`${API_ENDPOINT}/users/${props.postUploaderId}`);
      const jsonData = await response.json();
      setAvatar(jsonData.profile_img_url)
      console.log(jsonData)
    } catch (err) {
        console.error(err.message)
    }
  }

  const postCommentDescription = e => {
    setCommentDescription(e.target.value)
    setPostComment(e.target.value)
  }

  const addComment = async (e) => {
    e.preventDefault()
    const { API_ENDPOINT } = config;

    try {
        const post_id = props.postId
        const comment = postComment
        const user_id = 1
        const body = { post_id, comment, user_id };
        const newCommentList = [...commentList, body]
        setCommentList(newCommentList)
        setCommentDescription("Add another comment?")
    
        await fetch (`${API_ENDPOINT}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
      } catch (err) {
          console.error(err);
    }

  }

  const addLike = async (e) => {
    if (disabledButton) {
      return
    }
    console.log('adding like')   
    const { API_ENDPOINT } = config;

    try {
        setDisabledButton(true)
        setFillLike("fas")
        setLikes(likes+1)
        const post_id = props.postId
        const post_user_like_id = 1
        const body = { post_id, post_user_like_id };
    
        await fetch (`${API_ENDPOINT}/likes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
      } catch (err) {
          console.error(err);
    }
  }

  useEffect(() => {
    getLikes()
    getComments()
    getAvatar()
    // eslint-disable-next-line
  }, []);

  const showComments = () => {
    document.getElementById(`comment-container-${props.postId}`).style.display = document.getElementById(`comment-container-${props.postId}`).style.display == 'none' ? 'block' : 'none';
  }

  if (!props.contentUrl) {
    return (
      <Fragment>
        <div className="post-container">
          <div className="post-header">
            <img src={avatar} id="post-avatar" />
            <span id="post-date">
              <Moment format='MMMM Do YYYY, h:mm a'>{props.uploadDate}</Moment>
            </span>
          </div>
          <p className="post-description-text text-alt">" {props.postDescription} "</p>
          <div className="post-footer">
            <span id="post-comments" onClick={showComments}>{commentList.length} Comments <i class="fas fa-sort-down"></i></span>
            <div id="post-likes">
              {likes} likes 
              <button className="like-button" disabled={disabledButton} onClick={addLike}><i class={`${fillLike} fa-heart`}></i></button>
            </div>
          </div>
          <div id={`comment-container-${props.postId}`} className="comment-container" style={{display: 'none'}}>
            <form className="comment-form-submit" onSubmit={e => addComment(e)}>
              <input typeof="text" value={commentDescription} onChange={e => postCommentDescription(e)} placeholder="Type a comment"/>
              <button typeof="submit" className="comment-submit-btn">Submit</button>
            </form>
            {commentList
              .map(comment => {
              return (
                <div className="comment">
                  <span id="comment-date">
                    <Moment format='MMMM Do YYYY, h:mm a'>{comment.date_commented}</Moment>
                  </span>
                  <img className="comment-profile-img" src={Profile} />
                  <p>{comment.comment}</p>
                </div>
              )
            })}
          </div>
        </div>
      </Fragment>
    )
  }

  return (
      <Fragment>
          <div className="post-container">
              <div className="post-header">
                <img src={avatar} id="post-avatar" />
                <span id="post-date">
                  <Moment format='MMMM Do YYYY, h:mm a'>{props.uploadDate}</Moment>
                </span>
              </div>
              {/* <video className="post-video" controls loop>
                  <source src={props.contentUrl} type="video/mp4" />
              </video>  */}
              <img src={props.contentUrl} className="post-image" /> 
              <p className="post-description text-alt">" {props.postDescription} "</p>
              <div className="post-footer">
                <div className="post-comments-container">
                  <span id="post-comments" onClick={showComments}>{commentList.length} Comments <i class="fas fa-sort-down"></i></span>
                </div>
                <div id="post-likes">
                  {likes} likes 
                  <button className="like-button" disabled={disabledButton} onClick={addLike}><i class={`${fillLike} fa-heart`}></i></button>
                </div>              
              </div>
              <div id={`comment-container-${props.postId}`} className="comment-container" style={{display: 'none'}}>
                <form className="comment-form-submit" value={commentDescription} onSubmit={e => addComment(e)}>
                  <input typeof="text" value={commentDescription} onChange={e => postCommentDescription(e)} placeholder="Type a comment"/>
                  <button typeof="submit" className="comment-submit-btn">Submit</button>
                </form>
                {commentList
                  .map(comment => {
                  return (
                    <div className="comment">
                      <span id="comment-date">
                        <Moment format='MMMM Do YYYY, h:mm a'>{comment.date_commented}</Moment>
                      </span>
                      <img className="comment-profile-img" src={Profile} />
                      <p>{comment.comment}</p>
                    </div>
                  )
                })}
              </div>
          </div>
      </Fragment>
  )
}

export default Post;
