import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../FirebaseData';
import { Button, Row, Col, Form, Spinner, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import MyStrings from '../../MyStrings.json';
import TransparentButton from '../TransparentButton';
import { BackIcon } from '../../assets/svgs';
import { USER_NOT_FOUND, WRONG_PASSWORD } from '../../AuthErrorCodes';

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email(MyStrings.errors.invalidEmail)
        .required(MyStrings.errors.fieldRequired),
    password: Yup.string()
        .min(6, MyStrings.errors.passwordTooShort)
        .required(MyStrings.errors.fieldRequired),
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
            // will automatically redirect to home
        }).catch((e) => {
            console.log(e);
            let msg = "";
            switch (e.code) {
                case USER_NOT_FOUND:
                    msg = MyStrings.errors.userNotFound;
                    break;
                case WRONG_PASSWORD:
                    msg = MyStrings.errors.wrongPassword;
                    break;
                default:
                    msg = MyStrings.errors.unknown;
                    break;
            }
            this.setState({ loading: false, error: msg });
        });
    }

    render() {
        return (
            <>
                <Row>
                    <Col className="text-center">
                        <TransparentButton variant="light" as={Link} to="/auth"><BackIcon /></TransparentButton>
                    </Col>
                </Row>
                <Row className="mt-2">
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
                                        <Button className="p-2 w-100" type="submit" variant="info">{MyStrings.login}</Button>
                                    }
                                    <TransparentButton className="mt-3 text-primary" as={Link} to="/auth/reset">Glömt lösenord?</TransparentButton>
                                </Form>
                            )}
                        </Formik>
                    </Col>
                </Row>
            </>
        )
    }
}

export default Login