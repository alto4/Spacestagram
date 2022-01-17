import React, { useState, useEffect, Fragment } from 'react';
import { Navigate } from 'react-router-dom';
import Post from './Post';
import axios from 'axios';
import DateSelector from './DateSelector';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Feed = ({ search, setSearch, auth: { isAuthenticated }, logout }) => {
  const [posts, setPosts] = useState();
  const [startDate, setStartDate] = useState('2022-01-01');
  const [dateFilter, setDateFilter] = useState();
  const [filteredPosts, setFilteredPosts] = useState();

  useEffect(() => {
    const getPosts = async () => {
      let res = await axios.get('/key');
      let apiKey = res.data.key;

      res = await axios.get(`https://api.nasa.gov/planetary/apod?start_date=${startDate}&api_key=${apiKey}`);
      let data = res.data;
      setPosts(data.reverse());
    };

    getPosts();
  }, [startDate]);

  useEffect(() => {
    if (dateFilter) {
      const datedPost = posts?.filter((post) => post.date === dateFilter);
      setFilteredPosts(datedPost);
      setSearch('');
      return;
    }

    if (search?.length > 0) {
      if (dateFilter) {
        setDateFilter('');
        setFilteredPosts([]);
      }
      console.log('searching for ', search);
      let relevantPosts = posts?.filter(
        (post) =>
          post.title.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
          post.explanation.toLowerCase().indexOf(search.toLowerCase()) > -1
      );
      setFilteredPosts(relevantPosts);
    } else {
      setFilteredPosts([]);
    }

    if (!search && !dateFilter) {
      setFilteredPosts([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts, search, dateFilter]);

  useEffect(() => {}, [filteredPosts]);

  const updateDateFilter = (date) => {
    const formattedDate = date.toISOString().slice(0, 10);
    console.log('updatedDate => ', formattedDate);
    setDateFilter(formattedDate);
  };

  if (!isAuthenticated) {
    console.log('auth denied, redirect here.');
    return <Navigate replace to='/login' />;
  }

  return (
    <Fragment>
      <Navbar updateSearch={(e) => setSearch(e)} logout={logout} />
      <main>
        <section className='center-container'>
          {search?.length > 0 || dateFilter
            ? filteredPosts && filteredPosts.map((post) => <Post key={post.date} post={post} />)
            : posts && posts.map((post) => <Post key={post.date} post={post} />)}
        </section>
        <div className='right-container'>
          {dateFilter && (
            <span
              onClick={(e) => {
                setDateFilter('');
                setStartDate('2021-12-01');
              }}
            >
              Show All
            </span>
          )}
          <DateSelector updateDateFilter={updateDateFilter} />
        </div>
      </main>
    </Fragment>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Feed);
