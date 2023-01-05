import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useStore } from '../storeContext';

export const Logout = ({setToken}) => {
  const navigate = useNavigate();
  const store = useStore();

  const logout = () => {
    store.setUsername(null);
    store.setToken(null);
    setToken(null);
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
