import { Rating, Typography } from '@mui/material'
import React from 'react'

export const RatingVotes = ({voteCount, normalizedRating}) => {
  return (
    <>
      <Typography variant="h6" color="text.primary"> {`Rating (${voteCount} votes)`} </Typography>
      <Rating name="half-rating-read" value={normalizedRating} precision={0.5} readOnly />
    </>
  )
};
