import { Divider, Typography } from '@mui/material'
import React from 'react'

export const Seasons = ({numberSeasons, numberEpisodes}) => {
  return (
    <>
      <Typography variant="body1" color="text.primary"> {`Seasons: ${numberSeasons}`} </Typography>
      <Typography variant="body1" color="text.primary"> {`Episodes: ${numberEpisodes}`} </Typography>
      <Divider />
    </>
  )
};
