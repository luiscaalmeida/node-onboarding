import { Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import baseApi from '../axios';
import {PageWrapper} from '../components/PageWrapper/PageWrapper';
import { User } from '../components/User';
import { userProfile } from '../consts';
import { isObjectEmpty } from '../helpers';
import { userName } from '../selectors/user';

export const ProfilePage = () => {
  const title = 'Profile';
  const userEmail = useSelector(userName);
  const [user, setUser] = useState({});

  const userProfileQuery = useQuery({
    queryKey: ['getUserProfile'],
    queryFn: () => baseApi.get(
      userProfile,
      {params: {username: userEmail}}
    ),
    onSuccess: async (data) => {
      console.log(data);
      setUser(data?.data?.user);
    },
    onError: async (err) => {
      console.log(err);
      setUser({});
    },
    enabled: !!userEmail,
  });

  return (
    <PageWrapper title={title}>
      {!userProfileQuery.isLoading 
        ? !userProfileQuery.isError && !isObjectEmpty(user)
          ? <User user={user} />
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
