import React, { useState, useEffect } from 'react';
import Post from './Post';
import axios from 'axios';

const Feed = ({ search }) => {
  const [posts, setPosts] = useState();
  const [filteredPosts, setFilteredPosts] = useState();

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

  useEffect(() => {
    if (search?.length > 0) {
      let relevantPosts = posts?.filter(
        (post) =>
          post.title.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
          post.explanation.toLowerCase().indexOf(search.toLowerCase()) > -1
      );
      console.log(relevantPosts);
      setFilteredPosts(relevantPosts);
    } else {
      setFilteredPosts([]);
    }
  }, [posts, search]);

  return (
    <section className='center-container'>
      {search?.length > 0
        ? filteredPosts && filteredPosts.map((post) => <Post key={post.date} post={post} />)
        : posts && posts.map((post) => <Post key={post.date} post={post} />)}
    </section>
  );
};

export default Feed;
