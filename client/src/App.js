import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import Feed from './components/layout/Feed';
import './assets/App.css';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const [search, setSearch] = useState();

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Feed search={search} setSearch={setSearch} />}></Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
