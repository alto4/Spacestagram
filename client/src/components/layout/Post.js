import React from 'react';
import logo from '../../assets/images/nasa_logo.png';

const Post = ({ post }) => {
  const { title, explanation, date, url } = post;

  return (
    <div className='post-card'>
      <div className='post-header'>
        <div className='post-header-left'>
          <img src={logo} alt='' className='avatar' />
          <p>NASA</p>
        </div>

        <i className='fa fa-ellipsis-h'></i>
      </div>
      <div className='post-image'>
        <img src={url} alt={explanation.substring(0, 150)} />
      </div>
      <div className='post-details'>
        <i className='far fa-heart fa-lg' style={{ color: 'red' }}></i>
        {/* <i class='fa fa-heart' style={{ color: 'red' }}></i> */}
        <div>
          <p>
            <span className='date'>{date}</span> <span className='title'>"{title}"</span>
          </p>
          <p className='post-description'>{explanation}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
