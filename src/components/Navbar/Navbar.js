import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {

  const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  }

  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  }

  return (
    <Fragment>
      <div className='navigation fade-in'>
        <Link to="/" onClick={closeNav}><div className="navigation-logo">BeInspired <i class="fab fa-atlassian"></i></div></Link>
        <div className='nav-link-container'>
          <ul>
            <Link to='/' onClick={closeNav}><li className='nav-link active'>Inspire</li></Link>
            <Link to='/Feed' onClick={closeNav}><li className='nav-link'>Discover</li></Link>
            <Link to='' onClick={closeNav}><li className='nav-link'>Create</li></Link>
            <li id="account-bubble" onClick={openNav}><i class="fas fa-user-astronaut"></i></li>
          </ul>
        </div>
      </div>
    </Fragment>
  )
}

export default Navbar;