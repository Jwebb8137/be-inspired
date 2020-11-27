import React from 'react';
import './Sidebar.css';
import {Link} from 'react-router-dom';

const Sidebar = (props) => {

  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  }

  return (
    <div id="mySidenav" className="sidenav">
      <i id="nav-profile" className="fas fa-user-circle"></i>
      <p id="nav-support-text">Joshua Webb</p>
      <span className="closebtn" onClick={closeNav}><i class="far fa-window-close"></i></span>
      <Link to="/" onClick={closeNav} ><span className="side-link">Account</span></Link>
      <Link to="/Feed" onClick={closeNav}><span className="side-link">Browse</span></Link>
      <Link to="/Login" onClick={closeNav}><span className="side-link">Login</span></Link>
      <Link to="/Create" onClick={closeNav}><span className="side-link">About</span></Link>
      <div id="responsive-nav-logo" className="navigation-logo"><i class="fab fa-atlassian"></i></div>
    </div>
  )
}

export default Sidebar;