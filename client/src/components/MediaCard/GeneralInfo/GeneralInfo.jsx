import { Divider, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { MOVIE_TYPE, TVSERIE_TYPE } from '../../../consts';
import { normalizeToScale0to5 } from '../../../helpers';
import { SocialShareButtons } from '../../SocialShareButtons';
import { Budgeting } from '../Budgeting';
import Genres from '../Genres';
import { LocalRating } from '../LocalRating';
import Overview from '../Overview';
import { RatingVotes } from '../Rating';
import { Seasons } from '../Seasons';

const ContentRight = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px 35px 25px 25px;
  gap: 10px;
  max-width: 550px;
  overflow: auto;
  max-height: 800px;
`;

export const GeneralInfo = ({
  id,
  releaseDate,
  type,
  numberSeasons,
  numberEpisodes,
  overview,
  genres,
  budget,
  revenue,
  voteCount,
  voteAverage,
}) => {
  const normalizedRating = normalizeToScale0to5(voteAverage);

  return (
    <ContentRight style={{padding: '0'}}>
      <Typography variant="body2" color="text.secondary"> {`Released in ${releaseDate}`} </Typography>
      <Divider />
      {type === TVSERIE_TYPE && <Seasons numberSeasons={numberSeasons} numberEpisodes={numberEpisodes} />}
      {overview && <Overview overview={overview} />}
      <Genres genres={genres} />
      {type === MOVIE_TYPE && <Budgeting budget={budget} revenue={revenue} />}
      <RatingVotes voteCount={voteCount} normalizedRating={normalizedRating} />
      <LocalRating id={id} />
      <Divider />
      <SocialShareButtons />
    </ContentRight>
  )
}
