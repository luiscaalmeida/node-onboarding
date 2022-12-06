import React from 'react';
import { Chip, Divider, Typography } from '@mui/material'
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  border-radius: 15px;
  overflow: hidden;
  width: fit-content;
  margin-bottom: 15px;
`;

const Genres = ({genres}) => {
  return (
    <>
    <Typography variant="h6" color="text.primary"> {"Genres"} </Typography>
      <Wrapper>
        {genres?.length > 0 && genres.map(genre => <Chip key={genre.name} label={genre.name} />)}
      </Wrapper>
      <Divider />
    </>
  )
}

export default Genres
