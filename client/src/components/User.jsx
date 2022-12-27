import React from 'react';
import { useForm } from "react-hook-form";
import { useMutation } from '@tanstack/react-query';
import baseApi from '../axios';
import { updateUser } from '../consts';
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { InputGroup } from './Input/InputGroup';
import { Input } from './Input/Input';
import { Form } from './Input/Form';

const validationSchema = Yup.object().shape({
  email: Yup.string()
      .required('Title is required'),
  currentPassword: Yup.lazy(() => Yup.string()
      .transform(x => x === '' ? undefined : x)
      .when(['newPassword', 'confirmNewPassword'], (newPassword, confirmNewPassword, schema) => {
        if (newPassword || confirmNewPassword) return schema.required('Password is required');
      })),
  newPassword: Yup.lazy(() => Yup.string()
      .transform(x => x === '' ? undefined : x)
      .min(6, 'Password must be at least 6 characters')
      .when(['currentPassword', 'confirmNewPassword'], (currentPassword, confirmNewPassword, schema) => {
        if (currentPassword || confirmNewPassword) return schema.required('New Password is required');
      })),
  confirmNewPassword: Yup.lazy(() => Yup.string()
      .transform(x => x === '' ? undefined : x)
      .when(['currentPassword', 'newPassword'], (currentPassword, newPassword, schema) => {
        if (currentPassword || newPassword) return schema.required('Confirmation for the new password is necessary');
      })
      .oneOf([Yup.ref('newPassword')], 'Passwords must match')),
});

export const User = ({user}) => {
  const {email} = user;
  const first_name = 'luis';
  const last_name = 'luis';
  const age = 29;
  const country = 'Portugal';
  // const {email, first_name, last_name, age, country} = user; 
  const {register, handleSubmit, formState: {errors},} = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = data => {
    console.log(data);
    updateUserMutation.mutate(data);
  };

  const updateUserMutation = useMutation({
    mutationKey: ['updateUser'],
    mutationFn: (form) => baseApi.post(
      updateUser, {
        username: email,
        newUsername: form.email,
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
        cofirmNewPassword: form.cofirmNewPassword,
      }
    ),
    onSuccess: async (data) => {
      console.log("SUCCESS: getPlaylists");
      console.log(data);
    },
    onError: async (error) => {
      console.log(error.message);
    },
    enabled: !!user,
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup groupLabel={"Personal Information"}>
        <Input type="text" label="First Name" registerLabel="firstName" register={register} errors={errors}  defaultValue={first_name} />
        <Input type="text" label="Last Name" registerLabel="lastName" register={register} errors={errors}  defaultValue={last_name} />
        <Input type="text" label="Country" registerLabel="country" register={register} errors={errors}  defaultValue={country} />
        <Input type="number" label="Age" registerLabel="age" register={register} errors={errors}  defaultValue={age} />
        <Input type="text" label="Email" registerLabel="email" register={register} errors={errors} registerConfig={{pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i }} required={false} defaultValue={email} /> 
      </InputGroup>
      <InputGroup groupLabel={"Update Password"}>
        <Input type="password" label="Current Password" registerLabel="currentPassword" register={register} errors={errors}  placeholder={"Type your current password"} />
        <Input type="password" label="New Password" registerLabel="newPassword" register={register} errors={errors}  placeholder={"Type your new password"} />
        <Input type="password" label="Confirm New Password" registerLabel="confirmNewPassword" register={register} errors={errors}  placeholder={"Type your new password one more time"} />
      </InputGroup>
      <input type="submit" value={"Save Changes"} />
    </Form>
  )
}; 
