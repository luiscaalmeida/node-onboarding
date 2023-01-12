import * as React from 'react';
import styled from 'styled-components';
import { TitleHeader } from './TitleHeader';
import { Playlist } from './Playlist/Playlist';
import { Box, Tab } from '@mui/material';
import {TabPanel, TabContext, TabList} from '@mui/lab';
import { useState } from 'react';
import { GeneralInfo } from './GeneralInfo/GeneralInfo';
import { MemberGroup } from './Credits/MemberGroup';

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
    <Wrapper>
      <ContentLeft>
        <Img src={imageUrl} />
        <Playlist media={media} />
      </ContentLeft>
      <ContentRight style={{overflow: 'hidden'}}>
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
            <MemberGroup group={credits?.cast} />
          </TabPanel>
          <TabPanel value="3" style={{padding: '0', overflow: 'auto'}}>
            <MemberGroup group={credits?.crew} />
          </TabPanel>
        </TabContext>
      </ContentRight>
    </Wrapper>
  );
}
