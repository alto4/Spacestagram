import React from 'react';
import avatar from '../../assets/images/nasa_logo.png';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ updateSearch, logout }) => {
  return (
    <nav className='navbar'>
      <div className='center-container'>
        <h1 className='logo-text'>Spacestagram</h1>
        <div className='searchbar'>
          <input
            type='text'
            placeholder='Search'
            className='searchbar'
            onChange={(e) => updateSearch(e.target.value)}
          />
        </div>
      </div>
      <div className='right-container' onClick={logout}>
        <img src={avatar} alt='' className='avatar' />
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(Navbar);
