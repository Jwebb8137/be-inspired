import React from 'react'
import './Footer.css'
import Logo from '../../images/icon.png'

const Footer = () => {
  return (
    <footer class="page-footer">
      <div className="icon-container">
        <i class="fab fa-facebook"></i>
        <i class="fab fa-instagram"></i>
        <i class="fab fa-twitter"></i>
      </div>
      <div class="footer-copyright">© 2020 Copyright:
        <a href="/"> BeInspired.com</a>
        <img id="footer-logo" src={Logo} />
      </div>
    </footer>
  )
}

export default Footer;