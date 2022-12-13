import React from 'react';
import styled from '@emotion/styled';

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

  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '#5f5f5f',
    color: '#d2d2d2',
  }
}

const StyledPopup = styled('div')(popupStyles);
const StyledPlaylist = styled('div')(playlistStyles);

export const DetailAddOnPopup = ({playlists}) => {
  return (
    <StyledPopup>      
      {playlists?.map(playlist => (
        <StyledPlaylist
          key={playlist?.name}
          onClick={() => {}}
        >
          {playlist?.name}
        </StyledPlaylist>
      ))}
    </StyledPopup>
  )
}
