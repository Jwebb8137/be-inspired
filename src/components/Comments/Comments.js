import React, { Fragment, useState, useEffect } from 'react'
import './Comments.css'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'
import config from '../../config'

const Comments = props => {
  const [userInfo, setUserInfo] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [postComment, setPostComment] = useState("")
  const [likes, setLikes] = useState("0")
  const [fillLike, setFillLike] = useState("far")
  const [avatar, setAvatar] = useState("")
  const [commentDescription, setCommentDescription] = useState("")
  const [commentList, setCommentList] = useState([])
  const [commentUser, setCommentUser] = useState([])
  const { API_ENDPOINT } = config;

  useEffect(() => {
    getComments()
    getAvatar()
    setUserData()
    // eslint-disable-next-line
  }, []);

  const setUserData = () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUserInfo(userData)
  }

  const addComment = async (e) => {
    e.preventDefault()
    const { API_ENDPOINT } = config;
    try {
        const post_id = props.postId
        const comment = commentDescription
        const user_id = userInfo.id
        const user_img_url = userInfo.profile_img_url
        const username = userInfo.username
        const body = { post_id, comment, user_id, user_img_url, username };
        const newCommentList = [...commentList, body]
        setCommentList(newCommentList)
        setCommentDescription("")
        props.getCommentsNum(newCommentList.length)
    
        await fetch (`${API_ENDPOINT}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
      } catch (err) {
          console.error(err);
    }

  }

  const getComments = async () => {
    try {   
      const response = await fetch(`${API_ENDPOINT}/comments/${props.postId}`);
      const jsonData = await response.json();
      setCommentList(jsonData)
      if (jsonData.length > 0) {
        props.getCommentsNum(jsonData.length)
      }
    } catch (err) {
        console.error(err.message)
    }
  }

  const getCommentUser = async (userId) => {
    try {   
      const response = await fetch(`${API_ENDPOINT}/users/${userId}`);
      const jsonData = await response.json();
      setCommentUser(jsonData)
    } catch (err) {
        console.error(err.message)
    }
  }

  const getAvatar = async () => {
    try {   
      const response = await fetch(`${API_ENDPOINT}/users/${props.postUploaderId}`);
      const jsonData = await response.json();
      setAvatar(jsonData.profile_img_url)
    } catch (err) {
        console.error(err.message)
    }
  }

  const postCommentDescription = e => {
    setCommentDescription(e.target.value)
  }

  return (
    <Fragment>
      <form className="comment-form-submit" onSubmit={e => addComment(e)}>
        <input typeof="text" value={commentDescription} onChange={e => postCommentDescription(e)} placeholder="Type a comment"/>
        <button typeof="submit" className="comment-submit-btn">Submit</button>
      </form>
      {commentList
        .map(comment => {
          const userProfile = `https://be-inspired-master.vercel.app/User/${comment.user_id}`
          return (
            <div className="comment">
              <span id="comment-date">
                <Moment format='MMMM Do YYYY, h:mm a'>{comment.date_commented}</Moment>
              </span>
              <a href={userProfile}><img src={comment.user_img_url} className="comment-profile-img"/></a>
              <div className="column-flex">
                <p id="comment-username">{comment.username}</p>
                <p id="comment-description">{comment.comment}</p>
              </div>                
            </div>
          )
        }
      )}
    </Fragment>
  )
}

export default Comments