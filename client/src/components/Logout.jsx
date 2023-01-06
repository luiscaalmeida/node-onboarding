import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../storeContext';

export const Logout = ({setToken}) => {
  const navigate = useNavigate();
  const store = useContext(StoreContext);

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
