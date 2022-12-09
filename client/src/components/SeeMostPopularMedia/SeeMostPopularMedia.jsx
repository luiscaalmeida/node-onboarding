import React from 'react'
import {Grid} from '@mui/material';
import { LIST_FETCHERS, MOVIE_TYPE } from '../../consts';
import { MediaCardOverview } from '../MediaCard/MediaCardOverview';
import { useQuery } from '@tanstack/react-query';
import { axiosGet } from '../../axios';

export const SeeMostPopularMedia = ({type, limit, align, showTitle, list}) => {
  const {key: list_key, func: list_func} = LIST_FETCHERS[type];
  const {isLoading: isListLoading, error: isListError, data: list_media} = useQuery(
    [list_key],
    () => axiosGet(list_func()),
  );
  const shouldShowPopularMedia = !isListLoading && !isListError && list_media?.results?.length > 0;

  const titlePart = type === MOVIE_TYPE ? 'Movies' : 'TV Series';
  const listFromData = list || list_media?.results;
  const listToShow = limit ? listFromData?.slice(0, limit) : listFromData;

  return (
    <>
      {shouldShowPopularMedia && (
        <>
          {showTitle && <h1 className='centered'>{`Top 5 Most Popular ${titlePart}`}</h1>}
          <Grid container spacing={0.5} style={{justifyContent: align}}>
          {listToShow.map(media => (
            <MediaCardOverview
              key={media?.id}
              title={type === MOVIE_TYPE ? media?.title : media?.name}
              imageUrl={media?.poster_path ? `https://image.tmdb.org/t/p/w500/${media?.poster_path}` : null}
              mediaUrl={`/${type}/${media?.id}`}
              overview={media?.overview}
            />
          ))}
          </Grid>
        </>
      )}
    </>
  );
};
