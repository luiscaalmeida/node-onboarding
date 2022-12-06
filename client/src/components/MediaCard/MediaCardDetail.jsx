import * as React from 'react';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { Divider } from '@mui/material';
import { normalizeToScale0to5 } from '../../helpers';
import { MOVIE_TYPE, TVSERIE_TYPE } from '../../consts';
import {Budgeting} from './Budgeting';
import Genres from './Genres';
import { RatingVotes } from './Rating';
import Overview from './Overview';
import { Seasons } from './Seasons';
import { TitleHeader } from './TitleHeader';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  border-radius: 15px;
  overflow: hidden;
  width: fit-content;
  box-shadow: 2px 1px 8px #cacaca;
`;
const Img = styled.img`
  display: flex;
  height: 800px;
  width: auto;
  max-width: 600px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px 35px 25px 25px;
  gap: 10px;
  max-width: 550px;
`;

export const MediaCardDetail = ({
  type,
  title,
  overview,
  genres,
  imageUrl,
  releaseDate,
  budget,
  revenue,
  tagline,
  voteAverage,
  voteCount,
  numberSeasons,
  numberEpisodes,
}) => {
  const normalizedRating = normalizeToScale0to5(voteAverage);

  return (
    <Wrapper>
      <Img src={imageUrl} />
      <Content>
        <TitleHeader title={title} tagline={tagline} />
        <Typography variant="body2" color="text.secondary"> {`Released in ${releaseDate}`} </Typography>
        <Divider />
        {type === TVSERIE_TYPE && <Seasons numberSeasons={numberSeasons} numberEpisodes={numberEpisodes} />}
        {overview && <Overview overview={overview} />}
        <Genres genres={genres} />
        {type === MOVIE_TYPE && <Budgeting budget={budget} revenue={revenue} />}
        <RatingVotes voteCount={voteCount} normalizedRating={normalizedRating} />
      </Content>
    </Wrapper>
  );
}
