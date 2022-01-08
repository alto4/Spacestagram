import React from 'react';
import Post from './Post';

const Feed = () => {
  let posts = [{}, {}, {}];
  return (
    <section className='center-container'>
      {posts.map((post) => (
        <Post />
      ))}
    </section>
  );
};

export default Feed;
