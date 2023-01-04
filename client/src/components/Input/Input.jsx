import React from 'react';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const inputWrapperStyles = {
  padding: '12px 20px 20px 20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: '5px',
  
  '&:not(:last-child)': {
    marginBottom: '10px',
  },
};

const StyledInputWrapper = styled('div')(inputWrapperStyles);

export const Input = ({ type, label, registerLabel, register, required, errors, registerConfig, defaultValue, placeholder, onInput }) => {
  return (
  <StyledInputWrapper>
    <label>{label}</label>
    <input
      type={type}
      name={registerLabel}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onInput={onInput}
      aria-invalid={errors[registerLabel] ? "true" : "false"}
      style={{borderColor: errors[registerLabel] ? 'red' : '#d8d8d8'}}
      {...register(registerLabel, { ...registerConfig, required: required })}  
    />
    {errors[registerLabel] && <Typography sx={{color: 'red', marginLeft: '15px'}} variant='body2'>{errors[registerLabel]?.message}</Typography>}
  </StyledInputWrapper>
  );
};
