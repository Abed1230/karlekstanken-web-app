import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { auth, analytics } from '../../FirebaseData';
import { Button, Row, Col, Form, Spinner, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import MyStrings from '../../MyStrings.js';
import TransparentButton from '../TransparentButton';
import { USER_NOT_FOUND, WRONG_PASSWORD } from '../../AuthErrorCodes';
import AuthBaseLayout from './AuthBaseLayout';


const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email(MyStrings.Errors.invalidEmail)
        .required(MyStrings.Errors.fieldRequired),
    password: Yup.string()
        .min(6, MyStrings.Errors.passwordTooShort)
        .required(MyStrings.Errors.fieldRequired),
});

export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            error: null,
        };

        this.login = this.login.bind(this);
    }

    login({ email, password }) {
        this.setState({ loading: true });
        auth.signInWithEmailAndPassword(email, password).then((user) => {
            analytics.logEvent('login', { method: 'email' });
            // will automatically redirect to home
        }).catch((e) => {
            console.log(e);
            let msg = "";
            switch (e.code) {
                case USER_NOT_FOUND:
                    msg = MyStrings.Errors.userNotFound;
                    break;
                case WRONG_PASSWORD:
                    msg = MyStrings.Errors.wrongPassword;
                    break;
                default:
                    msg = MyStrings.Errors.unknown;
                    break;
            }
            this.setState({ loading: false, error: msg });
        });
    }

    render() {
        return (
            <AuthBaseLayout>
                <Row>
                    <Col>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validationSchema={LoginSchema}
                            onSubmit={this.login} >
                            {({ handleSubmit, handleChange, values, errors, touched }) => (
                                <Form noValidate={true} onSubmit={handleSubmit}>
                                    <Form.Group controlId="emailForm">
                                        <Form.Label>{MyStrings.email}</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder={MyStrings.emailPlaceholder}
                                            value={values.email}
                                            isInvalid={touched.email && !!errors.email}
                                            onChange={handleChange} />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="passwordForm">
                                        <Form.Label>{MyStrings.password}</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            placeholder={MyStrings.passwordPlaceholder}
                                            value={values.password}
                                            isInvalid={touched.password && !!errors.password}
                                            onChange={handleChange} />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    {this.state.error &&
                                        <Alert variant="danger">{this.state.error}</Alert>
                                    }
                                    {this.state.loading ?
                                        <div className="p-2 text-center">
                                            <Spinner className="p-2" animation="border" variant="info" />
                                        </div>
                                        :
                                        <Button className="p-2 w-100" type="submit" variant="info">{MyStrings.Auth.signInBtn}</Button>
                                    }
                                    <TransparentButton className="mt-3 text-primary" as={Link} to="/reset-password">{MyStrings.Auth.forgotPasswordBtn}</TransparentButton>
                                </Form>
                            )}
                        </Formik>
                    </Col>
                </Row>
            </AuthBaseLayout>
        )
    }
}

export default Login