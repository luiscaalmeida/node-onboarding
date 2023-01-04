import React from 'react';
import { useForm } from "react-hook-form";
import { useMutation } from '@tanstack/react-query';
import baseApi from '../../axios';
import { FORM_VALIDATION, updateUserPassword } from '../../consts';
import { InputGroup } from '../Input/InputGroup';
import { Input } from '../Input/Input';
import { Form } from '../Input/Form';
import { useNavigate } from 'react-router-dom';


export const PassInfo = ({user}) => {
  const {email} = user;
  const navigate = useNavigate();
  const {register, handleSubmit, getValues, formState: {errors},} = useForm({mode: 'all'});

  const onSubmit = data => {
    console.log(data);
    updateUserPasswordMutation.mutate(data);
  };

  const updateUserPasswordMutation = useMutation({
    mutationKey: ['updateUserPassword'],
    mutationFn: (form) => baseApi.post(
      updateUserPassword, {
        username: email,
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
        confirmNewPassword: form.confirmNewPassword,
      }
    ),
    onSuccess: async (data) => {
      console.log("SUCCESS: update user password");
      console.log(data);
      if (data?.data?.user) {
        console.log("SUCCESS: update user password");
        navigate("/");
      }
    },
    onError: async (error) => {
      console.log(error.message);
    },
    enabled: !!user,
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup groupLabel={"Update Password"}>
        <Input
          type="password"
          label="Current Password"
          registerLabel="currentPassword"
          register={register}
          errors={errors}
          placeholder={"Type your current password"}
          required={'Password is required'} 
        />
        <Input
          type="password"
          label="New Password"
          registerLabel="newPassword"
          register={register}
          errors={errors}
          placeholder={"Type your new password"} 
          required={'New password is required'} 
          registerConfig={FORM_VALIDATION.newPassword}
        />
        <Input
          type="password"
          label="Confirm New Password"
          registerLabel="confirmNewPassword"
          register={register}
          errors={errors}
          placeholder={"Type your new password one more time"} 
          required={'Confirmation for new password is required'}
          registerConfig={{validate: value => value !== getValues('newPassword') ? 'Passwords must match' : true}}
        />
      </InputGroup>
      <input type="submit" value={"Save Changes"} />
    </Form>
  )
}; 
