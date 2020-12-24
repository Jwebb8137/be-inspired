import React from 'react'
import './Footer.css'
import Logo from '../../images/icon.jpg'

const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="footer-copyright">© 2020 Copyright:
        <a href="/"> BeInspired.com</a>
        <img id="footer-logo" src={Logo} />
      </div>
    </footer>
  )
}

export default Footer;