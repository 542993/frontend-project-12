import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import {
  Button,
  Form,
  FloatingLabel,
  Image,
} from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import * as yup from 'yup';
import useAuthContext from '../../hooks/useAuthContext';
import AuthContainer from '../AuthContainer';
import { routesApp } from '../../routes.js';
import img from '../../assets/loginPage.jpeg';

const LoginPage = () => {
  const { t } = useTranslation();
  const { logIn, signIn } = useAuthContext();
  const inputEl = useRef(null);
  const navigate = useNavigate();
  const [authFailed, setAuthFailed] = useState(false);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const handleSubmitForm = async (formData, setSubmitting) => {
    try {
      console.log('formData', formData);
      const userData = await signIn(formData);
      console.log('userData', userData);
      logIn(userData);
      navigate(routesApp.homePage);
      setSubmitting(false);
    } catch (err) {
      switch (err.code) {
        case 'ERR_NETWORK':
          throw new Error(`${t('notice.netWorkError')}: ${err}`);
        case 'ERR_BAD_REQUEST':
          setAuthFailed(true);
          setSubmitting(false);
          throw new Error(`${t('notice.getData')} ${err}`);
        default:
          throw new Error(`${t('notice.signIn')}: ${err}`);
      }
    }
  };

  const validationSchema = yup.object().shape({
    username: yup.string()
      .required(t('error.required')),
    password: yup.string()
      .required(t('error.required')),
  });

  const f = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log('errors', f.errors.username);
      handleSubmitForm(values, setSubmitting);
    },
  });

  console.log('submitting', f.isSubmitting);
  return (
    <AuthContainer>
      <div className="card-body row p-5">
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <Image src={img} alt="Авторизация" roundedCircle />
        </div>
        <Form onSubmit={f.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
          <h1 className="text-center mb-4">{t('loginPage.enter')}</h1>
          <FloatingLabel controlId="floatingUsername" label={t('loginPage.nickname')} className="mb-3">
            <Form.Control
              ref={inputEl}
              onChange={f.handleChange}
              value={f.values.username}
              name="username"
              autoComplete="username"
              placeholder={t('loginPage.nickname')}
              isInvalid={(f.touched.username && f.errors.username) || authFailed}
              disabled={f.isSubmitting}
            />
            {(f.touched.username && f.errors.username)
            && <Form.Control.Feedback type="invalid">{f.errors.username}</Form.Control.Feedback>}
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label={t('loginPage.password')} className="mb-4">
            <Form.Control
              onChange={f.handleChange}
              value={f.values.password}
              name="password"
              autoComplete="current-password"
              type="password"
              placeholder={t('loginPage.password')}
              isInvalid={(f.touched.password && f.errors.password) || authFailed}
              disabled={f.isSubmitting}
            />
            {(f.touched.password && f.errors.password)
            && <Form.Control.Feedback type="invalid">{f.errors.password}</Form.Control.Feedback>}
            <Form.Control.Feedback type="invalid">
              {authFailed ? t('error.wrongData') : ''}
            </Form.Control.Feedback>
          </FloatingLabel>
          <Button
            type="submit"
            variant="outline-primary"
            className="w-100 mb-3 btn"
            disabled={f.isSubmitting}
          >
            {t('loginPage.button')}
          </Button>
        </Form>
      </div>
      <div className="card-footer p-4">
        <div className="text-center">
          <span className="pe-2">{t('loginPage.existAcc')}</span>
          <Link to={routesApp.signupPage}>{t('loginPage.registration')}</Link>
        </div>
      </div>
    </AuthContainer>
  );
};

export default LoginPage;
