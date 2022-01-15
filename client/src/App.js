import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import Feed from './components/layout/Feed';
import './assets/App.css';

const App = () => {
  const [auth, setAuth] = useState(false);
  const [search, setSearch] = useState();

  const logout = () => setAuth(false);

  return (
    <Router>
      <Routes>
        <Route
          path='/login'
          element={auth ? <Feed search={search} setSearch={setSearch} logout={logout} /> : <Login setAuth={setAuth} />}
        />
        <Route
          path='/register'
          element={
            auth ? <Feed search={search} setSearch={setSearch} logout={logout} /> : <Register setAuth={setAuth} />
          }
        />
        <Route
          path='/feed'
          element={auth ? <Feed search={search} setSearch={setSearch} logout={logout} /> : <Navigate to='/login' />}
        ></Route>
      </Routes>
    </Router>
  );
};

export default App;
