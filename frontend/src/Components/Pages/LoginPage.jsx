import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Button, Form, FloatingLabel, Image } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import * as yup from 'yup';
import { useAuth } from '../../hooks/index.jsx';

import AuthContainer from '../AuthContainer';
import { routesApp } from '../../routes.js';
import img from '../../assets/loginPage.jpeg';

const LoginPage = () => {
  const { user, logIn, signIn } = useAuth();
  const inputEl = useRef(null);
  const navigate = useNavigate();
  const [authFailed, setAuthFailed] = useState(false);

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
      const userData = await signIn(formData);
      console.log('3');
      logIn(userData);
      setSubmitting(false);
    } catch (err) {
      switch (err.code) {
        case 'ERR_NETWORK':
          throw new Error(`Ошибка соединения: ${err}`);
        case 'ERR_BAD_REQUEST':
          setAuthFailed(true);
          throw new Error(`Неверные имя пользователя или пароль: ${err}`);
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
      .required('Обязательное поле'),
  });

  const f = useFormik({
    initialValues: {
      username: '',
      password: '',
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
          <h1 className="text-center mb-4">Войти</h1>
          <FloatingLabel controlId="floatingUsername" label="Ваш ник" className="mb-3">
            <Form.Control
              ref={inputEl}
              onChange={f.handleChange}
              value={f.values.username}
              name="username"
              autoComplete="username"
              placeholder="Ваш ник"
              isInvalid={(f.touched.username && f.errors.username) || authFailed}
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
              isInvalid={(f.touched.password && f.errors.password) || authFailed}
              disabled={f.isSubmitting}
            />
            <Form.Control.Feedback type="invalid">
              {authFailed ? 'Неверные имя пользователя или пароль' : f.errors.password}
            </Form.Control.Feedback>
          </FloatingLabel>
          <Button
            type="submit"
            variant="outline-primary"
            className="w-100 mb-3 btn"
            disabled={f.isSubmitting || !f.values.password || !f.values.username}
          >
            Войти
          </Button>
        </Form>
      </div>
      <div className="card-footer p-4">
        <div className="text-center">
          <span>Нет аккаунта?</span>
          <Link to={routesApp.signupPage}>Регистрация</Link>
        </div>
      </div>
    </AuthContainer>
  );
};

export default LoginPage;
