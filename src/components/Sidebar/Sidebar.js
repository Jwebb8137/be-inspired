import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import {Link} from 'react-router-dom';

const Sidebar = (props) => {

  const [userInfo, setUserInfo] = useState("")

  const setUserData = () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUserInfo(userData)
  }

  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  }

  const logout = e => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    props.setAuth(false);
    closeNav()
    window.location = "/";
  }

  useEffect(() => {
    setUserData()
  }, []);

  if (props.isAuth) {
    return (
      <div id="mySidenav" className="sidenav">
        <div id="sidebar-menu-head" className="flex-row">
          <button className="logout-btn" onClick={logout}>Logout</button>
          <span className="closebtn" onClick={closeNav}><i class="far fa-window-close"></i></span>
        </div>
        <a href={`https://be-inspired-master.vercel.app/User/${userInfo ? userInfo.id : ""}`}><img src={userInfo ? userInfo.profile_img_url : ""} id="nav-profile"/></a>
        <p id="nav-support-text">{userInfo ? userInfo.username : ""}</p>
        <Link to="/" onClick={closeNav} ><span className="side-link">Account</span></Link>
        <Link to="/Feed" onClick={closeNav}><span className="side-link">Browse</span></Link>
        <Link to="/Login" onClick={closeNav}><span className="side-link">Login</span></Link>
        <Link to="/Create" onClick={closeNav}><span className="side-link">About</span></Link>
        <div id="responsive-nav-logo" className="navigation-logo"><i class="fab fa-atlassian"></i></div>
      </div>
    )
  }

  return (
    <div id="mySidenav" className="sidenav">
      <div id="sidebar-menu-head" className="flex-row">
        <Link to="/Login" onClick={closeNav} className="logout-btn">Login</Link>
        <span className="closebtn" onClick={closeNav}><i class="far fa-window-close"></i></span>
      </div>
      <i id="nav-profile" className="fab fa-atlassian mb-icon"></i>
      <Link to="/" onClick={closeNav} ><span className="side-link">Account</span></Link>
      <Link to="/Feed" onClick={closeNav}><span className="side-link">Browse</span></Link>
      <Link to="/Login" onClick={closeNav}><span className="side-link">Login</span></Link>
      <Link to="/Create" onClick={closeNav}><span className="side-link">About</span></Link>
      <div id="responsive-nav-logo" className="navigation-logo">- Be Inspirational -</div>
    </div>
  )
}

export default Sidebar;