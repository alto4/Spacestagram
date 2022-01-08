import React from 'react';
import avatar from '../../assets/images/nasa_logo.png';

const Navbar = ({ updateSearch }) => {
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
      <div className='right-container'>
        <img src={avatar} alt='' className='avatar' />
      </div>
    </nav>
  );
};

export default Navbar;
