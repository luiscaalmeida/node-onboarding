import * as React from 'react';
import styled from 'styled-components';
import { TitleHeader } from './TitleHeader';
import { Playlist } from './Playlist/Playlist';
import { Box, Tab } from '@mui/material';
import {TabPanel, TabContext, TabList} from '@mui/lab';
import { useState } from 'react';
import { GeneralInfo } from './GeneralInfo/GeneralInfo';
import { PersonGroup } from './Credits/PersonGroup';
import { DetailCard } from '../DetailCard';


const Img = styled.img`
  display: flex;
  height: 800px;
  width: auto;
  max-width: 600px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
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
  credits,
}) => {
  const [tab, setTab] = useState('1');

  const media = {
    id,
    type,
    title,
    overview,
    imageUrl,
    mediaUrl: `/${type}/${id}`,
  };

  return (
    <DetailCard> 
      <DetailCard.LeftSide>
        <Img src={imageUrl} />
        <Playlist media={media} />
      </DetailCard.LeftSide>
      <DetailCard.RightSide>
        <TabContext value={tab}>
          <TitleHeader title={title} tagline={tagline} />
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={(event, val) => setTab(val)} aria-label="tabs with media information">
              <Tab label="General" value="1" />
              <Tab label="Cast" value="2" />
              <Tab label="Crew" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1" style={{padding: '0', overflow: 'auto'}}>
            <GeneralInfo
              id={id}
              releaseDate={releaseDate}
              type={type}
              numberSeasons={numberSeasons}
              numberEpisodes={numberEpisodes}
              overview={overview}
              genres={genres}
              budget={budget}
              revenue={revenue}
              voteCount={voteCount}
              voteAverage={voteAverage}
            />
          </TabPanel>
          <TabPanel value="2" style={{padding: '0', overflow: 'auto'}}>
            <PersonGroup group={credits?.cast} />
          </TabPanel>
          <TabPanel value="3" style={{padding: '0', overflow: 'auto'}}>
            <PersonGroup group={credits?.crew} />
          </TabPanel>
        </TabContext>
      </DetailCard.RightSide>
    </DetailCard>
  );
}
