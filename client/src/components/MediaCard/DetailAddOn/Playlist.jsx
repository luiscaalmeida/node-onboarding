import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import baseApi from '../../../axios';
import { addMediaToPlaylist, getAllPlaylists, isMediaInAnyPlaylist, removeMediaFromPlaylist } from '../../../consts';
import { useSelector } from 'react-redux';
import { userName } from '../../../selectors/user';
import { PlaylistsPopup } from './PlaylistsPopup';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { useMutation } from '@tanstack/react-query';

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

export const Playlist = ({media}) => {
  const user = useSelector(userName);
  const [isPlaylistPopupOpen, setIsPlaylistPopupOpen] = useState(false);
  const [isMediaInPlaylist, setIsMediaInPlaylist] = useState(false);
  const [playlistsWithMedia, setPlaylistsWithMedia] = useState(null);
  const [playlists, setPlaylists] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getPlaylistsMutation = useMutation(
    ['getPlaylists'],
    () => baseApi.get(
      getAllPlaylists,
      {
        params: {
          username: user,
        }
      }),
    {enabled: false},
  );


  const getPlaylists = async () => {
    setIsLoading(true);
    baseApi
      .get(getAllPlaylists, {
        params: {
          username: user,
        }
      })
      .then(data => {
        if(data?.data?.playlists === null) {
          setIsLoading(false);
          return;
        }
        setPlaylists(data?.data?.playlists);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error.message);
        setIsError(error.message);
        setIsLoading(false);
      })
  };

  const saveMedia = async (name) => {
    baseApi
    .post(addMediaToPlaylist, {
      username: user,
      playlistName: name,
      media: media,
    })
    .then(data => {
      // console.log(data);
      console.log(data?.data?.playlist);
      setIsLoading(false);
      setIsMediaInPlaylist(true);
      setIsPlaylistPopupOpen(false)
    })
    .catch(error => {
      console.log(error.message);
      setIsError(error.message);
      setIsLoading(false);
    });
  };

  const togglePlaylistPopup = () => {
    setIsPlaylistPopupOpen(prevIsInPlaylist => {
      if (!prevIsInPlaylist) {
        getPlaylistsMutation.mutate(null, {
          onSuccess: async (data) => {
            if(data?.data?.playlists === null) return;
            setPlaylists(data?.data?.playlists);
          },
          onError: async (error) => console.log(error.message),
        });
      }
      // if (!prevIsInPlaylist) getPlaylists();
      return !prevIsInPlaylist;
    });
  }

  const removeMedia = (name) => {
    baseApi
    .delete(removeMediaFromPlaylist, {
      data: {
        username: user,
        playlistName: name,
        mediaId: media.id,
      },
    })
    .then(data => {
      // console.log(data);
      console.log(data?.data?.playlist);
      setIsLoading(false);
      setIsMediaInPlaylist(false);
      setIsPlaylistPopupOpen(false)
    })
    .catch(error => {
      console.log(error.message);
      setIsError(error.message);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    // Ver se este Media (id) existe em alguma playlist do user..
    setIsLoading(true);
    baseApi
      .get(isMediaInAnyPlaylist, {
        params: {
          username: user,
          mediaId: media.id,
        }
      })
      .then(data => {
        if(data?.data?.playlists) {
          console.log("included in playlist");
          console.log(data);
          setPlaylists(data?.data?.playlists);
          setIsLoading(false);
          setIsMediaInPlaylist(true);
          setPlaylistsWithMedia(data?.data?.playlists);
        }
        else {
          console.log("not included in playlist");
          setIsMediaInPlaylist(false);
          setPlaylistsWithMedia(null);
        }
      })
      .catch(error => {
        console.log(error);
        setIsError(error.message);
        setIsLoading(false);
      })
  }, [user, media]);

  return (
    <>
      <StyledWrapper onClick={togglePlaylistPopup}>
      {getPlaylistsMutation.isLoading && !getPlaylistsMutation.isError
        ? <MoreHorizIcon />
        : isMediaInPlaylist
          ? <CheckIcon />
          : <AddIcon />
      }
      </StyledWrapper>
      {!getPlaylistsMutation.isLoading && !getPlaylistsMutation.isError && playlists && isPlaylistPopupOpen &&
        <PlaylistsPopup
          playlists={playlists}
          saveMedia={saveMedia}
          removeMedia={removeMedia}
          playlistsWithMedia={playlistsWithMedia} />
      }
    </>
  );
};
