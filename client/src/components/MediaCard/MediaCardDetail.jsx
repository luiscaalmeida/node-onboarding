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
import { LocalRating } from './LocalRating';
import { Playlist } from './DetailAddOn/Playlist';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  border-radius: 15px;
  width: fit-content;
  box-shadow: 2px 1px 8px #cacaca;
`;
const Img = styled.img`
  display: flex;
  height: 800px;
  width: auto;
  max-width: 600px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
`;
const ContentRight = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px 35px 25px 25px;
  gap: 10px;
  max-width: 550px;
  overflow: auto;
  max-height: 800px;
`;

const ContentLeft = styled.div`
  position: relative;
`;

export const MediaCardDetail = ({
  id,
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

  const media = {
    id,
    type,
    title,
    overview,
    imageUrl,
    mediaUrl: `/${type}/${id}`,
  };

  return (
    <Wrapper>
      <ContentLeft>
        <Img src={imageUrl} />
        <Playlist media={media} />
      </ContentLeft>
      <ContentRight>
        <TitleHeader title={title} tagline={tagline} />
        <Typography variant="body2" color="text.secondary"> {`Released in ${releaseDate}`} </Typography>
        <Divider />
        {type === TVSERIE_TYPE && <Seasons numberSeasons={numberSeasons} numberEpisodes={numberEpisodes} />}
        {overview && <Overview overview={overview} />}
        <Genres genres={genres} />
        {type === MOVIE_TYPE && <Budgeting budget={budget} revenue={revenue} />}
        <RatingVotes voteCount={voteCount} normalizedRating={normalizedRating} />
        <LocalRating id={id} />
      </ContentRight>
    </Wrapper>
  );
}
