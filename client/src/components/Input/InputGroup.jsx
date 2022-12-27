import React from 'react';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const inputGroupWrapperStyles = {
  padding: '12px 20px 20px 20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: '5px',
  borderRadius: '10px',
  backgroundColor: '#f8f8f8',
};

const StyledInputGroupWrapper = styled('div')(inputGroupWrapperStyles);

export const InputGroup = ({groupLabel, children}) => (
  <>
    {groupLabel && <Typography variant='h6'>{groupLabel}</Typography>}
    <StyledInputGroupWrapper>{children}</StyledInputGroupWrapper>
  </>
);
