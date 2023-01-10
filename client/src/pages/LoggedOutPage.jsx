import React from 'react'
import { CustomHelmet } from '../components/CustomHelmet';
import {PageWrapper} from '../components/PageWrapper/PageWrapper';

export const LoggedOutPage = () => {
  const title = 'You are not logged in. Please log in or create an account.';

  return (
    <PageWrapper title={title}>
      <CustomHelmet
        title={"Logged Out Page"}
        description={title}
      />
    </PageWrapper>
  )
};
