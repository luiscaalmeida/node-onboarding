import React from 'react'
import { CustomHelmet } from '../components/CustomHelmet';
import {PageWrapper} from '../components/PageWrapper/PageWrapper';
import { Register } from '../components/Register/Register';

export const RegisterPage = () => (
  <PageWrapper>
    <CustomHelmet
      title={"Register Page"}
      description={"Register in IMDB.v2, the new and improved IMDB"}
    />
    <Register />
  </PageWrapper>
);
