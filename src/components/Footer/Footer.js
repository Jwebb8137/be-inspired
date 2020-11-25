import React from 'react';
import './Footer.css';

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
      </div>
    </footer>
  )
}

export default Footer;