import { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import Feed from './components/layout/Feed';
import './assets/App.css';

const App = () => {
  const [search, setSearch] = useState();

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/feed' element={<Feed search={search} setSearch={setSearch} />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
