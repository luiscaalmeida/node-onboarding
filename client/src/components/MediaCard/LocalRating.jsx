import React, { useContext, useEffect } from 'react'
import { Rating, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getLocalRatingByMediaId, setLocalRatingByMediaId } from '../../consts';
import baseApi from '../../axios';
import { useState } from 'react';
import { StoreContext } from '../../storeContext';

export const LocalRating = ({id}) => {
  const store = useContext(StoreContext);
  const user = store.username;
  const [value, setValue] = useState(null);
  
  const {isLoading: isLoadingGetRating, error: isErrorGetRating, data: getData} = useQuery(
    ['getLocalRating', id],
    () => baseApi.get(
      getLocalRatingByMediaId(id), {}),
    {enabled: !!user && !!id},
  );

  useEffect(() => {
    const rating = getData?.data?.rating;
    if (rating) {
      console.log(rating);
      setValue(rating);
    }
  }, [getData]);

  const setRatingMutation = useMutation(
    ['setLocalRating'],
    (val) => baseApi.post(
      setLocalRatingByMediaId(id), {
        username: user,
        rating: val,
      }
    ),
    {enabled: false},
  );

  const handleChange = async (val) => {
    if (val !== null) {
      setRatingMutation.mutate(
        val,
        {
          onSuccess: async (data, error) => {
            console.log("success");
            console.log(data);
            setValue(val);
          },
          onError: async (data) => {
            console.log(data);
          },
        }
      );
    }
  }

  return (
    <>
      <Typography variant="h6" color="text.primary"> {'My Rating'} </Typography>
      {isLoadingGetRating
        ? <span>{"Loading..."}</span>
        : !isErrorGetRating
          ? (
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => handleChange(newValue)}
            />
          ) 
          : <span>{`Error: ${isErrorGetRating}`}</span>
      }
    </>
  )
}
