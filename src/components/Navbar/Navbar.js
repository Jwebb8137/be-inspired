import React, { Fragment } from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'

const Navbar = (props) => {
  const openNav = () => {
    document.getElementById("mySidenav").style.width = "100vw"
  }

  const closeNav = e => {    
    document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'))
    e.target.classList.add('active')
    document.getElementById("mySidenav").style.width = "0"
  }

  return (
    <Fragment>
      <div className='navigation fade-in'>
        <Link to="/" onClick={e => closeNav(e)}><div className="navigation-logo">BeInspired <i className="fab fa-atlassian"></i></div></Link>
        <div className='nav-link-container'>
          <div>
            <Link to='/' onClick={e => closeNav(e)}><span className='nav-link'>Home</span></Link>
            <Link to='/Feed' onClick={e => closeNav(e)}><span className='nav-link'>Discover</span></Link>
            <Link to='/Create' onClick={e => closeNav(e)}><span className='nav-link'>About</span></Link>
            <span id="account-bubble" onClick={openNav}><i className="fas fa-user-astronaut"></i></span>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Navbar;