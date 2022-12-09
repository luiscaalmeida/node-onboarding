import React, { useEffect } from 'react'
import { Rating, Typography } from '@mui/material';
// import { useQuery } from '@tanstack/react-query';
import { getLocalRatingByMediaId, setLocalRatingByMediaId } from '../../consts';
import { useSelector } from 'react-redux';
import { userName } from '../../selectors/user';
import baseApi from '../../axios';
import { useState } from 'react';

export const LocalRating = ({id}) => {
  const user = useSelector(userName);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // const {isLoading: isLoadingGetRating, error: isErrorGetRating, data: rating} = useQuery(
  //   ['getLocalRating'],
  //   () => baseApi.get(
  //     getLocalRatingByMediaId(id),
  //     {
  //       params: {
  //         username: user,
  //       }
  //     }),
  //   {
  //     enabled: !!user,
  //     onCompleted: (data) => {
  //       console.log("------", data);
  //       setValue(data?.data?.rating);
  //     },
  //   },
  // );

  useEffect(() => {
    // console.log("REQUEST");
    setIsLoading(true);
    baseApi
      .get(getLocalRatingByMediaId(id), {
        params: {
          username: user,
        },
      })
      .then(data => {
        // const rating = data?.data?.rating;
        // console.log("Got rating: ", data?.data?.rating);
        setValue(data?.data?.rating);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setError(error.message);
        setIsLoading(false);
      })
  }, [id, user]);


  // const {isLoading: isLoadingSetRating, error: isErrorSetRating, data, refetch} = useQuery(
  //   ['setLocalRating'],
  //   () => baseApi.post(
  //     setLocalRatingByMediaId(id),
  //     {
  //       params: {
  //         username: user,
  //         rating: value,
  //       }
  //     }),
  //   {
  //     enabled: false,
  //   },
  // );

  const handleChange = async (val) => {
    if(val !== null) {
      setValue(val);
      baseApi
      .post(setLocalRatingByMediaId(id), {
        username: user,
        rating: val,
      })
      .then(data => {
        console.log(data.data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      })
    }
  };

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
      {isLoading
        ? "Loading"
        : !error
          ? (
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => handleChange(newValue)}
            />
          ) 
          : <span>{error}</span>
      }
    </>
  )
}

//: !isErrorGetRating && <Rating value={value} onChange={(val) => handleChange(val)} />
