import React, { useState, useEffect } from 'react';
import logo from '../../assets/images/nasa_logo.png';
import { addLike, removeLike } from '../../actions/post';
import { connect } from 'react-redux';

const Post = ({ post, addLike, removeLike, likedPhotos }) => {
  const [liked, setLiked] = useState(likedPhotos?.includes(post.date));

  const { title, explanation, date, url } = post;

  console.log('likedPosts detected in post component => ', likedPhotos);
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
        {liked ? (
          <i
            class='fa fa-heart fa-lg'
            onClick={() => {
              removeLike(date);
              setLiked(false);
            }}
            style={{ color: 'red' }}
          ></i>
        ) : (
          <i
            className='far fa-heart fa-lg'
            onClick={() => {
              addLike(date);
              setLiked(true);
            }}
            style={{ color: 'red' }}
          ></i>
        )}
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

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike })(Post);
