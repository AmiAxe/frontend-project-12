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
import { useFormik } from 'formik';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import routes from '../../routes';

const AuthorisationForm = () => {
  const rollbar = useRollbar();
  const [authFailed, setAuthFailed] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const res = await axios.post(routes.loginPath(), values);
        auth.logIn(res.data);
        navigate('/');
      } catch (err) {
        rollbar.error(t('registationError'));
        if (!err.isAxiosError) {
          toast.error(t('errors.unknownError'));
          return;
        } if (err.response && err.response.status === 401) {
          setAuthFailed(true);
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
            <Card.Body className="row p-5">
              <Container className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <Image
                  src={`${process.env.PUBLIC_URL}/avatarreg.jpg`}
                  className="rounded-circle"
                  alt={t('Регистрация')}
                />
              </Container>
              <Form
                onSubmit={formik.handleSubmit}
                className="col-12 col-md-6 mt-3 mt-mb-0"
              >
                <h1 className="text-center mb-4">
                  {t('authForm.headline')}
                </h1>
                <Form.Group className="form-floating mb-3">
                  <FloatingLabel
                    label={t('authForm.nickname')}
                    controlId="username"
                    className="mb-3"
                  >
                    <Form.Control
                      name="username"
                      type="text"
                      required
                      placeholder={t('authForm.nickname')}
                      isInvalid={authFailed}
                      onChange={formik.handleChange}
                      value={formik.values.username}
                    />
                  </FloatingLabel>
                  <Form.Text className="text-muted" />
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <FloatingLabel
                    label={t('authForm.password')}
                    controlId="password"
                    className="mb-3"
                  >
                    <Form.Control
                      name="password"
                      type="password"
                      required
                      placeholder={t('authForm.password')}
                      isInvalid={authFailed}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <Form.Control.Feedback
                      placement="right"
                      type="invalid"
                      tooltip
                    >
                      {t('errors.incorrectNameOrPass')}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Button
                  className="w-100"
                  variant="outline-primary"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  {t('authForm.logInButton')}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="text-center p-4">
              <span>{t('authForm.footerText')}</span>
              {' '}
              <Link to={routes.signupPage()}>{t('authForm.footerButton')}</Link>
            </Card.Footer>
          </Card>
        </Container>
      </Row>
    </Container>
  );
};

export default AuthorisationForm;
