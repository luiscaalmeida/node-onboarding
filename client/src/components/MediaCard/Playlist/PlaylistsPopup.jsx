import React from 'react';
import styled from '@emotion/styled';
import { PlaylistForm } from './PlaylistForm';
import { PlaylistOption } from './PlaylistOption';

const popupStyles = {
  position: 'absolute',
  zIndex: 99,
  right: '70px',
  top: '20px',
  width: '300px',
  maxHeight: '400px',
  backgroundColor: '#d2d2d2',
  borderRadius: '15px',
  boxShadow: '2px 1px 5px #888888',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const StyledPopup = styled('div')(popupStyles);

export const PlaylistsPopup = ({
  playlists,
  saveMedia,
  removeMedia,
  playlistsWithMedia,
}) => {
  const doesPlaylistIncludeMedia = (playlistName) => playlistsWithMedia && playlistsWithMedia?.includes(playlistName);
  const handleClick = (playlistName) => {
    if (doesPlaylistIncludeMedia(playlistName)) removeMedia.mutate(playlistName);
    else saveMedia.mutate(playlistName);
  };

  return (
    <StyledPopup>      
      <PlaylistForm saveMedia={saveMedia} />
      {playlists?.map(playlist => (
        <PlaylistOption
          key={playlist?.name}
          playlistName={playlist?.name}
          onClick={() => handleClick(playlist?.name)}
          doesPlaylistIncludeMedia={doesPlaylistIncludeMedia}
        />
      ))}
    </StyledPopup>
  )
}
