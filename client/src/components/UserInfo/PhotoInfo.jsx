import { useMutation } from '@tanstack/react-query';
import React, {useState} from 'react';
import { useForm } from "react-hook-form";
import baseApi from '../../axios';
import { SERVER_BASE_URL, updateUserPhoto } from '../../consts';
import { Form } from '../Input/Form';
import { Input } from '../Input/Input';
import { InputGroup } from '../Input/InputGroup';
import styled from '@emotion/styled';

const imgStyles = {
  maxWidth: '200px',
  display: 'inline',
  marginRight: '100px',
  padding: '10px',
};
const divStyles = {
  display: 'flex',
  flexDirection: 'column',
};
const outerDivStyles = {
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'row',
  alignItems: 'center',
};
const StyledImg = styled('img')(imgStyles);
const StyledDiv = styled('div')(divStyles);
const StyledOuterDiv = styled('div')(outerDivStyles);

export const PhotoInfo = ({user}) => {
  const {photo} = user;
	const [selectedFile, setSelectedFile] = useState(photo ? `${SERVER_BASE_URL}/images/${photo}` : null);
  const {register, handleSubmit, formState: {errors},} = useForm({mode: 'all'});

	const onFileChange = event => {
    console.log(event.target.files);
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setSelectedFile(e.target.result);
      }
      reader.readAsDataURL(event.target.files[0]);
    }
	};

  const onSubmit = data => {
    console.log(data);
    updateUserPhotoMutation.mutate(data);
  };

  const updateUserPhotoMutation = useMutation({
    mutationKey: ['updateUserPhoto'],
    mutationFn: (form) => {
      const formData = new FormData();
      formData.append("file", form.file[0]);
      return baseApi.post(updateUserPhoto, formData);
    },
    onSuccess: async (data) => {
      console.log("SUCCESS: update user photo");
      console.log(data);
    },
    onError: async (error) => {
      console.log(error.message);
    },
    enabled: !!user,
  });
	
	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<InputGroup style={outerDivStyles} groupLabel={"Change your Profile Picture"}>
        <StyledOuterDiv> 
          {selectedFile && <StyledImg src={selectedFile} alt={"Profile"} />}
          <StyledDiv>
            <Input
              type="file"
              label="Profile Picture"
              registerLabel="file"
              register={register}
              errors={errors}
              placeholder={"Select a profile picture"}
              required={'Profile Picture is required'}
              onInput={onFileChange}
              style={{justifyContent: 'center', marginLeft: '200px !important'}}
            />
            <input style={{marginLeft: '20px'}} type="submit" value={"Change Picture"} />
          </StyledDiv>
        </StyledOuterDiv>
			</InputGroup>
		</Form>
	);
};
