import React from 'react'
import {PageWrapper} from '../components/PageWrapper/PageWrapper';
import { Logout } from '../components/Logout';

export const LogoutPage = ({setToken}) => (
  <PageWrapper>
    <Logout setToken={setToken} />
  </PageWrapper>
);
