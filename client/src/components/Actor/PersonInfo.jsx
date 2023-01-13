import { Divider, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px 35px 25px 25px;
  gap: 10px;
  max-width: 550px;
  overflow: auto;
  max-height: 800px;
  padding: 0;
`;

export const PersonInfo = ({
  id,
  name,
  type,
  imageUrl,
  biography, 
  birthday,
  deathday,
  place_of_birth,
  popularity,
  known_for_department,
}) => {
  return (
    <Content>
      {birthday && (
        <>
          <Typography variant="h6" color="text.primary"> Birthday </Typography>
          <Typography variant="body1" color="text.secondary"> {birthday} </Typography>
          <Divider />
        </>
      )}
      {deathday && (
        <>
          <Typography variant="h6" color="text.primary"> Deathday </Typography>
          <Typography variant="body1" color="text.secondary"> {deathday} </Typography>
          <Divider />
        </>
      )}
      {place_of_birth && (
        <>
          <Typography variant="h6" color="text.primary"> Place of Birth </Typography>
          <Typography variant="body1" color="text.secondary"> {place_of_birth} </Typography>
          <Divider />
        </>
      )}
      {popularity && (
        <>
          <Typography variant="h6" color="text.primary"> Popularity </Typography>
          <Typography variant="body1" color="text.secondary"> {`${popularity}/100`} </Typography>
          <Divider />
        </>
      )}
      {known_for_department && (
        <>
          <Typography variant="h6" color="text.primary"> Known for </Typography>
          <Typography variant="body1" color="text.secondary"> {known_for_department} </Typography>
          <Divider />
        </>
      )}
      {biography && (
        <>
          <Typography variant="h6" color="text.primary"> Biography </Typography>
          <Typography variant="body1" color="text.secondary"> {biography} </Typography>
          <Divider />
        </>
      )}
    </Content>
  )
}
