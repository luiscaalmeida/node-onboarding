import React from 'react'
import {PageWrapper} from '../components/PageWrapper/PageWrapper';

export const LoggedOutPage = () => {
  const title = 'You are not logged in. Please log in or create an account.';

  return (
    <PageWrapper title={title}>
    </PageWrapper>
  )
};
