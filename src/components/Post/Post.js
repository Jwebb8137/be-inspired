import React, { Fragment, useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'
import Comments from '../Comments/Comments'
import 'moment-timezone'
import config from '../../config'
import Profile from '../../images/profile.jpg'
import './Post.css'
import { render } from '@testing-library/react'

const Post = props => {

  const [avatar, setAvatar] = useState("")
  const [userInfo, setUserInfo] = useState({})
  const [commentsNum, setCommentsNum] = useState(0)
  const [disabledButton, setDisabledButton] = useState(false)
  const [likes, setLikes] = useState("0")
  const [commentList, setCommentList] = useState([])
  const [fillLike, setFillLike] = useState("far")
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { API_ENDPOINT } = config

  useEffect(() => {
    getAvatar()
    getLikes()
    setUserData()
    // eslint-disable-next-line
  }, []);

  const setUserData = () => {
    const userData = JSON.parse(localStorage.getItem('user'))
    setUserInfo(userData)
  }

  const getCommentsNum = (num) => {
    setCommentsNum(num)
  }

  const addLike = async (e) => {
    const { API_ENDPOINT } = config
    try {
      if (disabledButton) {
        setDisabledButton(false)
        setFillLike("far")
        setLikes(likes-1)
        return
      }
      setDisabledButton(true)
      setFillLike("fas")
      setLikes(likes+1)
      const post_id = props.postId
      const post_user_like_id = userInfo.id
      const body = { post_id, post_user_like_id }
  
      await fetch (`${API_ENDPOINT}/likes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
      });
      } catch (err) {
          console.error(err);
    }
  }

  const getLikes = async () => {
    try {   
      const response = await fetch(`${API_ENDPOINT}/likes/${props.postId}`)
      const jsonData = await response.json()
      setLikes(jsonData.length)
      setIsLoading(false)
    } catch (err) {
        console.error(err.message)
    }
  }

  const getAvatar = async () => {
    try {   
      const response = await fetch(`${API_ENDPOINT}/users/${props.postUploaderId}`)
      const jsonData = await response.json()
      setAvatar(jsonData.profile_img_url)
    } catch (err) {
        console.error(err.message)
    }
  }

  const showComments = () => {
    document.getElementById(`comment-container-${props.postId}`).style.display = document.getElementById(`comment-container-${props.postId}`).style.display == 'none' ? 'block' : 'none'
  }

  const updateFeed = (props, id) => {
    props.deletePostUpdate(id)
  }

  const deletePost = async () => {
    setIsDeleting(true)
    const { API_ENDPOINT } = config
    try {
      await fetch (`${API_ENDPOINT}/posts/delete/${props.postId}`, {
        method: 'DELETE',
      });
      } catch (err) {
        console.error(err)
    }
    props.deletePostUpdate(props.postId)
    setIsDeleting(false)
  }

  const deletePostBtn = (props.postUploaderId == userInfo.id) ? <span id="post-delete" onClick={deletePost}>Delete <i class="fas fa-trash-alt"></i></span> : null

  const userProfile = `/User/${props.postUploaderId}`

  if (isDeleting) {
    return (
      <Fragment>
        <div id="deleting-post-container" className="upload-container fa-3x">
          <i class="fas fa-spinner fa-pulse"></i>
        </div>
      </Fragment>
    )
  }

  if (props.contentUrl.includes("mp4")) {
    return (
      <Fragment>
        <div className="post-container">
          {deletePostBtn}
          <div className="post-header">
            <Link to={userProfile}><img src={avatar} id="post-avatar" /><span>{props.username}</span></Link>
            <span id="post-date">
              <Moment format='MMMM Do YYYY, h:mm a'>{props.uploadDate}</Moment>
            </span>
          </div>
          <div className="post-img-container">
          <video id="post-video" controls>
            <source src={props.contentUrl} type="video/webm" /> 
            <source src={props.contentUrl} type="video/ogg" /> 
            <source src={props.contentUrl} type="video/mp4" />
            <source src={props.contentUrl} type="video/3gp" />
          </video>
          </div>
          <p id="video-description" className="post-description text-alt"> {props.postDescription} </p>
          <div className="post-footer">
            <div className="post-comments-container">
              <span id="post-comments" onClick={showComments}>{commentsNum} Comments <i class="fas fa-sort-down"></i></span>
            </div>
            <div id="post-likes">
              {likes} likes 
              <button className="like-button" onClick={addLike}><i class={`${fillLike} fa-heart`}></i></button>
            </div>              
          </div>
          <div id={`comment-container-${props.postId}`} className="comment-container" style={{display: 'none'}}>
          <Comments 
            getCommentsNum={getCommentsNum}
            postId={props.postId}
            postUploaderId={props.postUploaderId}
          />
          </div>
        </div>
      </Fragment>
    )
  }

  if (!props.contentUrl) {
    return (
      <Fragment>
        <div className="post-container">
          {deletePostBtn}
          <div className="post-header">
            <Link to={userProfile}><img src={avatar} id="post-avatar" /><span>{props.username}</span></Link>
            <span id="post-date">
              <Moment format='MMMM Do YYYY, h:mm a'>{props.uploadDate}</Moment>
            </span>
          </div>
          <p className="post-description-text text-alt"> {props.postDescription} </p>
          <div className="post-footer">
            <span id="post-comments" onClick={showComments}>{commentsNum} Comments <i class="fas fa-sort-down"></i></span>
            <div id="post-likes">
              {likes} likes 
              <button className="like-button" onClick={addLike}><i class={`${fillLike} fa-heart`}></i></button>
            </div>
          </div>
          <div id={`comment-container-${props.postId}`} className="comment-container" style={{display: 'none'}}>
            <Comments 
              postId={props.postId}
              getCommentsNum={getCommentsNum}
              postUploaderId={props.postUploaderId}
            />
          </div>
        </div>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <div className="post-container">
        {deletePostBtn}
        <div className="post-header">
          <Link to={userProfile}><img src={avatar} id="post-avatar" /><span>{props.username}</span></Link>
          <span id="post-date">
            <Moment format='MMMM Do YYYY, h:mm a'>{props.uploadDate}</Moment>
          </span>
        </div>
        <div className="post-img-container">
          <img src={props.contentUrl} className="post-image" /> 
        </div>
        <p className="post-description text-alt"> {props.postDescription} </p>
        <div className="post-footer">
          <div className="post-comments-container">
            <span id="post-comments" onClick={showComments}>{commentsNum} Comments <i class="fas fa-sort-down"></i></span>
          </div>
          <div id="post-likes">
            {likes} likes 
            <button className="like-button" onClick={addLike}><i class={`${fillLike} fa-heart`}></i></button>
          </div>              
        </div>
        <div id={`comment-container-${props.postId}`} className="comment-container" style={{display: 'none'}}>
        <Comments 
          getCommentsNum={getCommentsNum}
          postId={props.postId}
          postUploaderId={props.postUploaderId}
        />
        </div>
      </div>
    </Fragment>
  )
}

export default Post
