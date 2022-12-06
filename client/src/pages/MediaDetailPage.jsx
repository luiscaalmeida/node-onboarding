import React from 'react'
import { useFetch } from '../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { MediaCardDetail } from '../components/MediaCard/MediaCardDetail';
import { PageWrapper } from '../components/PageWrapper/PageWrapper';
import { DETAIL_FETCHERS, MOVIE_TYPE } from '../consts';

export const MediaDetailPage = ({type}) => {
  const {id} = useParams();
  const {key, func} = DETAIL_FETCHERS[type];
  const {isLoading, error, data: media} = useFetch(key, func(id));
  const shouldShowMedia = !isLoading && !error && !!media;
  const title = type === MOVIE_TYPE ? media?.title : media?.name;

  return (
    <PageWrapper title={title}>
      {shouldShowMedia && (
        <MediaCardDetail
          type={type}
          title={title}
          genres={media?.genres}
          overview={media?.overview}
          imageUrl={`https://image.tmdb.org/t/p/w500/${media?.poster_path}`}
          releaseDate={type === MOVIE_TYPE ? media?.release_date : media?.first_air_date}
          budget={media?.budget}
          revenue={media?.revenue}
          status={media?.status}
          tagline={media?.tagline}
          voteAverage={media?.vote_average}
          voteCount={media?.vote_count}
          numberSeasons={media?.number_of_seasons}
          numberEpisodes={media?.number_of_episodes}
        />
      )}
    </PageWrapper>
  )
};
