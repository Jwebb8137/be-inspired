import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';

const Navbar = (props) => {

  const openNav = () => {
    document.getElementById("mySidenav").style.width = "100vw";
  }

  const closeNav = e => {    
    document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'))
    e.target.classList.add('active')
    document.getElementById("mySidenav").style.width = "0";
  }

  return (
    <Fragment>
      <div className='navigation fade-in'>
        <Link to="/" onClick={e => closeNav(e)}><div className="navigation-logo">BeInspired <i class="fab fa-atlassian"></i></div></Link>
        <div className='nav-link-container'>
          <ul>
            <Link to='/' onClick={e => closeNav(e)}><li className='nav-link'>Home</li></Link>
            <Link to='/Feed' onClick={e => closeNav(e)}><li className='nav-link'>Discover</li></Link>
            <Link to='/Create' onClick={e => closeNav(e)}><li className='nav-link'>About</li></Link>
            <li id="account-bubble" onClick={openNav}><i class="fas fa-user-astronaut"></i></li>
          </ul>
        </div>
      </div>
    </Fragment>
  )
}

export default Navbar;