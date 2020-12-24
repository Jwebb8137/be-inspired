import React from 'react'
import './Footer.css'
import Logo from '../../images/icon.jpg'

const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="icon-container">
        <i className="fab fa-facebook"></i>
        <i className="fab fa-instagram"></i>
        <i className="fab fa-twitter"></i>
      </div>
      <div className="footer-copyright">© 2020 Copyright:
        <a href="/"> BeInspired.com</a>
        <img id="footer-logo" src={Logo} />
      </div>
    </footer>
  )
}

export default Footer;