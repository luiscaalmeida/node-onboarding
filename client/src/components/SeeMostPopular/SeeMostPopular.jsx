import { Button, styled } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { Link } from 'react-router-dom';

const BiggerButton = styled(Button)(({theme}) => ({
  width: "350px",
  height: "70px",
  fontSize: "20px",
}));


export const SeeMostPopular = () => {
  return (
    <>
      <h1 className='centered'>{"Explore more"}</h1>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px', marginRight: "20px" }}>
          <BiggerButton size='large' variant="contained" color='secondary' to={'/movies'} component={Link}>
            Movies
          </BiggerButton>
          <BiggerButton size='large' variant="contained" color='secondary' to={'/tvseries'} component={Link}>
            TV Series
          </BiggerButton>
      </Box>
    </>
  )
}
