import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import React from 'react'
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

const buttonsContainer = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'row',
  gap: '10px',
};

const StyledButtonsContainer = styled('div')(buttonsContainer);

export const SocialShareButtons = () => {
  const url = window.location.href;
  
  return (
    <>
      <Typography variant="h6" color="text.primary"> {"Share It"} </Typography>
      <StyledButtonsContainer>
        <FacebookShareButton url={url}>
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
        <LinkedinShareButton url={url}>
          <LinkedinIcon size={32} round={true} />
        </LinkedinShareButton>
        <TwitterShareButton url={url}>
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
      </StyledButtonsContainer>
    </>
    
  )
}
