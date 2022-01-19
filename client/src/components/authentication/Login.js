import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated, alerts }) => {
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

    login(username, password);
  };

  const onDemoSubmit = async (e) => {
    e.preventDefault();

    login('demo_user_1', 'password');
  };

  if (isAuthenticated) {
    return <Navigate replace to='/feed' />;
  }

  return (
    <section className='center-container form-container'>
      <form className='auth-form'>
        <h1 className='logo-text'>Spacestagram</h1>
        {alerts?.length > 0 && (
          <ul style={{ colour: 'red', textAlign: 'center' }}>
            {alerts.map((alert) => (
              <li key={alert.id}>{alert.message}</li>
            ))}
          </ul>
        )}
        <p className='form-description'>
          Sign in to see some of the most beautiful photos of outer space ever captured
        </p>
        <input name='username' placeholder='Email or Username' value={username} onChange={(e) => onChange(e)} />
        <input name='password' placeholder='Password' value={password} onChange={(e) => onChange(e)} />
        <button
          type='submit'
          onClick={(e) => {
            onSubmit(e);
          }}
        >
          Login
        </button>
        <div className='or-container'>
          <div>
            <hr />
          </div>

          <span>OR</span>
          <div>
            <hr />
          </div>
        </div>
        <button
          type='submit'
          onClick={(e) => {
            onDemoSubmit(e);
          }}
        >
          Sign In To Demo Account
        </button>
        <Link to='/register'>
          <span>Don't have an account? Register here.</span>
        </Link>{' '}
      </form>
    </section>
  );
};

Login.propTypes = {
  alerts: PropTypes.array.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  alerts: state.alert,
});

export default connect(mapStateToProps, { login })(Login);
