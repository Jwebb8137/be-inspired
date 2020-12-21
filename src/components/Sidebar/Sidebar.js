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
  }

  useEffect(() => {
    setUserData()
    console.log(props.isAuth)
  }, []);

  if (props.isAuth) {
    const userLink = userInfo ? userInfo.id : ""
    const username = userInfo ? userInfo.username: ""
    const userImg = userInfo ? userInfo.profile_img_url : ""
    return (
      <div id="mySidenav" className="sidenav">
        <div id="sidebar-menu-head" className="flex-row">
          <button className="logout-btn" onClick={logout}>Logout</button>
          <span className="closebtn" onClick={closeNav}><i class="far fa-window-close"></i></span>
        </div>
        <a href={`https://be-inspired-master.vercel.app/User/${userLink}`} onClick={closeNav}><img src={userImg} id="nav-profile"/></a>
        <p id="nav-support-text">{username}</p>
        <a href={`https://be-inspired-master.vercel.app/User/${userLink}`} onClick={closeNav}><span className="side-link">My Profile</span></a>
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
      <Link to="/Login" onClick={closeNav} ><span className="side-link">My Profile</span></Link>
      <Link to="/Feed" onClick={closeNav}><span className="side-link">Browse</span></Link>
      <Link to="/Login" onClick={closeNav}><span className="side-link">Login</span></Link>
      <Link to="/Create" onClick={closeNav}><span className="side-link">About</span></Link>
      <div id="responsive-nav-logo" className="navigation-logo">- Be Inspirational -</div>
    </div>
  )
}

export default Sidebar;