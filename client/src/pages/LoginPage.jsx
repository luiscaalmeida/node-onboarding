import React from 'react'
import {PageWrapper} from '../components/PageWrapper/PageWrapper';
import { Login } from '../components/Login/Login';

export const LoginPage = ({setToken}) => (
  <PageWrapper>
    <Login setToken={setToken} />
  </PageWrapper>
);
