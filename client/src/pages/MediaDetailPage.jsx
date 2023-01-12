import React from 'react'
import {useParams} from 'react-router-dom';
import {MediaCardDetail} from '../components/MediaCard/MediaCardDetail';
import {PageWrapper} from '../components/PageWrapper/PageWrapper';
import {CREDITS_FETCHERS, DETAIL_FETCHERS, MOVIE_TYPE} from '../consts';
import {useQuery} from '@tanstack/react-query';
import {axiosGet} from '../axios';
import { CustomHelmet } from '../components/CustomHelmet';

export const MediaDetailPage = ({type}) => {
  const {id} = useParams();
  const {key: detailKey, func: detailFunc} = DETAIL_FETCHERS[type];
  const {key: creditsKey, func: creditsFunc} = CREDITS_FETCHERS[type];
  const getDetails = useQuery({
    queryKey: [detailKey],
    queryFn: () => axiosGet(detailFunc(id)),
    onSuccess: (data) => console.log(data),
    onError: (err) => console.log(err),
  });
  const getCredits = useQuery({
    queryKey: [creditsKey],
    queryFn: () => axiosGet(creditsFunc(id)),
    onSuccess: (data) => console.log(data),
    onError: (err) => console.log(err),
  });
  const shouldShowMedia = !getDetails.isLoading && !getDetails.error && !!getDetails.data;
  const title = type === MOVIE_TYPE ? getDetails.data?.title : getDetails.data?.name;

  return (
    <PageWrapper title={title}>
      {shouldShowMedia && (
        <>
          <CustomHelmet
            title={title}
            description={getDetails.data?.overview}
            imageUrl={getDetails.data?.poster_path ? `https://image.tmdb.org/t/p/w500/${getDetails.data?.poster_path}` : null}
          />
          <MediaCardDetail
            id={id}
            type={type}
            title={title}
            genres={getDetails.data?.genres}
            overview={getDetails.data?.overview}
            imageUrl={`https://image.tmdb.org/t/p/w500/${getDetails.data?.poster_path}`}
            releaseDate={type === MOVIE_TYPE ? getDetails.data?.release_date : getDetails.data?.first_air_date}
            budget={getDetails.data?.budget}
            revenue={getDetails.data?.revenue}
            status={getDetails.data?.status}
            tagline={getDetails.data?.tagline}
            voteAverage={getDetails.data?.vote_average}
            voteCount={getDetails.data?.vote_count}
            numberSeasons={getDetails.data?.number_of_seasons}
            numberEpisodes={getDetails.data?.number_of_episodes}
            credits={getCredits.data}
          />
        </>
      )}
    </PageWrapper>
  )
};
