import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../../FirebaseData.js';
import { Alert, Spinner, Button, Row, Col, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import *as Yup from 'yup';
import MyStrings from '../../MyStrings.json';
import { EMAIL_ALREADY_IN_USE } from '../../AuthErrorCodes.js';
import TransparentButton from '../TransparentButton';
import { BackIcon } from '../../assets/svgs';

const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
        .required(MyStrings.errors.fieldRequired),
    lastName: Yup.string()
        .required(MyStrings.errors.fieldRequired),
    email: Yup.string()
        .email(MyStrings.errors.invalidEmail)
        .required(MyStrings.errors.fieldRequired),
    password: Yup.string()
        .min(6, MyStrings.errors.passwordTooShort)
        .required(MyStrings.errors.fieldRequired),
});

export class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            error: null,
        };

        this.signup = this.signup.bind(this);
    }

    signup(values) {
        this.setState({ loading: true });
        auth.createUserWithEmailAndPassword(values.email, values.password).then((user) => {
            // Add a new document in collection "users"
            db.collection("users").doc(user.user.uid).set({
                email: values.email,
                firstName: values.firstName,
                lastName: values.lastName,
            })
        }).catch((e) => {
            console.log(e);
            let msg = "";
            switch (e.code) {
                case EMAIL_ALREADY_IN_USE:
                    msg = MyStrings.errors.emailAlreadyInUse;
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
                            initialValues={{ email: '', password: '', firstName: '', lastName: '' }}
                            validationSchema={RegisterSchema}
                            onSubmit={this.signup}
                        >
                            {({ handleSubmit, handleChange, values, errors, touched }) =>
                                (<Form noValidate={true} onSubmit={handleSubmit}>
                                    <Form.Group controlId="firstNameForm">
                                        <Form.Label>{MyStrings.firstName}</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="firstName"
                                            placeholder={MyStrings.firstNamePlaceholder}
                                            value={values.firstName}
                                            isInvalid={touched.firstName && !!errors.firstName}
                                            onChange={handleChange} />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.firstName}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="lastNameForm">
                                        <Form.Label>{MyStrings.lastName}</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="lastName"
                                            placeholder={MyStrings.lastNamePlaceholder}
                                            value={values.lastName}
                                            isInvalid={touched.lastName && !!errors.lastName}
                                            onChange={handleChange} />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.lastName}
                                        </Form.Control.Feedback>
                                    </Form.Group>
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
                                    {/* TODO: update links */}
                                    <p className="text-muted text-center" style={{ fontSize: "0.95rem" }}>
                                        Genom att registrera mig godkänner jag <a href="https://www.google.com">användarvilkoren</a> och <a href="https://www.google.com">integritetspolicyn</a>
                                    </p>
                                    {this.state.loading ?
                                        <div className="p-2 text-center">
                                            <Spinner className="p-2" animation="border" variant="info" />
                                        </div>
                                        :
                                        <Button className="p-2 w-100" type="submit" variant="info">{MyStrings.register}</Button>
                                    }
                                </Form>)
                            }
                        </Formik>
                    </Col>
                </Row>
            </>
        );
    }
}

export default Register