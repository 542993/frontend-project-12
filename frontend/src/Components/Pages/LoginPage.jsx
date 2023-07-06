import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'; 
import axios from 'axios';
import useAuth from '../../hooks/index.jsx';

const LoginPage = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const auth = useAuth();
  const inputRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(5, 'Must be min 5 characters')
        .max(11, 'Must be 11 characters or less')
        .required('Required'),
      password: Yup.string()
        .min(5, 'Must be min 5 characters')
        .max(11, 'Must be 11 characters or less')
        .required('Required'),
    }),

    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        console.log('value', values);
        const res = await axios.post('/api/v1/login', values);
        console.log('post', res.data.token);
        localStorage.setItem('userId', JSON.stringify({ token: res.data.token }));
        console.log('saved token', localStorage.getItem('userId'));
        auth.logIn();
        navigate('/');
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <Form onSubmit={formik.handleSubmit} className="p-3">
            <fieldset disabled={formik.isSubmitting}>
              <Form.Group>
                <Form.Label htmlFor="username">Username</Form.Label>
                <Form.Control
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  placeholder="username"
                  name="username"
                  id="username"
                  autoComplete="username"
                  isInvalid={authFailed}
                  required
                  ref={inputRef}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  placeholder="password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  isInvalid={authFailed}
                  required
                />
               <Form.Control.Feedback type="invalid">the username or password is incorrect</Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" variant="outline-primary">Submit</Button>
            </fieldset>
          </Form>
        </div>
      </div>
    </div>
  );
// END
};

export default LoginPage;
