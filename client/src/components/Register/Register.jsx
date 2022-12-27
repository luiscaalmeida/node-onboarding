import React from 'react'
import baseApi from '../../axios';
import * as Yup from 'yup';
import './Register.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from '../Input/Form';
import { InputGroup } from '../Input/InputGroup';
import { Input } from '../Input/Input';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../../consts';

const validationSchema = Yup.object().shape({
  email: Yup.string()
      .required('Title is required'),
  firstName: Yup.string().required("First Name is required!"),
  lastName: Yup.string().required("Last Name is required!"),
  age: Yup.number().min(1, "You need to be 18 or older to register.").max(100, "There's no way you are this old").required("Age is required!"),
  country: Yup.string().required("Country is required!"),
  newPassword: Yup.lazy(() => Yup.string()
      .transform(x => x === '' ? undefined : x)
      .min(6, 'Password must be at least 6 characters')
      .required('New Password is required')),
  confirmNewPassword: Yup.lazy(() => Yup.string()
      .transform(x => x === '' ? undefined : x)
      .oneOf([Yup.ref('newPassword')], 'Passwords must match')
      .required('It is required that you confirm your password.')),
});

export const Register = () => {
  const {register, handleSubmit, formState: {errors},} = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    registerUserMutation.mutate(data);
    console.log("why dont you move?");
  };

  const registerUserMutation = useMutation({
    mutationKey: ['register'],
    mutationFn: (form) => {
      console.log(form);
      return baseApi.post(
      registerUser, {
        username: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        country: form.country,
        age: form.age,
        newPassword: form.newPassword,
        cofirmNewPassword: form.cofirmNewPassword,
      });
    },
    onSuccess: async (data) => {
      console.log("SUCCESS: Register User");
      console.log(data);
    },
    onError: async (error) => {
      console.log("SOME ERROR: Register User");
      console.log(error.message);
    },
    enabled: true,
  });

  return (
    <div className="Register-wrapper">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup groupLabel={"Register User"}>
          <Input type="text" label="First Name" registerLabel="firstName" register={register} errors={errors} />
          <Input type="text" label="Last Name" registerLabel="lastName" register={register} errors={errors} />
          <Input type="text" label="Country" registerLabel="country" register={register} errors={errors} />
          <Input type="number" label="Age" registerLabel="age" register={register} errors={errors} />
          <Input type="text" label="Email" registerLabel="email" register={register} errors={errors} registerConfig={{pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i }} required={false} /> 
          <Input type="password" label="New Password" registerLabel="newPassword" register={register} errors={errors}  placeholder={"Type your new password"} />
          <Input type="password" label="Confirm New Password" registerLabel="confirmNewPassword" register={register} errors={errors}  placeholder={"Type your new password one more time"} />
        </InputGroup>
        <input type="submit" value={"Create Account"} />
      </Form>
    </div>
  )
};
