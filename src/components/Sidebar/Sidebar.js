import React, { useState, useEffect } from 'react'
import './Sidebar.css'
import config from '../../config'
import {Link} from 'react-router-dom'

const Sidebar = (props) => {

  const [userInfo, setUserInfo] = useState("")

  const setUserData = () => {
    const userData = JSON.parse(localStorage.getItem('user'))
    setUserInfo(userData)
  }

  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0"
  }

  const logout = e => {
    e.preventDefault()
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    props.setAuth(false)
    closeNav()
    window.location.assign("/#")
  }

  const deleteAccount = async () => {
    const { API_ENDPOINT } = config;
    try {
      await fetch (`${API_ENDPOINT}/users/${userInfo.id}`, {
        method: 'DELETE'
      });
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      props.setAuth(false)  
      window.location.assign("/#")
    } catch (err) {
        console.error(err)
    }
  }

  useEffect(() => {
    setUserData()
  }, [])

  if (props.isAuth) {
    const userLink = userInfo ? userInfo.id : ""
    const username = userInfo ? userInfo.username: ""
    const userImg = userInfo ? userInfo.profile_img_url : ""
    return (
      <div id="mySidenav" className="sidenav">
        <div id="sidebar-menu-head" className="flex-row">
          <button className="logout-btn" onClick={logout}>Logout</button>
          <span className="closebtn" onClick={closeNav}><i className="far fa-window-close"></i></span>
        </div>
        <a href={`https://be-inspired.vercel.app/User/${userLink}`} onClick={closeNav}><img src={userImg} id="nav-profile"/></a>
        <p id="nav-support-text">{username}</p>
        <a href={`https://be-inspired.vercel.app/User/${userLink}`} onClick={closeNav}><span className="side-link">My Profile</span></a>
        <Link to="/Feed" onClick={closeNav}><span className="side-link">Browse</span></Link>
        <Link to="/" onClick={closeNav}><span className="side-link">Home</span></Link>
        <Link to="/Create" onClick={closeNav}><span className="side-link">About</span></Link>
        <button id="delete-account-btn" onClick={deleteAccount}>Delete Account</button>
        <div id="responsive-nav-logo" className="navigation-logo">{<i className="fab fa-atlassian"></i>}</div>
      </div>
    )
  }

  return (
    <div id="mySidenav" className="sidenav">
      <div id="sidebar-menu-head" className="flex-row">
        <Link to="/Login" onClick={closeNav} className="logout-btn">Login</Link>
        <span className="closebtn" onClick={closeNav}><i className="far fa-window-close"></i></span>
      </div>
      <i id="nav-profile" className="fab fa-atlassian mb-icon"></i>
      <Link to="/Feed" onClick={closeNav}><span className="side-link">Browse</span></Link>
      <Link to="/" onClick={closeNav}><span className="side-link">Home</span></Link>
      <Link to="/Create" onClick={closeNav}><span className="side-link">About</span></Link>
      <div id="responsive-nav-logo" className="navigation-logo">- Be Inspirational -</div>
    </div>
  )
}

export default Sidebar