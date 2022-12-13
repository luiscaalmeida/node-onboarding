import React, { useEffect } from 'react'
import { Rating, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getLocalRatingByMediaId, setLocalRatingByMediaId } from '../../consts';
import { useSelector } from 'react-redux';
import { userName } from '../../selectors/user';
import baseApi from '../../axios';
import { useState } from 'react';

export const LocalRating = ({id}) => {
  const user = useSelector(userName);
  const [value, setValue] = useState(null);
  
  const {isLoading: isLoadingGetRating, error: isErrorGetRating, data: getData} = useQuery(
    ['getLocalRating'],
    () => baseApi.get(
      getLocalRatingByMediaId(id),
      {
        params: {
          username: user,
        }
      }),
    {enabled: !!user && !!id},
  );

  useEffect(() => {
    const rating = getData?.data?.rating;
    if (rating) {
      console.log(rating);
      setValue(rating);
    }
  }, [getData]);



  // isLoading isError error.message isSuccess mutate(val)
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


  // useEffect(() => {
  //   if((!value || value === 0) && (rating && rating !== 0) && value !== rating) {
  //     console.log("setValue because of rating", rating?.data?.rating || value);
  //     setValue(value);
  //   }
  // }, [value, rating]);

  // useEffect(() => {
  //   if(value && value !== 0 && value !== (rating?.data?.rating || 0)) {
  //     console.log("Refetch: ", value);
  //     refetch();
  //   }
  // }, [refetch, value, rating]);



  return (
    <>
      <Typography variant="h6" color="text.primary"> {'My Rating'} </Typography>
      {isLoadingGetRating
        ? "Loading"
        : !isErrorGetRating
          ? (
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => handleChange(newValue)}
            />
          ) 
          : <span>{isErrorGetRating}</span>
      }
    </>
  )
}

//: !isErrorGetRating && <Rating value={value} onChange={(val) => handleChange(val)} />
