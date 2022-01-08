import React from 'react';

const Post = () => {
  return (
    <div className='post-card'>
      <div className='post-header'>
        <div className='post-header-left'>
          <p>NASA Avatar</p>
          <p>NASA</p>
        </div>

        <i className='fa fa-more'></i>
      </div>
      <div className='post-image'>
        <img
          src='https://images.pexels.com/photos/220201/pexels-photo-220201.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
          alt=''
        />
      </div>
      <div className='post-details'>
        <i className='fa fa-like'></i>
        <div className='post-description'>
          <p>
            <span className='date'>January 5. 2022</span> Starlink is the name of a satellite network developed by the
            private spaceflight company SpaceX to provide low-cost internet to remote locations. SpaceX eventually hopes
            to have as many as 42,000 satellites in this so-called megaconstellation.{' '}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Post;
