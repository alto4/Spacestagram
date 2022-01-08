import React, { useState, useEffect } from 'react';
import Post from './Post';
import axios from 'axios';

const Feed = () => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    const getPosts = async () => {
      let res = await axios.get('/key');
      let apiKey = res.data.key;

      res = await axios.get(`https://api.nasa.gov/planetary/apod/?start_date=2022-01-01&api_key=${apiKey}`);
      let data = res.data;
      setPosts(data.reverse());
    };

    getPosts();
  }, []);

  return <section className='center-container'>{posts && posts.map((post) => <Post post={post} />)}</section>;
};

export default Feed;
