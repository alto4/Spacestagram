import React, { useState, useEffect, useRef, useCallback, useLayoutEffect, Fragment } from 'react';
import { Navigate } from 'react-router-dom';
import Post from './Post';
import axios from 'axios';
import DateSelector from './DateSelector';
import spinner from '../../assets/spinner.png';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import './Feed.css';

const Feed = ({ search, setSearch, auth: { isAuthenticated }, logout, auth }) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState();
  const [startDate, setStartDate] = useState(moment().subtract(10, 'days').format('YYYY-MM-DD'));
  const [dateFilter, setDateFilter] = useState();
  const [filteredPosts, setFilteredPosts] = useState();
  const [likedPhotos, setLikedPhotos] = useState([]);

  const observer = useRef();
  const lastPostRef = useCallback(
    (lastPostRef) => {
      if (loading) {
        return;
      }

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting) {
          // Request 10 more days of posts
          let currentStart = moment(startDate);
          let newStart = moment(currentStart, 'YYYY-MM-DD').subtract(10, 'days').format('YYYY-MM-DD');

          setStartDate(newStart);
        }
      });

      if (lastPostRef) {
        observer.current.observe(lastPostRef);
      }
    },
    [loading, startDate]
  );

  useEffect(() => {
    setLikedPhotos(likes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user]);
  const likes = auth.user?.likedPhotos;

  useEffect(() => {
    const getPosts = async () => {
      let res = await axios.get('/key');
      let apiKey = res.data.key;

      console.log('Date filter => ', dateFilter);

      setLoading(true);

      if (dateFilter) {
        res = await axios.get(`https://api.nasa.gov/planetary/apod?date=${dateFilter}&api_key=${apiKey}&thumbs=True`);

        let data = res.data;
        setFilteredPosts([data]);
      } else {
        res = await axios.get(
          `https://api.nasa.gov/planetary/apod?start_date=${startDate}&api_key=${apiKey}&thumbs=True`
        );

        let data = res.data;
        setPosts(data.reverse());
      }

      setLoading(false);
    };

    getPosts();
  }, [dateFilter, startDate]);

  useEffect(() => {
    if (dateFilter) {
      const datedPost = posts?.filter((post) => post.date === dateFilter);
      setFilteredPosts(datedPost);
      setSearch('');
      return;
    }

    if (search?.length > 0) {
      if (dateFilter) {
        setDateFilter(null);
        setFilteredPosts([]);
      }

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

  // useEffect(() => {}, [filteredPosts]);

  const updateDateFilter = (date) => {
    const formattedDate = date.toISOString().slice(0, 10);
    setDateFilter(formattedDate);
  };

  if (!isAuthenticated) {
    return <Navigate replace to='/login' />;
  }

  return (
    <Fragment>
      <Navbar updateSearch={(e) => setSearch(e)} logout={logout} search={search} />
      <main>
        <section className='center-container'>
          {search?.length > 0 || dateFilter
            ? filteredPosts &&
              filteredPosts.map((post) => <Post key={post.date} post={post} likedPhotos={likedPhotos} />)
            : posts?.map((post, index) => {
                if (posts.length === index + 1 && !dateFilter) {
                  return <Post key={post.date} post={post} likedPhotos={likedPhotos} lastPostRef={lastPostRef} />;
                } else {
                  return <Post key={post.date} post={post} likedPhotos={likedPhotos} />;
                }
              })}
          {loading && (
            <div>
              <img src={spinner} alt='Loading spinner.' className='spinner' />
            </div>
          )}
        </section>
        <div className='right-container'>
          {dateFilter && (
            <span
              onClick={(e) => {
                setDateFilter('');
                setStartDate(startDate);
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
