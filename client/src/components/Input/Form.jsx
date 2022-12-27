import React from 'react';
import styled from '@emotion/styled';

const formStyles = {
  marginTop: '10px',
  fontSize: '16px',
  fontWeight: 'bold',
  lineHeight: '35px',
  padding: '5px 0px',
  paddingBottom: '0',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: '20px',

  label: {
    marginBottom: '0',
  },

  input: {
    outline: 'none',
    border: '1px solid #d8d8d8',
    borderRadius: '15px',
    fontSize: '16px',
    lineHeight: '35px',
    padding: '5px 15px',
    width: '350px',
  },

  'input[type=submit]': {
    width: '150px',
    fontWeight: 'bold',

    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#5f5f5f',
      color: '#d2d2d2',
    },
  },
};


const StyledForm = styled('form')(formStyles);

export const Form = ({onSubmit, children}) => {
  return (
    <StyledForm onSubmit={onSubmit}>
      {children}
    </StyledForm>
  )
}
