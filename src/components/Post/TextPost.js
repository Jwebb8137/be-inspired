import React, { Fragment } from 'react'

const TextPost = props => {
  return (
    <Fragment>
      <div className="post-container">
        <div className="post-header">
          <span id="post-avatar"><i className="fas fa-user-circle"></i> Elizabeth M.</span>
          <span id="post-date">November 20th, 2020</span>
        </div>   
        <p className="post-description text-alt">Life is but a dream! Don't you think it's about time you get out and start living it?</p>
        <div className="post-footer">
          <span id="post-comments">2 Comments <i className="fas fa-comment"></i></span>
          <span id="post-likes">3 <i className="fas fa-thumbs-up"></i></span>
        </div>
      </div>
    </Fragment>
  )
}

export default TextPost