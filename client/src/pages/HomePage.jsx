import React from 'react'
import {Button} from '@mui/material';
import {Link} from 'react-router-dom';
import {PageWrapper} from '../components/PageWrapper/PageWrapper';
import {Box} from '@mui/system';

export const HomePage = () => {
  const title = 'Home Page';

  return (
    <PageWrapper title={title}>
      <Box sx={{ display: 'inline-flex', marginRight: "20px" }}>
          <Button size='large' variant="contained" color='secondary' to={`/movies`} component={Link}>
            Movies
          </Button>
      </Box>
      <Box sx={{ display: 'inline-flex' }}>
          <Button size='large' variant="contained" color='secondary' to={`/tvseries`} component={Link}>
            TV Series
          </Button>
      </Box>
    </PageWrapper>
  )
};
