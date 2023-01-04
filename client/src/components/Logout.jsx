import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogout } from '../actions/user';

export const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    localStorage.removeItem('token');
    await dispatch(userLogout());
    navigate('/');
  }

  useEffect(() => {
    logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>Loading...</div>
  )
}
