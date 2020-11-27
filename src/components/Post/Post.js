import React, { Fragment } from 'react';
import Video1 from '../../images/video.mp4';
import Profile from '../../images/profile.jpg';
import './Post.css';

const Post = props => {
    const showComments = () => {
      document.getElementById('comment-container-1').style.display = document.getElementById('comment-container-1').style.display == 'none' ? 'block' : 'none';
    }
    return (
        <Fragment>
            <div className="post-container">
                <div className="post-header">
                  <span id="post-avatar"><i class="fas fa-user-circle"></i> Dylan Scott</span>
                  <span id="post-date">November 11th, 2020</span>
                </div>
                <video className="post-video" controls loop>
                    <source src={Video1} type="video/mp4" />
                </video>    
                <p className="post-description text-alt">Just caught the sickest swell off of the coast of Bermuda! Watch the video and give me a like for more!</p>
                <div className="post-footer">
                  <span id="post-comments" onClick={showComments}>1 Comments <i class="fas fa-comment"></i></span>
                  <span id="post-likes">8 <i class="fas fa-thumbs-up"></i></span>
                </div>
                <div id="comment-container-1" className="comment-container" style={{display: 'none'}}>
                  <form className="comment-form-submit">
                    <input typeof="text" placeholder="Type a comment"/>
                    <button className="comment-submit-btn">Submit</button>
                  </form>
                  <div className="comment">
                    <img className="comment-profile-img" src={Profile} />
                    <p>This is an example comment with some example text and is filling space right here.</p>
                  </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Post;
