import { Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react'
import { useState } from 'react';
import baseApi from '../axios';
import { CustomHelmet } from '../components/CustomHelmet';
import {PageWrapper} from '../components/PageWrapper/PageWrapper';
import { PassInfo } from '../components/UserInfo/PassInfo';
import { PersonalInfo } from '../components/UserInfo/PersonalInfo';
import { PhotoInfo } from '../components/UserInfo/PhotoInfo';
import { userProfile } from '../consts';
import { isObjectEmpty } from '../helpers';
import { StoreContext } from '../storeContext';

export const ProfilePage = ({edit}) => {
  const title = 'Profile';
  const store = useContext(StoreContext);
  const userEmail = store.username;
  const userToken = store.token;
  const [user, setUser] = useState({});

  const userProfileQuery = useQuery({
    queryKey: ['getUserProfile', edit],
    queryFn: () => baseApi.get(userProfile, {}),
    onSuccess: async (data) => {
      console.log(data);
      setUser(data?.data?.user);
    },
    onError: async (err) => {
      console.log(err);
      setUser({});
    },
    enabled: !!userEmail && !!userToken,
  });

  return (
    <PageWrapper title={title}>
      <CustomHelmet
        title={title}
        description={"Manage your personal information, password and/or profile picture"}
      />
      {!userProfileQuery.isLoading 
        ? !userProfileQuery.isError && !isObjectEmpty(user)
          ? (<>
            {edit === 'pass' && <PassInfo user={user} />}
            {edit === 'info' && <PersonalInfo user={user} />}
            {edit === 'pic' && <PhotoInfo user={user} />}
          </>)
          : <Typography variant="h6" sx={{textAlign: 'center'}} color="text.primary">
              {`Error: ${userProfileQuery?.error || "No User"}`}
            </Typography>
        : <Typography variant="h6" sx={{textAlign: 'center'}} color="text.primary">
            {"Loading..."}
          </Typography>
      }
    </PageWrapper>
  )
};
