import React, { Fragment } from 'react'
import './Create.css'
import CreateBg from '../../images/create-main.jpg'
import SupportImg1 from '../../images/create-supporting1.jpg'
import SupportImg2 from '../../images/create-supporting2.jpg'
import SupportImg3 from '../../images/main.jpg'

export default class Create extends React.Component {
  render() {
    return (
      <Fragment>
        <div className="create-page">
          <div className="create-banner-container">
            <img id="create-banner" src={CreateBg} />
            <h1 id="create-banner-heading" className="fade-in-login">"A journey of a thousand miles must begin with a single step"</h1>
          </div>
          <h2 id="create-page-logo">BeInspired <i class="fab fa-atlassian"></i></h2>
          <div className="create-container align-left">
            <div className="img-half-container img-left">
              <img src={SupportImg2} className="img-half"/>
            </div>
            <div className="text-half">
              <h3>Inspiring Content</h3>
              <p>Our approach to Be Inspired is and will always be to promote a positive and encouragin platform that promotes imagination and creativity through content!</p>
            </div>
          </div>
          <img src={SupportImg3} class="mobile-support-img"></img>
          <div className="create-container align-right">
            <div className="text-half">
              <h3>Promoting Positivity</h3>
              <p>Our community of creators prides themselves on bringing individuals together, sharing their stories, and opening their lives up to those seeking to be inspired!</p>
            </div>
            <div className="img-half-container img-right">
              <img className="img-half" src={SupportImg1} />
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}