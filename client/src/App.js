import { Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import Feed from './components/layout/Feed';
import './App.css';

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <Feed />
    </Fragment>
  );
};

export default App;
