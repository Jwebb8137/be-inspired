import React, { Fragment } from 'react';
import Video1 from '../../images/video.mp4';
import './Post.css';

const Post = props => {
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
                  <span id="post-comments">4 Comments <i class="fas fa-comment"></i></span>
                  <span id="post-likes">8 <i class="fas fa-thumbs-up"></i></span>
                </div>
            </div>
        </Fragment>
    )
}

export default Post;
