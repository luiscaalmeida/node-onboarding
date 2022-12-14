import React, { useState } from 'react';
import styled from '@emotion/styled';
import baseApi from '../../../axios';
import { addMediaToPlaylist, getAllPlaylists } from '../../../consts';
import { DetailAddOnPopup } from './PlaylistsPopup';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const wrapperStyles = {
  position: 'absolute',
  zIndex: 9,
  right: '20px',
  top: '20px',
  width: 'fit-content',
  backgroundColor: '#d2d2d2',
  borderRadius: '15px',
  padding: '5px 10px',
  boxShadow: '2px 1px 5px #888888',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',

  svg: {
    marginTop: '5px',
    color: '#5f5f5f',
    width: '25px',
    height: '25px',
    padding: '0',
    transition: 'all 0.2s ease-in-out',
  },

  '&:hover': {
    backgroundColor: '#5f5f5f',

    svg: {
      color: '#d2d2d2',
    }
  },
};

const StyledWrapper = styled('div')(wrapperStyles);


export const DetailAddOn = ({add, remove, type, positionRight, AddIcon, RemoveIcon, media}) => {
  const [isDetailAddOn, setIsDetailAddOn] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const rightPx = `${((positionRight - 1) * 60) + 20}px`;

  const getPlaylists = async (name) => {
    console.log("REQUEST FRONTEND");
    setIsLoading(true);
    baseApi
      .get(getAllPlaylists, {})
      .then(data => {
        if(data?.data?.playlists === null) {
          setIsLoading(false);
          return;
        }
        console.log("DATA: ", data?.data?.playlists);
        setPlaylists(data?.data?.playlists);
        setIsDetailAddOn(true);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error.message);
        setIsError(error.message);
        setIsLoading(false);
      })
  };

  const saveMedia = async (name) => {
    console.log(media);
    baseApi
    .post(addMediaToPlaylist, {
      playlistName: name,
      media: media,
    })
    .then(data => {
      console.log(data);
      console.log(data?.data?.playlist);
      setIsLoading(false);
    })
    .catch(error => {
      console.log(error.message);
      setIsError(error.message);
      setIsLoading(false);
    });
  };

  const togglePlaylist = () => {
    if (isDetailAddOn) saveMedia('playlist_1');
    else getPlaylists();
    setIsDetailAddOn(prevIsInPlaylist => !prevIsInPlaylist);
  }

  return (
    <>
      <StyledWrapper onClick={togglePlaylist} style={{right: rightPx}}>
      {isLoading && !isError
        ? <MoreHorizIcon />
        : isDetailAddOn
          ? <AddIcon />
          : <RemoveIcon />
      }
      </StyledWrapper>
      {isLoading && !isError && playlists && isDetailAddOn && <DetailAddOnPopup playlists={playlists} />}
    </>
  );
};
