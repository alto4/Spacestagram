import React, { useState } from 'react';
import logo from '../../assets/images/nasa_logo.png';
import { addLike, removeLike } from '../../actions/post';
import { connect } from 'react-redux';

const Post = ({ post, addLike, removeLike, likedPhotos, lastPostRef }) => {
  const [liked, setLiked] = useState(likedPhotos?.includes(post.date));

  const { title, explanation, date, url } = post;

  return (
    <div className='post-card'>
      <div className='post-header' ref={lastPostRef ? lastPostRef : null}>
        <div className='post-header-left'>
          <img src={logo} alt='' className='avatar' />
          <p>NASA</p>
        </div>
      </div>
      <div className='post-image'>
        {url.indexOf('youtube') > -1 ? (
          <iframe src={url} title={title} width='620px' height='372px' />
        ) : (
          <img src={url} alt={explanation.substring(0, 150)} />
        )}
      </div>
      <div className='post-details'>
        {liked ? (
          <i
            className='fa fa-heart fa-lg'
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
