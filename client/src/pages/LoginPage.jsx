import React from 'react'
import {PageWrapper} from '../components/PageWrapper/PageWrapper';
import { Login } from '../components/Login/Login';
import { CustomHelmet } from '../components/CustomHelmet';

export const LoginPage = ({setToken}) => (
  <PageWrapper>
    <CustomHelmet
      title={"Login Page"}
      description={"Page for our users to gain access to their personal information and playlists"}
    />
    <Login setToken={setToken} />
  </PageWrapper>
);
