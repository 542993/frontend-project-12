import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Button, Form, FloatingLabel, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useAuth } from '../../hooks/index.jsx';

import AuthContainer from '../AuthContainer';
import { routesApp } from '../../routes.js';
import img from '../../assets/signUp.jpg';

const SignUp = () => {
  const { user, logIn, signUp } = useAuth();
  const inputEl = useRef(null);
  const navigate = useNavigate();
  const [signUpFailed, setSignUpFailed] = useState(false);

  useEffect(() => {
    if (user) {
      navigate(routesApp.homePage);
    }
  }, [user, navigate]);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const handleSubmitForm = async (formData, setSubmitting) => {
    try {
      const userData = await signUp(formData);
      logIn(userData);
      setSubmitting(false);
    } catch (err) {
      switch (err.response.status) {
        case 404:
          console.log('error code is', err.response.status);
          throw new Error(`Ошибка соединения: ${err}`);
        case 409:
          console.log('error code is', err.response.status);
          setSignUpFailed(true);
          throw new Error(`Такой пользователь уже существует: ${err}`);
        default:
          throw new Error(`Неизвестная ошибка при авторизации: ${err}`);
      }
    }
  };

  const validationSchema = yup.object().shape({
    username: yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле'),
    password: yup.string()
      .min(6, 'Минимум 6 символов')
      .required('Обязательное поле'),
    confirmPassword: yup
      .string()
      .required('Обязательное поле')
      .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
  });

  const f = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => handleSubmitForm(values, setSubmitting),
  });

  console.log(f);
  return (
    <AuthContainer>
      <div className="card-body row p-5">
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <Image src={img} alt="Авторизация" roundedCircle />
        </div>
        <Form onSubmit={f.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
          <h1 className="text-center mb-4">Регистрация</h1>
          <FloatingLabel controlId="floatingUsername" label="Имя пользователя" className="mb-3">
            <Form.Control
              ref={inputEl}
              onChange={f.handleChange}
              value={f.values.username}
              name="username"
              autoComplete="username"
              placeholder="Имя пользователя"
              isInvalid={(f.touched.username && f.errors.username) || signUpFailed}
              disabled={f.isSubmitting}
            />
            <Form.Control.Feedback type="invalid">{f.errors.username}</Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Пароль" className="mb-4">
            <Form.Control
              onChange={f.handleChange}
              value={f.values.password}
              name="password"
              autoComplete="current-password"
              type="password"
              placeholder="Пароль"
              isInvalid={(f.touched.password && f.errors.password) || signUpFailed}
              disabled={f.isSubmitting}
            />
            <Form.Control.Feedback type="invalid">
              {f.errors.password}
            </Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel controlId="floatingConfirmPassword" label="Подтвердите пароль" className="mb-4">
            <Form.Control
              onChange={f.handleChange}
              value={f.values.confirmPassword}
              name="confirmPassword"
              autoComplete="confirm current-password"
              type="confirmPassword"
              placeholder="Подтвердите пароль"
              isInvalid={(f.touched.confirmPassword && f.errors.confirmPassword) || signUpFailed}
              disabled={f.isSubmitting}
            />
            <Form.Control.Feedback type="invalid">
              { signUpFailed ? 'Пользователь уже существует' : f.errors.confirmPassword}
            </Form.Control.Feedback>
          </FloatingLabel>
          <Button
            type="submit"
            variant="outline-primary"
            className="w-100 mb-3 btn"
            disabled={f.isSubmitting || !f.values.password || !f.values.username}
          >
            Зарегистрироваться
          </Button>
        </Form>
      </div>
    </AuthContainer>
  );
};

export default SignUp;
