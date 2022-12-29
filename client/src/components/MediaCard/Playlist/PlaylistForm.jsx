import React from 'react';
import styled from '@emotion/styled';
import { useForm } from "react-hook-form";

const formStyles = {
  marginTop: '10px',
  marginBottom: '15px',
  fontSize: '16px',
  fontWeight: 'bold',
  lineHeight: '35px',
  padding: '5px 15px',
  paddingBottom: '0',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',

  input: {
    outline: 'none',
    border: 'none',
    borderRadius: '15px',
    fontSize: '16px',
    fontWeight: 'bold',
    lineHeight: '35px',
    padding: '5px 15px',
    width: '180px',
  },

  'input[type=submit]': {
    width: '80px',

    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#5f5f5f',
      color: '#d2d2d2',
    },
  },
}

const StyledForm = styled('form')(formStyles);

export const PlaylistForm = ({saveMedia}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log(data);
    saveMedia.mutate(data?.newPlaylist);
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder='New Playlist'
        aria-invalid={errors.newPlaylist ? "true" : "false"}
        {...register("newPlaylist", {
          required: 'Playlist name is required',
          maxLength: 20,
          pattern: /^[-A-Za-z0-9_]+$/i
        })} />
      <input type="submit" value={"Add"} />
      {errors.newPlaylist && <div style={{marginLeft: '5px'}} role="alert">{`Error: ${errors.newPlaylist?.message}`}</div>}
    </StyledForm>
  )
}
