import React from 'react';
import { useForm } from "react-hook-form";
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

  '.wrapper': {
    padding: '12px 20px 20px 20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '5px',
    borderRadius: '10px',
    backgroundColor: '#f8f8f8',
  },

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
}

const StyledForm = styled('form')(formStyles);

export const User = ({user}) => {
  const {email, password} = user;
  const {register, handleSubmit, formState: {errors}} = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Input label="Email" register={register} errors={errors} registerConfig={{pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i }} required={false} defaultValue={email} />
      <Input label="Password" register={register} errors={errors} required={false} defaultValue={password} />
      {errors.newPlaylist && <span role="alert">{`Error: ${errors.newPlaylist?.type} ${errors.newPlaylist?.message}`}</span>}
      <input type="submit" value={"Save Changes"} />
    </StyledForm>
  )
}; 


const Input = ({ label, register, required, errors, registerConfig, defaultValue }) => (
  <div className='wrapper'>
    <label>{label}</label>
    <input        
      defaultValue={defaultValue}
      aria-invalid={errors[label] ? "true" : "false"}
      {...register(label, { ...registerConfig, required: required })}  
    />
  </div>
);
