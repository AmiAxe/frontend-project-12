import React, { useState } from 'react';
import {
  Button,
  Form,
  Card,
  Container,
  Image,
  FloatingLabel,
  Row,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import routes from '../../routes';

const RegistrationForm = () => {
  const rollbar = useRollbar();
  const [regFailed, setRegFailed] = useState(true);
  const auth = useAuth();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'errors.nameMinlength')
      .max(20, 'errors.nameMaxlength')
      .required('errors.required'),
    password: Yup.string()
      .min(6, 'errors.passwordMinLenth')
      .required('errors.required'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'errors.confirmPassword',
    ),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      setRegFailed(false);
      try {
        const res = await axios.post(routes.signUpPath(), values);
        auth.logIn(res.data);
        navigate('/');
      } catch (err) {
        rollbar.error('registationError');
        if (!err.isAxiosError) {
          toast.error(t('errors.unknownError'));
          return;
        } if (err.response && err.response.status === 409) {
          setRegFailed(true);
          return;
        } toast.error(t('errors.connectionError'));
      }
    },
  });

  return (
    <Container className="container-fluid h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Container className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <Container className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <Image
                  src={`${process.env.PUBLIC_URL}/avatarreg.jpg`}
                  className="rounded-circle"
                  alt={t('signUpForm.headline')}
                />
              </Container>
              <Form
                onSubmit={formik.handleSubmit}
                className="col-12 col-md-6 mt-3 mt-mb-0"
              >
                <h1 className="text-center mb-4">
                  {t('signUpForm.headline')}
                </h1>
                <Form.Group className="form-floating mb-3">
                  <FloatingLabel
                    label={t('signUpForm.username')}
                    controlId="username"
                    className="mb-3"
                  >
                    <Form.Control
                      name="username"
                      type="text"
                      required
                      placeholder={t('signUpForm.username')}
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      isInvalid={!!formik.errors.username || !regFailed}
                    />
                    <Form.Control.Feedback
                      placement="right"
                      type="invalid"
                      tooltip
                    >
                      {t(formik.errors.username)}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                  <Form.Text className="text-muted" />
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <FloatingLabel
                    label={t('signUpForm.password')}
                    controlId="password"
                    className="mb-3"
                  >
                    <Form.Control
                      name="password"
                      type="password"
                      required
                      placeholder={t('signUpForm.password')}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      isInvalid={!!formik.errors.password || !regFailed}
                    />
                    <Form.Control.Feedback
                      placement="right"
                      type="invalid"
                      tooltip
                    >
                      {t(formik.errors.password)}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <FloatingLabel
                    label={t('signUpForm.confirmPassword')}
                    controlId="confirmPassword"
                    className="mb-3"
                  >
                    <Form.Control
                      name="confirmPassword"
                      type="password"
                      required
                      placeholder={t('signUpForm.confirmPassword')}
                      onChange={formik.handleChange}
                      value={formik.values.confirmPassword}
                      isInvalid={!!formik.errors.confirmPassword || !regFailed}
                    />
                    <Form.Control.Feedback
                      placement="right"
                      type="invalid"
                      tooltip
                    >
                      {t(formik.errors.confirmPassword)}
                    </Form.Control.Feedback>
                    <Form.Control.Feedback
                      placement="right"
                      type="invalid"
                      tooltip
                    >
                      {regFailed ? null : t('errors.notOneOfUser')}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Button
                  className="w-100"
                  variant="outline-primary"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  {t('signUpForm.signUpButton')}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="text-center p-4">
              <span>{t('signUpForm.footerText')}</span>
              {' '}
              <Link to={routes.loginPage()}>{t('signUpForm.footerButton')}</Link>
            </Card.Footer>
          </Card>
        </Container>
      </Row>
    </Container>
  );
};

export default RegistrationForm;
