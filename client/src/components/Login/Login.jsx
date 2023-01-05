import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useForm } from 'react-hook-form';
import baseApi from '../../axios';
import { useMutation } from '@tanstack/react-query';
import { Form } from '../Input/Form';
import { Input } from '../Input/Input';
import { InputGroup } from '../Input/InputGroup';
import { loginUser } from '../../consts';
import { Typography } from '@mui/material';
import { useStore } from '../../storeContext';

export const Login = ({setToken}) => {
  const navigate = useNavigate();
  const [globalError, setGlobalError] = useState(null);
  const {register, handleSubmit, formState: {errors},} = useForm({mode: 'all'});
  const store = useStore();

  const loginUserMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: (form) => {
      return baseApi.post(
      loginUser, {
        email: form.email,
        password: form.password,
      });
    },
    onSuccess: async (data, form) => {
      console.log(data);
      console.log(form);
      const token = data?.data?.token;
      if (token) {
        store.setUsername(form.email);
        store.setToken(token);
        console.log('LOGIN SUBMIT SUCCESSFULL', token);
        setToken(token || null);
        navigate('/');
      }
      else setToken(null);
    },
    onError: async (error) => {
      console.log(error.message);
      setGlobalError(`Wrong credentials! Try again.`);
    },
    enabled: true,
  });

  const onSubmit = form => loginUserMutation.mutate(form);

  return (
    <div className="login-wrapper">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup groupLabel={"Please Log In"}>
          <Input
            type="text"
            label="Email or Username"
            registerLabel="email"
            register={register}
            errors={errors}
            registerConfig={{pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i}}
            placeholder={"Type your email or username"}
            required={'Email is required'}
          />
          <Input
            type="password"
            label="Password"
            registerLabel="password"
            register={register}
            errors={errors}
            placeholder={"Type your password"}
            required={'Password is required'}
          />
        </InputGroup>
        {globalError && <Typography sx={{color: 'red', marginLeft: '15px'}} variant='body2'>{globalError}</Typography>}
        <input type="submit" value={"Login"} />
      </Form>
    </div>
  )
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
}
