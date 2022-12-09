import React, { useEffect } from 'react'
import { Button, Rating, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getLocalRatingByMediaId, setLocalRatingByMediaId } from '../../consts';
import { useSelector } from 'react-redux';
import { userName } from '../../selectors/user';
import baseApi from '../../axios';
import { useState } from 'react';



export const LocalRating = ({id}) => {
  const user = useSelector(userName);
  
  const {isLoading: isLoadingGetRating, error: isErrorGetRating, data: rating} = useQuery(
    ['getLocalRating'],
    () => baseApi.get(
      getLocalRatingByMediaId(id),
      {
        params: {
          username: user,
        }
      }),
    {enabled: !!user},
  );

  const [value, setValue] = useState(rating?.data?.rating || 0);

  const {isLoading: isLoadingSetRating, error: isErrorSetRating, data, refetch} = useQuery(
    ['setLocalRating'],
    () => baseApi.post(
      setLocalRatingByMediaId(id),
      {
        params: {
          username: user,
          rating: value,
        }
      }),
    {enabled: false},
  );

  const handleChange = async (val) => {
    console.log("Changed: ", val);
    setValue(val);
    refetch();
  }

  return (
    <>
      <Typography variant="h6" color="text.primary"> {'My Rating'} </Typography>
      {isLoadingGetRating
        ? "Loading"
        : !isErrorGetRating && (
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => handleChange(newValue)}
          />
        )}
    </>
  )
}

//: !isErrorGetRating && <Rating value={value} onChange={(val) => handleChange(val)} />
