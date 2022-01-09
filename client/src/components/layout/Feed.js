import React, { useState, useEffect, Fragment } from 'react';
import Post from './Post';
import axios from 'axios';
import DateSelector from './DateSelector';

const Feed = ({ search, setSearch }) => {
  const [posts, setPosts] = useState();
  const [dateFilter, setDateFilter] = useState();
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
      console.log('searching for ', search);
      let relevantPosts = posts?.filter(
        (post) =>
          post.title.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
          post.explanation.toLowerCase().indexOf(search.toLowerCase()) > -1
      );
      console.log(relevantPosts);
      setFilteredPosts(relevantPosts);
    }
    if (dateFilter) {
      setFilteredPosts(posts?.filter((post) => post.date === dateFilter));
      console.log('filtered posts => ', filteredPosts);
    }
    if (!search && !dateFilter) {
      setFilteredPosts([]);
    }
  }, [posts, search, dateFilter]);

  useEffect(() => {}, [filteredPosts]);

  const updateDateFilter = (date) => {
    const formattedDate = date.toISOString().slice(0, 10);
    console.log('updatedDate => ', formattedDate);
    setDateFilter(formattedDate);
  };

  return (
    <Fragment>
      <main>
        <section className='center-container'>
          {search?.length > 0
            ? filteredPosts && filteredPosts.map((post) => <Post key={post.date} post={post} />)
            : posts && posts.map((post) => <Post key={post.date} post={post} />)}
        </section>
        <div className='right-container'>
          <i className='fa fa-calendar'></i>
          <DateSelector updateDateFilter={updateDateFilter} />
        </div>
      </main>
    </Fragment>
  );
};

export default Feed;
