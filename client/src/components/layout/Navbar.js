import React from 'react';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='center-container'>
        <h1 className='logo-text'>Spacestagram</h1>
        <div className='searchbar'>
          <input type='text' placeholder='Search' className='searchbar' />
        </div>
      </div>
      <div className='right-container'>
        <p>User avatar</p>
      </div>
    </nav>
  );
};

export default Navbar;
