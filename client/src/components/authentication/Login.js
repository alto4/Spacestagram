import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setAuth }) => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
  });

  const { username, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const userData = { username, password };

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const data = JSON.stringify(userData);

      const res = await axios.post('/api/auth', data, config);

      console.log('Token returned after successful login => ', res.data);
      setAuth(true);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <section className='center-container form-container'>
      <form
        className='auth-form'
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <h1 className='logo-text'>Spacestagram</h1>
        <p className='form-description'>
          Sign in to see some of the most beautiful photos of outer space ever captured
        </p>
        <input name='username' placeholder='Email or Username' value={username} onChange={(e) => onChange(e)} />
        <input name='password' placeholder='Password' value={password} onChange={(e) => onChange(e)} />
        <button type='submit'>Login</button>
        <div className='or-container'>
          <div>
            <hr />
          </div>

          <span>OR</span>
          <div>
            <hr />
          </div>
        </div>
        <button type='submit'>Sign In To Demo Account</button>
        <Link to='/register'>
          <span>Don't have an account? Register here.</span>
        </Link>{' '}
      </form>
    </section>
  );
};

export default Login;
