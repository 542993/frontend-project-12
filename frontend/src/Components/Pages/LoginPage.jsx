import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
// import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const LoginPage = () => {
// BEGIN (write your solution here)
  // const auth = useAuth();
  const inputRef = useRef();
  // const location = useLocation();
  // const navigate = useNavigate();
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
        .max(7, 'Must be 15 characters or less')
        .required('Required'),
      password: Yup.string()
        .max(9, 'Must be 20 characters or less')
        .required('Required'),
    }),

    onSubmit: async (values) => {
      console.log('value', values);
      setAuthFailed(false);
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
                  // isInvalid={authFailed}
                  required
                  ref={inputRef}
                />
                {formik.touched.username && formik.errors.username ? (
                  <div>{formik.errors.username}</div>
                ) : null}
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
                  required
                />
                {formik.touched.password && formik.errors.password ? (
                  <div>{formik.errors.password}</div>
                ) : null}
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
