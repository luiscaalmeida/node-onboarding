import { Box, Button, Typography, styled } from '@mui/material';
import React from 'react'
import { DefaultPopUpWrapper } from './DefaultPopUpWrapper';

const style = {
  marginTop: '30px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  gap: '30px',
}

const BiggerButton = styled(Button)(({theme}) => ({
  width: "120px",
  height: "50px",
  fontSize: "18px",
}));

export const DeletePlaylistPopup = ({open, onClose, deletePlaylist}) => {

  return (
    <DefaultPopUpWrapper
      open={open}
      onClose={onClose}
    >
      <>
        <Typography variant="h5" component="div">{"Are you sure you want to delete this playlist?"}</Typography>
        <Box sx={style}>
          <BiggerButton variant="contained" color='primary' onClick={() => deletePlaylist.mutate()}>{"Delete"}</BiggerButton>
          <BiggerButton variant="outlined" color='primary' onClick={onClose}>{"No"}</BiggerButton>
        </Box>
      </>
    </DefaultPopUpWrapper>
  )
}
