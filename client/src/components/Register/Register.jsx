import React from 'react'
import baseApi from '../../axios';
import './Register.css';
import { useForm } from 'react-hook-form';
import { Form } from '../Input/Form';
import { InputGroup } from '../Input/InputGroup';
import { Input } from '../Input/Input';
import { useMutation } from '@tanstack/react-query';
import { FORM_VALIDATION, registerUser } from '../../consts';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const navigate = useNavigate();
  const {register, handleSubmit, getValues, setError, formState: {errors},} = useForm({mode: 'all'});

  const onSubmit = (data) => {
    registerUserMutation.mutate(data);
  };

  const registerUserMutation = useMutation({
    mutationKey: ['register'],
    mutationFn: (form) => {
      return baseApi.post(
      registerUser, {
        username: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        country: form.country,
        age: form.age,
        newPassword: form.newPassword,
        confirmNewPassword: form.confirmNewPassword,
      });
    },
    onSuccess: async (data) => {
      console.log(data);
      if (!data?.data?.user && data?.data?.error) {
        const errors = data?.data?.error;
        for (const property in errors) {
          setError(property, { type: 'custom', message: errors[property] });
        }
      }
      else if (data?.data?.user) navigate('/login');
    },
    onError: async (error) => console.log(error.message),
    enabled: true,
  });

  return (
    <div className="Register-wrapper">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup groupLabel={"Register User"}>
          <Input type="text" label="First Name" registerLabel="firstName" register={register} errors={errors} required={'First Name is required'} />
          <Input type="text" label="Last Name" registerLabel="lastName" register={register} errors={errors} required={'Last Name is required'} />
          <Input type="text" label="Country" registerLabel="country" register={register} errors={errors} required={'Country is required'} />
          <Input type="number" label="Age" registerLabel="age" register={register} errors={errors} required={'Age is required'} registerConfig={FORM_VALIDATION.age} />
          <Input type="text" label="Email" registerLabel="email" register={register} errors={errors} registerConfig={{pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i }} required={'Email is required'} /> 
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
        <input type="submit" value={"Create Account"} />
      </Form>
    </div>
  )
};
