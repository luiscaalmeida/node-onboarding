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
import CloseIcon from '@mui/icons-material/Close';
import { useMutation } from '@tanstack/react-query';
import { useOutsideClickAlert } from '../../../hooks/useOutsideClickAlert';

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

  const getPlaylistsMutation = useMutation({
    mutationKey: ['getPlaylists'],
    mutationFn: () => baseApi.get(
      getAllPlaylists,
      {
        params: {
          username: user,
        }
      }),
    onSuccess: async (data) => {
      console.log("SUCCESS: getPlaylists");
      const playlists = data?.data?.playlists;
      if(playlists === null) return;
      const playlistsSimplified = playlists?.map(list => ({_id: list._id, name: list.name}));
      setPlaylists(playlistsSimplified);
    },
    onError: async (error) => console.log(error.message),
    enabled: false,
  });

  const saveMediaMutation = useMutation({
    mutationKey: ['saveMedia'],
    mutationFn: (name) => baseApi.post(
      addMediaToPlaylist,
      {
        username: user,
        playlistName: name,
        media: media,
      }),
    onSuccess: async (data) => {
      console.log("SUCCESS: saveMedia");
      console.log(data?.data?.playlist);
      setIsMediaInPlaylist(true);
      setIsPlaylistPopupOpen(false);
      getPlaylistsMutation.mutate();
      isMediaInAnyPlaylistMutation.mutate();
    },
    onError: async (error) => console.log(error.message),
    enabled: false,
  });

  const togglePlaylistPopup = () => {
    setIsPlaylistPopupOpen(prevIsInPlaylist => {
      if (!prevIsInPlaylist) getPlaylistsMutation.mutate();
      return !prevIsInPlaylist;
    });
  }

  const removeMediaMutation = useMutation({
    mutationKey: ['removeMedia'],
    mutationFn: (name) => baseApi.delete(
      removeMediaFromPlaylist,
      {
        data: {
          username: user,
          playlistName: name,
          mediaId: media.id,
        },
      }),
    onSuccess: async (data) => {
      console.log("SUCCESS: removeMedia");
      console.log(data?.data?.playlist);
      setIsMediaInPlaylist(false);
      setIsPlaylistPopupOpen(false);
      getPlaylistsMutation.mutate();
      isMediaInAnyPlaylistMutation.mutate();
    },
    onError: async (error) => console.log(error.message),
    enabled: false,
  });

  const isMediaInAnyPlaylistMutation = useMutation({
    mutationKey: ['isMediaInAnyPlaylist'],
    mutationFn: () => baseApi.get(
      isMediaInAnyPlaylist,
      {
        params: {
          username: user,
          mediaId: media.id,
        }
      }),
    onSuccess: async (data) => {
      console.log("SUCCESS: isMediaInAnyPlaylist");
      if(data?.data?.playlists) {
        console.log("included in playlist");
        console.log(data);
        setPlaylists(data?.data?.playlists);
        setIsMediaInPlaylist(true);
        setPlaylistsWithMedia(data?.data?.playlists);
      }
      else {
        console.log("not included in playlist");
        setIsMediaInPlaylist(false);
        setPlaylistsWithMedia(null);
      }
    },
    onError: async (error) => console.log(error.message),
    enabled: !!user && !!media,
  });

  useEffect(() => {
    isMediaInAnyPlaylistMutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {ref} = useOutsideClickAlert(() => setIsPlaylistPopupOpen(false));

  return (
    <>
      <StyledWrapper onClick={togglePlaylistPopup}>
      {getPlaylistsMutation.isLoading && !getPlaylistsMutation.isError
        ? <MoreHorizIcon />
        : isPlaylistPopupOpen
          ? <CloseIcon />
          : isMediaInPlaylist
            ? <CheckIcon />
            : <AddIcon />
      }
      </StyledWrapper>
      {!getPlaylistsMutation.isLoading && !getPlaylistsMutation.isError && playlists && isPlaylistPopupOpen &&
        <div ref={ref}>
          <PlaylistsPopup
            playlists={playlists}
            saveMedia={saveMediaMutation}
            removeMedia={removeMediaMutation}
            playlistsWithMedia={playlistsWithMedia}
          />
        </div>
      }
    </>
  );
};
