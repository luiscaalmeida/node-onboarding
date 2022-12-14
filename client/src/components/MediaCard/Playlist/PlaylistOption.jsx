import React from 'react';
import styled from '@emotion/styled';
import CheckIcon from '@mui/icons-material/Check';

const playlistStyles = {
  fontSize: '16px',
  fontWeight: 'bold',
  lineHeight: '35px',
  padding: '5px 15px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',

  '&:last-child': {
    borderBottomLeftRadius: '15px',
    borderBottomRightRadius: '15px',
  },

  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '#5f5f5f',
    color: '#d2d2d2',
  }
};

const includesSymbolStyles = {
  marginLeft: 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const StyledPlaylist = styled('div')(playlistStyles);
const StyledSymbol = styled('span')(includesSymbolStyles);

export const PlaylistOption = ({playlistName, onClick, doesPlaylistIncludeMedia}) => {

  const isChecked = doesPlaylistIncludeMedia(playlistName);

  return (
    <StyledPlaylist onClick={() => onClick(playlistName)}>
      {playlistName}
      {isChecked && <StyledSymbol><CheckIcon /></StyledSymbol>}
    </StyledPlaylist>
  )
}
