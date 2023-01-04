import React from 'react';
import { useForm } from "react-hook-form";
import { useMutation } from '@tanstack/react-query';
import baseApi from '../../axios';
import { FORM_VALIDATION, updateUserInformation } from '../../consts';
import { InputGroup } from '../Input/InputGroup';
import { Input } from '../Input/Input';
import { Form } from '../Input/Form';

export const PersonalInfo = ({user}) => {
  const {email} = user;
  const first_name = user.first_name;
  const last_name = user.last_name;
  const age = user.age;
  const country = user.country;

  const {register, handleSubmit, formState: {errors},} = useForm({mode: 'all'});

  const onSubmit = data => {
    console.log(data);
    const nonEmptyData = Object.fromEntries(Object.entries(data).filter(([_key, value]) => value !== '' && value !== null));
    updateUserInformationMutation.mutate(nonEmptyData);
  };

  const updateUserInformationMutation = useMutation({
    mutationKey: ['updateUserInformation'],
    mutationFn: (form) => baseApi.post(
      updateUserInformation, {
        username: email,
        newUsername: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        country: form.country,
        age: form.age,
      }
    ),
    onSuccess: async (data) => {
      console.log("SUCCESS: update user information");
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
        <Input type="text" label="First Name" registerLabel="firstName" register={register} errors={errors}  defaultValue={first_name} required={"First Name is required"} />
        <Input type="text" label="Last Name" registerLabel="lastName" register={register} errors={errors}  defaultValue={last_name} required={"Last Name is required"} />
        <Input type="text" label="Country" registerLabel="country" register={register} errors={errors}  defaultValue={country} required={"Country is required"} />
        <Input type="number" label="Age" registerLabel="age" register={register} errors={errors}  defaultValue={age} registerConfig={FORM_VALIDATION.age} required={"Age is required"} />
        <Input type="text" label="Email" registerLabel="email" register={register} errors={errors} registerConfig={{pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i }} required={"Email is required"} defaultValue={email} /> 
      </InputGroup>
      <input type="submit" value={"Save Changes"} />
    </Form>
  );

}; 
