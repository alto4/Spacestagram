import { Fragment, useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Feed from './components/layout/Feed';
import './assets/App.css';

const App = () => {
  const [search, setSearch] = useState();

  return (
    <Fragment>
      <Navbar updateSearch={(e) => setSearch(e)} />
      <Feed search={search} />
    </Fragment>
  );
};

export default App;
