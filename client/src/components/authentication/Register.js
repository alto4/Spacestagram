import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register, login } from '../../actions/auth';
import PropTypes from 'prop-types';
import './Auth.css';

const Register = ({ setAlert, alerts, register, login, isAuthenticated }) => {
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
      setAlert('Passwords do not align.');
    } else {
      register({ username, email, password });
    }
  };

  const onDemoSubmit = async (e) => {
    e.preventDefault();

    login('demo_user_1', 'password');
  };

  if (isAuthenticated) {
    return <Navigate replace to='/' />;
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
        <button
          type='submit'
          onClick={(e) => {
            onSubmit(e);
          }}
        >
          Register
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
        <Link to='/login'>
          <span>Already have an account? Login here.</span>
        </Link>
      </form>
    </section>
  );
};

Register.propTypes = {
  alerts: PropTypes.array.isRequired,
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register, login })(Register);
