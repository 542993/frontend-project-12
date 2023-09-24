import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { Button, Form, FloatingLabel, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useAuth } from '../../hooks/index.jsx';
import AuthContainer from '../AuthContainer';
import { routesApp } from '../../routes.js';
import img from '../../assets/signUp.jpg';

const SignUp = () => {
  const { t } = useTranslation();
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
      switch (err.code) {
        case 'ERR_NETWORK':
          toast.error(t('notice.netWorkError'));
          throw new Error(`t('notice.netWorkError'): ${err}`);
        case 'ERR_BAD_REQUEST':
          setSignUpFailed(true);
          setSubmitting(false);
          throw new Error(`${t('error.userAlreadyExist')}: ${err}`);
        default:
          throw new Error(`t('notice.signUp') ${err}`);
      }
    }
  };

  const validationSchema = yup.object().shape({
    username: yup.string()
      .min(3, t('error.wrongLength'))
      .max(20, t('error.wrongLength'))
      .required(t('error.required')),
    password: yup.string()
      .min(6, t('error.minLength'))
      .required(t('error.required')),
    confirmPassword: yup
      .string()
      .required(t('error.required'))
      .oneOf([yup.ref('password')], t('error.passwordsMustMutch')),
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
  return (
    <AuthContainer>
      <div className="card-body row p-5">
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <Image src={img} alt="Авторизация" roundedCircle />
        </div>
        <Form onSubmit={f.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
          <h1 className="text-center mb-4">Регистрация</h1>
          <FloatingLabel controlId="floatingUsername" label={t('signUpPage.usernameLabel')} className="mb-3">
            <Form.Control
              ref={inputEl}
              onChange={f.handleChange}
              value={f.values.username}
              name="username"
              autoComplete="username"
              placeholder={t('signUpPage.usernameLabel')}
              isInvalid={(f.touched.username && f.errors.username) || signUpFailed}
              disabled={f.isSubmitting}
            />
           {(f.touched.username && f.errors.username)
            && <Form.Control.Feedback type="invalid">{f.errors.username}</Form.Control.Feedback>}
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label={t('signUpPage.passwordLabel')} className="mb-4">
            <Form.Control
              onChange={f.handleChange}
              value={f.values.password}
              name="password"
              autoComplete="current-password"
              type="password"
              placeholder={t('signUpPage.passwordLabel')}
              isInvalid={(f.touched.password && f.errors.password) || signUpFailed}
              disabled={f.isSubmitting}
            />
            {(f.touched.password && f.errors.password)
            && <Form.Control.Feedback type="invalid">{f.errors.password}</Form.Control.Feedback>}
          </FloatingLabel>
          <FloatingLabel controlId="floatingConfirmPassword" label={t('signUpPage.confirmPasswordLabel')} className="mb-4">
            <Form.Control
              onChange={f.handleChange}
              value={f.values.confirmPassword}
              name="confirmPassword"
              autoComplete="confirm current-password"
              type="confirmPassword"
              placeholder={t('signUpPage.confirmPasswordLabel')}
              isInvalid={(f.touched.confirmPassword && f.errors.confirmPassword) || signUpFailed}
              disabled={f.isSubmitting}
            />
             {(f.touched.confirmPassword && f.errors.confirmPassword)
            && <Form.Control.Feedback type="invalid">{f.errors.confirmPassword}</Form.Control.Feedback>}
            <Form.Control.Feedback type="invalid">
              { signUpFailed ? t('signUpPage.userExist') : ''}
            </Form.Control.Feedback>
          </FloatingLabel>
          <Button
            type="submit"
            variant="outline-primary"
            className="w-100 mb-3 btn"
          >
            {t('signUpPage.submitButton')}
          </Button>
        </Form>
      </div>
    </AuthContainer>
  );
};

export default SignUp;
