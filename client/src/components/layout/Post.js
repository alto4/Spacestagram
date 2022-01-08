import React from 'react';

const Post = ({ post }) => {
  const { title, explanation, date, url } = post;

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
        <img src={url} alt={explanation.substring(0, 150)} />
      </div>
      <div className='post-details'>
        <i className='fa fa-like'></i>
        <div className='post-description'>
          <p>
            <span className='date'>{date}</span> {explanation}.{' '}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Post;
