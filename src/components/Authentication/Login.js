import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fire } from '../../FirebaseData';
import { Button, Row, Col, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import MyStrings from '../../MyStrings.json';
import TransparentButton from '../TransparentButton';
import { BackIcon } from '../../assets/svgs';

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

        this.login = this.login.bind(this);
    }

    login(values) {
        fire.auth().signInWithEmailAndPassword(values.email, values.password).then((u) => {
        }).catch((error) => {
            console.log(error);
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
                                    <Button className="p-2 w-100" type="submit" variant="info">{MyStrings.login}</Button>
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