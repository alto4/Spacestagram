import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = ({ setAuth }) => {
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
        setAuth(true);
      } catch (error) {
        console.error(error.response.data);
      }
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
          Sign up to see some of the most beautiful photos of outer space ever captured
        </p>
        <input name='email' placeholder='Email' value={email} onChange={(e) => onChange(e)} />
        <input name='username' placeholder='Username' value={username} onChange={(e) => onChange(e)} />
        <input name='password' placeholder='Password' value={password} onChange={(e) => onChange(e)} />
        <input
          name='passwordConfirm'
          placeholder='Confirm Password'
          value={passwordConfirm}
          onChange={(e) => onChange(e)}
        />
        <button type='submit'>Register</button>
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
        <Link to='/login'>
          <span>Already have an account? Login here.</span>
        </Link>
      </form>
    </section>
  );
};

export default Register;
