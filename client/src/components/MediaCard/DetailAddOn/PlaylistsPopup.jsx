import React from 'react';
import styled from '@emotion/styled';
import CheckIcon from '@mui/icons-material/Check';

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

const playlistStyles = {
  fontSize: '16px',
  fontWeight: 'bold',
  lineHeight: '35px',
  padding: '5px 15px',
  borderRadius: '15px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',

  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '#5f5f5f',
    color: '#d2d2d2',
  }
}

const includesSymbolStyles = {
  marginLeft: 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const StyledPopup = styled('div')(popupStyles);
const StyledPlaylist = styled('div')(playlistStyles);
const StyledSymbol = styled('span')(includesSymbolStyles);

export const PlaylistsPopup = ({
  playlists,
  saveMedia,
  removeMedia,
  playlistsWithMedia,
}) => {
  const doesPlaylistIncludeMedia = (playlistName) => playlistsWithMedia && playlistsWithMedia?.includes(playlistName);

  const handleClick = (playlistName) => {
    if (doesPlaylistIncludeMedia(playlistName)) removeMedia(playlistName);
    else saveMedia(playlistName);
  }

  return (
    <StyledPopup>      
      {playlists?.map(playlist => (
        <StyledPlaylist
          key={playlist?.name}
          onClick={() => handleClick(playlist?.name)}
        >
          {playlist?.name}
          {doesPlaylistIncludeMedia(playlist?.name) && <StyledSymbol><CheckIcon /></StyledSymbol>}
        </StyledPlaylist>
      ))}
    </StyledPopup>
  )
}
