import React, { useState } from 'react'
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import { userLogin } from '../../actions/user';
import './Login.css';

export const Login = ({setToken}) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  // credentials = {email, password}

  async function loginUser(credentials) {
    console.log(credentials);
    try {
      return fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
        .then(data => {
          if (!data.ok) throw new Error(`Error Status: ${data.status} - ${data.statusText}`);
          return data.json();
        })
        .catch(err => {
          console.log(err);
          return null;
        })
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      email: username,
      password
    });
    if (token) {
      dispatch(userLogin({name: username, token: token?.token}));
      console.log('SUBMIT SUCCESSFULL', token);
    }
    setToken(token?.token || null);
  };

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" value={username} onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" value={password} autoComplete="current-password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
}
