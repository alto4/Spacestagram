import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
  });

  const { username, email, password, passwordConfirm } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      console.log('Passwords do not align.');
    } else {
      const userData = { username, email, password };

      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const data = JSON.stringify(userData);

        const res = await axios.post('/api/users', data, config);

        console.log('Token returned after successful registration => ', res.data);
      } catch (error) {
        console.error(error.response.data);
      }
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <input name='email' value={email} onChange={(e) => onChange(e)} />
        <input name='username' value={username} onChange={(e) => onChange(e)} />
        <input name='password' value={password} onChange={(e) => onChange(e)} />
        <input name='passwordConfirm' value={passwordConfirm} onChange={(e) => onChange(e)} />
        <button type='submit'>Register</button>
      </form>
      <Link to='/login'>Already have an account? Login here.</Link>
    </div>
  );
};

export default Register;
