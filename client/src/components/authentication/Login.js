import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
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

      console.log('Token returned after successful registration => ', res.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <input name='username' value={username} onChange={(e) => onChange(e)} />
        <input name='password' value={password} onChange={(e) => onChange(e)} />
        <button type='submit'>Login</button>
      </form>
      <Link to='/register'>Don't have an account? Register here.</Link>
    </div>
  );
};

export default Login;
